
const base=window.GP_DATA;
const saved=JSON.parse(localStorage.getItem('gpPublicData')||'null');
const d=saved||base;
const fmt=n=>new Intl.NumberFormat('en-IN').format(n||0);
const formatDate=iso=>{
  if(!iso) return "";
  const dt=new Date(iso+"T00:00:00");
  return dt.toLocaleDateString("mr-IN",{day:"numeric",month:"long",year:"numeric"});
};
const now=new Date();
liveDate.textContent=now.toLocaleDateString("mr-IN",{weekday:"short",day:"numeric",month:"short",year:"numeric"});
todayText.textContent=now.toLocaleDateString("mr-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric"});

pTotal.textContent=fmt(d.village.population);pMale.textContent=fmt(d.village.male);pFemale.textContent=fmt(d.village.female);pFamilies.textContent=fmt(d.village.families);projectCount.textContent=d.projects.length;
let ti=0;function tick(){ticker.textContent=d.notices[ti%d.notices.length]?.title||'';ti++}tick();setInterval(tick,3500);
noticeList.innerHTML=d.notices.map(x=>`<article class="notice"><time>${formatDate(x.date)}</time><div><h3>${x.title}</h3><p>${x.text}</p></div></article>`).join('');
projectsGrid.innerHTML=d.projects.map(x=>`<article class="project"><div class="head"><h3>${x.name}</h3><b>${x.progress}%</b></div><p>${x.details||""}</p><div class="bar"><i style="width:${x.progress}%"></i></div><div class="meta"><span>${x.status}</span><span>${x.scheme}</span><span>मंजूर ₹${fmt(x.budget)}</span><span>खर्च ₹${fmt(x.spent)}</span></div></article>`).join('');
newsGrid.innerHTML=d.news.map(x=>`<article><img src="${x.image||'assets/village-office-hd-1.jpg'}"><div><small>${formatDate(x.date)}</small><h3>${x.title}</h3><p>${x.text}</p></div></article>`).join('');
const total=d.funding.reduce((a,x)=>({s:a.s+x.sanctioned,r:a.r+x.received,u:a.u+x.used}),{s:0,r:0,u:0});
fundSummary.innerHTML=`<article><b>₹${fmt(total.s)}</b><span>मंजूर निधी</span></article><article><b>₹${fmt(total.r)}</b><span>प्राप्त निधी</span></article><article><b>₹${fmt(total.u)}</b><span>वापर निधी</span></article>`;
fundRows.innerHTML=d.funding.map(x=>`<tr><td>${x.source}</td><td>${x.year}</td><td>₹${fmt(x.sanctioned)}</td><td>₹${fmt(x.received)}</td><td>₹${fmt(x.used)}</td></tr>`).join('');
menu.onclick=()=>links.classList.toggle('open');
search.oninput=()=>document.querySelectorAll('.service-grid button').forEach(b=>b.style.display=b.dataset.name.includes(search.value)?'grid':'none');
document.querySelectorAll('.service-grid button').forEach(b=>b.onclick=()=>{dlgTitle.textContent=b.dataset.name;dlg.showModal()});
close.onclick=()=>dlg.close();apply.onclick=()=>dlg.close();
file.onchange=()=>{if(file.files[0]&&file.files[0].size>5*1024*1024){alert('फाइल 5 MB पेक्षा कमी असावी');file.value=''}};
wa.onclick=()=>{const form=document.getElementById('complaintForm');const msg=`नवीन ग्रामपंचायत अर्ज/तक्रार%0Aनाव: ${encodeURIComponent(form.name.value)}%0Aमोबाईल: ${encodeURIComponent(form.mobile.value)}%0Aप्रकार: ${encodeURIComponent(form.type.value)}%0Aतपशील: ${encodeURIComponent(form.message.value)}%0Aफोटो WhatsApp मध्ये स्वतंत्रपणे जोडा.`;window.open('https://wa.me/919503624087?text='+msg,'_blank')};
printProjects.onclick=()=>window.print();

let cd=new Date();
const ms=['जानेवारी','फेब्रुवारी','मार्च','एप्रिल','मे','जून','जुलै','ऑगस्ट','सप्टेंबर','ऑक्टोबर','नोव्हेंबर','डिसेंबर'];
function cal(){
  const y=cd.getFullYear(),m=cd.getMonth(),first=new Date(y,m,1).getDay(),count=new Date(y,m+1,0).getDate();
  month.textContent=ms[m]+' '+y;
  let h='';
  for(let i=0;i<first;i++)h+='<span></span>';
  for(let x=1;x<=count;x++){
    const iso=`${y}-${String(m+1).padStart(2,'0')}-${String(x).padStart(2,'0')}`;
    const ev=d.notices.find(n=>n.date===iso);
    const today=(x===now.getDate()&&m===now.getMonth()&&y===now.getFullYear());
    h+=`<button class="${ev?'event ':''}${today?'today':''}" title="${ev?.title||''}">${x}</button>`;
  }
  days.innerHTML=h;
}
prev.onclick=()=>{cd.setMonth(cd.getMonth()-1);cal()};next.onclick=()=>{cd.setMonth(cd.getMonth()+1);cal()};cal();
