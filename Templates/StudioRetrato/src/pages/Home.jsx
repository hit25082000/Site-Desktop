import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { seedDatabaseIfNeeded } from '../services/seedDb';
import { 
  Gear, 
  Phone, 
  ArrowUpRight, 
  ArrowRight,
  Plus, 
  Sparkle as Sparkles,
  Camera,
  Chat as ChatBubble,
  Check,
  Briefcase,
  Users,
  UserCheck,
  Medal as Award,
  WarningCircle,
  ShieldCheck
} from '@phosphor-icons/react';

const PREMIUM_REFERENCES = [
  {
    category: 'Fotos Executivas',
    title: 'Retrato Executivo Editorial',
    url: 'assets/ref_1.png',
    description: 'Iluminação clássica de estúdio com foco em autoridade, credibilidade e solidez. Cenários sóbrios em tons neutros.',
    vibe: 'Formal / Liderança',
    target: 'Sócios, Conselheiros, Diretores e CEOs'
  },
  {
    category: 'Fotos em Escritório',
    title: 'Corporativo em Ambiente Real',
    url: 'assets/ref_3.png',
    description: 'Cenários de escritórios modernos com luz natural suave, sugerindo tomada de decisão e dinamismo profissional.',
    vibe: 'Moderno / Corporativo',
    target: 'Executivos, Gestores e Profissionais de Tecnologia'
  },
  {
    category: 'Marca Pessoal',
    title: 'Lifestyle de Negócios',
    url: 'assets/ref_5.png',
    description: 'Retratos com estética casual premium e enquadramentos mais espontâneos, ótimos para gerar proximidade e confiança.',
    vibe: 'Acessível / Casual Chic',
    target: 'Palestrantes, Mentores, Consultores e Criadores'
  },
  {
    category: 'Fotos de Equipe',
    title: 'Sintonia Corporativa',
    url: 'assets/ref_7.png',
    description: 'Padronização estética completa para times de sócios, diretorias e colaboradores, elevando a percepção da marca.',
    vibe: 'Coesão / Time Premium',
    target: 'Equipes Corporativas, Startups e Bancas de Advogados'
  },
  {
    category: 'LinkedIn & Site',
    title: 'Presença Digital de Impacto',
    url: 'assets/ref_9.png',
    description: 'Aplicação real em mockups de perfis profissionais e sites corporativos, demonstrando o resultado prático final.',
    vibe: 'Aplicação Comercial',
    target: 'LinkedIn, Sites Institucionais e Imprensa'
  }
];

