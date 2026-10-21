const $=s=>document.querySelector(s);
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('show'),2400)};
/* Paste your own image URLs here (hosted or in the same folder). Empty = placeholder. */
const IMG={
ann0:'https://victorylipa.org/wp-content/uploads/2026/09/EveryoneEverywhere-scaled.jpg',
ann1:'https://victorylipa.org/wp-content/uploads/2026/08/WIDE_2026-NOWP-Light-480x270.jpg',
ann2:'https://victorylipa.org/wp-content/uploads/2026/08/DCCLASS-480x270.png',
kids:'https://victorylipa.org/wp-content/uploads/2026/07/696734506_1408983641257312_8282345474123182163_n-980x653.jpg',
discipleship:'https://victorylipa.org/wp-content/uploads/2026/07/712196978_1429403599215316_8408989093953127558_n-980x653.jpg',
campus:'https://victorylipa.org/wp-content/uploads/2026/07/718212802_1015011364805101_5945946129374059194_n.png-980x653.jpeg',
pastoral:'https://victorylipa.org/wp-content/uploads/2026/07/625845989_1328454542643556_3030671165030973476_n-1-980x653.jpg',
building:'https://victorylipa.org/wp-content/uploads/2017/11/victory_bldg2.png'};
const ph=(k,l)=>`<div class="ph">${IMG[k]?`<img src="${IMG[k]}" alt="${l}" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentNode.innerHTML='<span>Photo: ${l}</span>'">`:`<span>Photo slot: ${l}</span>`}</div>`;
const MAP='https://www.google.com/maps/search/?api=1&query=JP+Laurel+National+Highway+Mataas+na+Lupa+Lipa+City+Batangas';
const SUN=['8:00 AM','10:30 AM','1:30 PM','4:00 PM','6:30 PM'];
const SCHED=[
{g:'Sunday',n:'Sunday Service',d:'Every Sunday',t:SUN},
{g:'Saturday',n:'Saturday Service',d:'Every Saturday',t:['4:00 PM']},
{g:'Friday',n:'Campus Night (Youth)',d:'Every Friday',t:['6:00 PM']},
{g:'Monthly',n:'Night of Worship & Prayer',d:'1st Thursday of the month',t:['6:00 PM']}];
const ANN=[['New series: Everyone, Everywhere','A series on how the gospel is good news for our nation today, and how every believer is empowered to share it and live it out.','ann0'],['Night of Worship & Prayer','On the first Thursday of each month, the church gathers to worship, pray, and pray for the community.','ann1'],['Discipleship Classes','Go deeper in God’s word by joining a discipleship class.','ann2']];
const MIN=[['kids','Kids Ministry','For children ages 0 to 12. We partner with parents to help kids love Scripture, build character, and grow as leaders.','Learn more','https://sites.google.com/victory.org.ph/victory-kids-lipa/home'],
['campus','Every Nation Campus','Helps students grow in leadership, integrity, faith, and excellence, with youth services and discipleship on campuses across the Philippines.','',''],
['discipleship','Discipleship','Join a Victory group for Bible study, fellowship, prayer, and encouragement.','Sign up here','https://docs.google.com/forms/d/e/1FAIpQLSfq1dx6MLuH-HfbDwRFnAIn-KD4-ifcNZPB7h2_nWSyvFtX7g/viewform?fbzx=-6785398546601818994&pli=1'],
['pastoral','Pastoral Care','Marriage preparation, weddings, child dedication, funerals, sick visits, and property dedication.','Connect with us','https://forms.gle/1g3M1x7TRJtQjR9F7']];
const S={sl:0,f:'All',pr:false,visit:null};
let timer=null;

