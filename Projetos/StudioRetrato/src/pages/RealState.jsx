import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BuildingOffice,
  Check,
  EnvelopeSimple,
  GlobeHemisphereWest,
  HouseLine,
  IdentificationCard,
  InstagramLogo,
  Phone,
  PresentationChart,
  SealCheck,
  TrendUp,
  Users,
  UsersThree,
  WhatsappLogo,
  Sparkle as Sparkles
} from '@phosphor-icons/react';

const usageCards = [
  {
    title: 'WhatsApp profissional',
    text: 'Foto pronta para perfil, catálogo e abordagem inicial.',
    icon: WhatsappLogo
  },
  {
    title: 'Instagram',
    text: 'Retratos consistentes para feed, bio e destaques.',
    icon: InstagramLogo
  },
  {
    title: 'Cartão digital',
    text: 'Imagem padronizada para assinatura e apresentação rápida.',
    icon: IdentificationCard
  },
  {
    title: 'Apresentação de imóveis',
    text: 'Visual mais forte para enviar propostas e captações.',
    icon: PresentationChart
  },
  {
    title: 'Site da imobiliária',
    text: 'Fotos prontas para páginas de equipe e perfil comercial.',
    icon: GlobeHemisphereWest
  },
  {
    title: 'Assinatura de e-mail',
    text: 'Presença mais profissional em follow-ups e propostas.',
    icon: EnvelopeSimple
  },
  {
    title: 'Materiais de captação',
    text: 'Padronização visual para folders, cards e apresentações.',
    icon: HouseLine
  }
];

const individualPortfolio = [
  {
    title: 'Corretor homem',
    subtitle: 'Formal, confiável e pronto para captação.',
    image: '/assets/real-state/corretor-office-desk.png'
  },
  {
    title: 'Corretora mulher',
    subtitle: 'Linguagem premium com presença comercial.',
    image: '/assets/ref_10.png'
  },
  {
    title: 'Corretor jovem',
    subtitle: 'Imagem moderna para digital e primeira impressão.',
    image: '/assets/ref_6.png'
  },
  {
    title: 'Corretora premium',
    subtitle: 'Posicionamento para imóveis de maior ticket.',
    image: '/assets/ref_7.png'
  },
  {
    title: 'Corretor casual elegante',
    subtitle: 'Acessível sem perder autoridade.',
    image: '/assets/ref_5.png'
  },
  {
    title: 'Corretor com fundo urbano',
    subtitle: 'Conexão com cidade, mobilidade e mercado.',
    image: '/assets/real-state/corretor-window.png'
  },
  {
    title: 'Corretor com fundo escritório',
    subtitle: 'Leitura corporativa para imobiliárias e equipe.',
    image: '/assets/real-state/corretor-boardroom.png'
  },
  {
    title: 'Corretor com prédio ao fundo',
    subtitle: 'Aplicação direta para portais e branding local.',
    image: '/assets/ref_8.png'
  }
];

const individualPlans = [
  {
    name: 'Perfil Profissional',
    price: '97',
    details: '5 fotos para WhatsApp, Instagram e cartão digital',
    unitPrice: 'Equivale a R$ 19,40 por foto',
    cta: 'Quero o Perfil Profissional',
    message: 'Olá! Tenho interesse no pacote Perfil Profissional (R$97) para corretores.'
  },
  {
    name: 'Autoridade Comercial',
    price: '197',
    details: '12 fotos + fundos profissionais variados',
    unitPrice: 'Equivale a apenas R$ 16,41 por foto',
    cta: 'Quero o Autoridade Comercial',
    message: 'Olá! Tenho interesse no pacote Autoridade Comercial (R$197) para corretores.',
    highlight: true
  },
  {
    name: 'Presença Premium',
    price: '297',
    details: '20 fotos + variações para redes e apresentações',
    unitPrice: 'Equivale a apenas R$ 14,85 por foto (melhor preço!)',
    cta: 'Quero o Presença Premium',
    message: 'Olá! Tenho interesse no pacote Presença Premium (R$297) para corretores.'
  }
];

