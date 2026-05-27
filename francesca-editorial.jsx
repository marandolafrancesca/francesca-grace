import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
   FRANCESCA GRACE — Luxury Mediterranean Editorial Portfolio
   
   Aesthetic: Vogue Italia × Côte d'Azur Hotel × Boutique Skincare
   
   Typography hierarchy:
     DISPLAY  → Bodoni Moda (editorial headlines)
     ITALIC   → Cormorant Garamond (elegant overlays)
     BODY     → Playfair Display / system serif (refined body)
     NAV/CAPS → Letter-spacing uppercase with thin weight
   
   Palette:
     --ivory:   #F5F0E8  (warm parchment)
     --cream:   #EDE8DF  (section fills)
     --sand:    #C8B89A  (warm accent)
     --dusk:    #6BB8C4  (muted ocean)
     --marine:  #1E8A9A  (deep coastal)
     --navy:    #1A6B7A  (headlines)
     --gold:    #A8874A  (luxury accent)
     --stone:   #6B6258  (body text)
═══════════════════════════════════════════════════════════════ */

const PORTFOLIO_ITEMS = [
  { id:1,  city:"Providence, RI",  type:"Restaurant",    title:"Costantino's Ristorante", tag:"Collab",  url:"https://www.tiktok.com/t/ZTB2egB4L/" },
  { id:2,  city:"Providence, RI",  type:"Local Business",title:"Venda Ravioli",           tag:"Feature", url:"https://www.tiktok.com/t/ZTB2efvgR/" },
  { id:3,  city:"Rhode Island",    type:"Café",          title:"Dave's Coffee",           tag:"Collab",  url:"https://www.tiktok.com/t/ZTB2e5pec/" },
  { id:4,  city:"Newport, RI",     type:"Hotel",         title:"Chart House Inn",         tag:"Feature", url:"https://www.tiktok.com/t/ZTB2ecnnP/" },
  { id:5,  city:"Newport, RI",     type:"Restaurant",    title:"Stoneacre Brasserie",     tag:"Collab",  url:"https://www.tiktok.com/t/ZTB2e9rLL/" },
  { id:6,  city:"Boston, MA",      type:"Restaurant",    title:"Zaku Izakaya",            tag:"Viral",   url:"https://www.tiktok.com/t/ZTB2eXPNx/" },
  { id:7,  city:"Boston, MA",      type:"Bar",           title:"The Greatest Bar",        tag:"Feature", url:"https://www.tiktok.com/t/ZTB2eC5gM/" },
  { id:8,  city:"New York, NY",    type:"Brand",         title:"Olfactory NYC",           tag:"Collab",  url:"https://www.tiktok.com/t/ZTB2d1ass/" },
  { id:9,  city:"Rhode Island",    type:"Winery",        title:"Newport Vineyards",       tag:"Feature", url:"https://www.tiktok.com/t/ZTB2dJtWn/" },
  { id:10, city:"Boston, MA",      type:"Restaurant",    title:"The Naughty Waffle",      tag:"Collab",  url:"https://www.tiktok.com/t/ZTB2dMrn6/" },
  { id:11, city:"Rhode Island",    type:"Brand",         title:"& Livy",                  tag:"Collab",  url:"https://www.tiktok.com/t/ZTB2dknxm/" },
  { id:12, city:"Boston, MA",      type:"Market",        title:"SoWa Winter Market",      tag:"Feature", url:"https://www.tiktok.com/t/ZTB2KTdP8/" },
];

const FEATURED_VIDEOS = [
  { url:"https://www.tiktok.com/t/ZTB2dVBV1/", title:"Trying the #2 Rated Chinese Restaurant in America", location:"Providence, RI" },
  { url:"https://www.tiktok.com/t/ZTB2dbAqJ/", title:"This is Your Sign to Visit Snowport in Boston",     location:"Boston, MA" },
  { url:"https://www.tiktok.com/t/ZTB2d9u5k/", title:"Chocolate Affogato from Venda Ravioli",             location:"Providence, RI" },
];

const BRANDS = [
  "Costantino's Ristorante","Venda Ravioli","Dave's Coffee","Dave's Hot Chicken",
  "Foodology US","Javvy Coffee","Spencer Agent","Chart House Inn","Stoneacre Brasserie",
  "Greenhouse Narragansett","Gansett Nutrition","Newport Vineyards","Newport Boat Adventures",
  "Zaku Izakaya","The Greatest Bar Boston","SoWa Winter Market","Olfactory NYC",
  "Places by Raya","The Naughty Waffle","& Livy",
];

const SERVICES = [
  { n:"Sponsored Content",  roman:"I",  sub:"for your venue",     body:"Original content posted on my platforms — TikTok, Instagram Reels, YouTube Shorts & Stories. Built around your venue and your audience. The kind of content that turns a Tuesday into a full reservation list." },
  { n:"Photography",        roman:"II", sub:"stop the scroll",    body:"Editorial food and lifestyle photography for your website, menu, socials, and marketing. Shot with the same cinematic eye that stops people mid-feed." },
  { n:"Consulting",         roman:"III",sub:"honest strategy",    body:"A direct audit of your social presence, a content plan that makes sense for your business, and advice from someone who's grown a real audience. I tell you what works and what's wasting your budget." },
  { n:"Monthly Retainer",   roman:"IV", sub:"consistency wins",   body:"Ongoing content partnership — regular posts, stories, and priority placement across all my platforms. One-off content sparks interest. Consistency builds a line out the door." },
];

const ANALYTICS = {
  tiktok: {
    handle:"@frvncesca",
    url:"https://www.tiktok.com/@frvncesca",
    followers:"6.4K",
    likes:"2.9M",
    views:"10M+",
    viewsLabel:"Views · Past Year",
    female:71, male:28,
    ages:[{l:"13–17",v:1.2,p:"1.2%"},{l:"18–24",v:31.5,p:"31.5%"},{l:"25–34",v:36.8,p:"36.8%"},{l:"35–44",v:18.1,p:"18.1%"},{l:"45+",v:12.4,p:"12.4%"}],
  },
  instagram: {
    handle:"@frvncescagracee",
    url:"https://www.instagram.com/frvncescagracee",
    followers:"1.6K",
    views:"1.6M",
    viewsLabel:"Views · 90 Days",
    female:83.2, male:16.8,
    ages:[{l:"13–17",v:3.2,p:"3.2%"},{l:"18–24",v:47.5,p:"47.5%"},{l:"25–34",v:42.3,p:"42.3%"},{l:"35–44",v:5.8,p:"5.8%"},{l:"45+",v:1.2,p:"1.2%"}],
  },
};

// ─── Hooks ───────────────────────────────────────────────────
function useScrollY(){
  const [y,setY]=useState(0);
  useEffect(()=>{
    const h=()=>setY(window.scrollY);
    window.addEventListener("scroll",h,{passive:true});
    return()=>window.removeEventListener("scroll",h);
  },[]);
  return y;
}
function useInView(ref,threshold=0.08){
  const [v,setV]=useState(false);
  useEffect(()=>{
    const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true);},{threshold});
    if(ref.current)o.observe(ref.current);
    return()=>o.disconnect();
  },[ref,threshold]);
  return v;
}
function Appear({children,delay=0,distance=32,className=""}){
  const r=useRef(null); const v=useInView(r);
  return(
    <div ref={r} className={className} style={{
      opacity:v?1:0, transform:v?"translateY(0)":`translateY(${distance}px)`,
      transition:`opacity 1.1s cubic-bezier(.16,1,.3,1) ${delay}s, transform 1.1s cubic-bezier(.16,1,.3,1) ${delay}s`,
    }}>{children}</div>
  );
}

// ─── Grain overlay ────────────────────────────────────────────
function Grain(){
  return(
    <div style={{
      position:"fixed",inset:0,zIndex:9999,pointerEvents:"none",
      backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='1'/%3E%3C/svg%3E")`,
      opacity:0.08,mixBlendMode:"multiply",
    }}/>
  );
}

// ─── Donut chart ──────────────────────────────────────────────
function Donut({f,m,cf,cm}){
  const r=44,cx=50,cy=50,sw=8,c=2*Math.PI*r;
  return(
    <svg width={100} height={100} viewBox="0 0 100 100">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#E8E0D0" strokeWidth={sw}/>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={cm} strokeWidth={sw}
        strokeDasharray={`${(m/100)*c} ${c}`} transform={`rotate(-90 ${cx} ${cy})`}/>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={cf} strokeWidth={sw}
        strokeDasharray={`${(f/100)*c} ${c}`} strokeDashoffset={-(m/100)*c} transform={`rotate(-90 ${cx} ${cy})`}/>
    </svg>
  );
}