/* next service (Philippine time) */
function nextSvc(){
 const m=new Date(new Date().toLocaleString('en-US',{timeZone:'Asia/Manila'}));let best=null;
 const conv=s=>{const [t,ap]=s.split(' ');let [h,mi]=t.split(':').map(Number);if(ap=='PM'&&h<12)h+=12;if(ap=='AM'&&h==12)h=0;return [h,mi]};
 for(let i=0;i<40;i++){const d=new Date(m);d.setDate(m.getDate()+i);const w=d.getDay();let l=[];
  if(w==0)l=SCHED[0].t.map(t=>[SCHED[0].n,t]);if(w==6)l=[[SCHED[1].n,'4:00 PM']];if(w==5)l=[[SCHED[2].n,'6:00 PM']];if(w==4&&d.getDate()<=7)l=[[SCHED[3].n,'6:00 PM']];
  for(const [n,t] of l){const [h,mi]=conv(t),c=new Date(d);c.setHours(h,mi,0,0);if(c>m&&(!best||c<best.c))best={n,t,c}}}
 if(!best)return null;const ms=best.c-m,dd=Math.floor(ms/864e5),hh=Math.floor(ms%864e5/36e5),mm=Math.floor(ms%36e5/6e4);
 return {n:best.n,when:best.c.toLocaleDateString('en-PH',{weekday:'long',month:'short',day:'numeric'})+' · '+best.t,left:(dd?dd+'d ':'')+hh+'h '+mm+'m'}}
const nextHTML=()=>{const x=nextSvc();return x?`<small>Next service</small><b>${x.n}</b><span>${x.when}</span><br><small>Starts in ${x.left}</small>`:''};

function sched(){const l=SCHED.filter(s=>S.f=='All'||s.g==S.f);
 return `<div class="chips" role="group" aria-label="Filter schedule">${['All','Sunday','Saturday','Friday','Monthly'].map(c=>`<button class="chip" data-f="${c}" aria-pressed="${c==S.f}">${c}</button>`).join('')}</div>
 <div class="card">${l.map(s=>`<div class="row"><span><b>${s.n}</b><br><small>${s.d}</small></span><span>${s.t.join(' · ')}</span></div>`).join('')}</div>`}

