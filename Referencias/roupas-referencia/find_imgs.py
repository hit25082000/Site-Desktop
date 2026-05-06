import re
with open('index.html','r',encoding='utf-8') as f:
    c = f.read()
imgs = re.findall(r'src="(assets/[^"]+\.jpg)"', c)
unique = list(dict.fromkeys(imgs))
for u in unique[:20]:
    print(u)
