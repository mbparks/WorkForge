const WF_GUARD_VER='v4.6.4 Release Integrity Guard';
(function(){
window.WF_RUNTIME_ERRORS=[];
function esc(v){return String(v??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')}
function banner(title,body){let id='wf-release-integrity-banner',old=document.getElementById(id);if(old)old.remove();let d=document.createElement('div');d.id=id;d.style.cssText='position:fixed;left:12px;right:12px;top:12px;z-index:999999;background:#7f1d1d;color:#fff;border:4px solid #ef4444;border-radius:14px;padding:14px 16px;font:15px system-ui;box-shadow:0 12px 30px rgba(0,0,0,.35)';d.innerHTML='<b style="font-size:18px">'+esc(title)+'</b><p style="margin:.5rem 0 0">'+esc(body)+'</p><p style="margin:.5rem 0 0;opacity:.9">Refresh after updating the reported file set.</p>';document.body.appendChild(d)}
window.WF_SHOW_RELEASE_BANNER=banner;
window.addEventListener('error',ev=>{let msg=(ev.message||'Runtime error')+' in '+(ev.filename||'unknown file')+':'+(ev.lineno||0)+':'+(ev.colno||0);window.WF_RUNTIME_ERRORS.push(msg);setTimeout(()=>banner('Work Forge release check',msg),0)});
window.addEventListener('unhandledrejection',ev=>{let msg='Unhandled promise rejection: '+(ev.reason&&ev.reason.message?ev.reason.message:ev.reason||'unknown reason');window.WF_RUNTIME_ERRORS.push(msg);setTimeout(()=>banner('Work Forge release check',msg),0)});
setTimeout(()=>{let v=(document.getElementById('ver')||{}).textContent||'';let errs=window.WF_RUNTIME_ERRORS||[];if(!v.includes('v4.6.4')||errs.length||window.WF_RELEASE_OK!==true){banner('Work Forge release check','Expected v4.6.4 final layer. Displayed: '+(v||'none')+'. Errors: '+(errs.length?errs.join(' | '):'none')+'.')}else document.documentElement.dataset.workforgeRelease='ok'},600);
})();
