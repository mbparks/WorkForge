const WF_GUARD_VER='v4.6.6';
(function(){
window.WF_RUNTIME_ERRORS=[];
function esc(v){return String(v??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')}
function banner(title,body){let old=document.getElementById('wf-release-integrity-banner');if(old)old.remove();let d=document.createElement('div');d.id='wf-release-integrity-banner';d.style.cssText='position:fixed;left:12px;right:12px;top:12px;z-index:999999;background:#7f1d1d;color:#fff;border:4px solid #ef4444;border-radius:14px;padding:14px 16px;font:15px system-ui;box-shadow:0 12px 30px rgba(0,0,0,.35)';d.innerHTML='<b>'+esc(title)+'</b><p>'+esc(body)+'</p>';document.body.appendChild(d)}
window.WF_SHOW_RELEASE_BANNER=banner;
window.addEventListener('error',ev=>{let msg=(ev.message||'Runtime error')+' '+(ev.filename||'file')+':'+(ev.lineno||0);window.WF_RUNTIME_ERRORS.push(msg);setTimeout(()=>banner('Work Forge release check',msg),0)});
window.addEventListener('unhandledrejection',ev=>{let msg='Promise rejection: '+(ev.reason&&ev.reason.message?ev.reason.message:ev.reason||'unknown');window.WF_RUNTIME_ERRORS.push(msg);setTimeout(()=>banner('Work Forge release check',msg),0)});
setTimeout(()=>{let v=(document.getElementById('ver')||{}).textContent||'';let errs=window.WF_RUNTIME_ERRORS||[];if(!v.includes('v4.6.6')||errs.length||window.WF_RELEASE_OK!==true){banner('Work Forge release check','Expected v4.6.6. Displayed '+(v||'none')+'. Errors '+(errs.length?errs.join(' | '):'none')+'.')}else document.documentElement.dataset.workforgeRelease='ok'},900);
})();
