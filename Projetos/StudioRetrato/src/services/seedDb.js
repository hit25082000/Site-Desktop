import { supabase } from './supabaseClient';

const defaultCategories = [
  { id: 'cat_executivo', name: 'Executivo' },
  { id: 'cat_escritorio', name: 'Escritório' },
  { id: 'cat_marca_pessoal', name: 'Marca Pessoal' },
  { id: 'cat_equipes', name: 'Equipes' },
  { id: 'cat_linkedin_site', name: 'LinkedIn' },
  { id: 'cat_landpage', name: 'Landpage' }
];

const defaultReferences = [
  // Category: Landpage assets
  { 
    id: 'ref_exec_1', 
    name: 'Retrato Executivo Editorial Premium', 
    category: 'Landpage', 
    url: 'assets/ref_1.png', 
    prompt: 'Premium corporate executive headshot with classic studio lighting.', 
    public: true, 
    order: 1 
  },
  { 
    id: 'ref_exec_2', 
    name: 'Liderança Corporativa Clássica', 
    category: 'Landpage', 
    url: 'assets/ref_2.png', 
    prompt: 'Classic executive leadership portrait.', 
    public: true, 
    order: 2 
  },
  { 
    id: 'ref_exec_3', 
    name: 'Retrato de Conselho Editorial', 
    category: 'Landpage', 
    url: 'assets/ref_3.png', 
    prompt: 'Editorial board executive portrait.', 
    public: true, 
    order: 3 
  },
  { 
    id: 'ref_exec_4', 
    name: 'Especialista Corporate Vogue', 
    category: 'Landpage', 
    url: 'assets/ref_5.png', 
    prompt: 'Sophisticated executive brand photoshoot.', 
    public: true, 
    order: 4 
  },
  { 
    id: 'ref_exec_5', 
    name: 'Posicionamento C-Level', 
    category: 'Landpage', 
    url: 'assets/ref_9.png', 
    prompt: 'Corporate C-level executive portrait.', 
    public: true, 
    order: 5 
  },
  { 
    id: 'ref_exec_6', 
    name: 'Perfil Comercial Presidencial', 
    category: 'Landpage', 
    url: 'assets/ref_10.png', 
    prompt: 'Presidential corporate portrait.', 
    public: true, 
    order: 6 
  },
  { 
    id: 'ref_exec_7', 
    name: 'Retrato Executivo Moderno', 
    category: 'Landpage', 
    url: 'assets/ref_4.png', 
    prompt: 'Modern corporate executive portrait.', 
    public: true, 
    order: 7 
  },
  { 
    id: 'ref_exec_8', 
    name: 'Diretor de Tecnologia e Inovação', 
    category: 'Landpage', 
    url: 'assets/ref_6.png', 
    prompt: 'Tech director executive portrait.', 
    public: true, 
    order: 8 
  },
  { 
    id: 'ref_exec_9', 
    name: 'Head de Operações Corporativas', 
    category: 'Landpage', 
    url: 'assets/ref_8.png', 
    prompt: 'Head of operations executive portrait.', 
    public: true, 
    order: 9 
  },
  { 
    id: 'ref_exec_10', 
    name: 'Sócia-Diretora em Estúdio Editorial', 
    category: 'Landpage', 
    url: 'assets/portrait_executive.png', 
    prompt: 'Editorial boardroom female executive headshot.', 
    public: true, 
    order: 46 
  },
  { 
    id: 'ref_exec_11', 
    name: 'Conselheiro de Administração B2B', 
    category: 'Landpage', 
    url: 'assets/ref_7.png', 
    prompt: 'B2B board advisor corporate portrait.', 
    public: true, 
    order: 47 
  },
  { 
    id: 'ref_exec_12', 
    name: 'VP de Finanças Corporativas', 
    category: 'Landpage', 
    url: 'assets/ref_3.png', 
    prompt: 'Corporate VP finance professional portrait.', 
    public: true, 
    order: 48 
  },
  { 
    id: 'ref_exec_13', 
    name: 'Diretora Executiva de Operações', 
    category: 'Landpage', 
    url: 'assets/ref_1.png', 
    prompt: 'COO female corporate portrait.', 
    public: true, 
    order: 49 
  },
  { 
    id: 'ref_exec_14', 
    name: 'Sócio Fundador Private Equity', 
    category: 'Landpage', 
    url: 'assets/ref_5.png', 
    prompt: 'Private equity managing partner executive portrait.', 
    public: true, 
    order: 50 
  },
  { 
    id: 'ref_exec_15', 
    name: 'Executivo C-Level Sênior', 
    category: 'Landpage', 
    url: 'assets/ref_9.png', 
    prompt: 'Senior enterprise executive corporate headshot.', 
    public: true, 
    order: 51 
  },

  // Category: Escritório (Tab 2: Fotos em Escritório)
  { 
    id: 'ref_esc_1', 
    name: 'Retrato Corporativo em Ambiente Real', 
    category: 'Escritório', 
    url: 'assets/ref_3.png', 
    prompt: 'Corporate professional in office environment.', 
    public: true, 
    order: 10 
  },
  { 
    id: 'ref_esc_2', 
    name: 'Dinamismo no Escritório Moderno', 
    category: 'Escritório', 
    url: 'assets/ref_4.png', 
    prompt: 'Modern workplace corporate session.', 
    public: true, 
    order: 11 
  },
  { 
    id: 'ref_esc_3', 
    name: 'Foco e Tomada de Decisão', 
    category: 'Escritório', 
    url: 'assets/ref_1.png', 
    prompt: 'Executive in boardroom.', 
    public: true, 
    order: 12 
  },
  { 
    id: 'ref_esc_4', 
    name: 'Luz Natural e Presença Corporativa', 
    category: 'Escritório', 
    url: 'assets/ref_6.png', 
    prompt: 'Office dynamic photoshoot.', 
    public: true, 
    order: 13 
  },
  { 
    id: 'ref_esc_5', 
    name: 'Comunicação Executiva Contemporânea', 
    category: 'Escritório', 
    url: 'assets/ref_8.png', 
    prompt: 'Modern office team lead.', 
    public: true, 
    order: 14 
  },
  { 
    id: 'ref_esc_6', 
    name: 'Consultor Sênior em Ação', 
    category: 'Escritório', 
    url: 'assets/ref_2.png', 
    prompt: 'Senior consultant in professional office setting.', 
    public: true, 
    order: 15 
  },
  { 
    id: 'ref_esc_7', 
    name: 'CEO Office Lifestyle', 
    category: 'Escritório', 
    url: 'assets/ref_5.png', 
    prompt: 'CEO office workspace photoshoot.', 
    public: true, 
    order: 16 
  },
  { 
    id: 'ref_esc_8', 
    name: 'Reunião Executiva e Integração', 
    category: 'Escritório', 
    url: 'assets/ref_7.png', 
    prompt: 'Executive meeting office portrait.', 
    public: true, 
    order: 17 
  },
  { 
    id: 'ref_esc_9', 
    name: 'Gestão e Liderança de Equipes', 
    category: 'Escritório', 
    url: 'assets/ref_10.png', 
    prompt: 'Leadership style office session.', 
    public: true, 
    order: 18 
  },
  { 
    id: 'ref_esc_10', 
    name: 'Diretora Regional no Workspace', 
    category: 'Escritório', 
    url: 'assets/portrait_office.png', 
    prompt: 'Regional office director corporate portrait.', 
    public: true, 
    order: 52 
  },
  { 
    id: 'ref_esc_11', 
    name: 'Consultoria em Sala de Reunião', 
    category: 'Escritório', 
    url: 'assets/ref_5.png', 
    prompt: 'Consultant in corporate boardroom session.', 
    public: true, 
    order: 53 
  },
  { 
    id: 'ref_esc_12', 
    name: 'Gestão e Estratégia de Negócios', 
    category: 'Escritório', 
    url: 'assets/ref_9.png', 
    prompt: 'Corporate business strategist in workspace.', 
    public: true, 
    order: 54 
  },
  { 
    id: 'ref_esc_13', 
    name: 'CEO e Liderança em Ambiente Real', 
    category: 'Escritório', 
    url: 'assets/ref_7.png', 
    prompt: 'CEO workspace leadership session.', 
    public: true, 
    order: 55 
  },
  { 
    id: 'ref_esc_14', 
    name: 'Especialista em Tecnologia no Workspace', 
    category: 'Escritório', 
    url: 'assets/ref_1.png', 
    prompt: 'Tech expert in modern office environment.', 
    public: true, 
    order: 56 
  },
  { 
    id: 'ref_esc_15', 
    name: 'Time de Inovação em Reunião', 
    category: 'Escritório', 
    url: 'assets/ref_10.png', 
    prompt: 'Corporate innovation squad meeting portrait.', 
    public: true, 
    order: 57 
  },

  // Category: Marca Pessoal (Tab 3: Marca Pessoal)
  { 
    id: 'ref_mp_1', 
    name: 'Lifestyle de Negócios Editorial', 
    category: 'Marca Pessoal', 
    url: 'assets/ref_5.png', 
    prompt: 'Entrepreneur brand lifestyle session.', 
    public: true, 
    order: 19 
  },
  { 
    id: 'ref_mp_2', 
    name: 'Posicionamento e Conexão Digital', 
    category: 'Marca Pessoal', 
    url: 'assets/ref_6.png', 
    prompt: 'Casual business brand session.', 
    public: true, 
    order: 20 
  },
  { 
    id: 'ref_mp_3', 
    name: 'Carisma e Autoridade Palestrante', 
    category: 'Marca Pessoal', 
    url: 'assets/ref_2.png', 
    prompt: 'Speaker personal brand photoshoot.', 
    public: true, 
    order: 21 
  },
  { 
    id: 'ref_mp_4', 
    name: 'Acessibilidade Executiva Premium', 
    category: 'Marca Pessoal', 
    url: 'assets/ref_4.png', 
    prompt: 'Premium casual brand portrait.', 
    public: true, 
    order: 22 
  },
  { 
    id: 'ref_mp_5', 
    name: 'Estratégia e Posicionamento Digital', 
    category: 'Marca Pessoal', 
    url: 'assets/ref_8.png', 
    prompt: 'Digital marketing branding session.', 
    public: true, 
    order: 23 
  },
  { 
    id: 'ref_mp_6', 
    name: 'Editorial de Moda Corporativa', 
    category: 'Marca Pessoal', 
    url: 'assets/ref_1.png', 
    prompt: 'Corporate fashion and lifestyle session.', 
    public: true, 
    order: 24 
  },
  { 
    id: 'ref_mp_7', 
    name: 'Autoridade em Consultoria Criativa', 
    category: 'Marca Pessoal', 
    url: 'assets/ref_3.png', 
    prompt: 'Creative consultant portrait.', 
    public: true, 
    order: 25 
  },
  { 
    id: 'ref_mp_8', 
    name: 'Criadora de Conteúdo e Mentora', 
    category: 'Marca Pessoal', 
    url: 'assets/ref_9.png', 
    prompt: 'Content creator and mentor personal brand.', 
    public: true, 
    order: 26 
  },
  { 
    id: 'ref_mp_9', 
    name: 'Branding Pessoal de Alta Performance', 
    category: 'Marca Pessoal', 
    url: 'assets/ref_10.png', 
    prompt: 'High performance personal branding.', 
    public: true, 
    order: 27 
  },
  { 
    id: 'ref_mp_10', 
    name: 'Editorial de Mentoria e Carisma', 
    category: 'Marca Pessoal', 
    url: 'assets/portrait_personal_brand.png', 
    prompt: 'Charismatic mentor branding photoshoot.', 
    public: true, 
    order: 58 
  },
  { 
    id: 'ref_mp_11', 
    name: 'Escritora e Palestrante Internacional', 
    category: 'Marca Pessoal', 
    url: 'assets/ref_7.png', 
    prompt: 'Keynote speaker personal brand portrait.', 
    public: true, 
    order: 59 
  },
  { 
    id: 'ref_mp_12', 
    name: 'Consultora de Imagem e Estilo', 
    category: 'Marca Pessoal', 
    url: 'assets/ref_4.png', 
    prompt: 'Style advisor branding portrait.', 
    public: true, 
    order: 60 
  },
  { 
    id: 'ref_mp_13', 
    name: 'Branding de Alta Performance', 
    category: 'Marca Pessoal', 
    url: 'assets/ref_2.png', 
    prompt: 'Performance coach branding portrait.', 
    public: true, 
    order: 61 
  },
  { 
    id: 'ref_mp_14', 
    name: 'Fundadora e Palestrante de Tech', 
    category: 'Marca Pessoal', 
    url: 'assets/ref_6.png', 
    prompt: 'Tech founder public speaker branding.', 
    public: true, 
    order: 62 
  },
  { 
    id: 'ref_mp_15', 
    name: 'Retrato Autoral de Liderança', 
    category: 'Marca Pessoal', 
    url: 'assets/ref_10.png', 
    prompt: 'Female corporate leadership brand portrait.', 
    public: true, 
    order: 63 
  },

  // Category: Equipes (Tab 4: Fotos de Equipe)
  { 
    id: 'ref_eq_1', 
    name: 'Sintonia Corporativa Executiva', 
    category: 'Equipes', 
    url: 'assets/ref_7.png', 
    prompt: 'Executive board portrait.', 
    public: true, 
    order: 28 
  },
  { 
    id: 'ref_eq_2', 
    name: 'Time de Alta Performance', 
    category: 'Equipes', 
    url: 'assets/ref_8.png', 
    prompt: 'Cohesive corporate team portrait.', 
    public: true, 
    order: 29 
  },
  { 
    id: 'ref_eq_3', 
    name: 'Conselho Executivo Integrado', 
    category: 'Equipes', 
    url: 'assets/ref_1.png', 
    prompt: 'Board of directors group session.', 
    public: true, 
    order: 30 
  },
  { 
    id: 'ref_eq_4', 
    name: 'Alinhamento Estratégico de Sócios', 
    category: 'Equipes', 
    url: 'assets/ref_3.png', 
    prompt: 'Business partners photoshoot.', 
    public: true, 
    order: 31 
  },
  { 
    id: 'ref_eq_5', 
    name: 'Cultura e Integração Corporativa', 
    category: 'Equipes', 
    url: 'assets/ref_5.png', 
    prompt: 'Team leadership group photo.', 
    public: true, 
    order: 32 
  },
  { 
    id: 'ref_eq_6', 
    name: 'Retratos Integrados de Sócios', 
    category: 'Equipes', 
    url: 'assets/ref_2.png', 
    prompt: 'Cohesive partner headshots.', 
    public: true, 
    order: 33 
  },
  { 
    id: 'ref_eq_7', 
    name: 'Corporativo Coesivo Multidisciplinar', 
    category: 'Equipes', 
    url: 'assets/ref_4.png', 
    prompt: 'Multidisciplinary corporate team session.', 
    public: true, 
    order: 34 
  },
  { 
    id: 'ref_eq_8', 
    name: 'Equipe Criativa e Colaboração', 
    category: 'Equipes', 
    url: 'assets/ref_6.png', 
    prompt: 'Creative agency team group photo.', 
    public: true, 
    order: 35 
  },
  { 
    id: 'ref_eq_9', 
    name: 'Padrão de Diretoria de Tecnologia', 
    category: 'Equipes', 
    url: 'assets/ref_9.png', 
    prompt: 'Tech department group photo style.', 
    public: true, 
    order: 36 
  },
  { 
    id: 'ref_eq_10', 
    name: 'Diretoria Executiva Integrada', 
    category: 'Equipes', 
    url: 'assets/portrait_team.png', 
    prompt: 'Integrated board of directors corporate photoshoot.', 
    public: true, 
    order: 64 
  },
  { 
    id: 'ref_eq_11', 
    name: 'Sócios Fundadores de Fintech', 
    category: 'Equipes', 
    url: 'assets/ref_10.png', 
    prompt: 'Co-founders business partner portrait.', 
    public: true, 
    order: 65 
  },
  { 
    id: 'ref_eq_12', 
    name: 'Conselho Fiscal e Administrativo', 
    category: 'Equipes', 
    url: 'assets/ref_2.png', 
    prompt: 'Board committee corporate team session.', 
    public: true, 
    order: 66 
  },
  { 
    id: 'ref_eq_13', 
    name: 'Equipe Jurídica Sênior', 
    category: 'Equipes', 
    url: 'assets/ref_4.png', 
    prompt: 'Law firm partners cohesive photoshoot.', 
    public: true, 
    order: 67 
  },
  { 
    id: 'ref_eq_14', 
    name: 'Time de Operações de Mercado', 
    category: 'Equipes', 
    url: 'assets/ref_1.png', 
    prompt: 'Market operations corporate team session.', 
    public: true, 
    order: 68 
  },
  { 
    id: 'ref_eq_15', 
    name: 'Grupo de Sócios Corporate', 
    category: 'Equipes', 
    url: 'assets/ref_8.png', 
    prompt: 'Corporate business partners executive photo.', 
    public: true, 
    order: 69 
  },

  // Category: LinkedIn (Tab 5: LinkedIn & Site)
  { 
    id: 'ref_link_1', 
    name: 'Presença Digital de Impacto', 
    category: 'LinkedIn', 
    url: 'assets/ref_9.png', 
    prompt: 'LinkedIn mockups and online brand presence.', 
    public: true, 
    order: 37 
  },
  { 
    id: 'ref_link_2', 
    name: 'Perfil Comercial de Alta Autoridade', 
    category: 'LinkedIn', 
    url: 'assets/ref_10.png', 
    prompt: 'Digital corporate profile presentation.', 
    public: true, 
    order: 38 
  },
  { 
    id: 'ref_link_3', 
    name: 'Retrato de Destaque Executivo', 
    category: 'LinkedIn', 
    url: 'assets/ref_2.png', 
    prompt: 'Professional LinkedIn profile picture.', 
    public: true, 
    order: 39 
  },
  { 
    id: 'ref_link_4', 
    name: 'Imagem para Canais Digitais', 
    category: 'LinkedIn', 
    url: 'assets/ref_4.png', 
    prompt: 'Social media executive portrait.', 
    public: true, 
    order: 40 
  },
  { 
    id: 'ref_link_5', 
    name: 'Visual Institucional Moderno', 
    category: 'LinkedIn', 
    url: 'assets/ref_6.png', 
    prompt: 'Institutional site biography portrait.', 
    public: true, 
    order: 41 
  },
  { 
    id: 'ref_link_6', 
    name: 'Presença Executiva no LinkedIn', 
    category: 'LinkedIn', 
    url: 'assets/ref_8.png', 
    prompt: 'LinkedIn profile headshot.', 
    public: true, 
    order: 42 
  },
  { 
    id: 'ref_link_7', 
    name: 'Portfólio Executivo de Carreira', 
    category: 'LinkedIn', 
    url: 'assets/ref_1.png', 
    prompt: 'Executive career portfolio portrait.', 
    public: true, 
    order: 43 
  },
  { 
    id: 'ref_link_8', 
    name: 'Perfil de CEO e Conselheiro', 
    category: 'LinkedIn', 
    url: 'assets/ref_3.png', 
    prompt: 'CEO LinkedIn style profile photo.', 
    public: true, 
    order: 44 
  },
  { 
    id: 'ref_link_9', 
    name: 'Destaque de Assessoria de Imprensa', 
    category: 'LinkedIn', 
    url: 'assets/ref_5.png', 
    prompt: 'Press release headshot style.', 
    public: true, 
    order: 45 
  },
  { 
    id: 'ref_link_10', 
    name: 'Perfil Profissional Head of Growth', 
    category: 'LinkedIn', 
    url: 'assets/portrait_linkedin.png', 
    prompt: 'Professional head of growth LinkedIn profile portrait.', 
    public: true, 
    order: 70 
  },
  { 
    id: 'ref_link_11', 
    name: 'Apresentação Corporativa B2B', 
    category: 'LinkedIn', 
    url: 'assets/ref_7.png', 
    prompt: 'B2B executive profile presentation photo.', 
    public: true, 
    order: 71 
  },
  { 
    id: 'ref_link_12', 
    name: 'LinkedIn Executivo Sênior', 
    category: 'LinkedIn', 
    url: 'assets/ref_1.png', 
    prompt: 'Senior corporate manager profile headshot.', 
    public: true, 
    order: 72 
  },
  { 
    id: 'ref_link_13', 
    name: 'Retrato para Site e Biografia', 
    category: 'LinkedIn', 
    url: 'assets/ref_5.png', 
    prompt: 'Executive website biography headshot.', 
    public: true, 
    order: 73 
  },
  { 
    id: 'ref_link_14', 
    name: 'Visual Profissional C-Level', 
    category: 'LinkedIn', 
    url: 'assets/ref_3.png', 
    prompt: 'C-level executive profile picture.', 
    public: true, 
    order: 74 
  },
  { 
    id: 'ref_link_15', 
    name: 'Destaque Executivo de Imprensa', 
    category: 'LinkedIn', 
    url: 'assets/ref_9.png', 
    prompt: 'Corporate PR and media kit executive portrait.', 
    public: true, 
    order: 75 
  }
];

export async function seedDatabaseIfNeeded() {
  try {
    console.log('Seeding/updating database references and categories...');
    
    // Seed Categories
    const { error: catInsertError } = await supabase
      .from('categories')
      .upsert(defaultCategories);
    if (catInsertError) console.error('Error seeding categories:', catInsertError);

    // Seed References
    const { error: refInsertError } = await supabase
      .from('references')
      .upsert(defaultReferences);
    if (refInsertError) console.error('Error seeding references:', refInsertError);
    
    console.log('Database sync completed successfully!');
  } catch (err) {
    console.error('Failed to sync database:', err);
  }
}