const teamPlans = [
  {
    name: 'Equipe Essencial',
    price: 'R$997',
    details: 'até 5 corretores, 10 fotos por pessoa'
  },
  {
    name: 'Equipe Autoridade',
    price: 'R$1.797',
    details: 'até 10 corretores, 10 fotos por pessoa'
  },
  {
    name: 'Imobiliária Premium',
    price: 'Sob consulta',
    details: 'acima de 10 corretores'
  }
];

function getWaLink(message) {
  return `https://wa.me/5567931990118?text=${encodeURIComponent(message)}`;
}

function PortfolioCard({ title, subtitle, image }) {
  return (
    <article className="group relative overflow-hidden bg-neutral-50 rounded-[1.75rem] border border-neutral-200/85 aspect-[3/4] shadow-sm hover:shadow-xl hover:border-neutral-300/80 transition-all duration-500 ease-out">
      <img
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        src={image}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent flex flex-col justify-end p-5">
        <span className="text-[10px] text-blue-300 font-bold uppercase tracking-widest">Portfólio imobiliário</span>
        <h3 className="text-sm font-bold text-white mt-1 leading-tight">{title}</h3>
        <p className="text-xs text-neutral-200 mt-1 leading-relaxed">{subtitle}</p>
      </div>
    </article>
  );
}

