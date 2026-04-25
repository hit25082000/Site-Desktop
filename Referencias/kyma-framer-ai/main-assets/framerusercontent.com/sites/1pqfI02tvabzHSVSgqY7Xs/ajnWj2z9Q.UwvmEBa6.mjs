import{t as e}from"./rolldown-runtime.BnksoydZ.mjs";import{B as t,I as n,M as r,N as i,P as a,T as o,V as s,_ as c,g as l,k as u,l as d,s as f,u as p,z as m}from"./react.DIoB3sI9.mjs";import{T as h,V as g,t as _}from"./motion.B2ZpmrrC.mjs";import{B as v,L as y,Mt as b,Pt as x,V as ee,k as te,rt as S,s as C}from"./framer.DDStTqeA.mjs";var w,T,E,D,O,k,A,j,ne=e((()=>{f(),S(),o(),w=`var(--framer-icon-mask)`,T=c(function(e,t){return d(`svg`,{...e,ref:t,children:e.children})}),E=h.create(T),D=c((e,t)=>{let{animated:n,layoutId:r,children:i,...a}=e;return n?d(E,{...a,layoutId:r,ref:t,children:i}):d(`svg`,{...a,ref:t,children:i})}),O=`<svg display="block" role="presentation" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M 0 0 L 0 6 L 4 8" fill="transparent" height="8px" id="PhFs3K2us" stroke-dasharray="" stroke-linecap="round" stroke-linejoin="round" stroke-width="var(--js9iwy, 2)" stroke="var(--1m973uw, rgb(0,0,0))" transform="translate(12 6)" width="4px"/><path d="M 0 10 C 0 4.477 4.477 0 10 0 C 15.523 0 20 4.477 20 10 C 20 15.523 15.523 20 10 20 C 4.477 20 0 15.523 0 10 Z" fill="transparent" height="20px" id="kUxDxoWdG" stroke-dasharray="" stroke-linecap="round" stroke-linejoin="round" stroke-width="var(--js9iwy, 2)" stroke="var(--1m973uw, rgb(0,0,0))" transform="translate(2 2)" width="20px"/></svg>`,k=({color:e,height:t,id:n,width:r,width1:i,...a})=>({...a,JEeZYcamG:i??a.JEeZYcamG??2,P_DcoRcrY:e??a.P_DcoRcrY??`rgb(0, 0, 0)`}),A=x(c(function(e,t){let{style:n,className:r,layoutId:i,variant:a,P_DcoRcrY:o,JEeZYcamG:s,...c}=k(e),l=b(`3649108714`,O);return d(D,{...c,className:v(`framer-JYolC`,r),layoutId:i,ref:t,role:`presentation`,style:{"--1m973uw":o,"--js9iwy":s,...n},viewBox:`0 0 24 24`,children:d(`use`,{href:l})})}),[`.framer-JYolC { -webkit-mask: ${w}; aspect-ratio: 1; display: block; mask: ${w}; width: 24px; }`],`framer-JYolC`),A.displayName=`Clock`,j=A,y(A,{P_DcoRcrY:{defaultValue:`rgb(0, 0, 0)`,hidden:!1,title:`Color`,type:C.Color},JEeZYcamG:{defaultValue:2,displayStepper:!0,hidden:!1,max:16,min:1,title:`Width`,type:C.Number}})}));function M(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function N(e,t,n){let r=e.createShader(t);return r?(e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(e.deleteShader(r),null)):null}function P(e){if(Array.isArray(e))return e.length===4?e:e.length===3?[...e,1]:W;if(typeof e!=`string`)return W;let t,n,r,i=1;if(e.startsWith(`#`))[t,n,r,i]=function(e){return(e=e.replace(/^#/,``)).length===3&&(e=e.split(``).map(e=>e+e).join(``)),e.length===6&&(e+=`ff`),[parseInt(e.slice(0,2),16)/255,parseInt(e.slice(2,4),16)/255,parseInt(e.slice(4,6),16)/255,parseInt(e.slice(6,8),16)/255]}(e);else if(e.startsWith(`rgb`))[t,n,r,i]=function(e){let t=e.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+))?\s*\)$/i);return t?[parseInt(t[1]??`0`)/255,parseInt(t[2]??`0`)/255,parseInt(t[3]??`0`)/255,t[4]===void 0?1:parseFloat(t[4])]:[0,0,0,1]}(e);else{if(!e.startsWith(`hsl`))return W;[t,n,r,i]=function(e){let[t,n,r,i]=e,a=t/360,o=n/100,s=r/100,c,l,u;if(n===0)c=l=u=s;else{let e=(e,t,n)=>(n<0&&(n+=1),n>1&&--n,n<1/6?e+6*(t-e)*n:n<.5?t:n<2/3?e+(t-e)*(2/3-n)*6:e),t=s<.5?s*(1+o):s+o-s*o,n=2*s-t;c=e(n,t,a+1/3),l=e(n,t,a),u=e(n,t,a-1/3)}return[c,l,u,i]}(function(e){let t=e.match(/^hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*([0-9.]+))?\s*\)$/i);return t?[parseInt(t[1]??`0`),parseInt(t[2]??`0`),parseInt(t[3]??`0`),t[4]===void 0?1:parseFloat(t[4])]:[0,0,0,1]}(e))}return[U(t,0,1),U(n,0,1),U(r,0,1),U(i,0,1)]}function re(e){let t=u(void 0),n=i(t=>{let n=e.map(e=>{if(e!=null){if(typeof e==`function`){let n=e,r=n(t);return typeof r==`function`?r:()=>{n(null)}}return e.current=t,()=>{e.current=null}}});return()=>{n.forEach(e=>e?.())}},e);return r(()=>e.every(e=>e==null)?null:e=>{t.current&&=(t.current(),void 0),e!=null&&(t.current=n(e))},e)}async function F(e){let t={},n=[];return Object.entries(e).forEach(([e,r])=>{if(typeof r==`string`){if(!(e=>{try{return e.startsWith(`/`)||new URL(e),!0}catch{return!1}})(r))return;let i=new Promise((n,i)=>{let a=new Image;(e=>{try{return!e.startsWith(`/`)&&new URL(e,s.location.origin).origin!==s.location.origin}catch{return!1}})(r)&&(a.crossOrigin=`anonymous`),a.onload=()=>{t[e]=a,n()},a.onerror=()=>{i()},a.src=r});n.push(i)}else t[e]=r}),await Promise.all(n),t}var I,L,R,z,B,V,H,U,W,G,K,q,ie=e((()=>{m(),o(),f(),I=class{constructor(e,n,r,i,a=0,o=0,c=2,l=8294400){if(M(this,`parentElement`,void 0),M(this,`canvasElement`,void 0),M(this,`gl`,void 0),M(this,`program`,null),M(this,`uniformLocations`,{}),M(this,`fragmentShader`,void 0),M(this,`rafId`,null),M(this,`lastRenderTime`,0),M(this,`totalFrameTime`,0),M(this,`speed`,0),M(this,`providedUniforms`,void 0),M(this,`hasBeenDisposed`,!1),M(this,`resolutionChanged`,!0),M(this,`textures`,new Map),M(this,`minPixelRatio`,void 0),M(this,`maxPixelCount`,void 0),M(this,`isSafari`,function(){let e=t.userAgent.toLowerCase();return e.includes(`safari`)&&!e.includes(`chrome`)&&!e.includes(`android`)}()),M(this,`initProgram`,()=>{let e=function(e,t,n){let r=N(e,e.VERTEX_SHADER,t),i=N(e,e.FRAGMENT_SHADER,n);if(!r||!i)return null;let a=e.createProgram();return a?(e.attachShader(a,r),e.attachShader(a,i),e.linkProgram(a),e.getProgramParameter(a,e.LINK_STATUS)?(e.detachShader(a,r),e.detachShader(a,i),e.deleteShader(r),e.deleteShader(i),a):(e.deleteProgram(a),e.deleteShader(r),e.deleteShader(i),null)):null}(this.gl,L,this.fragmentShader);e&&(this.program=e)}),M(this,`setupPositionAttribute`,()=>{let e=this.gl.getAttribLocation(this.program,`a_position`),t=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,t),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),this.gl.STATIC_DRAW),this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0)}),M(this,`setupUniforms`,()=>{let e={u_time:this.gl.getUniformLocation(this.program,`u_time`),u_pixelRatio:this.gl.getUniformLocation(this.program,`u_pixelRatio`),u_resolution:this.gl.getUniformLocation(this.program,`u_resolution`)};Object.entries(this.providedUniforms).forEach(([t,n])=>{if(e[t]=this.gl.getUniformLocation(this.program,t),n instanceof HTMLImageElement){let n=`${t}_aspect_ratio`;e[n]=this.gl.getUniformLocation(this.program,n)}}),this.uniformLocations=e}),M(this,`renderScale`,1),M(this,`parentWidth`,0),M(this,`parentHeight`,0),M(this,`resizeObserver`,null),M(this,`setupResizeObserver`,()=>{this.resizeObserver=new ResizeObserver(([e])=>{e?.borderBoxSize[0]&&(this.parentWidth=e.borderBoxSize[0].inlineSize,this.parentHeight=e.borderBoxSize[0].blockSize),this.handleResize()}),this.resizeObserver.observe(this.parentElement),visualViewport?.addEventListener(`resize`,this.handleVisualViewportChange);let e=this.parentElement.getBoundingClientRect();this.parentWidth=e.width,this.parentHeight=e.height,this.handleResize()}),M(this,`resizeRafId`,null),M(this,`handleVisualViewportChange`,()=>{this.resizeRafId!==null&&cancelAnimationFrame(this.resizeRafId),this.resizeRafId=requestAnimationFrame(()=>{this.resizeRafId=requestAnimationFrame(()=>{this.handleResize()})})}),M(this,`handleResize`,()=>{this.resizeRafId!==null&&cancelAnimationFrame(this.resizeRafId);let e=visualViewport?.scale??1,t=visualViewport?visualViewport.width*visualViewport.scale:s.innerWidth,n=Math.round(1e4*s.outerWidth/t)/1e4,r=this.isSafari?devicePixelRatio:devicePixelRatio/n,i=Math.max(r,this.minPixelRatio)*n*e,a=this.parentWidth*i,o=this.parentHeight*i,c=Math.sqrt(this.maxPixelCount)/Math.sqrt(a*o),l=i*Math.min(1,c),u=Math.round(this.parentWidth*l),d=Math.round(this.parentHeight*l);this.canvasElement.width===u&&this.canvasElement.height===d&&this.renderScale===l||(this.renderScale=l,this.canvasElement.width=u,this.canvasElement.height=d,this.resolutionChanged=!0,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.render(performance.now()))}),M(this,`render`,e=>{if(this.hasBeenDisposed||this.program===null)return;let t=e-this.lastRenderTime;this.lastRenderTime=e,this.speed!==0&&(this.totalFrameTime+=t*this.speed),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.useProgram(this.program),this.gl.uniform1f(this.uniformLocations.u_time,.001*this.totalFrameTime),this.resolutionChanged&&=(this.gl.uniform2f(this.uniformLocations.u_resolution,this.gl.canvas.width,this.gl.canvas.height),this.gl.uniform1f(this.uniformLocations.u_pixelRatio,this.renderScale),!1),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.speed===0?this.rafId=null:this.requestRender()}),M(this,`requestRender`,()=>{this.rafId!==null&&cancelAnimationFrame(this.rafId),this.rafId=requestAnimationFrame(this.render)}),M(this,`setTextureUniform`,(e,t)=>{if(!t.complete||t.naturalWidth===0)throw Error(`Paper Shaders: image for uniform ${e} must be fully loaded`);let n=this.textures.get(e);n&&this.gl.deleteTexture(n);let r=this.gl.createTexture();if(this.gl.bindTexture(this.gl.TEXTURE_2D,r),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.REPEAT),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.REPEAT),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,t),this.gl.getError()!==this.gl.NO_ERROR||r===null)return;this.textures.set(e,r);let i=this.uniformLocations[e];if(i){let n=this.textures.size-1;this.gl.useProgram(this.program),this.gl.activeTexture(this.gl.TEXTURE0+n),this.gl.bindTexture(this.gl.TEXTURE_2D,r),this.gl.uniform1i(i,n);let a=`${e}_aspect_ratio`,o=this.uniformLocations[a];if(o){let e=t.naturalWidth/t.naturalHeight;this.gl.uniform1f(o,e)}}}),M(this,`setUniformValues`,e=>{this.gl.useProgram(this.program),Object.entries(e).forEach(([e,t])=>{let n=this.uniformLocations[e];if(n)if(t instanceof HTMLImageElement)this.setTextureUniform(e,t);else if(Array.isArray(t)){let e=null,r=null;if(t[0]!==void 0&&Array.isArray(t[0])){let n=t[0].length;if(!t.every(e=>e.length===n))return;e=t.flat(),r=n}else e=t,r=e.length;switch(r){case 2:this.gl.uniform2fv(n,e);break;case 3:this.gl.uniform3fv(n,e);break;case 4:this.gl.uniform4fv(n,e);break;case 9:this.gl.uniformMatrix3fv(n,!1,e);break;case 16:this.gl.uniformMatrix4fv(n,!1,e)}}else typeof t==`number`?this.gl.uniform1f(n,t):typeof t==`boolean`&&this.gl.uniform1i(n,t?1:0)})}),M(this,`getCurrentFrameTime`,()=>this.totalFrameTime),M(this,`setFrame`,e=>{this.totalFrameTime=e,this.lastRenderTime=performance.now(),this.render(performance.now())}),M(this,`setSpeed`,(e=1)=>{this.speed=e,this.rafId===null&&e!==0&&(this.lastRenderTime=performance.now(),this.rafId=requestAnimationFrame(this.render)),this.rafId!==null&&e===0&&(cancelAnimationFrame(this.rafId),this.rafId=null)}),M(this,`setUniforms`,e=>{this.providedUniforms={...this.providedUniforms,...e},this.setUniformValues(e),this.render(performance.now())}),M(this,`dispose`,()=>{this.hasBeenDisposed=!0,this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.gl&&this.program&&(this.textures.forEach(e=>{this.gl.deleteTexture(e)}),this.textures.clear(),this.gl.deleteProgram(this.program),this.program=null,this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,null),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,null),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.getError()),this.resizeObserver&&=(this.resizeObserver.disconnect(),null),visualViewport?.removeEventListener(`resize`,this.handleVisualViewportChange),this.uniformLocations={},this.parentElement.paperShaderMount=void 0}),!(e instanceof HTMLElement))throw Error(`Paper Shaders: parent element must be an HTMLElement`);if(this.parentElement=e,!document.querySelector(`style[data-paper-shaders]`)){let e=document.createElement(`style`);e.innerHTML=R,e.setAttribute(`data-paper-shaders`,``),document.head.prepend(e)}let u=document.createElement(`canvas`);this.canvasElement=u,this.parentElement.prepend(u),this.fragmentShader=n,this.providedUniforms=r,this.totalFrameTime=o,this.minPixelRatio=c,this.maxPixelCount=l;let d=u.getContext(`webgl2`,i);if(!d)throw Error(`Paper Shaders: WebGL is not supported in this browser`);this.gl=d,this.initProgram(),this.setupPositionAttribute(),this.setupUniforms(),this.setUniformValues(this.providedUniforms),this.setupResizeObserver(),this.setSpeed(a),this.parentElement.setAttribute(`data-paper-shaders`,``),this.parentElement.paperShaderMount=this}},L=`#version 300 es
layout(location = 0) in vec4 a_position;

uniform vec2 u_resolution;
uniform float u_pixelRatio;

uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;

uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

uniform float u_pxSize;

out vec2 v_objectUV;
out vec2 v_objectBoxSize;
out vec2 v_objectHelperBox;

out vec2 v_responsiveUV;
out vec2 v_responsiveBoxSize;
out vec2 v_responsiveHelperBox;
out vec2 v_responsiveBoxGivenSize;

out vec2 v_patternUV;
out vec2 v_patternBoxSize;
out vec2 v_patternHelperBox;

// #define ADD_HELPERS

vec3 getBoxSize(float boxRatio, vec2 givenBoxSize, vec2 maxBoxSize) {
  vec2 box = vec2(0.);
  // fit = none
  box.x = boxRatio * min(givenBoxSize.x / boxRatio, givenBoxSize.y);
  float noFitBoxWidth = box.x;
  if (u_fit == 1.) { // fit = contain
    box.x = boxRatio * min(maxBoxSize[0] / boxRatio, maxBoxSize[1]);
  } else if (u_fit == 2.) { // fit = cover
    box.x = boxRatio * max(maxBoxSize[0] / boxRatio, maxBoxSize[1]);
  }
  box.y = box.x / boxRatio;
  return vec3(box, noFitBoxWidth);
}

void main() {
  gl_Position = a_position;

  vec2 uv = gl_Position.xy * .5;
  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
  vec2 maxBoxSize = vec2(max(u_resolution.x, givenBoxSize.x), max(u_resolution.y, givenBoxSize.y));
  float r = u_rotation * 3.14159265358979323846 / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);


  // ===================================================
  // Sizing api for graphic objects with fixed ratio
  // (currently supports only ratio = 1)

  float fixedRatio = 1.;
  vec2 fixedRatioBoxGivenSize = vec2(
    (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
    (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );

  v_objectBoxSize = getBoxSize(fixedRatio, fixedRatioBoxGivenSize, maxBoxSize).xy;
  vec2 objectWorldScale = u_resolution.xy / v_objectBoxSize;

  #ifdef ADD_HELPERS
    v_objectHelperBox = uv;
    v_objectHelperBox *= objectWorldScale;
    v_objectHelperBox += boxOrigin * (objectWorldScale - 1.);
  #endif

  v_objectUV = uv;
  v_objectUV *= objectWorldScale;
  v_objectUV += boxOrigin * (objectWorldScale - 1.);
  v_objectUV += graphicOffset;
  v_objectUV /= u_scale;
  v_objectUV = graphicRotation * v_objectUV;


  // ===================================================


  // ===================================================
  // Sizing api for graphic objects with either givenBoxSize ratio or canvas ratio.
  // Full-screen mode available with u_worldWidth = u_worldHeight = 0

  v_responsiveBoxGivenSize = vec2(
    (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
    (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  float responsiveRatio = v_responsiveBoxGivenSize.x / v_responsiveBoxGivenSize.y;
  v_responsiveBoxSize = getBoxSize(responsiveRatio, v_responsiveBoxGivenSize, maxBoxSize).xy;
  vec2 responsiveBoxScale = u_resolution.xy / v_responsiveBoxSize;

  #ifdef ADD_HELPERS
    v_responsiveHelperBox = uv;
    v_responsiveHelperBox *= responsiveBoxScale;
    v_responsiveHelperBox += boxOrigin * (responsiveBoxScale - 1.);
  #endif

  v_responsiveUV = uv;
  v_responsiveUV *= responsiveBoxScale;
  v_responsiveUV += boxOrigin * (responsiveBoxScale - 1.);
  v_responsiveUV += graphicOffset;
  v_responsiveUV /= u_scale;
  v_responsiveUV.x *= responsiveRatio;
  v_responsiveUV = graphicRotation * v_responsiveUV;
  v_responsiveUV.x /= responsiveRatio;

  // ===================================================


  // ===================================================
  // Sizing api for patterns
  // (treating graphics as a image u_worldWidth x u_worldHeight size)

  float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
  vec2 patternBoxGivenSize = vec2(
    (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
    (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  patternBoxRatio = patternBoxGivenSize.x / patternBoxGivenSize.y;

  vec3 boxSizeData = getBoxSize(patternBoxRatio, patternBoxGivenSize, maxBoxSize);
  v_patternBoxSize = boxSizeData.xy;
  float patternBoxNoFitBoxWidth = boxSizeData.z;
  vec2 patternBoxScale = u_resolution.xy / v_patternBoxSize;

  #ifdef ADD_HELPERS
    v_patternHelperBox = uv;
    v_patternHelperBox *= patternBoxScale;
    v_patternHelperBox += boxOrigin * (patternBoxScale - 1.);
  #endif

  v_patternUV = uv;
  v_patternUV += graphicOffset / patternBoxScale;
  v_patternUV += boxOrigin;
  v_patternUV -= boxOrigin / patternBoxScale;
  v_patternUV *= u_resolution.xy;
  v_patternUV /= u_pixelRatio;
  if (u_fit > 0.) {
    v_patternUV *= (patternBoxNoFitBoxWidth / v_patternBoxSize.x);
  }
  v_patternUV /= u_scale;
  v_patternUV = graphicRotation * v_patternUV;
  v_patternUV += boxOrigin / patternBoxScale;
  v_patternUV -= boxOrigin;
  v_patternUV += .5;

  // ===================================================

}`,R=`@layer paper-shaders {
  :where([data-paper-shaders]) {
    isolation: isolate;
    position: relative;

    & canvas {
      contain: strict;
      display: block;
      position: absolute;
      inset: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      border-radius: inherit;
    }
  }
}`,z={fit:`contain`,scale:1,rotation:0,offsetX:0,offsetY:0,originX:.5,originY:.5,worldWidth:0,worldHeight:0},B={none:0,contain:1,cover:2},V=5,H=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${V}];
uniform float u_colorsCount;

uniform float u_frequency;
uniform float u_spotty;
uniform float u_midSize;
uniform float u_midIntensity;
uniform float u_density;
uniform float u_blending;


in vec2 v_objectUV;
in vec2 v_responsiveUV;
in vec2 v_responsiveBoxGivenSize;
in vec2 v_patternUV;

out vec4 fragColor;


#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846


float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}


vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}


float hash(float n) {
  return fract(sin(n * 43758.5453123) * 43758.5453123);
}

float valueNoise(vec2 uv) {
  vec2 i = floor(uv);
  vec2 f = fract(uv);

  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

float raysShape(vec2 uv, float r, float freq, float density, float radius) {
  float a = atan(uv.y, uv.x);
  vec2 left = vec2(a * freq, r);
  vec2 right = vec2(mod(a, TWO_PI) * freq, r);
  float n_left = pow(valueNoise(left), density);
  float n_right = pow(valueNoise(right), density);
  float shape = mix(n_right, n_left, smoothstep(-.15, .15, uv.x));
  return shape;
}

void main() {
  vec2 shape_uv = v_objectUV;

  float t = .2 * u_time;

  float radius = length(shape_uv);
  float spots = 5. * abs(u_spotty);

  float density = 4. - 3. * clamp(u_density, 0., 1.);

  float delta = 1. - smoothstep(0., 1., radius);

  float middleShape = pow(u_midIntensity, .3) * smoothstep(abs(u_midSize), 0.02 * abs(u_midSize), 3.0 * radius);
  middleShape = pow(middleShape, 5.0);

  vec3 accumColor = vec3(0.0);
  float accumAlpha = 0.0;

  for (int i = 0; i < ${V}; i++) {
    if (i >= int(u_colorsCount)) break;

    vec2 rotatedUV = rotate(shape_uv, float(i) + 1.0);

    float r1 = radius * (1.0 + 0.4 * float(i)) - 3.0 * t;
    float r2 = 0.5 * radius * (1.0 + spots) - 2.0 * t;
    float f = mix(1.0, 3.0 + 0.5 * float(i), hash(float(i) + 10.0)) * u_frequency;

    float ray = raysShape(rotatedUV, r1, 5.0 * f, density, radius);
    ray *= raysShape(rotatedUV, r2, 4.0 * f, density, radius);
    ray += (1. + 4. * ray) * middleShape;
    ray = clamp(ray, 0.0, 1.0);

    float srcAlpha = u_colors[i].a * ray;
    vec3 srcColor = u_colors[i].rgb * srcAlpha;

    vec3 alphaBlendColor = accumColor + (1.0 - accumAlpha) * srcColor;
    float alphaBlendAlpha = accumAlpha + (1.0 - accumAlpha) * srcAlpha;

    vec3 addBlendColor = accumColor + srcColor;
    float addBlendAlpha = accumAlpha + srcAlpha;

    accumColor = mix(alphaBlendColor, addBlendColor, u_blending);
    accumAlpha = mix(alphaBlendAlpha, addBlendAlpha, u_blending);
  }

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;

  vec3 alphaBlendColor = accumColor + (1.0 - accumAlpha) * bgColor;
  float alphaBlendAlpha = accumAlpha + (1.0 - accumAlpha) * u_colorBack.a;

  vec3 addBlendColor = accumColor + bgColor;
  float addBlendAlpha = accumAlpha + u_colorBack.a;

  accumColor = mix(alphaBlendColor, addBlendColor, u_blending);
  accumAlpha = mix(alphaBlendAlpha, addBlendAlpha, u_blending);

  vec3 color = clamp(accumColor, 0.0, 1.0);
  float opacity = clamp(accumAlpha, 0.0, 1.0);


  
  color += 1. / 256. * (fract(sin(dot(.014 * gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453123) - .5);


  fragColor = vec4(color, opacity);
}
`,U=(e,t,n)=>Math.min(Math.max(e,t),n),W=[0,0,0,1],G=c(function({fragmentShader:e,uniforms:t,webGlContextAttributes:r,speed:i=0,frame:o=0,minPixelRatio:s,maxPixelCount:c,...l},f){let[p,m]=n(!1),h=u(null),g=u(null);return a(()=>((async()=>{let n=await F(t);h.current&&!g.current&&(g.current=new I(h.current,e,n,r,i,o,s,c),m(!0))})(),()=>{g.current?.dispose(),g.current=null}),[e,r]),a(()=>{(async()=>{let e=await F(t);g.current?.setUniforms(e)})()},[t,p]),a(()=>{g.current?.setSpeed(i)},[i,p]),a(()=>{g.current?.setFrame(o)},[o,p]),d(`div`,{ref:re([h,f]),...l})}),G.displayName=`ShaderMount`,K={...z,offsetX:-.4,offsetY:-.4,colorBack:`hsla(215, 100%, 11%, 1)`,colors:[`hsla(45, 100%, 70%, 1)`,`hsla(10, 100%, 80%, 1)`,`hsla(178, 100%, 83%, 1)`],frequency:6,spotty:.28,midIntensity:1,midSize:3,density:.3,blending:0,speed:1,frame:0},q=l(function({speed:e=K.speed,frame:t=K.frame,colorBack:n=K.colorBack,colors:r=K.colors,frequency:i=K.frequency,spotty:a=K.spotty,midIntensity:o=K.midIntensity,midSize:s=K.midSize,density:c=K.density,blending:l=K.blending,fit:u=K.fit,scale:f=K.scale,rotation:p=K.rotation,originX:m=K.originX,originY:h=K.originY,offsetX:g=K.offsetX,offsetY:_=K.offsetY,worldWidth:v=K.worldWidth,worldHeight:y=K.worldHeight,...b}){let x={u_colorBack:P(n),u_colors:r.map(P),u_colorsCount:r.length,u_frequency:i,u_spotty:a,u_midIntensity:o,u_midSize:s,u_density:c,u_blending:l,u_fit:B[u],u_scale:f,u_rotation:p,u_offsetX:g,u_offsetY:_,u_originX:m,u_originY:h,u_worldWidth:v,u_worldHeight:y};return d(G,{...b,speed:e,frame:t,fragmentShader:H,uniforms:x})},function(e,t){for(let n in e)if(n!==`colors`){if(!1===Object.is(e[n],t[n]))return!1}else{let n=Array.isArray(e.colors),r=Array.isArray(t.colors);if(!n||!r){if(!1===Object.is(e.colors,t.colors))return!1;continue}if(e.colors?.length!==t.colors?.length||!e.colors?.every((e,n)=>e===t.colors?.[n]))return!1}return!0})}));function J(e){let t=te.hasRestrictions(),n=u(null),r=g(n,{once:!1}),i=e.preset===`Custom`?null:Y[e.preset],a=e.colorsMode===`Custom`?X(e.colorBack):X(i?i.background:e.colorBack),o=e.colorsMode===`Custom`?e.colors.map(X):i?i.colors.map(X):e.colors.map(X),s=!e.canvasPreview&&t?0:i?i.speed:e.speed;return p(`div`,{ref:n,style:{width:`100%`,height:`100%`,position:`relative`},children:[d(q,{style:{width:`100%`,height:`100%`},colorBack:a,colors:o,frequency:i?i.frequency:e.frequency,spotty:i?i.spotty:e.spotty,midSize:i?i.center.size:e.center.size,midIntensity:i?i.center.intensity:e.center.intensity,density:i?i.density:e.density,blending:1,speed:r?s:0,offsetX:i?i.offsetX:e.offsetX,offsetY:i?i.offsetY:e.offsetY}),e.noise&&e.noise.opacity>0&&d(`div`,{style:{position:`absolute`,inset:0,backgroundImage:`url("/main-assets/framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png")`,backgroundSize:e.noise.scale*200,backgroundRepeat:`repeat`,opacity:e.noise.opacity/2}})]})}var Y,X,ae=e((()=>{f(),S(),_(),ie(),o(),y(J,{preset:{type:C.Enum,title:`Preset`,options:[`Time Travel`,`Kinetic Field`,`Highway`,`Ocean`,`Flowers`,`Custom`],defaultValue:`Time Travel`},colorsMode:{type:C.Enum,title:`Color`,options:[`Preset`,`Custom`],defaultValue:`Preset`,displaySegmentedControl:!0},noise:{type:C.Object,optional:!0,icon:`effect`,controls:{opacity:{type:C.Number,defaultValue:.5,min:0,max:1,step:.01},scale:{type:C.Number,defaultValue:1,min:.2,max:2,step:.1}}},colorBack:{type:C.Color,title:`Background`,defaultValue:`rgb(0,0,0)`,hidden:e=>e.colorsMode===`Preset`},colors:{type:C.Array,title:`Ray Colors`,control:{type:C.Color},defaultValue:[`rgb(177, 177, 177)`],hidden:e=>e.colorsMode===`Preset`},frequency:{type:C.Number,title:`Frequency`,defaultValue:5,min:0,max:50,step:.5,hidden:e=>e.preset!==`Custom`},spotty:{type:C.Number,title:`Spotty`,defaultValue:.5,min:0,max:10,step:.1,hidden:e=>e.preset!==`Custom`},center:{type:C.Object,title:`Center`,controls:{size:{type:C.Number,title:`Size`,defaultValue:.5,min:0,max:1,step:.1},intensity:{type:C.Number,title:`Intensity`,defaultValue:.5,min:0,max:1,step:.01}},hidden:e=>e.preset!==`Custom`},density:{type:C.Number,title:`Density`,defaultValue:.5,min:0,max:1,step:.01,hidden:e=>e.preset!==`Custom`},speed:{type:C.Number,title:`Speed`,defaultValue:1,min:0,max:10,step:.1,hidden:e=>e.preset!==`Custom`},offsetX:{type:C.Number,title:`Offset X`,defaultValue:0,min:-2,max:2,step:.01,hidden:e=>e.preset!==`Custom`},offsetY:{type:C.Number,title:`Offset Y`,defaultValue:0,min:-2,max:2,step:.01,hidden:e=>e.preset!==`Custom`},canvasPreview:{type:C.Boolean,title:`Preview`,defaultValue:!0,description:`More components at [Framer University](https://frameruni.link/cc).`}}),J.defaultProps={preset:`Time Travel`,colorsMode:`Preset`,colorBack:`rgb(0,0,0)`,colors:[`rgb(177, 177, 177)`],frequency:5,spotty:.5,center:{size:.5,intensity:.5},density:.5,speed:1,offsetX:0,offsetY:0,canvasPreview:!0},Y={"Kinetic Field":{background:`rgb(0,0,0)`,colors:[`rgb(254, 128, 66)`,`rgb(253, 251, 154)`,`rgb(123, 76, 70)`,`rgb(43, 21, 23)`,`rgb(180, 43, 27)`],frequency:0,spotty:5,center:{size:1,intensity:1},density:.28,speed:2,offsetX:0,offsetY:0},"Time Travel":{background:`rgb(0,0,0)`,colors:[`rgb(17, 44, 113)`,`rgb(187, 99, 255)`,`rgb(86, 225, 233)`,`rgb(91, 88, 235)`,`rgb(10, 35, 83)`],frequency:.5,spotty:0,center:{size:.7,intensity:.33},density:.74,speed:2,offsetX:0,offsetY:0},Highway:{background:`rgb(0,0,0)`,colors:[`rgb(94, 94, 94)`,`rgb(99, 250, 255)`,`rgb(0, 229, 255)`],frequency:2,spotty:.2,center:{size:0,intensity:.23},density:0,speed:1.2,offsetX:0,offsetY:-1.1},Ocean:{background:`rgb(0,0,0)`,colors:[`rgb(62, 204, 248)`,`rgb(90, 118, 242)`,`rgb(41, 84, 231)`],frequency:1.5,spotty:0,center:{size:.7,intensity:.33},density:.7,speed:2,offsetX:0,offsetY:-2},Flowers:{background:`rgb(0,0,0)`,colors:[`rgb(255, 212, 100)`,`rgb(238, 34, 51)`,`rgb(95, 134, 250)`],frequency:.5,spotty:1.9,center:{size:0,intensity:.23},density:1,speed:2,offsetX:-.55,offsetY:2}},X=e=>{let t=e.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/),n=e.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);if(n){let[e,t,r,i,a]=n;return`rgba(${t}, ${r}, ${i}, ${a})`}else if(t){let[e,n,r,i]=t;return`rgba(${n}, ${r}, ${i}, 1)`}return console.warn(`Could not parse color:`,e),`rgba(0, 0, 0, 1)`},J.displayName=`God Rays`})),Z,Q,$,oe=e((()=>{S(),ee.loadFonts([]),Z=[{explicitInter:!0,fonts:[]}],Q=[`.framer-jLMbT .framer-styles-preset-3w9o9k:not(.rich-text-wrapper), .framer-jLMbT .framer-styles-preset-3w9o9k.rich-text-wrapper a { --framer-link-current-text-color: var(--token-1486dbb4-cc20-4852-a20d-db81362153cb, #bdbdbd); --framer-link-current-text-decoration: underline; --framer-link-current-text-decoration-color: var(--token-33c8dbd0-eb94-4e90-8099-e7a3fee4ad2f, #f5f4e7); --framer-link-current-text-decoration-offset: 3px; --framer-link-current-text-decoration-skip-ink: auto; --framer-link-current-text-decoration-thickness: 2px; --framer-link-hover-text-color: var(--token-f277370d-904c-4e87-88c6-49451f154e33, #d1ff00); --framer-link-text-color: var(--token-33c8dbd0-eb94-4e90-8099-e7a3fee4ad2f, #f5f4e7); --framer-link-text-decoration: underline; --framer-link-text-decoration-color: var(--token-1486dbb4-cc20-4852-a20d-db81362153cb, #bdbdbd); --framer-link-text-decoration-offset: 1px; --framer-link-text-decoration-skip-ink: auto; --framer-link-text-decoration-style: solid; --framer-link-text-decoration-thickness: 1px; transition-delay: 0s; transition-duration: 0.6s; transition-property: color,text-decoration-color,text-decoration-thickness,text-underline-offset; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }`],$=`framer-jLMbT`}));export{J as a,ne as c,oe as i,Q as n,ae as o,Z as r,j as s,$ as t};
//# sourceMappingURL=ajnWj2z9Q.UwvmEBa6.mjs.map