const V={
home(){return `<section class="jb" aria-label="Jesus"><h1>Jesus.</h1></section>
 <section class="wrap wsec"><div class="wb"><h2>Worship with us</h2></div>
 <div class="wbody"><div class="next" id="nx" aria-live="polite">${nextHTML()}</div>
 <div class="times"><div><b>Night of Worship & Prayer</b><span>1st Thursday | 6:00 PM</span></div><div><b>Campus Night (Youth)</b><span>Fridays | 6:00 PM</span></div><div><b>Saturday Service</b><span>4:00 PM</span></div><div><b>Sunday Services</b><span>8:00 AM | 10:30 AM<br>1:30 PM | 4:00 PM | 6:30 PM</span></div></div>
 <p style="margin-top:24px"><a class="btn" href="#visit">Plan your visit</a></p></div></section>
 <div class="wrap"><h2 class="s">Church announcements</h2><div class="ann" id="an"></div>
 <h2 class="s">Connect with us</h2><p style="color:var(--mute);margin-top:-6px">We honor God and make disciples.</p>
 <div class="cards">${MIN.map(m=>`<div class="mc">${ph(m[0],m[1])}<div class="b"><h3>${m[1]}</h3><p>${m[2]}</p>${m[4]?`<a class="btn s d" href="${m[4]}" target="_blank" rel="noopener" style="align-self:flex-start">${m[3]} ↗</a>`:''}</div></div>`).join('')}</div>
 <h2 class="s">Contact and location</h2>${contact()}</div>`},
visit(){return `<div class="wrap"><div class="pg"><h1>Plan a visit</h1><p>Pick a service, tell us who is coming, and get a summary you can keep.</p></div>
 <div class="two"><div class="card"><h3 style="font-size:1.2rem">Your plan</h3>
 <label for="vs">Service</label><select id="vs">${SCHED.flatMap(s=>s.t.map(t=>`<option>${s.n} · ${t}</option>`)).join('')}</select>
 <label for="va">Adults and youth</label><input id="va" type="number" min="1" max="20" value="1">
 <label for="vk">Children (ages 0 to 12)</label><input id="vk" type="number" min="0" max="20" value="0">
 <p style="margin-top:16px"><button class="btn" data-a="plan">Make my plan</button></p><div id="vr" aria-live="polite"></div></div>
 <div class="card"><h3 style="font-size:1.2rem">Service times</h3>${sched()}</div></div>
 <h2 class="s">Questions</h2><div class="card">
 <details><summary>Where is the church?</summary><p>JP Laurel Natl Highway, Mataas na Lupa, Lipa City 4217 Batangas. ${'<a href="'+MAP+'" target="_blank" rel="noopener">Open in maps ↗</a>'}</p></details>
 <details><summary>Is there something for kids?</summary><p>Yes. KIDS Ministry is for children ages 0 to 12.</p></details>
 <details><summary>Is there something for students?</summary><p>Campus Night is for youth on Fridays at 6:00 PM, led through Every Nation Campus.</p></details>
 <details><summary>How do I join a group?</summary><p>Sign up for discipleship through the official form on the Home page, or ask us through Contact.</p></details>
 <details><summary>Who do I contact for a wedding, dedication, or sick visit?</summary><p>The Pastoral Care team handles these. Use the Pastoral Care link on the Home page.</p></details></div></div>`},
about(){return `<section class="wwa"><div class="wrap wwi"><div class="wt"><h1>Who we are</h1><p>Victory Lipa is a church in Batangas that exists to honor God and make disciples in the city of Lipa.</p><a class="sf" href="https://victorylipa.org/about-us/" target="_blank" rel="noopener">Statement of Faith ↗</a></div><div class="wi">${ph('building','Victory Lipa building')}</div></div></section>
 <div class="wrap"><section class="story"><h2>Our story</h2><div class="cols"><div>
 <p><strong>Victory Lipa</strong> began as an idea almost fourteen years ago. Leaders from Victory Los Baños and Victory Alabang led a two-day campus outreach at De La Salle Lipa and Lipa City Colleges, encouraging students to take a firmer biblical stand on morality. It grew into a weekly Saturday youth gathering, and volunteers from Los Baños trained many attendees to <strong>make a difference for Jesus in Lipa City</strong>.</p>
 <p>After nearly a year of weekend meetings, the Saturday gatherings moved to an office space in the CAP Building in the heart of the city. A few dedicated men and women were hired full time to run the meetings and daily work, while the room was used for prayer meetings and classes on weekdays.</p></div><div>
 <p>Growth followed, with <strong>more than 160 disciples in training</strong>. Sunday gatherings started at the senior pastor’s home, and as attendance kept growing, prayer and fasting led to a warehouse that became the Victory Lipa Center, today’s worship venue. Beside it is a second building with the pastors’ and staff offices and rooms for Kids Ministry.</p>
 <p>Today Victory Lipa is the <strong>spiritual home of more than 2,500 people from Lipa City</strong>. New tasks and challenges keep arriving, and each is a chance to rely on God. The mission stays the same: to <strong>honor God and make disciples in Lipa City, whatever it takes</strong>.</p></div></div>
 <p style="text-align:center;margin-top:10px"><a class="btn" href="#visit">Plan your visit</a></p></section></div>`},
contact(){return `<div class="wrap"><div class="pg"><h1>Contact</h1><p>Reach out, send a prayer request, or find us on the map.</p></div>${contact()}
 <h2 class="s">Prayer request</h2><div class="card" style="max-width:620px" id="pc">${prayer()}</div></div>`},
give(){return `<div class="wrap"><div class="pg"><h1>Give</h1><p>Giving is handled on the church’s official page. This page only explains your options.</p></div>
 <div class="card" style="max-width:620px"><p>Open the official Give page to see the current ways to give.</p><a class="btn" href="https://victorylipa.org/give/" target="_blank" rel="noopener">Go to the official Give page ↗</a>
 <p class="note">This concept never collects payment details. Do not enter any on this page.</p></div></div>`}
};
const contact=()=>`<div class="two"><div class="card"><h3 style="font-size:1.2rem">Find us</h3><p>JP Laurel Natl Highway, Mataas na Lupa,<br>Lipa City 4217 Batangas</p><p><a href="tel:09171083542">0917 108 3542</a><br><a href="mailto:lipa@victory.org.ph">lipa@victory.org.ph</a></p><a class="btn" href="${MAP}" target="_blank" rel="noopener">Get directions ↗</a></div>
<div class="card"><h3 style="font-size:1.2rem">Follow</h3><p><a href="https://www.facebook.com/VictoryLipa" target="_blank" rel="noopener"><svg class="si" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#1877f2"/><path fill="#fff" d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.9c0-.9.3-1.4 1.5-1.4h1.5V4.8c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2H8v3h2.6V21z"/></svg>Facebook ↗</a><br><a href="https://www.youtube.com/@VictoryLipaYT" target="_blank" rel="noopener"><svg class="si" viewBox="0 0 24 24" aria-hidden="true"><rect x="1" y="5" width="22" height="14" rx="4" fill="#ff0000"/><path fill="#fff" d="M10 9l5 3-5 3z"/></svg>YouTube ↗</a></p></div></div>`;
const prayer=()=>S.pr?`<h3 class="ok" style="font-size:1.2rem">We received your request</h3><p>Thank you. Someone would pray with you. This is a demo, so nothing was sent.</p><button class="btn o" data-a="again">Send another</button>`:
 `<label for="pn">Name (optional)</label><input id="pn"><label for="pm">How can we pray for you?</label><textarea id="pm" rows="4"></textarea><p id="pe" class="bad" role="alert"></p><button class="btn" data-a="pray">Send request</button><p class="note">Demo form. Nothing you type is sent or stored. For a real request, contact the church directly.</p>`;
