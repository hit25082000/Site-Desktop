import{t as e}from"./rolldown-runtime.fXUlgfaW.mjs";import{i as t,n,r,t as i}from"./Zustand.J2xjEi5Q.mjs";var a,o=e((()=>{a={CACHE_TTL_MINUTES:10,DEFAULT_CURRENCY:`USD`,MAX_PRODUCTS_PER_QUERY:250,ENABLE_LIVE_PRICING:!0}}));function s(e){let t={};for(let n of e)for(let{node:e}of n.variants.edges){let n=e.id.replace(`gid://shopify/ProductVariant/`,``);t[n]={price:e.price,compareAtPrice:e.compareAtPrice}}return t}async function c(e,n,r=[]){let i=await t({query:u,variables:{first:a.MAX_PRODUCTS_PER_QUERY,after:n,...e&&{country:e}}});if(i.errors.length>0)return{data:null,errors:i.errors};if(!i.data||!i.data.products)return{data:null,errors:[{message:`No products data in response`}]};let o=i.data.products.edges.map(e=>e.node),l=[...r,...o];return i.data.products.pageInfo.hasNextPage&&i.data.products.pageInfo.endCursor?c(e,i.data.products.pageInfo.endCursor,l):{data:s(l),errors:[]}}async function l(e){try{return await c(e)}catch(e){return console.error(`[Live Pricing] Error fetching live pricing:`,e),{data:null,errors:[{message:e instanceof Error?e.message:`Unknown error fetching live pricing`}]}}}var u,d=e((()=>{r(),o(),u=`#graphql
  query GetLivePricing($country: CountryCode, $first: Int!, $after: String) 
    @inContext(country: $country) {
    products(first: $first, after: $after) {
      edges {
        node {
          id
          variants(first: 100) {
            edges {
              node {
                id
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`}));function f(){try{let e=localStorage.getItem(_);return e?JSON.parse(e):null}catch(e){return console.error(`Error reading live pricing cache:`,e),null}}function p(e,t){try{let n={data:e,timestamp:Date.now(),market:t,defaultCurrency:a.DEFAULT_CURRENCY};localStorage.setItem(_,JSON.stringify(n))}catch(e){console.error(`Error saving live pricing cache:`,e)}}function m(e,t=a.CACHE_TTL_MINUTES){return e?(Date.now()-e.timestamp)/1e3/60<t:!1}function h(e){let t=f();return!!(!t||!m(t)||e&&t.market!==e)}function g(){try{localStorage.removeItem(_)}catch(e){console.error(`Error clearing live pricing cache:`,e)}}var _,v=e((()=>{o(),_=`frameship_live_pricing_cache`})),y,b=e((()=>{n(),d(),v(),o(),y=i((e,t)=>({livePricing:f()?.data||null,isLoading:!1,isFetching:!1,error:null,setLivePricing:t=>{e({livePricing:t,error:null})},fetchLivePricingData:async(n,r)=>{if(a.ENABLE_LIVE_PRICING&&!(!r&&!h(n))){t().livePricing===null?e({isLoading:!0,error:null}):e({isFetching:!0,error:null});try{let t=await l(n);if(t.errors.length>0){let n=t.errors.map(e=>e.message).join(`, `);console.error(`[Live Pricing] Fetch errors:`,n),e({error:n,isLoading:!1,isFetching:!1});return}t.data?(e({livePricing:t.data,error:null,isLoading:!1,isFetching:!1}),p(t.data,n||`default`)):e({error:`No data received`,isLoading:!1,isFetching:!1})}catch(t){let n=t instanceof Error?t.message:`Unknown error`;console.error(`[Live Pricing] Unexpected error:`,n),e({error:n,isLoading:!1,isFetching:!1})}}},getLivePrice:e=>{let{livePricing:n}=t();return n&&n[e.replace(`gid://shopify/ProductVariant/`,``)]||null},clearLivePricing:()=>{g(),e({livePricing:null,error:null,isLoading:!1,isFetching:!1})}}))}));export{y as n,b as t};
//# sourceMappingURL=Live_pricing_store.CRM8I-b4.mjs.map