(function(){
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const root=document.documentElement;

// Theme (remembered, falls back to system setting)
let saved=null;try{saved=localStorage.getItem('theme')}catch(e){}
root.dataset.theme=saved||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
$('#theme').onclick=()=>{const t=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=t;try{localStorage.setItem('theme',t)}catch(e){}};

// Run main()
const lines=['> javac Developer.java','> java Developer','Hello, I am Sravanth Kumar Reddy.','CGPA: 8.54 | Problems solved: 150+','Ready to build. Open to internships.'];
let busy=false;
$('#run').onclick=async()=>{if(busy)return;busy=true;const o=$('#out');o.textContent='';
  for(const l of lines){o.textContent+=l+'\n';await new Promise(r=>setTimeout(r,matchMedia('(prefers-reduced-motion: reduce)').matches?0:380))}
  busy=false};

// Project filter and details
$$('.chip').forEach(b=>b.onclick=()=>{$$('.chip').forEach(c=>c.classList.toggle('active',c===b));
  $$('.project').forEach(p=>p.hidden=!(b.dataset.f==='all'||p.dataset.tags.split(' ').includes(b.dataset.f)))});
$$('.toggle').forEach(b=>b.onclick=()=>{const m=$('.more',b.parentElement),open=m.hidden;m.hidden=!open;b.textContent=open?'Hide details':'Show details';b.setAttribute('aria-expanded',open)});

// Skills tabs
const skills={lang:['Java','C'],web:['HTML','CSS','JavaScript','React.js','REST APIs','JSON'],core:['Object-Oriented Programming','Data Structures and Algorithms','Problem solving','Teamwork'],tools:['Git','GitHub','VS Code','Postman','SQL']};
const show=k=>{const p=$('#skill-panel');p.innerHTML='';skills[k].forEach(s=>{const e=document.createElement('span');e.textContent=s;p.appendChild(e)})};
$$('.tab').forEach(t=>t.onclick=()=>{$$('.tab').forEach(x=>x.classList.toggle('active',x===t));show(t.dataset.t)});show('lang');

// Count-up stats
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);
  const el=e.target,end=+el.dataset.count,d=+(el.dataset.dec||0),suf=el.dataset.suffix||'',t0=performance.now();
  const step=t=>{const k=Math.min((t-t0)/900,1);el.textContent=(end*k).toFixed(d)+(k===1?suf:'');if(k<1)requestAnimationFrame(step)};requestAnimationFrame(step)}),{threshold:.6});
$$('[data-count]').forEach(el=>io.observe(el));

// Contact form: opens the visitor's email app (no backend needed)
$('#send').onclick=()=>{const n=$('#f-name').value.trim(),m=$('#f-mail').value.trim(),g=$('#f-msg').value.trim(),err=$('#f-err');
  if(!n||!/^\S+@\S+\.\S+$/.test(m)||!g){err.textContent='Enter your name, a valid email and a message.';return}
  err.textContent='';
  location.href='mailto:thappetasravanth@gmail.com?subject='+encodeURIComponent('Portfolio message from '+n)+'&body='+encodeURIComponent(g+'\n\nFrom: '+n+' ('+m+')')};
$('#yr').textContent=new Date().getFullYear();
})();
