type PaperKey = "letter" | "a4" | "legal";
type PrintSettings = { top:number; right:number; bottom:number; left:number; paperSize:PaperKey; protectBreaks?:boolean };

const WORKSPACE_KEY = "codecafe-cv-workspace-v2";
const PX_PER_MM = 96 / 25.4;
const PAPERS: Record<PaperKey,{width:number;height:number;label:string}> = {
  letter:{width:215.9,height:279.4,label:"Letter"},
  a4:{width:210,height:297,label:"A4"},
  legal:{width:215.9,height:355.6,label:"Legal"},
};
const DEFAULTS: PrintSettings = { top:14,right:16,bottom:14,left:16,paperSize:"letter",protectBreaks:true };

function readWorkspace(): any | null {
  try { const value=JSON.parse(localStorage.getItem(WORKSPACE_KEY)||"null"); return value?.schema===2&&Array.isArray(value.documents)?value:null; } catch { return null; }
}
function activeDocumentId(): string { return readWorkspace()?.activeDocumentId || "default"; }
function settingsKey(): string { return `codecafe-print-settings:${activeDocumentId()}`; }
function clamp(value:number, fallback:number): number { return Number.isFinite(value)?Math.max(0,Math.min(50,value)):fallback; }
function loadSettings(): PrintSettings {
  let local:any=null; try { local=JSON.parse(localStorage.getItem(settingsKey())||"null"); } catch {}
  const ws=readWorkspace();
  const doc=ws?.documents?.find((d:any)=>d.id===ws.activeDocumentId);
  const merged={...(doc?.settings?.print||{}),...(local||{})};
  const paperSize:PaperKey=merged.paperSize==="a4"||merged.paperSize==="legal"?merged.paperSize:"letter";
  return { top:clamp(Number(merged.top),DEFAULTS.top), right:clamp(Number(merged.right),DEFAULTS.right), bottom:clamp(Number(merged.bottom),DEFAULTS.bottom), left:clamp(Number(merged.left),DEFAULTS.left), paperSize, protectBreaks:merged.protectBreaks!==false };
}
function sourcePaper(): HTMLElement | null { return document.querySelector<HTMLElement>(".previewPane > .paper"); }
function makeClone(source:HTMLElement): HTMLElement {
  const clone=source.cloneNode(true) as HTMLElement;
  clone.classList.remove("paper");
  clone.classList.add("livePreviewFlow");
  clone.querySelectorAll<HTMLElement>("button,input,textarea,select").forEach(el=>{ el.setAttribute("tabindex","-1"); el.style.pointerEvents="none"; });
  clone.style.setProperty("width","100%","important");
  clone.style.setProperty("max-width","none","important");
  clone.style.setProperty("min-height","0","important");
  clone.style.setProperty("margin","0","important");
  clone.style.setProperty("padding","0","important");
  clone.style.setProperty("box-shadow","none","important");
  clone.style.setProperty("background","transparent","important");
  clone.style.setProperty("box-sizing","border-box","important");
  return clone;
}
function measure(source:HTMLElement,widthMm:number): number {
  const holder=document.createElement("div");
  holder.style.cssText="position:absolute;left:-100000px;top:0;visibility:hidden;pointer-events:none;";
  const clone=makeClone(source); clone.style.setProperty("width",`${widthMm}mm`,"important");
  holder.appendChild(clone); document.body.appendChild(holder);
  const height=Math.max(clone.scrollHeight,clone.getBoundingClientRect().height); holder.remove(); return height;
}
function signature(source:HTMLElement, settings:PrintSettings): string {
  return [activeDocumentId(),JSON.stringify(settings),source.className,source.scrollHeight,source.innerText,Array.from(source.querySelectorAll("img")).map(i=>`${i.getAttribute("src")}:${(i as HTMLImageElement).naturalWidth}x${(i as HTMLImageElement).naturalHeight}`).join("|")].join("::");
}
function render(): void {
  const pane=document.querySelector<HTMLElement>(".previewPane");
  const source=sourcePaper(); if(!pane||!source) return;
  const settings=loadSettings(); const paper=PAPERS[settings.paperSize];
  const contentWidth=Math.max(40,paper.width-settings.left-settings.right);
  const contentHeight=Math.max(40,paper.height-settings.top-settings.bottom);
  const pageHeightPx=contentHeight*PX_PER_MM;
  const measured=measure(source,contentWidth);
  const count=Math.max(1,Math.min(30,Math.ceil(measured/pageHeightPx)));
  let host=pane.querySelector<HTMLElement>(":scope > .livePagedPreview");
  if(!host){ host=document.createElement("div"); host.className="livePagedPreview"; source.before(host); }
  host.replaceChildren();
  for(let index=0; index<count; index++){
    const wrap=document.createElement("div"); wrap.className="livePreviewPageWrap";
    const label=document.createElement("div"); label.className="livePreviewPageLabel"; label.textContent=`Page ${index+1} / ${count}`;
    const page=document.createElement("div"); page.className="livePreviewPage"; page.style.width=`${paper.width}mm`; page.style.height=`${paper.height}mm`;
    const viewport=document.createElement("div"); viewport.className="livePreviewViewport";
    viewport.style.top=`${settings.top}mm`; viewport.style.right=`${settings.right}mm`; viewport.style.bottom=`${settings.bottom}mm`; viewport.style.left=`${settings.left}mm`;
    const flow=makeClone(source); flow.style.position="absolute"; flow.style.left="0"; flow.style.right="0"; flow.style.top=`${-(index*pageHeightPx)}px`;
    viewport.appendChild(flow); page.appendChild(viewport); wrap.append(label,page); host.appendChild(wrap);
  }
  source.classList.add("livePreviewMeasurementSource");
  const zoom=pane.querySelector<HTMLElement>(".previewTop .zoom"); if(zoom) zoom.textContent=`${paper.label} · ${count} page${count===1?"":"s"}`;
  host.dataset.pages=String(count);
}

export function installLivePreviewPages(): void {
  let last="";
  const tick=()=>{ const source=sourcePaper(); if(!source) return; const settings=loadSettings(); const next=signature(source,settings); if(next!==last){ last=next; render(); } };
  window.setInterval(tick,350);
  window.addEventListener("resize",()=>{ last=""; tick(); });
  window.addEventListener("storage",()=>{ last=""; tick(); });
  window.addEventListener("codecafe-workspace-reload",()=>{ last=""; window.setTimeout(tick,50); });
  window.setTimeout(tick,50);
}