const FALLBACK_REFERENCES = [
  // Category: Executivo (Tab 1: Fotos Executivas)
  { id: 'ref_exec_1', name: 'Retrato Executivo Editorial Premium', category: 'Executivo', url: 'assets/ref_1.png', prompt: 'Premium corporate executive headshot with classic studio lighting.', public: true, order: 1 },
  { id: 'ref_exec_2', name: 'Liderança Corporativa Clássica', category: 'Executivo', url: 'assets/ref_2.png', prompt: 'Classic executive leadership portrait.', public: true, order: 2 },
  { id: 'ref_exec_3', name: 'Retrato de Conselho Editorial', category: 'Executivo', url: 'assets/ref_3.png', prompt: 'Editorial board executive portrait.', public: true, order: 3 },
  { id: 'ref_exec_4', name: 'Especialista Corporate Vogue', category: 'Executivo', url: 'assets/ref_5.png', prompt: 'Sophisticated executive brand photoshoot.', public: true, order: 4 },
  { id: 'ref_exec_5', name: 'Posicionamento C-Level', category: 'Executivo', url: 'assets/ref_9.png', prompt: 'Corporate C-level executive portrait.', public: true, order: 5 },
  { id: 'ref_exec_6', name: 'Perfil Comercial Presidencial', category: 'Executivo', url: 'assets/ref_10.png', prompt: 'Presidential corporate portrait.', public: true, order: 6 },
  { id: 'ref_exec_7', name: 'Retrato Executivo Moderno', category: 'Executivo', url: 'assets/ref_4.png', prompt: 'Modern corporate executive portrait.', public: true, order: 7 },
  { id: 'ref_exec_8', name: 'Diretor de Tecnologia e Inovação', category: 'Executivo', url: 'assets/ref_6.png', prompt: 'Tech director executive portrait.', public: true, order: 8 },
  { id: 'ref_exec_9', name: 'Head de Operações Corporativas', category: 'Executivo', url: 'assets/ref_8.png', prompt: 'Head of operations executive portrait.', public: true, order: 9 },

  // Category: Escritório (Tab 2: Fotos em Escritório)
  { id: 'ref_esc_1', name: 'Retrato Corporativo em Ambiente Real', category: 'Escritório', url: 'assets/ref_3.png', prompt: 'Corporate professional in office environment.', public: true, order: 10 },
  { id: 'ref_esc_2', name: 'Dinamismo no Escritório Moderno', category: 'Escritório', url: 'assets/ref_4.png', prompt: 'Modern workplace corporate session.', public: true, order: 11 },
  { id: 'ref_esc_3', name: 'Foco e Tomada de Decisão', category: 'Escritório', url: 'assets/ref_1.png', prompt: 'Executive in boardroom.', public: true, order: 12 },
  { id: 'ref_esc_4', name: 'Luz Natural e Presença Corporativa', category: 'Escritório', url: 'assets/ref_6.png', prompt: 'Office dynamic photoshoot.', public: true, order: 13 },
  { id: 'ref_esc_5', name: 'Comunicação Executiva Contemporânea', category: 'Escritório', url: 'assets/ref_8.png', prompt: 'Modern office team lead.', public: true, order: 14 },
  { id: 'ref_esc_6', name: 'Consultor Sênior em Ação', category: 'Escritório', url: 'assets/ref_2.png', prompt: 'Senior consultant in professional office setting.', public: true, order: 15 },
  { id: 'ref_esc_7', name: 'CEO Office Lifestyle', category: 'Escritório', url: 'assets/ref_5.png', prompt: 'CEO office workspace photoshoot.', public: true, order: 16 },
  { id: 'ref_esc_8', name: 'Reunião Executiva e Integração', category: 'Escritório', url: 'assets/ref_7.png', prompt: 'Executive meeting office portrait.', public: true, order: 17 },
  { id: 'ref_esc_9', name: 'Gestão e Liderança de Equipes', category: 'Escritório', url: 'assets/ref_10.png', prompt: 'Leadership style office session.', public: true, order: 18 },

  // Category: Marca Pessoal (Tab 3: Marca Pessoal)
  { id: 'ref_mp_1', name: 'Lifestyle de Negócios Editorial', category: 'Marca Pessoal', url: 'assets/ref_5.png', prompt: 'Entrepreneur brand lifestyle session.', public: true, order: 19 },
  { id: 'ref_mp_2', name: 'Posicionamento e Conexão Digital', category: 'Marca Pessoal', url: 'assets/ref_6.png', prompt: 'Casual business brand session.', public: true, order: 20 },
  { id: 'ref_mp_3', name: 'Carisma e Autoridade Palestrante', category: 'Marca Pessoal', url: 'assets/ref_2.png', prompt: 'Speaker personal brand photoshoot.', public: true, order: 21 },
  { id: 'ref_mp_4', name: 'Acessibilidade Executiva Premium', category: 'Marca Pessoal', url: 'assets/ref_4.png', prompt: 'Premium casual brand portrait.', public: true, order: 22 },
  { id: 'ref_mp_5', name: 'Estratégia e Posicionamento Digital', category: 'Marca Pessoal', url: 'assets/ref_8.png', prompt: 'Digital marketing branding session.', public: true, order: 23 },
  { id: 'ref_mp_6', name: 'Editorial de Moda Corporativa', category: 'Marca Pessoal', url: 'assets/ref_1.png', prompt: 'Corporate fashion and lifestyle session.', public: true, order: 24 },
  { id: 'ref_mp_7', name: 'Autoridade em Consultoria Criativa', category: 'Marca Pessoal', url: 'assets/ref_3.png', prompt: 'Creative consultant portrait.', public: true, order: 25 },
  { id: 'ref_mp_8', name: 'Criadora de Conteúdo e Mentora', category: 'Marca Pessoal', url: 'assets/ref_9.png', prompt: 'Content creator and mentor personal brand.', public: true, order: 26 },
  { id: 'ref_mp_9', name: 'Branding Pessoal de Alta Performance', category: 'Marca Pessoal', url: 'assets/ref_10.png', prompt: 'High performance personal branding.', public: true, order: 27 },

  // Category: Equipes (Tab 4: Fotos de Equipe)
  { id: 'ref_eq_1', name: 'Sintonia Corporativa Executiva', category: 'Equipes', url: 'assets/ref_7.png', prompt: 'Executive board portrait.', public: true, order: 28 },
  { id: 'ref_eq_2', name: 'Time de Alta Performance', category: 'Equipes', url: 'assets/ref_8.png', prompt: 'Cohesive corporate team portrait.', public: true, order: 29 },
  { id: 'ref_eq_3', name: 'Conselho Executivo Integrado', category: 'Equipes', url: 'assets/ref_1.png', prompt: 'Board of directors group session.', public: true, order: 30 },
  { id: 'ref_eq_4', name: 'Alinhamento Estratégico de Sócios', category: 'Equipes', url: 'assets/ref_3.png', prompt: 'Business partners photoshoot.', public: true, order: 31 },
  { id: 'ref_eq_5', name: 'Cultura e Integração Corporativa', category: 'Equipes', url: 'assets/ref_5.png', prompt: 'Team leadership group photo.', public: true, order: 32 },
  { id: 'ref_eq_6', name: 'Retratos Integrados de Sócios', category: 'Equipes', url: 'assets/ref_2.png', prompt: 'Cohesive partner headshots.', public: true, order: 33 },
  { id: 'ref_eq_7', name: 'Corporativo Coesivo Multidisciplinar', category: 'Equipes', url: 'assets/ref_4.png', prompt: 'Multidisciplinary corporate team session.', public: true, order: 34 },
  { id: 'ref_eq_8', name: 'Equipe Criativa e Colaboração', category: 'Equipes', url: 'assets/ref_6.png', prompt: 'Creative agency team group photo.', public: true, order: 35 },
  { id: 'ref_eq_9', name: 'Padrão de Diretoria de Tecnologia', category: 'Equipes', url: 'assets/ref_9.png', prompt: 'Tech department group photo style.', public: true, order: 36 },

  // Category: LinkedIn (Tab 5: LinkedIn & Site)
  { id: 'ref_link_1', name: 'Presença Digital de Impacto', category: 'LinkedIn', url: 'assets/ref_9.png', prompt: 'LinkedIn mockups and online brand presence.', public: true, order: 37 },
  { id: 'ref_link_2', name: 'Perfil Comercial de Alta Autoridade', category: 'LinkedIn', url: 'assets/ref_10.png', prompt: 'Digital corporate profile presentation.', public: true, order: 38 },
  { id: 'ref_link_3', name: 'Retrato de Destaque Executivo', category: 'LinkedIn', url: 'assets/ref_2.png', prompt: 'Professional LinkedIn profile picture.', public: true, order: 39 },
  { id: 'ref_link_4', name: 'Imagem para Canais Digitais', category: 'LinkedIn', url: 'assets/ref_4.png', prompt: 'Social media executive portrait.', public: true, order: 40 },
  { id: 'ref_link_5', name: 'Visual Institucional Moderno', category: 'LinkedIn', url: 'assets/ref_6.png', prompt: 'Institutional site biography portrait.', public: true, order: 41 },
  { id: 'ref_link_6', name: 'Presença Executiva no LinkedIn', category: 'LinkedIn', url: 'assets/ref_8.png', prompt: 'LinkedIn profile headshot.', public: true, order: 42 },
  { id: 'ref_link_7', name: 'Portfólio Executivo de Carreira', category: 'LinkedIn', url: 'assets/ref_1.png', prompt: 'Executive career portfolio portrait.', public: true, order: 43 },
  { id: 'ref_link_8', name: 'Perfil de CEO e Conselheiro', category: 'LinkedIn', url: 'assets/ref_3.png', prompt: 'CEO LinkedIn style profile photo.', public: true, order: 44 },
  { id: 'ref_link_9', name: 'Destaque de Assessoria de Imprensa', category: 'LinkedIn', url: 'assets/ref_5.png', prompt: 'Press release headshot style.', public: true, order: 45 }
];

