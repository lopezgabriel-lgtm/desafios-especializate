"use strict";
/* =============================================================================
   DESAFÍOS ESPECIALIZATE — LÓGICA DE LA APP
   Tarjetas, filtros, buscador, modal, guardados (localStorage), router y tema.
   Para cambiar CONTENIDO no hace falta tocar esto: editá assets/js/data.js.
   Requiere que data.js se cargue ANTES que este archivo.
   ============================================================================= */
(function(){
/* ---------------- PROGRESS (localStorage · solo guardados) ---------------- */
const STORE_KEY = "especializate:guardados:v1";
let saved = (function(){ try{ const v=JSON.parse(localStorage.getItem(STORE_KEY)); return Array.isArray(v)?new Set(v):new Set(); }catch(e){ return new Set(); } })();
function persistSaved(){ try{ localStorage.setItem(STORE_KEY, JSON.stringify([...saved])); }catch(e){} }
const isSaved = id => saved.has(id);
function toggleSaved(id){ saved.has(id) ? saved.delete(id) : saved.add(id); persistSaved(); return saved.has(id); }

/* ---------------- HELPERS ---------------- */
const $  = (s,c=document) => c.querySelector(s);
const $$ = (s,c=document) => Array.from(c.querySelectorAll(s));
const byId = id => CHALLENGES.find(c=>c.id===id);
const esc = s => String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
const norm = s => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
const icon = (id,cls="") => `<svg class="${cls}" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><use href="#${id}"/></svg>`;
const nDesafios = n => `${n} ${n===1?"desafío":"desafíos"}`;
const durLabel = m => `${m} min`;
function prefersReduced(){ try{ return matchMedia("(prefers-reduced-motion:reduce)").matches; }catch(e){ return false; } }

function searchIndex(ch){
  if(ch._idx) return ch._idx;
  const parts = [ch.title, ch.description, SECTORS[ch.sector].label, COURSES[ch.course].label,
    DIFFICULTIES[ch.difficulty].label, ...ch.skills.map(s=>SKILLS[s]), ...(ch.tools||[]), ...(ch.keywords||[])];
  return ch._idx = norm(parts.join(" "));
}

/* ---------------- COMPONENTES ---------------- */
function sectorTile(sectorId,big){ const s=SECTORS[sectorId]; return `<span class="sector-tile${big?" sector-tile--lg":""}">${icon(s.icon)}</span>`; }
function sectorChip(sectorId){ const s=SECTORS[sectorId]; return `<span class="chip chip--sector"><span class="chip__dot" aria-hidden="true"></span>${esc(s.label)}</span>`; }
function skillChips(skills){ return skills.map(k=>`<span class="chip chip--skill">${esc(SKILLS[k]||k)}</span>`).join(""); }
function diffEl(diffId){ const d=DIFFICULTIES[diffId]; return `<span class="diff" data-level="${d.level}"><span class="diff__bars" aria-hidden="true"><i></i><i></i><i></i></span>${d.label}</span>`; }
function diffPill(diffId){ const d=DIFFICULTIES[diffId]; return `<span class="diff-pill" data-level="${d.level}"><span class="dot" aria-hidden="true"></span>${d.label}</span>`; }
function metaDuration(m){ return `<span class="chip chip--meta">${icon("ic-clock")}${durLabel(m)}</span>`; }

function challengeCard(ch){
  const s=SECTORS[ch.sector], sv=isSaved(ch.id);
  return `
  <article class="card ${s.cls}" data-card="${ch.id}">
    <button class="card__open" type="button" data-open="${ch.id}" aria-label="Ver desafío: ${esc(ch.title)}"></button>
    <div class="card__top">
      <div class="card__sector">${sectorTile(ch.sector)}<span class="card__sector-name">${esc(s.label)}</span></div>
      <button class="save-btn" type="button" data-save="${ch.id}" data-variant="card" aria-pressed="${sv}" aria-label="${sv?"Quitar de guardados":"Guardar desafío"}" title="${sv?"Guardado":"Guardar desafío"}">${icon("ic-bookmark")}</button>
    </div>
    <h3 class="card__title">${esc(ch.title)}</h3>
    <p class="card__desc">${esc(ch.description)}</p>
    <div class="card__skills">${skillChips(ch.skills)}</div>
    <div class="card__course">${icon("ic-book")}Curso: ${esc(COURSES[ch.course].short)}</div>
    <div class="card__foot">
      <div class="card__meta">${diffEl(ch.difficulty)}${metaDuration(ch.duration)}</div>
      <span class="card__ver">Ver desafío ${icon("ic-arrow-right")}</span>
    </div>
  </article>`;
}

/* ---------------- FILTROS (todos multi-select) ---------------- */
const state = { q:"", sector:new Set(), course:new Set(), diff:new Set(), dur:new Set(), skills:new Set() };
const countBySector = sec => CHALLENGES.filter(c=>c.sector===sec).length;
const countByCourse = cr  => CHALLENGES.filter(c=>c.course===cr).length;
function matches(ch){
  if(state.sector.size && !state.sector.has(ch.sector)) return false;
  if(state.course.size && !state.course.has(ch.course)) return false;
  if(state.diff.size && !state.diff.has(ch.difficulty)) return false;
  if(state.dur.size && ![...state.dur].some(id => DURATIONS.find(d=>d.id===id).test(ch.duration))) return false;
  if(state.skills.size && !ch.skills.some(s=>state.skills.has(s))) return false;
  if(state.q){ const q=norm(state.q); if(!q.split(/\s+/).every(tok=>searchIndex(ch).includes(tok))) return false; }
  return true;
}
const activeFilterCount = () => state.sector.size+state.course.size+state.diff.size+state.dur.size+state.skills.size;
const hasAnyFilter = () => state.q!=="" || activeFilterCount()>0;

function renderFilters(){
  // Los filtros se generan a partir de los desafíos realmente cargados:
  // solo se muestran las opciones presentes, y crecen solas al sumar desafíos.
  const has = { sector:new Set(), course:new Set(), diff:new Set(), skills:new Set() };
  CHALLENGES.forEach(c=>{ has.sector.add(c.sector); has.course.add(c.course); has.diff.add(c.difficulty); (c.skills||[]).forEach(s=>has.skills.add(s)); });
  const chipGroup=(title,name,items)=> items.length ? `
    <div class="fgroup">
      <div class="fgroup__title">${title}</div>
      <div class="chip-opts" role="group" aria-label="${title}">${items.map(it=>`
        <button type="button" class="chip-opt" data-filter="${name}" data-value="${it.value}" aria-pressed="false">${esc(it.label)}${it.count!=null?`<span class="chip-opt__n">${it.count}</span>`:""}</button>`).join("")}</div>
    </div>` : "";
  const secItems = Object.entries(SECTORS).filter(([k])=>has.sector.has(k)).map(([k,v])=>({value:k,label:v.label,count:countBySector(k)}));
  const crsItems = Object.entries(COURSES).filter(([k])=>has.course.has(k)).map(([k,v])=>({value:k,label:v.short,count:countByCourse(k)}));
  const difItems = Object.entries(DIFFICULTIES).filter(([k])=>has.diff.has(k)).map(([k,v])=>({value:k,label:v.label}));
  const durItems = DURATIONS.filter(d=>CHALLENGES.some(c=>d.test(c.duration))).map(d=>({value:d.id,label:d.label}));
  const skItems  = Object.entries(SKILLS).filter(([k])=>has.skills.has(k)).map(([k,v])=>({value:k,label:v}));
  $("#filtersBody").innerHTML =
    chipGroup("Sector","sector",secItems) +
    chipGroup("Curso","course",crsItems) +
    chipGroup("Dificultad","diff",difItems) +
    chipGroup("Tiempo estimado","dur",durItems) +
    chipGroup("Habilidades","skills",skItems);
  $$(".chip-opt",$("#filtersBody")).forEach(btn=>{
    btn.addEventListener("click",()=>{
      const set=state[btn.dataset.filter], v=btn.dataset.value;
      const on=!(btn.getAttribute("aria-pressed")==="true");
      btn.setAttribute("aria-pressed",on); on?set.add(v):set.delete(v); renderGrid();
    });
  });
}
function syncFiltersUI(){
  const b=$("#filtersBody"); if(!b) return;
  $$(".chip-opt",b).forEach(btn=>btn.setAttribute("aria-pressed", state[btn.dataset.filter].has(btn.dataset.value)));
}

/* ---------------- GRID ---------------- */
function renderGrid(){
  const list = CHALLENGES.filter(matches);
  $("#grid").innerHTML = list.length
    ? list.map(challengeCard).join("")
    : `<div class="empty" style="grid-column:1/-1">${icon("ic-search")}
        <h3>No encontramos desafíos con esos criterios</h3>
        <p>Probá con otras palabras o quitá algunos filtros para ver más casos.</p>
        <button class="btn btn--soft" type="button" data-clear-all>Limpiar filtros</button></div>`;
  $("#resultCount").innerHTML = list.length===CHALLENGES.length
    ? `${nDesafios(list.length)}`
    : `${nDesafios(list.length)} <span>de ${CHALLENGES.length}</span>`;
  $("#clearAll").hidden = !hasAnyFilter();
  const fc=$("#filtersCount"), n=activeFilterCount();
  if(n){ fc.textContent=n; fc.style.cssText="display:inline-flex;min-width:20px;height:20px;padding:0 6px;border-radius:999px;background:var(--cyan-soft);color:var(--cyan-strong);align-items:center;justify-content:center;font-size:.74rem;margin-left:2px"; }
  else fc.style.display="none";
  $("#searchClear").classList.toggle("is-visible", state.q!=="");
}
function clearAll(){
  state.q=""; ["sector","course","diff","dur","skills"].forEach(k=>state[k].clear());
  const si=$("#searchInput"); if(si) si.value=""; syncFiltersUI(); renderGrid();
}

/* ---------------- MODAL DE DESAFÍO ---------------- */
let modalTrigger=null;
function resourceEl(r, cls){
  // Si el recurso tiene "url", el botón descarga el archivo real (<a download>).
  // Si no tiene "url", muestra un aviso de demostración (útil mientras se cargan los archivos).
  const c = "resource"+(cls?" "+cls:"");
  const inner = `<span class="resource__ic">${icon(RESOURCE_ICONS[r.kind]||"ic-file")}</span>`
    + `<span class="resource__body"><span class="resource__name">${esc(r.name)}</span><span class="resource__meta">${esc(r.type)}${r.meta?" · "+esc(r.meta):""}</span></span>`
    + `<span class="resource__dl" aria-hidden="true">${icon("ic-download")}</span>`;
  return r.url
    ? `<a class="${c}" href="${esc(r.url)}" download target="_blank" rel="noopener" aria-label="Descargar ${esc(r.name)}">${inner}</a>`
    : `<button class="${c}" type="button" data-download="${esc(r.name)}" aria-label="Descargar ${esc(r.name)}">${inner}</button>`;
}
function accordion(num,title,bodyHTML,hint){
  return `<details class="accordion">
    <summary class="accordion__head">
      <span class="accordion__num" aria-hidden="true">${num}</span>
      <span class="accordion__ttl">${esc(title)}${hint?`<span class="accordion__hint">${esc(hint)}</span>`:""}</span>
      <span class="accordion__chev" aria-hidden="true">${icon("ic-chevron")}</span>
    </summary>
    <div class="accordion__body">${bodyHTML}</div>
  </details>`;
}
const videoPh = txt => `<div class="video-ph"><div class="video-ph__play">${icon("ic-play")}</div><span>${esc(txt)}</span></div>`;
// Convierte cualquier link de YouTube/Vimeo (el de "Compartir") al formato para incrustar.
function toEmbed(url){
  if(!url) return "";
  url = String(url).trim();
  let m = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  if(m) return "https://www.youtube.com/embed/" + m[1];
  m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if(m) return "https://player.vimeo.com/video/" + m[1];
  return url; // ya es un link para incrustar u otro proveedor
}
function videoBlock(url, ph){
  const src = toEmbed(url);
  // Si no hay link, no se muestra ningún reproductor (ni cuadro "próximamente").
  return src
    ? `<div class="video-ph video-ph--filled"><iframe src="${esc(src)}" title="${esc(ph)}" allow="fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`
    : "";
}

function buildModal(ch){
  const s=SECTORS[ch.sector], course=COURSES[ch.course], sv=isSaved(ch.id);
  const dataset = ch.resources.find(r=>["archivo","dataset","material"].includes(r.kind)) || ch.resources[0];
  const promptRes = ch.resources.find(r=>r.kind==="prompt") || { name:"Promptbook sectorial.pdf", type:"Promptbook", meta:"Prompts listos para este caso, para trabajar con IA", kind:"prompt" };
  const solution = ch.solution ? `
    <div class="msection">
      <div class="msection__head"><span class="m-num">5</span><h3>Resolución / Goldcopy</h3></div>
      <p class="msection__intro">Cuando termines, compará tu proceso con esta propuesta. No la abras antes de intentarlo.</p>
      <details class="accordion accordion--solution">
        <summary class="accordion__head">
          <span class="accordion__num" aria-hidden="true">${icon("ic-play")}</span>
          <span class="accordion__ttl">Ver propuesta de resolución</span>
          <span class="accordion__chev" aria-hidden="true">${icon("ic-chevron")}</span>
        </summary>
        <div class="accordion__body">
          ${videoBlock(ch.video && ch.video.resolucion, "Video de resolución · próximamente")}
          <h4>El enfoque</h4><p>${esc(ch.solution.approach)}</p>
          <h4>Principales decisiones</h4>
          <ol class="decisions">${ch.solution.decisions.map((d,i)=>`<li><span class="n">${i+1}</span><span>${esc(d)}</span></li>`).join("")}</ol>
          <h4>Archivo resuelto (goldcopy)</h4>
          <div class="kit-grid" style="margin-top:6px">${resourceEl({name:ch.solution.goldcopy.name,type:ch.solution.goldcopy.type,kind:"archivo"})}</div>
          <div class="solution-note">${icon("ic-info")}<span><strong>No existe una única forma correcta de resolver el desafío.</strong> Tomá esta versión como referencia para comparar decisiones y resultados con los tuyos.</span></div>
        </div>
      </details>
    </div>` : "";

  return `
    <div class="m-head ${s.cls}">
      <div class="modal__meta">${sectorChip(ch.sector)}${diffPill(ch.difficulty)}<span class="chip chip--meta">${icon("ic-clock")}${durLabel(ch.duration)}</span></div>
      <h2 id="modalTitle">${esc(ch.title)}</h2>
      <p class="m-desc">${esc(ch.description)}</p>
      <div class="m-head__row">
        <button class="save-btn btn btn--toggle" type="button" data-save="${ch.id}" data-variant="action" aria-pressed="${sv}">${icon("ic-bookmark")} <span data-save-label>${sv?"Guardado":"Guardar desafío"}</span></button>
        <span class="m-course">${icon("ic-book")} Vinculado al curso <strong>${esc(course.short)}</strong> · <button class="linklike" type="button" data-course="${ch.course}">Conocer el curso</button></span>
      </div>
      <div class="m-skills">${skillChips(ch.skills)}</div>
    </div>
    <div class="m-body">
      <div class="msection">
        <div class="msection__head"><span class="m-num">1</span><h3>El contexto</h3></div>
        <p>${esc(ch.context)}</p>
      </div>
      <div class="msection">
        <div class="msection__head"><span class="m-num">2</span><h3>El desafío</h3></div>
        <p class="msection__intro">El problema concreto a resolver aplicando lo que aprendiste en el curso.</p>
        <h4 class="msection__sub">Consigna</h4>
        <div class="callout">${esc(ch.challenge)}</div>
        <h4 class="msection__sub">Entregable esperado</h4>
        <div class="deliverables">${ch.deliverables.map(d=>`<span class="deliverable">${icon("ic-check")}${esc(d)}</span>`).join("")}</div>
      </div>
      <div class="msection">
        <div class="msection__head"><span class="m-num">3</span><h3>Recursos</h3></div>
        <p class="msection__intro">Dos archivos para trabajar el caso: el <strong>dataset</strong> con la información del desafío y el <strong>promptbook sectorial</strong>, una guía con prompts listos para usar con IA en este escenario.</p>
        ${ch.privacidad ? `<div class="m-alert"><span class="m-alert__ic">${icon("ic-alert")}</span><div class="m-alert__body"><strong>Cuidá los datos</strong><p>${esc(ch.privacidad)}</p></div></div>` : ""}
        <div class="kit-grid">${resourceEl(dataset)}${resourceEl(promptRes,"resource--prompt")}</div>
      </div>
      <div class="msection">
        <div class="msection__head"><span class="m-num">4</span><h3>Acompañamiento en video</h3></div>
        <p class="msection__intro">Un video breve te acompaña en la lectura del caso y en cómo encararlo.</p>
        ${videoBlock(ch.video && ch.video.caso, "Video de acompañamiento · próximamente")}
        <div class="hints">
          <div class="hints__ttl">${icon("ic-lightbulb")} ¿Necesitás una mano? Abrí una pista</div>
          <div class="hints__row">${ch.hints.map((hh,i)=>`
            <div class="hint">
              <button class="hint__btn" type="button" data-hint="${ch.id}-${i}" aria-expanded="false" aria-controls="hintpop-${ch.id}-${i}">${icon("ic-lightbulb")} Pista ${i+1}</button>
              <div class="hint__pop" id="hintpop-${ch.id}-${i}" role="dialog" aria-label="Pista ${i+1}" hidden>
                <div class="hint__pop-head"><strong>Pista ${i+1}</strong><button class="hint__pop-close" type="button" data-hint-close aria-label="Cerrar pista">${icon("ic-close")}</button></div>
                <p>${esc(hh)}</p>
              </div>
            </div>`).join("")}</div>
        </div>
      </div>
      ${solution}
    </div>`;
}
function openModal(id, trigger){
  const ch=byId(id); if(!ch) return;
  modalTrigger = trigger || null;
  $("#modalContent").innerHTML = buildModal(ch);
  const m=$("#modal"); m.hidden=false;
  requestAnimationFrame(()=>m.classList.add("is-open"));
  document.body.style.overflow="hidden";
  const c=$("#modalContent"); if(c) c.scrollTop=0;
  $("#modalPanel").focus();
}
function closeModal(){
  const m=$("#modal"); if(!m || m.hidden) return;
  m.classList.remove("is-open"); document.body.style.overflow="";
  const done=()=>{ m.hidden=true; $("#modalContent").innerHTML=""; if(modalTrigger&&document.contains(modalTrigger))modalTrigger.focus(); modalTrigger=null; };
  prefersReduced() ? done() : setTimeout(done,220);
}

function closeHint(pop){ pop.hidden=true; const b=document.querySelector(`[aria-controls="${pop.id}"]`); if(b) b.setAttribute("aria-expanded","false"); }
function closeAllHints(){ $$(".hint__pop").forEach(p=>{ if(!p.hidden) closeHint(p); }); }
function toggleHint(btn){ const pop=document.getElementById(btn.getAttribute("aria-controls")); const open=pop && !pop.hidden; closeAllHints(); if(pop && !open){ pop.hidden=false; btn.setAttribute("aria-expanded","true"); const c=pop.querySelector("[data-hint-close]"); if(c) c.focus(); } }
/* ---------------- GUARDADOS ---------------- */
function renderGuardados(){
  const list=CHALLENGES.filter(c=>isSaved(c.id));
  $("#savedPanel").innerHTML = list.length
    ? `<div class="grid">${list.map(challengeCard).join("")}</div>`
    : `<div class="empty">${icon("ic-bookmark")}<h3>Todavía no guardaste desafíos</h3><p>Guardá los casos que te interesan con el ícono de marcador y volvé a ellos cuando quieras.</p><a class="btn btn--primary" href="#/explorar">Explorar desafíos</a></div>`;
  const c=$("#savedCount"); if(c) c.textContent = list.length ? `${list.length} ${list.length===1?"desafío guardado":"desafíos guardados"}` : "Sin desafíos guardados por ahora";
}
function renderSectorLegend(){
  $("#sectorLegend").innerHTML = Object.entries(SECTORS).map(([k,v])=>
    `<div class="sector-legend__item ${v.cls}">${sectorTile(k)}<div><b>${esc(v.label)}</b><span>${esc(v.blurb)}</span></div></div>`).join("");
}

/* ---------------- SYNC / TOAST ---------------- */
function updateSaveEls(id){
  const val=isSaved(id);
  $$(`[data-save="${id}"]`).forEach(b=>{
    b.setAttribute("aria-pressed",val);
    if(b.dataset.variant==="card"){ b.setAttribute("aria-label", val?"Quitar de guardados":"Guardar desafío"); b.title=val?"Guardado":"Guardar desafío"; }
    const l=b.querySelector("[data-save-label]"); if(l) l.textContent=val?"Guardado":"Guardar desafío";
  });
}
function toast(msg,ic){
  const w=$("#toastWrap"); const t=document.createElement("div"); t.className="toast";
  t.innerHTML=icon("ic-"+(ic||"check"))+`<span>${esc(msg)}</span>`;
  w.appendChild(t); while(w.children.length>3) w.firstChild.remove();
  setTimeout(()=>{ t.style.transition="opacity .3s ease,transform .3s ease"; t.style.opacity="0"; t.style.transform="translateY(8px)"; setTimeout(()=>t.remove(),320); },2500);
}
function copyText(txt){
  const ok=()=>toast("Prompt copiado","check"), bad=()=>toast("No se pudo copiar. Seleccionalo a mano.","info");
  if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(txt).then(ok).catch(bad); }
  else { const ta=document.createElement("textarea"); ta.value=txt; ta.style.position="fixed"; ta.style.opacity="0"; document.body.appendChild(ta); ta.select(); try{document.execCommand("copy");ok();}catch(e){bad();} ta.remove(); }
}

/* ---------------- NAVEGACIÓN ---------------- */
function goExploreWithCourse(courseId){
  state.course=new Set([courseId]); closeModal();
  if(location.hash!=="#/explorar"){ location.hash="#/explorar"; } else { renderGrid(); syncFiltersUI(); }
  toast("Mostrando desafíos de "+COURSES[courseId].short,"book");
}
function closeDrawers(){
  const n=$("#mainnav"); n.classList.remove("is-open"); $("#navToggle").setAttribute("aria-expanded","false");
  $("#filters").classList.remove("is-open"); $("#filtersBackdrop") && $("#filtersBackdrop").classList.remove("is-open");
  if($("#modal").hidden) document.body.style.overflow="";
}

/* ---------------- ROUTER ---------------- */
let currentRoute="explorar", legendDone=false;
function setRoute(){
  closeModal();
  const r=((location.hash||"#/explorar").replace(/^#\/?/,"").split("/")[0])||"explorar";
  const map={explorar:"view-explorar",guardados:"view-guardados",acerca:"view-acerca"};
  const viewId=map[r]||"view-explorar", active=map[r]?r:"explorar";
  if(active==="explorar"){ renderGrid(); syncFiltersUI(); }
  if(active==="guardados"){ renderGuardados(); }
  if(active==="acerca" && !legendDone){ renderSectorLegend(); legendDone=true; }
  $$(".view").forEach(v=>v.classList.toggle("is-active", v.id===viewId));
  $$("#mainnav a").forEach(a=>a.classList.toggle("is-active", a.dataset.route===active));
  currentRoute=active; closeDrawers();
  window.scrollTo({top:0, behavior: prefersReduced()?"auto":"smooth"});
}

/* ---------------- TEMA ---------------- */
const THEME_KEY="especializate:theme";
function effTheme(){ const s=document.documentElement.getAttribute("data-theme"); return s || (matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light"); }
function syncThemeIcon(){ const d=effTheme()==="dark"; $(".ic-theme-dark").style.display=d?"none":"block"; $(".ic-theme-light").style.display=d?"block":"none"; }
function initTheme(){ let t=null; try{t=localStorage.getItem(THEME_KEY);}catch(e){} if(t) document.documentElement.setAttribute("data-theme",t); syncThemeIcon(); }

/* ---------------- WIRING ---------------- */
let deb;
$("#searchInput").addEventListener("input",e=>{ const v=e.target.value; clearTimeout(deb); deb=setTimeout(()=>{ state.q=v.trim(); renderGrid(); },120); });
$("#searchClear").addEventListener("click",()=>{ $("#searchInput").value=""; state.q=""; renderGrid(); $("#searchInput").focus(); });
$("#clearAll").addEventListener("click",clearAll);
$("#themeBtn").addEventListener("click",()=>{ const next=effTheme()==="dark"?"light":"dark"; document.documentElement.setAttribute("data-theme",next); try{localStorage.setItem(THEME_KEY,next);}catch(e){} syncThemeIcon(); });
$("#navToggle").addEventListener("click",()=>{ const n=$("#mainnav"); const open=n.classList.toggle("is-open"); $("#navToggle").setAttribute("aria-expanded",open); });
$("#filtersToggle").addEventListener("click",()=>{ $("#filters").classList.add("is-open"); $("#filtersBackdrop").classList.add("is-open"); document.body.style.overflow="hidden"; });
$("#filtersClose").addEventListener("click",closeDrawers);
$("#filtersBackdrop").addEventListener("click",closeDrawers);
$("#applyFilters").addEventListener("click",closeDrawers);

// modal: Esc + trampa de foco
$("#modal").addEventListener("keydown",e=>{
  if(e.key==="Escape"){ e.preventDefault(); if($$(".hint__pop").some(p=>!p.hidden)){ closeAllHints(); } else { closeModal(); } return; }
  if(e.key!=="Tab") return;
  const f=$$('#modalPanel button:not([disabled]),#modalPanel a[href],#modalPanel summary,#modalPanel [tabindex]:not([tabindex="-1"])');
  if(!f.length) return;
  const first=f[0], last=f[f.length-1];
  if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
  else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
});

// acciones delegadas
document.addEventListener("click",e=>{
  const hcl=e.target.closest("[data-hint-close]"); if(hcl){ const pop=hcl.closest(".hint__pop"); if(pop) closeHint(pop); return; }
  const hb=e.target.closest("[data-hint]"); if(hb){ toggleHint(hb); return; }
  if(!e.target.closest(".hint")) closeAllHints();
  const cl=e.target.closest("[data-close]"); if(cl){ closeModal(); return; }
  const op=e.target.closest("[data-open]"); if(op){ openModal(op.dataset.open, op); return; }
  const save=e.target.closest("[data-save]");
  if(save){ e.preventDefault(); const id=save.dataset.save; const now=toggleSaved(id); updateSaveEls(id); toast(now?"Desafío guardado":"Se quitó de guardados", now?"bookmark":"info"); if(currentRoute==="guardados")renderGuardados(); return; }
  const dl=e.target.closest("[data-download]"); if(dl){ toast("Recurso de ejemplo del prototipo","download"); return; }
  const cpy=e.target.closest("[data-copy]"); if(cpy){ copyText(decodeURIComponent(cpy.dataset.copy)); return; }
  const crs=e.target.closest("[data-course]"); if(crs){ goExploreWithCourse(crs.dataset.course); return; }
  const clr=e.target.closest("[data-clear-all]"); if(clr){ clearAll(); return; }
});

/* ---------------- INIT ---------------- */
initTheme();
renderFilters();
renderGrid();
window.addEventListener("hashchange", setRoute);
setRoute();

})();
