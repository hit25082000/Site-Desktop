/**
* db.js - Gerenciador de Banco de Dados Local e utilitários de compartilhamento
* para o Studio Retrato.
* 
* Utiliza IndexedDB com fallback para LocalStorage para garantir persistência 
* robusta e armazenamento de imagens de referência e books.
*/
9: const DB_NAME = 'StudioRetratoDB';
const DB_VERSION = 1;
12: const db = {
// Configurações padrão
defaultSettings: {
pricePerPhoto: 30.00,
mercadoPagoSandbox: true,
mercadoPagoPublicKey: '',
imgbbApiKey: '', // API gratuita para hospedar fotos reais e gerar URLs públicas
},
21:     // Inicializa o banco de dados IndexedDB
init() {
return new Promise((resolve, reject) => {
if (!window.indexedDB) {
console.warn('IndexedDB não suportado neste navegador. Usando localStorage como fallback.');
resolve(this.setupLocalStorageFallback());
return;
}
30:             const request = window.indexedDB.open(DB_NAME, DB_VERSION);
32:             request.onerror = (event) => {
console.error('Erro ao abrir IndexedDB:', event.target.error);
resolve(this.setupLocalStorageFallback());
};
37:             request.onsuccess = (event) => {
this.instance = event.target.result;
resolve(true);
};
42:             request.onupgradeneeded = (event) => {
{ id: 'ref_seed_val_5', name: "Conexão Profunda", category: "Dia dos Namorados", url: "assets/WhatsApp Image 2026-05-28 at 11.05.30 (1).jpeg", prompt: "Couples close-up profile portrait, dramatic lighting, shadow and light contrast, deep connection", public: true, order: 5 },
{ id: 'ref_seed_val_6', name: "Carinho na Tarde", category: "Dia dos Namorados", url: "assets/WhatsApp Image 2026-05-28 at 11.05.30 (2).jpeg", prompt: "Gentle hug couple portrait, golden hour warm lighting, dreamy atmosphere, realistic textures", public: true, order: 6 },
{ id: 'ref_seed_val_7', name: "Elegância Clássica", category: "Dia dos Namorados", url: "assets/WhatsApp Image 2026-05-28 at 11.05.31.jpeg", prompt: "Elegant couples portrait, dress and suit, sophisticated lighting, indoor luxury setting", public: true, order: 7 },
{ id: 'ref_seed_val_8', name: "Cumplicidade e Riso", category: "Dia dos Namorados", url: "assets/WhatsApp Image 2026-05-28 at 11.05.31 (1).jpeg", prompt: "Playful couple portrait, natural expressions, vintage film grading, candid look", public: true, order: 8 },
{ id: 'ref_seed_val_9', name: "Harmonia Perfeita", category: "Dia dos Namorados", url: "assets/WhatsApp Image 2026-05-28 at 11.05.31 (2).jpeg", prompt: "Couples portrait in nature, scenic background, soft warm sunset light, intimate connection", public: true, order: 9 }
];
}
198:             if (refsToSeed.length > 0) {
const promises = refsToSeed.map(r => this.saveReference(r));
return Promise.all(promises).then(() => {