// ─── Bar chart ────────────────────────────────────────────────
function Bar({data,color}){
  const max=Math.max(...data.map(d=>d.v));
  return(
    <div style={{display:"flex",alignItems:"flex-end",gap:6,height:80}}>
      {data.map((d,i)=>(
        <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
          <div style={{fontSize:8,color:"#8A8278",fontFamily:"inherit",letterSpacing:"0.02em"}}>{d.p}</div>
          <div style={{width:"100%",background:"#E8E0D0",height:64,display:"flex",alignItems:"flex-end",overflow:"hidden"}}>
            <div style={{width:"100%",height:`${(d.v/max)*100}%`,background:color,transition:"height 1.4s cubic-bezier(.16,1,.3,1)"}}/>
          </div>
          <div style={{fontSize:8,color:"#8A8278",textAlign:"center",lineHeight:1.3,letterSpacing:"0.03em"}}>{d.l}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Phone mockup ─────────────────────────────────────────────
function PhoneCard({title,location,url,index,bg}){
  const [hov,setHov]=useState(false);
  const bgs=[
    "linear-gradient(170deg,#C8D8DC 0%,#1E8A9A 100%)",
    "linear-gradient(170deg,#D4C4A8 0%,#8A6840 100%)",
    "linear-gradient(170deg,#D8E4E8 0%,#5E8290 100%)",
  ];
  const bgStyle = bg ? {backgroundImage:`url(${bg})`,backgroundSize:"cover",backgroundPosition:"center"} 
                     : {background:bgs[index%3]};
  return(
    <a href={url} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none",display:"block"}}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      <div style={{
        width:160, height:284, borderRadius:24,
        ...bgStyle,
        boxShadow:hov?"0 40px 80px rgba(28,47,56,0.35)":"0 18px 52px rgba(28,47,56,0.18)",
        overflow:"hidden", position:"relative", flexShrink:0,
        border:"1.5px solid rgba(255,255,255,0.4)",
        transform:hov?"translateY(-10px) scale(1.02)":"translateY(0) scale(1)",
        transition:"all 0.6s cubic-bezier(.16,1,.3,1)",
      }}>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(28,47,56,0.9) 0%,rgba(28,47,56,0.1) 50%,transparent 100%)"}}/>
        <div style={{position:"absolute",top:12,left:"50%",transform:"translateX(-50%)",width:36,height:4,borderRadius:2,background:"rgba(255,255,255,0.3)"}}/>
        <div style={{position:"absolute",top:"36%",left:"50%",transform:"translate(-50%,-50%)",width:38,height:38,borderRadius:"50%",border:"1.5px solid rgba(255,255,255,0.6)",background:"rgba(255,255,255,0.12)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{width:0,height:0,borderTop:"7px solid transparent",borderBottom:"7px solid transparent",borderLeft:"12px solid rgba(255,255,255,0.85)",marginLeft:3}}/>
        </div>
        <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"16px 14px 18px"}}>
          <div style={{fontSize:8,color:"rgba(245,240,232,0.7)",letterSpacing:"0.22em",textTransform:"uppercase",marginBottom:6,fontFamily:"inherit"}}>{location}</div>
          <div style={{fontSize:12,color:"#1A6B7A",fontWeight:400,lineHeight:1.4,fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic"}}>{title}</div>
          <div style={{display:"flex",alignItems:"center",gap:6,marginTop:9}}>
            <div style={{width:18,height:18,borderRadius:"50%",background:"rgba(61,99,112,0.8)",border:"1px solid rgba(255,255,255,0.35)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:7,color:"#fff",fontWeight:600,letterSpacing:"0.01em"}}>F</div>
            <span style={{fontSize:8,color:"rgba(245,240,232,0.7)",letterSpacing:"0.08em"}}>@frvncesca</span>
          </div>
        </div>
      </div>
    </a>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────
function FAQ({q,a}){
  const [open,setOpen]=useState(false);
  return(
    <div style={{borderBottom:"1px solid rgba(107,98,88,0.2)"}}>
      <button onClick={()=>setOpen(!open)} style={{
        width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",
        padding:"22px 0",background:"none",border:"none",cursor:"pointer",textAlign:"left",gap:20,
      }}>
        <span style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:17,color:"#1A6B7A",lineHeight:1.4}}>{q}</span>
        <span style={{fontSize:18,color:"#6BB8C4",transform:open?"rotate(45deg)":"none",transition:"transform 0.3s cubic-bezier(.16,1,.3,1)",flexShrink:0,fontWeight:300}}>+</span>
      </button>
      <div style={{overflow:"hidden",maxHeight:open?280:0,transition:"max-height 0.5s cubic-bezier(.16,1,.3,1)",paddingBottom:open?20:0}}>
        <p style={{fontSize:14,color:"#6B6258",lineHeight:1.95,margin:0,opacity:0.85,letterSpacing:"0.01em"}}>{a}</p>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//   PAGES
// ══════════════════════════════════════════════════════════════

function HomePage({setPage}){
  const heroRef=useRef(null);
  const scrollY=useScrollY();
  const parallax=scrollY*0.4;

  return(
    <div style={{background:"#F5F0E8"}}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section ref={heroRef} style={{
        height:"100vh",minHeight:700,
        position:"relative",overflow:"hidden",
        background:"#d8f9ff",
      }}>
        {/* Solid color hero */}
        <div style={{position:"absolute",inset:0,background:"#d8f9ff",transform:`translateY(${parallax}px)`,}}/>
        {/* No overlay — solid color hero */}
        
        {/* Subtle wave lines */}
        <svg style={{position:"absolute",bottom:0,left:0,right:0,opacity:0.06}} viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path d="M0,100 C360,160 1080,40 1440,100 L1440,200 L0,200 Z" fill="#F5F0E8"/>
          <path d="M0,130 C480,60 960,180 1440,130 L1440,200 L0,200 Z" fill="#F5F0E8" opacity="0.5"/>
        </svg>

        {/* Hero content */}
        <div style={{position:"relative",zIndex:1,height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",padding:"120px 80px 80px 160px"}}>
          {/* Pre-headline */}
          <div style={{opacity:0,animation:"fadeSlideUp 1s cubic-bezier(.16,1,.3,1) 0.3s forwards",marginBottom:24}}>
            <div style={{display:"flex",alignItems:"center",gap:18}}>
              <div style={{width:48,height:"1px",background:"rgba(26,107,122,0.3)"}}/>
              <span style={{fontSize:10,letterSpacing:"0.35em",textTransform:"uppercase",color:"rgba(26,107,122,0.7)",fontWeight:400}}>Food &amp; Travel Creator</span>
              <div style={{width:48,height:"1px",background:"rgba(26,107,122,0.3)"}}/>
            </div>
          </div>

          {/* Main headline */}
          <div style={{opacity:0,animation:"fadeSlideUp 1.1s cubic-bezier(.16,1,.3,1) 0.5s forwards"}}>
            <h1 style={{
              margin:0,lineHeight:0.9,
              fontFamily:"'Fraunces',Georgia,serif",
              fontWeight:700,
            }}>
              <span style={{
                display:"block",
                fontSize:"clamp(72px,12vw,140px)",
                color:"#1A6B7A",
                letterSpacing:"-0.02em",
                fontStyle:"italic",
              }}>Francesca</span>
              <span style={{
                display:"block",
                fontSize:"clamp(68px,11vw,132px)",
                color:"transparent",
                WebkitTextStroke:"2px rgba(26,107,122,0.35)",
                letterSpacing:"0.01em",
                fontStyle:"italic",
                fontWeight:300,
              }}>Grace</span>
            </h1>
          </div>

          {/* Tagline */}
          <div style={{opacity:0,animation:"fadeSlideUp 1s cubic-bezier(.16,1,.3,1) 0.8s forwards",marginTop:36,maxWidth:460}}>
            <p style={{
              fontFamily:"'Cormorant Garamond',Georgia,serif",
              fontStyle:"italic",
              fontSize:"clamp(16px,2vw,20px)",
              color:"rgba(245,240,232,0.65)",
              lineHeight:1.85,
              margin:0,
              letterSpacing:"0.02em",
            }}>
              Content that fills tables, books rooms, and builds the kind of attention that brands spend years trying to buy.
            </p>
          </div>

          {/* CTAs */}
          <div style={{opacity:0,animation:"fadeSlideUp 1s cubic-bezier(.16,1,.3,1) 1.0s forwards",marginTop:48,display:"flex",gap:16,alignItems:"center",flexWrap:"wrap"}}>
            <button onClick={()=>setPage("Work With Me")} style={{
              padding:"14px 36px",
              background:"rgba(26,107,122,0.1)",
              border:"1px solid rgba(26,107,122,0.4)",
              color:"rgba(26,107,122,0.9)",
              fontSize:10,letterSpacing:"0.28em",textTransform:"uppercase",
              cursor:"pointer",transition:"all 0.4s",
              fontFamily:"inherit",fontWeight:400,
              backdropFilter:"blur(8px)",
            }}
              onMouseOver={e=>{e.target.style.background="rgba(26,107,122,0.2)";e.target.style.borderColor="rgba(26,107,122,0.7)"; }}
              onMouseOut={e=>{e.target.style.background="rgba(26,107,122,0.1)";e.target.style.borderColor="rgba(26,107,122,0.4)";}}>
              Work With Me
            </button>
            <button onClick={()=>setPage("Portfolio")} style={{
              padding:"14px 36px",
              background:"transparent",border:"1px solid rgba(26,107,122,0.25)",
              color:"rgba(26,107,122,0.55)",
              fontSize:10,letterSpacing:"0.28em",textTransform:"uppercase",
              cursor:"pointer",transition:"all 0.4s",fontFamily:"inherit",
            }}
              onMouseOver={e=>{e.target.style.borderColor="rgba(26,107,122,0.6)";e.target.style.color="rgba(26,107,122,0.9)";}}
              onMouseOut={e=>{e.target.style.borderColor="rgba(26,107,122,0.25)";e.target.style.color="rgba(26,107,122,0.55)";}}>
              View Portfolio
            </button>
          </div>
        </div>

        {/* ── iPhone Mockup ── */}
        <a href="https://www.instagram.com/frvncescagracee?igsh=MWg1dTJ2amNrdzgwbA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none",display:"block",position:"absolute",right:"clamp(40px,6vw,130px)",top:"50%",transform:"translateY(-50%) rotate(-3deg)",zIndex:2,animation:"floatPhone 5s ease-in-out infinite",cursor:"pointer"}}>
        <div style={{
          position:"relative",
          zIndex:2,
          pointerEvents:"all",
        }}>
          {/* Phone shell */}
          <div style={{
            width:210,
            height:440,
            background:"linear-gradient(145deg,#e2e2e2,#c0c0c0)",
            borderRadius:46,
            padding:4,
            boxShadow:"0 32px 72px rgba(26,107,122,0.22), 0 6px 20px rgba(26,107,122,0.12), inset 0 1px 0 rgba(255,255,255,0.7)",
            position:"relative",
          }}>
            {/* Screen */}
            <div style={{width:"100%",height:"100%",background:"#000",borderRadius:42,overflow:"hidden",position:"relative"}}>
              <img src={`data:image/jpeg;base64,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`} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top",display:"block"}}/>
              {/* Dark gradient top */}
              <div style={{position:"absolute",top:0,left:0,right:0,height:60,background:"linear-gradient(to bottom,rgba(0,0,0,0.45),transparent)"}}/>
              {/* Dynamic island */}
              <div style={{position:"absolute",top:10,left:"50%",transform:"translateX(-50%)",width:70,height:20,background:"#000",borderRadius:20,zIndex:10}}/>
              {/* Status bar */}
              <div style={{position:"absolute",top:14,left:18,fontSize:9,color:"#fff",fontWeight:700,fontFamily:"inherit",zIndex:11}}>9:41</div>
              {/* Bottom nav */}
              <div style={{position:"absolute",bottom:0,left:0,right:0,height:54,background:"linear-gradient(to top,rgba(0,0,0,0.65),transparent)",display:"flex",alignItems:"flex-end",justifyContent:"space-around",paddingBottom:10}}>
                {["🏠","🔍","＋","💬","👤"].map((icon,i)=>(
                  <span key={i} style={{fontSize:i===2?20:13,color:i===2?"#fff":"rgba(255,255,255,0.65)"}}>{icon}</span>
                ))}
              </div>
            </div>
            {/* Side button */}
            <div style={{position:"absolute",right:-4,top:100,width:4,height:56,background:"#b8b8b8",borderRadius:"0 3px 3px 0"}}/>
            {/* Volume buttons */}
            <div style={{position:"absolute",left:-4,top:86,width:4,height:30,background:"#b8b8b8",borderRadius:"3px 0 0 3px"}}/>
            <div style={{position:"absolute",left:-4,top:124,width:4,height:30,background:"#b8b8b8",borderRadius:"3px 0 0 3px"}}/>
          </div>
          {/* Shadow under phone */}
          <div style={{width:120,height:16,background:"radial-gradient(ellipse,rgba(26,107,122,0.18) 0%,transparent 70%)",margin:"14px auto 0",filter:"blur(5px)"}}/>
        </div>
        </a>
        <style>{`
          @keyframes floatPhone {
            0%,100% { transform: translateY(-50%) rotate(-3deg); }
            50% { transform: translateY(calc(-50% - 16px)) rotate(0deg); }
          }
        `}</style>

        {/* Floating location text */}
        <div style={{
          position:"absolute",bottom:60,right:60,
          opacity:0,animation:"fadeIn 1.2s ease 1.4s forwards",
          textAlign:"right",
        }}>
          <div style={{fontSize:9,letterSpacing:"0.3em",textTransform:"uppercase",color:"rgba(245,240,232,0.35)",lineHeight:2}}>
            Rhode Island<br/>Boston · New York City<br/>Miami
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{position:"absolute",bottom:40,left:"50%",transform:"translateX(-50%)",opacity:0,animation:"fadeIn 1s ease 1.8s forwards",display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
          <div style={{width:1,height:48,background:"linear-gradient(to bottom,transparent,rgba(26,107,122,0.3))"}}/>
          <span style={{fontSize:8,letterSpacing:"0.3em",color:"rgba(26,107,122,0.4)",textTransform:"uppercase"}}>Scroll</span>
        </div>
      </section>

      {/* ── EDITORIAL INTRO ─────────────────────────────────── */}
      <section style={{background:"#F5F0E8",padding:"140px 80px 120px 160px",position:"relative",overflow:"hidden"}}>
        {/* Oversized background letter */}
        <div style={{position:"absolute",right:"-4%",top:"50%",transform:"translateY(-50%)",textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontSize:"clamp(200px,28vw,380px)",color:"rgba(61,99,112,0.045)",fontStyle:"normal",pointerEvents:"none",userSelect:"none",lineHeight:1,whiteSpace:"nowrap"}}>creator</div>

        <div style={{maxWidth:1200,position:"relative",zIndex:1,display:"grid",gridTemplateColumns:"3fr 2fr",gap:"80px 100px",alignItems:"start"}} className="r-grid-collapse">
          <Appear delay={0.1}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:28}}>
                <div style={{width:32,height:1,background:"#A8874A"}}/>
                <span style={{fontSize:9,letterSpacing:"0.32em",textTransform:"uppercase",color:"#A8874A",fontWeight:400}}>About</span>
              </div>
              <h2 style={{textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontWeight:800,fontStyle:"normal",fontSize:"clamp(36px,4.5vw,58px)",color:"#1A6B7A",lineHeight:1.1,letterSpacing:"0.04em",margin:"0 0 32px"}}>
                I find the places<br/>worth talking about.
              </h2>
              <p style={{fontSize:15,color:"#6B6258",lineHeight:1.95,margin:"0 0 20px",letterSpacing:"0.01em",opacity:0.85}}>
                I'm Francesca Grace — a food and travel creator based in Rhode Island, covering the restaurants, hotels, cafés, and hidden gems across New England, New York City, and Miami that deserve to be discovered.
              </p>
              <p style={{fontSize:15,color:"#6B6258",lineHeight:1.95,margin:"0 0 40px",letterSpacing:"0.01em",opacity:0.85}}>
                Every piece of content I make is cinematic, honest, and crafted to make the viewer feel like they're already there. I only work with places I genuinely love — which is why my audience responds the way they do.
              </p>
              <button onClick={()=>setPage("About")} style={{
                padding:"13px 0",background:"transparent",border:"none",
                color:"#1E8A9A",fontSize:10,letterSpacing:"0.28em",textTransform:"uppercase",
                cursor:"pointer",borderBottom:"1px solid #1E8A9A",paddingBottom:"4px",
                fontFamily:"inherit",transition:"all 0.3s",
              }}
                onMouseOver={e=>e.target.style.color="#1A6B7A"}
                onMouseOut={e=>e.target.style.color="#1E8A9A"}>
                Read the full story →
              </button>
            </div>
          </Appear>

          {/* Stats */}
          <Appear delay={0.25}>
            <div>
              <div style={{borderTop:"1px solid rgba(107,98,88,0.2)",marginBottom:32}}/>
              {[
                {v:"8K+",  l:"Combined Followers",sub:"across platforms"},
                {v:"10M+", l:"TikTok Views",      sub:"past 12 months"},
                {v:"1.6M", l:"Instagram Views",   sub:"past 90 days"},
                {v:"18+",  l:"Brand Partnerships",sub:"and growing"},
              ].map((s,i)=>(
                <div key={i} style={{padding:"20px 0",borderBottom:"1px solid rgba(107,98,88,0.15)",display:"grid",gridTemplateColumns:"100px 1fr",gap:16,alignItems:"center"}}>
                  <div style={{textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontStyle:"normal",fontSize:"clamp(28px,3.5vw,40px)",color:"#1E8A9A",fontWeight:800,letterSpacing:"0.04em"}}>{s.v}</div>
                  <div>
                    <div style={{fontSize:11,letterSpacing:"0.14em",textTransform:"uppercase",color:"#1A6B7A",opacity:0.75,marginBottom:2}}>{s.l}</div>
                    <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:13,color:"#8A8278"}}>{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </Appear>
        </div>
      </section>

      {/* ── MARQUEE BAND ───────────────────────────────────── */}
      <div style={{background:"#1A6B7A",padding:"18px 0",overflow:"hidden",borderTop:"1px solid rgba(61,99,112,0.4)"}}>
        <div style={{display:"flex",animation:"marquee 36s linear infinite",whiteSpace:"nowrap"}}>
          {[...Array(10)].map((_,i)=>(
            <span key={i} style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:17,color:"rgba(245,240,232,0.4)",padding:"0 52px",letterSpacing:"0.04em"}}>
              Rhode Island · Boston · New York City · Miami · Restaurants · Hotels · Cafés · Sponsored Content · Photography
            </span>
          ))}
        </div>
      </div>

      {/* ── FEATURED VIDEOS ─────────────────────────────────── */}
      <section style={{background:"#F5F0E8",padding:"140px 80px 120px 160px"}}>
        <div style={{maxWidth:1200}}>
          <Appear>
            <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:72,flexWrap:"wrap",gap:20}}>
              <div>
                <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:14,color:"#6BB8C4",marginBottom:10,letterSpacing:"0.04em"}}>featured content</div>
                <h2 style={{textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontWeight:800,fontStyle:"normal",fontSize:"clamp(38px,5vw,62px)",color:"#1A6B7A",letterSpacing:"0.04em",margin:0,lineHeight:1.0}}>
                  Watch the<br/><em style={{color:"#1E8A9A"}}>work.</em>
                </h2>
              </div>
              <a href="https://www.tiktok.com/@frvncesca" target="_blank" rel="noopener noreferrer" style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:15,color:"#1E8A9A",textDecoration:"none",borderBottom:"1px solid rgba(61,99,112,0.4)",paddingBottom:2,letterSpacing:"0.03em"}}>
                All videos on TikTok →
              </a>
            </div>
          </Appear>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:28}}>
            {FEATURED_VIDEOS.map((v,i)=>(
              <Appear key={i} delay={i*0.12}>
                <a href={v.url} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none",display:"block"}}>
                  <div style={{
                    background:"#EDE8DF",overflow:"hidden",
                    transition:"transform 0.6s cubic-bezier(.16,1,.3,1),box-shadow 0.6s",
                    boxShadow:"0 4px 24px rgba(28,47,56,0.07)",
                  }}
                    onMouseOver={e=>{e.currentTarget.style.transform="translateY(-8px)";e.currentTarget.style.boxShadow="0 24px 64px rgba(28,47,56,0.14)";}}
                    onMouseOut={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 4px 24px rgba(28,47,56,0.07)";}}>
                    <div style={{
                      aspectRatio:"9/16",maxHeight:340,
                      background:["linear-gradient(170deg,#C8D8DC,#1E8A9A)","linear-gradient(170deg,#D4C4A8,#8A6840)","linear-gradient(170deg,#D8E4E8,#5E8290)"][i],
                      display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"18px 16px 16px",position:"relative",
                    }}>
                      <div style={{display:"flex",alignItems:"center",gap:7}}>
                        <div style={{width:22,height:22,borderRadius:"50%",background:"rgba(61,99,112,0.7)",border:"1px solid rgba(255,255,255,0.4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:"#fff",fontWeight:600}}>F</div>
                        <span style={{fontSize:9,color:"rgba(245,240,232,0.85)",letterSpacing:"0.08em"}}>@frvncesca</span>
                      </div>
                      <div style={{display:"flex",justifyContent:"center"}}>
                        <div style={{width:44,height:44,borderRadius:"50%",border:"1.5px solid rgba(255,255,255,0.7)",background:"rgba(255,255,255,0.12)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                          <div style={{width:0,height:0,borderTop:"8px solid transparent",borderBottom:"8px solid transparent",borderLeft:"14px solid rgba(255,255,255,0.9)",marginLeft:3}}/>
                        </div>
                      </div>
                      <div>
                        <div style={{fontFamily:"inherit",fontSize:8,color:"rgba(245,240,232,0.6)",letterSpacing:"0.22em",textTransform:"uppercase",marginBottom:6}}>{v.location}</div>
                        <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:14,color:"#1A6B7A",lineHeight:1.4}}>{v.title}</div>
                      </div>
                    </div>
                    <div style={{padding:"16px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"1px solid rgba(107,98,88,0.12)"}}>
                      <span style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:14,color:"#1E8A9A",letterSpacing:"0.02em"}}>Watch on TikTok</span>
                      <span style={{color:"#A8874A",fontSize:14}}>↗</span>
                    </div>
                  </div>
                </a>
              </Appear>
            ))}
          </div>
        </div>
      </section>

      {/* ── LARGE EDITORIAL TYPE BREAK ─────────────────────── */}
      <section style={{background:"#1A6B7A",padding:"120px 80px 110px 160px",overflow:"hidden",position:"relative"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(ellipse 70% 50% at 60% 50%,rgba(61,99,112,0.3) 0%,transparent 70%)",pointerEvents:"none"}}/>
        <div style={{maxWidth:1100,position:"relative",zIndex:1}}>
          {[
            {t:"Fresh food,",     s:{textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontWeight:800,fontStyle:"normal",fontSize:"clamp(44px,8vw,106px)",color:"#1A6B7A",letterSpacing:"0.03em",opacity:0.95}},
            {t:"coastal light,",  s:{fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontWeight:700,fontSize:"clamp(42px,7.5vw,100px)",color:"transparent",WebkitTextStroke:"1.5px rgba(200,216,220,0.4)",letterSpacing:"0.05em",textTransform:"uppercase",fontStyle:"normal"}},
            {t:"& content that",  s:{textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontWeight:800,fontStyle:"normal",fontSize:"clamp(44px,8vw,106px)",color:"#1A6B7A",letterSpacing:"0.03em",opacity:0.95}},
            {t:"converts.",       s:{textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontWeight:800,fontStyle:"normal",fontSize:"clamp(44px,8vw,106px)",color:"#C8B89A",letterSpacing:"0.03em"}},
          ].map((t,i)=>(
            <Appear key={i} delay={i*0.1}>
              <div style={{...t.s,display:"block",lineHeight:1.0,margin:"0 0 2px"}}>{t.t}</div>
            </Appear>
          ))}
          <Appear delay={0.5}>
            <div style={{display:"flex",alignItems:"center",gap:28,marginTop:56,flexWrap:"wrap"}}>
              <button onClick={()=>setPage("Work With Me")} style={{padding:"14px 40px",background:"rgba(200,184,154,0.12)",border:"1px solid rgba(200,184,154,0.45)",color:"rgba(245,240,232,0.88)",fontSize:10,letterSpacing:"0.28em",textTransform:"uppercase",cursor:"pointer",transition:"all 0.4s",fontFamily:"inherit",backdropFilter:"blur(4px)"}}
                onMouseOver={e=>e.target.style.background="rgba(200,184,154,0.25)"}
                onMouseOut={e=>e.target.style.background="rgba(200,184,154,0.12)"}>
                Work With Me
              </button>
              <span style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:14,color:"rgba(245,240,232,0.3)"}}>Limited spots available each month</span>
            </div>
          </Appear>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <section style={{background:"#EDE8DF",padding:"140px 80px 120px 160px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",bottom:-60,left:0,fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontSize:"clamp(100px,18vw,230px)",color:"rgba(61,99,112,0.04)",textTransform:"uppercase",letterSpacing:"-0.05em",userSelect:"none",lineHeight:1,whiteSpace:"nowrap",fontStyle:"normal"}}>services</div>

        <div style={{maxWidth:1200,position:"relative",zIndex:1}}>
          <Appear>
            <div style={{textAlign:"center",marginBottom:80}}>
              <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:14,color:"#6BB8C4",marginBottom:12,letterSpacing:"0.04em"}}>what i offer</div>
              <h2 style={{textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontWeight:800,fontStyle:"normal",fontSize:"clamp(36px,5vw,58px)",color:"#1A6B7A",letterSpacing:"0.04em",margin:0,lineHeight:1.05}}>
                Four ways to work together.
              </h2>
            </div>
          </Appear>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:2,background:"rgba(107,98,88,0.1)"}}>
            {SERVICES.map((s,i)=>(
              <Appear key={s.n} delay={i*0.1}>
                <div style={{
                  background:"#EDE8DF",padding:"48px 36px",
                  borderTop:"2px solid transparent",transition:"all 0.4s cubic-bezier(.16,1,.3,1)",
                  cursor:"default",height:"100%",
                }}
                  onMouseOver={e=>{e.currentTarget.style.background="#F5F0E8";e.currentTarget.style.borderTopColor="#1E8A9A";e.currentTarget.style.boxShadow="0 8px 40px rgba(28,47,56,0.08)";}}
                  onMouseOut={e=>{e.currentTarget.style.background="#EDE8DF";e.currentTarget.style.borderTopColor="transparent";e.currentTarget.style.boxShadow="none";}}>
                  <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:14,color:"#A8874A",letterSpacing:"0.08em",marginBottom:10}}>{s.sub}</div>
                  <div style={{textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontSize:"clamp(19px,2.2vw,24px)",color:"#1A6B7A",fontWeight:800,marginBottom:18,letterSpacing:"0.04em",fontStyle:"normal"}}>{s.n}</div>
                  <p style={{fontSize:14,color:"#6B6258",lineHeight:1.9,margin:0,opacity:0.78,letterSpacing:"0.01em"}}>{s.body}</p>
                  <div style={{marginTop:24,fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:13,color:"rgba(61,99,112,0.5)",letterSpacing:"0.06em"}}>{s.roman}</div>
                </div>
              </Appear>
            ))}
          </div>

          <Appear delay={0.3}>
            <div style={{textAlign:"center",marginTop:52}}>
              <button onClick={()=>setPage("Work With Me")} style={{padding:"14px 44px",background:"#1E8A9A",color:"#1A6B7A",border:"none",fontSize:10,letterSpacing:"0.28em",textTransform:"uppercase",cursor:"pointer",transition:"background 0.3s",fontFamily:"inherit",boxShadow:"0 6px 28px rgba(61,99,112,0.3)"}}
                onMouseOver={e=>e.target.style.background="#145E6E"}
                onMouseOut={e=>e.target.style.background="#1E8A9A"}>
                See Full Details
              </button>
            </div>
          </Appear>
        </div>
      </section>

      {/* ── BRANDS ───────────────────────────────────────────── */}
      <section style={{background:"#F5F0E8",padding:"120px 80px 100px 160px"}}>
        <div style={{maxWidth:1100}}>
          <Appear>
            <div style={{textAlign:"center",marginBottom:60}}>
              <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:14,color:"#6BB8C4",marginBottom:10,letterSpacing:"0.04em"}}>in good company</div>
              <h2 style={{textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontWeight:800,fontStyle:"normal",fontSize:"clamp(30px,4vw,50px)",color:"#1A6B7A",letterSpacing:"0.04em",margin:0}}>
                Brands I've Worked With
              </h2>
            </div>
          </Appear>
          <Appear delay={0.1}>
            <div style={{display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center"}}>
              {BRANDS.map((b,i)=>(
                <div key={i} style={{padding:"10px 20px",border:"1px solid rgba(107,98,88,0.18)",fontSize:12,color:"#6B6258",letterSpacing:"0.04em",transition:"all 0.3s",cursor:"default",fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:14}}
                  onMouseOver={e=>{e.currentTarget.style.borderColor="rgba(61,99,112,0.5)";e.currentTarget.style.color="#1E8A9A";e.currentTarget.style.background="rgba(61,99,112,0.04)";}}
                  onMouseOut={e=>{e.currentTarget.style.borderColor="rgba(107,98,88,0.18)";e.currentTarget.style.color="#6B6258";e.currentTarget.style.background="transparent";}}>
                  {b}
                </div>
              ))}
            </div>
          </Appear>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section style={{background:"linear-gradient(150deg,#1A6B7A 0%,#145E6E 50%,#1A6B7A 100%)",padding:"130px 80px 120px 160px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",width:"60vw",height:"60vw",maxWidth:700,maxHeight:700,borderRadius:"50%",background:"radial-gradient(circle,rgba(61,99,112,0.28) 0%,transparent 70%)",top:"50%",left:"55%",transform:"translate(-50%,-50%)",pointerEvents:"none"}}/>
        <Appear style={{position:"relative",zIndex:1,maxWidth:680}}>
          <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:16,color:"rgba(200,184,154,0.7)",marginBottom:20,letterSpacing:"0.04em"}}>ready when you are</div>
          <h2 style={{textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontWeight:800,fontStyle:"normal",fontSize:"clamp(32px,5.5vw,68px)",color:"#1A6B7A",letterSpacing:"0.04em",margin:"0 0 22px",lineHeight:1.1}}>
            Let's make something<br/><em style={{color:"#C8B89A"}}>worth remembering.</em>
          </h2>
          <p style={{fontSize:15,color:"rgba(245,240,232,0.55)",maxWidth:420,margin:"0 0 50px",lineHeight:1.9,letterSpacing:"0.01em"}}>
            Limited collaboration spots each month. Restaurants, hotels, cafés, and lifestyle brands welcome.
          </p>
          <button onClick={()=>setPage("Contact")} style={{padding:"16px 52px",background:"#F5F0E8",color:"#1A6B7A",border:"none",fontSize:10,letterSpacing:"0.3em",textTransform:"uppercase",cursor:"pointer",fontWeight:600,transition:"all 0.4s",fontFamily:"inherit",boxShadow:"0 8px 36px rgba(0,0,0,0.25)"}}
            onMouseOver={e=>e.target.style.background="#EDE8DF"}
            onMouseOut={e=>e.target.style.background="#F5F0E8"}>
            Get In Touch
          </button>
        </Appear>
      </section>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//   ABOUT PAGE
