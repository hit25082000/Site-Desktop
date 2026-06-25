import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { decodeBookData } from '../services/urlSerializer';
import * as kieAi from '../services/kieAi';
import { 
  Camera, 
  Check, 
  CaretLeft as ChevronLeft, 
  CaretRight as ChevronRight, 
  X, 
  CreditCard, 
  ArrowRight,
  Eye,
  Info,
  Calendar,
  WarningCircle,
  DownloadSimple,
  Copy,
  ShoppingCart,
  Sparkle as Sparkles
} from '@phosphor-icons/react';

const parsePhotos = (photoUrlField) => {
  if (!photoUrlField) return [];
  try {
    const trimmed = photoUrlField.trim();
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      return JSON.parse(trimmed);
    }
  } catch (e) {
    console.error('Failed to parse photo_url field as array:', e);
  }
  return [photoUrlField];
};

export default function Book() {
  const { id } = useParams();
  const location = useLocation();
  
  const [book, setBook] = useState(null);
  const [selectedPhotoIds, setSelectedPhotoIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  // Checkout Modal State
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectionSubmitted, setSelectionSubmitted] = useState(false);

  // Payment simulation and download states
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [copied, setCopied] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [settings, setSettings] = useState(null);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadPhoto = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename || 'foto.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Erro ao baixar a imagem:', error);
      window.open(url, '_blank');
    }
  };

  // Load Book Data
  useEffect(() => {
    const loadBook = async () => {
      setLoading(true);
      setError(null);

      let bookId = id;
      let hashData = null;

      // 1. Check if we have hash payload (#data=...)
      const hash = location.hash || window.location.hash;
      if (hash.startsWith('#data=')) {
        const payload = hash.split('#data=')[1];
        hashData = decodeBookData(payload);
        if (hashData) {
          bookId = hashData.id;
        }
      }

      if (!bookId) {
        setError('Nenhum identificador de book fornecido.');
        setLoading(false);
        return;
      }

      try {
        // 2. Fetch from Supabase DB to get the latest status
        const { data, error: dbError } = await supabase
          .from('books')
          .select('*, client:clients(name, email, phone, photo_url)')
          .eq('id', bookId)
          .single();

        if (dbError) {
          // If DB fetch fails, fallback to hash data if present
          if (hashData) {
            console.log('DB fetch failed, falling back to URL Hash data:', hashData);
            setBook(hashData);
            setSelectedPhotoIds(hashData.selectedPhotoIds || []);
          } else {
            throw dbError;
          }
        } else {
          // Format book from DB data
          const formattedBook = {
            id: data.id,
            clientId: data.client_id,
            clientName: data.client?.name || 'Cliente',
            clientPhotos: parsePhotos(data.client?.photo_url),
            title: data.title,
            pricePerPhoto: data.price_per_photo !== null && data.price_per_photo !== undefined ? Number(data.price_per_photo) : null,
            packagePrice: data.package_price !== null && data.package_price !== undefined ? Number(data.package_price) : null,
            packagePhotos: data.package_photos !== null && data.package_photos !== undefined ? Number(data.package_photos) : null,
            extraPhotoPrice: data.extra_photo_price !== null && data.extra_photo_price !== undefined ? Number(data.extra_photo_price) : null,
            photos: Array.isArray(data.photos) ? data.photos : [],
            paymentStatus: data.payment_status,
            selectedPhotoIds: Array.isArray(data.selected_photo_ids) ? data.selected_photo_ids : [],
            referencesData: Array.isArray(data.references_data) ? data.references_data : []
          };
          setBook(formattedBook);
          setSelectedPhotoIds(formattedBook.selectedPhotoIds);
        }

        // Fetch general settings for Pix key
        const { data: setts } = await supabase.from('settings').select('*').eq('key', 'general').single();
        if (setts?.value) {
          setSettings(setts.value);
        }
      } catch (err) {
        console.error('Error loading book:', err);
        setError('Não foi possível carregar os dados do book. Verifique o link.');
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [id, location]);

  // Poll Kie AI for any photos currently generating
  useEffect(() => {
    if (!book || !book.photos) return;

    const generatingPhotos = book.photos.filter(p => p.status === 'generating' && p.taskId);
    if (generatingPhotos.length === 0) return;

    console.log(`[Kie AI Polling Customer] Iniciando monitoramento para ${generatingPhotos.length} foto(s)...`);

    const uploadToStorage = async (fileOrBlob, path) => {
      const { data, error } = await supabase.storage
        .from('studioretrato-assets')
        .upload(path, fileOrBlob, {
          contentType: 'image/jpeg',
          cacheControl: '3600',
          upsert: true
        });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('studioretrato-assets')
        .getPublicUrl(path);

      return publicUrl;
    };

    const interval = setInterval(async () => {
      let photosUpdated = false;
      const updatedPhotos = [...book.photos];

      for (let i = 0; i < updatedPhotos.length; i++) {
        const photo = updatedPhotos[i];
        if (photo.status === 'generating' && photo.taskId) {
          try {
            console.log(`[Kie AI Polling Customer] Consultando status da tarefa: ${photo.taskId}`);
            const result = await kieAi.getTaskStatus(photo.taskId);

            if (result.status === 'success' && result.url) {
              console.log(`[Kie AI Polling Customer] Sucesso para ${photo.taskId}!`);
              let finalUrl = result.url;
              try {
                const res = await fetch(result.url);
                const blob = await res.blob();
                const storagePath = `books/${book.id}/${photo.id}.jpg`;
                finalUrl = await uploadToStorage(blob, storagePath);
              } catch (storageErr) {
                console.warn('[Kie AI Polling Customer] Falha ao enviar para storage, usando link direto da Kie AI:', storageErr);
              }

              updatedPhotos[i] = {
                ...photo,
                url: finalUrl,
                status: 'success'
              };
              photosUpdated = true;
            } else if (result.status === 'fail' || result.status === 'error') {
              console.error(`[Kie AI Polling Customer] Falha na tarefa ${photo.taskId}: ${result.error}`);
              updatedPhotos[i] = {
                ...photo,
                status: 'failed',
                error: result.error || 'A tarefa falhou'
              };
              photosUpdated = true;
            }
          } catch (err) {
            console.error(`[Kie AI Polling Customer] Erro na foto ${photo.id}:`, err);
          }
        }
      }

      if (photosUpdated) {
        try {
          // Save in Supabase
          const { error } = await supabase
            .from('books')
            .update({ photos: updatedPhotos })
            .eq('id', book.id);

          if (error) {
            console.warn('[Kie AI Polling Customer] RLS/Permissão bloqueou escrita direta no banco, atualizando estado local apenas:', error);
          }

          // Always update local state so customer sees it immediately
          setBook(prev => {
            if (!prev || prev.id !== book.id) return prev;
            return {
              ...prev,
              photos: updatedPhotos
            };
          });
        } catch (err) {
          console.error('[Kie AI Polling Customer] Erro ao salvar atualização no banco:', err);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [book, book?.photos]);

  // Regenerate failed photo
  const handleRegeneratePhoto = async (photoId) => {
    if (!book) return;

    const photoIndex = book.photos.findIndex(p => p.id === photoId);
    if (photoIndex === -1) return;

    const photo = book.photos[photoIndex];
    
    let poseUrl = photo.refUrl;
    if (!poseUrl && book.referencesData) {
      const matchedRef = book.referencesData.find(ref => 
        photo.prompt.includes(ref.prompt) || photo.refId === ref.id
      );
      poseUrl = matchedRef?.url;
    }

    if (!poseUrl) {
      alert('Não foi possível encontrar a pose de referência correspondente.');
      return;
    }

    const clientPhotos = book.clientPhotos || [];
    if (clientPhotos.length === 0) {
      alert('Nenhuma foto de referência da cliente encontrada para este book.');
      return;
    }

    // Set to generating in state
    const updatedPhotos = [...book.photos];
    updatedPhotos[photoIndex] = {
      ...photo,
      status: 'generating',
      error: null,
      taskId: null
    };

    setBook(prev => ({ ...prev, photos: updatedPhotos }));

    try {
      const taskId = await kieAi.createGenerationTask(photo.prompt, [poseUrl, ...clientPhotos]);
      
      updatedPhotos[photoIndex] = {
        ...photo,
        status: 'generating',
        taskId,
        error: null
      };

      const { error: dbError } = await supabase
        .from('books')
        .update({ photos: updatedPhotos })
        .eq('id', book.id);

      if (dbError) throw dbError;

      setBook(prev => ({ ...prev, photos: updatedPhotos }));
    } catch (err) {
      console.error('Erro ao regenerar retrato:', err);
      
      updatedPhotos[photoIndex] = {
        ...photo,
        status: 'failed',
        error: err.message || 'Erro ao recriar tarefa'
      };

      await supabase
        .from('books')
        .update({ photos: updatedPhotos })
        .eq('id', book.id);

      setBook(prev => ({ ...prev, photos: updatedPhotos }));
      alert('Não foi possível iniciar a regeneração: ' + err.message);
    }
  };

  // Toggle Photo Selection
  const togglePhotoSelection = async (photoId) => {
    if (book?.paymentStatus === 'paid') return; // Cannot modify if already paid

    // Find the photo and check status
    const targetPhoto = book?.photos?.find(p => p.id === photoId);
    if (targetPhoto && (targetPhoto.status === 'generating' || targetPhoto.status === 'failed')) {
      return;
    }

    const updated = selectedPhotoIds.includes(photoId)
      ? selectedPhotoIds.filter(pid => pid !== photoId)
      : [...selectedPhotoIds, photoId];
    
    setSelectedPhotoIds(updated);

    // Persist to Supabase DB in real-time
    try {
      await supabase
        .from('books')
        .update({ selected_photo_ids: updated })
        .eq('id', book.id);
    } catch (e) {
      console.error('Failed to sync selection to DB:', e);
    }
  };

  // Selection Confirmation Process
  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setPaymentLoading(true);
    
    try {
      // Sync final selectedPhotoIds to Supabase and keep status pending for admin verification
      const { error: dbErr } = await supabase
        .from('books')
        .update({ 
          selected_photo_ids: selectedPhotoIds,
          payment_status: 'pending'
        })
        .eq('id', book.id);
      
      if (dbErr) throw dbErr;

      setBook(prev => ({ ...prev, selectedPhotoIds, paymentStatus: 'pending' }));
      setSelectionSubmitted(true);
      setShowCheckout(false);
    } catch (err) {
      alert('Erro ao salvar seleção: ' + err.message);
    } finally {
      setPaymentLoading(false);
    }
  };

  // Lightbox Navigation
  const prevImage = (e) => {
    e?.stopPropagation();
    if (lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    }
  };

  const nextImage = (e) => {
    e?.stopPropagation();
    if (lightboxIndex < (book?.photos?.length || 0) - 1) {
      setLightboxIndex(lightboxIndex + 1);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-neutral-50 flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
        <p className="mt-4 text-sm font-medium font-geist text-neutral-500">Carregando fotos do seu book...</p>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-neutral-200 rounded-[2.5rem] p-8 text-center shadow-lg">
          <WarningCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" weight="light" />
          <h1 className="text-xl font-bold text-neutral-900 font-geist">Book não encontrado</h1>
          <p className="text-sm text-neutral-500 mt-2 font-geist">
            {error || 'O link acessado é inválido ou o book foi removido.'}
          </p>
          <a href="/" className="inline-flex mt-6 text-sm text-indigo-600 hover:underline font-medium font-geist">
            Voltar para a Página Principal
          </a>
        </div>
      </div>
    );
  }

  const calculateTotalPrice = (selectedCount, pricePerPhoto, packagePrice, packagePhotos, extraPhotoPrice) => {
    if (packagePrice !== undefined && packagePrice !== null && 
        packagePhotos !== undefined && packagePhotos !== null && 
        extraPhotoPrice !== undefined && extraPhotoPrice !== null) {
      if (selectedCount <= packagePhotos) {
        return Number(packagePrice);
      } else {
        return Number(packagePrice) + (selectedCount - packagePhotos) * Number(extraPhotoPrice);
      }
    }
    const P = Number(pricePerPhoto || 30.00);
    if (selectedCount < 5) {
      return selectedCount * P;
    } else if (selectedCount < 10) {
      const package5Price = 5 * P * 0.8; // 20% discount on the first 5 photos
      const additionalPhotosCount = selectedCount - 5;
      return package5Price + (additionalPhotosCount * P);
    } else {
      const package10Price = 10 * P * 0.7; // 30% discount on the first 10 photos
      const additionalPhotosCount = selectedCount - 10;
      return package10Price + (additionalPhotosCount * P);
    }
  };

  const selectedCount = selectedPhotoIds.length;
  const totalPrice = book ? calculateTotalPrice(selectedCount, book.pricePerPhoto, book.packagePrice, book.packagePhotos, book.extraPhotoPrice) : 0;
  const isPaid = book.paymentStatus === 'paid';

  return (
    <div className="min-h-screen pb-32 sm:p-8 md:p-10 pt-6 pr-6 pl-6 relative">
      {/* Background Aura */}
      <div className="fixed top-0 w-full h-screen -z-10 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50"></div>

      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex gap-4 items-center justify-between mb-8">
          <div className="flex items-center gap-2.5">
            <Camera className="w-5 h-5 text-indigo-600" weight="light" />
            <span className="font-bold font-geist text-neutral-900">Studio Retrato</span>
          </div>
          <div>
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
              isPaid 
                ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/10'
                : 'bg-amber-50 text-amber-800 ring-1 ring-amber-600/10 animate-pulse'
            }`}>
              {isPaid ? '✅ Book Comprado' : '⚡ Aguardando Seleção'}
            </span>
          </div>
        </div>

        {/* Payment Success Notice */}
        {(isPaid || paymentSuccess) && (
          <div className="bg-emerald-50 border border-emerald-200/80 rounded-3xl p-6 mb-8 text-neutral-900">
            <h3 className="text-lg font-bold text-emerald-800 flex items-center gap-2">
              <span>🎉 Seleção Concluída e Paga!</span>
            </h3>
            <p className="text-sm text-emerald-700/90 mt-2 font-geist leading-relaxed">
              Obrigado! O pagamento foi processado com sucesso. Suas {selectedCount} fotos selecionadas foram marcadas para download e envio em alta resolução pelo fotógrafo. Você já pode fechar esta página.
            </p>
          </div>
        )}

        {selectionSubmitted && !isPaid && (
          <div className="bg-indigo-55 border border-indigo-200/80 rounded-3xl p-6 mb-8 text-neutral-900">
            <h3 className="text-lg font-bold text-indigo-800 flex items-center gap-2">
              <span>🎉 Seleção Enviada com Sucesso!</span>
            </h3>
            <p className="text-sm text-indigo-700/90 mt-2 font-geist leading-relaxed">
              Sua seleção de {selectedCount} fotos foi registrada. Para liberar o download e a remoção da marca d'água, realize o pagamento com a fotógrafa Gabriely via PIX ou solicite o link do Mercado Pago.
            </p>
            <div className="mt-4">
              <a
                href={`https://wa.me/5567931990118?text=Oi Gabriely, finalizei a seleção das minhas fotos do book "${encodeURIComponent(book.title)}". O total ficou em ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)}. Me envia o link de pagamento por favor!`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition"
              >
                <span>Solicitar Link de Pagamento (WhatsApp)</span>
              </a>
            </div>
          </div>
        )}

        {/* Book Details Card */}
        <div className="bg-white border border-neutral-200 rounded-[2.5rem] p-8 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <p className="text-xs uppercase text-neutral-400 tracking-wider font-semibold font-geist">Book Cliente</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mt-1 font-geist">{book.title}</h1>
              <p className="text-neutral-500 text-sm mt-1 font-geist">Cliente: <span className="font-semibold text-neutral-700">{book.clientName}</span></p>
            </div>
            
            {!isPaid && (book.packagePrice !== null && book.packagePrice !== undefined ? (
              <div className="bg-neutral-50 rounded-2xl p-4 ring-1 ring-neutral-200/50 text-right">
                <span className="text-xs text-neutral-400 block font-geist font-medium">Valor do Pacote</span>
                <span className="text-xl font-bold text-neutral-900 font-geist">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(book.packagePrice)}
                </span>
                <span className="text-[10px] text-neutral-450 text-neutral-500 block font-geist font-bold mt-0.5">
                  ({book.packagePhotos} fotos inclusas)
                </span>
              </div>
            ) : (
              <div className="bg-neutral-50 rounded-2xl p-4 ring-1 ring-neutral-200/50">
                <span className="text-xs text-neutral-400 block font-geist font-medium">Preço por Foto Selecionada</span>
                <span className="text-xl font-bold text-neutral-900 font-geist">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(book.pricePerPhoto)}
                </span>
              </div>
            ))}
          </div>

          {/* References Section */}
          {book.referencesData && book.referencesData.length > 0 && (
            <div className="mt-8 pt-6 border-t border-neutral-100">
              <p className="text-xs text-neutral-400 font-semibold uppercase tracking-wider mb-3 font-geist">Fotos de Referência Utilizadas</p>
              <div className="flex flex-wrap gap-3">
                {book.referencesData.map((ref, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-neutral-50 hover:bg-neutral-100 transition rounded-xl p-2 pr-3 ring-1 ring-neutral-200/40">
                    <img 
                      className="h-8 w-8 rounded-lg object-cover" 
                      src={ref.url} 
                      alt={ref.name} 
                    />
                    <span className="text-xs font-geist text-neutral-600 font-medium">{ref.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tabela de Pacotes / Descontos */}
          {!isPaid && (
            <div className="mt-8 pt-6 border-t border-neutral-100 font-geist">
              {book.packagePrice !== null && book.packagePrice !== undefined ? (
                <>
                  <p className="text-xs text-neutral-400 font-semibold uppercase tracking-wider mb-4">🎁 Informações do seu Pacote Contratado</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Pacote Completo Card */}
                    <div className={`p-4 rounded-2xl border transition ${selectedCount <= book.packagePhotos ? 'bg-indigo-50/40 border-indigo-150 ring-1 ring-indigo-200' : 'bg-neutral-50/50 border-neutral-200/50'}`}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-neutral-700">Pacote Completo</span>
                        <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-bold">{book.packagePhotos} Fotos</span>
                      </div>
                      <p className="text-lg font-extrabold text-neutral-900">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(book.packagePrice)}
                      </p>
                      <p className="text-[10px] text-neutral-400 mt-1">Valor fixo cobrado pelo pacote que cobre até {book.packagePhotos} fotos.</p>
                    </div>

                    {/* Foto Adicional Card */}
                    <div className={`p-4 rounded-2xl border transition ${selectedCount > book.packagePhotos ? 'bg-indigo-50/40 border-indigo-150 ring-1 ring-indigo-200' : 'bg-neutral-50/50 border-neutral-200/50'}`}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-neutral-700">Foto Extra</span>
                        <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold">Unidade</span>
                      </div>
                      <p className="text-lg font-extrabold text-neutral-900">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(book.extraPhotoPrice)}
                      </p>
                      <p className="text-[10px] text-neutral-400 mt-1">Cobrado por cada foto que exceder o pacote contratado.</p>
                    </div>

                    {/* Resumo da Seleção Card */}
                    <div className="p-4 rounded-2xl border bg-neutral-950 text-white border-neutral-800 transition">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-neutral-300">Sua Seleção</span>
                        <span className="text-[10px] bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded-full font-bold">{selectedCount} selecionada(s)</span>
                      </div>
                      <p className="text-lg font-extrabold text-indigo-400">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)}
                      </p>
                      <p className="text-[10px] text-neutral-400 mt-1">
                        {selectedCount <= book.packagePhotos 
                          ? `Dentro do limite contratado.` 
                          : `${selectedCount - book.packagePhotos} foto(s) extra(s): + ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((selectedCount - book.packagePhotos) * book.extraPhotoPrice)}`
                        }
                      </p>
                    </div>
                  </div>

                  {/* Progress tracker bar */}
                  <div className="mt-5 p-3.5 bg-neutral-50/50 border border-neutral-200/40 rounded-2xl flex items-center justify-between text-xs text-neutral-600">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Progresso:</span>
                      <span className="font-extrabold text-indigo-600">{selectedCount}</span>
                      <span>foto(s) selecionada(s).</span>
                    </div>
                    {selectedCount < book.packagePhotos ? (
                      <p className="text-[10px] text-neutral-500">
                        Você pode selecionar mais <span className="font-bold text-indigo-500">{book.packagePhotos - selectedCount}</span> foto(s) sem custo adicional.
                      </p>
                    ) : selectedCount === book.packagePhotos ? (
                      <p className="text-[10px] text-emerald-600 font-bold">✨ Limite exato do pacote atingido!</p>
                    ) : (
                      <p className="text-[10px] text-amber-600 font-bold">
                        ⚠️ Você adicionou {selectedCount - book.packagePhotos} foto(s) extras ao pacote (+ {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((selectedCount - book.packagePhotos) * book.extraPhotoPrice)}).
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <p className="text-xs text-neutral-400 font-semibold uppercase tracking-wider mb-4">🎁 Pacotes & Descontos Progressivos</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className={`p-4 rounded-2xl border transition ${selectedCount < 5 ? 'bg-indigo-50/40 border-indigo-150 ring-1 ring-indigo-200' : 'bg-neutral-50/50 border-neutral-200/50'}`}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-neutral-700">Foto Avulsa</span>
                        <span className="text-[10px] bg-neutral-200/60 text-neutral-600 px-2 py-0.5 rounded-full font-bold">Base</span>
                      </div>
                      <p className="text-lg font-extrabold text-neutral-900">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(book.pricePerPhoto)}
                      </p>
                      <p className="text-[10px] text-neutral-400 mt-1">Valor por foto avulsa selecionada.</p>
                    </div>
                    
                    <div className={`p-4 rounded-2xl border transition ${selectedCount >= 5 && selectedCount < 10 ? 'bg-indigo-50/40 border-indigo-150 ring-1 ring-indigo-200' : 'bg-neutral-50/50 border-neutral-200/50'}`}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-neutral-700">Pacote 5 Fotos</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">20% OFF</span>
                      </div>
                      <p className="text-lg font-extrabold text-neutral-900">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(book.pricePerPhoto * 5 * 0.8)}
                      </p>
                      <p className="text-[10px] text-neutral-400 mt-1">Primeiras 5 fotos saem por {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(book.pricePerPhoto * 0.8)} cada.</p>
                    </div>

                    <div className={`p-4 rounded-2xl border transition ${selectedCount >= 10 ? 'bg-indigo-50/40 border-indigo-150 ring-1 ring-indigo-200' : 'bg-neutral-50/50 border-neutral-200/50'}`}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-neutral-700">Pacote 10 Fotos</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">30% OFF</span>
                      </div>
                      <p className="text-lg font-extrabold text-neutral-900">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(book.pricePerPhoto * 10 * 0.7)}
                      </p>
                      <p className="text-[10px] text-neutral-400 mt-1">Primeiras 10 fotos saem por {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(book.pricePerPhoto * 0.7)} cada.</p>
                    </div>
                  </div>
                  
                  {/* Progress/Tracker bar */}
                  <div className="mt-5 p-3.5 bg-neutral-50/50 border border-neutral-200/40 rounded-2xl flex items-center justify-between text-xs text-neutral-600">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Progresso:</span>
                      <span className="font-extrabold text-indigo-600">{selectedCount}</span>
                      <span>foto(s) selecionada(s).</span>
                    </div>
                    {selectedCount < 5 && (
                      <p className="text-[10px] text-neutral-500 font-medium">Selecione mais <span className="font-bold text-indigo-500">{5 - selectedCount}</span> para ativar o **Pacote 5 Fotos (20% OFF)**.</p>
                    )}
                    {selectedCount >= 5 && selectedCount < 10 && (
                      <p className="text-[10px] text-neutral-500 font-medium">Pacote 5 ativo! Selecione mais <span className="font-bold text-indigo-500">{10 - selectedCount}</span> para ativar o **Pacote 10 Fotos (30% OFF)**.</p>
                    )}
                    {selectedCount >= 10 && (
                      <p className="text-[10px] text-emerald-600 font-bold">✨ Super Pacote 10 Fotos Ativo com 30% OFF!</p>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Photos Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {book.photos.map((photo, index) => {
            const isSelected = selectedPhotoIds.includes(photo.id);
            const isGenerating = photo.status === 'generating';
            const isFailed = photo.status === 'failed';

            if (isGenerating) {
              return (
                <div 
                  key={photo.id}
                  className="group relative aspect-[3/4] bg-neutral-50 rounded-3xl overflow-hidden shadow-sm ring-1 ring-neutral-200 flex flex-col items-center justify-center p-4 text-center animate-pulse select-none"
                >
                  <Sparkles className="w-8 h-8 text-indigo-500 animate-spin mb-3" />
                  <span className="text-xs font-semibold text-indigo-600 font-geist animate-bounce">Gerando com IA...</span>
                  <span className="text-[10px] text-neutral-400 font-geist mt-1.5 uppercase tracking-wider">{photo.variationType}</span>
                </div>
              );
            }

            if (isFailed) {
              return (
                <div 
                  key={photo.id}
                  className="group relative aspect-[3/4] bg-rose-50/50 rounded-3xl overflow-hidden shadow-sm ring-1 ring-rose-100 flex flex-col justify-between p-4 text-center select-none"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-lg uppercase tracking-wider font-geist">Falhou</span>
                    {photo.error && (
                      <span className="text-[8px] text-neutral-400 font-medium max-w-[60%] truncate" title={photo.error}>
                        {photo.error}
                      </span>
                    )}
                  </div>
                  <div className="my-auto flex flex-col items-center justify-center">
                    <WarningCircle className="w-8 h-8 text-rose-500 mb-2" />
                    <p className="text-[10px] text-rose-600 font-medium font-geist leading-normal mb-3">
                      Não foi possível gerar este retrato.
                    </p>
                    <button
                      onClick={() => handleRegeneratePhoto(photo.id)}
                      className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-3 py-1.5 rounded-xl text-[10px] transition shadow-sm"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Regenerar</span>
                    </button>
                  </div>
                  <div className="bg-black/5 rounded-lg p-1.5 text-[9px] text-neutral-500 font-geist text-center uppercase tracking-wide font-semibold">
                    {photo.variationType}
                  </div>
                </div>
              );
            }

            return (
              <div 
                key={photo.id}
                onClick={() => togglePhotoSelection(photo.id)}
                onContextMenu={(e) => !isPaid && e.preventDefault()}
                className={`group relative aspect-[3/4] bg-white rounded-3xl overflow-hidden shadow-sm ring-1 cursor-pointer transition select-none ${
                  isSelected 
                    ? 'ring-indigo-600 shadow-indigo-600/10' 
                    : 'ring-neutral-200 hover:ring-neutral-300'
                }`}
              >
                {/* Photo image */}
                <img 
                  src={photo.url} 
                  alt={photo.variationType} 
                  className="w-full h-full object-cover pointer-events-none"
                  onContextMenu={(e) => !isPaid && e.preventDefault()}
                />

                {/* Anti-copy transparent overlay when unpaid */}
                {!isPaid && (
                  <div 
                    className="absolute inset-0 bg-transparent select-none z-10"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                )}

                {/* Gradient shade */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>

                {/* Variation Tag Badge */}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-lg font-geist font-medium tracking-wide uppercase">
                  {photo.variationType}
                </div>

                {/* Action Buttons Overlay */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-20">
                  {/* Download button if paid */}
                  {isPaid && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadPhoto(photo.url, `foto-${index + 1}.jpg`);
                      }}
                      className="h-8 w-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md hover:bg-emerald-500 transition"
                      title="Baixar Foto"
                    >
                      <DownloadSimple className="w-4 h-4" weight="light" />
                    </button>
                  )}

                  {/* View Fullscreen button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex(index);
                    }}
                    className="h-8 w-8 rounded-xl bg-white/90 text-neutral-900 flex items-center justify-center shadow-md hover:bg-white"
                  >
                    <Eye className="w-4 h-4" weight="light" />
                  </button>

                  {/* Selection Checkbox indicator */}
                  {!isPaid && (
                    <div className={`h-8 w-8 rounded-xl flex items-center justify-center shadow-md transition ${
                      isSelected 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-white/90 text-neutral-400 group-hover:text-neutral-600'
                    }`}>
                      <Check className="w-4 h-4" weight="light" />
                    </div>
                  )}
                </div>

                {/* Selected Ring Border overlay */}
                {isSelected && (
                  <div className="absolute inset-0 border-2 border-indigo-600 rounded-3xl pointer-events-none"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Floating Selection Panel */}
        {!isPaid && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-3xl bg-neutral-900/95 backdrop-blur-md text-white rounded-[2.2rem] shadow-xl p-5 z-40 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Left side: Shopping Cart & Selected Counts */}
            <div className="flex items-center gap-3.5 w-full sm:w-auto">
              <div className="h-11 w-11 rounded-2xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/20 flex items-center justify-center shadow-inner flex-shrink-0">
                <ShoppingCart className="w-5 h-5" weight="light" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold font-geist">Fotos selecionadas</p>
                <h3 className="text-sm sm:text-base font-bold font-geist mt-0.5 whitespace-nowrap">
                  {selectedCount} de {book?.photos?.length || 0} fotos
                </h3>
              </div>
            </div>

            {/* Middle side: Detailed sub-breakdown */}
            {book && (
              <div className="text-[11px] text-white/50 font-geist border-t sm:border-t-0 sm:border-l border-white/10 pt-2 sm:pt-0 sm:pl-5 flex-1 w-full sm:w-auto flex flex-col justify-center gap-0.5">
                {book.packagePrice !== null && book.packagePrice !== undefined ? (
                  <>
                    <div className="flex justify-between sm:justify-start sm:gap-2">
                      <span>Valor do Pacote:</span>
                      <span className="font-semibold text-white/90">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(book.packagePrice)}</span>
                    </div>
                    <div className="flex justify-between sm:justify-start sm:gap-2">
                      <span>Fotos Extras ({selectedCount > book.packagePhotos ? selectedCount - book.packagePhotos : 0}):</span>
                      <span className="font-semibold text-white/90">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(selectedCount > book.packagePhotos ? (selectedCount - book.packagePhotos) * book.extraPhotoPrice : 0)}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between sm:justify-start sm:gap-2">
                      <span>Preço Base Unitário:</span>
                      <span className="font-semibold text-white/90">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(book.pricePerPhoto)}</span>
                    </div>
                    <div className="flex justify-between sm:justify-start sm:gap-2">
                      <span>Desconto Aplicado:</span>
                      <span className="font-bold text-emerald-400">
                        {selectedCount >= 10 ? '30% OFF' : selectedCount >= 5 ? '20% OFF' : 'Nenhum'}
                      </span>
                    </div>
                  </>
                )}
              </div>
            )}
            
            {/* Right side: Total Price & Button */}
            <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
              <div className="text-left sm:text-right">
                <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold font-geist">Valor Total</p>
                <h3 className="text-lg sm:text-xl font-extrabold font-geist mt-0.5 text-indigo-400 whitespace-nowrap">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)}
                </h3>
              </div>

              <button 
                onClick={() => setShowCheckout(true)}
                disabled={selectedCount === 0}
                className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-5 py-3 rounded-2xl text-xs sm:text-sm transition shadow-lg shadow-indigo-600/20 whitespace-nowrap"
              >
                <span>Finalizar Seleção</span>
                <ArrowRight className="w-4 h-4" weight="light" />
              </button>
            </div>

          </div>
        )}
      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxIndex >= 0 && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onContextMenu={(e) => !isPaid && e.preventDefault()}
        >
          {/* Close button */}
          <button 
            onClick={() => setLightboxIndex(-1)}
            className="absolute top-6 right-6 text-white/70 hover:text-white h-10 w-10 rounded-full bg-white/10 flex items-center justify-center transition"
          >
            <X className="w-6 h-6" weight="light" />
          </button>

          {/* Left Arrow */}
          <button 
            onClick={prevImage}
            disabled={lightboxIndex === 0}
            className="absolute left-6 h-12 w-12 rounded-full bg-white/10 text-white flex items-center justify-center disabled:opacity-20 hover:bg-white/20 transition z-10"
          >
            <ChevronLeft className="w-6 h-6" weight="light" />
          </button>

          {/* Image display */}
          <div className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center">
            <img 
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl select-none" 
              src={book.photos[lightboxIndex].url} 
              alt={book.photos[lightboxIndex].variationType} 
              onContextMenu={(e) => !isPaid && e.preventDefault()}
            />
            
            {/* Anti-copy overlay inside lightbox */}
            {!isPaid && (
              <div 
                className="absolute inset-0 max-h-[80vh] bg-transparent select-none"
                onContextMenu={(e) => e.preventDefault()}
              />
            )}

            <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
              <span className="text-xs tracking-wider uppercase font-geist font-bold text-white/50">
                Variação: {book.photos[lightboxIndex].variationType} | {lightboxIndex + 1} de {book.photos.length}
              </span>
              {isPaid && (
                <button
                  onClick={() => downloadPhoto(book.photos[lightboxIndex].url, `foto-${lightboxIndex + 1}.jpg`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-geist shadow transition-colors"
                >
                  <DownloadSimple className="w-3.5 h-3.5" weight="light" />
                  <span>Baixar Foto</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Arrow */}
          <button 
            onClick={nextImage}
            disabled={lightboxIndex === book.photos.length - 1}
            className="absolute right-6 h-12 w-12 rounded-full bg-white/10 text-white flex items-center justify-center disabled:opacity-20 hover:bg-white/20 transition z-10"
          >
            <ChevronRight className="w-6 h-6" weight="light" />
          </button>
        </div>
      )}

      {/* CHECKOUT / PAYMENT MODAL */}
      {showCheckout && (
        <div className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-200 rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl relative animate-scaleUp">
            {/* Close button */}
            <button 
              onClick={() => setShowCheckout(false)}
              className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-600 h-8 w-8 rounded-full bg-neutral-50 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" weight="light" />
            </button>

            <div className="mb-4">
              <h3 className="text-xl font-bold text-neutral-900 font-geist">Confirmar Seleção</h3>
              <p className="text-sm text-neutral-500 mt-1 font-geist">Confirme sua seleção de fotos e realize o pagamento via PIX para concluir.</p>
            </div>

            {/* Price review */}
            <div className="bg-neutral-50 rounded-2xl p-5 mb-6 ring-1 ring-neutral-200/50 space-y-3 font-geist">
              {book.packagePrice !== null && book.packagePrice !== undefined ? (
                <>
                  <div className="flex justify-between text-sm text-neutral-600">
                    <span>Fotos selecionadas:</span>
                    <span className="font-semibold text-neutral-800">{selectedCount}</span>
                  </div>
                  <div className="flex justify-between text-sm text-neutral-600">
                    <span>Pacote ({book.packagePhotos} fotos inclusas):</span>
                    <span className="font-semibold text-neutral-800">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(book.packagePrice)}
                    </span>
                  </div>
                  {selectedCount > book.packagePhotos && (
                    <div className="text-xs space-y-1.5 border-t border-dashed border-neutral-200 pt-2 text-neutral-500">
                      <div className="flex justify-between font-medium">
                        <span>{selectedCount - book.packagePhotos} foto(s) extra(s) (x {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(book.extraPhotoPrice)}):</span>
                        <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((selectedCount - book.packagePhotos) * book.extraPhotoPrice)}</span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="flex justify-between text-sm text-neutral-600">
                    <span>Fotos selecionadas:</span>
                    <span className="font-semibold text-neutral-800">{selectedCount}</span>
                  </div>
                  <div className="flex justify-between text-sm text-neutral-600">
                    <span>Preço base por foto:</span>
                    <span className="font-semibold text-neutral-800">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(book.pricePerPhoto)}
                    </span>
                  </div>

                  {/* Detailed package breakdowns */}
                  {selectedCount >= 5 && (
                    <div className="text-xs space-y-1.5 border-t border-dashed border-neutral-200 pt-2 text-neutral-500">
                      {selectedCount >= 5 && selectedCount < 10 && (
                        <>
                          <div className="flex justify-between font-medium">
                            <span>Pacote 5 Fotos (20% OFF):</span>
                            <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(book.pricePerPhoto * 5 * 0.8)}</span>
                          </div>
                          {selectedCount > 5 && (
                            <div className="flex justify-between">
                              <span>{selectedCount - 5} foto(s) adicional(is):</span>
                              <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((selectedCount - 5) * book.pricePerPhoto)}</span>
                            </div>
                          )}
                        </>
                      )}
                      {selectedCount >= 10 && (
                        <>
                          <div className="flex justify-between font-medium text-emerald-755 text-emerald-700">
                            <span>Pacote 10 Fotos (30% OFF):</span>
                            <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(book.pricePerPhoto * 10 * 0.7)}</span>
                          </div>
                          {selectedCount > 10 && (
                            <div className="flex justify-between">
                              <span>{selectedCount - 10} foto(s) adicional(is):</span>
                              <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((selectedCount - 10) * book.pricePerPhoto)}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </>
              )}

              <hr className="border-neutral-200" />
              <div className="flex justify-between text-base font-bold text-neutral-900">
                <span>Valor Final:</span>
                <span className="text-indigo-600">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)}
                </span>
              </div>
            </div>

            <form onSubmit={handleCheckoutSubmit} className="space-y-5">
              {/* PIX Details */}
              {paymentMethod === 'pix' && (
                <div className="space-y-4">
                  <div className="bg-indigo-50/50 rounded-2xl p-5 border border-indigo-100 flex flex-col items-center">
                    <p className="text-xs text-indigo-800 font-bold uppercase tracking-wider mb-3 font-geist">
                      {settings?.pixKey ? 'Chave PIX do Fotógrafo' : 'Chave PIX (Copia e Cola)'}
                    </p>
                    <div className="bg-white p-2.5 rounded-xl border border-indigo-200 w-full select-all text-xs font-mono text-center text-neutral-750 break-all pointer-events-auto font-bold">
                      {settings?.pixKey || 'pix@studioretrato.com'}
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(settings?.pixKey || 'pix@studioretrato.com')}
                      className="mt-3 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all"
                    >
                      {copied ? <Check className="w-3 h-3" weight="light" /> : <Copy className="w-3 h-3" weight="light" />}
                      <span>{copied ? 'Copiado!' : 'Copiar Chave'}</span>
                    </button>
                  </div>
                  <p className="text-[10px] text-neutral-400 font-geist text-center">Efetue o PIX no aplicativo do seu banco e clique no botão abaixo para confirmar a seleção de fotos.</p>
                </div>
              )}

              <button
                type="submit"
                disabled={paymentLoading}
                className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium py-3.5 rounded-2xl text-sm transition shadow-lg shadow-indigo-600/20"
              >
                {paymentLoading ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                    <span>Salvando Seleção...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" weight="light" />
                    <span>Confirmar Seleção de Fotos</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
