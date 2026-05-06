import re
with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

matches = re.findall(r'.{0,30}ualifica.{0,30}', text, re.IGNORECASE)
for m in matches:
    print(m)