// ══════════════════════════════════════════════════════════════
function AboutPage({setPage}){
  return(
    <div style={{background:"#F5F0E8",paddingTop:0}}>
      {/* Header */}
      <div style={{background:"#1A6B7A",padding:"120px 80px 90px 160px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:"-3%",bottom:"-15%",textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontSize:"clamp(120px,22vw,280px)",color:"rgba(61,99,112,0.07)",fontStyle:"normal",pointerEvents:"none",lineHeight:1}}>about</div>
        <Appear style={{position:"relative",zIndex:1}}>
          <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:14,color:"rgba(200,184,154,0.7)",marginBottom:16,letterSpacing:"0.04em"}}>the creator</div>
          <h1 style={{textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontWeight:800,fontStyle:"normal",fontSize:"clamp(48px,8vw,92px)",color:"#1A6B7A",letterSpacing:"0.03em",lineHeight:1.0,margin:0}}>
            Hi — I'm<br/><em style={{color:"#6BB8C4"}}>Francesca Grace.</em>
          </h1>
        </Appear>
      </div>

      <div style={{maxWidth:1100,padding:"100px 80px 120px 160px"}}>
        <div style={{display:"grid",gridTemplateColumns:"3fr 2fr",gap:"60px 80px",alignItems:"start"}} className="r-grid-collapse">
          <div>
            <Appear delay={0.1}>
              <div style={{width:40,height:1,background:"#1E8A9A",marginBottom:36}}/>
              <h2 style={{textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontWeight:800,fontStyle:"normal",fontSize:"clamp(26px,3.5vw,40px)",color:"#1A6B7A",lineHeight:1.15,letterSpacing:"0.04em",marginBottom:28}}>
                The story behind<br/>the content.
              </h2>
              <p style={{fontSize:15,color:"#6B6258",lineHeight:1.95,opacity:0.82,marginBottom:20,letterSpacing:"0.01em"}}>Born and raised in Rhode Island, I started documenting my obsession with great food and beautiful places in 2021. What began as a personal passion became a community of highly engaged followers who trust my recommendations — and act on them.</p>
              <p style={{fontSize:15,color:"#6B6258",lineHeight:1.95,opacity:0.82,marginBottom:20,letterSpacing:"0.01em"}}>Every video I create is cinematic, honest, and crafted to make the viewer feel like they're already there. I only partner with places I genuinely believe in — which is exactly why my audience responds the way they do.</p>
              <p style={{fontSize:15,color:"#6B6258",lineHeight:1.95,opacity:0.82,marginBottom:40,letterSpacing:"0.01em"}}>Whether I'm shooting a hidden waterfront restaurant in Newport, a boutique hotel in Boston, or a café in the West Village, I bring the same eye for light, detail, and atmosphere that makes people want to be there.</p>
              <button onClick={()=>setPage("Work With Me")} style={{padding:"13px 40px",background:"#1E8A9A",color:"#1A6B7A",border:"none",fontSize:10,letterSpacing:"0.28em",textTransform:"uppercase",cursor:"pointer",transition:"background 0.3s",fontFamily:"inherit",boxShadow:"0 6px 28px rgba(61,99,112,0.28)"}}
                onMouseOver={e=>e.target.style.background="#145E6E"}
                onMouseOut={e=>e.target.style.background="#1E8A9A"}>
                Work With Me
              </button>
            </Appear>
          </div>
          <Appear delay={0.25}>
            <div>
              <div style={{background:"#EDE8DF",padding:28,marginBottom:16}}>
                <div style={{fontSize:9,letterSpacing:"0.28em",textTransform:"uppercase",color:"#A8874A",marginBottom:16,fontWeight:400}}>Audience Snapshot</div>
                {[
                  {k:"Primary Demo",  v:"Women 18–34"},
                  {k:"Locations",     v:"RI · MA · NY · FL"},
                  {k:"TikTok",        v:"@frvncesca"},
                  {k:"Instagram",     v:"@frvncescagracee"},
                  {k:"TikTok Likes",  v:"2.9 Million"},
                  {k:"TikTok Views",  v:"10M+ / Year"},
                ].map((a,i)=>(
                  <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:i<5?"1px solid rgba(107,98,88,0.12)":"none",alignItems:"center"}}>
                    <span style={{fontSize:11,color:"#8A8278",letterSpacing:"0.06em"}}>{a.k}</span>
                    <span style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:15,color:"#1A6B7A"}}>{a.v}</span>
                  </div>
                ))}
              </div>
              <div style={{background:"#1A6B7A",padding:24,textAlign:"center"}}>
                <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:13,color:"rgba(200,184,154,0.6)",marginBottom:6,letterSpacing:"0.04em"}}>covering</div>
                <div style={{textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontStyle:"normal",fontSize:17,color:"#1A6B7A",lineHeight:1.7}}>Rhode Island<br/>Boston · New York City<br/>Miami &amp; beyond</div>
              </div>
            </div>
          </Appear>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//   PORTFOLIO PAGE
