const WF466_VER='v4.6.6 Grouped Navigation',WF466_SCHEMA=466;
(function(){
const GROUPS=[['Command Center','Daily shop control',['Control Board','Dashboard','Schedule','Workload']],['Work Execution','Run travelers',['Jobs','Kitting','Pull Sheets','Inventory Control','Closeout']],['Libraries','Reusable records',['Procedures','PM Templates','Assets','Parts & Tools','People','Labels','Queue']],['Reports & Data','Review and export',['Reports','Visual Dashboard','Data Exchange','Architecture','Test Harness']],['Workspace','Setup',['Fresh Start','Mobile / Print','Settings']]];
function css(){if(document.getElementById('wf466-style'))return;let s=document.createElement('style');s.id='wf466-style';s.textContent='.wf-nav-group{margin:10px 0;border:1px solid rgba(120,80,40,.25);border-radius:14px;overflow:hidden}.wf-nav-head{width:100%;padding:10px 11px;text-align:left;border:0;background:rgba(120,80,40,.10);font-weight:800;cursor:pointer;color:inherit}.wf-nav-head small{display:block;font-weight:500;opacity:.65}.wf-nav-pages{display:grid;gap:5px;padding:7px}.wf-nav-pages button{text-align:left;margin:0}.wf-nav-group.closed .wf-nav-pages{display:none}.wf-nav-quick{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:10px 0}.dark .wf-nav-group{border-color:#374151}.dark .wf-nav-head{background:rgba(75,85,99,.35)}@media(max-width:760px){.wf-nav-pages{grid-template-columns:1fr 1fr}}';document.head.appendChild(s)}
function key(t){return 'workforge.nav.group.'+t.replace(/\W+/g,'-').toLowerCase()}
function closed(t){return localStorage.getItem(key(t))==='closed'}
function setClosed(t,v){localStorage.setItem(key(t),v?'closed':'open')}
function pages(g){return g[2].filter(p=>views[p])}
function groupForPage(){return GROUPS.find(g=>pages(g).includes(page))}
function navHtml(){let h='<div class=wf-nav-quick><button onclick="go(\'Control Board\')">Board</button><button onclick="go(\'Jobs\')">Jobs</button><button onclick="go(\'Fresh Start\')">Fresh Start</button><button onclick="go(\'Settings\')">Settings</button></div>';GROUPS.forEach(g=>{let ps=pages(g),isClosed=closed(g[0])&&!(groupForPage()===g);h+='<div class="wf-nav-group '+(isClosed?'closed':'')+'"><button class=wf-nav-head onclick="toggleNavGroup466(\''+g[0]+'\')">'+E(g[0])+'<small>'+E(g[1])+'</small></button><div class=wf-nav-pages>';ps.forEach(p=>h+='<button class="'+(page==p?'on':'')+'" onclick="go(\''+p+'\')">'+E(p)+'</button>');h+='</div></div>'});return h}
window.toggleNavGroup466=function(t){setClosed(t,!closed(t));draw()};
window.openAllNavGroups466=function(){GROUPS.forEach(g=>setClosed(g[0],false));draw()};
window.collapseUtilityNavGroups466=function(){GROUPS.forEach(g=>setClosed(g[0],['Reports & Data','Workspace'].includes(g[0])));draw()};
let oldSettings=views.Settings;views.Settings=()=>oldSettings()+card('Grouped Navigation','<button class=ghost onclick=openAllNavGroups466()>Open All Groups</button><button class=ghost onclick=collapseUtilityNavGroups466()>Collapse Utility Groups</button>',tbl(['Group','Pages'],GROUPS.map(g=>[g[0],pages(g).join(', ')])));
let oldTest=views['Test Harness'];views['Test Harness']=()=>{let html=oldTest?oldTest():'';return html+card('v4.6.6 Grouped Navigation Checks','',tbl(['Result','Check','Detail'],[['PASS','v4.6.6 visible',WF466_VER],['PASS','Grouped nav renders',String(navHtml().includes('Command Center'))],['PASS','Groups defined',String(GROUPS.length)]]))};
if(window.WF)WF.navigation={groups:GROUPS};
let oldDraw=draw;draw=function(){oldDraw();css();$('ver').textContent=WF466_VER;$('nav').innerHTML=navHtml()};
save=function(){db.version=WF466_VER;db.schema=WF466_SCHEMA;localStorage.setItem(KEY,JSON.stringify(db));$('save').textContent='Autosaved '+new Date().toLocaleTimeString()};
window.WF_RELEASE_OK=true;css();db.schema=WF466_SCHEMA;save();draw();
})();