const ROLES = [
  {
    id: 'executive',
    title: 'Empresários e C-Levels',
    icon: Briefcase,
    description: 'Transmita visão, liderança de mercado e solidez institucional para atrair novos parceiros, investidores e talentos de ponta.',
    image: 'assets/portrait_executive.png',
    vibe: 'PRESENÇA INSTITUCIONAL & SOLIDEZ',
    quote: 'Retratos com acabamento de revista de negócios. Foco em autoridade e liderança corporativa.'
  },
  {
    id: 'lawyer',
    title: 'Advogados e Consultores',
    icon: UserCheck,
    description: 'Mostre seriedade, rigor técnico e sofisticação ideais para clientes que buscam soluções para problemas de alta complexidade.',
    image: 'assets/portrait_linkedin.png',
    vibe: 'RIGOR TÉCNICO & CREDIBILIDADE',
    quote: 'Postura clássica com iluminação editorial. Transmite sobriedade e refinamento técnico.'
  },
  {
    id: 'medical',
    title: 'Médicos e Especialistas',
    icon: Award,
    description: 'Una a humanização clínica e o acolhimento à autoridade médica científica, construindo uma marca de referência.',
    image: 'assets/portrait_office.png',
    vibe: 'CONFIANÇA CLÍNICA & ACOLHIMENTO',
    quote: 'Equilíbrio perfeito entre proximidade humana e rigor profissional. Visual limpo e iluminado.'
  },
  {
    id: 'speaker',
    title: 'Mentores e Palestrantes',
    icon: Sparkles,
    description: 'Retratos com dinamismo e presença cênica perfeitos para banners de eventos, capas de livros e criativos de lançamento.',
    image: 'assets/portrait_personal_brand.png',
    vibe: 'DINAMISMO & CARISMA',
    quote: 'Imagens de alto impacto para canais digitais. Transmite energia, autoridade e conexão imediata.'
  },
  {
    id: 'agent',
    title: 'Corretores e Liberais',
    icon: Users,
    description: 'Elegância acessível imediata para causar a melhor primeira impressão com leads e fechar contratos de alto padrão.',
    image: 'assets/portrait_office.png',
    vibe: 'PRESTÍGIO & CONEXÃO',
    quote: 'Composição dinâmica voltada para conversão de vendas e posicionamento em mercados premium.'
  },
  {
    id: 'team',
    title: 'Equipes e Empresas',
    icon: ShieldCheck,
    description: 'Padronize fotos de colaboradores no LinkedIn e páginas institucionais com a mesma direção visual, sem paralisar o escritório.',
    image: 'assets/portrait_team.png',
    vibe: 'PADRÃO CORPORATIVO EDITORIAL',
    quote: 'Consistência de marca e visual integrado para todo o seu time executivo ou comercial.'
  }
];