// ══════════════════════════════════════════════════════════════
function PortfolioPage(){
  const [filter,setFilter]=useState("All");
  const filters=["All","Rhode Island","Boston","New York","Miami"];
  const filtered=filter==="All"?PORTFOLIO_ITEMS:PORTFOLIO_ITEMS.filter(p=>
    filter==="Rhode Island"?(p.city.includes("RI")||p.city.includes("Newport")||p.city.includes("Rhode Island")):
    filter==="Boston"?p.city.includes("Boston"):
    filter==="Miami"?p.city.includes("Miami"):
    p.city.includes("New York")||p.city.includes("NYC")
  );
  return(
    <div style={{background:"#F5F0E8"}}>
      <div style={{background:"#1A6B7A",padding:"120px 80px 80px 160px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:"-2%",bottom:"-15%",textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontSize:"clamp(120px,20vw,260px)",color:"rgba(61,99,112,0.07)",fontStyle:"normal",pointerEvents:"none",lineHeight:1}}>portfolio</div>
        <Appear style={{position:"relative",zIndex:1}}>
          <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:14,color:"rgba(200,184,154,0.7)",marginBottom:16}}>the work</div>
          <h1 style={{textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontWeight:800,fontStyle:"normal",fontSize:"clamp(46px,7vw,86px)",color:"#1A6B7A",letterSpacing:"0.03em",lineHeight:1.0,margin:0}}>Portfolio</h1>
        </Appear>
      </div>

      {/* Filters */}
      <div style={{background:"#EDE8DF",borderBottom:"1px solid rgba(107,98,88,0.12)"}}>
        <div style={{padding:"0 80px 0 160px",display:"flex",gap:0,overflowX:"auto"}}>
          {filters.map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{
              padding:"18px 28px",background:"none",border:"none",
              fontSize:9,letterSpacing:"0.22em",textTransform:"uppercase",cursor:"pointer",
              color:filter===f?"#1E8A9A":"#8A8278",
              borderBottom:filter===f?"2px solid #1E8A9A":"2px solid transparent",
              transition:"all 0.2s",whiteSpace:"nowrap",fontFamily:"inherit",marginBottom:"-1px",
            }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{padding:"60px 80px 120px 160px",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:24}}>
        {filtered.map((item,i)=>(
          <Appear key={item.id} delay={i*0.06}>
            <a href={item.url} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none",display:"block"}}>
              <div style={{
                background:"#EDE8DF",overflow:"hidden",
                transition:"transform 0.6s cubic-bezier(.16,1,.3,1),box-shadow 0.6s",
                boxShadow:"0 2px 16px rgba(28,47,56,0.06)",
              }}
                onMouseOver={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow="0 20px 56px rgba(28,47,56,0.13)";}}
                onMouseOut={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 2px 16px rgba(28,47,56,0.06)";}}>
                <div style={{height:220,background:`linear-gradient(170deg,rgba(61,99,112,0.3),rgba(28,47,56,0.85))`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
                  <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(61,99,112,0.4),rgba(44,72,85,0.9))"}}/>
                  <PhoneCard title={item.title} location={item.city} url={item.url} index={i}/>
                  <div style={{position:"absolute",top:14,right:14,background:"rgba(28,47,56,0.7)",color:"#1A6B7A",fontSize:8,letterSpacing:"0.2em",textTransform:"uppercase",padding:"5px 11px",fontFamily:"inherit",backdropFilter:"blur(8px)"}}>{item.tag}</div>
                </div>
                <div style={{padding:"20px 22px 24px",display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
                  <div>
                    <div style={{fontSize:9,letterSpacing:"0.2em",color:"#6BB8C4",textTransform:"uppercase",marginBottom:7}}>{item.type} · {item.city}</div>
                    <h3 style={{textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontStyle:"normal",fontSize:20,color:"#1A6B7A",fontWeight:800,margin:0,letterSpacing:"0.04em"}}>{item.title}</h3>
                  </div>
                  <span style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:13,color:"#A8874A",whiteSpace:"nowrap",marginLeft:12,paddingBottom:2}}>Watch ↗</span>
                </div>
              </div>
            </a>
          </Appear>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//   ANALYTICS PAGE
// ══════════════════════════════════════════════════════════════
function AnalyticsPage(){
  const {tiktok:tt,instagram:ig}=ANALYTICS;
  return(
    <div style={{background:"#F5F0E8"}}>
      <div style={{background:"#1A6B7A",padding:"120px 80px 80px 160px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:"-2%",bottom:"-15%",textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontSize:"clamp(100px,18vw,240px)",color:"rgba(61,99,112,0.07)",fontStyle:"normal",pointerEvents:"none",lineHeight:1}}>reach</div>
        <Appear style={{position:"relative",zIndex:1}}>
          <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:14,color:"rgba(200,184,154,0.7)",marginBottom:16}}>by the numbers</div>
          <h1 style={{textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontWeight:800,fontStyle:"normal",fontSize:"clamp(40px,6vw,76px)",color:"#1A6B7A",letterSpacing:"0.03em",lineHeight:1.0,margin:0}}>Audience &amp; Analytics</h1>
        </Appear>
      </div>

      <div style={{padding:"80px 80px 120px 160px",maxWidth:1100}}>
        {/* TikTok */}
        <Appear delay={0.1}>
          <div style={{background:"#EDE8DF",marginBottom:36,overflow:"hidden",boxShadow:"0 2px 20px rgba(28,47,56,0.06)"}}>
            <div style={{background:"rgba(28,47,56,0.06)",padding:"20px 28px",display:"flex",alignItems:"center",gap:14,borderBottom:"1px solid rgba(107,98,88,0.1)"}}>
              <div style={{width:36,height:36,borderRadius:"50%",background:"#1A6B7A",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#1A6B7A"}}>♪</div>
              <div>
                <div style={{textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontStyle:"normal",fontSize:16,color:"#1A6B7A"}}>TikTok</div>
                <a href={tt.url} target="_blank" rel="noopener noreferrer" style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:13,color:"#1E8A9A",textDecoration:"none"}}>{tt.handle}</a>
              </div>
            </div>
            <div style={{padding:"32px 28px 36px"}}>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:"rgba(107,98,88,0.1)",marginBottom:36}}>
                {[{v:tt.followers,l:"Followers"},{v:tt.likes,l:"Total Likes"},{v:tt.views,l:tt.viewsLabel}].map((m,i)=>(
                  <div key={i} style={{background:"#EDE8DF",padding:"22px 18px",textAlign:"center"}}>
                    <div style={{textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontStyle:"normal",fontSize:"clamp(24px,4vw,38px)",color:"#1E8A9A",fontWeight:800}}>{m.v}</div>
                    <div style={{fontSize:9,color:"#8A8278",letterSpacing:"0.18em",textTransform:"uppercase",marginTop:5}}>{m.l}</div>
                  </div>
                ))}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:40}}>
                <div>
                  <div style={{fontSize:9,letterSpacing:"0.22em",textTransform:"uppercase",color:"#A8874A",marginBottom:20}}>Gender Split</div>
                  <div style={{display:"flex",alignItems:"center",gap:22}}>
                    <Donut f={tt.female} m={tt.male} cf="#1E8A9A" cm="#C8D8DC"/>
                    <div style={{display:"flex",flexDirection:"column",gap:12}}>
                      <div style={{display:"flex",alignItems:"center",gap:9}}><div style={{width:9,height:9,borderRadius:"50%",background:"#1E8A9A"}}/><span style={{fontSize:14,fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",color:"#1A6B7A"}}>{tt.female}% Female</span></div>
                      <div style={{display:"flex",alignItems:"center",gap:9}}><div style={{width:9,height:9,borderRadius:"50%",background:"#C8D8DC",border:"1px solid rgba(107,98,88,0.2)"}}/><span style={{fontSize:14,fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",color:"#8A8278"}}>{tt.male}% Male</span></div>
                    </div>
                  </div>
                </div>
                <div>
                  <div style={{fontSize:9,letterSpacing:"0.22em",textTransform:"uppercase",color:"#A8874A",marginBottom:20}}>Age Breakdown</div>
                  <Bar data={tt.ages} color="#1E8A9A"/>
                </div>
              </div>
              <div style={{marginTop:28,padding:"16px 20px",background:"rgba(61,99,112,0.06)",borderLeft:"3px solid #1E8A9A"}}>
                <p style={{fontSize:13,color:"#6B6258",lineHeight:1.9,margin:0,opacity:0.85}}><strong style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:16,color:"#1A6B7A"}}>Key insight:</strong> My core TikTok audience is women aged 25–34 — prime dining age, high disposable income, and highly influenced by food content. These are the people making Friday night dinner reservations.</p>
              </div>
            </div>
          </div>
        </Appear>

        {/* Instagram */}
        <Appear delay={0.15}>
          <div style={{background:"#EDE8DF",marginBottom:60,overflow:"hidden",boxShadow:"0 2px 20px rgba(28,47,56,0.06)"}}>
            <div style={{background:"rgba(28,47,56,0.06)",padding:"20px 28px",display:"flex",alignItems:"center",gap:14,borderBottom:"1px solid rgba(107,98,88,0.1)"}}>
              <div style={{width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>◎</div>
              <div>
                <div style={{textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontStyle:"normal",fontSize:16,color:"#1A6B7A"}}>Instagram</div>
                <a href={ig.url} target="_blank" rel="noopener noreferrer" style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:13,color:"#1E8A9A",textDecoration:"none"}}>{ig.handle}</a>
              </div>
            </div>
            <div style={{padding:"32px 28px 36px"}}>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:"rgba(107,98,88,0.1)",marginBottom:36}}>
                {[{v:ig.followers,l:"Followers"},{v:ig.views,l:ig.viewsLabel},{v:`${ig.female}%`,l:"Female Audience"}].map((m,i)=>(
                  <div key={i} style={{background:"#EDE8DF",padding:"22px 18px",textAlign:"center"}}>
                    <div style={{textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontStyle:"normal",fontSize:"clamp(24px,4vw,38px)",color:"#1E8A9A",fontWeight:800}}>{m.v}</div>
                    <div style={{fontSize:9,color:"#8A8278",letterSpacing:"0.18em",textTransform:"uppercase",marginTop:5}}>{m.l}</div>
                  </div>
                ))}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:40}}>
                <div>
                  <div style={{fontSize:9,letterSpacing:"0.22em",textTransform:"uppercase",color:"#A8874A",marginBottom:20}}>Gender Split</div>
                  <div style={{display:"flex",alignItems:"center",gap:22}}>
                    <Donut f={ig.female} m={ig.male} cf="#6BB8C4" cm="#E8E0D0"/>
                    <div style={{display:"flex",flexDirection:"column",gap:12}}>
                      <div style={{display:"flex",alignItems:"center",gap:9}}><div style={{width:9,height:9,borderRadius:"50%",background:"#6BB8C4"}}/><span style={{fontSize:14,fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",color:"#1A6B7A"}}>{ig.female}% Female</span></div>
                      <div style={{display:"flex",alignItems:"center",gap:9}}><div style={{width:9,height:9,borderRadius:"50%",background:"#E8E0D0",border:"1px solid rgba(107,98,88,0.2)"}}/><span style={{fontSize:14,fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",color:"#8A8278"}}>{ig.male}% Male</span></div>
                    </div>
                  </div>
                </div>
                <div>
                  <div style={{fontSize:9,letterSpacing:"0.22em",textTransform:"uppercase",color:"#A8874A",marginBottom:20}}>Age Breakdown</div>
                  <Bar data={ig.ages} color="#6BB8C4"/>
                </div>
              </div>
              <div style={{marginTop:28,padding:"16px 20px",background:"rgba(143,163,168,0.08)",borderLeft:"3px solid #6BB8C4"}}>
                <p style={{fontSize:13,color:"#6B6258",lineHeight:1.9,margin:0,opacity:0.85}}><strong style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:16,color:"#1A6B7A"}}>Key insight:</strong> Instagram skews younger — 18–24 at 47.5% — with 83.2% female. Ideal for lifestyle, dining, and hotel brands targeting millennial and Gen-Z women.</p>
              </div>
            </div>
          </div>
        </Appear>

        {/* Why it matters */}
        <Appear delay={0.2}>
          <div style={{borderTop:"1px solid rgba(107,98,88,0.15)",paddingTop:56}}>
            <div style={{fontSize:9,letterSpacing:"0.28em",textTransform:"uppercase",color:"#A8874A",marginBottom:32}}>Why It Matters</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:20}}>
              {[
                {t:"Views ≠ Followers", b:"10M+ TikTok views on 6.4K followers. My content reaches far beyond my base — viral reach is the goal and the track record."},
                {t:"Highly Targeted",   b:"Women 18–34 dominate both platforms. Active, engaged, and they act on what they see. Real reservations, real visits."},
                {t:"Real Engagement",   b:"2.9 million likes isn't passive viewing. My audience saves, shares, and shows up. Content becomes customers."},
              ].map((c,i)=>(
                <div key={i} style={{padding:"28px 24px",border:"1px solid rgba(107,98,88,0.14)",background:"#EDE8DF"}}>
                  <h4 style={{textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontStyle:"normal",fontSize:18,color:"#1A6B7A",fontWeight:800,marginBottom:10,letterSpacing:"0.04em"}}>{c.t}</h4>
                  <p style={{fontSize:13,color:"#6B6258",lineHeight:1.9,margin:0,opacity:0.78}}>{c.b}</p>
                </div>
              ))}
            </div>
          </div>
        </Appear>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//   WORK WITH ME PAGE
// ══════════════════════════════════════════════════════════════
function WorkWithMePage({setPage}){
  return(
    <div style={{background:"#F5F0E8"}}>
      <div style={{background:"#1A6B7A",padding:"120px 80px 80px 160px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:"-2%",bottom:"-12%",textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontSize:"clamp(100px,18vw,220px)",color:"rgba(61,99,112,0.07)",fontStyle:"normal",pointerEvents:"none",lineHeight:1}}>collab</div>
        <Appear style={{position:"relative",zIndex:1}}>
          <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:14,color:"rgba(200,184,154,0.7)",marginBottom:16}}>partnerships</div>
          <h1 style={{textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontWeight:800,fontStyle:"normal",fontSize:"clamp(42px,7vw,82px)",color:"#1A6B7A",letterSpacing:"0.03em",lineHeight:1.0,margin:"0 0 18px"}}>Work With Me</h1>
          <p style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",color:"rgba(245,240,232,0.6)",fontSize:17,maxWidth:520,margin:0,lineHeight:1.85}}>I work with restaurants, hotels, cafés, and local businesses to create content that drives real foot traffic, bookings, and brand love.</p>
        </Appear>
      </div>

      <div style={{padding:"90px 80px 120px 160px",maxWidth:1100}}>
        <Appear>
          <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:14,color:"#6BB8C4",marginBottom:40,letterSpacing:"0.04em"}}>services</div>
        </Appear>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:20,marginBottom:100}}>
          {SERVICES.map((s,i)=>(
            <Appear key={s.n} delay={i*0.1}>
              <div style={{background:"#EDE8DF",padding:"40px 30px",borderTop:"2px solid rgba(61,99,112,0.2)",height:"100%",transition:"all 0.4s"}}
                onMouseOver={e=>{e.currentTarget.style.boxShadow="0 10px 44px rgba(28,47,56,0.1)";e.currentTarget.style.borderTopColor="#1E8A9A";}}
                onMouseOut={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.borderTopColor="rgba(61,99,112,0.2)";}}>
                <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:13,color:"#A8874A",marginBottom:8,letterSpacing:"0.06em"}}>{s.sub}</div>
                <h3 style={{textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontStyle:"normal",fontSize:"clamp(19px,2.3vw,24px)",color:"#1A6B7A",fontWeight:800,marginBottom:16,letterSpacing:"0.04em"}}>{s.n}</h3>
                <p style={{fontSize:14,color:"#6B6258",lineHeight:1.9,margin:0,opacity:0.78,letterSpacing:"0.01em"}}>{s.body}</p>
                <div style={{marginTop:20,fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:22,color:"rgba(107,98,88,0.2)"}}>{s.roman}</div>
              </div>
            </Appear>
          ))}
        </div>

        <Appear>
          <div style={{borderTop:"1px solid rgba(107,98,88,0.15)",paddingTop:70,marginBottom:52}}>
            <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:14,color:"#6BB8C4",marginBottom:14,letterSpacing:"0.04em"}}>the process</div>
            <h2 style={{textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontWeight:800,fontStyle:"normal",fontSize:"clamp(28px,4vw,46px)",color:"#1A6B7A",letterSpacing:"0.04em",margin:0,lineHeight:1.1}}>
              Simple. Seamless. <em style={{color:"#1E8A9A"}}>Stress-free.</em>
            </h2>
          </div>
        </Appear>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16,marginBottom:100}}>
          {[
            {step:"01",t:"Reach Out",      d:"Fill in the contact form. I get back to you within 48 hours."},
            {step:"02",t:"Creative Brief", d:"We align on goals. I handle all creative direction from there."},
            {step:"03",t:"Shoot & Edit",   d:"I come to you and edit in my signature cinematic style."},
            {step:"04",t:"Deliver & Post", d:"Review the final cut. I post — or hand over raw files for your use."},
          ].map((p,i)=>(
            <Appear key={i} delay={i*0.09}>
              <div style={{background:"#EDE8DF",padding:"30px 22px"}}>
                <div style={{textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontStyle:"normal",fontSize:44,color:"rgba(107,98,88,0.15)",lineHeight:1,marginBottom:16}}>{p.step}</div>
                <h4 style={{textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontStyle:"normal",fontSize:18,color:"#1A6B7A",fontWeight:800,marginBottom:10}}>{p.t}</h4>
                <p style={{fontSize:13,color:"#6B6258",lineHeight:1.9,margin:0,opacity:0.78}}>{p.d}</p>
              </div>
            </Appear>
          ))}
        </div>

        <Appear delay={0.1}>
          <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:14,color:"#6BB8C4",marginBottom:32,letterSpacing:"0.04em"}}>frequently asked</div>
          {[
            {q:"Do you only work with businesses in New England?",a:"New England is my home base — Rhode Island, Boston, and Newport are where I spend most of my time. I also cover New York City and Miami regularly, and take select partnerships further afield on a case-by-case basis."},
            {q:"Can I give you specific talking points?",a:"Yes. You'll receive a brief questionnaire before every project so I understand exactly what matters to you. Beyond that, I handle the creative — that's why it works."},
            {q:"How long from inquiry to posting?",a:"Typically 7–10 business days from the shoot date. If you need something faster, mention it in your inquiry."},
            {q:"Sponsored content vs UGC — what's the difference?",a:"Sponsored content goes live on my platforms — you get the reach and the association. UGC is raw footage delivered to you for your own paid ads. Both are great; they serve different goals."},
            {q:"Do you work with brands outside food and hospitality?",a:"Mostly food, travel, and lifestyle. If your brand fits the world I create content in, let's talk. I'll be honest if it doesn't."},
          ].map((f,i)=><FAQ key={i} q={f.q} a={f.a}/>)}
        </Appear>

        <Appear delay={0.1}>
          <div style={{textAlign:"center",marginTop:72}}>
            <p style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:17,color:"#8A8278",marginBottom:26}}>Ready to get started?</p>
            <button onClick={()=>setPage("Contact")} style={{padding:"15px 48px",background:"#1E8A9A",color:"#1A6B7A",border:"none",fontSize:10,letterSpacing:"0.28em",textTransform:"uppercase",cursor:"pointer",transition:"background 0.3s",fontFamily:"inherit",boxShadow:"0 6px 28px rgba(61,99,112,0.28)"}}
              onMouseOver={e=>e.target.style.background="#145E6E"}
              onMouseOut={e=>e.target.style.background="#1E8A9A"}>
              Send an Inquiry
            </button>
          </div>
        </Appear>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//   CONTACT PAGE
