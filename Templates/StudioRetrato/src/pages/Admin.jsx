import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { encodeBookData } from '../services/urlSerializer';
import { 
  Users, 
  BookOpen, 
  Books as Library, 
  Gear as SettingsIcon,
  SignOut as LogOut,
  Plus,
  Trash,
  Eye,
  Link as LinkIcon,
  UploadSimple as Upload,
  Sparkle as Sparkles,
  X,
  MagnifyingGlass as Search,
  Check,
  Camera,
  WarningCircle as AlertCircle,
  Copy,
  ClipboardText as ClipboardCheck,
  Pencil
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

const UNSPLASH_MOCK_PORTRAITS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=600",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600",
  "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=600",
  "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=600",
  "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=600",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=600"
];

// ── Reference Card ─────────────────────────────────────────────────────────
function RefCard({ refData: r, categories, onDelete, onUpdateCategory, onUpdateOrder }) {
  const [copied, setCopied] = useState(false);

  const handleCopyPrompt = () => {
    if (!r.prompt) return;
    navigator.clipboard.writeText(r.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm flex flex-col hover:shadow-md hover:border-neutral-300 transition-all duration-200">

      {/* ── Image com título sobreposto ──── */}
      <div className="aspect-[4/5] bg-neutral-100 relative flex-shrink-0">
        <img
          src={r.url}
          alt={r.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none'; }}
        />

        {/* Gradiente de baixo para cima */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

        {/* Deletar — canto superior direito (aparece no hover) */}
        <button
          onClick={() => onDelete(r.id, r.url)}
          className="absolute top-2.5 right-2.5 h-7 w-7 rounded-xl bg-white/90 hover:bg-rose-50 text-rose-500 hover:text-rose-600 flex items-center justify-center shadow transition opacity-0 group-hover:opacity-100"
          title="Excluir referência"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>

        {/* Título + Ordem dentro da imagem — fundo do card */}
        <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 pt-8">
          <div className="flex items-end justify-between gap-2">
            <h4
              className="text-white text-[13px] font-semibold font-geist leading-tight flex-1 min-w-0"
              style={{ textShadow: '0 1px 6px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.8)' }}
              title={r.name}
            >
              {r.name}
            </h4>
            <span
              className="flex-shrink-0 text-white/80 text-[10px] font-mono font-bold"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}
            >
              #{r.order}
            </span>
          </div>
        </div>
      </div>

      {/* ── Info compacta ─────────────────── */}
      <div className="p-3 flex flex-col gap-2 font-geist">

        {/* Prompt com botão copiar */}
        <div className="bg-neutral-50 border border-neutral-100 rounded-xl p-2.5">
          <div className="flex items-start gap-2">
            <div className="flex-1 min-w-0">
              <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Prompt</span>
              <p className="text-[11px] text-neutral-600 font-mono leading-relaxed line-clamp-2">
                {r.prompt || <span className="italic text-neutral-300">Sem prompt</span>}
              </p>
            </div>
            <button
              onClick={handleCopyPrompt}
              title={copied ? 'Copiado!' : 'Copiar prompt'}
              className={`flex-shrink-0 mt-4 h-6 w-6 rounded-md flex items-center justify-center transition-all duration-200 ${
                copied
                  ? 'bg-emerald-100 text-emerald-600'
                  : 'bg-white border border-neutral-200 text-neutral-400 hover:border-indigo-400 hover:text-indigo-600'
              }`}
            >
              {copied ? <ClipboardCheck className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* Controles empilhados */}
        <div className="flex flex-col gap-2">
          <div>
            <label className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Categoria</label>
            <select
              value={r.category || ''}
              onChange={(e) => onUpdateCategory(r.id, e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-2 py-1.5 text-[11px] font-geist text-neutral-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition"
            >
              <option value="">— sem categoria —</option>
              {categories.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Ordem</label>
            <input
              type="number"
              value={r.order}
              onChange={(e) => onUpdateOrder(r.id, e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-2 py-1.5 text-[11px] font-geist text-neutral-700 text-center focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition"
            />
          </div>
        </div>

      </div>
    </div>
  );
}

const generateImagenImage = async (prompt, apiKey) => {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instances: [
          {
            prompt: prompt
          }
        ],
        parameters: {
          sampleCount: 1,
          aspectRatio: "3:4",
          outputMimeType: "image/jpeg"
        }
      })
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Erro na API NanoBanana Pro (Imagen): ${response.status} - ${errText}`);
  }

  const data = await response.json();
  const base64 = data.predictions?.[0]?.bytesBase64Encoded;
  if (!base64) {
    throw new Error('Nenhuma imagem retornada pelo motor NanoBanana Pro.');
  }
  return base64;
};

const getVariationPrompt = (basePrompt, varType) => {
  switch (varType) {
    case 'pose':
      return `${basePrompt}, looking slightly away from the camera, candid pose variation`;
    case 'expression':
      return `${basePrompt}, gentle smile, relaxed facial expression`;
    case 'environment':
      return `${basePrompt}, alternative background, different studio setting or soft natural outdoor background`;
    case 'lighting':
      return `${basePrompt}, different lighting mood, warm golden hour soft sunlight`;
    default:
      return basePrompt;
  }
};

export default function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('books'); // books, clients, references, settings
  const [settings, setSettings] = useState({
    pricePerPhoto: 30.00,
    mercadoPagoSandbox: true,
    mercadoPagoPublicKey: '',
    pixKey: '',
    geminiApiKey: ''
  });

  // DB States
  const [clients, setClients] = useState([]);
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [references, setReferences] = useState([]);

  // Modals visibility
  const [showClientModal, setShowClientModal] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const [showRefModal, setShowRefModal] = useState(false);
  const [showCatModal, setShowCatModal] = useState(false);
  const [showViewBookModal, setShowViewBookModal] = useState(false);
  const [showRefSelector, setShowRefSelector] = useState(false);
  const [showCopyCenterModal, setShowCopyCenterModal] = useState(false);
  const [copyCenterData, setCopyCenterData] = useState(null);
  const [copiedMap, setCopiedMap] = useState({});
  const [isUploadingFiles, setIsUploadingFiles] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');

  // Form States
  const [clientForm, setClientForm] = useState({ name: '', phone: '', email: '' });
  const [newClientFiles, setNewClientFiles] = useState([]);
  const [newClientPreviews, setNewClientPreviews] = useState([]);
  const [bookClientFiles, setBookClientFiles] = useState([]);
  const [bookClientPreviews, setBookClientPreviews] = useState([]);
  const [bookForm, setBookForm] = useState({
    title: '',
    clientId: '',
    pricePerPhoto: '',
    packagePrice: 50.00,
    packagePhotos: 2,
    extraPhotoPrice: 10.00,
    qty: 5
  });
  const [selectedRefs, setSelectedRefs] = useState([]); // Array of reference IDs selected for new book
  const [categoryForm, setCategoryForm] = useState({ id: '', name: '' });

  // Edit Client States
  const [showEditClientModal, setShowEditClientModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [editClientForm, setEditClientForm] = useState({ name: '', phone: '', email: '' });
  const [editClientFiles, setEditClientFiles] = useState([]);
  const [editClientPreviews, setEditClientPreviews] = useState([]);
  
  // Reference Form
  const [refForm, setRefForm] = useState({ name: '', category: '', prompt: '' });
  const [refFiles, setRefFiles] = useState([]);
  const [refPreviews, setRefPreviews] = useState([]);
  const [isExtractingPrompt, setIsExtractingPrompt] = useState(false);
  const [extractionLogs, setExtractionLogs] = useState([]);

  // IA Pipeline Modal State
  const [showPipelineModal, setShowPipelineModal] = useState(false);
  const [pipelineProgress, setPipelineProgress] = useState(0);
  const [pipelineLogs, setPipelineLogs] = useState([]);

  // View Book Details Modal State
  const [activeViewBook, setActiveViewBook] = useState(null);

  // Search & Filter for reference selector
  const [refSearch, setRefSearch] = useState('');
  const [refFilter, setRefFilter] = useState('Todos');

  // Load dashboard data on mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    // 1. Fetch settings
    const { data: setts } = await supabase.from('settings').select('*').eq('key', 'general').single();
    if (setts?.value) {
      setSettings(setts.value);
    }

    // 2. Fetch clients
    const { data: clis } = await supabase.from('clients').select('*').order('created_at', { ascending: false });
    setClients(clis || []);

    // 3. Fetch books
    const { data: bks } = await supabase.from('books').select('*, client:clients(name, photo_url)').order('created_at', { ascending: false });
    setBooks(bks || []);

    // 4. Fetch categories
    const { data: cats } = await supabase.from('categories').select('*');
    setCategories(cats || []);

    // 5. Fetch references
    const { data: refs } = await supabase.from('references').select('*').order('order', { ascending: true });
    setReferences(refs || []);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  // Helper to upload file/blob to Supabase Storage
  const uploadToStorage = async (fileOrBlob, path) => {
    const { data, error } = await supabase.storage
      .from('studioretrato-assets')
      .upload(path, fileOrBlob, {
        contentType: 'image/jpeg',
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      throw new Error(`Storage upload error: ${error.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
      .from('studioretrato-assets')
      .getPublicUrl(path);

    return publicUrl;
  };

  // ----------------------------------------------------
  // CLIENT ACTIONS
  // ----------------------------------------------------
  const handleCreateClient = async (e) => {
    e.preventDefault();
    const id = 'cli_' + Date.now();
    try {
      let uploadedUrls = [];
      if (newClientFiles && newClientFiles.length > 0) {
        for (let i = 0; i < newClientFiles.length; i++) {
          const file = newClientFiles[i];
          const photoPath = `clients/${id}_face_${i}_${Date.now()}.jpg`;
          const url = await uploadToStorage(file, photoPath);
          uploadedUrls.push(url);
        }
      }

      const { error } = await supabase
        .from('clients')
        .insert([{
          id,
          name: clientForm.name,
          phone: clientForm.phone,
          email: clientForm.email,
          photo_url: uploadedUrls.length > 0 ? JSON.stringify(uploadedUrls) : null
        }]);

      if (error) throw error;

      setClientForm({ name: '', phone: '', email: '' });
      setNewClientFiles([]);
      setNewClientPreviews([]);
      setShowClientModal(false);
      fetchDashboardData();
    } catch (err) {
      alert('Erro ao criar cliente: ' + err.message);
    }
  };

  const openEditClient = (cli) => {
    setEditingClient(cli);
    setEditClientForm({ name: cli.name || '', phone: cli.phone || '', email: cli.email || '' });
    setEditClientFiles([]);
    setEditClientPreviews(parsePhotos(cli.photo_url));
    setShowEditClientModal(true);
  };

  const handleEditClientSubmit = async (e) => {
    e.preventDefault();
    try {
      let uploadedUrls = [];
      if (editClientFiles && editClientFiles.length > 0) {
        for (let i = 0; i < editClientFiles.length; i++) {
          const file = editClientFiles[i];
          const photoPath = `clients/${editingClient.id}_face_${i}_${Date.now()}.jpg`;
          const url = await uploadToStorage(file, photoPath);
          uploadedUrls.push(url);
        }
      }

      // Filter out files previews that were removed and keep remaining URLs
      const remainingExistingUrls = editClientPreviews.filter(p => p.startsWith('http'));
      const finalUrls = [...remainingExistingUrls, ...uploadedUrls];

      const { error } = await supabase
        .from('clients')
        .update({
          name: editClientForm.name,
          phone: editClientForm.phone,
          email: editClientForm.email,
          photo_url: finalUrls.length > 0 ? JSON.stringify(finalUrls) : null
        })
        .eq('id', editingClient.id);

      if (error) throw error;

      setShowEditClientModal(false);
      setEditingClient(null);
      setEditClientFiles([]);
      setEditClientPreviews([]);
      fetchDashboardData();
    } catch (err) {
      alert('Erro ao editar cliente: ' + err.message);
    }
  };

  const handleDeleteClient = async (id) => {
    if (window.confirm('Excluir este cliente apagará todos os seus books e seleções de fotos. Confirmar?')) {
      const { error } = await supabase.from('clients').delete().eq('id', id);
      if (error) alert('Erro ao excluir: ' + error.message);
      else fetchDashboardData();
    }
  };

  // ----------------------------------------------------
  // SETTINGS ACTIONS
  // ----------------------------------------------------
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('settings')
      .upsert({ key: 'general', value: settings });

    if (error) alert('Erro ao salvar configurações: ' + error.message);
    else alert('Configurações salvas com sucesso!');
  };

  // ----------------------------------------------------
  // CATEGORY ACTIONS
  // ----------------------------------------------------
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    const catId = categoryForm.id.toLowerCase().replace(/\s+/g, '_');
    const { error } = await supabase
      .from('categories')
      .insert([{ id: catId, name: categoryForm.name }]);

    if (error) {
      alert('Erro ao criar categoria: ' + error.message);
    } else {
      setCategoryForm({ id: '', name: '' });
      setShowCatModal(false);
      fetchDashboardData();
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Deseja excluir esta categoria? As referências vinculadas a ela continuarão existindo.')) {
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) alert('Erro ao excluir categoria: ' + error.message);
      else fetchDashboardData();
    }
  };

  // ----------------------------------------------------
  // REFERENCE ACTIONS
  // ----------------------------------------------------
  const handleRefFileChange = (e) => {
    const files = Array.from(e.target.files);
    setRefFiles(files);

    const previews = files.map(file => URL.createObjectURL(file));
    setRefPreviews(previews);

    if (files.length === 1 && !refForm.name) {
      // Auto fill name with filename without extension
      const name = files[0].name.replace(/\.[^/.]+$/, "");
      setRefForm(prev => ({ ...prev, name }));
    }
  };

  // Describe the client's face using Gemini for consistency
  const describeClientFace = async (fileOrUrl) => {
    if (!settings.geminiApiKey) return "";
    try {
      let base64Data = "";
      let mimeType = "image/jpeg";
      
      if (fileOrUrl instanceof File || fileOrUrl instanceof Blob) {
        mimeType = fileOrUrl.type || "image/jpeg";
        const reader = new FileReader();
        base64Data = await new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result.split(',')[1]);
          reader.readAsDataURL(fileOrUrl);
        });
      } else {
        // Fetch from URL
        const res = await fetch(fileOrUrl);
        const blob = await res.blob();
        mimeType = blob.type || "image/jpeg";
        base64Data = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result.split(',')[1]);
          reader.readAsDataURL(blob);
        });
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${settings.geminiApiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [
                { text: 'Describe the main physical features of the person in this photo for an AI Image Generator prompt. Be very brief, focusing only on gender/age, hair type/color, skin tone/ethnicity, and facial details (like glasses or beard if any). Do NOT describe clothing, background, or lighting. Example output: "A photo of a 30-year-old woman with long brown wavy hair, light brown skin, brown eyes"' },
                { inlineData: { mimeType, data: base64Data } }
              ]
            }]
          })
        }
      );

      const json = await response.json();
      return json.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
    } catch (err) {
      console.error("Error describing client face:", err);
      return "";
    }
  };

  // Call Gemini API to analyze uploaded face references and suggest prompts
  const extractPromptsWithGemini = async () => {
    if (refFiles.length === 0) {
      alert('Faça o upload de ao menos uma imagem de referência.');
      return;
    }
    if (!settings.geminiApiKey) {
      alert('Configure a chave da API do Gemini nas configurações antes de extrair prompts.');
      return;
    }

    setIsExtractingPrompt(true);
    setExtractionLogs(['[IA] Inicializando extração...', '[IA] Codificando imagem em Base64...']);

    try {
      const file = refFiles[0];
      const reader = new FileReader();

      const base64Promise = new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(file);
      });

      const base64Data = await base64Promise;
      setExtractionLogs(prev => [...prev, '[IA] Conectando ao Google Gemini Vision...', '[IA] Analisando pose, iluminação e vestuário do retrato...']);

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${settings.geminiApiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [
                { text: 'Describe style, pose, background, details of this face portrait for an AI Image Generator prompt. Keep it highly detailed but concise, maximum 45 words. Example: "A professional business headshot, studio soft lighting, blurred office background, wearing dark blazer, highly realistic face details, f/1.8"' },
                { inlineData: { mimeType: file.type || 'image/jpeg', data: base64Data } }
              ]
            }]
          })
        }
      );

      const json = await response.json();
      const textResult = json.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      if (textResult) {
        setRefForm(prev => ({ ...prev, prompt: textResult }));
        setExtractionLogs(prev => [...prev, '[IA] Prompt extraído com sucesso!', `[Prompt]: "${textResult}"`]);
      } else {
        throw new Error(json.error?.message || 'Falha ao analisar imagem.');
      }

    } catch (err) {
      console.error('Gemini extraction error:', err);
      setExtractionLogs(prev => [...prev, `[ERRO]: ${err.message}`]);
    } finally {
      setIsExtractingPrompt(false);
    }
  };

  const handleCreateReference = async (e) => {
    e.preventDefault();
    if (refFiles.length === 0) {
      alert('Selecione uma imagem de referência.');
      return;
    }

    try {
      const file = refFiles[0];
      const id = 'ref_' + Date.now();
      const storagePath = `references/${id}_${file.name}`;
      
      // 1. Upload to Supabase Storage
      const publicUrl = await uploadToStorage(file, storagePath);

      // 2. Save record to references table
      const { error: dbError } = await supabase
        .from('references')
        .insert([{
          id,
          name: refForm.name,
          category: refForm.category,
          url: publicUrl,
          prompt: refForm.prompt || 'Portrait styling reference',
          public: true,
          order: references.length + 1
        }]);

      if (dbError) throw dbError;

      // Reset
      setRefForm({ name: '', category: '', prompt: '' });
      setRefFiles([]);
      setRefPreviews([]);
      setExtractionLogs([]);
      setShowRefModal(false);
      fetchDashboardData();

    } catch (err) {
      alert('Erro ao criar referência: ' + err.message);
    }
  };

  const handleDeleteReference = async (id, url) => {
    if (window.confirm('Excluir esta referência do catálogo?')) {
      // 1. Delete DB record
      const { error: dbErr } = await supabase.from('references').delete().eq('id', id);
      if (dbErr) {
        alert('Erro ao excluir: ' + dbErr.message);
        return;
      }

      // 2. Try to delete from storage
      try {
        const path = url.split('/studioretrato-assets/')[1];
        if (path) {
          await supabase.storage.from('studioretrato-assets').remove([path]);
        }
      } catch (e) {
        console.warn('Failed to delete asset from Storage:', e);
      }

      fetchDashboardData();
    }
  };

  const updateRefOrder = async (id, newOrder) => {
    const { error } = await supabase
      .from('references')
      .update({ order: parseInt(newOrder) || 0 })
      .eq('id', id);
    if (error) console.error('Error updating order:', error);
    else fetchDashboardData();
  };

  const updateRefCategory = async (id, newCat) => {
    const { error } = await supabase
      .from('references')
      .update({ category: newCat })
      .eq('id', id);
    if (error) console.error('Error updating category:', error);
    else fetchDashboardData();
  };

  // ----------------------------------------------------
  // BOOK / IMAGE PIPELINE ACTIONS
  // ----------------------------------------------------
  const toggleRefSelectorItem = (refId) => {
    setSelectedRefs(prev => 
      prev.includes(refId) ? prev.filter(id => id !== refId) : [...prev, refId]
    );
  };

  const handleCreateBook = async (e) => {
    e.preventDefault();
    if (!bookForm.clientId) {
      alert('Selecione um cliente.');
      return;
    }
    if (selectedRefs.length === 0) {
      alert('Selecione pelo menos uma imagem de referência de pose/estilo.');
      return;
    }

    const hasPackagePrice = bookForm.packagePrice !== '' && bookForm.packagePrice !== null;
    const hasPackagePhotos = bookForm.packagePhotos !== '' && bookForm.packagePhotos !== null;
    const hasExtraPhotoPrice = bookForm.extraPhotoPrice !== '' && bookForm.extraPhotoPrice !== null;
    const hasPricePerPhoto = bookForm.pricePerPhoto !== '' && bookForm.pricePerPhoto !== null;

    if (hasPackagePrice || hasPackagePhotos || hasExtraPhotoPrice) {
      if (!hasPackagePrice || !hasPackagePhotos || !hasExtraPhotoPrice) {
        alert('Por favor, preencha todos os campos do pacote (Valor, Fotos Inclusas e Preço Extra) ou deixe todos vazios para usar o preço por foto avulsa.');
        return;
      }
    } else if (!hasPricePerPhoto) {
      alert('Por favor, preencha o sistema de pacote ou insira o preço por foto avulsa.');
      return;
    }

    const bookId = 'book_' + Date.now();
    
    // Start Pipeline Visual Modal for facial analysis
    setShowPipelineModal(true);
    setPipelineProgress(10);
    setPipelineLogs([
      '🌊 Iniciando pipeline de processamento do Studio Retrato...',
      `📂 Criando book ID: ${bookId} com base em ${selectedRefs.length} referências selecionadas...`
    ]);

    try {
      // Step 0: Upload client reference image if provided
      let clientPhotos = parsePhotos(clients.find(c => c.id === bookForm.clientId)?.photo_url);
      if (bookClientFiles && bookClientFiles.length > 0) {
        setPipelineLogs(prev => [...prev, `📸 Enviando ${bookClientFiles.length} foto(s) de referência da cliente para o storage...`]);
        const newlyUploaded = [];
        for (let i = 0; i < bookClientFiles.length; i++) {
          const file = bookClientFiles[i];
          const clientPhotoPath = `clients/${bookForm.clientId}_face_${i}_${Date.now()}.jpg`;
          const url = await uploadToStorage(file, clientPhotoPath);
          newlyUploaded.push(url);
        }
        clientPhotos = [...clientPhotos, ...newlyUploaded];
        
        // Update client record in DB
        await supabase
          .from('clients')
          .update({ photo_url: JSON.stringify(clientPhotos) })
          .eq('id', bookForm.clientId);
        
        setPipelineLogs(prev => [...prev, '✅ Fotos de referência da cliente salvas com sucesso!']);
      }

      setPipelineProgress(30);

      // Step 0.5: Generate client description from face photo using Gemini
      let clientDescription = "";
      const mainRefSource = bookClientFiles?.[0] || clientPhotos[0];
      if (mainRefSource && settings.geminiApiKey) {
        setPipelineLogs(prev => [...prev, '🧠 Analisando características faciais da cliente com IA para consistência...']);
        clientDescription = await describeClientFace(mainRefSource);
        if (clientDescription) {
          setPipelineLogs(prev => [...prev, `👤 Perfil facial detectado: "${clientDescription}"`]);
        }
      }

      setPipelineProgress(60);

      const selectedRefsObjs = references.filter(r => selectedRefs.includes(r.id));
      setPipelineLogs(prev => [...prev, '📝 Estruturando prompts de cada referência selecionada...']);

      // Build the Master Prompt (generic)
      const promptHeader = `Por favor, utilize a foto da cliente em anexo como referência principal de rosto, fisionomia, expressões e corpo para manter total fidelidade e consistência de identidade. Recrie a cliente nas poses, roupas, iluminação e cenários apresentados nas fotos de referência anexadas. Mantenha os traços físicos e faciais idênticos aos da cliente em cada imagem gerada.`;
      
      let refPromptsList = "";
      selectedRefsObjs.forEach((r, idx) => {
        refPromptsList += `\nReferência ${idx + 1} (${r.name}): ${r.prompt || 'Portrait pose'}`;
      });

      const masterPrompt = `${promptHeader}\n${refPromptsList}`;

      setPipelineProgress(80);
      setPipelineLogs(prev => [...prev, '💾 Salvando informações do book na tabela PostgreSQL...']);

      // Format references data to save inside jsonb
      const referencesData = selectedRefsObjs.map(r => ({ name: r.name, url: r.url, prompt: r.prompt }));

      // Insert book record in Supabase DB with empty photos array initially
      const { error: dbError } = await supabase
        .from('books')
        .insert([{
          id: bookId,
          client_id: bookForm.clientId,
          title: bookForm.title,
          price_per_photo: bookForm.pricePerPhoto !== '' && bookForm.pricePerPhoto !== null ? Number(bookForm.pricePerPhoto) : null,
          package_price: bookForm.packagePrice !== '' && bookForm.packagePrice !== null ? Number(bookForm.packagePrice) : null,
          package_photos: bookForm.packagePhotos !== '' && bookForm.packagePhotos !== null ? Number(bookForm.packagePhotos) : null,
          extra_photo_price: bookForm.extraPhotoPrice !== '' && bookForm.extraPhotoPrice !== null ? Number(bookForm.extraPhotoPrice) : null,
          references_used: selectedRefs,
          references_data: referencesData,
          photos: [], // initially empty, user will drag and drop
          payment_status: 'pending',
          selected_photo_ids: []
        }]);

      if (dbError) throw dbError;

      setPipelineProgress(100);
      setPipelineLogs(prev => [...prev, '🎉 Sucesso! Book estruturado com sucesso!']);
      
      // Save copy center data
      setCopyCenterData({
        bookId,
        masterPrompt,
        clientPhotoUrl: clientPhotos[0],
        clientPhotoUrls: clientPhotos,
        references: selectedRefsObjs.map(r => ({
          id: r.id,
          name: r.name,
          url: r.url,
          prompt: r.prompt
        }))
      });
      setShowCopyCenterModal(true);

      // Refresh books list
      fetchDashboardData();

      // Reset book creation form & states
      setBookForm(prev => ({ ...prev, title: '' }));
      setBookClientFiles([]);
      setBookClientPreviews([]);
      setSelectedRefs([]);
      setShowBookModal(false);
      fetchDashboardData();

      // Show Copy Center summary modal and close pipeline loader
      setTimeout(() => {
        setShowPipelineModal(false);
        setShowCopyCenterModal(true);
      }, 800);

    } catch (err) {
      console.error('Pipeline error:', err);
      setPipelineLogs(prev => [...prev, `❌ [ERRO PIPELINE]: ${err.message}`]);
    }
  };

  const handleBulkUpload = async (files) => {
    if (!files || files.length === 0) return;
    setIsUploadingFiles(true);
    setUploadProgress(`Preparando upload de ${files.length} arquivo(s)...`);

    try {
      const updatedPhotos = [...(activeViewBook.photos || [])];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadProgress(`Enviando arquivo ${i + 1} de ${files.length}...`);

        const photoId = `img_uploaded_${i}_${Date.now()}`;
        const storagePath = `books/${activeViewBook.id}/${photoId}.jpg`;
        const publicUrl = await uploadToStorage(file, storagePath);

        updatedPhotos.push({
          id: photoId,
          url: publicUrl,
          variationType: 'normal'
        });
      }

      // Update the book in Supabase PostgreSQL
      const { error } = await supabase
        .from('books')
        .update({ photos: updatedPhotos })
        .eq('id', activeViewBook.id);

      if (error) throw error;

      // Update activeViewBook state
      setActiveViewBook(prev => ({
        ...prev,
        photos: updatedPhotos
      }));

      // Refresh books list
      fetchDashboardData();
      alert(`${files.length} foto(s) enviada(s) com sucesso!`);
    } catch (err) {
      console.error(err);
      alert('Erro no upload: ' + err.message);
    } finally {
      setIsUploadingFiles(false);
      setUploadProgress('');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleBulkUpload(files);
  };

  const handleCopyText = (key, text) => {
    navigator.clipboard.writeText(text);
    setCopiedMap(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopiedMap(prev => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const handleCopyImagesClipboard = async (urls, key) => {
    try {
      setCopiedMap(prev => ({ ...prev, [key]: 'loading' }));
      
      const htmlString = urls.map(url => `<img src="${url}" />`).join('');
      const plainText = urls.join('\n');
      
      const clipboardData = [
        new ClipboardItem({
          'text/html': new Blob([htmlString], { type: 'text/html' }),
          'text/plain': new Blob([plainText], { type: 'text/plain' })
        })
      ];
      
      await navigator.clipboard.write(clipboardData);
      setCopiedMap(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedMap(prev => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (err) {
      console.error('Erro ao copiar imagens:', err);
      try {
        await navigator.clipboard.writeText(urls.join('\n'));
        setCopiedMap(prev => ({ ...prev, [key]: true }));
        setTimeout(() => {
          setCopiedMap(prev => ({ ...prev, [key]: false }));
        }, 2000);
      } catch (fallbackErr) {
        alert('Erro ao copiar imagens: ' + err.message);
        setCopiedMap(prev => ({ ...prev, [key]: false }));
      }
    }
  };

  const handleDeleteBook = async (id) => {
    if (window.confirm('Deseja excluir este book e todos os retratos gerados nele?')) {
      const { error: dbErr } = await supabase.from('books').delete().eq('id', id);
      if (dbErr) {
        alert('Erro ao deletar book: ' + dbErr.message);
        return;
      }

      // Try to clean up storage folder (books/{id}/*)
      try {
        const { data: files } = await supabase.storage.from('studioretrato-assets').list(`books/${id}`);
        if (files && files.length > 0) {
          const filesToDelete = files.map(f => `books/${id}/${f.name}`);
          await supabase.storage.from('studioretrato-assets').remove(filesToDelete);
        }
      } catch (e) {
        console.warn('Failed to clean up storage folders:', e);
      }

      fetchDashboardData();
    }
  };

  const handleMarkAsPaid = async (bookId) => {
    try {
      const { error } = await supabase
        .from('books')
        .update({ payment_status: 'paid' })
        .eq('id', bookId);
        
      if (error) throw error;
      
      setBooks(prev => prev.map(b => b.id === bookId ? { ...b, payment_status: 'paid' } : b));
      if (activeViewBook && activeViewBook.id === bookId) {
        setActiveViewBook(prev => ({ ...prev, payment_status: 'paid' }));
      }
      alert('Book marcado como pago com sucesso!');
    } catch (err) {
      alert('Erro ao marcar como pago: ' + err.message);
    }
  };

  const handleDeletePhoto = async (photoId) => {
    if (!window.confirm('Tem certeza que deseja excluir esta foto do book?')) return;
    try {
      const updatedPhotos = activeViewBook.photos.filter(p => p.id !== photoId);
      const updatedSelectedIds = (activeViewBook.selected_photo_ids || []).filter(id => id !== photoId);
      
      const { error } = await supabase
        .from('books')
        .update({ photos: updatedPhotos, selected_photo_ids: updatedSelectedIds })
        .eq('id', activeViewBook.id);
        
      if (error) throw error;
      
      setActiveViewBook(prev => ({
        ...prev,
        photos: updatedPhotos,
        selected_photo_ids: updatedSelectedIds
      }));
      fetchDashboardData();
    } catch (err) {
      alert('Erro ao excluir foto: ' + err.message);
    }
  };

  const handleUpdatePhotoVariation = async (photoId, newType) => {
    try {
      const updatedPhotos = activeViewBook.photos.map(p => 
        p.id === photoId ? { ...p, variationType: newType } : p
      );
      
      const { error } = await supabase
        .from('books')
        .update({ photos: updatedPhotos })
        .eq('id', activeViewBook.id);
        
      if (error) throw error;
      
      setActiveViewBook(prev => ({
        ...prev,
        photos: updatedPhotos
      }));
      fetchDashboardData();
    } catch (err) {
      alert('Erro ao atualizar variação: ' + err.message);
    }
  };

  // Generate shareable URL for the client (using both ID and URL Hash for complete support)
  const getClientLink = (bk) => {
    const origin = window.location.origin;
    return `${origin}/#/book/${bk.id}`;
  };

  const copyLinkToClipboard = (bk) => {
    const link = getClientLink(bk);
    navigator.clipboard.writeText(link);
    alert('Link do cliente copiado para a área de transferência!');
  };

  // Group references by category for layout grouping
  const groupRefsByCategory = () => {
    const groups = {};
    categories.forEach(cat => {
      groups[cat.name] = references.filter(r => r.category === cat.name);
    });
    // Group references without valid category under 'Outros'
    const otherRefs = references.filter(r => !r.category || !categories.some(c => c.name === r.category));
    if (otherRefs.length > 0) {
      groups['Sem Categoria'] = otherRefs;
    }
    return groups;
  };

  const refGroups = groupRefsByCategory();

  // Filtered references in modal reference selector
  const filteredSelectorRefs = references.filter(ref => {
    const matchesSearch = ref.name.toLowerCase().includes(refSearch.toLowerCase());
    const matchesFilter = refFilter === 'Todos' || ref.category === refFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col md:flex-row relative">
      {/* Decorative Aura Background */}
      <div className="fixed top-0 w-full h-screen -z-10 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50"></div>

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-neutral-200/80 p-6 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo Brand */}
          <div className="flex items-center gap-3 mb-10">
            <div className="h-10 w-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/10">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-neutral-900 font-geist text-sm">Studio Retrato</h1>
              <p className="text-neutral-400 text-[10px] uppercase font-semibold tracking-wider font-geist">Painel Administrativo</p>
            </div>
          </div>

          {/* Nav list */}
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('books')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left text-sm font-semibold transition ${
                activeTab === 'books'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15'
                  : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span>Books Criados</span>
            </button>
            <button 
              onClick={() => setActiveTab('clients')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left text-sm font-semibold transition ${
                activeTab === 'clients'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15'
                  : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Clientes</span>
            </button>
            <button 
              onClick={() => setActiveTab('references')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left text-sm font-semibold transition ${
                activeTab === 'references'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15'
                  : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <Library className="w-5 h-5" />
              <span>Biblioteca de Poses</span>
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left text-sm font-semibold transition ${
                activeTab === 'settings'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15'
                  : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <SettingsIcon className="w-5 h-5" />
              <span>Configurações</span>
            </button>
          </nav>
        </div>

        {/* Log Out */}
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left text-sm font-semibold text-rose-600 hover:bg-rose-50 transition mt-8"
        >
          <LogOut className="w-5 h-5" />
          <span>Sair da Conta</span>
        </button>
      </aside>

      {/* Main Content Dashboard Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* HEADER BAR */}
        <div className="flex justify-between items-center mb-8 gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 font-geist">
              {activeTab === 'books' && 'Books de Clientes'}
              {activeTab === 'clients' && 'Gestão de Clientes'}
              {activeTab === 'references' && 'Biblioteca de Referências (IA)'}
              {activeTab === 'settings' && 'Configurações do Sistema'}
            </h2>
            <p className="text-sm text-neutral-500 font-geist mt-0.5">
              {activeTab === 'books' && 'Crie books, gerencie seleções e envie links de pagamento'}
              {activeTab === 'clients' && 'Cadastre clientes e envie seus links de book'}
              {activeTab === 'references' && 'Gerencie fotos de poses, crie agrupadores e extraia prompts com IA'}
              {activeTab === 'settings' && 'Gerencie chaves de API e precificação geral'}
            </p>
          </div>

          {/* Quick Action buttons */}
          <div className="flex gap-3">
            {activeTab === 'books' && (
              <button 
                onClick={() => {
                  if (clients.length === 0) {
                    alert('Por favor, cadastre um cliente antes de criar um book.');
                    return;
                  }
                  setBookForm({
                    title: '',
                    clientId: '',
                    pricePerPhoto: '',
                    packagePrice: 50.00,
                    packagePhotos: 2,
                    extraPhotoPrice: 10.00,
                    qty: 5
                  });
                  setBookClientFiles([]);
                  setBookClientPreviews([]);
                  setSelectedRefs([]);
                  setShowBookModal(true);
                }}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-5 py-3 rounded-2xl shadow-md transition"
              >
                <Plus className="w-4 h-4" />
                <span>Gerar Book com IA</span>
              </button>
            )}
            {activeTab === 'clients' && (
              <button 
                onClick={() => setShowClientModal(true)}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-5 py-3 rounded-2xl shadow-md transition"
              >
                <Plus className="w-4 h-4" />
                <span>Novo Cliente</span>
              </button>
            )}
            {activeTab === 'references' && (
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowCatModal(true)}
                  className="inline-flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-800 font-semibold text-sm px-5 py-3 rounded-2xl transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nova Categoria</span>
                </button>
                <button 
                  onClick={() => setShowRefModal(true)}
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-5 py-3 rounded-2xl shadow-md transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar Referência</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ====================================================
            TAB CONTENT: BOOKS
            ==================================================== */}
        {activeTab === 'books' && (
          <div className="bg-white border border-neutral-200/80 rounded-[2.5rem] p-6 shadow-sm">
            {books.length === 0 ? (
              <div className="text-center py-16 text-neutral-400 font-geist text-sm">
                Nenhum book gerado ainda. Clique em "Gerar Book com IA" para começar!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-100 text-xs font-semibold text-neutral-400 uppercase tracking-wider font-geist">
                      <th className="py-4 px-4">Título</th>
                      <th className="py-4 px-4">Cliente</th>
                      <th className="py-4 px-4">Retratos</th>
                      <th className="py-4 px-4">Status de Pagamento</th>
                      <th className="py-4 px-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 text-sm font-geist">
                    {books.map((bk) => (
                      <tr key={bk.id} className="hover:bg-neutral-50/50">
                        <td className="py-4 px-4 font-semibold text-neutral-900">{bk.title}</td>
                        <td className="py-4 px-4 text-neutral-600">{bk.client?.name || 'Deletado'}</td>
                        <td className="py-4 px-4 text-neutral-500">
                          {bk.photos?.length || 0} fotos
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            bk.payment_status === 'paid'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-800'
                          }`}>
                            {bk.payment_status === 'paid' ? 'Pago' : 'Pendente'}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex gap-2 justify-end">
                            {bk.payment_status !== 'paid' && (
                              <button
                                onClick={() => handleMarkAsPaid(bk.id)}
                                title="Marcar como Pago"
                                className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-xl"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => {
                                setActiveViewBook(bk);
                                setShowViewBookModal(true);
                              }}
                              title="Visualizar Fotos Selecionadas"
                              className="p-2 hover:bg-neutral-100 text-neutral-600 rounded-xl"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => copyLinkToClipboard(bk)}
                              title="Copiar Link do Cliente"
                              className="p-2 hover:bg-neutral-100 text-neutral-600 rounded-xl"
                            >
                              <LinkIcon className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteBook(bk.id)}
                              title="Deletar Book"
                              className="p-2 hover:bg-rose-50 text-rose-600 rounded-xl"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ====================================================
            TAB CONTENT: CLIENTS
            ==================================================== */}
        {activeTab === 'clients' && (
          <div className="bg-white border border-neutral-200/80 rounded-[2.5rem] p-6 shadow-sm">
            {clients.length === 0 ? (
              <div className="text-center py-16 text-neutral-400 font-geist text-sm">
                Nenhum cliente cadastrado. Clique em "Novo Cliente" no topo.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-100 text-xs font-semibold text-neutral-400 uppercase tracking-wider font-geist">
                      <th className="py-4 px-4">Nome</th>
                      <th className="py-4 px-4">Telefone</th>
                      <th className="py-4 px-4">E-mail</th>
                      <th className="py-4 px-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 text-sm font-geist">
                    {clients.map((cli) => (
                      <tr key={cli.id} className="hover:bg-neutral-50/50">
                        <td className="py-4 px-4 font-semibold text-neutral-900">
                          <div className="flex items-center gap-3">
                            {cli.photo_url ? (
                              <img src={parsePhotos(cli.photo_url)[0]} alt={cli.name} className="w-10 h-10 rounded-xl object-cover border border-neutral-200" />
                            ) : (
                              <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center border border-neutral-200 text-neutral-400 font-bold text-xs uppercase">
                                {cli.name.substring(0, 2)}
                              </div>
                            )}
                            <span>{cli.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-neutral-600">{cli.phone || 'Sem número'}</td>
                        <td className="py-4 px-4 text-neutral-600">{cli.email || 'Sem e-mail'}</td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setBookForm({
                                  title: '',
                                  clientId: cli.id,
                                  pricePerPhoto: '',
                                  packagePrice: 50.00,
                                  packagePhotos: 2,
                                  extraPhotoPrice: 10.00,
                                  qty: 5
                                });
                                setBookClientFiles([]);
                                setBookClientPreviews([]);
                                setSelectedRefs([]);
                                setShowBookModal(true);
                              }}
                              className="inline-flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs px-3 py-2 rounded-xl transition font-geist"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>Gerar Book</span>
                            </button>
                            <button
                              onClick={() => openEditClient(cli)}
                              className="p-2 hover:bg-neutral-150 text-neutral-600 rounded-xl transition"
                              title="Editar Informações"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteClient(cli.id)}
                              className="p-2 hover:bg-rose-50 text-rose-600 rounded-xl transition"
                              title="Deletar Cliente"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ====================================================
            TAB CONTENT: REFERENCES
            ==================================================== */}
        {activeTab === 'references' && (
          <div className="space-y-12">
            

            {/* Flat list - all reference cards in a single grid */}
            {references.length === 0 ? (
              <div className="bg-white border border-neutral-200/80 rounded-[2.5rem] py-16 text-center text-neutral-400 font-geist text-sm shadow-sm">
                Nenhuma pose cadastrada na biblioteca. Clique em "Adicionar Referência" para carregar imagens!
              </div>
            ) : (
              <div className="bg-white border border-neutral-200/80 rounded-[2.5rem] p-6 shadow-sm">
                <p className="text-xs text-neutral-400 font-geist mb-5">{references.length} referências cadastradas</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {references.map((ref) => (
                    <RefCard
                      key={ref.id}
                      refData={ref}
                      categories={categories}
                      onDelete={handleDeleteReference}
                      onUpdateCategory={updateRefCategory}
                      onUpdateOrder={updateRefOrder}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ====================================================
            TAB CONTENT: SETTINGS
            ==================================================== */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-white border border-neutral-200/80 rounded-[2.5rem] p-8 shadow-sm">
            <form onSubmit={handleSaveSettings} className="space-y-6">
              
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 font-geist">
                  Preço Padrão por Foto (R$)
                </label>
                <input
                  type="number"
                  required
                  step="0.01"
                  value={settings.pricePerPhoto}
                  onChange={(e) => setSettings(prev => ({ ...prev, pricePerPhoto: Number(e.target.value) }))}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 text-sm font-geist text-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 font-geist">
                  Chave API do Google Gemini
                </label>
                <input
                  type="password"
                  placeholder="Insira sua chave AIzaSy..."
                  value={settings.geminiApiKey}
                  onChange={(e) => setSettings(prev => ({ ...prev, geminiApiKey: e.target.value }))}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 text-sm font-geist text-neutral-900"
                />
                <span className="text-[10px] text-neutral-400 mt-1 block font-geist">
                  Utilizada para o motor NanoBanana Pro e para a análise/extração de prompts.
                </span>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="sandbox"
                  checked={settings.mercadoPagoSandbox}
                  onChange={(e) => setSettings(prev => ({ ...prev, mercadoPagoSandbox: e.target.checked }))}
                  className="h-4 w-4 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-600/20"
                />
                <label htmlFor="sandbox" className="text-sm font-geist font-medium text-neutral-700">
                  Habilitar Ambiente de Teste (Mercado Pago Sandbox)
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 font-geist">
                  Chave Pública Mercado Pago
                </label>
                <input
                  type="text"
                  placeholder="TEST-..."
                  value={settings.mercadoPagoPublicKey}
                  onChange={(e) => setSettings(prev => ({ ...prev, mercadoPagoPublicKey: e.target.value }))}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 text-sm font-geist text-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 font-geist">
                  Chave Pix para Recebimento (PIX Direto)
                </label>
                <input
                  type="text"
                  placeholder="Seu e-mail, telefone, CPF/CNPJ ou chave aleatória"
                  value={settings.pixKey || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, pixKey: e.target.value }))}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 text-sm font-geist text-neutral-900"
                />
              </div>

              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-3 shadow-indigo-600/20 transition duration-150 ease-out hover:-translate-y-0.5 text-base font-medium text-white font-geist bg-gradient-to-tr from-gray-900 to-black rounded-full py-3.5 px-8 shadow-lg"
              >
                <span>Salvar Configurações</span>
              </button>

            </form>
          </div>
        )}

      </main>

      {/* ====================================================
          MODAL: CRIAÇÃO DE CLIENTE
          ==================================================== */}
      {showClientModal && (
        <div className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-200 rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl relative animate-scaleUp">
            <button 
              onClick={() => setShowClientModal(false)}
              className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-600 h-8 w-8 rounded-full bg-neutral-50 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-neutral-900 font-geist">Cadastrar Novo Cliente</h3>
            </div>
            <form onSubmit={handleCreateClient} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 font-geist">Nome do Cliente</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Luiz Henrique"
                  value={clientForm.name}
                  onChange={(e) => setClientForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-3 px-4 focus:outline-none focus:border-indigo-600 text-sm font-geist text-neutral-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 font-geist">WhatsApp</label>
                <input
                  type="text"
                  placeholder="Ex: +55 67 99999-9999"
                  value={clientForm.phone}
                  onChange={(e) => setClientForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-3 px-4 focus:outline-none focus:border-indigo-600 text-sm font-geist text-neutral-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 font-geist">E-mail</label>
                <input
                  type="email"
                  placeholder="Ex: luiz@gmail.com"
                  value={clientForm.email}
                  onChange={(e) => setClientForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-3 px-4 focus:outline-none focus:border-indigo-600 text-sm font-geist text-neutral-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 font-geist">Fotos de Referência (Face/Perfil)</label>
                {newClientPreviews.length > 0 ? (
                  <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                    {newClientPreviews.map((preview, index) => (
                      <div key={index} className="flex items-center gap-4 bg-neutral-50 border border-neutral-200 rounded-2xl p-3">
                        <div className="h-14 w-14 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 flex-shrink-0">
                          <img src={preview} alt={`Preview ${index + 1}`} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-neutral-500 font-geist">Foto selecionada {index + 1}</p>
                          <button
                            type="button"
                            onClick={() => {
                              setNewClientFiles(prev => prev.filter((_, idx) => idx !== index));
                              setNewClientPreviews(prev => prev.filter((_, idx) => idx !== index));
                            }}
                            className="text-xs font-semibold text-rose-600 hover:text-rose-500 mt-0.5 block font-geist"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => document.getElementById('new-client-photo-input').click()}
                      className="w-full py-2 bg-neutral-50 hover:bg-neutral-100 border border-dashed border-neutral-350 rounded-xl text-xs font-semibold text-neutral-600 transition font-geist"
                    >
                      + Adicionar Mais Fotos
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => document.getElementById('new-client-photo-input').click()}
                    className="border-2 border-dashed border-neutral-200 hover:border-indigo-400 rounded-2xl p-4 text-center cursor-pointer transition bg-neutral-50"
                  >
                    <Upload className="w-5 h-5 text-neutral-400 mx-auto mb-1" />
                    <span className="text-xs text-neutral-500 font-medium font-geist">Selecione fotos de perfil da cliente (múltiplas permitidas)</span>
                    <p className="text-[10px] text-neutral-400 mt-0.5 font-geist">Serão usadas como referências faciais nos books</p>
                  </div>
                )}
                <input 
                  id="new-client-photo-input"
                  type="file" 
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    if (files.length > 0) {
                      setNewClientFiles(prev => [...prev, ...files]);
                      setNewClientPreviews(prev => [...prev, ...files.map(file => URL.createObjectURL(file))]);
                    }
                  }}
                  className="hidden"
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-2xl text-sm transition shadow-lg font-geist"
              >
                <span>Criar Cliente</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================
          MODAL: EDITAR CLIENTE
          ==================================================== */}
      {showEditClientModal && editingClient && (
        <div className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-200 rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl relative animate-scaleUp">
            <button 
              onClick={() => {
                setShowEditClientModal(false);
                setEditingClient(null);
              }}
              className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-600 h-8 w-8 rounded-full bg-neutral-50 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-neutral-900 font-geist">Editar Informações do Cliente</h3>
            </div>
            <form onSubmit={handleEditClientSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 font-geist">Nome do Cliente</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Luiz Henrique"
                  value={editClientForm.name}
                  onChange={(e) => setEditClientForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-3 px-4 focus:outline-none focus:border-indigo-600 text-sm font-geist text-neutral-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 font-geist">WhatsApp</label>
                <input
                  type="text"
                  placeholder="Ex: +55 67 99999-9999"
                  value={editClientForm.phone}
                  onChange={(e) => setEditClientForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-3 px-4 focus:outline-none focus:border-indigo-600 text-sm font-geist text-neutral-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 font-geist">E-mail</label>
                <input
                  type="email"
                  placeholder="Ex: luiz@gmail.com"
                  value={editClientForm.email}
                  onChange={(e) => setEditClientForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-3 px-4 focus:outline-none focus:border-indigo-600 text-sm font-geist text-neutral-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 font-geist">Fotos de Referência (Face/Perfil)</label>
                {editClientPreviews.length > 0 ? (
                  <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                    {editClientPreviews.map((preview, index) => (
                      <div key={index} className="flex items-center gap-4 bg-neutral-50 border border-neutral-200 rounded-2xl p-3">
                        <div className="h-14 w-14 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 flex-shrink-0">
                          <img src={preview} alt={`Preview ${index + 1}`} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-neutral-500 font-geist">Foto de referência {index + 1}</p>
                          <button
                            type="button"
                            onClick={() => {
                              // If it's a file selection
                              setEditClientFiles(prev => prev.filter((_, idx) => idx !== (index - (editClientPreviews.length - editClientFiles.length))));
                              setEditClientPreviews(prev => prev.filter((_, idx) => idx !== index));
                            }}
                            className="text-xs font-semibold text-rose-600 hover:text-rose-500 mt-0.5 block font-geist"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => document.getElementById('edit-client-photo-input').click()}
                      className="w-full py-2 bg-neutral-50 hover:bg-neutral-100 border border-dashed border-neutral-350 rounded-xl text-xs font-semibold text-neutral-600 transition font-geist"
                    >
                      + Adicionar Mais Fotos
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => document.getElementById('edit-client-photo-input').click()}
                    className="border-2 border-dashed border-neutral-200 hover:border-indigo-400 rounded-2xl p-4 text-center cursor-pointer transition bg-neutral-50"
                  >
                    <Upload className="w-5 h-5 text-neutral-400 mx-auto mb-1" />
                    <span className="text-xs text-neutral-500 font-medium font-geist">Selecione fotos de perfil da cliente (múltiplas permitidas)</span>
                    <p className="text-[10px] text-neutral-400 mt-0.5 font-geist">Serão usadas como referências faciais nos books</p>
                  </div>
                )}
                <input 
                  id="edit-client-photo-input"
                  type="file" 
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    if (files.length > 0) {
                      setEditClientFiles(prev => [...prev, ...files]);
                      setEditClientPreviews(prev => [...prev, ...files.map(file => URL.createObjectURL(file))]);
                    }
                  }}
                  className="hidden"
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-2xl text-sm transition shadow-lg font-geist"
              >
                <span>Salvar Alterações</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================
          MODAL: NOVA CATEGORIA
          ==================================================== */}
      {showCatModal && (
        <div className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-200 rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl relative">
            <button 
              onClick={() => setShowCatModal(false)}
              className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-600 h-8 w-8 rounded-full bg-neutral-50 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-neutral-900 font-geist">Criar Nova Categoria</h3>
            </div>
            <form onSubmit={handleCreateCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 font-geist">Identificador Único (Inglês/Sem espaços)</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: valentine, maternity"
                  value={categoryForm.id}
                  onChange={(e) => setCategoryForm(prev => ({ ...prev, id: e.target.value }))}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-3 px-4 focus:outline-none focus:border-indigo-600 text-sm font-geist text-neutral-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 font-geist">Nome da Categoria (Exibição)</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Dia dos Namorados"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-3 px-4 focus:outline-none focus:border-indigo-600 text-sm font-geist text-neutral-900"
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-2xl text-sm transition"
              >
                <span>Criar Categoria</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================
          MODAL: ADICIONAR REFERÊNCIA (IA VISION BIND)
          ==================================================== */}
      {showRefModal && (
        <div className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-200 rounded-[2.5rem] p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => {
                setRefFiles([]);
                setRefPreviews([]);
                setExtractionLogs([]);
                setShowRefModal(false);
              }}
              className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-600 h-8 w-8 rounded-full bg-neutral-50 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-neutral-900 font-geist">Adicionar Nova Referência de Pose</h3>
              <p className="text-xs text-neutral-400 mt-1 font-geist">Carregue uma imagem, selecione sua categoria e extraia o prompt ideal usando IA Vision</p>
            </div>
            
            <form onSubmit={handleCreateReference} className="space-y-4 font-geist">
              {/* File Upload Box */}
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Arquivo de Imagem</label>
                <div className="border-2 border-dashed border-neutral-200 rounded-3xl p-6 text-center hover:border-indigo-600/50 cursor-pointer relative bg-neutral-50/50 transition">
                  <input
                    type="file"
                    required
                    accept="image/*"
                    onChange={handleRefFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {refPreviews.length > 0 ? (
                    <div className="flex justify-center">
                      <img src={refPreviews[0]} alt="Preview" className="h-40 rounded-2xl object-cover shadow" />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 text-neutral-400 mx-auto" />
                      <p className="text-sm font-medium text-neutral-600">Arraste ou clique para carregar imagem</p>
                      <p className="text-xs text-neutral-400">PNG ou JPG até 10MB</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Título/Nome</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Pose Clássica"
                    value={refForm.name}
                    onChange={(e) => setRefForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-3 px-4 focus:outline-none focus:border-indigo-600 text-sm text-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Categoria</label>
                  <select
                    required
                    value={refForm.category}
                    onChange={(e) => setRefForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-3 px-4 focus:outline-none focus:border-indigo-600 text-sm text-neutral-900"
                  >
                    <option value="">Selecione...</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Prompt extractor console */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider">Prompt de Estilo (Inglês)</label>
                  <button
                    type="button"
                    disabled={isExtractingPrompt || refFiles.length === 0}
                    onClick={extractPromptsWithGemini}
                    className="inline-flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-500 font-bold disabled:opacity-40"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>Extrair Prompt com IA</span>
                  </button>
                </div>
                
                {/* Console Logs */}
                {extractionLogs.length > 0 && (
                  <div className="bg-neutral-950 text-neutral-300 font-mono text-[10px] rounded-2xl p-4 mb-3 max-h-32 overflow-y-auto space-y-1">
                    {extractionLogs.map((log, lidx) => (
                      <p key={lidx}>{log}</p>
                    ))}
                  </div>
                )}

                <textarea
                  required
                  rows="3"
                  placeholder="Ex: A close-up business headshot of a person, warm lighting..."
                  value={refForm.prompt}
                  onChange={(e) => setRefForm(prev => ({ ...prev, prompt: e.target.value }))}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-3 px-4 focus:outline-none focus:border-indigo-600 text-sm text-neutral-900 placeholder:text-neutral-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-2xl text-sm transition shadow-lg"
              >
                <span>Salvar Referência</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================
          MODAL: GERAR NOVO BOOK COM IA PIPELINE
          ==================================================== */}
      {showBookModal && (
        <div className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-200 rounded-[2.5rem] p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => {
                setBookForm(prev => ({ ...prev, title: '' }));
                setSelectedRefs([]);
                setShowBookModal(false);
              }}
              className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-600 h-8 w-8 rounded-full bg-neutral-50 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold text-neutral-900 font-geist">Gerar Novo Book com IA</h3>
              <p className="text-xs text-neutral-400 mt-1 font-geist">Configure o ensaio do cliente e selecione as poses do catálogo que o NanoBanana Pro usará como guia.</p>
            </div>

            <form onSubmit={handleCreateBook} className="space-y-4 font-geist">
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Título do Book</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Ensaio Corporativo Executivo"
                  value={bookForm.title}
                  onChange={(e) => setBookForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-3 px-4 focus:outline-none focus:border-indigo-600 text-sm text-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Cliente Destinatário *</label>
                <select
                  required
                  value={bookForm.clientId}
                  onChange={(e) => setBookForm(prev => ({ ...prev, clientId: e.target.value }))}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-3 px-4 focus:outline-none focus:border-indigo-600 text-sm text-neutral-900"
                >
                  <option value="">Selecione...</option>
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Valor do pacote completo (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Ex: 50.00"
                    value={bookForm.packagePrice}
                    onChange={(e) => setBookForm(prev => ({ ...prev, packagePrice: e.target.value === '' ? '' : Number(e.target.value) }))}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-3 px-4 focus:outline-none focus:border-indigo-600 text-sm text-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Fotos incluídas no pacote</label>
                  <input
                    type="number"
                    placeholder="Ex: 2"
                    value={bookForm.packagePhotos}
                    onChange={(e) => setBookForm(prev => ({ ...prev, packagePhotos: e.target.value === '' ? '' : Number(e.target.value) }))}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-3 px-4 focus:outline-none focus:border-indigo-600 text-sm text-neutral-900"
                  />
                  <p className="text-[10px] text-neutral-400 mt-1 font-geist">Quantidade de fotos que o cliente pode escolher dentro do valor do pacote</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Preço por foto extra (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Ex: 10.00"
                    value={bookForm.extraPhotoPrice}
                    onChange={(e) => setBookForm(prev => ({ ...prev, extraPhotoPrice: e.target.value === '' ? '' : Number(e.target.value) }))}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-3 px-4 focus:outline-none focus:border-indigo-600 text-sm text-neutral-900"
                  />
                  <p className="text-[10px] text-neutral-400 mt-1 font-geist">Valor cobrado por cada foto que exceder o pacote contratado</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Preço por foto avulsa (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Deixe vazio se usar pacote acima"
                    value={bookForm.pricePerPhoto}
                    onChange={(e) => setBookForm(prev => ({ ...prev, pricePerPhoto: e.target.value === '' ? '' : Number(e.target.value) }))}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-3 px-4 focus:outline-none focus:border-indigo-600 text-sm text-neutral-900"
                  />
                  <p className="text-[10px] text-neutral-400 mt-1 font-geist">Preço fixo por foto (sem pacote). Use se não for usar o sistema de pacote acima</p>
                </div>
              </div>

              <div className="bg-neutral-50 border border-neutral-200/60 rounded-3xl p-5 space-y-3">
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider">Foto de Referência da Cliente</label>
                
                {!bookForm.clientId ? (
                  <div className="text-center py-4 border border-dashed border-neutral-200 rounded-2xl bg-white text-xs text-neutral-400 font-medium font-geist">
                    ⚠️ Selecione um cliente no menu acima para associar uma foto.
                  </div>
                ) : (
                  <>
                    {/* If client already has photos */}
                    {clients.find(c => c.id === bookForm.clientId)?.photo_url && bookClientFiles.length === 0 ? (
                      <div className="space-y-3">
                        <p className="text-xs text-neutral-500 font-medium font-geist">Fotos de referência já cadastradas para esta cliente:</p>
                        <div className="grid grid-cols-4 gap-2">
                          {parsePhotos(clients.find(c => c.id === bookForm.clientId).photo_url).map((url, index) => (
                            <div key={index} className="h-14 w-14 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 flex-shrink-0 relative animate-fadeIn">
                              <img src={url} alt={`Ref ${index + 1}`} className="h-full w-full object-cover" />
                            </div>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            document.getElementById('book-client-photo-input').click();
                          }}
                          className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 block font-geist mt-1"
                        >
                          Adicionar Novas Fotos de Referência
                        </button>
                      </div>
                    ) : (
                      // If no photo or uploading new ones
                      <div>
                        {bookClientPreviews.length > 0 ? (
                          <div className="space-y-3">
                            <p className="text-xs text-neutral-500 font-geist">Novas fotos selecionadas para a cliente:</p>
                            <div className="grid grid-cols-4 gap-2">
                              {bookClientPreviews.map((preview, index) => (
                                <div key={index} className="h-14 w-14 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 flex-shrink-0 relative group animate-scaleUp">
                                  <img src={preview} alt={`Preview ${index + 1}`} className="h-full w-full object-cover" />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setBookClientFiles(prev => prev.filter((_, idx) => idx !== index));
                                      setBookClientPreviews(prev => prev.filter((_, idx) => idx !== index));
                                    }}
                                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] transition-opacity font-bold rounded-xl font-geist"
                                  >
                                    Remover
                                  </button>
                                </div>
                              ))}
                            </div>
                            <div className="flex gap-3 mt-1">
                              <button
                                type="button"
                                onClick={() => document.getElementById('book-client-photo-input').click()}
                                className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 font-geist"
                              >
                                Adicionar Mais
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setBookClientFiles([]);
                                  setBookClientPreviews([]);
                                }}
                                className="text-xs font-semibold text-rose-600 hover:text-rose-500 font-geist"
                              >
                                Limpar Seleção
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div 
                            onClick={() => document.getElementById('book-client-photo-input').click()}
                            className="border-2 border-dashed border-neutral-200 hover:border-indigo-400 rounded-2xl p-4 text-center cursor-pointer transition bg-white"
                          >
                            <Upload className="w-5 h-5 text-neutral-400 mx-auto mb-1" />
                            <span className="text-xs text-neutral-500 font-medium font-geist">Selecione fotos da cliente (múltiplas permitidas)</span>
                            <p className="text-[10px] text-neutral-400 mt-0.5 font-geist">JPG ou PNG, serão usadas como referências faciais</p>
                          </div>
                        )}
                      </div>
                    )}

                    <input 
                      id="book-client-photo-input"
                      type="file" 
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        if (files.length > 0) {
                          setBookClientFiles(prev => [...prev, ...files]);
                          setBookClientPreviews(prev => [...prev, ...files.map(file => URL.createObjectURL(file))]);
                        }
                      }}
                      className="hidden"
                    />
                  </>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 font-geist">Quantidade de Fotos Variações (NanoBanana Pro)</label>
                <input
                  type="number"
                  required
                  min="1"
                  max="30"
                  value={bookForm.qty}
                  onChange={(e) => setBookForm(prev => ({ ...prev, qty: Number(e.target.value) }))}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-3 px-4 focus:outline-none focus:border-indigo-600 text-sm text-neutral-900"
                />
              </div>

              {/* References Selector Button */}
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Referências de Poses Selecionadas</label>
                <button
                  type="button"
                  onClick={() => setShowRefSelector(true)}
                  className="w-full flex items-center justify-between bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200 rounded-2xl py-3.5 px-4 text-sm text-neutral-700 transition"
                >
                  <span>{selectedRefs.length > 0 ? `${selectedRefs.length} poses selecionadas` : 'Visualizar e Selecionar Poses'}</span>
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </button>
                
                {/* Visual Thumbnails of Selected references */}
                {selectedRefs.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {references.filter(r => selectedRefs.includes(r.id)).map(ref => (
                      <div key={ref.id} className="relative h-11 w-11 rounded-lg overflow-hidden border border-neutral-200">
                        <img src={ref.url} alt={ref.name} className="h-full w-full object-cover" />
                        <button 
                          type="button"
                          onClick={() => toggleRefSelectorItem(ref.id)}
                          className="absolute -top-1 -right-1 h-4 w-4 bg-rose-600 hover:bg-rose-500 text-white rounded-full flex items-center justify-center text-[8px]"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={selectedRefs.length === 0}
                className="w-full group inline-flex items-center justify-center gap-3 shadow-indigo-600/20 transition duration-150 ease-out hover:-translate-y-0.5 text-base font-semibold text-white font-geist bg-gradient-to-tr from-gray-900 to-black rounded-full py-3.5 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400 animate-spin" />
                <span>Gerar Retratos no NanoBanana Pro</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================
          MODAL: SELETOR DE REFERÊNCIAS VISUAL DENTRO DA CRIAÇÃO DO BOOK
          ==================================================== */}
      {showRefSelector && (
        <div className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-200 rounded-[2.5rem] p-8 max-w-2xl w-full shadow-2xl relative max-h-[85vh] flex flex-col justify-between">
            <button 
              onClick={() => setShowRefSelector(false)}
              className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-600 h-8 w-8 rounded-full bg-neutral-50 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold text-neutral-900 font-geist">Selecionar Poses e Estilos</h3>
              <p className="text-xs text-neutral-400 mt-1 font-geist">Busque e filtre referências de poses para compor o ensaio</p>
            </div>

            {/* Filter Pills and Search */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6 items-center justify-between">
              <div className="relative w-full sm:max-w-xs">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-400">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="Buscar pose..."
                  value={refSearch}
                  onChange={(e) => setRefSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-indigo-600 text-xs font-geist"
                />
              </div>

              <div className="flex flex-wrap gap-1">
                {['Todos', ...categories.map(c => c.name)].map((catName) => (
                  <button
                    key={catName}
                    type="button"
                    onClick={() => setRefFilter(catName)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold font-geist ${
                      refFilter === catName 
                        ? 'bg-neutral-900 text-white'
                        : 'bg-neutral-50 text-neutral-500 border border-neutral-200/60 hover:bg-neutral-100'
                    }`}
                  >
                    {catName}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid references content */}
            <div className="flex-1 overflow-y-auto mb-6 pr-1">
              {filteredSelectorRefs.length === 0 ? (
                <div className="text-center py-12 text-neutral-400 text-xs font-geist">Nenhuma pose encontrada.</div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                  {filteredSelectorRefs.map(ref => {
                    const isChecked = selectedRefs.includes(ref.id);
                    return (
                      <div 
                        key={ref.id}
                        onClick={() => toggleRefSelectorItem(ref.id)}
                        className={`group relative aspect-[3/4] bg-neutral-50 border rounded-2xl overflow-hidden cursor-pointer transition select-none ${
                          isChecked 
                            ? 'border-indigo-600 ring-2 ring-indigo-600/10'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        <img src={ref.url} alt={ref.name} className="w-full h-full object-cover pointer-events-none" />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-2 text-white text-[9px] font-geist font-medium truncate pointer-events-none">
                          {ref.name}
                        </div>

                        {/* Check overlay */}
                        <div className={`absolute top-2 right-2 h-5 w-5 rounded-lg flex items-center justify-center shadow-md transition ${
                          isChecked 
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white/90 text-neutral-400 group-hover:text-neutral-600 opacity-0 group-hover:opacity-100'
                        }`}>
                          <Check className="w-3 h-3" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowRefSelector(false)}
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-medium py-3 rounded-2xl text-xs transition"
            >
              <span>Concluir Seleção</span>
            </button>
          </div>
        </div>
      )}

      {/* ====================================================
          MODAL: IA PIPELINE PROGRESS LOGS
          ==================================================== */}
      {showPipelineModal && (
        <div className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-white/10 rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl text-white relative">
            
            <div className="text-center mb-6">
              <Sparkles className="w-10 h-10 text-indigo-400 mx-auto animate-spin mb-3" />
              <h3 className="text-lg font-bold font-geist">Processamento do Motor IA</h3>
              <p className="text-xs text-neutral-400 mt-1 font-geist">Gerando retratos realistas via NanoBanana Pro</p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-neutral-800 h-2.5 rounded-full overflow-hidden mb-6">
              <div 
                className="bg-indigo-500 h-full rounded-full transition-all duration-300 shadow-md shadow-indigo-500/50"
                style={{ width: `${pipelineProgress}%` }}
              ></div>
            </div>

            {/* Log Outputs */}
            <div className="bg-black/45 border border-white/5 rounded-2xl p-4 max-h-56 overflow-y-auto space-y-1.5 font-mono text-[9px] text-neutral-300">
              {pipelineLogs.map((log, index) => (
                <p key={index} className={log.includes('❌') ? 'text-rose-400' : log.includes('🎉') ? 'text-emerald-400' : ''}>
                  {log}
                </p>
              ))}
            </div>
            
          </div>
        </div>
      )}

      {/* ====================================================
          MODAL: CENTRAL DE CÓPIA (PROMPTS E REFERÊNCIAS)
          ==================================================== */}
      {showCopyCenterModal && copyCenterData && (
        <div className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-200 rounded-[2.5rem] p-8 max-w-3xl w-full shadow-2xl relative max-h-[90vh] flex flex-col justify-between">
            <button 
              onClick={() => {
                setShowCopyCenterModal(false);
                setCopyCenterData(null);
              }}
              className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-600 h-8 w-8 rounded-full bg-neutral-50 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6 font-geist">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <p className="text-xs uppercase text-neutral-400 font-bold tracking-wider">Central de Cópia</p>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mt-1">Copiar Prompts e Referências</h3>
              <p className="text-neutral-500 text-xs mt-1">
                Copie as informações abaixo e use no seu gerador de imagem preferido. Em seguida, acesse os detalhes do Book para enviar as fotos em lote.
              </p>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto mb-6 pr-1 font-geist space-y-6">
              
              {/* Prompt Master Section */}
              <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 relative">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wider">Prompt Master Genericamente Formatado</h4>
                  <button
                    onClick={() => handleCopyText('master', copyCenterData.masterPrompt)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                      copiedMap['master']
                        ? 'bg-emerald-605 text-white bg-emerald-600'
                        : 'bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-700'
                    }`}
                  >
                    {copiedMap['master'] ? (
                      <>
                        <ClipboardCheck className="w-3.5 h-3.5" />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar Prompt Master</span>
                      </>
                    )}
                  </button>
                </div>
                <textarea
                  readOnly
                  value={copyCenterData.masterPrompt}
                  className="w-full h-32 bg-white border border-neutral-200 rounded-xl p-3 text-xs text-neutral-600 focus:outline-none resize-none font-geist"
                />
              </div>

              {/* Client Reference Photo Section */}
              {copyCenterData.clientPhotoUrls && copyCenterData.clientPhotoUrls.length > 0 && (
                <div className="border border-neutral-100 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wider">Fotos da Cliente para Fidelidade ({copyCenterData.clientPhotoUrls.length})</h4>
                    <button
                      onClick={() => handleCopyImagesClipboard(copyCenterData.clientPhotoUrls, 'client_all_urls')}
                      className={`px-2.5 py-1 text-[9px] font-semibold rounded-lg transition ${
                        copiedMap['client_all_urls']
                          ? 'bg-emerald-600 text-white'
                          : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600'
                      }`}
                    >
                      {copiedMap['client_all_urls'] === 'loading' ? 'Copiando...' : copiedMap['client_all_urls'] ? 'Copiadas!' : 'Copiar Todas em Lote'}
                    </button>
                  </div>
                  <div className="flex flex-col gap-3">
                    {copyCenterData.clientPhotoUrls.map((url, index) => (
                      <div key={index} className="flex items-center gap-4 bg-neutral-50/50 p-2.5 rounded-xl border border-neutral-100 font-geist">
                        <img 
                          src={url} 
                          alt={`Cliente ${index + 1}`} 
                          className="h-14 w-14 rounded-xl object-cover border border-neutral-200" 
                        />
                        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                          <p className="text-[10px] font-semibold text-neutral-600 truncate">Foto de Referência {index + 1}</p>
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => handleCopyImagesClipboard([url], `client_url_${index}`)}
                              className={`px-2 py-1 rounded-md text-[9px] font-semibold transition ${
                                copiedMap[`client_url_${index}`]
                                  ? 'bg-emerald-600 text-white font-bold'
                                  : 'bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-700'
                              }`}
                            >
                              {copiedMap[`client_url_${index}`] === 'loading' ? 'Copiando...' : copiedMap[`client_url_${index}`] ? 'Copiada!' : 'Copiar Foto'}
                            </button>
                            <a 
                              href={url} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-700 px-2 py-1 rounded-md text-[9px] font-semibold text-center"
                            >
                              Abrir
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reference Images List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wider">Imagens de Referência de Pose/Estilo ({copyCenterData.references?.length})</h4>
                  <button
                    onClick={() => {
                      const urls = copyCenterData.references.map(r => r.url);
                      handleCopyImagesClipboard(urls, 'all_urls');
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                      copiedMap['all_urls']
                        ? 'bg-emerald-600 text-white'
                        : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600'
                    }`}
                  >
                    {copiedMap['all_urls'] === 'loading' ? 'Copiando...' : copiedMap['all_urls'] ? 'Imagens Copiadas!' : 'Copiar Todas as Imagens'}
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {copyCenterData.references?.map((ref, idx) => (
                    <div key={ref.id || idx} className="flex gap-4 p-3 border border-neutral-100 rounded-2xl bg-neutral-50/50 hover:bg-neutral-50 transition">
                      <img 
                        src={ref.url} 
                        alt={ref.name} 
                        className="h-16 w-12 rounded-lg object-cover border border-neutral-200 flex-shrink-0" 
                      />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-neutral-800 truncate">{ref.name}</span>
                          </div>
                          <p className="text-[10px] text-neutral-500 line-clamp-2 mt-0.5" title={ref.prompt}>
                            <strong>Prompt: </strong>{ref.prompt || 'Sem prompt associado'}
                          </p>
                        </div>
                        <div className="flex gap-2 mt-1.5">
                          <button
                            onClick={() => handleCopyText(`ref_prompt_${idx}`, ref.prompt || '')}
                            className={`px-2 py-1 rounded-md text-[9px] font-semibold transition ${
                              copiedMap[`ref_prompt_${idx}`]
                                ? 'bg-emerald-600 text-white font-bold'
                                : 'bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-700'
                            }`}
                          >
                            {copiedMap[`ref_prompt_${idx}`] ? 'Prompt Copiado!' : 'Copiar Prompt'}
                          </button>
                          <button
                            onClick={() => handleCopyText(`ref_url_${idx}`, ref.url)}
                            className={`px-2 py-1 rounded-md text-[9px] font-semibold transition ${
                              copiedMap[`ref_url_${idx}`]
                                ? 'bg-emerald-600 text-white font-bold'
                                : 'bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-700'
                            }`}
                          >
                            {copiedMap[`ref_url_${idx}`] ? 'Link Copiado!' : 'Copiar Link'}
                          </button>
                          <a 
                            href={ref.url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-700 px-2 py-1 rounded-md text-[9px] font-semibold text-center"
                          >
                            Visualizar
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="border-t border-neutral-100 pt-5 flex items-center justify-end gap-3 font-geist">
              <button
                onClick={() => {
                  setShowCopyCenterModal(false);
                  setCopyCenterData(null);
                }}
                className="px-5 py-2.5 rounded-2xl text-xs font-semibold text-neutral-500 hover:bg-neutral-100 transition"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  // Find the book in state or fallback to a template, then view it
                  const targetBook = books.find(b => b.id === copyCenterData.bookId) || {
                    id: copyCenterData.bookId,
                    title: 'Book Recém-Criado',
                    client: clients.find(c => c.id === bookForm.clientId) || { name: 'Cliente' },
                    price_per_photo: bookForm.pricePerPhoto || 30.00,
                    references_data: copyCenterData.references,
                    photos: [],
                    selected_photo_ids: []
                  };
                  setActiveViewBook(targetBook);
                  setShowViewBookModal(true);
                  setShowCopyCenterModal(false);
                  setCopyCenterData(null);
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-2xl text-xs font-semibold shadow-md transition"
              >
                Ir para Detalhes do Book (Fazer Upload)
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ====================================================
          MODAL: DETALHES DO BOOK / SELEÇÃO DO CLIENTE
          ==================================================== */}
      {showViewBookModal && activeViewBook && (
        <div className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-200 rounded-[2.5rem] p-8 max-w-2xl w-full shadow-2xl relative max-h-[85vh] flex flex-col justify-between">
            <button 
              onClick={() => {
                setActiveViewBook(null);
                setShowViewBookModal(false);
              }}
              className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-600 h-8 w-8 rounded-full bg-neutral-50 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-4 font-geist flex items-center justify-between">
              <div>
                <p className="text-xs uppercase text-neutral-400 font-bold tracking-wider">Visualizar Book</p>
                <h3 className="text-xl font-bold text-neutral-900 mt-1">{activeViewBook.title}</h3>
                <p className="text-neutral-500 text-xs mt-1">Cliente: <span className="font-semibold text-neutral-700">{activeViewBook.client?.name}</span></p>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  activeViewBook.payment_status === 'paid'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-amber-50 text-amber-800'
                }`}>
                  {activeViewBook.payment_status === 'paid' ? 'Pago' : 'Pendente'}
                </span>
                {activeViewBook.payment_status !== 'paid' && (
                  <button
                    onClick={() => handleMarkAsPaid(activeViewBook.id)}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold font-geist shadow transition-colors"
                  >
                    Marcar como Pago
                  </button>
                )}
              </div>
            </div>

            {/* Client reference photos list inside view details modal */}
            {activeViewBook.client && (
              <div className="mb-4 bg-neutral-50/50 border border-neutral-100 rounded-2xl p-4 font-geist space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Fotos de Referência da Cliente</p>
                  {parsePhotos(activeViewBook.client.photo_url).length > 0 && (
                    <button
                      onClick={() => handleCopyImagesClipboard(parsePhotos(activeViewBook.client.photo_url), `view_all_clients_${activeViewBook.id}`)}
                      className={`px-2 py-1 rounded-lg text-[9px] font-semibold transition ${
                        copiedMap[`view_all_clients_${activeViewBook.id}`]
                          ? 'bg-emerald-600 text-white'
                          : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600'
                      }`}
                    >
                      {copiedMap[`view_all_clients_${activeViewBook.id}`] === 'loading' ? 'Copiando...' : copiedMap[`view_all_clients_${activeViewBook.id}`] ? 'Copiadas!' : 'Copiar Todas em Lote'}
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-2 max-h-[160px] overflow-y-auto pr-1">
                  {parsePhotos(activeViewBook.client.photo_url).map((url, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white border border-neutral-200/60 rounded-xl p-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <img src={url} alt={`Cliente ref ${idx + 1}`} className="h-8 w-8 rounded object-cover border border-neutral-100" />
                        <span className="text-[10px] font-bold text-neutral-700 truncate">Referência {idx + 1}</span>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleCopyImagesClipboard([url], `view_client_url_${idx}`)}
                          className={`px-1.5 py-0.5 rounded text-[8px] font-semibold transition ${
                            copiedMap[`view_client_url_${idx}`]
                              ? 'bg-emerald-600 text-white'
                              : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200/45'
                          }`}
                        >
                          {copiedMap[`view_client_url_${idx}`] === 'loading' ? 'Copiando...' : copiedMap[`view_client_url_${idx}`] ? 'Copiada!' : 'Copiar'}
                        </button>
                        <a
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-neutral-100 hover:bg-neutral-200 text-neutral-600 border border-neutral-200/40 px-1.5 py-0.5 rounded text-[8px] font-semibold text-center"
                        >
                          Ver
                        </a>
                      </div>
                    </div>
                  ))}
                  {parsePhotos(activeViewBook.client.photo_url).length === 0 && (
                    <p className="text-xs text-neutral-400 text-center py-2">Nenhuma foto cadastrada para esta cliente.</p>
                  )}
                </div>
              </div>
            )}

            {/* Photos selection grid */}
            <div className="flex-1 overflow-y-auto mb-6 pr-1 font-geist">
              
              {/* Reference thumbnails used section with batch and individual copying */}
              {activeViewBook.references_data && activeViewBook.references_data.length > 0 && (
                <div className="mb-6 bg-neutral-50 border border-neutral-200/50 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Poses Usadas</p>
                    <button
                      onClick={() => {
                        const urls = activeViewBook.references_data.map(r => r.url);
                        handleCopyImagesClipboard(urls, `view_all_refs_${activeViewBook.id}`);
                      }}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-semibold transition ${
                        copiedMap[`view_all_refs_${activeViewBook.id}`]
                          ? 'bg-emerald-600 text-white'
                          : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600'
                      }`}
                    >
                      {copiedMap[`view_all_refs_${activeViewBook.id}`] === 'loading' ? 'Copiando...' : copiedMap[`view_all_refs_${activeViewBook.id}`] ? 'Imagens Copiadas!' : 'Copiar Imagens em Lote'}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {activeViewBook.references_data.map((rData, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-white border border-neutral-200/60 rounded-xl p-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <img src={rData.url} alt={rData.name} className="h-8 w-8 rounded object-cover border border-neutral-100" />
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold text-neutral-700 block truncate">{rData.name}</span>
                            {rData.prompt && (
                              <span className="text-[8px] text-neutral-400 block truncate max-w-[200px]" title={rData.prompt}>
                                {rData.prompt}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1 flex-shrink-0">
                          {rData.prompt && (
                            <button
                              onClick={() => handleCopyText(`view_prompt_${idx}`, rData.prompt)}
                              className={`px-1.5 py-0.5 rounded text-[8px] font-semibold transition ${
                                copiedMap[`view_prompt_${idx}`]
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600 border border-neutral-200/40'
                              }`}
                            >
                              {copiedMap[`view_prompt_${idx}`] ? 'Copiado!' : 'Prompt'}
                            </button>
                          )}
                          <button
                            onClick={() => handleCopyImagesClipboard([rData.url], `view_img_${idx}`)}
                            className={`px-1.5 py-0.5 rounded text-[8px] font-semibold transition ${
                              copiedMap[`view_img_${idx}`]
                                ? 'bg-emerald-600 text-white'
                                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600 border border-neutral-200/40'
                            }`}
                          >
                            {copiedMap[`view_img_${idx}`] === 'loading' ? 'Copiando...' : copiedMap[`view_img_${idx}`] ? 'Copiada!' : 'Copiar Imagem'}
                          </button>
                          <button
                            onClick={() => handleCopyText(`view_url_${idx}`, rData.url)}
                            className={`px-1.5 py-0.5 rounded text-[8px] font-semibold transition ${
                              copiedMap[`view_url_${idx}`]
                                ? 'bg-emerald-600 text-white'
                                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600 border border-neutral-200/40'
                            }`}
                          >
                            {copiedMap[`view_url_${idx}`] ? 'Link Copiado!' : 'Copiar Link'}
                          </button>
                          <a
                            href={rData.url}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-neutral-100 hover:bg-neutral-200 text-neutral-600 border border-neutral-200/40 px-1.5 py-0.5 rounded text-[8px] font-semibold text-center"
                          >
                            Ver
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Drag and Drop Zone for Bulk Upload */}
              <div 
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="mb-6 border-2 border-dashed border-neutral-350 border-neutral-300 hover:border-indigo-500 bg-neutral-50/50 hover:bg-indigo-50/10 rounded-2xl p-6 transition flex flex-col items-center justify-center cursor-pointer text-center relative group"
                onClick={() => document.getElementById('bulk-upload-input').click()}
              >
                <input 
                  type="file" 
                  multiple 
                  accept="image/*"
                  className="hidden" 
                  id="bulk-upload-input" 
                  onChange={(e) => handleBulkUpload(e.target.files)} 
                />
                
                {isUploadingFiles ? (
                  <div className="flex flex-col items-center gap-2">
                    <Sparkles className="w-8 h-8 text-indigo-600 animate-spin" />
                    <p className="text-xs font-semibold text-neutral-800">{uploadProgress}</p>
                    <p className="text-[10px] text-neutral-500">Por favor, aguarde o término do upload.</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-neutral-100 group-hover:bg-indigo-100/50 flex items-center justify-center text-neutral-500 group-hover:text-indigo-600 transition">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-neutral-800">
                        Arraste as fotos do book geradas aqui
                      </p>
                      <p className="text-[10px] text-neutral-500 mt-0.5">
                        ou clique para selecionar do seu dispositivo
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-3">Retratos e Seleções do Cliente</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {activeViewBook.photos?.map((ph) => {
                  const isSelected = activeViewBook.selected_photo_ids?.includes(ph.id);
                  return (
                    <div key={ph.id} className={`relative aspect-[3/4] bg-neutral-100 rounded-2xl overflow-hidden ring-2 flex flex-col justify-between group ${
                      isSelected ? 'ring-emerald-500 shadow-emerald-500/10' : 'ring-transparent'
                    }`}>
                      <img src={ph.url} alt={ph.variationType} className="absolute inset-0 w-full h-full object-cover" />
                      
                      {/* Top Action Overlay (Delete Button & Selection Status) */}
                      <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => handleDeletePhoto(ph.id)}
                          className="h-6 w-6 rounded-lg bg-rose-600 text-white flex items-center justify-center shadow hover:bg-rose-500 transition-colors"
                          title="Excluir Foto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        
                        {isSelected && (
                          <div className="h-6 w-6 bg-emerald-500 text-white rounded-lg flex items-center justify-center shadow">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>

                      {/* Translucent overlay at bottom for editing variation label */}
                      <div className="absolute bottom-0 inset-x-0 bg-black/70 backdrop-blur-sm p-1.5 flex items-center gap-1.5 z-10">
                        <select
                          value={ph.variationType || 'normal'}
                          onChange={(e) => handleUpdatePhotoVariation(ph.id, e.target.value)}
                          className="w-full bg-transparent text-white text-[9px] border-none focus:ring-0 focus:outline-none cursor-pointer font-semibold uppercase tracking-wider font-geist"
                        >
                          <option value="normal" className="bg-neutral-900 text-white">Normal</option>
                          <option value="Dia dos Namorados" className="bg-neutral-900 text-white font-geist">Dia dos Namorados</option>
                          <option value="Estúdio" className="bg-neutral-900 text-white font-geist">Estúdio</option>
                          <option value="Profissional" className="bg-neutral-900 text-white font-geist">Profissional</option>
                          <option value="Corporativo" className="bg-neutral-900 text-white font-geist">Corporativo</option>
                          <option value="Casual" className="bg-neutral-900 text-white font-geist">Casual</option>
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary statistics inside footer */}
            <div className="border-t border-neutral-100 pt-5 flex items-center justify-between font-geist">
              <div>
                <p className="text-xs text-neutral-400">Total Selecionado</p>
                <h4 className="text-base font-bold text-neutral-900 mt-0.5">
                  {activeViewBook.selected_photo_ids?.length || 0} de {activeViewBook.photos?.length || 0} fotos
                </h4>
              </div>
              <div className="text-right">
                <p className="text-xs text-neutral-400">Faturamento da Compra</p>
                <h4 className="text-lg font-bold text-indigo-600 mt-0.5">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                    calculateTotalPrice(
                      activeViewBook.selected_photo_ids?.length || 0,
                      activeViewBook.price_per_photo,
                      activeViewBook.package_price,
                      activeViewBook.package_photos,
                      activeViewBook.extra_photo_price
                    )
                  )}
                </h4>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