export default function Home() {
  const [dbReferences, setDbReferences] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Fotos Executivas');
  const [activeRole, setActiveRole] = useState('executive');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(true);

  // Time clock in America/Sao_Paulo
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const fmt = new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setTime(fmt.format(now));
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch references and seed if empty
  useEffect(() => {
    const initDb = async () => {
      setLoading(true);
      await seedDatabaseIfNeeded();

      // Fetch references
      const { data: refs, error: refsError } = await supabase
        .from('references')
        .select('*')
        .eq('public', true)
        .order('order', { ascending: true });

      if (refsError) {
        console.error('Error fetching references:', refsError);
      } else {
        setDbReferences(refs || []);
      }
      setLoading(false);
    };

    initDb();
  }, []);

  // Helper to map DB references categories to B2B categories
  const getDbRefsForCategory = (catName) => {
    const refsSource = dbReferences.length > 0 ? dbReferences : FALLBACK_REFERENCES;
    return refsSource.filter(ref => {
      if (catName === 'Fotos Executivas') {
        return ref.category === 'Executivo' || ref.category === 'Studio';
      }
      if (catName === 'Fotos em Escritório') {
        return ref.category === 'Escritório';
      }
      if (catName === 'Marca Pessoal') {
        return ref.category === 'Marca Pessoal' || ref.category === 'Vogue';
      }
      if (catName === 'Fotos de Equipe') {
        return ref.category === 'Equipes' || ref.category === 'Equipe';
      }
      if (catName === 'LinkedIn & Site') {
        return ref.category === 'Aplicações' || ref.category === 'LinkedIn';
      }
      return false;
    });
  };

  const currentPremiumRef = PREMIUM_REFERENCES.find(r => r.category === activeFilter) || PREMIUM_REFERENCES[0];
  const matchingDbRefs = getDbRefsForCategory(activeFilter);

  // Link generator for WhatsApp
  const getWaLink = (message) => {
    return `https://wa.me/5567931990118?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="relative min-h-screen pt-0 pb-16 px-6 sm:px-8 md:px-10 bg-neutral-50 text-neutral-800">
      {/* Decorative Elegant Background Aura */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-50/30 via-white to-slate-100/50"></div>

      {/* Lanyard Strap & Clip Simulation (Badge Hanger) */}
      <div className="relative flex flex-col items-center z-20 -mb-6">
        {/* Black lanyard strap going off-screen */}
        <div className="h-16 w-6 bg-neutral-800 rounded-b-md shadow-inner border-b border-white/5"></div>
        {/* Metallic clip clasping the card below */}
        <div className="h-6 w-14 rounded-md bg-neutral-900 border border-neutral-700 shadow-md flex items-center justify-center">
          <div className="h-1.5 w-6 rounded-full bg-neutral-600"></div>
        </div>
      </div>

      {/* Main Badge Card Container (The Website content wrapped in a border box with white background) */}
      <div className="relative w-full max-w-5xl mx-auto bg-white rounded-[2.5rem] border border-neutral-200 shadow-2xl p-8 sm:p-10 md:p-12 font-geist z-10">
        
        {/* Navigation & Header */}
        <div className="flex gap-4 flex-wrap mb-12 items-center justify-between border-b border-neutral-100 pb-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-neutral-950 flex items-center justify-center shadow-lg">
              <Camera className="w-5 h-5 text-white" weight="light" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-neutral-900">Studio Retrato</span>
              <span className="text-[10px] tracking-wide text-blue-700 font-semibold block -mt-0.5">Editorial Premium</span>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link 
              to="/admin" 
              className="flex items-center gap-2 text-neutral-500 hover:text-blue-600 transition font-medium"
            >
              <Gear className="w-4 h-4 text-neutral-400 hover:text-blue-600 transition" weight="light" />
              <span>Painel do Fotógrafo</span>
            </Link>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-neutral-500">Horário Local (SP):</span>
              <span className="font-mono text-base font-semibold text-neutral-800 bg-neutral-50 px-2.5 py-1 rounded-lg border border-neutral-200">{time || '12:00:00'}</span>
            </div>
          </div>
        </div>

        {/* 1. Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-24">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-700">
              <Sparkles className="w-3.5 h-3.5" weight="light" />
              <span>Retratos profissionais de alto impacto</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-neutral-950 leading-[1.05] font-sans">
              Fotos <span className="font-serif italic font-normal text-blue-700">profissionais</span> para empresários <span className="font-serif italic font-normal text-amber-600">sem precisar</span> ir ao estúdio.
            </h1>
            
            <p className="text-lg text-neutral-600 leading-relaxed">
              Criamos retratos executivos com aparência de ensaio editorial a partir das suas fotos, com direção visual personalizada e entrega pronta para LinkedIn, Instagram, site e WhatsApp.
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center pt-2">
              <a 
                className="group inline-flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] text-base font-bold font-ffpqr tracking-wider text-white bg-neutral-950 hover:bg-neutral-900 rounded-full py-4 px-8 shadow-xl shadow-neutral-950/10" 
                href={getWaLink("Olá! Gostaria de solicitar meu ensaio profissional personalizado no Studio Retrato.")}
                target="_blank"
                rel="noreferrer"
              >
                <span>Solicitar meu ensaio profissional</span>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4 text-white" weight="light" />
                </span>
              </a>
            </div>

            {/* Premium Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-neutral-100 text-xs text-neutral-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" weight="light" />
                <span>Direção Visual Artística</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-700" weight="light" />
                <span>IA Invisível e Natural</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600" weight="light" />
                <span>Resolução Ultra HD</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 w-full flex justify-center">
            <div className="relative w-full max-w-[340px] lg:max-w-none aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl border border-neutral-200 bg-neutral-50 p-2.5">
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent z-10"></div>
              <img
                alt="Gaby Portrait Reference"
                className="w-full h-full object-cover rounded-[1.7rem]"
                src="assets/gaby_avatar_new.png"
              />
              <div className="absolute bottom-6 left-6 right-6 z-20 font-geist">
                <p className="text-[10px] text-blue-300 font-bold font-ffpqr uppercase tracking-widest">DIRETORA VISUAL</p>
                <h4 className="text-lg font-extrabold text-white leading-tight font-sans">Gabriely <span className="font-serif italic font-normal text-blue-200">Miranda</span> Pezzolantee</h4>
                <p className="text-xs text-neutral-200 mt-0.5">Exemplo de retrato executivo editorial</p>
              </div>
            </div>
          </div>
        </div>

        {/* Status banner */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-neutral-50 border border-neutral-200 rounded-2xl p-4 sm:p-5 mb-24">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm font-semibold text-emerald-600">Atendimento e curadoria abertos para esta semana</span>
          </div>
          <a 
            className="flex items-center gap-2 text-neutral-800 hover:text-blue-600 transition text-sm font-bold bg-white px-4 py-2 rounded-xl border border-neutral-200 shadow-sm" 
            href="https://wa.me/5567931990118" 
            target="_blank"
            rel="noreferrer"
          >
            <Phone className="w-4 h-4 text-emerald-500 fill-emerald-500 animate-pulse" weight="light" />
            <span>Fale Conosco: (67) 93199-0118</span>
          </a>
        </div>

        {/* 2. Antes e depois / referências */}
        <section id="Referencias" className="scroll-mt-6 mb-28">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tighter mb-4 font-sans leading-tight">
              Você escolhe a <span className="font-serif italic font-normal text-blue-700">direção visual</span>. Nós criamos o <span className="font-serif italic font-normal text-amber-600">ensaio</span>.
            </h2>
            <p className="text-neutral-500 text-base leading-relaxed">
              Você define o posicionamento que deseja transmitir. Nós desenhamos o ensaio profissional sob medida a partir das suas fotos.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {PREMIUM_REFERENCES.map((ref) => (
              <button
                key={ref.category}
                onClick={() => setActiveFilter(ref.category)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition ${
                  activeFilter === ref.category
                    ? 'bg-neutral-950 text-white shadow-lg shadow-neutral-950/10'
                    : 'bg-neutral-50 text-neutral-500 border border-neutral-200 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                {ref.category}
              </button>
            ))}
          </div>

          {/* Spotlight Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-neutral-50 border border-neutral-200 rounded-3xl p-6 lg:p-8 items-center">
            
            <div className="lg:col-span-6">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-neutral-200 shadow-2xl bg-black">
                <img 
                  alt={currentPremiumRef.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  src={currentPremiumRef.url} 
                />
                <div className="absolute top-4 left-4 bg-neutral-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
                  <span className="text-[10px] text-blue-300 font-bold uppercase tracking-widest">{currentPremiumRef.vibe}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div>
                <p className="text-xs font-semibold text-blue-700 mb-1">Direção de Arte</p>
                <h3 className="text-2xl lg:text-3xl font-extrabold text-neutral-900 leading-tight font-sans">
                  {currentPremiumRef.title}
                </h3>
              </div>

              <p className="text-neutral-600 text-base leading-relaxed">
                {currentPremiumRef.description}
              </p>

              <div className="grid grid-cols-2 gap-4 border-t border-neutral-200 pt-6">
                <div>
                  <h5 className="text-[11px] text-neutral-400 font-semibold">Público recomendado</h5>
                  <p className="text-sm font-semibold text-neutral-800 mt-1">{currentPremiumRef.target}</p>
                </div>
                <div>
                  <h5 className="text-[11px] text-neutral-400 font-semibold">Entrega pronta para</h5>
                  <p className="text-sm font-semibold text-neutral-800 mt-1">LinkedIn, Site e WhatsApp</p>
                </div>
              </div>

              <div className="pt-2">
                <a 
                  className="inline-flex items-center gap-2 text-sm font-bold text-neutral-800 bg-white hover:bg-neutral-100 px-5 py-3 rounded-xl border border-neutral-200 transition shadow-sm w-full justify-center sm:w-auto"
                  href={getWaLink(`Olá! Me interessei pela direção visual "${currentPremiumRef.title}" e gostaria de entender mais.`)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>Solicitar este estilo de ensaio</span>
                  <ArrowRight className="w-4 h-4 text-neutral-500" weight="light" />
                </a>
              </div>
            </div>
          </div>

          {/* Database enriched references grid */}
          {matchingDbRefs.length > 0 && (
            <div className="mt-16">
              <h4 className="text-sm font-bold text-neutral-800 mb-8 text-center uppercase tracking-widest font-ffpqr">Mais referências deste estilo</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {matchingDbRefs.map((ref) => (
                  <div 
                    key={ref.id} 
                    className="group relative overflow-hidden bg-neutral-50 rounded-2xl border border-neutral-200/85 aspect-[3/4] shadow-sm hover:shadow-xl hover:border-neutral-300/80 transition-all duration-500 ease-out"
                  >
                    <img 
                      alt={ref.name} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" 
                      src={ref.url} 
                    />
                    {/* Modern dynamic overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <span className="text-[10px] text-blue-300 font-bold uppercase tracking-widest">{ref.category}</span>
                        <p className="text-xs font-bold text-white mt-0.5 leading-tight">{ref.name}</p>
                      </div>
                    </div>
                    {/* Subtle aesthetic edge highlight on hover */}
                    <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 rounded-2xl pointer-events-none transition-colors duration-500"></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* 3. Para quem é (Interactive Split Panel) */}
        <section id="ParaQuem" className="mb-28">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tighter mb-4 font-sans leading-tight">
              Para <span className="font-serif italic font-normal text-blue-700">profissionais</span> que buscam <span className="font-serif italic font-normal text-amber-600">excelência digital</span>.
            </h2>
            <p className="text-neutral-500 text-base leading-relaxed">
              Ideal para líderes, especialistas e times que entendem que a imagem pessoal é o seu principal ativo de vendas e posicionamento.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-neutral-50/50 border border-neutral-200/80 rounded-[3rem] p-6 lg:p-8">
            {/* Left side: Role selectors */}
            <div className="lg:col-span-6 flex flex-col justify-center gap-3">
              {ROLES.map((role) => {
                const IconComponent = role.icon;
                const isActive = activeRole === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => setActiveRole(role.id)}
                    className={`flex items-start gap-4 p-4 rounded-2xl text-left transition-all duration-300 ${
                      isActive
                        ? 'bg-white border border-neutral-200/80 shadow-md shadow-neutral-900/5 translate-x-1 lg:translate-x-2'
                        : 'hover:bg-white/50 border border-transparent'
                    }`}
                  >
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border ${
                      isActive
                        ? 'bg-blue-50 border-blue-100 text-blue-700'
                        : 'bg-neutral-100 border-neutral-200 text-neutral-500'
                    }`}>
                      <IconComponent className="w-5 h-5" weight="light" />
                    </div>
                    <div>
                      <h4 className={`text-base font-bold transition-colors ${
                        isActive ? 'text-neutral-950' : 'text-neutral-700'
                      }`}>
                        {role.title}
                      </h4>
                      <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                        {role.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right side: Editorial Preview Card */}
            <div className="lg:col-span-6 flex items-center justify-center">
              {(() => {
                const currentRole = ROLES.find(r => r.id === activeRole) || ROLES[0];
                return (
                  <div className="relative w-full max-w-sm aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl border border-neutral-200 bg-white p-3 flex flex-col justify-between">
                    <div className="relative flex-1 rounded-[1.6rem] overflow-hidden bg-neutral-100">
                      <img
                        alt={currentRole.title}
                        className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                        src={currentRole.image}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/10 to-transparent"></div>
                      
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-neutral-800 text-[10px] font-bold px-3 py-1 rounded-full border border-white/20">
                        {currentRole.vibe}
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <p className="text-xs text-neutral-200 font-medium leading-relaxed italic">
                          "{currentRole.quote}"
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </section>

        {/* 4. O Problema */}
        <section id="Problema" className="mb-28">
          <div className="relative overflow-hidden bg-neutral-50 border border-neutral-200 rounded-3xl p-8 lg:p-12">
            <div className="absolute right-0 top-0 h-64 w-64 bg-blue-500/5 rounded-full blur-3xl"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-xs font-medium text-amber-700">
                  <WarningCircle className="w-3.5 h-3.5" weight="light" />
                  <span>Diagnóstico de imagem</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-extrabold text-neutral-950 tracking-tighter leading-tight font-sans">
                  Sua imagem <span className="font-serif italic font-normal text-blue-700">atual</span> reflete seu <span className="font-serif italic font-normal text-amber-600">valor real</span>?
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Muitas pessoas têm bons serviços, boa experiência e bom posicionamento, mas usam fotos improvisadas no perfil, no site e nas redes sociais. 
                </p>
                <p className="text-base text-neutral-900 font-medium leading-relaxed">
                  Hoje, sua imagem online pode estar transmitindo menos autoridade do que você realmente tem.
                </p>
              </div>

              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <div className="bg-white border border-neutral-200 rounded-2xl p-5 space-y-4 max-w-[280px] shadow-sm">
                  <div className="flex gap-2.5 items-center">
                    <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
                    <span className="text-xs text-neutral-500 font-semibold font-mono">Retrato Amador</span>
                  </div>
                  <p className="text-xs text-neutral-600 italic">
                    "Fundo inadequado, luz estourada ou roupas casuais demais geram ruído na comunicação e drenam sua autoridade profissional."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Solução */}
        <section id="Solucao" className="mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 order-last lg:order-first">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-neutral-200 shadow-2xl bg-black">
                <img 
                  alt="Premium Editorial Vibe"
                  className="w-full h-full object-cover filter saturate-75"
                  src="assets/portrait.jpg" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent"></div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-700">
                <Sparkles className="w-3.5 h-3.5" weight="light" />
                <span>O conceito do estúdio</span>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-extrabold text-neutral-950 tracking-tighter font-sans leading-tight">
                Direção <span className="font-serif italic font-normal text-blue-700">artística</span> aliada a uma tecnologia <span className="font-serif italic font-normal text-amber-600">invisível</span>.
              </h2>

              <p className="text-neutral-600 text-lg leading-relaxed">
                O Studio Retrato IA cria um ensaio profissional guiado por direção visual, usando IA de forma invisível para transformar fotos simples em imagens sofisticadas, naturais e prontas para uso comercial.
              </p>

              <div className="space-y-4 pt-4 border-t border-neutral-100">
                <div className="flex gap-3">
                  <div className="h-6 w-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    <Check className="w-4 h-4" weight="light" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-neutral-900">Editorial Afetivo</h5>
                    <p className="text-xs text-neutral-500 mt-0.5">Capturamos expressões reais com naturalidade e sensibilidade, evitando poses plásticas.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="h-6 w-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 shrink-0">
                    <Check className="w-4 h-4" weight="light" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-neutral-900">Premium Acessível</h5>
                    <p className="text-xs text-neutral-500 mt-0.5">Entregamos qualidade equivalente a ensaios fotográficos de R$ 1.500 por uma fração do preço.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="h-6 w-6 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                    <Check className="w-4 h-4" weight="light" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-neutral-900">Tecnologia Invisível</h5>
                    <p className="text-xs text-neutral-500 mt-0.5">Sem rostos emborrachados ou cenários artificiais. O foco principal é a sua essência natural.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 6. Como funciona */}
        <section id="ComoFunciona" className="mb-28">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tighter mb-4 font-sans leading-tight">
              Como funciona o seu <span className="font-serif italic font-normal text-blue-700">ensaio editorial</span>.
            </h2>
            <p className="text-neutral-500 text-base leading-relaxed">
              Desenvolvemos um processo consultivo em 5 etapas rápidas que respeita a sua rotina corrida.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {/* Step 1 */}
            <div className="bg-neutral-50 border border-neutral-200/60 rounded-2xl p-5 space-y-3 relative">
              <span className="font-bytalion text-3xl font-extrabold text-blue-600/20">01</span>
              <h4 className="text-base font-bold text-neutral-900">Escolha o Objetivo</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Você define a mensagem profissional que deseja passar e escolhe a direção visual de preferência.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-neutral-50 border border-neutral-200/60 rounded-2xl p-5 space-y-3">
              <span className="font-bytalion text-3xl font-extrabold text-blue-600/20">02</span>
              <h4 className="text-base font-bold text-neutral-900">Envie Fotos Simples</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Forneça de 10 a 15 fotos normais do seu rosto tiradas do celular, sem maquiagem pesada ou poses.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-neutral-50 border border-neutral-200/60 rounded-2xl p-5 space-y-3">
              <span className="font-bytalion text-3xl font-extrabold text-blue-600/20">03</span>
              <h4 className="text-base font-bold text-neutral-900">Orientação de Estilo</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Nossa equipe de direção artística valida a iluminação e as melhores poses para garantir naturalidade.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-neutral-50 border border-neutral-200/60 rounded-2xl p-5 space-y-3">
              <span className="font-bytalion text-3xl font-extrabold text-blue-600/20">04</span>
              <h4 className="text-base font-bold text-neutral-900">Criação com IA</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Nossa IA Pro reconstrói seu retrato preservando detalhes da pele, cabelo e iluminação com realismo absoluto.
              </p>
            </div>

            {/* Step 5 */}
            <div className="bg-neutral-50 border border-neutral-200/60 rounded-2xl p-5 space-y-3">
              <span className="font-bytalion text-3xl font-extrabold text-blue-600/20">05</span>
              <h4 className="text-base font-bold text-neutral-900">Entrega Premium</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Você recebe as imagens finais em ultra resolução prontas para LinkedIn, site e redes.
              </p>
            </div>
          </div>
        </section>

        {/* 7. Pacotes */}
        <section id="Precos" className="mb-28">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tighter mb-4 font-sans leading-tight">
              Pacotes de retratos <span className="font-serif italic font-normal text-blue-700">profissionais</span>
            </h2>
            <p className="text-neutral-500 text-base leading-relaxed">
              Invista no ativo comercial mais valioso da sua presença digital. Planos desenhados para necessidades individuais e empresariais.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* Card 1: Individual */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-8 flex flex-col justify-between hover:border-neutral-300 transition-colors shadow-sm">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-neutral-900">Individual Profissional</h4>
                  <p className="text-xs text-neutral-500 mt-1">Ideal para LinkedIn, perfis comerciais e site.</p>
                </div>

                <div className="space-y-1">
                  <span className="text-neutral-500 text-xs">Planos a partir de</span>
                  <div className="flex items-baseline gap-1 text-neutral-900">
                    <span className="text-lg font-bold">R$</span>
                    <span className="text-4xl font-bytalion font-bold tracking-tight">497</span>
                  </div>
                </div>

                <ul className="space-y-3.5 border-t border-neutral-200 pt-6 text-sm text-neutral-600">
                  <li className="flex gap-2.5 items-center">
                    <Check className="w-4 h-4 text-blue-600 shrink-0" weight="light" />
                    <span><strong>10 retratos profissionais</strong> prontos</span>
                  </li>
                  <li className="flex gap-2.5 items-center">
                    <Check className="w-4 h-4 text-blue-600 shrink-0" weight="light" />
                    <span>Direção de posicionamento básico</span>
                  </li>
                  <li className="flex gap-2.5 items-center">
                    <Check className="w-4 h-4 text-blue-600 shrink-0" weight="light" />
                    <span>2 cenários de escritório ou estúdio</span>
                  </li>
                  <li className="flex gap-2.5 items-center">
                    <Check className="w-4 h-4 text-blue-600 shrink-0" weight="light" />
                    <span>Garantia de semelhança e naturalidade</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <a 
                  className="block text-center text-sm font-bold font-ffpqr tracking-wider text-neutral-800 bg-white hover:bg-neutral-55 px-6 py-3.5 rounded-xl border border-neutral-300 transition shadow-sm"
                  href={getWaLink("Olá! Tenho interesse no pacote Individual Profissional (R$ 497) para retratos executivos.")}
                  target="_blank"
                  rel="noreferrer"
                >
                  Selecionar Pacote
                </a>
              </div>
            </div>

            {/* Card 2: Autoridade (Recomendado) */}
            <div className="bg-white border-2 border-blue-600 rounded-3xl p-8 flex flex-col justify-between relative shadow-xl">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-blue-900 text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-md">
                Destaque
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-neutral-900">Autoridade Premium</h4>
                  <p className="text-xs text-blue-600 mt-1">Direção de marca pessoal e assessoria visual.</p>
                </div>

                <div className="space-y-1">
                  <span className="text-blue-600 text-xs">Planos a partir de</span>
                  <div className="flex items-baseline gap-1 text-neutral-900">
                    <span className="text-lg font-bold">R$</span>
                    <span className="text-4xl font-bytalion font-bold tracking-tight">997</span>
                  </div>
                </div>

                <ul className="space-y-3.5 border-t border-blue-100 pt-6 text-sm text-neutral-800">
                  <li className="flex gap-2.5 items-center">
                    <Check className="w-4 h-4 text-blue-600 shrink-0" weight="light" />
                    <span><strong>25 retratos executivos e editoriais</strong></span>
                  </li>
                  <li className="flex gap-2.5 items-center">
                    <Check className="w-4 h-4 text-blue-600 shrink-0" weight="light" />
                    <span>Curadoria profunda de posicionamento</span>
                  </li>
                  <li className="flex gap-2.5 items-center">
                    <Check className="w-4 h-4 text-blue-600 shrink-0" weight="light" />
                    <span>Múltiplos cenários (Escritório, Estúdio, Café)</span>
                  </li>
                  <li className="flex gap-2.5 items-center">
                    <Check className="w-4 h-4 text-blue-600 shrink-0" weight="light" />
                    <span>Variações de roupas executivas e casuais</span>
                  </li>
                  <li className="flex gap-2.5 items-center">
                    <Check className="w-4 h-4 text-blue-600 shrink-0" weight="light" />
                    <span>Acompanhamento prioritário pós-entrega</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <a 
                  className="block text-center text-sm font-bold font-ffpqr tracking-wider text-white bg-neutral-950 text-white hover:bg-neutral-900 px-6 py-4 rounded-xl shadow-md transition"
                  href={getWaLink("Olá! Tenho interesse no pacote Autoridade Premium (R$ 997). Gostaria de agendar.")}
                  target="_blank"
                  rel="noreferrer"
                >
                  Agendar Autoridade
                </a>
              </div>
            </div>

            {/* Card 3: Equipe */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-8 flex flex-col justify-between hover:border-neutral-300 transition-colors shadow-sm">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-neutral-900">Equipe / Empresa</h4>
                  <p className="text-xs text-neutral-500 mt-1">Padronização de fotos corporativas e times.</p>
                </div>

                <div className="space-y-1">
                  <span className="text-neutral-500 text-xs">Orçamentos</span>
                  <div className="flex items-baseline gap-1 text-neutral-900">
                    <span className="text-3xl font-extrabold tracking-tight">Sob Consulta</span>
                  </div>
                </div>

                <ul className="space-y-3.5 border-t border-neutral-200 pt-6 text-sm text-neutral-600">
                  <li className="flex gap-2.5 items-center">
                    <Check className="w-4 h-4 text-blue-600 shrink-0" weight="light" />
                    <span>Cenários alinhados com o branding da empresa</span>
                  </li>
                  <li className="flex gap-2.5 items-center">
                    <Check className="w-4 h-4 text-blue-600 shrink-0" weight="light" />
                    <span>Fotos padronizadas para sócios e colaboradores</span>
                  </li>
                  <li className="flex gap-2.5 items-center">
                    <Check className="w-4 h-4 text-blue-600 shrink-0" weight="light" />
                    <span>Sem deslocamento ou parada na operação</span>
                  </li>
                  <li className="flex gap-2.5 items-center">
                    <Check className="w-4 h-4 text-blue-600 shrink-0" weight="light" />
                    <span>Licença de uso comercial corporativa ilimitada</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <a 
                  className="block text-center text-sm font-bold font-ffpqr tracking-wider text-neutral-800 bg-white hover:bg-neutral-55 px-6 py-3.5 rounded-xl border border-neutral-300 transition shadow-sm"
                  href={getWaLink("Olá! Preciso de um orçamento personalizado de retratos profissionais para minha Equipe/Empresa.")}
                  target="_blank"
                  rel="noreferrer"
                >
                  Falar com Consultor
                </a>
              </div>
            </div>

          </div>

          {/* Under-price consulting recommendation link */}
          <div className="mt-12 text-center">
            <p className="text-neutral-500 text-sm">
              Não sabe qual escolher?{' '}
              <a 
                className="text-neutral-850 hover:text-blue-600 transition font-bold underline decoration-blue-500 underline-offset-4 inline-flex items-center gap-1"
                href={getWaLink("Olá! Gostaria de receber uma recomendação de pacote ideal para o meu posicionamento profissional.")}
                target="_blank"
                rel="noreferrer"
              >
                <span>Solicite uma recomendação de pacote</span>
                <ArrowUpRight className="w-4 h-4" weight="light" />
              </a>
            </p>
          </div>
        </section>

        {/* 8. CTA final */}
        <section id="CTAFinal" className="mb-20">
          <div className="relative overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/5 rounded-[3rem] p-8 sm:p-12 text-center space-y-6 shadow-2xl">
            <div className="absolute inset-0 bg-grid-white/[0.02] -z-10"></div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tighter leading-tight max-w-3xl mx-auto font-sans">
              Pronto para <span className="font-serif italic font-normal text-blue-300">elevar a autoridade</span> da sua <span className="font-serif italic font-normal text-amber-200">imagem profissional?</span>
            </h2>
            
            <p className="text-[#eaeaf0]/80 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Agende sua curadoria visual online e crie retratos corporativos alinhados ao seu valor profissional em poucos dias.
            </p>
            
            <div className="pt-4">
              <a 
                className="group inline-flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] text-base font-bold font-ffpqr tracking-wider text-black bg-white hover:bg-neutral-100 rounded-full py-4 px-8 shadow-xl"
                href={getWaLink("Olá! Quero solicitar meu Retrato Executivo IA e elevar minha imagem profissional.")}
                target="_blank"
                rel="noreferrer"
              >
                <span>Quero melhorar minha imagem profissional</span>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/5 ring-1 ring-black/10 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4 text-black" weight="light" />
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer id="Contato" className="border-t border-neutral-100 pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
                  <Camera className="w-4 h-4 text-blue-600" weight="light" />
                </div>
                <span className="font-bold text-neutral-900">Studio Retrato</span>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed max-w-sm">
                Estúdio de direção visual e produção de imagem profissional de alta fidelidade impulsionada por inteligência artificial invisível.
              </p>
              <div className="flex items-center gap-2 text-xs text-neutral-500 pt-2">
                <ChatBubble className="w-4 h-4 text-emerald-500" weight="light" />
                <a 
                  className="hover:text-blue-600 transition font-medium" 
                  href="https://wa.me/5567931990118" 
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp Comercial: (67) 93199-0118
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-8 lg:justify-items-end w-full">
              <div>
                <h4 className="text-neutral-800 font-bold mb-4 text-xs uppercase tracking-wider">Direções Visuais</h4>
                <ul className="space-y-2 text-xs text-neutral-500">
                  <li><button onClick={() => { setActiveFilter('Fotos Executivas'); document.getElementById('Referencias').scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-blue-600 transition text-left">Fotos Executivas</button></li>
                  <li><button onClick={() => { setActiveFilter('Fotos em Escritório'); document.getElementById('Referencias').scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-blue-600 transition text-left">Ambientes Corporativos</button></li>
                  <li><button onClick={() => { setActiveFilter('Marca Pessoal'); document.getElementById('Referencias').scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-blue-600 transition text-left">Marca Pessoal / Lifestyle</button></li>
                  <li><button onClick={() => { setActiveFilter('Fotos de Equipe'); document.getElementById('Referencias').scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-blue-600 transition text-left">Retratos de Equipe</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-neutral-800 font-bold mb-4 text-xs uppercase tracking-wider">Links Úteis</h4>
                <ul className="space-y-2 text-xs text-neutral-500">
                  <li><a className="hover:text-blue-600 transition" href="#ComoFunciona">Como Funciona</a></li>
                  <li><a className="hover:text-blue-600 transition" href="#Precos">Pacotes Premium</a></li>
                  <li><Link className="hover:text-blue-600 transition font-medium text-blue-600" to="/admin">Painel de Administração</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-100 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-neutral-400 font-mono">
            <p>© 2026 Studio Retrato. Direitos reservados.</p>
            <div className="flex gap-4">
              <a className="hover:text-neutral-800 transition font-geist" href="#Referencias">Termos de Uso</a>
              <a className="hover:text-neutral-800 transition font-geist" href="#Referencias">Privacidade</a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