// ══════════════════════════════════════════════════════════════
function ContactPage(){
  const [form,setForm]=useState({name:"",email:"",business:"",type:"",message:""});
  const [sent,setSent]=useState(false);
  const inp={
    width:"100%",background:"#EDE8DF",border:"1px solid rgba(107,98,88,0.18)",
    color:"#1A6B7A",padding:"14px 16px",fontSize:15,outline:"none",
    boxSizing:"border-box",transition:"border-color 0.25s",fontFamily:"'Cormorant Garamond',Georgia,serif",
    fontStyle:"italic",letterSpacing:"0.02em",
  };
  return(
    <div style={{background:"#F5F0E8"}}>
      <div style={{background:"#1A6B7A",padding:"120px 80px 80px 160px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:"-2%",bottom:"-12%",textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontSize:"clamp(100px,18vw,220px)",color:"rgba(61,99,112,0.07)",fontStyle:"normal",pointerEvents:"none",lineHeight:1}}>hello</div>
        <Appear style={{position:"relative",zIndex:1}}>
          <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:14,color:"rgba(200,184,154,0.7)",marginBottom:16}}>get in touch</div>
          <h1 style={{textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontWeight:800,fontStyle:"normal",fontSize:"clamp(44px,7vw,88px)",color:"#1A6B7A",letterSpacing:"0.03em",lineHeight:1.0,margin:0}}>Let's talk.</h1>
        </Appear>
      </div>

      <div style={{maxWidth:680,padding:"80px 80px 120px 160px"}}>
        <Appear>
          <p style={{fontSize:15,color:"#6B6258",lineHeight:1.95,marginBottom:52,opacity:0.82,letterSpacing:"0.01em"}}>Tell me about your business and what you're hoping to achieve. I reply to every inquiry personally within 48 hours.</p>
        </Appear>

        {sent?(
          <Appear>
            <div style={{textAlign:"center",padding:"64px 24px",border:"1px solid rgba(107,98,88,0.15)",background:"#EDE8DF"}}>
              <div style={{textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontStyle:"normal",fontSize:32,color:"#1E8A9A",marginBottom:18}}>✦</div>
              <h3 style={{textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontWeight:800,fontStyle:"normal",fontSize:26,color:"#1A6B7A",marginBottom:10}}>Message received.</h3>
              <p style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:15,color:"#8A8278"}}>I'll be in touch within 48 hours. Lovely to hear from you.</p>
            </div>
          </Appear>
        ):(
          <Appear delay={0.1}>
            <div style={{display:"flex",flexDirection:"column",gap:22}}>
              {[
                {k:"name",    l:"Your Name",     t:"text",  p:"Jane Smith"},
                {k:"email",   l:"Email Address", t:"email", p:"jane@yourbusiness.com"},
                {k:"business",l:"Business Name", t:"text",  p:"The Blue Door Café"},
              ].map(f=>(
                <div key={f.k}>
                  <label style={{display:"block",fontSize:9,color:"#A8874A",letterSpacing:"0.28em",textTransform:"uppercase",marginBottom:9,fontWeight:400}}>{f.l}</label>
                  <input type={f.t} placeholder={f.p} value={form[f.k]} onChange={e=>setForm({...form,[f.k]:e.target.value})}
                    style={inp} onFocus={e=>e.target.style.borderColor="#1E8A9A"} onBlur={e=>e.target.style.borderColor="rgba(107,98,88,0.18)"}/>
                </div>
              ))}
              <div>
                <label style={{display:"block",fontSize:9,color:"#A8874A",letterSpacing:"0.28em",textTransform:"uppercase",marginBottom:9,fontWeight:400}}>I'm Interested In</label>
                <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}
                  style={{...inp,cursor:"pointer",color:form.type?"#1A6B7A":"rgba(107,98,88,0.5)"}}>
                  <option value="" disabled>Select a service…</option>
                  <option>Sponsored Content</option><option>Photography</option>
                  <option>Consulting</option><option>Monthly Retainer</option>
                  <option>Not sure yet — let's talk</option>
                </select>
              </div>
              <div>
                <label style={{display:"block",fontSize:9,color:"#A8874A",letterSpacing:"0.28em",textTransform:"uppercase",marginBottom:9,fontWeight:400}}>Tell Me More</label>
                <textarea placeholder="A bit about your business and what you're hoping to achieve…" rows={5}
                  value={form.message} onChange={e=>setForm({...form,message:e.target.value})}
                  style={{...inp,resize:"vertical"}} onFocus={e=>e.target.style.borderColor="#1E8A9A"} onBlur={e=>e.target.style.borderColor="rgba(107,98,88,0.18)"}/>
              </div>
              <button onClick={()=>{if(form.name&&form.email&&form.message)setSent(true);}}
                style={{padding:"15px 44px",background:"#1E8A9A",color:"#1A6B7A",border:"none",fontSize:10,letterSpacing:"0.28em",textTransform:"uppercase",cursor:"pointer",alignSelf:"flex-start",transition:"background 0.3s",fontFamily:"inherit",boxShadow:"0 6px 28px rgba(61,99,112,0.28)"}}
                onMouseOver={e=>e.target.style.background="#145E6E"}
                onMouseOut={e=>e.target.style.background="#1E8A9A"}>
                Send Inquiry
              </button>
            </div>
          </Appear>
        )}

        <Appear delay={0.25}>
          <div style={{marginTop:64,paddingTop:48,borderTop:"1px solid rgba(107,98,88,0.12)",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:28}}>
            {[
              {l:"Email",        v:"frvncescagrace@gmail.com",           h:"mailto:frvncescagrace@gmail.com"},
              {l:"TikTok",       v:"@frvncesca",                         h:"https://www.tiktok.com/@frvncesca"},
              {l:"Instagram",    v:"@frvncescagracee",                   h:"https://www.instagram.com/frvncescagracee"},
              {l:"Response Time",v:"Within 48 hours"},
            ].map(c=>(
              <div key={c.l}>
                <div style={{fontSize:9,letterSpacing:"0.25em",textTransform:"uppercase",color:"#A8874A",marginBottom:8,fontWeight:400}}>{c.l}</div>
                {c.h?<a href={c.h} target="_blank" rel="noopener noreferrer" style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:14,color:"#1E8A9A",textDecoration:"none"}}>{c.v}</a>
                    :<div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:14,color:"#6B6258",opacity:0.8}}>{c.v}</div>}
              </div>
            ))}
          </div>
        </Appear>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//   APP SHELL
