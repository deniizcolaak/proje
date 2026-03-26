
class Koleksiyon {
    constructor(ad,kategori){
        this.ad = ad;
        this.kategori = kategori;
    }
}


let koleksiyonlar = [
    new Koleksiyon("Harry Potter","Kitap"),
    new Koleksiyon("The Witcher 3","Oyun"),
    new Koleksiyon("Batman Begins","Film"),
    new Koleksiyon("Naruto","Anime"),
    new Koleksiyon("Dark Souls","Oyun"),
    new Koleksiyon("Yüzüklerin Efendisi","Kitap"),
    new Koleksiyon("Matrix","Film")
];


const liste = document.getElementById("koleksiyonListesi");
const ekleBtn = document.getElementById("ekleBtn");
const adInput = document.getElementById("koleksiyonInput");
const kategoriInput = document.getElementById("kategoriInput");
const searchInput = document.getElementById("searchInput");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const sayfaBilgi = document.getElementById("sayfaBilgi");


let sayfa = 1;
const sayfaBoyutu = 4;
let toplamSayfa = Math.ceil(koleksiyonlar.length / sayfaBoyutu);


function listele(data = koleksiyonlar){
    liste.innerHTML = "";
    toplamSayfa = Math.ceil(data.length / sayfaBoyutu) || 1;
    if(sayfa > toplamSayfa) sayfa = toplamSayfa;
    sayfaBilgi.textContent = `${sayfa}/${toplamSayfa}`;
    const start = (sayfa-1)*sayfaBoyutu;
    const end = start + sayfaBoyutu;

    data.slice(start,end).forEach((item,index)=>{
        const li = document.createElement("li");
        li.innerHTML = `${item.ad} - ${item.kategori} 
        <span>
        <button class="guncelleBtn">Güncelle</button>
        <button class="silBtn">Sil</button>
        </span>`;
        liste.appendChild(li);

        
        li.querySelector(".silBtn").addEventListener("click",()=>{
            const globalIndex = koleksiyonlar.indexOf(item);
            if(globalIndex > -1){
                koleksiyonlar.splice(globalIndex,1);
                if(sayfa>1 && start >= koleksiyonlar.length) sayfa--;
                listele();
            }
        });

        
        li.querySelector(".guncelleBtn").addEventListener("click",()=>{
            const yeniAd = prompt("Yeni ad:", item.ad);
            const yeniKategori = prompt("Yeni kategori:", item.kategori);
            if(yeniAd) item.ad = yeniAd.trim();
            if(yeniKategori) item.kategori = yeniKategori.trim();
            listele();
        });
    });
}


ekleBtn.addEventListener("click",()=>{
    const ad = adInput.value.trim();
    const kategori = kategoriInput.value.trim();
    if(ad && kategori){
        koleksiyonlar.push(new Koleksiyon(ad,kategori));
        adInput.value = "";
        kategoriInput.value = "";
        sayfa = Math.ceil(koleksiyonlar.length / sayfaBoyutu);
        listele();
    } else {
        alert("Lütfen geçerli ad ve kategori girin.");
    }
});


searchInput.addEventListener("input",()=>{
    const arama = searchInput.value.toLowerCase();
    const filtreli = koleksiyonlar.filter(u => 
        u.ad.toLowerCase().includes(arama) || 
        u.kategori.toLowerCase().includes(arama)
    );
    sayfa = 1;
    listele(filtreli);
});

prevBtn.addEventListener("click",()=>{ if(sayfa>1){ sayfa--; listele(); }});
nextBtn.addEventListener("click",()=>{ if(sayfa<toplamSayfa){ sayfa++; listele(); }});


listele();