const WF37_VER='v3.7 Architecture Cleanup & Reliability',WF37_SCHEMA=370;
(function(){
window.WF_MODULES=[
  {name:'qr.js',role:'local SVG QR rendering',version:'3.6'},
  {name:'app.js',role:'core procedures, jobs, labels, archive, settings',version:'3.6'},
  {name:'assets.js',role:'assets, parts, tools, kitting basics',version:'3.6'},
  {name:'kitting.js',role:'pull sheets and readiness states',version:'3.6'},
  {name:'reports.js',role:'visual dashboard and reports',version:'3.6'},
  {name:'testing.js',role:'full test harness',version:'3.6'},
  {name:'reliability.js',role:'module registry, CSV escaping, empty states, reliability checks',version:'3.7'}
];
function escCsv(v){v=String(v??'');return /[",\n\r]/.test(v)?'"'+v.replaceAll('"','""')+'"':v}
function csv37(n,r){let text=r.map(x=>x.map(escCsv).join(',')).join('\n');let a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type:'text/csv'}));a.download=n;a.click()}
csv=csv37;
function empty(msg){return`<div class=step><b>No records yet.</b><p class=muted>${E(msg)}</p></div>`}
function listOk(v){return Array.isArray(v)&&v.length}
function safeView(name,fn){return function(){try{let html=fn();return html&&String(html).trim()?html:empty(name+' has no records to show.')}catch(e){return card('View Error','',`<p class=need>${E(name)} could not render.</p><pre>${E(e.message||String(e))}</pre>`)}}}
Object.keys(views).forEach(k=>{if(k!='Test Harness'&&k!='Diagnostics')views[k]=safeView(k,views[k])});
function moduleTable(){return tbl(['Layer','Role','Version'],WF_MODULES.map(m=>[m.name,m.role,m.version]))}
function storageInfo(){let bytes=0;try{bytes=(localStorage.getItem(KEY)||'').length}catch{}return tbl(['Setting','Value'],[['Visible version',WF37_VER],['Schema',WF37_SCHEMA],['Local storage key',KEY],['Saved data size',bytes+' characters'],['Loaded layers',WF_MODULES.length]])}
function reliabilityChecks(){let rows=[],pass=(n,ok,d='')=>rows.push([ok?'PASS':'FAIL',n,d]);pass('Version visible',WF37_VER.includes('v3.7'),WF37_VER);pass('Schema migrated',db.schema===WF37_SCHEMA,'schema '+db.schema);pass('Module registry loaded',Array.isArray(WF_MODULES)&&WF_MODULES.length>=7,WF_MODULES.length+' layers');pass('CSV escaping handles commas',escCsv('a,b')==='"a,b"','comma');pass('CSV escaping handles quotes',escCsv('a"b')==='"a""b"','quote');pass('CSV escaping handles newlines',escCsv('a\nb')==='"a\nb"','newline');pass('Safe view wrapper installed',Object.values(views).every(v=>typeof v=='function'),'views '+Object.keys(views).length);pass('Core arrays exist',['jobs','procedures','assets','items','labels','queue','actions','signoffs','archive','log'].every(k=>Array.isArray(db[k])), 'data arrays');pass('No stale queued labels',(db.queue||[]).every(id=>db.labels.some(l=>l.id==id)),(db.queue||[]).length+' queued');pass('QR renderer still available',typeof wfQrSvg=='function','qr.js');pass('Harness available',typeof views['Test Harness']=='function','testing.js');return rows}
let oldSettings37=views.Settings;views.Settings=()=>card('Settings',`<button onclick=exportJSON()>Export JSON</button><button class=ghost onclick=imp.click()>Import JSON</button><button class=ghost onclick=go('Test Harness')>Run Test Harness</button><button class=ghost onclick=go('Architecture')>Architecture</button><button class=bad onclick=clearStore()>Clear Local Storage</button>`,`<p><b>${WF37_VER}</b></p>${storageInfo()}<h3>Loaded Module Registry</h3>${moduleTable()}<p class=muted>The app is now explicitly layered. v3.7 adds reliability guards without disturbing the prior feature modules.</p>`);
if(!P.includes('Architecture'))P.splice(P.indexOf('Settings'),0,'Architecture');
views.Architecture=()=>card('Architecture & Reliability',`<button class=soft onclick=go('Test Harness')>Run Test Harness</button><button class=ghost onclick=csvArchitecture()>Architecture CSV</button>`,`<div class=grid>${m('Layers',WF_MODULES.length)}${m('Views',Object.keys(views).length)}${m('Records',(db.jobs.length+db.procedures.length+db.assets.length+db.items.length+db.labels.length))}${m('Schema',WF37_SCHEMA)}</div><h3>Module Registry</h3>${moduleTable()}<h3>Reliability Checks</h3>${tbl(['Result','Check','Detail'],reliabilityChecks())}<h3>Data Store</h3>${storageInfo()}`);
let oldTest37=views['Test Harness'];views['Test Harness']=()=>{let html=oldTest37?oldTest37():'';let rows=reliabilityChecks(),ok=rows.filter(r=>r[0]=='PASS').length,fail=rows.length-ok;return html+card('v3.7 Reliability Checks',`<button class=ghost onclick=csvReliability()>Reliability CSV</button>`,`<div class=grid>${m('Checks',rows.length)}${m('Pass',ok)}${m('Fail',fail)}${m('Layers',WF_MODULES.length)}</div>${tbl(['Result','Check','Detail'],rows)}`)};
views.Diagnostics=()=>views['Test Harness']();
window.csvArchitecture=function(){csv('workforge-architecture.csv',[['Layer','Role','Version'],...WF_MODULES.map(m=>[m.name,m.role,m.version])])};
window.csvReliability=function(){csv('workforge-reliability.csv',[['Result','Check','Detail'],...reliabilityChecks()])};
let oldExport37=exportJSON;exportJSON=function(){db.version=WF37_VER;db.schema=WF37_SCHEMA;oldExport37()};
save=function(){db.version=WF37_VER;db.schema=WF37_SCHEMA;localStorage.setItem(KEY,JSON.stringify(db));$('save').textContent='Autosaved '+new Date().toLocaleTimeString()};
draw=function(){$('ver').textContent=WF37_VER;$('title').textContent=page;$('nav').innerHTML=P.map((p,i)=>`<button class="${page==p?'on':''}" data-i=${i}>${E(p)}</button>`).join('');document.querySelectorAll('#nav button').forEach(b=>b.onclick=()=>go(P[+b.dataset.i]));$('view').innerHTML=views[page]()};
db.schema=WF37_SCHEMA;save();draw();
})();