// ══════════════════════════════════════════════════════════════
const NAV_LINKS=["Home","About","Portfolio","Analytics","Work With Me","Contact"];

export default function App(){
  const [page,setPage]=useState("Home");
  const [menuOpen,setMenuOpen]=useState(false);
  const scrollY=useScrollY();
  const isHero=page==="Home"&&scrollY<80;

  useEffect(()=>{window.scrollTo(0,0);setMenuOpen(false);},[page]);

  const pages={
    Home:<HomePage setPage={setPage}/>,
    About:<AboutPage setPage={setPage}/>,
    Portfolio:<PortfolioPage/>,
    Analytics:<AnalyticsPage/>,
    "Work With Me":<WorkWithMePage setPage={setPage}/>,
    Contact:<ContactPage/>,
  };

  return(
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,700;1,9..144,300;1,9..144,400;1,9..144,700&family=Barlow+Condensed:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,300;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400;1,600&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background:#F5F0E8;-webkit-font-smoothing:antialiased;font-family:'Cormorant Garamond',Georgia,serif;}
        .grainy{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E") !important;}
        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(32px);}to{opacity:1;transform:translateY(0);}}
        @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
        @keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}
        textarea::placeholder,input::placeholder{color:rgba(107,98,88,0.45);font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;}
        select option{background:#EDE8DF;color:#1A6B7A;font-family:'Cormorant Garamond',Georgia,serif;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-track{background:#F5F0E8;}
        ::-webkit-scrollbar-thumb{background:#6BB8C4;}
        section,footer{position:relative;}
        section::before,footer::before{content:"";position:absolute;inset:0;backgroundImage:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");pointerEvents:none;zIndex:1;mixBlendMode:multiply;}
        .r-grid-collapse{grid-template-columns:1fr!important;}
        @media(min-width:800px){.r-grid-collapse{grid-template-columns:3fr 2fr!important;}}
      `}</style>

      <Grain/>

      {/* ── LEFT SIDEBAR NAV ──────────────────────────────────── */}
      <nav style={{
        position:"fixed",top:0,left:0,bottom:0,
        width:130,zIndex:500,
        display:"flex",flexDirection:"column",
        justifyContent:"space-between",
        padding:"40px 24px",
        background:isHero?"transparent":"rgba(245,240,232,0.97)",
        backdropFilter:isHero?"none":"blur(20px)",
        borderRight:isHero?"none":"1px solid rgba(107,98,88,0.1)",
        transition:"background 0.6s,border-color 0.6s,backdrop-filter 0.6s",
        pointerEvents:"all",
      }}>
        {/* Logo */}
        <div>
          <button onClick={()=>setPage("Home")} style={{
            background:"none",border:"none",cursor:"pointer",
            textAlign:"left",padding:0,
          }}>
            <div style={{fontFamily:"'Great Vibes',cursive",fontWeight:400,fontSize:22,color:isHero?"rgba(245,240,232,0.95)":"#1A6B7A",letterSpacing:"0.02em",lineHeight:1.2,transition:"color 0.4s"}}>
              Francesca Grace
            </div>
          </button>
          <div style={{width:20,height:1,background:isHero?"rgba(200,184,154,0.4)":"rgba(107,98,88,0.2)",marginTop:10,transition:"background 0.4s"}}/>
        </div>

        {/* Nav links — vertical */}
        <div style={{display:"flex",flexDirection:"column",gap:4}}>
          {NAV_LINKS.map(l=>(
            <button key={l} onClick={()=>setPage(l)} style={{
              background:"none",border:"none",cursor:"pointer",
              textAlign:"left",padding:"6px 0",
              fontFamily:"inherit",
              fontSize:9,letterSpacing:"0.22em",textTransform:"uppercase",
              color:page===l
                ?(isHero?"#C8B89A":"#1E8A9A")
                :(isHero?"rgba(245,240,232,0.45)":"rgba(107,98,88,0.5)"),
              transition:"color 0.3s",
              position:"relative",
            }}
              onMouseOver={e=>e.target.style.color=isHero?"rgba(245,240,232,0.9)":"#1A6B7A"}
              onMouseOut={e=>{e.target.style.color=page===l?(isHero?"#C8B89A":"#1E8A9A"):(isHero?"rgba(245,240,232,0.45)":"rgba(107,98,88,0.5)");}}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Social links bottom */}
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {[
            {l:"TikTok",h:"https://www.tiktok.com/@frvncesca"},
            {l:"Instagram",h:"https://www.instagram.com/frvncescagracee"},
          ].map(s=>(
            <a key={s.l} href={s.h} target="_blank" rel="noopener noreferrer" style={{
              fontSize:8,letterSpacing:"0.22em",textTransform:"uppercase",
              color:isHero?"rgba(245,240,232,0.35)":"rgba(107,98,88,0.45)",
              textDecoration:"none",transition:"color 0.3s",fontFamily:"inherit",
            }}
              onMouseOver={e=>e.target.style.color=isHero?"rgba(245,240,232,0.8)":"#1E8A9A"}
              onMouseOut={e=>e.target.style.color=isHero?"rgba(245,240,232,0.35)":"rgba(107,98,88,0.45)"}>
              {s.l}
            </a>
          ))}
        </div>
      </nav>

      {/* ── MOBILE HAMBURGER ─────────────────────────────────── */}
      <button onClick={()=>setMenuOpen(!menuOpen)} style={{
        position:"fixed",top:20,right:20,zIndex:600,
        background:"none",border:"none",cursor:"pointer",
        display:"flex",flexDirection:"column",gap:5,padding:6,
      }}>
        {[0,1,2].map(i=>(
          <div key={i} style={{
            width:22,height:1.5,
            background:isHero&&!menuOpen?"rgba(245,240,232,0.8)":"#1A6B7A",
            transition:"all 0.28s",
            transform:menuOpen&&i===0?"rotate(45deg) translate(4.5px,4.5px)":menuOpen&&i===2?"rotate(-45deg) translate(4.5px,-4.5px)":"none",
            opacity:menuOpen&&i===1?0:1,
          }}/>
        ))}
      </button>

      {/* ── FULL SCREEN MENU OVERLAY ─────────────────────────── */}
      <div style={{
        position:"fixed",inset:0,zIndex:550,
        background:"rgba(245,240,232,0.98)",
        display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,
        opacity:menuOpen?1:0,pointerEvents:menuOpen?"all":"none",
        transition:"opacity 0.4s cubic-bezier(.16,1,.3,1)",
      }}>
        <div style={{position:"absolute",textTransform:"uppercase",fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",fontSize:"38vw",color:"rgba(61,99,112,0.03)",fontStyle:"normal",userSelect:"none",pointerEvents:"none",lineHeight:1}}>F</div>
        <div style={{position:"relative",zIndex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
          {NAV_LINKS.map((l,i)=>(
            <button key={l} onClick={()=>setPage(l)} style={{
              background:"none",border:"none",cursor:"pointer",
              fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif",
              fontStyle:"italic",fontSize:"clamp(28px,6vw,50px)",
              color:page===l?"#1E8A9A":"#1A6B7A",
              transform:menuOpen?"translateY(0)":"translateY(22px)",
              transition:`transform 0.55s cubic-bezier(.16,1,.3,1) ${i*0.07}s, opacity 0.55s ease ${i*0.07}s, color 0.2s`,
              opacity:menuOpen?1:0,padding:"6px 0",
              letterSpacing:"-0.01em",
            }}>{l}</button>
          ))}
        </div>
        <div style={{position:"absolute",bottom:40,display:"flex",gap:28}}>
          {[{l:"TikTok",h:"https://www.tiktok.com/@frvncesca"},{l:"Instagram",h:"https://www.instagram.com/frvncescagracee"},{l:"Email",h:"mailto:frvncescagrace@gmail.com"}].map(s=>(
            <a key={s.l} href={s.h} target="_blank" rel="noopener noreferrer" style={{fontSize:10,letterSpacing:"0.22em",textTransform:"uppercase",color:"rgba(107,98,88,0.45)",textDecoration:"none",fontFamily:"inherit",transition:"color 0.2s"}}
              onMouseOver={e=>e.target.style.color="#1E8A9A"}
              onMouseOut={e=>e.target.style.color="rgba(107,98,88,0.45)"}>{s.l}</a>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────── */}
      <main style={{marginLeft:130}}>{pages[page]}</main>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer style={{marginLeft:130,background:"#1A6B7A",padding:"56px 80px 40px 80px",borderTop:"1px solid rgba(61,99,112,0.25)"}}>
        <div style={{maxWidth:1000,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:32,marginBottom:48,paddingBottom:40,borderBottom:"1px solid rgba(61,99,112,0.2)"}}>
          <div>
            <div style={{fontFamily:"'Great Vibes',cursive",fontWeight:400,fontSize:28,color:"#F5F0E8",marginBottom:8}}>Francesca Grace</div>
            <div style={{fontSize:9,color:"rgba(245,240,232,0.3)",letterSpacing:"0.22em",textTransform:"uppercase",lineHeight:1.8}}>
              Food &amp; Travel Creator<br/>Rhode Island · Boston · New York City · Miami
            </div>
          </div>
          <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
            {NAV_LINKS.map(l=>(
              <button key={l} onClick={()=>setPage(l)} style={{background:"none",border:"none",cursor:"pointer",fontSize:9,letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(245,240,232,0.3)",transition:"color 0.2s",fontFamily:"inherit"}}
                onMouseOver={e=>e.target.style.color="#6BB8C4"}
                onMouseOut={e=>e.target.style.color="rgba(245,240,232,0.3)"}>{l}</button>
            ))}
          </div>
          <div style={{display:"flex",gap:20}}>
            {[{l:"TikTok",h:"https://www.tiktok.com/@frvncesca"},{l:"Instagram",h:"https://www.instagram.com/frvncescagracee"},{l:"Email",h:"mailto:frvncescagrace@gmail.com"}].map(s=>(
              <a key={s.l} href={s.h} target="_blank" rel="noopener noreferrer" style={{fontSize:9,color:"rgba(245,240,232,0.3)",letterSpacing:"0.2em",textTransform:"uppercase",textDecoration:"none",transition:"color 0.2s",fontFamily:"inherit"}}
                onMouseOver={e=>e.target.style.color="#6BB8C4"}
                onMouseOut={e=>e.target.style.color="rgba(245,240,232,0.3)"}>{s.l}</a>
            ))}
          </div>
        </div>
        <div style={{maxWidth:1000,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div style={{fontSize:10,color:"rgba(245,240,232,0.18)",letterSpacing:"0.1em"}}>© 2025 Francesca Grace. All rights reserved.</div>
          <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontSize:12,color:"rgba(245,240,232,0.18)",letterSpacing:"0.06em"}}>Rhode Island · Est. 2021</div>
        </div>
      </footer>
    </div>
  );
}
