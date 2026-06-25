import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { seedDatabaseIfNeeded } from '../services/seedDb';
import { 
  Phone, 
  ArrowUpRight, 
  ArrowRight,
  ArrowDown,
  Plus, 
  Sparkle as Sparkles,
  Chat as ChatBubble,
  Check,
  Briefcase,
  Users,
  UserCheck,
  Medal as Award,
  WarningCircle,
  ShieldCheck,
  Eye,
  Heartbeat,
  HandHeart,
  SealCheck
} from '@phosphor-icons/react';

// Dynamic import of user-uploaded images from folders
const depoimentosGlob = import.meta.glob('../assets/Depoimentos/*.{png,jpg,jpeg,PNG,JPG,JPEG}', { eager: true });
const enviadasGlob = import.meta.glob('../assets/Enviada/*.{png,jpg,jpeg,PNG,JPG,JPEG}', { eager: true });
const originalsGlob = import.meta.glob('../assets/Original/*.{png,jpg,jpeg,PNG,JPG,JPEG}', { eager: true });

const getFileNameWithoutExt = (path) => {
  const parts = path.split('/');
  const fileName = parts[parts.length - 1];
  return fileName.substring(0, fileName.lastIndexOf('.')).toLowerCase();
};

const getDisplayName = (fileName) => {
  const cleaned = fileName.replace(/\d+$/, '').trim();
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
};

const depoimentosList = Object.entries(depoimentosGlob).map(([path, mod]) => ({
  name: getFileNameWithoutExt(path),
  displayName: getDisplayName(getFileNameWithoutExt(path)),
  url: mod.default || mod
}));

const originalList = Object.entries(originalsGlob).map(([path, mod]) => ({
  name: getFileNameWithoutExt(path),
  url: mod.default || mod
}));

const enviadaList = Object.entries(enviadasGlob).map(([path, mod]) => ({
  name: getFileNameWithoutExt(path),
  url: mod.default || mod
}));

// Create pairs of Before/After dynamically
const matchedPairs = [];
originalList.forEach(orig => {
  const matches = enviadaList.filter(env => env.name.startsWith(orig.name));
  if (matches.length > 0) {
    matches.forEach((match, index) => {
      matchedPairs.push({
        id: `${orig.name}-${index}`,
        clientName: getDisplayName(orig.name),
        originalUrl: orig.url,
        resultUrl: match.url,
        title: `Caso ${getDisplayName(orig.name)} (Opção ${index + 1})`
      });
    });
  } else {
    matchedPairs.push({
      id: orig.name,
      clientName: getDisplayName(orig.name),
      originalUrl: orig.url,
      resultUrl: null,
      title: `Caso ${getDisplayName(orig.name)}`
    });
  }
});

