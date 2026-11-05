(function(){
var cats={ai:{n:"AI and search",c:"#8b7bff"},sys:{n:"Systems and backend",c:"#3fd0e8"},web:{n:"Web and frontend",c:"#ffb454"},data:{n:"Data and ML",c:"#ff6f91"}};
var S=[
["C++","sys","My main production language: powers semantic search and auto-classification inside OpenText IDOL.",["OpenText IDOL","Multithreaded indexing"]],
["Semantic Search","ai","Intent-aware retrieval that matches meaning rather than keywords.",["OpenText IDOL"]],
["K-Means++","ai","Clustering for automated content categorization and relevance.",["Auto-Classification"]],
["RAG","ai","Retrieval-Augmented Generation grounding LLM answers in company knowledge.",["AI MCP Gateway"]],
["MCP Server","ai","Orchestrates intent detection, tool calls and database queries for Claude.",["AI MCP Gateway"]],
["Agentic Orchestrator","ai","Built agent workflows that detect intent, choose tools, run them and loop, with telemetry on every step.",["AI MCP Gateway","Observability Framework"]],
["ONNX Runtime","sys","Fast model inference for large-scale embedding generation.",["OpenText IDOL"]],
["Multithreading","sys","Batching and memory-efficient streaming to raise throughput.",["OpenText IDOL"]],
["OpenTelemetry","sys","Traces, metrics and logs with OTLP exporters and semantic conventions.",["Observability Framework"]],
[".NET","sys","Reusable instrumentation library for enterprise apps.",["Observability Framework"]],
["Okta OAuth","sys","Secure user validation for backend services.",["AI MCP Gateway"]],
["Node.js","web","Backend runtime with Express.js for APIs.",["Web projects"]],
["React.js","web","Component-driven interfaces.",["Web projects"]],
["JavaScript","web","Vanilla JS, event-driven UIs, canvas rendering and PDF export.",["Resume Builder"]],
["HTML / CSS","web","Responsive layouts with CSS Grid and template switching.",["Resume Builder"]],
["Python","data","Scripting, ML experiments and coursework.",["IIT BHU research","NPTEL medals"]],
["Scikit-learn","data","Classical ML models and evaluation.",["IIT BHU research"]],
["Pandas / NumPy","data","Data wrangling and numerical work.",["Analytics coursework"]],
["Deep Learning","data","NPTEL Silver Medal from IIT Ropar.",["Metasurface design"]],
["SQL / MongoDB","data","Relational and document databases.",["MCP Gateway"]],
["C","sys","Foundation for systems and algorithms.",["Coursework"]]
];
var CSS=function(v){return getComputedStyle(document.documentElement).getPropertyValue(v).trim()};
var info=document.getElementById("info"),chips=document.getElementById("chips"),active="all";
function show(s){var k=cats[s[1]];info.innerHTML='<span class="cat" style="color:'+k.c+'">'+k.n+'</span><h3>'+s[0]+'</h3><p>'+s[2]+'</p><ul>'+s[3].map(function(x){return"<li>"+x+"</li>"}).join("")+'</ul>'}
show(S[0]);
[["all","All"]].concat(Object.keys(cats).map(function(k){return[k,cats[k].n]})).forEach(function(p){
var b=document.createElement("button");b.className="chip";b.textContent=p[1];b.setAttribute("aria-pressed",p[0]==="all");
b.onclick=function(){active=p[0];[].forEach.call(chips.children,function(x){x.setAttribute("aria-pressed",x===b)});applyFilter()};chips.appendChild(b)});

/* background field */
var bgc=document.getElementById("bg"),R=new THREE.WebGLRenderer({canvas:bgc,alpha:true,antialias:true});
R.setPixelRatio(Math.min(devicePixelRatio,2));
var sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(55,1,.1,100);cam.position.z=9;
var pg=new THREE.BufferGeometry(),N=700,pos=new Float32Array(N*3);
for(var i=0;i<N*3;i++)pos[i]=(Math.random()-.5)*34;
pg.setAttribute("position",new THREE.BufferAttribute(pos,3));
var pm=new THREE.PointsMaterial({size:.05,color:0x8b7bff,transparent:true,opacity:.7}),pts=new THREE.Points(pg,pm);sc.add(pts);
var ico=new THREE.Mesh(new THREE.IcosahedronGeometry(2.6,1),new THREE.MeshBasicMaterial({color:0x3fd0e8,wireframe:true,transparent:true,opacity:.35}));
ico.position.set(3.6,.4,0);sc.add(ico);
var ring=new THREE.Mesh(new THREE.TorusGeometry(3.6,.012,8,120),new THREE.MeshBasicMaterial({color:0xffb454,transparent:true,opacity:.6}));
ring.position.copy(ico.position);ring.rotation.x=1.2;sc.add(ring);
function tint(){var d=matchMedia("(prefers-color-scheme: dark)").matches&&document.documentElement.dataset.theme!=="light"||document.documentElement.dataset.theme==="dark";
pm.color.set(d?CSS("--a"):"#5b45f0");ico.material.color.set(d?CSS("--b"):"#0a9db8");ring.material.color.set(d?CSS("--c"):"#d98100");pm.opacity=d?.7:.5}
tint();matchMedia("(prefers-color-scheme: dark)").addEventListener("change",tint);
var mx=0,my=0;addEventListener("pointermove",function(e){mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
function rs(){R.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix();ico.position.x=innerWidth<820?0:3.6;ring.position.copy(ico.position)}
rs();addEventListener("resize",rs);

/* globe */
var gel=document.getElementById("globe"),GR=new THREE.WebGLRenderer({alpha:true,antialias:true});
GR.setPixelRatio(Math.min(devicePixelRatio,2));gel.insertBefore(GR.domElement,gel.firstChild);
var gs=new THREE.Scene(),gc=new THREE.PerspectiveCamera(45,1,.1,100);gc.position.z=7.2;
var grp=new THREE.Group();gs.add(grp);
grp.add(new THREE.Mesh(new THREE.SphereGeometry(2.2,24,16),new THREE.MeshBasicMaterial({color:0x8b7bff,wireframe:true,transparent:true,opacity:.12})));
var sprites=[];
function label(t,col){var c=document.createElement("canvas"),x=c.getContext("2d");c.width=320;c.height=80;
x.font="600 26px 'Bricolage Grotesque',system-ui,sans-serif";var w=Math.min(300,x.measureText(t).width+60);
x.fillStyle="rgba(10,12,31,.88)";var l=(320-w)/2;x.beginPath();x.roundRect?x.roundRect(l,8,w,64,32):x.rect(l,8,w,64);x.fill();
x.lineWidth=3;x.strokeStyle=col;x.stroke();x.fillStyle="#fff";x.textAlign="center";x.textBaseline="middle";x.fillText(t,160,41);
var tx=new THREE.CanvasTexture(c);return tx}
function build(){S.forEach(function(s,i){var n=S.length,y=1-(i/(n-1))*2,r=Math.sqrt(1-y*y),a=i*2.399963;
var m=new THREE.SpriteMaterial({map:label(s[0],cats[s[1]].c),transparent:true,depthWrite:false}),sp=new THREE.Sprite(m);
sp.position.set(Math.cos(a)*r*2.9,y*2.9,Math.sin(a)*r*2.9);sp.scale.set(1.9,.475,1);sp.userData={i:i,base:1};grp.add(sp);sprites.push(sp)})}
function applyFilter(){sprites.forEach(function(sp){sp.userData.on=active==="all"||S[sp.userData.i][1]===active})}
(document.fonts&&document.fonts.ready||Promise.resolve()).then(function(){build();applyFilter()});
function gr(){var w=gel.clientWidth,h=gel.clientHeight;GR.setSize(w,h,false);gc.aspect=w/h;gc.updateProjectionMatrix()}
gr();addEventListener("resize",gr);
var drag=false,moved=0,lx=0,ly=0,vx=.004,vy=0,hover=null,ray=new THREE.Raycaster(),pt=new THREE.Vector2();
function pick(e){var r=gel.getBoundingClientRect();pt.set((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height)*2+1);ray.setFromCamera(pt,gc);
var h=ray.intersectObjects(sprites.filter(function(s){return s.userData.on}));return h.length?h[0].object:null}
gel.addEventListener("pointerdown",function(e){drag=true;moved=0;lx=e.clientX;ly=e.clientY;gel.setPointerCapture(e.pointerId)});
gel.addEventListener("pointermove",function(e){if(drag){var dx=e.clientX-lx,dy=e.clientY-ly;moved+=Math.abs(dx)+Math.abs(dy);vx=dx*.006;vy=dy*.006;lx=e.clientX;ly=e.clientY}else{hover=pick(e);gel.style.cursor=hover?"pointer":"grab"}});
gel.addEventListener("pointerup",function(e){drag=false;if(moved<6){var h=pick(e);if(h)show(S[h.userData.i])}});
var vis=true;if("IntersectionObserver"in window)new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(gel);
var rm=matchMedia("(prefers-reduced-motion: reduce)").matches;

/* tilt cards */
[].forEach.call(document.querySelectorAll(".tilt"),function(c){
c.addEventListener("pointermove",function(e){if(rm||e.pointerType==="touch")return;var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform="rotateY("+x*8+"deg) rotateX("+(-y*8)+"deg) translateZ(8px)"});
c.addEventListener("pointerleave",function(){c.style.transform=""})});

var t=0;function loop(){requestAnimationFrame(loop);t+=.01;
var sy=scrollY/innerHeight;
if(!rm){ico.rotation.y=t*.4;ico.rotation.x=t*.2;ring.rotation.z=t*.3;pts.rotation.y=t*.02}
cam.position.x+=((mx*1.4)-cam.position.x)*.05;cam.position.y+=((-my*1.0-sy*1.2)-cam.position.y)*.05;cam.lookAt(0,-sy*1.2,0);
ico.position.y=.4-sy*.6;ring.position.y=ico.position.y;
R.render(sc,cam);
if(vis){grp.rotation.y+=vx;grp.rotation.x=Math.max(-1,Math.min(1,grp.rotation.x+vy));
if(!drag){vx+=((rm?0:.004)-vx)*.04;vy*=.9}
sprites.forEach(function(sp){var on=sp.userData.on,tg=on?(sp===hover?1.25:1):.7;sp.userData.base+=(tg-sp.userData.base)*.15;
sp.scale.set(1.9*sp.userData.base,.475*sp.userData.base,1);sp.material.opacity+=((on?1:.18)-sp.material.opacity)*.12});
GR.render(gs,gc)}}
loop();
})();
