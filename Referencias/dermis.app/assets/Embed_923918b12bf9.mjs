import{t as e}from"./rolldown-runtime.rCxdvAvM.mjs";import{A as t,D as n,I as r,L as i,M as a,P as o,R as s,l as c,s as l,w as u}from"./react.D4hXY0t5.mjs";import{A as d,C as f,X as p,a as m,ft as h}from"./framer.fozFRjgk.mjs";var g,_,v,y=e((()=>{p(),g={position:`relative`,width:`100%`,height:`100%`,display:`flex`,justifyContent:`center`,alignItems:`center`},_={...g,borderRadius:6,background:`rgba(136, 85, 255, 0.3)`,color:`#85F`,border:`1px dashed #85F`,flexDirection:`column`},v={onClick:{type:m.EventHandler},onMouseEnter:{type:m.EventHandler},onMouseLeave:{type:m.EventHandler}},m.Number,m.Boolean,m.String,m.Enum}));function b(e,t){return S(!0,e,t)}function x(e,t){return S(!1,e,t)}function S(e,t,n=!0){let r=h();a(()=>{n&&r===e&&t()},[r])}var ee=e((()=>{p(),u()})),C=e((()=>{u()})),w=e((()=>{p()})),T=e((()=>{p()})),E=e((()=>{u()})),D=e((()=>{p()})),O,k,te=e((()=>{r(),u(),O=()=>{if(i!==void 0){let e=i.userAgent.toLowerCase();return(e.indexOf(`safari`)>-1||e.indexOf(`framermobile`)>-1||e.indexOf(`framerx`)>-1)&&e.indexOf(`chrome`)<0}else return!1},k=()=>t(()=>O(),[])})),ne=e((()=>{u(),T()})),re=e((()=>{u(),p(),T(),C()})),ie=e((()=>{p(),u(),y()}));function A(){return t(()=>f.current(),[])}function j(){return t(()=>f.current()===f.canvas,[])}var M=e((()=>{u(),p()})),N=e((()=>{u()}));function P(e){let{borderRadius:n,isMixedBorderRadius:r,topLeftRadius:i,topRightRadius:a,bottomRightRadius:o,bottomLeftRadius:s}=e;return t(()=>r?`${i}px ${a}px ${o}px ${s}px`:`${n}px`,[n,r,i,a,o,s])}var F,I=e((()=>{u(),p(),F={borderRadius:{title:`Radius`,type:m.FusedNumber,toggleKey:`isMixedBorderRadius`,toggleTitles:[`Radius`,`Radius per corner`],valueKeys:[`topLeftRadius`,`topRightRadius`,`bottomRightRadius`,`bottomLeftRadius`],valueLabels:[`TL`,`TR`,`BR`,`BL`],min:0}},m.FusedNumber})),L=e((()=>{y(),ee(),C(),w(),T(),E(),D(),te(),ne(),re(),ie(),M(),N(),I()})),R=e((()=>{L()}));function z({type:e,url:t,html:n,zoom:r,radius:i,border:a,style:o={}}){return e===`url`&&t?c(V,{url:t,zoom:r,radius:i,border:a,style:o}):e===`html`&&n?c(U,{html:n,style:o}):c(B,{style:o})}function B({style:e}){return c(`div`,{style:{minHeight:X(e),..._,overflow:`hidden`,...e},children:c(`div`,{style:$,children:`To embed a website or widget, add it to the properties\xA0panel.`})})}function V({url:e,zoom:t,radius:n,border:r,style:i}){let s=!i.height;/[a-z]+:\/\//.test(e)||(e=`https://`+e);let l=j(),[u,d]=o(l?void 0:!1);return a(()=>{if(!l)return;let t=!0;d(void 0);async function n(){let n=await fetch(`https://api.framer.com/functions/check-iframe-url?url=`+encodeURIComponent(e));if(n.status==200){let{isBlocked:e}=await n.json();t&&d(e)}else{let e=await n.text();console.error(e),d(Error(`This site can’t be reached.`))}}return n().catch(e=>{console.error(e),d(e)}),()=>{t=!1}},[e]),l&&s?c(Y,{message:`URL embeds do not support auto height.`,style:i}):e.startsWith(`https://`)?u===void 0?c(J,{}):u instanceof Error?c(Y,{message:u.message,style:i}):u===!0?c(Y,{message:`Can’t embed ${e} due to its content security policy.`,style:i}):c(`iframe`,{src:e,style:{...Z,...i,...r,zoom:t,borderRadius:n,transformOrigin:`top center`},loading:`lazy`,fetchPriority:l?`low`:`auto`,referrerPolicy:`no-referrer`,sandbox:H(l),allowFullScreen:!0,allow:`presentation; fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; clipboard-write`}):c(Y,{message:`Unsupported protocol.`,style:i})}function H(e){let t=[`allow-same-origin`,`allow-scripts`];return e||t.push(`allow-downloads`,`allow-forms`,`allow-modals`,`allow-orientation-lock`,`allow-pointer-lock`,`allow-popups`,`allow-popups-to-escape-sandbox`,`allow-presentation`,`allow-storage-access-by-user-activation`,`allow-top-navigation-by-user-activation`),t.join(` `)}function U({html:e,...t}){if(e.includes(`<\/script>`)){let n=e.includes(`</spline-viewer>`),r=e.includes(`<!-- framer-direct-embed -->`);return c(n||r?G:W,{html:e,...t})}return c(K,{html:e,...t})}function W({html:e,style:t}){let r=n(),[i,l]=o(0);a(()=>{let e=r.current?.contentWindow;function t(t){if(t.source!==e)return;let n=t.data;if(typeof n!=`object`||!n)return;let r=n.embedHeight;typeof r==`number`&&l(r)}return s.addEventListener(`message`,t),e?.postMessage(`getEmbedHeight`,`*`),()=>{s.removeEventListener(`message`,t)}},[]);let u=`
<html>
    <head>
        <style>
            html, body {
                margin: 0;
                padding: 0;
            }

            body {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            :root {
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }

            * {
                box-sizing: border-box;
                -webkit-font-smoothing: inherit;
            }

            h1, h2, h3, h4, h5, h6, p, figure {
                margin: 0;
            }

            body, input, textarea, select, button {
                font-size: 12px;
                font-family: sans-serif;
            }
        </style>
    </head>
    <body>
        ${e}
        <script type="module">
            let height = 0

            function sendEmbedHeight() {
                window.parent.postMessage({
                    embedHeight: height
                }, "*")
            }

            const observer = new ResizeObserver((entries) => {
                if (entries.length !== 1) return
                const entry = entries[0]
                if (entry.target !== document.body) return

                height = entry.contentRect.height
                sendEmbedHeight()
            })

            observer.observe(document.body)

            window.addEventListener("message", (event) => {
                if (event.source !== window.parent) return
                if (event.data !== "getEmbedHeight") return
                sendEmbedHeight()
            })
        <\/script>
    <body>
</html>
`,d={...Z,...t};return t.height||(d.height=i+`px`),c(`iframe`,{ref:r,style:d,srcDoc:u})}function G({html:e,style:t}){let r=n();return a(()=>{let t=r.current;if(t)return t.innerHTML=e,q(t),()=>{t.innerHTML=``}},[e]),c(`div`,{ref:r,style:{...Q,...t}})}function K({html:e,style:t}){return c(`div`,{style:{...Q,...t},dangerouslySetInnerHTML:{__html:e}})}function q(e){if(e instanceof Element&&e.tagName===`SCRIPT`){let t=document.createElement(`script`);t.text=e.innerHTML;for(let{name:n,value:r}of e.attributes)t.setAttribute(n,r);e.parentElement.replaceChild(t,e)}else for(let t of e.childNodes)q(t)}function J(){return c(`div`,{className:`framerInternalUI-componentPlaceholder`,style:{...g,overflow:`hidden`},children:c(`div`,{style:$,children:`Loading…`})})}function Y({message:e,style:t}){return c(`div`,{className:`framerInternalUI-errorPlaceholder`,style:{minHeight:X(t),...g,overflow:`hidden`,...t},children:c(`div`,{style:$,children:e})})}function X(e){if(!e.height)return 200}var Z,Q,$,ae=e((()=>{r(),l(),u(),p(),R(),d(z,{type:{type:m.Enum,defaultValue:`url`,displaySegmentedControl:!0,options:[`url`,`html`],optionTitles:[`URL`,`HTML`]},url:{title:`URL`,type:m.String,description:`Some websites don’t support embedding.`,hidden(e){return e.type!==`url`}},html:{title:`HTML`,type:m.String,displayTextArea:!0,hidden(e){return e.type!==`html`}},border:{title:`Border`,type:m.Border,optional:!0,hidden(e){return e.type!==`url`}},radius:{type:m.BorderRadius,title:`Radius`,hidden(e){return e.type!==`url`}},zoom:{title:`Zoom`,defaultValue:1,type:m.Number,hidden(e){return e.type!==`url`},min:.1,max:1,step:.1,displayStepper:!0}}),Z={width:`100%`,height:`100%`,border:`none`},Q={width:`100%`,height:`100%`,display:`flex`,flexDirection:`column`,justifyContent:`center`,alignItems:`center`},$={textAlign:`center`,minWidth:140}}));export{P as a,k as c,v as d,F as i,b as l,ae as n,j as o,L as r,A as s,z as t,x as u};
//# sourceMappingURL=Embed.BSPqZpyy.mjs.map