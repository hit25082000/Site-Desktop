/**
* db.js - Gerenciador de Banco de Dados Local e utilitários de compartilhamento
* para o Studio Retrato.
* 
* Utiliza IndexedDB com fallback para LocalStorage para garantir persistência 
* robusta e armazenamento de imagens de referência e books.
*/
9: const DB_NAME = 'StudioRetratoDB';
// MISSING LINE 9
const DB_VERSION = 1;
12: const db = {
// MISSING LINE 12
// Configurações padrão
defaultSettings: {
pricePerPhoto: 30.00,
mercadoPagoSandbox: true,
mercadoPagoPublicKey: '',
imgbbApiKey: '', // API gratuita para hospedar fotos reais e gerar URLs públicas
},
21:     // Inicializa o banco de dados IndexedDB
// MISSING LINE 21
init() {
return new Promise((resolve, reject) => {
if (!window.indexedDB) {
console.warn('IndexedDB não suportado neste navegador. Usando localStorage como fallback.');
resolve(this.setupLocalStorageFallback());
return;
}
30:             const request = window.indexedDB.open(DB_NAME, DB_VERSION);
// MISSING LINE 30
32:             request.onerror = (event) => {
// MISSING LINE 32
console.error('Erro ao abrir IndexedDB:', event.target.error);
resolve(this.setupLocalStorageFallback());
};
37:             request.onsuccess = (event) => {
// MISSING LINE 37
this.instance = event.target.result;
resolve(true);
};
42:             request.onupgradeneeded = (event) => {
// MISSING LINE 42
// MISSING LINE 43
// MISSING LINE 44
// MISSING LINE 45
// MISSING LINE 46
// MISSING LINE 47
// MISSING LINE 48
// MISSING LINE 49
// MISSING LINE 50
// MISSING LINE 51
// MISSING LINE 52
// MISSING LINE 53
// MISSING LINE 54
// MISSING LINE 55
// MISSING LINE 56
// MISSING LINE 57
// MISSING LINE 58
// MISSING LINE 59
// MISSING LINE 60
// MISSING LINE 61
// MISSING LINE 62
// MISSING LINE 63
// MISSING LINE 64
// MISSING LINE 65
// MISSING LINE 66
// MISSING LINE 67
// MISSING LINE 68
// MISSING LINE 69
// MISSING LINE 70
// MISSING LINE 71
// MISSING LINE 72
// MISSING LINE 73
// MISSING LINE 74
// MISSING LINE 75
// MISSING LINE 76
// MISSING LINE 77
// MISSING LINE 78
// MISSING LINE 79
// MISSING LINE 80
// MISSING LINE 81
// MISSING LINE 82
// MISSING LINE 83
// MISSING LINE 84
// MISSING LINE 85
// MISSING LINE 86
// MISSING LINE 87
// MISSING LINE 88
// MISSING LINE 89
// MISSING LINE 90
// MISSING LINE 91
// MISSING LINE 92
// MISSING LINE 93
// MISSING LINE 94
// MISSING LINE 95
// MISSING LINE 96
// MISSING LINE 97
// MISSING LINE 98
// MISSING LINE 99
// MISSING LINE 100
// MISSING LINE 101
// MISSING LINE 102
// MISSING LINE 103
// MISSING LINE 104
// MISSING LINE 105
// MISSING LINE 106
// MISSING LINE 107
// MISSING LINE 108
// MISSING LINE 109
transaction.onerror = (e) => {
reject(transaction.error || e);
};
} catch (e) {
reject(e);
}
});
},
119:     // ==========================================
// MISSING LINE 119
// MÉTODOS DE REFERÊNCIAS
// ==========================================
getReferences() {
return this._execute('references', 'readonly', (store) => {
if (this.isFallback) return store.data;
return store.getAll();
});
},
129:     saveReference(reference) {
// MISSING LINE 129
if (!reference.id) reference.id = 'ref_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
return this._execute('references', 'readwrite', (store) => {
if (this.isFallback) {
const idx = store.data.findIndex(r => r.id === reference.id);
if (idx > -1) store.data[idx] = reference;
else store.data.push(reference);
store.save(store.data);
return reference;
}
store.put(reference);
return reference;
});
},
144:     deleteReference(id) {
// MISSING LINE 144
return this._execute('references', 'readwrite', (store) => {
if (this.isFallback) {
const filtered = store.data.filter(r => r.id !== id);
store.save(filtered);
return true;
}
store.delete(id);
return true;
});
},
156:     // ==========================================
// MISSING LINE 156
// MÉTODOS DE CLIENTES
// ==========================================
getClients() {
return this._execute('clients', 'readonly', (store) => {
if (this.isFallback) return store.data;
return store.getAll();
});
},
The above content does NOT show the entire file contents. If you need to view any lines of the file which were not shown to complete your task, call this tool again to view those lines.
// MISSING LINE 166
if (!client.id) client.id = 'cli_' + Date.now();
if (!client.createdAt) client.createdAt = new Date().toISOString();
return this._execute('clients', 'readwrite', (store) => {
if (this.isFallback) {
const idx = store.data.findIndex(c => c.id === client.id);
if (idx > -1) store.data[idx] = client;
else store.data.push(client);
store.save(store.data);
return client;
}
store.put(client);
return client;
});
},
182:     deleteClient(id) {
// MISSING LINE 182
return this._execute('clients', 'readwrite', (store) => {
if (this.isFallback) {
const filtered = store.data.filter(c => c.id !== id);
store.save(filtered);
188:                 // Também deleta os books associados
// MISSING LINE 188
this.getBooksByClient(id).then(books => {
{ id: 'ref_seed_val_5', name: "Conexão Profunda", category: "Dia dos Namorados", url: "assets/WhatsApp Image 2026-05-28 at 11.05.30 (1).jpeg", prompt: "Couples close-up profile portrait, dramatic lighting, shadow and light contrast, deep connection", public: true, order: 5 },
{ id: 'ref_seed_val_6', name: "Carinho na Tarde", category: "Dia dos Namorados", url: "assets/WhatsApp Image 2026-05-28 at 11.05.30 (2).jpeg", prompt: "Gentle hug couple portrait, golden hour warm lighting, dreamy atmosphere, realistic textures", public: true, order: 6 },
{ id: 'ref_seed_val_7', name: "Elegância Clássica", category: "Dia dos Namorados", url: "assets/WhatsApp Image 2026-05-28 at 11.05.31.jpeg", prompt: "Elegant couples portrait, dress and suit, sophisticated lighting, indoor luxury setting", public: true, order: 7 },
{ id: 'ref_seed_val_8', name: "Cumplicidade e Riso", category: "Dia dos Namorados", url: "assets/WhatsApp Image 2026-05-28 at 11.05.31 (1).jpeg", prompt: "Playful couple portrait, natural expressions, vintage film grading, candid look", public: true, order: 8 },
{ id: 'ref_seed_val_9', name: "Harmonia Perfeita", category: "Dia dos Namorados", url: "assets/WhatsApp Image 2026-05-28 at 11.05.31 (2).jpeg", prompt: "Couples portrait in nature, scenic background, soft warm sunset light, intimate connection", public: true, order: 9 }
];
}
198:             if (refsToSeed.length > 0) {
199:     // ==========================================
const promises = refsToSeed.map(r => this.saveReference(r));
return Promise.all(promises).then(() => {
// ==========================================
getAllBooks() {
return this._execute('books', 'readonly', (store) => {
if (this.isFallback) return store.data;
return store.getAll();
});
},
209:     getBooksByClient(clientId) {
// MISSING LINE 209
return this.getAllBooks().then(books => {
return books.filter(b => b.clientId === clientId);
});
},
215:     getBookById(id) {
// MISSING LINE 215
return this._execute('books', 'readonly', (store) => {
if (this.isFallback) return store.data.find(b => b.id === id) || null;
return store.get(id);
});
},
222:     saveBook(book) {
// MISSING LINE 222
if (!book.id) book.id = 'book_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
if (!book.createdAt) book.createdAt = new Date().toISOString();
return this._execute('books', 'readwrite', (store) => {
if (this.isFallback) {
const idx = store.data.findIndex(b => b.id === book.id);
if (idx > -1) store.data[idx] = book;
else store.data.push(book);
store.save(store.data);
return book;
}
store.put(book);
return book;
});
},
238:     deleteBook(id) {
// MISSING LINE 238
return this._execute('books', 'readwrite', (store) => {
// MISSING LINE 240
// MISSING LINE 241
// MISSING LINE 242
// MISSING LINE 243
// MISSING LINE 244
// MISSING LINE 245
// MISSING LINE 246
// MISSING LINE 247
// MISSING LINE 248
// MISSING LINE 249
// ==========================================
// MÉTODOS DE CONFIGURAÇÃO (SETTINGS)
// ==========================================
getSettings() {
return this._execute('settings', 'readonly', (store) => {
if (this.isFallback) {
const config = store.data.find(s => s.key === 'general');
return config ? config.value : this.defaultSettings;
}
return store.get('general');
}).then(res => {
if (!res) return this.defaultSettings;
return this.isFallback ? res : res.value;
}).catch(() => this.defaultSettings);
},
266:     saveSettings(settings) {
// MISSING LINE 266
return this._execute('settings', 'readwrite', (store) => {
const data = { key: 'general', value: settings };
if (this.isFallback) {
const idx = store.data.findIndex(s => s.key === 'general');
if (idx > -1) store.data[idx] = data;
else store.data.push(data);
store.save(store.data);
return settings;
}
store.put(data);
return settings;
});
},
281:     // ==========================================
// MISSING LINE 281
// SERIALIZAÇÃO / COMPRESSÃO PARA URL PÚBLICA
// ==========================================
/**
* Compacta os dados mínimos de um book para que caiba na hash da URL.
// MISSING LINE 286
// MISSING LINE 287
// MISSING LINE 288
// MISSING LINE 289
// MISSING LINE 290
// MISSING LINE 291
// MISSING LINE 292
// MISSING LINE 293
// MISSING LINE 294
// MISSING LINE 295
// MISSING LINE 296
// MISSING LINE 297
// MISSING LINE 298
// MISSING LINE 299
// MISSING LINE 300
// MISSING LINE 301
// MISSING LINE 302
// MISSING LINE 303
// MISSING LINE 304
// MISSING LINE 305
// MISSING LINE 306
// MISSING LINE 307
// MISSING LINE 308
// MISSING LINE 309
// MISSING LINE 310
// MISSING LINE 311
// MISSING LINE 312
// MISSING LINE 313
// MISSING LINE 314
// MISSING LINE 315
// MISSING LINE 316
// MISSING LINE 317
// MISSING LINE 318
// MISSING LINE 319
// MISSING LINE 320
// MISSING LINE 321
// MISSING LINE 322
// MISSING LINE 323
// MISSING LINE 324
// MISSING LINE 325
// MISSING LINE 326
// MISSING LINE 327
// MISSING LINE 328
// MISSING LINE 329
// MISSING LINE 330
// MISSING LINE 331
// MISSING LINE 332
// MISSING LINE 333
// MISSING LINE 334
// MISSING LINE 335
// MISSING LINE 336
// MISSING LINE 337
// MISSING LINE 338
// MISSING LINE 339
// MISSING LINE 340
// MISSING LINE 341
// MISSING LINE 342
// MISSING LINE 343
// MISSING LINE 344
// MISSING LINE 345
// MISSING LINE 346
348:             // Reconstrói a estrutura do book
// MISSING LINE 348
return {
id: payload.bId,
clientId: payload.cId,
clientName: payload.cN,
title: payload.t,
pricePerPhoto: payload.p,
photos: payload.ph.map(p => ({
id: p.id,
url: p.url,
variationType: p.vt
})),
paymentStatus: payload.pay,
selectedPhotoIds: payload.sel
};
} catch (e) {
console.error('Erro ao decodificar book:', e);
return null;
}
},
369:     // ==========================================
// MISSING LINE 369
// IMGBB UPLOAD UTILITY (PARA URLS PÚBLICAS REAIS)
// ==========================================
uploadToImgBB(file, apiKey) {
return new Promise((resolve, reject) => {
const formData = new FormData();
formData.append('image', file);
377:             fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
// MISSING LINE 377
method: 'POST',
body: formData
})
.then(res => res.json())
.then(json => {
if (json && json.success) {
resolve(json.data.url);
} else {
reject(json.error ? json.error.message : 'Erro ao subir no ImgBB');
}
})
.catch(err => reject(err));
});
}
393:             // Reconstrói a estrutura do book
394: // Expõe globalmente
// Reconstrói a estrutura do book
return {
id: payload.bId,
clientId: payload.cId,
clientName: payload.cN,
title: payload.t,
pricePerPhoto: payload.p,
photos: payload.ph.map(p => ({
id: p.id,
url: p.url,
variationType: p.vt
})),
paymentStatus: payload.pay,
selectedPhotoIds: payload.sel,
referencesData: payload.rD || []
};
} catch (e) {
console.error('Erro ao decodificar book:', e);
return null;
}
},
416:     // ==========================================
// ==========================================
// IMGBB UPLOAD UTILITY (PARA URLS PÚBLICAS REAIS)
// ==========================================
uploadToImgBB(file, apiKey) {
return new Promise((resolve, reject) => {
const formData = new FormData();
formData.append('image', file);
424:             fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
body: formData
method: 'POST',
body: formData
})
.then(res => res.json())
.then(json => {
if (json && json.success) {
resolve(json.data.url);
} else {
reject(json.error ? json.error.message : 'Erro ao subir no ImgBB');
}
})
.catch(err => reject(err));
});
}
};
441: // Expõe globalmente
// Auto inicializa
window.srDb = db;
// Auto inicializa
db.init().then(() => {
console.log('Banco de dados do Studio Retrato inicializado.');
});
The above content does NOT show the entire file contents. If you need to view any lines of the file which were not shown to complete your task, call this tool again to view those lines.
// MISSING LINE 448
// MISSING LINE 449
// MISSING LINE 450
// MISSING LINE 451
// MISSING LINE 452
// MISSING LINE 453
return {
id: payload.bId,
clientId: payload.cId,
clientName: payload.cN,
title: payload.t,
pricePerPhoto: payload.p,
photos: payload.ph.map(p => ({
id: p.id,
url: p.url,
variationType: p.vt
})),
paymentStatus: payload.pay,
selectedPhotoIds: payload.sel,
referencesData: payload.rD || []
};
} catch (e) {
console.error('Erro ao decodificar book:', e);
return null;
}
},
475:     // ==========================================
// MISSING LINE 475
// IMGBB UPLOAD UTILITY (PARA URLS PÚBLICAS REAIS)
// ==========================================
uploadToImgBB(file, apiKey) {
return new Promise((resolve, reject) => {
const formData = new FormData();
formData.append('image', file);
483:             fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
// MISSING LINE 483
method: 'POST',
body: formData
})
.then(res => res.json())
.then(json => {
if (json && json.success) {
resolve(json.data.url);
} else {
reject(json.error ? json.error.message : 'Erro ao subir no ImgBB');
}
})
.catch(err => reject(err));
});
}
};
500: // Expõe globalmente
// MISSING LINE 500
window.srDb = db;
// Auto inicializa
db.init().then(() => {
console.log('Banco de dados do Studio Retrato inicializado.');
db.seedReferences();
});
The above content shows the entire, complete file contents of the requested file.