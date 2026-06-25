const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Admin.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Simple alert() replacements - pattern: alert('...') or alert(`...`)
const replacements = [
  // Category validation alerts (these use template literals)
  [/alert\(`Erro: O identificador único '\$\{catId\}' já está em uso\.`\)/g, "toast.error(`O identificador '${catId}' já está em uso.`)"],
  [/alert\(`Erro: Já existe uma categoria chamada '\$\{catName\}'\.`\)/g, "toast.error(`Já existe uma categoria chamada '${catName}'.`)"],
  [/alert\(`A categoria com ID '\$\{catId\}' já existe\.`\)/g, "toast.error(`A categoria com ID '${catId}' já existe.`)"],
  [/alert\(`A categoria '\$\{catName\}' já existe\.`\)/g, "toast.error(`A categoria '${catName}' já existe.`)"],
  
  // Simple string alerts - errors
  [/alert\('Erro: O identificador único não pode ficar vazio\.'\)/g, "toast.error('O identificador único não pode ficar vazio.')"],
  [/alert\('Erro ao criar categoria: ' \+ error\.message\)/g, "toast.error('Erro ao criar categoria: ' + error.message)"],
  [/alert\('Erro: O nome da categoria não pode ficar vazio\.'\)/g, "toast.error('O nome da categoria não pode ficar vazio.')"],
  [/alert\('Erro: Identificador de categoria inválido\.'\)/g, "toast.error('Identificador de categoria inválido.')"],
  [/alert\('Erro ao criar categoria rapidamente: ' \+ error\.message\)/g, "toast.error('Erro ao criar categoria rapidamente: ' + error.message)"],
  
  // Import pose alerts
  [/alert\('Selecione ao menos uma imagem de referência de pose\.'\)/g, "toast.error('Selecione ao menos uma imagem de referência de pose.')"],
  [/alert\('Por favor, selecione ou crie uma categoria específica para associar as novas poses\.'\)/g, "toast.error('Selecione ou crie uma categoria para as novas poses.')"],
  [/alert\('Erro ao importar poses: ' \+ err\.message\)/g, "toast.error('Erro ao importar poses: ' + err.message)"],
  
  // Reference creation alerts
  [/alert\('Faça o upload de ao menos uma imagem de referência\.'\)/g, "toast.error('Faça o upload de ao menos uma imagem de referência.')"],
  [/alert\('Configure a chave da API do Gemini nas configurações antes de extrair prompts\.'\)/g, "toast.error('Configure a chave da API do Gemini nas configurações antes de extrair prompts.')"],
  [/alert\('Selecione uma imagem de referência\.'\)/g, "toast.error('Selecione uma imagem de referência.')"],
  [/alert\('Erro ao criar referência: ' \+ err\.message\)/g, "toast.error('Erro ao criar referência: ' + err.message)"],
  [/alert\('Erro ao excluir: ' \+ dbErr\.message\)/g, "toast.error('Erro ao excluir: ' + dbErr.message)"],
  
  // Book creation validation alerts
  [/alert\('Selecione um cliente\.'\)/g, "toast.error('Selecione um cliente.')"],
  [/alert\('Selecione pelo menos uma imagem de referência de pose\/estilo\.'\)/g, "toast.error('Selecione pelo menos uma imagem de referência de pose/estilo.')"],
  [/alert\('Por favor, preencha todos os campos do pacote \(Valor, Fotos Inclusas e Preço Extra\) ou deixe todos vazios para usar o preço por foto avulsa\.'\)/g, "toast.error('Preencha todos os campos do pacote ou deixe todos vazios para usar o preço por foto avulsa.')"],
  [/alert\('Por favor, preencha o sistema de pacote ou insira o preço por foto avulsa\.'\)/g, "toast.error('Preencha o sistema de pacote ou insira o preço por foto avulsa.')"],
  
  // File upload alerts
  [/alert\(`\$\{files\.length\} foto\(s\) enviada\(s\) com sucesso!`\)/g, "toast.success(`${files.length} foto(s) enviada(s) com sucesso!`)"],
  [/alert\('Erro no upload: ' \+ err\.message\)/g, "toast.error('Erro no upload: ' + err.message)"],
  
  // Copy/delete alerts
  [/alert\('Erro ao copiar imagens: ' \+ err\.message\)/g, "toast.error('Erro ao copiar imagens: ' + err.message)"],
  [/alert\('Erro ao deletar book: ' \+ dbErr\.message\)/g, "toast.error('Erro ao deletar book: ' + dbErr.message)"],
  
  // Payment alerts
  [/alert\('Book marcado como pago com sucesso!'\)/g, "toast.success('Book marcado como pago com sucesso!')"],
  [/alert\('Erro ao marcar como pago: ' \+ err\.message\)/g, "toast.error('Erro ao marcar como pago: ' + err.message)"],
  
  // Photo/variation alerts
  [/alert\('Erro ao excluir foto: ' \+ err\.message\)/g, "toast.error('Erro ao excluir foto: ' + err.message)"],
  [/alert\('Erro ao atualizar variação: ' \+ err\.message\)/g, "toast.error('Erro ao atualizar variação: ' + err.message)"],
  
  // Link copy
  [/alert\('Link do cliente copiado para a área de transferência!'\)/g, "toast.success('Link copiado para a área de transferência!')"],
  
  // Wizard pricing validation
  [/alert\(validation\.message\)/g, "toast.error(validation.message)"],
  
  // Also handle the if (error) alert patterns that have no braces  
  [/if \(error\) alert\('Erro ao excluir categoria: ' \+ error\.message\)/g, "if (error) { toast.error('Erro ao excluir categoria: ' + error.message); return; }"],
  
  // Confirm dialogs -> async confirm
  // These need more careful handling...
];

let count = 0;
for (const [pattern, replacement] of replacements) {
  const before = content;
  content = content.replace(pattern, replacement);
  if (content !== before) count++;
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log(`Applied ${count} replacements. Remaining alerts:`);

// Count remaining
const remaining = (content.match(/\balert\(/g) || []).length;
console.log(`  ${remaining} alert() calls remaining`);
