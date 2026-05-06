import re

with open('index.html', 'r', encoding='utf-8') as f:
    c = f.read()

# Find cursor host div
print("=== CURSOR HOST DIV ===")
idx = c.find('cursors-host')
if idx != -1:
    # find the opening tag
    tag_start = c.rfind('<div', max(0, idx-200), idx)
    if tag_start != -1:
        print(c[tag_start:tag_start+800])

# Find the Slider Container (carousel)
print("\n=== SLIDER CONTAINER ===")
idx = c.find('Slider Container')
if idx != -1:
    tag_start = c.rfind('<div', max(0, idx-200), idx)
    tag_end = idx + 2000
    print(c[tag_start:tag_end])

# Find hover text transitions on nav items
print("\n=== NAV ITEM STRUCTURE (Text Cycle) ===")
idx = c.find('Text Cycle')
if idx != -1:
    tag_start = c.rfind('<div', max(0, idx-200), idx)
    print(c[tag_start:tag_start+1000])

# Check transition: color .4s
print("\n=== COLOR TRANSITION STYLES ===")
for m in re.finditer(r'transition:color [^;]+', c):
    print(c[m.start():m.start()+100])

# Find product card hover
print("\n=== PRODUCT CARD STRUCTURE ===")
for m in re.finditer(r'data-framer-name="[^"]*[Pp]roduct', c):
    print(c[max(0,m.start()-30):m.start()+300])
    print()
