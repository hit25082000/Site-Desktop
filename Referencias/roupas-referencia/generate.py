import re

with open('index.html', 'r', encoding='utf-8') as f:
    original = f.read()

head_end = original.find('</head>') + 7
head = original[:head_end]

# Extract body tag
body_start = original.find('<body')
body_tag_end = original.find('>', body_start) + 1
body_tag = original[body_start:body_tag_end]

# Extract scripts at the end
last_script = original.rfind('<script')
scripts = original[last_script:]
scripts = scripts[:scripts.find('</body>')]

ds = f"""{head}
{body_tag}
<style>
  #__framer-badge-container, .__framer-badge {{ display:none!important; }}
  .ds-page {{ background:#000; color:#fff; font-family:'DM Sans',sans-serif; min-height:100vh; }}
  .ds-container {{ max-width:1200px; margin:0 auto; padding:60px 40px; }}
  .ds-header {{ text-align:center; padding:80px 40px; border-bottom:1px solid #222; }}
  .ds-header h1 {{ font-family:'Bricolage Grotesque',sans-serif; font-size:72px; font-weight:800; margin:0 0 12px; }}
  .ds-header p {{ color:#888; font-size:18px; margin:0; }}
  .ds-section {{ padding:60px 0; border-bottom:1px solid #222; }}
  .ds-section-title {{ font-family:'Bricolage Grotesque',sans-serif; font-size:36px; font-weight:800; margin:0 0 40px; display:flex; align-items:center; gap:12px; }}
  .ds-section-title span {{ font-size:14px; color:#555; font-family:'DM Sans'; font-weight:400; background:#111; padding:4px 12px; border-radius:100px; }}
  .ds-row {{ display:flex; gap:40px; flex-wrap:wrap; align-items:flex-start; }}
  .ds-card {{ flex:1; min-width:280px; background:#0a0a0a; border:1px solid #1a1a1a; border-radius:16px; padding:32px; }}
  .ds-card h3 {{ font-family:'Bricolage Grotesque',sans-serif; font-size:20px; font-weight:800; margin:0 0 24px; color:#ccc; }}
  .ds-label {{ font-size:12px; color:#555; font-family:monospace; margin:4px 0 0; }}
  .ds-swatch {{ height:100px; border-radius:12px; border:1px solid #222; margin-bottom:12px; }}
  .ds-swatch-name {{ font-size:14px; font-weight:600; margin:0; }}
  .ds-swatch-val {{ font-size:12px; color:#666; font-family:monospace; margin:2px 0 0; }}
  .ds-typo-row {{ display:flex; align-items:baseline; gap:30px; padding:20px 0; border-bottom:1px solid #111; }}
  .ds-typo-label {{ width:200px; flex-shrink:0; }}
  .ds-typo-label p {{ margin:0; color:#888; font-size:14px; }}

  /* Custom cursor demo */
  .ds-cursor-area {{ position:relative; height:300px; background:#111; border-radius:16px; overflow:hidden; cursor:none; display:flex; align-items:center; justify-content:center; }}
  .ds-cursor-area p {{ color:#555; font-size:14px; pointer-events:none; }}
  .ds-cursor {{ position:absolute; width:40px; height:40px; border:2px solid #fff; border-radius:50%; pointer-events:none; transform:translate(-50%,-50%); transition:transform .15s ease, width .3s, height .3s; }}
  .ds-cursor-dot {{ position:absolute; width:8px; height:8px; background:#fff; border-radius:50%; pointer-events:none; transform:translate(-50%,-50%); transition:transform .1s ease; }}
  .ds-cursor-area:hover .ds-cursor {{ width:50px; height:50px; }}
  .ds-cursor-area .ds-hover-target {{ width:120px; height:120px; background:#222; border-radius:12px; display:flex; align-items:center; justify-content:center; color:#888; font-size:12px; cursor:none; z-index:1; }}

  /* Hover effects */
  .ds-hover-btn {{ display:inline-flex; align-items:center; gap:8px; padding:14px 28px; border-radius:100px; font-size:16px; font-weight:600; cursor:pointer; transition:transform .3s cubic-bezier(.44,0,.56,1), background .3s, color .3s; font-family:'DM Sans'; }}
  .ds-hover-btn.primary {{ background:#fff; color:#000; border:none; }}
  .ds-hover-btn.primary:hover {{ transform:scale(.96); }}
  .ds-hover-btn.secondary {{ background:transparent; color:#fff; border:1px solid #fff; }}
  .ds-hover-btn.secondary:hover {{ background:#fff; color:#000; transform:scale(.96); }}
  .ds-hover-btn.secondary:hover svg {{ filter:invert(1); }}

  /* Text cycle animation (nav banner) */
  @keyframes ds-text-cycle {{ 0%,30% {{ opacity:1; transform:translateY(0); }} 33%,63% {{ opacity:0; transform:translateY(-100%); }} 66%,96% {{ opacity:0; transform:translateY(100%); }} 100% {{ opacity:1; transform:translateY(0); }} }}
  .ds-text-cycle {{ position:relative; height:24px; overflow:hidden; }}
  .ds-text-cycle span {{ position:absolute; width:100%; text-align:center; font-size:14px; font-family:'Mona Sans',sans-serif; letter-spacing:.5px; animation:ds-text-cycle 9s infinite; }}
  .ds-text-cycle span:nth-child(2) {{ animation-delay:-6s; }}
  .ds-text-cycle span:nth-child(3) {{ animation-delay:-3s; }}

  /* Carousel / Slider */
  .ds-carousel {{ position:relative; width:100%; height:500px; overflow:hidden; border-radius:16px; }}
  .ds-carousel-track {{ display:flex; width:300%; height:100%; animation:ds-slide 12s ease-in-out infinite; }}
  @keyframes ds-slide {{ 0%,28% {{ transform:translateX(0); }} 33%,61% {{ transform:translateX(-33.333%); }} 66%,95% {{ transform:translateX(-66.666%); }} 100% {{ transform:translateX(0); }} }}
  .ds-carousel-slide {{ flex:0 0 33.333%; height:100%; position:relative; }}
  .ds-carousel-slide img {{ width:100%; height:100%; object-fit:cover; }}
  .ds-carousel-slide .ds-slide-overlay {{ position:absolute; bottom:0; left:0; right:0; padding:40px; background:linear-gradient(transparent, rgba(0,0,0,.8)); }}
  .ds-carousel-slide .ds-slide-overlay h2 {{ font-family:'Bricolage Grotesque',sans-serif; font-size:48px; font-weight:800; margin:0; text-transform:uppercase; }}
  .ds-carousel-dots {{ display:flex; gap:8px; justify-content:center; margin-top:16px; }}
  .ds-carousel-dots span {{ width:8px; height:8px; border-radius:50%; background:#333; }}

  /* Product card hover */
  .ds-product {{ background:#111; border-radius:16px; overflow:hidden; cursor:pointer; transition:transform .4s cubic-bezier(.44,0,.56,1); }}
  .ds-product:hover {{ transform:scale(.98); }}
  .ds-product-img {{ overflow:hidden; aspect-ratio:1; }}
  .ds-product-img img {{ width:100%; height:100%; object-fit:cover; transition:transform .6s cubic-bezier(.44,0,.56,1); display:block; }}
  .ds-product:hover .ds-product-img img {{ transform:scale(1.08); }}
  .ds-product-info {{ padding:16px 20px; display:flex; justify-content:space-between; align-items:flex-end; }}
  .ds-product-info .left {{ display:flex; flex-direction:column; gap:4px; }}
  .ds-product-info .cat {{ font-size:11px; color:#888; text-transform:uppercase; letter-spacing:1px; }}
  .ds-product-info .name {{ font-size:16px; font-weight:600; text-transform:uppercase; }}
  .ds-product-info .price {{ font-size:16px; font-weight:600; }}
  .ds-product-info .arrow {{ font-size:18px; color:#888; transition:transform .3s; }}
  .ds-product:hover .arrow {{ transform:translate(2px,-2px); }}

  /* Color transition on nav links */
  .ds-nav-link {{ color:#888; font-size:16px; font-family:'Mona Sans',sans-serif; font-weight:500; text-decoration:none; transition:color .4s cubic-bezier(.44,0,.56,1); cursor:pointer; text-transform:uppercase; }}
  .ds-nav-link:hover {{ color:#fff; }}

  /* ── HERO ZOOM-OUT ───────────────────────────────────────────────── */
  .ds-hero {{ position:relative; width:100%; height:520px; overflow:hidden; border-radius:16px; }}
  .ds-hero-img {{ width:100%; height:100%; object-fit:cover;
    transform:scale(1.15);
    animation: ds-hero-zoom 1.8s cubic-bezier(.44,0,.56,1) forwards; }}
  @keyframes ds-hero-zoom {{ to {{ transform:scale(1); }} }}
  .ds-hero-overlay {{ position:absolute; inset:0; display:flex; flex-direction:column;
    justify-content:flex-end; padding:48px;
    background:linear-gradient(transparent 40%, rgba(0,0,0,.75)); }}
  .ds-hero-overlay h2 {{ font-family:'Bricolage Grotesque',sans-serif; font-size:64px;
    font-weight:800; margin:0; text-transform:uppercase;
    opacity:0; transform:translateY(30px);
    animation:ds-hero-text .9s .5s cubic-bezier(.44,0,.56,1) forwards; }}
  .ds-hero-overlay p {{ font-size:16px; color:rgba(255,255,255,.7); margin:10px 0 0;
    opacity:0; transform:translateY(20px);
    animation:ds-hero-text .9s .75s cubic-bezier(.44,0,.56,1) forwards; }}
  @keyframes ds-hero-text {{ to {{ opacity:1; transform:translateY(0); }} }}

  /* ── INFINITE MARQUEE ────────────────────────────────────────────── */
  .ds-marquee-wrap {{ overflow:hidden; width:100%; padding:8px 0; background:#000; }}
  .ds-marquee-track {{ display:flex; gap:16px; width:max-content;
    animation:ds-marquee 18s linear infinite; }}
  .ds-marquee-wrap:hover .ds-marquee-track {{ animation-play-state:paused; }}
  @keyframes ds-marquee {{ from {{ transform:translateX(0); }} to {{ transform:translateX(-50%); }} }}
  .ds-marquee-img {{ width:260px; height:340px; flex-shrink:0; border-radius:12px;
    object-fit:cover; transition:transform .4s cubic-bezier(.44,0,.56,1); }}
  .ds-marquee-img:hover {{ transform:scale(.97); }}

  /* ── SCROLL REVEAL ───────────────────────────────────────────────── */
  .ds-reveal {{ opacity:0; transform:translateY(48px);
    transition:opacity .7s cubic-bezier(.44,0,.56,1), transform .7s cubic-bezier(.44,0,.56,1); }}
  .ds-reveal.ds-visible {{ opacity:1; transform:translateY(0); }}
  .ds-reveal-grid {{ display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }}
  .ds-reveal-card {{ background:#111; border-radius:16px; overflow:hidden; cursor:pointer;
    transition:transform .4s cubic-bezier(.44,0,.56,1); }}
  .ds-reveal-card:hover {{ transform:scale(.98); }}
  .ds-reveal-card .img-wrap {{ overflow:hidden; aspect-ratio:.75; }}
  .ds-reveal-card .img-wrap img {{ width:100%; height:100%; object-fit:cover; display:block;
    transition:transform .6s cubic-bezier(.44,0,.56,1); }}
  .ds-reveal-card:hover .img-wrap img {{ transform:scale(1.08); }}
  .ds-reveal-card .info {{ padding:16px 20px; }}
  .ds-reveal-card .info .label {{ font-size:11px; color:#888; text-transform:uppercase; letter-spacing:1px; }}
  .ds-reveal-card .info .title {{ font-size:16px; font-weight:600; margin:4px 0 0; text-transform:uppercase; }}
</style>

<div class="ds-page">
  <div class="ds-header">
    <h1>Design System</h1>
    <p>Pattern Library &mdash; Axiom Ecommerce Template</p>
  </div>
  <div class="ds-container">

    <!-- SECTION 1: CAROUSEL -->
    <div class="ds-section">
      <h2 class="ds-section-title">Hero Carousel <span>@keyframes slide + mask gradient</span></h2>
      <div class="ds-carousel">
        <div class="ds-carousel-track">
          <div class="ds-carousel-slide">
            <img src="assets/8gqTSINX7hptd4ZpZhFcjP9JvhE_6a34607ffade.jpg" alt="Slide 1" />
            <div class="ds-slide-overlay"><h2>New Arrivals</h2></div>
          </div>
          <div class="ds-carousel-slide">
            <img src="assets/XKploSb7T2uX1ctVoUmRVVUBE_2f3c24446a59.jpg" alt="Slide 2" />
            <div class="ds-slide-overlay"><h2>Best Sellers</h2></div>
          </div>
          <div class="ds-carousel-slide">
            <img src="assets/6txSBkPhzyrFYoV59NZqRF3A_195cf5deb68a.jpg" alt="Slide 3" />
            <div class="ds-slide-overlay"><h2>Essentials</h2></div>
          </div>
        </div>
      </div>
      <div class="ds-carousel-dots"><span></span><span></span><span></span></div>
    </div>

    <!-- SECTION 2: CUSTOM CURSOR -->
    <div class="ds-section">
      <h2 class="ds-section-title">Custom Cursor <span>cursor:none + JS mouse follower</span></h2>
      <div class="ds-row">
        <div class="ds-card" style="flex:2; padding:0; overflow:hidden;">
          <div class="ds-cursor-area" id="cursorArea">
            <div class="ds-cursor" id="cursorRing"></div>
            <div class="ds-cursor-dot" id="cursorDot"></div>
            <div class="ds-hover-target">Hover me</div>
            <p style="position:absolute; bottom:16px;">Move your mouse in this area</p>
          </div>
        </div>
        <div class="ds-card" style="flex:1;">
          <h3>Specs</h3>
          <p style="color:#888; font-size:14px; line-height:1.8; margin:0;">
            <strong style="color:#fff;">Ring:</strong> 40px &rarr; 50px on hover<br>
            <strong style="color:#fff;">Border:</strong> 2px solid #fff<br>
            <strong style="color:#fff;">Dot:</strong> 8px filled #fff<br>
            <strong style="color:#fff;">Ring easing:</strong> 0.15s ease<br>
            <strong style="color:#fff;">Dot easing:</strong> 0.1s ease<br>
            <strong style="color:#fff;">Native cursor:</strong> hidden (cursor:none)
          </p>
        </div>
      </div>
    </div>

    <!-- SECTION 3: HOVER EFFECTS -->
    <div class="ds-section">
      <h2 class="ds-section-title">Hover Effects <span>transition .3s-.6s cubic-bezier(.44,0,.56,1)</span></h2>
      <div class="ds-row">
        <div class="ds-card">
          <h3>Buttons</h3>
          <div style="display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="color:#888; font-size:13px;">Primary</span>
              <button class="ds-hover-btn primary">Shop Now</button>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="color:#888; font-size:13px;">Secondary</span>
              <button class="ds-hover-btn secondary">Learn More &rarr;</button>
            </div>
          </div>
        </div>
        <div class="ds-card">
          <h3>Nav Links</h3>
          <div style="display:flex; gap:32px; padding:20px 0;">
            <a class="ds-nav-link">Shop</a>
            <a class="ds-nav-link">About</a>
            <a class="ds-nav-link">Journal</a>
            <a class="ds-nav-link">Contact</a>
          </div>
          <p class="ds-label">transition: color .4s cubic-bezier(.44,0,.56,1)</p>
        </div>
        <div class="ds-card">
          <h3>Text Cycle (Nav Banner)</h3>
          <div style="background:#000; padding:14px; border-radius:8px; border:1px solid #222;">
            <div class="ds-text-cycle">
              <span>FREE STANDARD SHIPPING ON ALL ORDERS</span>
              <span>20% OFF WITH PURCHASES OF $200 OR MORE</span>
              <span>NEW ARRIVALS EVERY WEEK</span>
            </div>
          </div>
          <p class="ds-label">animation: text-cycle 9s infinite</p>
        </div>
      </div>
    </div>

    <!-- SECTION 4: PRODUCT CARDS -->
    <div class="ds-section">
      <h2 class="ds-section-title">Product Cards <span>scale(.98) + img scale(1.05)</span></h2>
      <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:20px;">
        <div class="ds-product">
          <div class="ds-product-img"><img src="assets/ROJvRZzraJIPVF1E7Bjg21cwc_3125d48c3d54.jpg" alt="Product" /></div>
          <div class="ds-product-info"><div class="left"><span class="cat">Tops</span><span class="name">Freedom Graphic Tee</span></div><span class="price">85$</span><span class="arrow">&nearr;</span></div>
        </div>
        <div class="ds-product">
          <div class="ds-product-img"><img src="assets/XKploSb7T2uX1ctVoUmRVVUBE_2f3c24446a59.jpg" alt="Product" /></div>
          <div class="ds-product-info"><div class="left"><span class="cat">Tops</span><span class="name">Oversized Hoodie</span></div><span class="price">165$</span><span class="arrow">&nearr;</span></div>
        </div>
        <div class="ds-product">
          <div class="ds-product-img"><img src="assets/6txSBkPhzyrFYoV59NZqRF3A_195cf5deb68a.jpg" alt="Product" /></div>
          <div class="ds-product-info"><div class="left"><span class="cat">New</span><span class="name">Essential Crewneck</span></div><span class="price">120$</span><span class="arrow">&nearr;</span></div>
        </div>
      </div>
    </div>

    <!-- SECTION 5: TYPOGRAPHY -->
    <div class="ds-section">
      <h2 class="ds-section-title">Typography <span>Bricolage Grotesque + DM Sans + Mona Sans</span></h2>
      <div style="display:flex; flex-direction:column;">
        <div class="ds-typo-row">
          <div class="ds-typo-label"><p>Display H1</p><p class="ds-label">Bricolage Grotesque 800 / 100px</p></div>
          <div><h1 style="font-family:'Bricolage Grotesque',sans-serif; font-size:80px; font-weight:800; margin:0;">Axiom</h1></div>
        </div>
        <div class="ds-typo-row">
          <div class="ds-typo-label"><p>Heading H2</p><p class="ds-label">Bricolage Grotesque 800 / 54px</p></div>
          <div><h2 style="font-family:'Bricolage Grotesque',sans-serif; font-size:54px; font-weight:800; margin:0;">New Arrivals</h2></div>
        </div>
        <div class="ds-typo-row">
          <div class="ds-typo-label"><p>Nav Label</p><p class="ds-label">Mona Sans 500 / 18px / uppercase</p></div>
          <div><span style="font-family:'Mona Sans',sans-serif; font-size:18px; font-weight:500; text-transform:uppercase;">Shop Now</span></div>
        </div>
        <div class="ds-typo-row">
          <div class="ds-typo-label"><p>Body</p><p class="ds-label">DM Sans 400 / 18px</p></div>
          <div><p style="font-family:'DM Sans',sans-serif; font-size:18px; margin:0;">Premium e-commerce template designed for fashion and lifestyle brands.</p></div>
        </div>
        <div class="ds-typo-row">
          <div class="ds-typo-label"><p>Caption</p><p class="ds-label">DM Sans 400 / 14px</p></div>
          <div><p style="font-family:'DM Sans',sans-serif; font-size:14px; color:#888; margin:0;">Category &bull; Price &bull; Details</p></div>
        </div>
      </div>
    </div>

    <!-- SECTION 6: COLORS -->
    <div class="ds-section" style="border:none;">
      <h2 class="ds-section-title">Colors & Surfaces <span>CSS custom properties (tokens)</span></h2>
      <div style="display:grid; grid-template-columns:repeat(5,1fr); gap:24px;">
        <div><div class="ds-swatch" style="background:#000;"></div><p class="ds-swatch-name">Background</p><p class="ds-swatch-val">#000000</p></div>
        <div><div class="ds-swatch" style="background:#fff;"></div><p class="ds-swatch-name">Foreground</p><p class="ds-swatch-val">#FFFFFF</p></div>
        <div><div class="ds-swatch" style="background:#1c1c1c;"></div><p class="ds-swatch-name">Surface</p><p class="ds-swatch-val">#1C1C1C</p></div>
        <div><div class="ds-swatch" style="background:#7a7a7a;"></div><p class="ds-swatch-name">Muted</p><p class="ds-swatch-val">#7A7A7A</p></div>
        <div><div class="ds-swatch" style="background:#111;"></div><p class="ds-swatch-name">Card BG</p><p class="ds-swatch-val">#111111</p></div>
      </div>
    </div>

    <!-- SECTION 7: HERO ZOOM-OUT -->
    <div class="ds-section">
      <h2 class="ds-section-title">Hero Zoom-Out <span>@keyframes scale(1.15) → scale(1) + text fade-up</span></h2>
      <div class="ds-hero" id="dsHero">
        <img class="ds-hero-img" id="dsHeroImg" src="assets/8gqTSINX7hptd4ZpZhFcjP9JvhE_6a34607ffade.jpg" alt="Hero" />
        <div class="ds-hero-overlay">
          <h2>New Arrivals</h2>
          <p>Premium fashion &mdash; free shipping on all orders</p>
        </div>
      </div>
      <div style="margin-top:16px; display:flex; gap:32px;">
        <p class="ds-label">Image: scale(1.15) → scale(1) &nbsp;|&nbsp; duration: 1.8s &nbsp;|&nbsp; easing: cubic-bezier(.44,0,.56,1) &nbsp;|&nbsp; on page load</p>
        <button class="ds-hover-btn secondary" style="padding:8px 20px; font-size:13px;" onclick="document.getElementById('dsHeroImg').style.animation='none'; setTimeout(()=>{{ document.getElementById('dsHeroImg').style.animation='ds-hero-zoom 1.8s cubic-bezier(.44,0,.56,1) forwards'; }}, 50);">&#8635; Replay</button>
      </div>
    </div>

    <!-- SECTION 8: INFINITE MARQUEE -->
    <div class="ds-section">
      <h2 class="ds-section-title">Infinite Marquee Carousel <span>@keyframes translateX + continuous loop</span></h2>
      <div class="ds-marquee-wrap">
        <div class="ds-marquee-track">
          <img class="ds-marquee-img" src="assets/N6ausDEX6KQB23EM1R2C2UhNFk_6edb46d5274a.jpg" alt="" />
          <img class="ds-marquee-img" src="assets/ROJvRZzraJIPVF1E7Bjg21cwc_3125d48c3d54.jpg" alt="" />
          <img class="ds-marquee-img" src="assets/XKploSb7T2uX1ctVoUmRVVUBE_2f3c24446a59.jpg" alt="" />
          <img class="ds-marquee-img" src="assets/6txSBkPhzyrFYoV59NZqRF3A_195cf5deb68a.jpg" alt="" />
          <img class="ds-marquee-img" src="assets/ShqTo2F5a7sLxDmCPO2CSO76iQ_5982a259f887.jpg" alt="" />
          <img class="ds-marquee-img" src="assets/TITuLcYSx53fInKnsoSGfE8Xuw_aabcb9f2caa1.jpg" alt="" />
          <img class="ds-marquee-img" src="assets/rO3nueqqdzWMFmQMfScFEHQKDK8_19beef896888.jpg" alt="" />
          <img class="ds-marquee-img" src="assets/TzE4HV2Rd2nSnBPovKnaeVJ4ig_964fc4a91206.jpg" alt="" />
          <img class="ds-marquee-img" src="assets/Go8FgbJq5k83GEHQpJxfiOfyU_836ee63a5870.jpg" alt="" />
          <img class="ds-marquee-img" src="assets/tgZdGQSoxXaU1e2WoJLa4YQ_f6476b6e6f42.jpg" alt="" />
          <!-- duplicate for seamless loop -->
          <img class="ds-marquee-img" src="assets/N6ausDEX6KQB23EM1R2C2UhNFk_6edb46d5274a.jpg" alt="" />
          <img class="ds-marquee-img" src="assets/ROJvRZzraJIPVF1E7Bjg21cwc_3125d48c3d54.jpg" alt="" />
          <img class="ds-marquee-img" src="assets/XKploSb7T2uX1ctVoUmRVVUBE_2f3c24446a59.jpg" alt="" />
          <img class="ds-marquee-img" src="assets/6txSBkPhzyrFYoV59NZqRF3A_195cf5deb68a.jpg" alt="" />
          <img class="ds-marquee-img" src="assets/ShqTo2F5a7sLxDmCPO2CSO76iQ_5982a259f887.jpg" alt="" />
          <img class="ds-marquee-img" src="assets/TITuLcYSx53fInKnsoSGfE8Xuw_aabcb9f2caa1.jpg" alt="" />
          <img class="ds-marquee-img" src="assets/rO3nueqqdzWMFmQMfScFEHQKDK8_19beef896888.jpg" alt="" />
          <img class="ds-marquee-img" src="assets/TzE4HV2Rd2nSnBPovKnaeVJ4ig_964fc4a91206.jpg" alt="" />
          <img class="ds-marquee-img" src="assets/Go8FgbJq5k83GEHQpJxfiOfyU_836ee63a5870.jpg" alt="" />
          <img class="ds-marquee-img" src="assets/tgZdGQSoxXaU1e2WoJLa4YQ_f6476b6e6f42.jpg" alt="" />
        </div>
      </div>
      <p class="ds-label" style="margin-top:12px;">duration: 18s &nbsp;|&nbsp; easing: linear &nbsp;|&nbsp; loop: infinite &nbsp;|&nbsp; hover: paused &nbsp;|&nbsp; track duplicated for seamless loop</p>
    </div>

    <!-- SECTION 9: SCROLL REVEAL -->
    <div class="ds-section" style="border:none;">
      <h2 class="ds-section-title">Scroll Reveal <span>IntersectionObserver + translateY(48px) → translateY(0) + opacity</span></h2>
      <p style="color:#888; font-size:14px; margin:-20px 0 32px;">Scroll down slowly to see cards animate in. Each card has a staggered delay.</p>
      <div class="ds-reveal-grid">
        <div class="ds-reveal" style="transition-delay:.0s;">
          <div class="ds-reveal-card">
            <div class="img-wrap"><img src="assets/dVQplzo9TYGR0ic60Unw0TJjI_df083e763e85.jpg" alt="" /></div>
            <div class="info"><span class="label">Tops</span><p class="title">Freedom Graphic Tee</p></div>
          </div>
        </div>
        <div class="ds-reveal" style="transition-delay:.12s;">
          <div class="ds-reveal-card">
            <div class="img-wrap"><img src="assets/WCPUxU8le7cGYEMic8GQuKrQTLI_f1f54866caa0.jpg" alt="" /></div>
            <div class="info"><span class="label">Bottoms</span><p class="title">Cargo Utility Pants</p></div>
          </div>
        </div>
        <div class="ds-reveal" style="transition-delay:.24s;">
          <div class="ds-reveal-card">
            <div class="img-wrap"><img src="assets/D9XYlok0cgs0AR1T9UYgXebum4_87ec485b5374.jpg" alt="" /></div>
            <div class="info"><span class="label">New</span><p class="title">Oversized Hoodie</p></div>
          </div>
        </div>
        <div class="ds-reveal" style="transition-delay:.36s;">
          <div class="ds-reveal-card">
            <div class="img-wrap"><img src="assets/JLuOpABriYGXchTXxdkShIj4_987c8d4e4714.jpg" alt="" /></div>
            <div class="info"><span class="label">Tops</span><p class="title">Essentials Tee</p></div>
          </div>
        </div>
        <div class="ds-reveal" style="transition-delay:.48s;">
          <div class="ds-reveal-card">
            <div class="img-wrap"><img src="assets/CCsJVhIWqk5Kd4IoA0guLflP7hg_07429a8a3ff0.jpg" alt="" /></div>
            <div class="info"><span class="label">Best Seller</span><p class="title">Graphic Crewneck</p></div>
          </div>
        </div>
        <div class="ds-reveal" style="transition-delay:.60s;">
          <div class="ds-reveal-card">
            <div class="img-wrap"><img src="assets/eVYdtpXA14mNqOPaTCQwQHElY_b7d817264649.jpg" alt="" /></div>
            <div class="info"><span class="label">New</span><p class="title">Classic Windbreaker</p></div>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>

<script>
// Custom cursor JS
const area = document.getElementById('cursorArea');
const ring = document.getElementById('cursorRing');
const dot = document.getElementById('cursorDot');
if (area && ring && dot) {{
  area.addEventListener('mousemove', (e) => {{
    const rect = area.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ring.style.left = x + 'px';
    ring.style.top = y + 'px';
    dot.style.left = x + 'px';
    dot.style.top = y + 'px';
  }});
  area.addEventListener('mouseenter', () => {{
    ring.style.opacity = '1';
    dot.style.opacity = '1';
  }});
  area.addEventListener('mouseleave', () => {{
    ring.style.opacity = '0';
    dot.style.opacity = '0';
  }});
  ring.style.opacity = '0';
  dot.style.opacity = '0';
}}

// Scroll reveal — IntersectionObserver
const revealEls = document.querySelectorAll('.ds-reveal');
if ('IntersectionObserver' in window) {{
  const io = new IntersectionObserver((entries) => {{
    entries.forEach(entry => {{
      if (entry.isIntersecting) {{
        entry.target.classList.add('ds-visible');
        io.unobserve(entry.target);
      }}
    }});
  }}, {{ threshold: 0.15 }});
  revealEls.forEach(el => io.observe(el));
}}
</script>
{scripts}
</body>
</html>
"""

with open('design-system.html', 'w', encoding='utf-8') as f:
    f.write(ds)

print("design-system.html generated successfully!")
