type PaperKey = "letter" | "a4" | "legal";
type Settings = { top:number; right:number; bottom:number; left:number; paperSize:PaperKey };

const WORKSPACE_KEY = "codecafe-cv-workspace-v2";
const HOST_ID = "codecafe-live-page-preview";
const PX_PER_MM = 96 / 25.4;
const PAPERS: Record<PaperKey,{width:number;height:number,label:string}> = {
  letter:{width:215.9,height:279.4,label:"Letter"},
  a4:{width:210,height:297,label:"A4"},
  legal:{width:215.9,height:355.6,label:"Legal"},
};

function workspace(): any|null {
  try { return JSON.parse(localStorage.getItem(WORKSPACE_KEY) || "null"); } catch { return null; }
}
function activeId(): string { return workspace()?.activeDocumentId || "default"; }
function settingsKey(): string { return `codecafe-print-settings:${activeId()}`; }
function readSettings(): Settings {
  const ws=workspace();
  const doc=ws?.documents?.find((d:any)=>d.id===ws?.activeDocumentId);
  let local:any={};
  try { local=JSON.parse(localStorage.getItem(settingsKey()) || "null") || {}; } catch {}
  const p={...(doc?.settings?.print||{}),...local};
  const paperSize:PaperKey = p.paperSize === "a4" || p.paperSize === "legal" ? p.paperSize : "letter";
  const clamp=(v:any,d:number)=>Math.max(0,Math.min(50,Number.isFinite(Number(v))?Number(v):d));
  return { top:clamp(p.top,14), right:clamp(p.right,16), bottom:clamp(p.bottom,14), left:clamp(p.left,16), paperSize };
}
function sourcePaper(): HTMLElement|null { return document.querySelector<HTMLElement>(".previewPane > .paper"); }
function cleanClone(source:HTMLElement):HTMLElement {
  const clone=source.cloneNode(true) as HTMLElement;
  clone.classList.remove("paper");
  clone.classList.add("livePreviewFlowContent");
  clone.querySelectorAll<HTMLElement>(".manualPrintBreak,.printMarginGuidesV2,.printBreakTargetV2,.printBreakSpacerV2").forEach(n=>n.remove());
  clone.style.cssText="width:100%!important;max-width:none!important;min-height:0!important;margin:0!important;padding:0!important;box-shadow:none!important;background:transparent!important;box-sizing:border-box!important;";
  return clone;
}
function measure(source:HTMLElement,widthMm:number):number {
  const holder=document.createElement("div");
  holder.style.cssText="position:absolute;left:-100000px;top:0;visibility:hidden;pointer-events:none;";
  const clone=cleanClone(source);
  clone.style.setProperty("width",`${widthMm}mm`,`important`);
  holder.appendChild(clone); document.body.appendChild(holder);
  const h=Math.max(clone.scrollHeight,clone.getBoundingClientRect().height);
  holder.remove(); return h;
}

let rebuilding=false;
let lastSignature="";
function signature(source:HTMLElement,s:Settings):string { return JSON.stringify(s)+"|"+source.innerHTML; }
function rebuild(force=false):void {
  if (rebuilding) return;
  const source=sourcePaper();
  if (!source) return;
  const s=readSettings();
  const sig=signature(source,s);
  if (!force && sig===lastSignature) return;
  rebuilding=true;
  try {
    const paper=PAPERS[s.paperSize];
    const contentW=Math.max(40,paper.width-s.left-s.right);
    const contentH=Math.max(40,paper.height-s.top-s.bottom);
    const total=measure(source,contentW);
    const pages=Math.max(1,Math.min(30,Math.ceil(total/(contentH*PX_PER_MM))));
    let host=document.getElementById(HOST_ID) as HTMLElement|null;
    if (!host) { host=document.createElement("div"); host.id=HOST_ID; host.className="livePageStack"; source.after(host); }
    host.replaceChildren();
    source.style.display="none";
    const count=document.createElement("div"); count.className="livePageCount"; count.textContent=`${paper.label} · ${pages} ${pages===1?"page":"pages"}`; host.appendChild(count);
    for(let i=0;i<pages;i+=1){
      const wrap=document.createElement("section"); wrap.className="livePageWrap";
      const label=document.createElement("div"); label.className="livePageLabel"; label.textContent=`Page ${i+1} / ${pages}`;
      const page=document.createElement("div"); page.className="livePagePaper"; page.style.width=`${paper.width}mm`; page.style.height=`${paper.height}mm`;
      const viewport=document.createElement("div"); viewport.className="livePageViewport"; viewport.style.top=`${s.top}mm`; viewport.style.right=`${s.right}mm`; viewport.style.bottom=`${s.bottom}mm`; viewport.style.left=`${s.left}mm`;
      const flow=document.createElement("div"); flow.className="livePageFlow"; flow.style.width=`${contentW}mm`; flow.style.transform=`translateY(-${i*contentH}mm)`; flow.appendChild(cleanClone(source));
      viewport.appendChild(flow); page.appendChild(viewport); wrap.append(label,page); host.appendChild(wrap);
    }
    lastSignature=sig;
  } finally { rebuilding=false; }
}

export function installLivePreviewPages():void {
  const attach=()=>{
    const src=sourcePaper(); if(!src) return false;
    const observer=new MutationObserver(()=>window.requestAnimationFrame(()=>rebuild()));
    observer.observe(src,{subtree:true,childList:true,characterData:true,attributes:true});
    rebuild(true); return true;
  };
  if(!attach()){
    const boot=new MutationObserver(()=>{ if(attach()) boot.disconnect(); });
    boot.observe(document.documentElement,{subtree:true,childList:true});
  }
  window.setInterval(()=>rebuild(),1000);
  window.addEventListener("focus",()=>rebuild(true));
}
