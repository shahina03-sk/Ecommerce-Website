const products=[
{id:1,n:"Cloud Mug",cat:"Home",price:799,emoji:"☕",desc:"A clean ceramic mug with a comfortable matte finish.",rating:4.8},
{id:2,n:"Canvas Tote",cat:"Accessories",price:599,emoji:"👜",desc:"Durable everyday carry bag with reinforced handles.",rating:4.7},
{id:3,n:"Calm Candle",cat:"Wellness",price:899,emoji:"🕯️",desc:"Soft botanical fragrance for slow evenings.",rating:4.9},
{id:4,n:"Desk Lamp",cat:"Home",price:1499,emoji:"💡",desc:"Warm adjustable light designed for focused work.",rating:4.6},
{id:5,n:"Daily Bottle",cat:"Wellness",price:1099,emoji:"🥤",desc:"Reusable insulated bottle for work, travel and gym.",rating:4.8},
{id:6,n:"Card Holder",cat:"Accessories",price:699,emoji:"👝",desc:"Slim everyday wallet with practical card slots.",rating:4.5}
];
let cart=JSON.parse(localStorage.novaCart||"[]");const $=x=>document.getElementById(x);
function render(){let q=$('search').value.toLowerCase(),c=$('category').value,s=$('sort').value;let a=products.filter(p=>(p.n.toLowerCase().includes(q)||p.cat.toLowerCase().includes(q))&&(c==='all'||p.cat===c));if(s==='low')a.sort((x,y)=>x.price-y.price);if(s==='high')a.sort((x,y)=>y.price-x.price);$('grid').innerHTML=a.map(p=>`<article class="card product-card"><div class="product-visual">${p.emoji}</div><span class="pill">${p.cat}</span><h3>${p.n}</h3><p class="muted">★ ${p.rating} · ${p.desc}</p><div><b class="price">₹${p.price}</b> <button class="btn btn-primary" onclick="add(${p.id})">Add</button> <button class="btn btn-light" onclick="details(${p.id})">View</button></div></article>`).join('');$('cartCount').textContent=cart.length}
function add(id){cart.push(id);localStorage.novaCart=JSON.stringify(cart);$('cartCount').textContent=cart.length;toast('Added to bag')}
function details(id){let p=products.find(x=>x.id===id);$('modalContent').innerHTML=`<div class="product-visual">${p.emoji}</div><h2>${p.n}</h2><p class="muted">${p.desc}</p><p><span class="pill">${p.cat}</span> &nbsp; ★ ${p.rating}</p><h2>₹${p.price}</h2><button class="btn btn-primary" onclick="add(${p.id});closeModal()">Add to bag</button>`;$('modal').classList.add('show')}
function closeModal(){$('modal').classList.remove('show')}function toast(t){$('toast').textContent=t;$('toast').classList.add('show');setTimeout(()=>$('toast').classList.remove('show'),1800)}
$('search').oninput=render;$('category').onchange=render;$('sort').onchange=render;$('cartBtn').onclick=()=>toast(`You have ${cart.length} item(s) in your bag`);$('modalClose').onclick=closeModal;$('modal').onclick=e=>{if(e.target.id==='modal')closeModal()};render();
