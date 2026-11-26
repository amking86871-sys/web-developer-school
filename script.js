const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const pages=['home','about','programs','admissions','gallery','notices','contact'];
function show(p){if(!pages.includes(p))p='home';$$('.view').forEach(v=>v.hidden=v.id!=='v-'+p);$$('nav a').forEach(a=>a.classList.toggle('on',a.dataset.p===p));scrollTo({top:0,behavior:'instant'})}
$$('[data-p]').forEach(a=>a.onclick=e=>{e.preventDefault();show(a.dataset.p);try{history.replaceState(null,'','#'+a.dataset.p)}catch(_){}});
addEventListener('hashchange',()=>show(location.hash.slice(1)));
$$('[data-apply]').forEach(a=>a.onclick=e=>{e.preventDefault();const c=a.closest('.pg');if(c){const n=c.querySelector('h3').textContent,m={'Play Group':'Play Group','Primary':'Class 1','Middle':'Class 6','Matric':'Class 9','FSC':'Class 11'};$('#a-class').value=m[n]||''}show('admissions');try{history.replaceState(null,'','#admissions')}catch(_){}$('#admform').scrollIntoView({behavior:'instant'})});
$('#explore').onclick=e=>{e.preventDefault();$('#list').scrollIntoView()};
$('#video').onclick=()=>$('#dlg').showModal();$$('[data-close]').forEach(b=>b.onclick=()=>b.closest('dialog').close());
$('#more').onclick=e=>{e.preventDefault();$('#shots').scrollIntoView()};
$$('.tabs button').forEach(b=>b.onclick=()=>{$$('.tabs button').forEach(x=>x.setAttribute('aria-pressed',x===b));$$('.shots figure').forEach(f=>f.hidden=b.dataset.f!=='All'&&f.dataset.c!==b.dataset.f)});
$('#touch').onclick=e=>{e.preventDefault();$('#reach').scrollIntoView()};
$$('form').forEach(f=>f.onsubmit=e=>{e.preventDefault();f.querySelector('.msg').textContent='Demo form: nothing was sent. Connect it to your backend.'});
const N=[
['2026-11-12','Academic','Mid-Term Examination Schedule','Mid-term exams will be held from 20th November to 25th November 2026.'],
['2026-11-10','General','School Timings Update','School timings will be 8:00 AM to 2:00 PM from Monday.'],
['2026-11-05','Events','Annual Sports Gala','Annual Sports Gala will be held on 15th November 2026.'],
['2026-11-01','Fee','Fee Submission Deadline','Last date for fee submission is 10th November 2026.'],
['2026-10-28','Exams','Annual Exam Result','Annual Exam results are now available on the student portal.'],
['2026-10-22','Academic','Parent-Teacher Meeting','Parents are invited to discuss student progress with class teachers.'],
['2026-10-18','Exams','Monthly Test Schedule','Class teachers will share the monthly test date sheet.'],
['2026-10-14','Academic','Science Project Submission','Students of Classes 6 to 8 should submit their science projects to their teachers.'],
['2026-10-09','Events','Annual Science Fair','Students can register for the science fair with their class teacher.'],
['2026-10-05','Fee','Fee Voucher Collection','Monthly fee vouchers are available at the accounts office.'],
['2026-10-02','Exams','Practical Exam Guidelines','Bring your practical notebook and school ID card to every practical.'],
['2026-09-28','Academic','New Library Timings','The library will remain open until 3:00 PM on school days.']];
const LB={Fee:'Fee Related',Exams:'Exam'};let ncat='All',npage=1;
function el(t,c,x){const e=document.createElement(t);if(c)e.className=c;if(x)e.textContent=x;return e}
function notices(){const list=N.filter(n=>ncat==='All'||n[1]===ncat),total=Math.ceil(list.length/5),box=$('#nlist'),pg=$('#pager');box.replaceChildren();pg.replaceChildren();
list.slice((npage-1)*5,npage*5).forEach(([d,c,t,x])=>{const a=el('article','note'),dt=new Date(d+'T00:00:00'),tm=el('time'),body=el('div'),b=el('button','btn blue','View Details →');tm.dateTime=d;tm.append(el('b','',d.slice(8)),dt.toLocaleString('en',{month:'short'})+' '+dt.getFullYear());body.append(el('h3','',t),el('p','',x));b.type='button';b.onclick=()=>{const m=$('#ndlg');m.querySelector('h3').textContent=t;m.querySelector('p').textContent=x;m.showModal()};a.append(tm,el('span','badge '+c,LB[c]||c),body,b);box.append(a)});
if(total<2)return;
const add=(label,to,cur,off)=>{const b=el('button','',label);b.type='button';b.disabled=off;if(cur)b.setAttribute('aria-current','page');b.onclick=()=>{npage=to;notices();box.scrollIntoView({block:'nearest'})};pg.append(b)};
for(let i=1;i<=total;i++)add(String(i),i,i===npage,false);add('Next →',npage+1,false,npage===total)}
$$('.cats button').forEach(b=>b.onclick=()=>{ncat=b.dataset.n;npage=1;$$('.cats button').forEach(x=>x.setAttribute('aria-pressed',x===b));notices()});
$('.crumb a').onclick=e=>{e.preventDefault();show('home');try{history.replaceState(null,'','#home')}catch(_){}};
notices();
show(location.hash.slice(1));
