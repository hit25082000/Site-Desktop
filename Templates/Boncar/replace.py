import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace strings safely
replacements = {
    'Qualificação': 'Solicitar orçamento',
    'Começar qualificação': 'Solicitar orçamento',
    'Inclua “câmbio” na qualificação': 'Inclua “câmbio” no orçamento',
    'Qualificação rápida': 'Orçamento rápido',
    'qualificação rápida': 'orçamento rápido',
    '"*Qualificação:*"': '"*Orçamento:*"'
}

for old, new in replacements.items():
    content = content.replace(old, new)

# Add mix-blend-multiply to logo in header
logo_pattern = r'(<a href="#topo" class="flex items-center gap-3 shrink-0">\s*<img src="assets/logo\.png" alt="Boncar" class="h-10 md:h-11 w-auto object-contain)'
content = re.sub(logo_pattern, r'\1 mix-blend-multiply', content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updates applied")
