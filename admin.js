
let d=JSON.parse(JSON.stringify(JSON.parse(localStorage.getItem('gpPublicData')||'null')||window.GP_DATA));const $=x=>document.getElementById(x);let selectedImage="";
loginBtn.onclick=()=>{if(pin.value==='2026'){loginBox.hidden=true;shell.hidden=false;render()}else alert('Wrong PIN')};
document.querySelectorAll('.side button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.side button').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));$(b.dataset.tab).classList.add('active')});
window.del=(k,i)=>{d[k].splice(i,1);render()};
function render(){newsList.innerHTML=d.news.map((x,i)=>`<div><img src="${x.image}"><span>${x.date} — ${x.title}</span><button onclick="del('news',${i})">Delete</button></div>`).join('');noticeListA.innerHTML=d.notices.map((x,i)=>`<div><span>${x.date} — ${x.title}</span><button onclick="del('notices',${i})">Delete</button></div>`).join('');projectList.innerHTML=d.projects.map((x,i)=>`<div><span>${x.name} — ${x.progress}%</span><button onclick="del('projects',${i})">Delete</button></div>`).join('');fundList.innerHTML=d.funding.map((x,i)=>`<div><span>${x.source} — ${x.year}</span><button onclick="del('funding',${i})">Delete</button></div>`).join('');vT.value=d.village.population;vM.value=d.village.male;vF.value=d.village.female;vFa.value=d.village.families}
nPhoto.onchange=()=>{const file=nPhoto.files[0];if(!file)return;if(file.size>2*1024*1024){alert('Admin news photo 2 MB पेक्षा कमी ठेवा.');nPhoto.value='';return}const r=new FileReader();r.onload=()=>{selectedImage=r.result;nPreview.src=selectedImage;nPreview.style.display='block'};r.readAsDataURL(file)};
addNews.onclick=()=>{if(!nDate.value||!nTitle.value){alert('दिनांक आणि शीर्षक आवश्यक आहे');return}d.news.unshift({date:nDate.value,title:nTitle.value,text:nText.value,image:selectedImage||'assets/village-office-hd-1.jpg'});selectedImage='';nPhoto.value='';nPreview.style.display='none';render()};
addNotice.onclick=()=>{d.notices.unshift({date:oDate.value,title:oTitle.value,text:oText.value});render()};
addProject.onclick=()=>{d.projects.unshift({name:prName.value,progress:+prProgress.value,status:prStatus.value,scheme:prScheme.value,budget:+prBudget.value,spent:+prSpent.value,details:prDetails.value});render()};
addFund.onclick=()=>{d.funding.unshift({source:fSource.value,year:fYear.value,sanctioned:+fS.value,received:+fR.value,used:+fU.value});render()};
saveVillage.onclick=()=>{d.village={population:+vT.value,male:+vM.value,female:+vF.value,families:+vFa.value};alert('Saved in editor')};
preview.onclick=()=>{localStorage.setItem('gpPublicData',JSON.stringify(d));alert('Preview saved')};
function dl(name,text,type){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
downloadJs.onclick=()=>dl('site-data.js','window.GP_DATA = '+JSON.stringify(d,null,2)+';\n','text/javascript');
downloadJson.onclick=()=>dl('site-data.json',JSON.stringify(d,null,2),'application/json');
reset.onclick=()=>{localStorage.removeItem('gpPublicData');d=JSON.parse(JSON.stringify(window.GP_DATA));render()};