enviadaList.forEach(env => {
  const hasMatch = originalList.some(orig => env.name.startsWith(orig.name));
  if (!hasMatch) {
    matchedPairs.push({
      id: env.name,
      clientName: getDisplayName(env.name),
      originalUrl: null,
      resultUrl: env.url,
      title: `Retrato Profissional`
    });
  }
});

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
    url: 'assets/portrait_team.png',
    description: 'Consistência de marca e imagem coesa para times de sócios, diretores ou equipes inteiras, sem precisar parar a operação.',
    vibe: 'Alinhamento / Autoridade',
    target: 'Equipes Corporativas, Sócios e Conselhos'
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
  // Category: Fotos Executivas (Tab 1: Fotos Executivas)
  { id: 'ref_exec_1', name: 'Retrato Executivo Editorial Premium', category: 'Executivo', url: 'assets/ref_1.png', prompt: 'Premium corporate executive headshot with classic studio lighting.', public: true, order: 1 },
  { id: 'ref_exec_2', name: 'Posicionamento e Liderança Executiva', category: 'Executivo', url: 'assets/ref_2.png', prompt: 'Executive leadership portrait with modern backdrop.', public: true, order: 2 },
  { id: 'ref_exec_3', name: 'Retrato de Conselho Editorial', category: 'Executivo', url: 'assets/ref_3.png', prompt: 'Editorial board executive portrait.', public: true, order: 3 },
  { id: 'ref_exec_4', name: 'CEO Editorial Fine-Art', category: 'Executivo', url: 'assets/ref_5.png', prompt: 'CEO fine art editorial portrait.', public: true, order: 4 },
  { id: 'ref_exec_5', name: 'Executiva Head de Operações', category: 'Executivo', url: 'assets/ref_10.png', prompt: 'Female executive head of operations headshot.', public: true, order: 5 },
  { id: 'ref_exec_6', name: 'Diretora Financeira Corporativa', category: 'Executivo', url: 'assets/ref_2.png', prompt: 'CFO female corporate executive portrait.', public: true, order: 6 },
  { id: 'ref_exec_7', name: 'Retrato Executivo Moderno', category: 'Executivo', url: 'assets/ref_4.png', prompt: 'Modern corporate executive portrait.', public: true, order: 7 },
  { id: 'ref_exec_8', name: 'Diretor de Tecnologia e Inovação', category: 'Executivo', url: 'assets/ref_6.png', prompt: 'Tech director executive portrait.', public: true, order: 8 },
  { id: 'ref_exec_9', name: 'Head de Operações Corporativas', category: 'Executivo', url: 'assets/ref_8.png', prompt: 'Head of operations executive portrait.', public: true, order: 9 },
  { id: 'ref_exec_10', name: 'Sócia-Diretora em Estúdio Editorial', category: 'Executivo', url: 'assets/portrait_executive.png', prompt: 'Editorial boardroom female executive headshot.', public: true, order: 46 },
  { id: 'ref_exec_11', name: 'Conselheiro de Administração B2B', category: 'Executivo', url: 'assets/ref_7.png', prompt: 'B2B board advisor corporate portrait.', public: true, order: 47 },
  { id: 'ref_exec_12', name: 'VP de Finanças Corporativas', category: 'Executivo', url: 'assets/ref_3.png', prompt: 'Corporate VP finance professional portrait.', public: true, order: 48 },
  { id: 'ref_exec_13', name: 'Diretora Executiva de Operações', category: 'Executivo', url: 'assets/ref_1.png', prompt: 'COO female corporate portrait.', public: true, order: 49 },
  { id: 'ref_exec_14', name: 'Sócio Fundador Private Equity', category: 'Executivo', url: 'assets/ref_5.png', prompt: 'Private equity managing partner executive portrait.', public: true, order: 50 },
  { id: 'ref_exec_15', name: 'Executivo C-Level Sênior', category: 'Executivo', url: 'assets/ref_9.png', prompt: 'Senior enterprise executive corporate headshot.', public: true, order: 51 },

  // Category: Escritório (Tab 2: Fotos em Escritório)
  { id: 'ref_esc_1', name: 'Retrato Corporativo em Ambiente Real', category: 'Escritório', url: 'assets/ref_3.png', prompt: 'Corporate professional in office environment.', public: true, order: 10 },
  { id: 'ref_esc_2', name: 'Liderança Feminina no Workspace', category: 'Escritório', url: 'assets/ref_7.png', prompt: 'Female executive in office meeting room.', public: true, order: 11 },
  { id: 'ref_esc_3', name: 'Workspace de Alta Liderança', category: 'Escritório', url: 'assets/ref_8.png', prompt: 'Modern luxury office corporate portrait.', public: true, order: 12 },
  { id: 'ref_esc_4', name: 'Diretora de Marketing em Reunião', category: 'Escritório', url: 'assets/ref_10.png', prompt: 'Creative marketing director office portrait.', public: true, order: 13 },
  { id: 'ref_esc_5', name: 'Advogada Sênior no Escritório', category: 'Escritório', url: 'assets/ref_2.png', prompt: 'Senior female lawyer office portrait.', public: true, order: 14 },
  { id: 'ref_esc_6', name: 'Sócio Fundador em Mesa de Reuniões', category: 'Escritório', url: 'assets/ref_4.png', prompt: 'Managing partner office boardroom portrait.', public: true, order: 15 },
  { id: 'ref_esc_7', name: 'CEO Office Lifestyle', category: 'Escritório', url: 'assets/ref_5.png', prompt: 'CEO office workspace photoshoot.', public: true, order: 16 },
  { id: 'ref_esc_8', name: 'Reunião Executiva e Integração', category: 'Escritório', url: 'assets/ref_7.png', prompt: 'Executive meeting office portrait.', public: true, order: 17 },
  { id: 'ref_esc_9', name: 'Gestão e Liderança de Equipes', category: 'Escritório', url: 'assets/ref_10.png', prompt: 'Leadership style office session.', public: true, order: 18 },
  { id: 'ref_esc_10', name: 'Diretora Regional no Workspace', category: 'Escritório', url: 'assets/portrait_office.png', prompt: 'Regional office director corporate portrait.', public: true, order: 52 },
  { id: 'ref_esc_11', name: 'Consultoria em Sala de Reunião', category: 'Escritório', url: 'assets/ref_5.png', prompt: 'Consultant in corporate boardroom session.', public: true, order: 53 },
  { id: 'ref_esc_12', name: 'Gestão e Estratégia de Negócios', category: 'Escritório', url: 'assets/ref_9.png', prompt: 'Corporate business strategist in workspace.', public: true, order: 54 },
  { id: 'ref_esc_13', name: 'CEO e Liderança em Ambiente Real', category: 'Escritório', url: 'assets/ref_7.png', prompt: 'CEO workspace leadership session.', public: true, order: 55 },
  { id: 'ref_esc_14', name: 'Especialista em Tecnologia no Workspace', category: 'Escritório', url: 'assets/ref_1.png', prompt: 'Tech expert in modern office environment.', public: true, order: 56 },
  { id: 'ref_esc_15', name: 'Time de Inovação em Reunião', category: 'Escritório', url: 'assets/ref_10.png', prompt: 'Corporate innovation squad meeting portrait.', public: true, order: 57 },

  // Category: Marca Pessoal (Tab 3: Marca Pessoal)
  { id: 'ref_mp_1', name: 'Lifestyle de Negócios Editorial', category: 'Marca Pessoal', url: 'assets/ref_5.png', prompt: 'Entrepreneur brand lifestyle session.', public: true, order: 19 },
  { id: 'ref_mp_2', name: 'Palestrante e Autoridade Digital', category: 'Marca Pessoal', url: 'assets/ref_7.png', prompt: 'Keynote speaker personal branding session.', public: true, order: 20 },
  { id: 'ref_mp_3', name: 'Diretora Criativa e Arquitetura', category: 'Marca Pessoal', url: 'assets/ref_8.png', prompt: 'Female architect creative branding portrait.', public: true, order: 21 },
  { id: 'ref_mp_4', name: 'Médica Especialista e Autoridade', category: 'Marca Pessoal', url: 'assets/ref_10.png', prompt: 'Female doctor medical branding headshot.', public: true, order: 22 },
  { id: 'ref_mp_5', name: 'Consultora de Estilo e Imagem', category: 'Marca Pessoal', url: 'assets/ref_4.png', prompt: 'Creative consultant fashion personal brand.', public: true, order: 23 },
  { id: 'ref_mp_6', name: 'Editorial de Moda Corporativa', category: 'Marca Pessoal', url: 'assets/ref_1.png', prompt: 'Corporate fashion and lifestyle session.', public: true, order: 24 },
  { id: 'ref_mp_7', name: 'Autoridade em Consultoria Criativa', category: 'Marca Pessoal', url: 'assets/ref_3.png', prompt: 'Creative consultant portrait.', public: true, order: 25 },
  { id: 'ref_mp_8', name: 'Criadora de Conteúdo e Mentora', category: 'Marca Pessoal', url: 'assets/ref_9.png', prompt: 'Content creator and mentor personal brand.', public: true, order: 26 },
  { id: 'ref_mp_9', name: 'Branding Pessoal de Alta Performance', category: 'Marca Pessoal', url: 'assets/ref_10.png', prompt: 'High performance personal branding.', public: true, order: 27 },
  { id: 'ref_mp_10', name: 'Editorial de Mentoria e Carisma', category: 'Marca Pessoal', url: 'assets/portrait_personal_brand.png', prompt: 'Charismatic mentor branding photoshoot.', public: true, order: 58 },
  { id: 'ref_mp_11', name: 'Escritora e Palestrante Internacional', category: 'Marca Pessoal', url: 'assets/ref_7.png', prompt: 'Keynote speaker personal brand portrait.', public: true, order: 59 },
  { id: 'ref_mp_12', name: 'Consultora de Imagem e Estilo', category: 'Marca Pessoal', url: 'assets/ref_4.png', prompt: 'Style advisor branding portrait.', public: true, order: 60 },
  { id: 'ref_mp_13', name: 'Branding de Alta Performance', category: 'Marca Pessoal', url: 'assets/ref_2.png', prompt: 'Performance coach branding portrait.', public: true, order: 61 },
  { id: 'ref_mp_14', name: 'Fundadora e Palestrante de Tech', category: 'Marca Pessoal', url: 'assets/ref_6.png', prompt: 'Tech founder public speaker branding.', public: true, order: 62 },
  { id: 'ref_mp_15', name: 'Retrato Autoral de Liderança', category: 'Marca Pessoal', url: 'assets/ref_10.png', prompt: 'Female corporate leadership brand portrait.', public: true, order: 63 },

  // Category: Equipes (Tab 4: Fotos de Equipe)
  { id: 'ref_eq_1', name: 'Sintonia Corporativa Executiva', category: 'Equipes', url: 'assets/ref_7.png', prompt: 'Executive board portrait.', public: true, order: 28 },
  { id: 'ref_eq_2', name: 'Time de Liderança e Conselhos', category: 'Equipes', url: 'assets/ref_10.png', prompt: 'Corporate leadership squad group session.', public: true, order: 29 },
  { id: 'ref_eq_3', name: 'Fundadores de Tecnologia B2B', category: 'Equipes', url: 'assets/ref_8.png', prompt: 'Tech startup founders business portrait.', public: true, order: 30 },
  { id: 'ref_eq_4', name: 'Sócios em Ambiente de Negócios', category: 'Equipes', url: 'assets/ref_1.png', prompt: 'Partners business group photo.', public: true, order: 31 },
  { id: 'ref_eq_5', name: 'Conselho de Administração Corporate', category: 'Equipes', url: 'assets/ref_3.png', prompt: 'Corporate advisory board photoshoot.', public: true, order: 32 },
  { id: 'ref_eq_6', name: 'Executivas e Board da Empresa', category: 'Equipes', url: 'assets/ref_2.png', prompt: 'Female executive board group photo.', public: true, order: 33 },
  { id: 'ref_eq_7', name: 'Corporativo Coesivo Multidisciplinar', category: 'Equipes', url: 'assets/ref_4.png', prompt: 'Multidisciplinary corporate team session.', public: true, order: 34 },
  { id: 'ref_eq_8', name: 'Equipe Criativa e Colaboração', category: 'Equipes', url: 'assets/ref_6.png', prompt: 'Creative agency team group photo.', public: true, order: 35 },
  { id: 'ref_eq_9', name: 'Padrão de Diretoria de Tecnologia', category: 'Equipes', url: 'assets/ref_9.png', prompt: 'Tech department group photo style.', public: true, order: 36 },
  { id: 'ref_eq_10', name: 'Diretoria Executiva Integrada', category: 'Equipes', url: 'assets/portrait_team.png', prompt: 'Integrated board of directors corporate photoshoot.', public: true, order: 64 },
  { id: 'ref_eq_11', name: 'Sócios Fundadores de Fintech', category: 'Equipes', url: 'assets/ref_10.png', prompt: 'Co-founders business partner portrait.', public: true, order: 65 },
  { id: 'ref_eq_12', name: 'Conselho Fiscal e Administrativo', category: 'Equipes', url: 'assets/ref_2.png', prompt: 'Board committee corporate team session.', public: true, order: 66 },
  { id: 'ref_eq_13', name: 'Equipe Jurídica Sênior', category: 'Equipes', url: 'assets/ref_4.png', prompt: 'Law firm partners cohesive photoshoot.', public: true, order: 67 },
  { id: 'ref_eq_14', name: 'Time de Operações de Mercado', category: 'Equipes', url: 'assets/ref_1.png', prompt: 'Market operations corporate team session.', public: true, order: 68 },
  { id: 'ref_eq_15', name: 'Grupo de Sócios Corporate', category: 'Equipes', url: 'assets/ref_8.png', prompt: 'Corporate business partners executive photo.', public: true, order: 69 },

  // Category: LinkedIn (Tab 5: LinkedIn & Site)
  { id: 'ref_link_1', name: 'Presença Digital de Impacto', category: 'LinkedIn', url: 'assets/ref_9.png', prompt: 'LinkedIn mockups and online brand presence.', public: true, order: 37 },
  { id: 'ref_link_2', name: 'Perfil Executivo de Destaque', category: 'LinkedIn', url: 'assets/ref_10.png', prompt: 'Premium LinkedIn profile picture.', public: true, order: 38 },
  { id: 'ref_link_3', name: 'Posicionamento C-Level LinkedIn', category: 'LinkedIn', url: 'assets/ref_7.png', prompt: 'C-level executive LinkedIn profile photo.', public: true, order: 39 },
  { id: 'ref_link_4', name: 'Retrato de Autoridade no LinkedIn', category: 'LinkedIn', url: 'assets/ref_2.png', prompt: 'Corporate executive LinkedIn headshot.', public: true, order: 40 },
  { id: 'ref_link_5', name: 'Perfil de Sócia e Fundadora', category: 'LinkedIn', url: 'assets/ref_4.png', prompt: 'Female founder LinkedIn headshot.', public: true, order: 41 },
  { id: 'ref_link_6', name: 'Presença Executiva no LinkedIn', category: 'LinkedIn', url: 'assets/ref_8.png', prompt: 'LinkedIn profile headshot.', public: true, order: 42 },
  { id: 'ref_link_7', name: 'Portfólio Executivo de Carreira', category: 'LinkedIn', url: 'assets/ref_1.png', prompt: 'Executive career portfolio portrait.', public: true, order: 43 },
  { id: 'ref_link_8', name: 'Perfil de CEO e Conselheiro', category: 'LinkedIn', url: 'assets/ref_3.png', prompt: 'CEO LinkedIn style profile photo.', public: true, order: 44 },
  { id: 'ref_link_9', name: 'Destaque de Assessoria de Imprensa', category: 'LinkedIn', url: 'assets/ref_5.png', prompt: 'Press release headshot style.', public: true, order: 45 },
  { id: 'ref_link_10', name: 'Perfil Profissional Head of Growth', category: 'LinkedIn', url: 'assets/portrait_linkedin.png', prompt: 'Professional head of growth LinkedIn profile portrait.', public: true, order: 70 },
  { id: 'ref_link_11', name: 'Apresentação Corporativa B2B', category: 'LinkedIn', url: 'assets/ref_7.png', prompt: 'B2B executive profile presentation photo.', public: true, order: 71 },
  { id: 'ref_link_12', name: 'LinkedIn Executivo Sênior', category: 'LinkedIn', url: 'assets/ref_1.png', prompt: 'Senior corporate manager profile headshot.', public: true, order: 72 },
  { id: 'ref_link_13', name: 'Retrato para Site e Biografia', category: 'LinkedIn', url: 'assets/ref_5.png', prompt: 'Executive website biography headshot.', public: true, order: 73 },
  { id: 'ref_link_14', name: 'Visual Profissional C-Level', category: 'LinkedIn', url: 'assets/ref_3.png', prompt: 'C-level executive profile picture.', public: true, order: 74 },
  { id: 'ref_link_15', name: 'Destaque Executivo de Imprensa', category: 'LinkedIn', url: 'assets/ref_9.png', prompt: 'Corporate PR and media kit executive portrait.', public: true, order: 75 }
];

