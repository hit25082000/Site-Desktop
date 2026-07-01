import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import {
  ArrowLeft,
  Camera,
  Copy,
  ImageSquare,
  WarningCircle
} from '@phosphor-icons/react';

const HIDDEN_LIBRARY_CATEGORY = 'Landpage';
const STORAGE_URL_MARKER = '/studioretrato-assets/';

const isStorageReference = (ref) => typeof ref?.url === 'string' && ref.url.includes(STORAGE_URL_MARKER);

const decodeCategoryParam = (value = '') => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

export default function ReferenceCatalog() {
  const { category = '' } = useParams();
  const selectedCategory = decodeCategoryParam(category);
  const [categories, setCategories] = useState([]);
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copiedId, setCopiedId] = useState('');

  useEffect(() => {
    let mounted = true;

    const loadCatalog = async () => {
      setLoading(true);
      setError('');

      try {
        const [{ data: categoryRows, error: categoryError }, { data: refRows, error: refError }] = await Promise.all([
          supabase.from('categories').select('*'),
          supabase.from('references').select('*').order('order', { ascending: true })
        ]);

        if (categoryError) throw categoryError;
        if (refError) throw refError;

        if (!mounted) return;

        setCategories((categoryRows || []).filter((item) => item.name !== HIDDEN_LIBRARY_CATEGORY));
        setReferences((refRows || []).filter((ref) => ref.category !== HIDDEN_LIBRARY_CATEGORY && isStorageReference(ref)));
      } catch (err) {
        if (mounted) setError(err.message || 'Nao foi possivel carregar o catalogo.');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadCatalog();

    return () => {
      mounted = false;
    };
  }, []);

  const visibleReferences = useMemo(() => (
    references.filter((ref) => ref.category === selectedCategory)
  ), [references, selectedCategory]);

  const selectedCategoryExists = categories.some((item) => item.name === selectedCategory);

  const copyReferenceLink = async (ref) => {
    try {
      await navigator.clipboard.writeText(ref.url);
      setCopiedId(ref.id);
      setTimeout(() => setCopiedId(''), 1600);
    } catch {
      setCopiedId('');
    }
  };

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-5 sm:px-8 sm:py-8 font-geist">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 rounded-[2rem] border border-neutral-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <Link
                to="/"
                className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 transition hover:text-neutral-700"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Studio Retrato</span>
              </Link>
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">Catalogo de referencias</p>
              <h1 className="mt-1 text-2xl font-bold text-neutral-950 sm:text-4xl">{selectedCategory || 'Referencias'}</h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-500">
                Selecione imagens de pose e estilo para orientar um novo pedido do seu book.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-neutral-950 px-4 py-3 text-white">
              <Camera className="h-5 w-5 text-indigo-300" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">Categoria</p>
                <p className="text-sm font-semibold">{visibleReferences.length} referencia(s)</p>
              </div>
            </div>
          </div>

          {categories.length > 0 && (
            <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
              {categories.map((item) => {
                const isActive = item.name === selectedCategory;
                return (
                  <Link
                    key={item.id || item.name}
                    to={`/catalogo-referencias/${encodeURIComponent(item.name)}`}
                    className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                        : 'border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          )}
        </header>

        {loading ? (
          <div className="flex min-h-[360px] items-center justify-center rounded-[2rem] border border-neutral-200 bg-white text-sm font-semibold text-neutral-400">
            Carregando referencias...
          </div>
        ) : error ? (
          <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[2rem] border border-rose-100 bg-white text-center">
            <WarningCircle className="mb-3 h-10 w-10 text-rose-500" />
            <p className="text-sm font-semibold text-rose-700">{error}</p>
          </div>
        ) : !selectedCategoryExists ? (
          <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[2rem] border border-neutral-200 bg-white text-center">
            <ImageSquare className="mb-3 h-10 w-10 text-neutral-300" />
            <p className="text-sm font-semibold text-neutral-600">Categoria nao encontrada.</p>
          </div>
        ) : visibleReferences.length === 0 ? (
          <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[2rem] border border-neutral-200 bg-white text-center">
            <ImageSquare className="mb-3 h-10 w-10 text-neutral-300" />
            <p className="text-sm font-semibold text-neutral-600">Nenhuma referencia publica nesta categoria.</p>
          </div>
        ) : (
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleReferences.map((ref) => (
              <article key={ref.id} className="overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white shadow-sm">
                <div className="aspect-[3/4] bg-neutral-100">
                  <img src={ref.url} alt={ref.name} className="h-full w-full object-cover" />
                </div>
                <div className="space-y-3 p-4">
                  <div>
                    <p className="line-clamp-1 text-sm font-bold text-neutral-900">{ref.name}</p>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-neutral-500">{ref.prompt}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyReferenceLink(ref)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-neutral-950 px-4 py-3 text-xs font-bold text-white transition hover:bg-neutral-800"
                  >
                    <Copy className="h-4 w-4" />
                    <span>{copiedId === ref.id ? 'Link copiado' : 'Copiar imagem'}</span>
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