function slide(){const a=ANN[S.sl];$('#an').innerHTML=`<div class="tx"><h3>${a[0]}</h3><p>${a[1]}</p><div class="ctl"><button id="pv" aria-label="Previous">‹</button>${ANN.map((x,i)=>`<button class="d" data-sl="${i}" aria-label="Announcement ${i+1}" aria-current="${i==S.sl}"></button>`).join('')}<button id="nx2" aria-label="Next">›</button></div></div>${ph(a[2],a[0])}`}
function render(){
 clearInterval(timer);const k=location.hash.slice(1)||'home';
 $('#main').innerHTML=(V[k]||V.home)();
 document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')=='#'+k));
 $('#nv').classList.remove('open');window.scrollTo(0,0);
 if($('#an'))slide();
 timer=setInterval(()=>{if($('#nx'))$('#nx').innerHTML=nextHTML()},30000);
}
window.addEventListener('hashchange',render);
document.addEventListener('click',e=>{
 const t=e.target,d=t.dataset||{};
 if(t.closest('#mb')){const o=$('#nv').classList.toggle('open');$('#mb').setAttribute('aria-expanded',o)}
 if(d.f){S.f=d.f;render()}
 if(t.id=='pv'||t.id=='nx2'){S.sl=(S.sl+(t.id=='nx2'?1:ANN.length-1))%ANN.length;slide()}
 if(d.sl!==undefined&&t.classList.contains('d')){S.sl=+d.sl;slide()}
 if(d.a=='plan'){const a=+$('#va').value||1,k=+$('#vk').value||0;$('#vr').innerHTML=`<p style="margin-top:16px"><b>${$('#vs').value}</b><br>${a} adult${a>1?'s':''}${k?` and ${k} child${k>1?'ren':''} (KIDS Ministry covers ages 0 to 12)`:''}<br><a href="${MAP}" target="_blank" rel="noopener">Directions ↗</a></p>`}
 if(d.a=='pray'){if($('#pm').value.trim().length<5){$('#pe').textContent='Please share a short prayer request.';return}S.pr=true;$('#pc').innerHTML=prayer()}
 if(d.a=='again'){S.pr=false;$('#pc').innerHTML=prayer()}
});
render();