const ROLES = [
  {
    id: 'executive',
    title: 'Executivos e C-Levels',
    icon: UserCheck,
    description: 'Fotografia com foco em autoridade corporativa, credibilidade e sobriedade, ideal para LinkedIn C-level, canais institucionais e relatórios.',
    image: 'assets/portrait_executive.png',
    vibe: 'LIDERANÇA E POSICIONAMENTO ESTRATÉGICO',
    quote: 'Para quem toma grandes decisões e lidera corporações ou fundos de investimentos.'
  },
  {
    id: 'consultant',
    title: 'Profissionais Liberais',
    icon: Briefcase,
    description: 'Imagens alinhadas ao seu posicionamento de mercado. Fotos que geram conexão imediata com o seu cliente de alto valor.',
    image: 'assets/portrait_personal_brand.png',
    vibe: 'MARCA PESSOAL E AUTORIDADE EM NEGÓCIOS',
    quote: 'Destaque sua reputação técnica e humana nas redes sociais e apresentações comerciais.'
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
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

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
    // Merge fallback references (local) with dbReferences (remote) to avoid empty states or RLS limitations
    const mergedRefs = [...FALLBACK_REFERENCES];
    dbReferences.forEach(dbRef => {
      const idx = mergedRefs.findIndex(r => r.id === dbRef.id);
      if (idx !== -1) {
        mergedRefs[idx] = dbRef;
      } else {
        mergedRefs.push(dbRef);
      }
    });

    return mergedRefs.filter(ref => {
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
        

        {/* 1. Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-24">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-neutral-950 leading-[1.05] font-sans">
              Sua imagem <span className="font-serif italic font-normal text-blue-700">profissional</span> não está à altura do seu <span className="font-serif italic font-normal text-amber-600">trabalho</span>. Nós corrigimos isso.
            </h1>
            
            <p className="text-lg text-neutral-600 leading-relaxed">
              Retratos executivos com direção visual artística e curadoria especializada de imagem. Sem estúdio. Sem deslocamento. Com resultado editorial pronto em até 5 dias úteis.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center pt-2">
              <a 
                className="btn-texture group inline-flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] text-base font-bold font-ffpqr tracking-wider text-white rounded-full py-4 px-8 shadow-xl shadow-neutral-950/10" 
                href={getWaLink("Olá! Gostaria de fazer um diagnóstico da minha imagem profissional com o Studio Retrato.")}
                target="_blank"
                rel="noreferrer"
              >
                <span>Quero um diagnóstico da minha imagem</span>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4 text-white" weight="light" />
                </span>
              </a>
              <button 
                onClick={() => document.getElementById('Transformacoes')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-2 text-sm font-bold text-neutral-700 hover:text-blue-700 transition-colors px-5 py-3 rounded-full border border-neutral-200 hover:border-blue-200 bg-white hover:bg-blue-50/50"
              >
                <Eye className="w-4 h-4" weight="light" />
                <span>Ver resultados reais</span>
              </button>
            </div>
            
            <p className="text-xs text-neutral-500 italic mt-2 flex items-center gap-1.5 justify-center sm:justify-start">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              Você só precisa de 10 selfies simples do celular. Análise prévia gratuita das fotos antes da produção.
            </p>

            {/* Premium Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-neutral-100 text-xs text-neutral-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" weight="light" />
                <span>Direção Visual Artística</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-700" weight="light" />
                <span>Entrega em até 5 dias</span>
              </div>
              <div className="flex items-center gap-2">
                <SealCheck className="w-4 h-4 text-amber-600" weight="light" />
                <span>Garantia de Semelhança</span>
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
                <h4 className="text-lg font-extrabold text-white leading-tight font-sans">Gabriely <span className="font-serif italic font-normal text-blue-200">Miranda</span> Pezzolante</h4>
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

        {/* NEW: Transformações Reais — Social Proof Section */}
        <section id="Transformacoes" className="scroll-mt-6 mb-28">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-700 mb-4">
              <Eye className="w-3.5 h-3.5" weight="light" />
              <span>Resultados Reais & Prova Social</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tighter mb-4 font-sans leading-tight">
              Transformações reais de <span className="font-serif italic font-normal text-blue-700">imagem profissional</span>
            </h2>
            <p className="text-neutral-500 text-base leading-relaxed">
              Compare as fotos originais enviadas pelos nossos clientes com os retratos entregues e veja os feedbacks reais recebidos.
            </p>
          </div>

          {/* Section 1: Antes e Depois (Transformações) */}
          {matchedPairs.length > 0 && (
            <div className="mb-20">
              <h3 className="text-lg font-bold text-neutral-950 mb-8 text-center uppercase tracking-widest font-ffpqr text-xs">
                Comparativo de Posicionamento (Antes & Depois)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
                {matchedPairs.map((pair) => (
                  <div 
                    key={pair.id} 
                    className="bg-white p-5 rounded-[2rem] shadow-xl border border-neutral-200/80 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {/* Before (Original) */}
                      {pair.originalUrl ? (
                        <div className="relative rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 aspect-[3/4] group">
                          <div className="absolute top-2 left-2 z-10 bg-neutral-950/80 backdrop-blur-sm px-2 py-1 rounded-md">
                            <span className="text-[9px] text-amber-300 font-bold uppercase tracking-wider">Antes</span>
                          </div>
                          <img 
                            alt={`Foto original antes do tratamento - ${pair.clientName}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            src={pair.originalUrl}
                          />
                        </div>
                      ) : (
                        <div className="rounded-2xl bg-neutral-100 border border-neutral-200 aspect-[3/4] flex items-center justify-center p-4 text-center">
                          <p className="text-[10px] text-neutral-400 font-mono">Sem foto original enviada</p>
                        </div>
                      )}

                      {/* After (Delivered) */}
                      {pair.resultUrl ? (
                        <div className="relative rounded-2xl overflow-hidden bg-neutral-100 border-2 border-blue-100 aspect-[3/4] group">
                          <div className="absolute top-2 left-2 z-10 bg-blue-700/95 backdrop-blur-sm px-2 py-1 rounded-md">
                            <span className="text-[9px] text-white font-bold uppercase tracking-wider">Depois</span>
                          </div>
                          <img 
                            alt={`Retrato profissional entregue - ${pair.clientName}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            src={pair.resultUrl}
                          />
                        </div>
                      ) : (
                        <div className="rounded-2xl bg-neutral-100 border border-neutral-200 aspect-[3/4] flex items-center justify-center p-4 text-center">
                          <p className="text-[10px] text-neutral-400 font-mono">Processando retrato...</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-sm font-bold text-neutral-900 font-sans">{pair.title}</h4>
                        <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold uppercase">Entregue</span>
                      </div>
                      <p className="text-[11px] text-neutral-500 leading-relaxed">
                        Visual alinhado ao posicionamento estratégico e refinamento de presença digital.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 2: Depoimentos (WhatsApp Screenshots) */}
          {depoimentosList.length > 0 && (
            <div className="mt-16">
              <h3 className="text-lg font-bold text-neutral-950 mb-8 text-center uppercase tracking-widest font-ffpqr text-xs">
                Feedbacks Recebidos no WhatsApp
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4 justify-center items-start">
                {depoimentosList.map((dep, index) => {
                  // Assign floating animations dynamically based on index
                  const floatClasses = ['animate-float-1', 'animate-float-2', 'animate-float-3', 'animate-float-4'];
                  const floatClass = floatClasses[index % floatClasses.length];

                  return (
                    <div 
                      key={dep.name} 
                      className={`bg-white p-4 rounded-3xl shadow-lg border border-neutral-200/80 hover:shadow-2xl hover:scale-[1.03] transition-all duration-500 cursor-pointer ${floatClass}`}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                          Feedback Verificado
                        </span>
                        <span className="text-xs text-neutral-400 font-mono font-medium">WhatsApp</span>
                      </div>
                      
                      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-50 mb-3 border border-neutral-100">
                        <img 
                          alt={`Depoimento do cliente ${dep.displayName} no WhatsApp`}
                          className="w-full h-full object-cover object-bottom"
                          src={dep.url}
                        />
                      </div>
                      
                      <div className="text-center pt-1">
                        <p className="text-xs font-bold text-neutral-800">Depoimento de {dep.displayName}</p>
                        <p className="text-[10px] text-neutral-400 mt-0.5 leading-snug">Mensagem real enviada por cliente satisfeito</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-14 text-center">
            <a 
              className="btn-texture group inline-flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] text-sm font-bold font-ffpqr tracking-wider text-white rounded-full py-3.5 px-7 shadow-lg"
              href={getWaLink("Olá! Vi os resultados reais e depoimentos no site e gostaria de fazer meu posicionamento de imagem profissional.")}
              target="_blank"
              rel="noreferrer"
            >
              <span>Quero elevar minha imagem profissional</span>
              <ArrowRight className="w-4 h-4 text-white" weight="light" />
            </a>
          </div>
        </section>

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
                  className="btn-texture inline-flex items-center gap-2 text-sm font-bold text-white px-5 py-3 rounded-xl transition shadow-sm w-full justify-center sm:w-auto"
                  href={getWaLink(`Olá! Me interessei pela direção visual "${currentPremiumRef.title}" e gostaria de entender mais.`)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>Solicitar este estilo de ensaio</span>
                  <ArrowRight className="w-4 h-4 text-white" weight="light" />
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
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-medium text-neutral-800">
                <Briefcase className="w-3.5 h-3.5" weight="light" />
                <span>O conceito do estúdio</span>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-extrabold text-neutral-950 tracking-tighter font-sans leading-tight">
                Direção <span className="font-serif italic font-normal text-blue-700">artística</span> aliada ao refinamento <span className="font-serif italic font-normal text-amber-600">digital premium</span>.
              </h2>

              <p className="text-neutral-600 text-lg leading-relaxed">
                O Studio Retrato cria ensaios de alto nível a partir de direção visual estratégica. Unimos curadoria humana a processos avançados de imagem para transformar selfies simples em retratos sofisticados, naturais e autênticos para uso comercial.
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

        {/* NEW: Fidelidade Facial — Objection Handling */}
        <section id="Fidelidade" className="mb-28">
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-50/80 via-white to-amber-50/30 border border-blue-100/80 rounded-[3rem] p-8 sm:p-12">
            <div className="absolute left-0 bottom-0 h-72 w-72 bg-blue-500/5 rounded-full blur-3xl"></div>
            <div className="absolute right-0 top-0 h-48 w-48 bg-amber-500/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-700 mb-4">
                  <Heartbeat className="w-3.5 h-3.5" weight="light" />
                  <span>Fidelidade Facial</span>
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tighter mb-4 font-sans leading-tight">
                  Sua imagem. Sua <span className="font-serif italic font-normal text-blue-700">identidade</span>. Sem <span className="font-serif italic font-normal text-amber-600">distorções</span>.
                </h2>
                <p className="text-neutral-500 text-base leading-relaxed">
                  A principal preocupação de quem procura retratos com IA: "vai parecer comigo?". Respondemos com ciência, curadoria e garantia.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/90 backdrop-blur-sm border border-blue-100/60 rounded-2xl p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
                    <Eye className="w-5 h-5" weight="light" />
                  </div>
                  <h4 className="text-base font-bold text-neutral-900">Fidelidade facial absoluta</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    Nossa tecnologia preserva textura da pele, formato do rosto, cabelos, olhos e todas as características naturais que fazem de você, você.
                  </p>
                </div>

                <div className="bg-white/90 backdrop-blur-sm border border-blue-100/60 rounded-2xl p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-10 w-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                    <UserCheck className="w-5 h-5" weight="light" />
                  </div>
                  <h4 className="text-base font-bold text-neutral-900">Curadoria humana obrigatória</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    Cada retrato passa por revisão minuciosa da nossa diretora de arte antes de ser entregue. Nenhuma imagem é enviada sem validação manual.
                  </p>
                </div>

                <div className="bg-white/90 backdrop-blur-sm border border-blue-100/60 rounded-2xl p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                    <HandHeart className="w-5 h-5" weight="light" />
                  </div>
                  <h4 className="text-base font-bold text-neutral-900">Reprocessamento gratuito</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    Se o resultado não corresponder à sua identidade real, reprocessamos sem nenhum custo adicional até que você se reconheça na imagem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NEW: Garantia de Semelhança — Trust Section */}
        <section id="Garantia" className="mb-28">
          <div className="relative overflow-hidden bg-neutral-900 text-white rounded-[3rem] p-8 sm:p-12">
            <div className="absolute inset-0 bg-grid-white/[0.02] -z-0"></div>
            <div className="absolute right-0 top-0 h-64 w-64 bg-blue-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8 space-y-5">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-300">
                  <SealCheck className="w-3.5 h-3.5" weight="light" />
                  <span>Garantia Studio Retrato</span>
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter leading-tight font-sans">
                  Garantia de <span className="font-serif italic font-normal text-blue-300">semelhança</span> e <span className="font-serif italic font-normal text-amber-200">naturalidade</span>
                </h2>
                <p className="text-neutral-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                  Se o resultado não corresponder à sua identidade visual real, reprocessamos sem custo. Não queremos apenas entregar fotos — queremos elevar a percepção do seu valor profissional.
                </p>
                <div className="flex flex-wrap gap-6 pt-4 border-t border-white/10 text-xs text-neutral-400">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" weight="light" />
                    <span>Reprocessamento ilimitado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" weight="light" />
                    <span>Curadoria humana garantida</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" weight="light" />
                    <span>Sem risco para você</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-center">
                <div className="h-40 w-40 rounded-full bg-gradient-to-br from-emerald-500/20 via-blue-500/10 to-amber-500/10 border border-white/10 flex items-center justify-center shadow-2xl">
                  <SealCheck className="w-20 h-20 text-emerald-400/80" weight="light" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Como funciona */}
        <section id="ComoFunciona" className="mb-28">
          <div className="w-full bg-white border border-neutral-200/80 rounded-[2.5rem] p-4 sm:p-6 md:p-8 shadow-sm overflow-hidden">
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-neutral-200 scrollbar-track-transparent">
              <div className="min-w-[800px] lg:min-w-0">
                <img 
                  alt="Como funciona o seu ensaio editorial: 01 Escolha o Objetivo, 02 Envie Fotos Simples, 03 Orientação de Estilo, 04 Criação com IA, 05 Entrega Premium"
                  className="w-full h-auto object-contain rounded-2xl"
                  src="assets/walkthrough_steps.png" 
                />
              </div>
            </div>
            {/* Mobile swipe helper indicator */}
            <div className="flex lg:hidden items-center justify-center gap-2 mt-4 text-xs font-semibold text-neutral-400 font-mono">
              <span>Arraste para o lado para ver o processo</span>
              <span className="animate-bounce-horizontal">→</span>
            </div>
          </div>
        </section>

        {/* SEO Section: Tabela Comparativa (Estúdio vs. Studio Retrato) */}
        <section id="Comparativo" className="scroll-mt-6 mb-28">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-700 mb-4">
              <Award className="w-3.5 h-3.5" weight="light" />
              <span>Comparativo Inteligente</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tighter mb-4 font-sans leading-tight">
              Estúdio tradicional ou <span className="font-serif italic font-normal text-blue-700">Studio Retrato</span>?
            </h2>
            <p className="text-neutral-500 text-base leading-relaxed">
              Compare a experiência clássica com a nossa solução consultiva online e entenda por que milhares de líderes estão mudando a forma de produzir sua imagem corporativa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
            {/* Estúdio Tradicional */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-[2rem] p-8 space-y-6 flex flex-col justify-between opacity-80">
              <div className="space-y-6">
                <div className="flex justify-between items-start border-b border-neutral-200 pb-4">
                  <div>
                    <h4 className="text-lg font-bold text-neutral-800">Ensaio Fotográfico Tradicional</h4>
                    <p className="text-xs text-neutral-400 mt-1">O método analógico de agendamento</p>
                  </div>
                  <span className="text-sm font-semibold text-neutral-500 bg-neutral-200 px-3 py-1 rounded-full">Alto Custo</span>
                </div>

                <ul className="space-y-4 text-sm text-neutral-600">
                  <li className="flex gap-3 items-start">
                    <WarningCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" weight="light" />
                    <span><strong>Custo Elevado</strong>: Pacotes corporativos premium custam entre R$ 1.200 e R$ 3.000 por poucas fotos.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <WarningCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" weight="light" />
                    <span><strong>Perda de Tempo</strong>: Exige deslocamento, maquiagem no local e cerca de 2 a 4 horas de agenda livre.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <WarningCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" weight="light" />
                    <span><strong>Tensão nas Poses</strong>: A maioria das pessoas sente vergonha ou desconforto diante de lentes e holofotes reais.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <WarningCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" weight="light" />
                    <span><strong>Entrega Demorada</strong>: Prazo médio de 10 a 20 dias para tratamento e seleção das imagens finais.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Studio Retrato IA */}
            <div className="bg-blue-50/30 border-2 border-blue-600 rounded-[2rem] p-8 space-y-6 flex flex-col justify-between shadow-lg relative">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-md">
                Recomendado
              </div>
              <div className="space-y-6">
                <div className="flex justify-between items-start border-b border-blue-100 pb-4">
                  <div>
                    <h4 className="text-lg font-bold text-neutral-900">Studio Retrato Editorial</h4>
                    <p className="text-xs text-blue-600 mt-1">Sua imagem profissional sob curadoria estratégica</p>
                  </div>
                  <span className="text-sm font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">Eficiência</span>
                </div>

                <ul className="space-y-4 text-sm text-neutral-800">
                  <li className="flex gap-3 items-start">
                    <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" weight="bold" />
                    <span><strong>Fração do Preço</strong>: Acesso a retratos com qualidade de revista por menos da metade do preço convencional.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" weight="bold" />
                    <span><strong>100% Online</strong>: Sem necessidade de viagens, aluguel de roupas ou interrupção do seu expediente.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" weight="bold" />
                    <span><strong>Fotos Naturais</strong>: Direção de arte e curadoria humana validam a iluminação para garantir zero aspecto artificial.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" weight="bold" />
                    <span><strong>Entrega Expressa</strong>: Suas fotos prontas e tratadas em até 3 a 5 dias úteis, direto no seu WhatsApp e e-mail.</span>
                  </li>
                </ul>
              </div>
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
                  <p className="text-[11px] text-neutral-500 font-medium leading-tight">Equivale a apenas R$ 49,70 por retrato pronto</p>
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
                  className="btn-texture block text-center text-sm font-bold font-ffpqr tracking-wider text-white px-6 py-3.5 rounded-xl shadow-sm transition"
                  href={getWaLink("Olá! Tenho interesse no pacote Individual Profissional (R$ 497). Gostaria de fazer um diagnóstico gratuito.")}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>Solicitar diagnóstico gratuito</span>
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
                  <p className="text-[11px] text-blue-700 font-bold leading-tight">Equivale a apenas R$ 39,88 por retrato (economia de 20% por foto!)</p>
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
                  className="btn-texture block text-center text-sm font-bold font-ffpqr tracking-wider text-white px-6 py-4 rounded-xl shadow-md transition"
                  href={getWaLink("Olá! Tenho interesse no pacote Autoridade Premium (R$ 997). Gostaria de falar com um consultor de imagem.")}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>Falar com consultor de imagem</span>
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
                  className="btn-texture block text-center text-sm font-bold font-ffpqr tracking-wider text-white px-6 py-3.5 rounded-xl shadow-sm transition"
                  href={getWaLink("Olá! Preciso de um orçamento personalizado de retratos profissionais para minha Equipe/Empresa.")}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>Solicitar orçamento para equipes</span>
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

        {/* SEO Section: Filosofia e Autoridade (E-E-A-T) */}
        <section id="QuemSomos" className="scroll-mt-6 mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-neutral-900 text-white rounded-[3rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute right-0 bottom-0 h-96 w-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-blue-300">
                <Users className="w-3.5 h-3.5" weight="light" />
                <span>Filosofia Editorial & Curadoria</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tighter leading-tight font-sans">
                Nossa missão é alinhar sua <span className="font-serif italic font-normal text-blue-300">imagem digital</span> com seu <span className="font-serif italic font-normal text-amber-200">sucesso real</span>.
              </h2>
              <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
                Por trás de cada retrato produzido pelo Studio Retrato existe uma equipe especializada em marketing pessoal, direção de estilo e fotografia editorial. Não geramos apenas fotos automáticas: nós fazemos curadoria de posicionamento.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 text-xs font-mono text-neutral-400 uppercase tracking-widest border-t border-white/10">
                <div className="space-y-1">
                  <span className="text-white block font-bold text-sm normal-case font-sans">Curadoria Humanizada</span>
                  <span>Cada pixel passa por revisão e tratamento para manter sua identidade intacta.</span>
                </div>
                <div className="space-y-1">
                  <span className="text-white block font-bold text-sm normal-case font-sans">Autoridade Imediata</span>
                  <span>Direção de arte focada em gerar credibilidade profissional e credibilidade comercial.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[280px] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-white/10 p-2 bg-white/5 backdrop-blur-md">
                <img
                  alt="Gabriely Miranda Pezzolante - Diretora Visual"
                  className="w-full h-full object-cover rounded-2xl"
                  src="assets/gaby_avatar_zoomed_out.png"
                />
                <div className="absolute bottom-6 left-6 right-6 z-20 font-geist text-white">
                  <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest">FUNDADORA &amp; DIRETORA DE ARTE</p>
                  <h4 className="text-lg font-extrabold leading-tight font-sans">Gabriely Miranda</h4>
                  <p className="text-xs text-neutral-300 mt-0.5">Especialista em posicionamento de marcas corporativas</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Section: Perguntas Frequentes (FAQ) */}
        <section id="FAQ" className="scroll-mt-6 mb-28 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-xs font-medium text-amber-700 mb-4">
              <ChatBubble className="w-3.5 h-3.5" weight="light" />
              <span>Perguntas Frequentes</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tighter mb-4 font-sans leading-tight">
              Esclareça suas <span className="font-serif italic font-normal text-blue-700">dúvidas sobre o ensaio</span>
            </h2>
            <p className="text-neutral-500 text-base leading-relaxed">
              Tudo o que você precisa saber sobre o processo consultivo online de retratos executivos corporativos.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Preciso ir a um estúdio fotográfico presencial?",
                a: "Não. O Studio Retrato foi desenhado especificamente para profissionais liberais, empresários e diretores ocupados. Todo o processo de curadoria visual e envio de imagens é feito de forma 100% online através do WhatsApp ou do nosso formulário web, sem que você precise parar o seu dia de trabalho."
              },
              {
                q: "Minhas fotos vão parecer artificiais ou 'robóticas'?",
                a: "De forma alguma. Ao contrário de aplicativos automáticos ou filtros comuns, nós não geramos imagens artificiais do zero. O Studio Retrato é um processo guiado por designers e diretores de arte. Cada retrato passa por curadoria humana para ajustar iluminação, texturas reais de pele, cabelos e simetria, preservando sua real fisionomia."
              },
              {
                q: "Qual tipo de foto eu preciso enviar para o Studio Retrato?",
                a: "Você só precisa tirar e enviar de 10 a 15 fotos simples do seu rosto direto do seu celular (selfies). Recomendamos fotos com expressões naturais, iluminação neutra (próximo de uma janela, por exemplo) e sem maquiagem extremamente carregada ou filtros do Instagram, para obtermos a melhor fidelidade do seu rosto."
              },
              {
                q: "Qual é o prazo de entrega dos retratos prontos?",
                a: "O prazo padrão de curadoria e entrega final é de 3 a 5 dias úteis. Isso garante que cada um dos seus retratos profissionais passe por nossa mesa de retoque digital e controle de qualidade por nossa diretora de arte antes de enviarmos para o seu e-mail e WhatsApp."
              },
              {
                q: "O que acontece se eu não gostar do resultado final?",
                a: "Nós oferecemos garantia de semelhança e satisfação. Se algum dos seus retratos não atingir a fidelidade e naturalidade esperadas, ou se você sentir que a imagem não se assemelha à sua real identidade, nossa equipe realiza novos reprocessamentos e retoques manuais sem nenhum custo adicional."
              },
              {
                q: "É possível escolher roupas e cenários específicos?",
                a: "Sim! Na fase de curadoria visual, você pode solicitar cenários específicos (escritório executivo, estúdio clássico, ambiente externo, café premium, entre outros) e indicar preferências de vestuário. Nosso time de direção de arte adapta a composição final para refletir exatamente o posicionamento desejado."
              },
              {
                q: "Vocês atendem empresas com mais de 50 colaboradores?",
                a: "Absolutamente. Temos experiência com padronização visual corporativa para equipes de qualquer tamanho. Oferecemos condições especiais para projetos acima de 50 retratos, com direção de arte unificada, garantindo consistência de marca para LinkedIn, site e materiais institucionais."
              },
              {
                q: "Como funciona o processo de diagnóstico de imagem?",
                a: "O diagnóstico é uma conversa consultiva gratuita, feita pelo WhatsApp ou videochamada, onde analisamos sua imagem profissional atual (LinkedIn, site, redes), entendemos seus objetivos e recomendamos o pacote e estilo visual mais adequados ao seu posicionamento de mercado. Sem compromisso."
              }
            ].map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:border-neutral-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  >
                    <span className="font-bold text-neutral-900 text-base pr-4">{item.q}</span>
                    <span className={`h-6 w-6 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-blue-50 text-blue-600' : 'text-neutral-500'}`}>
                      <Plus className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-45' : ''}`} />
                    </span>
                  </button>
                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-64 border-t border-neutral-100' : 'max-h-0'
                    }`}
                  >
                    <p className="p-6 text-sm text-neutral-600 leading-relaxed bg-neutral-50/50">
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
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
              Agende sua consultoria de imagem gratuita e descubra como criar retratos que comunicam o seu verdadeiro valor profissional.
            </p>
            
            <div className="pt-4">
              <a 
                className="btn-texture group inline-flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] text-base font-bold font-ffpqr tracking-wider text-white rounded-full py-4 px-8 shadow-xl"
                href={getWaLink("Olá! Gostaria de agendar minha consultoria de imagem profissional com o Studio Retrato.")}
                target="_blank"
                rel="noreferrer"
              >
                <span>Agendar minha consultoria de imagem</span>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4 text-white" weight="light" />
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
                <img 
                  src="/logo.jpg" 
                  className="h-10 w-10 object-cover object-top rounded-full border border-neutral-100 shadow-sm" 
                  alt="Studio Retrato Logo" 
                  style={{ mixBlendMode: 'multiply' }}
                />
                <span className="font-bold text-neutral-900">Studio Retrato</span>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed max-w-sm">
                Direção visual e refinamento de imagem profissional de alta fidelidade. O ensaio executivo definitivo para o seu posicionamento de mercado.
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
                  <li><a className="hover:text-blue-600 transition" href="#Comparativo">Comparativo</a></li>
                  <li><a className="hover:text-blue-600 transition" href="#Precos">Pacotes Premium</a></li>
                  <li><a className="hover:text-blue-600 transition" href="#FAQ">Dúvidas Frequentes</a></li>
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