export default function RealState() {
  useEffect(() => {
    document.title = 'Studio Retrato — Fotos Profissionais Para Corretores';
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute(
        'content',
        'Fotos profissionais para corretores e imobiliárias venderem mais confiança no digital. Retratos prontos para WhatsApp, Instagram, site da imobiliária, cartão digital e apresentações comerciais.'
      );
    }
  }, []);

  return (
    <div className="relative min-h-screen pt-0 pb-16 px-6 sm:px-8 md:px-10 bg-neutral-50 text-neutral-800">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-50/30 via-white to-slate-100/50"></div>

      <div className="relative flex flex-col items-center z-20 -mb-6">
        <div className="h-16 w-6 bg-neutral-800 rounded-b-md shadow-inner border-b border-white/5"></div>
        <div className="h-6 w-14 rounded-md bg-neutral-900 border border-neutral-700 shadow-md flex items-center justify-center">
          <div className="h-1.5 w-6 rounded-full bg-neutral-600"></div>
        </div>
      </div>

      <div className="relative w-full max-w-5xl mx-auto bg-white rounded-[2.5rem] border border-neutral-200 shadow-2xl p-8 sm:p-10 md:p-12 font-geist z-10">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-neutral-50 border border-neutral-200 rounded-2xl p-4 sm:p-5 mb-16">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm font-semibold text-emerald-600">Atendimento exclusivo para corretores e imobiliárias</span>
          </div>
          <a
            className="flex items-center gap-2 text-neutral-800 hover:text-blue-600 transition text-sm font-bold bg-white px-4 py-2 rounded-xl border border-neutral-200 shadow-sm"
            href="https://wa.me/5567931990118"
            target="_blank"
            rel="noreferrer"
          >
            <WhatsappLogo className="w-4 h-4 text-emerald-500 fill-emerald-500 animate-pulse" weight="light" />
            <span>Fale conosco: WhatsApp</span>
          </a>
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-24">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-neutral-950 leading-[1.05] font-sans">
              Fotos profissionais para <span className="font-serif italic font-normal text-blue-700">corretores</span> venderem mais <span className="font-serif italic font-normal text-amber-600">confiança no digital</span>
            </h1>

            <p className="text-lg text-neutral-600 leading-relaxed">
              Transforme fotos simples em retratos profissionais para usar no WhatsApp, Instagram, portais imobiliários, cartão digital e apresentações comerciais — sem estúdio e sem deslocamento.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center pt-2">
              <a
                className="btn-texture group inline-flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] text-base font-bold font-ffpqr tracking-wider text-white rounded-full py-4 px-8 shadow-xl shadow-neutral-950/10"
                href={getWaLink('Olá! Quero minhas fotos para WhatsApp e Instagram.')}
                target="_blank"
                rel="noreferrer"
              >
                <span>Quero minhas fotos para WhatsApp e Instagram</span>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4 text-white" weight="light" />
                </span>
              </a>

              <button
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-2 text-sm font-bold text-neutral-700 hover:text-blue-700 transition-colors px-5 py-3 rounded-full border border-neutral-200 hover:border-blue-200 bg-white hover:bg-blue-50/50"
              >
                <TrendUp className="w-4 h-4" weight="light" />
                <span>Ver exemplos para corretores</span>
              </button>
            </div>

            <p className="text-xs text-neutral-500 italic mt-2 flex items-center gap-1.5 justify-center sm:justify-start">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              Envie suas selfies pelo WhatsApp e faremos uma pré-avaliação gratuita antes da compra.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-neutral-100 text-xs text-neutral-500">
              <div className="flex items-center gap-2">
                <SealCheck className="w-4 h-4 text-blue-600" weight="light" />
                <span>Pacotes a partir de R$97</span>
              </div>
              <div className="flex items-center gap-2">
                <SealCheck className="w-4 h-4 text-blue-700" weight="light" />
                <span>Pronto para WhatsApp, Instagram e site</span>
              </div>
              <div className="flex items-center gap-2">
                <SealCheck className="w-4 h-4 text-amber-600" weight="light" />
                <span>Sem deslocamento e sem estúdio</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 w-full flex justify-center">
            <div className="relative w-full max-w-[340px] lg:max-w-none">
              <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl border border-neutral-200 bg-neutral-50 p-2.5">
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent z-10"></div>
                <img
                  alt="Retrato profissional para corretor"
                  className="w-full h-full object-cover rounded-[1.7rem]"
                  src="/assets/real-state/corretor-window.png"
                />
                <div className="absolute bottom-6 left-6 right-6 z-20 font-geist">
                  <p className="text-[10px] text-blue-300 font-bold font-ffpqr uppercase tracking-widest">PRESENÇA DIGITAL IMOBILIÁRIA</p>
                  <h2 className="text-lg font-extrabold text-white leading-tight font-sans m-0">Retrato pensado para <span className="font-serif italic font-normal text-blue-200">perfil comercial</span></h2>
                  <p className="text-xs text-neutral-200 mt-1">Imagem pronta para bio, site da imobiliária e apresentação de imóveis.</p>
                </div>
              </div>

              
            </div>
          </div>
        </section>

        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-neutral-50 border border-neutral-200 rounded-[2rem] p-6 lg:p-8">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tighter font-sans leading-tight">
                Seu cliente avalia sua <span className="font-serif italic font-normal text-blue-700">imagem</span> antes mesmo da <span className="font-serif italic font-normal text-amber-600">primeira conversa</span>
              </h2>
              <p className="text-neutral-600 text-base leading-relaxed">
                No mercado imobiliário, confiança vem antes da visita. Uma foto amadora no WhatsApp, Instagram ou cartão digital pode enfraquecer sua percepção profissional. Com retratos de autoridade, você aparece de forma mais confiável, moderna e preparada para atender clientes de alto valor.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
                {[
                  'Foto amadora no perfil',
                  'Baixa percepção de valor',
                  'Menos confiança na abordagem'
                ].map((item) => (
                  <div key={item} className="bg-white rounded-2xl border border-neutral-200 px-4 py-4 text-sm font-semibold text-neutral-700 shadow-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tighter mb-4 font-sans leading-tight">
              Uma única sessão. <span className="font-serif italic font-normal text-blue-700">Vários usos comerciais</span>.
            </h2>
            <p className="text-neutral-500 text-base leading-relaxed">
              Você recebe imagens prontas para usar nos principais pontos de contato com seus clientes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {usageCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title} className="bg-neutral-50 border border-neutral-200 rounded-[1.6rem] p-5 shadow-sm hover:border-neutral-300 transition-colors">
                  <div className="h-11 w-11 rounded-2xl bg-white border border-neutral-200 text-blue-700 flex items-center justify-center shadow-sm">
                    <Icon className="w-5 h-5" weight="light" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 mt-5">{card.title}</h3>
                  <p className="text-sm text-neutral-500 mt-2 leading-relaxed">{card.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-blue-50 border border-blue-100 rounded-[2rem] p-6 lg:p-8">
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-sans leading-tight">
                Você não precisa de fotos <span className="font-serif italic font-normal text-blue-700">perfeitas</span> para começar
              </h2>
              <p className="text-neutral-600 text-base leading-relaxed">
                Para criar os retratos, você só precisa enviar algumas fotos com o rosto bem visível, boa iluminação e sem filtros pesados. Nossa equipe orienta quais imagens funcionam melhor antes da produção.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <a
                className="btn-texture inline-flex items-center justify-center gap-2 text-sm font-bold text-white px-5 py-3 rounded-full transition shadow-sm w-full sm:w-auto"
                href={getWaLink('Olá! Quero saber se as minhas fotos atuais servem para criar os retratos profissionais.')}
                target="_blank"
                rel="noreferrer"
              >
                <span>Falar com especialista</span>
                <WhatsappLogo className="w-4 h-4 text-white" weight="light" />
              </a>
            </div>
          </div>
        </section>

        <section id="portfolio" className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tighter mb-4 font-sans leading-tight">
              Portfólio pensado para <span className="font-serif italic font-normal text-blue-700">corretores e imobiliárias</span>
            </h2>
            <p className="text-neutral-500 text-base leading-relaxed mb-4">
              Cada retrato passa por direção visual e curadoria de imagem humana sob supervisão da nossa Diretora de Arte, garantindo alta fidelidade e acabamento editorial premium.
            </p>
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-4 py-2 rounded-full text-sm font-bold shadow-sm">
              <SealCheck className="w-4 h-4" weight="fill" />
              Retratos de alta fidelidade facial, naturais e sem aparência artificial.
            </div>
          </div>

          <div className="mb-16">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-xs font-semibold text-blue-700 uppercase tracking-widest">Corretores individuais</p>
                <h3 className="text-2xl font-extrabold text-neutral-950 mt-1">Variações para diferentes estilos de posicionamento</h3>
              </div>
              <a
                className="hidden sm:inline-flex items-center gap-1 text-sm font-bold text-neutral-700 hover:text-blue-700 transition"
                href={getWaLink('Olá! Quero criar meu portfólio de retratos como corretor(a).')}
                target="_blank"
                rel="noreferrer"
              >
                <span>Solicitar meu estilo</span>
                <ArrowUpRight className="w-4 h-4" weight="light" />
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5">
              {individualPortfolio.map((item) => (
                <PortfolioCard key={item.title} {...item} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-neutral-50/70 border border-neutral-200 rounded-[2rem] p-6 lg:p-8">
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <div>
                <p className="text-xs font-semibold text-blue-700 uppercase tracking-widest">Equipe imobiliária</p>
                <h3 className="text-2xl font-extrabold text-neutral-950 mt-1 leading-tight">Padronização visual para 4 a 6 corretores e expansão para equipes maiores</h3>
                <p className="text-neutral-600 text-sm mt-4 leading-relaxed">
                  Mantemos o mesmo padrão de enquadramento, luz e acabamento para site, WhatsApp, cards de equipe e apresentação comercial da imobiliária.
                </p>
              </div>

              <ul className="space-y-3 text-sm text-neutral-600">
                {[
                  '4 a 6 corretores com padrão visual consistente',
                  'Mockup de site com seção de equipe',
                  'Cards individuais padronizados para materiais comerciais'
                ].map((item) => (
                  <li key={item} className="flex gap-2.5 items-center">
                    <Check className="w-4 h-4 text-blue-600 shrink-0" weight="light" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-5">
              <article className="bg-white border border-neutral-200 rounded-[1.75rem] p-3 shadow-sm">
                <div className="relative aspect-[4/5] rounded-[1.3rem] overflow-hidden">
                  <img
                    alt="Equipe imobiliária padronizada"
                    className="w-full h-full object-cover"
                    src="/assets/portrait_team.png"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/75 via-neutral-950/10 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-[10px] uppercase tracking-widest text-blue-300 font-bold">Equipe de 4 a 6 corretores</p>
                    <p className="text-sm font-bold mt-1">Padrão visual único para toda a operação</p>
                  </div>
                </div>
              </article>

              <article className="bg-white border border-neutral-200 rounded-[1.75rem] p-5 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Mockup de site</p>
                      <h4 className="text-base font-bold text-neutral-900 mt-1">Página “Equipe”</h4>
                    </div>
                    <BuildingOffice className="w-5 h-5 text-blue-700" weight="light" />
                  </div>

                  <div className="rounded-[1.25rem] border border-neutral-200 overflow-hidden bg-neutral-50">
                    <div className="h-10 bg-neutral-950 flex items-center px-4">
                      <div className="h-2 w-2 rounded-full bg-white/50"></div>
                      <div className="h-2 w-2 rounded-full bg-white/30 ml-2"></div>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="h-20 rounded-2xl bg-[url('/assets/real-state/corretor-boardroom.png')] bg-cover bg-center"></div>
                      <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3].map((item) => (
                          <div key={item} className="bg-white rounded-xl border border-neutral-200 p-2">
                            <div className="aspect-square rounded-lg bg-neutral-200 mb-2"></div>
                            <div className="h-2 rounded-full bg-neutral-300"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-neutral-500 mt-4 leading-relaxed">
                  Visual pronto para usar no site institucional e destacar a equipe comercial com unidade.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="precos" className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tighter mb-4 font-sans leading-tight">
              Oferta para <span className="font-serif italic font-normal text-blue-700">corretor individual</span>
            </h2>
            <p className="text-neutral-500 text-base leading-relaxed">
              Três pacotes objetivos para presença comercial no digital, sem mudar o padrão visual do Studio Retrato.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {individualPlans.map((plan) => (
              <article
                key={plan.name}
                className={
                  plan.highlight
                    ? 'bg-white border-2 border-blue-600 rounded-3xl p-8 flex flex-col justify-between relative shadow-xl'
                    : 'bg-neutral-50 border border-neutral-200 rounded-3xl p-8 flex flex-col justify-between hover:border-neutral-300 transition-colors shadow-sm'
                }
              >
                {plan.highlight && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 bg-blue-900 text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-md">
                    Mais escolhido por corretores
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">{plan.name}</h3>
                    <p className={`text-xs mt-1 ${plan.highlight ? 'text-blue-600' : 'text-neutral-500'}`}>{plan.details}</p>
                  </div>

                  <div className="space-y-1">
                    <span className={`text-xs ${plan.highlight ? 'text-blue-600' : 'text-neutral-500'}`}>Investimento</span>
                    <div className="flex items-baseline gap-1 text-neutral-900">
                      <span className="text-lg font-bold">R$</span>
                      <span className="text-4xl font-bytalion font-bold tracking-tight">{plan.price}</span>
                    </div>
                    {plan.unitPrice && (
                      <p className={`text-[11px] font-medium leading-tight ${plan.highlight ? 'text-blue-700 font-bold' : 'text-neutral-500'}`}>
                        {plan.unitPrice}
                      </p>
                    )}
                  </div>

                  <ul className={`space-y-3.5 pt-6 text-sm ${plan.highlight ? 'border-t border-blue-100 text-neutral-800' : 'border-t border-neutral-200 text-neutral-600'}`}>
                    <li className="flex gap-2.5 items-center">
                      <Check className="w-4 h-4 text-blue-600 shrink-0" weight="light" />
                      <span>{plan.details}</span>
                    </li>
                    <li className="flex gap-2.5 items-center">
                      <Check className="w-4 h-4 text-blue-600 shrink-0" weight="light" />
                      <span>Entrega pensada para perfil comercial e social</span>
                    </li>
                    <li className="flex gap-2.5 items-center">
                      <Check className="w-4 h-4 text-blue-600 shrink-0" weight="light" />
                      <span>Sem estúdio, com aparência profissional final</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8">
                  <a
                    className="btn-texture block text-center text-sm font-bold font-ffpqr tracking-wider text-white px-6 py-3.5 rounded-xl shadow-sm transition"
                    href={getWaLink(plan.message)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>{plan.cta}</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-neutral-900 text-white rounded-[3rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute right-0 bottom-0 h-96 w-96 bg-blue-500/10 rounded-full blur-3xl"></div>

            <div className="lg:col-span-7 space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-blue-300">
                <UsersThree className="w-3.5 h-3.5" weight="light" />
                <span>Pacotes para imobiliárias e equipes comerciais</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tighter leading-tight font-sans">
                Padronize a imagem da sua <span className="font-serif italic font-normal text-blue-300">equipe</span> com retratos profissionais para <span className="font-serif italic font-normal text-amber-200">site, WhatsApp, redes sociais e materiais comerciais</span>.
              </h2>

              <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
                Uma equipe com imagem padronizada transmite mais organização, profissionalismo e confiança em todos os pontos de contato com o cliente.
              </p>
              
              <ul className="space-y-2 pt-2 text-sm text-neutral-300">
                <li className="flex gap-2.5 items-center">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" weight="bold" />
                  <span>site da imobiliária mais profissional;</span>
                </li>
                <li className="flex gap-2.5 items-center">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" weight="bold" />
                  <span>perfis dos corretores padronizados;</span>
                </li>
                <li className="flex gap-2.5 items-center">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" weight="bold" />
                  <span>materiais comerciais mais consistentes;</span>
                </li>
                <li className="flex gap-2.5 items-center">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" weight="bold" />
                  <span>mais confiança na primeira impressão.</span>
                </li>
              </ul>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {teamPlans.map((plan) => (
                  <article key={plan.name} className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    <p className="text-sm font-bold text-white">{plan.name}</p>
                    <p className="text-xl font-bold text-blue-300 mt-2">{plan.price}</p>
                    <p className="text-xs text-neutral-300 mt-2 leading-relaxed">{plan.details}</p>
                  </article>
                ))}
              </div>

              <div className="pt-2">
                <a
                  className="btn-texture inline-flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] text-base font-bold font-ffpqr tracking-wider text-white rounded-full py-4 px-8 shadow-xl"
                  href={getWaLink('Olá! Quero solicitar orçamento para equipe imobiliária.')}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>Solicitar orçamento para equipe</span>
                  <ArrowRight className="w-4 h-4 text-white" weight="light" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative z-10">
              <div className="bg-white rounded-[2rem] p-4 shadow-2xl">
                <div className="rounded-[1.5rem] border border-neutral-200 p-4">
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Equipe imobiliária</p>
                      <h3 className="text-lg font-bold text-neutral-900 mt-1">Cards individuais padronizados</h3>
                    </div>
                    <Users className="w-5 h-5 text-blue-700" weight="light" />
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {[
                      '/assets/real-state/corretor-window.png',
                      '/assets/ref_10.png',
                      '/assets/ref_6.png',
                      '/assets/real-state/corretor-boardroom.png'
                    ].map((image, index) => (
                      <div key={image} className="rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-50">
                        <div className="aspect-[4/5]">
                          <img alt={`Corretor ${index + 1}`} className="w-full h-full object-cover" src={image} />
                        </div>
                        <div className="p-3">
                          <div className="h-2.5 rounded-full bg-neutral-800 w-3/4"></div>
                          <div className="h-2 rounded-full bg-neutral-200 mt-2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 mb-8 font-sans text-center">
              Perguntas Frequentes
            </h2>
            <div className="space-y-4">
              <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Preciso ir até um estúdio?</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Não. O processo é digital. Você envia suas fotos pelo WhatsApp e recebe os retratos prontos.
                </p>
              </div>

              <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-neutral-900 mb-2">As fotos ficam parecidas comigo?</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Sim. Usamos suas fotos como base para preservar seus traços e aparência.
                </p>
              </div>

              <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Vai parecer imagem feita por IA?</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Nosso foco é criar retratos realistas, profissionais e utilizáveis comercialmente, evitando aparência artificial.
                </p>
              </div>

              <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Posso usar no WhatsApp, Instagram e site?</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Sim. As imagens são entregues em formato digital para uso nos principais canais comerciais.
                </p>
              </div>

              <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Vocês fazem para equipes de imobiliárias?</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Sim. Temos pacotes para padronizar a imagem de equipes comerciais.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="relative overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/5 rounded-[3rem] p-8 sm:p-12 text-center space-y-6 shadow-2xl">
            <div className="absolute inset-0 bg-grid-white/[0.02] -z-10"></div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tighter leading-tight max-w-3xl mx-auto font-sans">
              Sua foto comercial pode transmitir <span className="font-serif italic font-normal text-blue-300">mais confiança</span> antes mesmo da <span className="font-serif italic font-normal text-amber-200">primeira visita</span>
            </h2>

            <p className="text-[#eaeaf0]/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Fale no WhatsApp e receba a recomendação ideal para o seu perfil ou empresa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <a
                className="btn-texture group inline-flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] text-base font-bold font-ffpqr tracking-wider text-white rounded-full py-4 px-8 shadow-xl w-full sm:w-auto"
                href={getWaLink('Olá! Sou corretor individual e quero minhas fotos profissionais.')}
                target="_blank"
                rel="noreferrer"
              >
                <span>Sou corretor individual</span>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4 text-white" weight="light" />
                </span>
              </a>

              <a
                className="inline-flex items-center justify-center gap-2 text-base font-bold text-neutral-300 hover:text-white transition-colors px-8 py-4 rounded-full border border-neutral-700 hover:border-neutral-500 bg-transparent hover:bg-white/5 w-full sm:w-auto"
                href={getWaLink('Olá! Tenho uma equipe/imobiliária e quero um orçamento para fotos profissionais.')}
                target="_blank"
                rel="noreferrer"
              >
                <WhatsappLogo className="w-5 h-5 text-emerald-500" />
                <span>Tenho uma equipe/imobiliária</span>
              </a>
            </div>
          </div>
        </section>

        <footer className="border-t border-neutral-100 pt-10">
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
                Retratos profissionais para corretores, imobiliárias e equipes comerciais que precisam vender mais confiança no digital.
              </p>
              <div className="flex items-center gap-2 text-xs text-neutral-500 pt-2">
                <WhatsappLogo className="w-4 h-4 text-emerald-500" weight="light" />
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
                <h4 className="text-neutral-800 font-bold mb-4 text-xs uppercase tracking-wider">Navegação</h4>
                <ul className="space-y-2 text-xs text-neutral-500">
                  <li><a className="hover:text-blue-600 transition" href="#portfolio">Portfólio</a></li>
                  <li><a className="hover:text-blue-600 transition" href="#precos">Pacotes para corretores</a></li>
                  <li><a className="hover:text-blue-600 transition" href="https://wa.me/5567931990118" target="_blank" rel="noreferrer">Solicitar orçamento</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-neutral-800 font-bold mb-4 text-xs uppercase tracking-wider">Links Úteis</h4>
                <ul className="space-y-2 text-xs text-neutral-500">
                  <li><Link className="hover:text-blue-600 transition" to="/">Página principal</Link></li>
                  <li><Link className="hover:text-blue-600 transition font-medium text-blue-600" to="/admin">Painel de Administração</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-100 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-neutral-400 font-mono">
            <p>© 2026 Studio Retrato. Direitos reservados.</p>
            <div className="flex gap-4">
              <a className="hover:text-neutral-800 transition font-geist" href="#portfolio">Termos de Uso</a>
              <a className="hover:text-neutral-800 transition font-geist" href="#portfolio">Privacidade</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
