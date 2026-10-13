import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X, Globe as GlobeIcon, ScanSearch, Eye, Activity, RefreshCw, Network, Mail, MapPin, Phone, Linkedin, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/mirleon-logo.png.asset.json';
import earth from '@/assets/mirleon-earth-europe.png.asset.json';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'MirLeon — Dijital Risk İstihbaratı' },
    { name: 'description', content: 'MirLeon, markanızı taklit eden alan adlarını, sahte yayınları ve bağlantılı altyapıları tehdide dönüşmeden önce ortaya çıkarır.' },
    { property: 'og:title', content: 'MirLeon — Tehdit, adını koymadan önce.' },
    { property: 'og:description', content: 'Markanızın dışarıdaki izlerini sürekli izleyen, kanıta dayalı dijital risk istihbaratı.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }), component: Home,
});

const nav = [['Platform','#platform'],['Yetenekler','#layers'],['Döngü','#cycle'],['Canlı','#live'],['İletişim','#contact']];

const layers = [
  [GlobeIcon,'Doğduğu an tespit','Dünyadaki tüm yeni site sertifikalarını kesintisiz tarar; markanızın taklidini resmî listelere düşmeden saniyeler içinde yakalar.'],
  [ScanSearch,'İçerik ve görsel analiz','Siteyi bir vatandaş gibi ziyaret eder, içeriğini okur ve ekran görüntüsünü yapay zekâyla değerlendirir: ne satıyor, logonuzu taklit mi ediyor?'],
  [Eye,'Gerçek kullanıcı görünümü','Taklit adresler botlara temiz, kurbana tuzak gösterir. Siteyi Türkiye’den gerçek bir kullanıcı gibi açar, asıl sayfayı yakalar; gizlemeyi (cloaking) kırarız.'],
  [Activity,'Davranış ve ağ izleme','Sayfanın perde arkasını izleriz: şifrenizi hangi sunucuya gönderiyor, IBAN’ı değiştiriyor mu, hangi üçüncü taraflara bağlanıyor?'],
  [RefreshCw,'Örtü içerik ve rotasyon','Bugün masum bir şablon, yarın bir kimlik avı paneli. İçerik değişimini zaman içinde izler, marka adı altındaki örtü (doorway) adresleri yakalarız.'],
  [Network,'Altyapı ve operasyon haritası','Tek bir adres değil, arkasındaki tüm operasyonu çıkarırız: ortak sunucu, sertifika ve kardeş alan adlarıyla saldırganın ağını haritalarız.'],
] as const;

const cycle = ['Keşfet','İzle','Analiz et','İlişkilendir','Risklendir','Uyar','Aksiyon','Raporla','Takip et'];

const principles = [
  ['Erken','Tehdit doğduğu an, resmî listelerden önce.'],
  ['Yerli','USOM · BTK · ETBİS ve Türk kullanıcı gözüyle.'],
  ['Uyarı','Kanıtıyla birlikte; sizi anında uyarırız.'],
  ['Derin','İsme değil, sitenin davranışına bakarız.'],
  ['Gerçek','Gürültü değil kanıt; gerçek ekran, gerçek tespit.'],
];

const feed: [string,string,string][] = [
  ['astoras-turkiye.homes','Astor Enerji','hit'],['akbank-giris-dogrulama.xyz','Akbank','hit'],['karacasepet.shop','Karaca','hit'],
  ['secure-payment-portal.site','','scan'],['toki-konut-basvuru2026.sbs','TOKİ','hit'],['cdn-assets-9f2a.net','','scan'],
  ['eticaret-magaza-xk.online','Kayıt dışı','warn'],['garanti-bonus-kampanya.click','Garanti BBVA','hit'],['static-img-cache.io','','scan'],
];

const signals: { x: number; y: number; k: 'ok' | 'hot'; d: number; tag?: string }[] = [
  { x: 57.8, y: 63.2, k: 'hot', d: 0, tag: 'Marka taklidi · İstanbul' },
  { x: 64.2, y: 64.5, k: 'ok', d: 1.2 },
  { x: 59.2, y: 67.6, k: 'ok', d: 2.6 },
  { x: 34.2, y: 43.5, k: 'ok', d: 3.4 },
  { x: 40.5, y: 48.2, k: 'hot', d: 4.8, tag: 'Kimlik avı · Berlin' },
  { x: 41.5, y: 59, k: 'ok', d: 2 },
  { x: 22.5, y: 64.5, k: 'ok', d: 5.4 },
  { x: 49.5, y: 35.2, k: 'ok', d: 0.8 },
  { x: 51.5, y: 70, k: 'hot', d: 6.2, tag: 'Sahte yayın · Atina' },
  { x: 61.5, y: 85.5, k: 'ok', d: 3 },
  { x: 74, y: 57.5, k: 'ok', d: 4.2 },
  { x: 31.8, y: 52.5, k: 'ok', d: 5.8 },
];

function Wheel() {
  const [ang,setAng]=useState(320);
  useEffect(()=>{
    let raf=0; let last=performance.now();
    const tick=(t:number)=>{ const dt=Math.min(t-last,100); last=t; setAng(v=>(v+dt*0.025)%360); raf=requestAnimationFrame(tick); };
    raf=requestAnimationFrame(tick); return ()=>cancelAnimationFrame(raf);
  },[]);
  const a=Math.floor(ang/40)%9;
  const c=260,R=180,L=222;
  const anA=(-90+ang)*Math.PI/180;
  return <svg viewBox="0 0 520 520" className="ml-wheel" role="img" aria-label="Dokuz adımlı MirLeon izleme döngüsü">
    <defs>
      <radialGradient id="wGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="var(--accent)" stopOpacity=".14"/>
        <stop offset="70%" stopColor="var(--accent)" stopOpacity="0"/>
      </radialGradient>
      <linearGradient id="wBeam" gradientUnits="userSpaceOnUse" x1={c} y1={c} x2={c+R*Math.cos(anA)} y2={c+R*Math.sin(anA)}>
        <stop offset="0%" stopColor="var(--accent)" stopOpacity=".9"/>
        <stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/>
      </linearGradient>
    </defs>
    <circle cx={c} cy={c} r={R+60} fill="url(#wGlow)"/>
    <circle cx={c} cy={c} r={R+60} className="w-ring faint"/>
    <circle cx={c} cy={c} r={R} className="w-ring dash"/>
    <circle cx={c} cy={c} r={R-60} className="w-ring glow"/>
    <line x1={c} y1={c} x2={c+R*Math.cos(anA)} y2={c+R*Math.sin(anA)} stroke="url(#wBeam)" strokeWidth="2" className="w-beam"/>
    <circle cx={c+R*Math.cos(anA)} cy={c+R*Math.sin(anA)} r="4" className="w-dot"/>
    {cycle.map((t,i)=>{ const an=(-90+i*40)*Math.PI/180, x=c+R*Math.cos(an), y=c+R*Math.sin(an), lx=c+L*Math.cos(an), ly=c+L*Math.sin(an), on=i===a;
      return <g key={t} className={on?'w-node on':'w-node'}>
        <line x1={c+62*Math.cos(an)} y1={c+62*Math.sin(an)} x2={x} y2={y} className="w-spoke"/>
        <circle cx={x} cy={y} r={on?20:14}/><text x={x} y={y+4} textAnchor="middle" className="w-n">{i+1}</text>
        <text x={lx} y={ly+4} textAnchor={Math.abs(Math.cos(an))<.2?'middle':Math.cos(an)>0?'start':'end'} className="w-l">{t}</text>
      </g>; })}
    <circle cx={c} cy={c} r={62} className="w-core"/>
    <text x={c} y={c-10} textAnchor="middle" className="w-brand">MirLeon</text>
    <text x={c} y={c+10} textAnchor="middle" className="w-sub">{String(a+1).padStart(2,'0')} · Aktif</text>
    <text x={c} y={c+26} textAnchor="middle" className="w-step">{cycle[a]}</text>
  </svg>;
}

function Venn() {
  const c=300;
  return <svg viewBox="0 0 600 600" className="ml-venn" role="img" aria-label="Beş ilke: Erken, Yerli, Uyarı, Derin, Gerçek">
    <circle cx={c} cy={c} r={262} className="v-outer"/>
    {principles.map(([t,d],i)=>{ const an=(-90+i*72)*Math.PI/180, x=c+92*Math.cos(an), y=c+92*Math.sin(an), tx=c+150*Math.cos(an), ty=c+150*Math.sin(an);
      return <g key={t}><circle cx={x} cy={y} r={128} className="v-c"/>
        <text x={tx} y={ty-6} textAnchor="middle" className="v-t">{t}</text>
        <foreignObject x={tx-75} y={ty+4} width={150} height={44}><p className="v-d">{d}</p></foreignObject></g>; })}
    <circle cx={c} cy={c} r={7} className="v-dot"/>
  </svg>;
}

function Feed() {
  const [o,setO]=useState(0);
  useEffect(()=>{ const t=setInterval(()=>setO(v=>(v+1)%feed.length),2200); return ()=>clearInterval(t); },[]);
  const rows=Array.from({length:7},(_,i)=>feed[(o+i)%feed.length]).filter((row): row is [string,string,string] => row !== undefined);
  const hits=rows.filter(r=>r[2]!=='scan').length;
  return <div className="ml-feed" aria-live="off">
    <div className="ml-feed-bar"><i/><i/><i/><span>mirleon.app/mercek · canlı</span><em className="ml-feed-live">CANLI</em></div>
    <div className="ml-feed-head"><b className="pulse"/>Canlı tespit · tüm markalar<span className="ml-feed-sweep" aria-hidden="true"/></div>
    <ul>{rows.map(([d,b,k],i)=><li key={`${d}${o}`} className={`k-${k}${i===0?' new':''}`}>
      <span className="st"><i className="dot"/>{k==='scan'?'tarandı':'yakalandı'}</span><span className="dm">{d}</span>{b&&<span className="tag">{b}</span>}</li>)}</ul>
    <div className="ml-feed-foot"><span>1.248 alan adı tarandı</span><span>{hits} şüpheli tespit</span><span className="ok">Sistem aktif · 7/24</span></div>
  </div>;
}

const method = [
  ['I','Keşif','Markanızla ilişkili her alan adı, sertifika kaydı ve yayın; ilk göründüğü andan itibaren kayda alınır.'],
  ['II','Bağlam','Benzerlik tek başına kanıt değildir. Altyapı, sahiplik ve davranış birlikte okunur; gürültü ayıklanır.'],
  ['III','Karar','Ekibinize uzun bir liste değil, gerekçesi ve kanıtıyla sıralanmış birkaç net bulgu ulaşır.'],
];

const scope = [
  ['Taklit alan adları','Harf oyunları, yanıltıcı uzantılar ve yeni kayıtlar — yayına girmeden önce.'],
  ['Sahte yayınlar','Markanızın adını, logosunu veya dilini kullanan sayfalar ve hesaplar.'],
  ['Bağlantılı altyapı','Aynı kişinin, aynı sunucunun, aynı sertifikanın arkasındaki diğer izler.'],
  ['Oltalama hazırlığı','Kampanya başlamadan önce kurulan e-posta ve yönlendirme düzenekleri.'],
];

function Brand() { return <img src={logo.url} alt="MirLeon" className="brand-logo" />; }

function Home() {
  return <div className="ml">
    <header className="ml-header">
      <div className="ml-wrap ml-header-in">
        <a href="#top" aria-label="MirLeon ana sayfa"><Brand /></a>
        <nav className="ml-nav" aria-label="Ana menü">{nav.map(([l,h])=><a key={h} href={h}>{l}</a>)}</nav>
        <Button asChild variant="outline" className="ml-btn-ghost ml-nav-cta"><a href="#contact">Demo talep et</a></Button>
        <details className="ml-mobile"><summary aria-label="Menü"><Menu className="o"/><X className="c"/></summary><nav aria-label="Mobil menü">{nav.map(([l,h])=><a key={h} href={h}>{l}</a>)}</nav></details>
      </div>
    </header>

    <main id="top">
      <section className="ml-hero ml-cine" aria-labelledby="h1">
        <div className="ml-cine-bg" aria-hidden="true"><div className="ml-spin"><img src={earth.url} alt="" fetchPriority="high"/><span className="ml-beacon"/>{signals.map((s,i)=><span key={i} className={`ml-sig ${s.k}`} style={{ left:`${s.x}%`, top:`${s.y}%`, ['--d' as string]: `${s.d}s` }}>{s.tag&&<i className="ml-sig-tag">{s.tag}</i>}</span>)}</div></div>
        <div className="ml-wrap ml-cine-copy">
          <p className="ml-cine-kicker">MirLeon · Dijital Risk İstihbaratı</p>
          <h1 id="h1">Tehdidi<br/>doğmadan görün</h1>
          <p className="ml-cine-sub">Markanızı taklit eden alan adlarını ve sahte yayınları, ortaya çıkmadan önce kanıtıyla tespit ediyoruz.</p>
          <div className="ml-cine-actions">
            <a href="#contact" className="ml-bracket"><span className="ml-bracket-txt">Demo talep et</span><span className="ml-bracket-arrow" aria-hidden="true">→</span></a>
            <a href="#method" className="ml-cine-link">Nasıl çalışır →</a>
          </div>
        </div>
        <div className="ml-wrap ml-hero-foot ml-cine-foot">
          <span><b>&lt; 15 dk</b>Yeni kayıttan bildirime</span>
          <span><b>7/24</b>Kesintisiz izleme</span>
          <span><b>6 katman</b>Site başına analiz</span>
          <span><b>9 adım</b>Keşiften takibe</span>
        </div>
      </section>

      <section id="cycle" className="ml-cycle">
        <div className="ml-wrap ml-cycle-grid">
          <div className="ml-sec-head"><p className="ml-eyebrow">Yöntem · İnternetten takibe</p><h2>Keşiften takibe,<br/>tek bir akış.</h2><p className="ml-muted">Her tehdit, doğduğu andan kapanana kadar dokuz adımda izlenir — tek seferlik bir tarama değil, sürekli bir döngü.</p>
            <ol className="ml-cycle-list">{cycle.map((t,i)=><li key={t}><span className="ml-num">{String(i+1).padStart(2,'0')}</span>{t}</li>)}</ol></div>
          <Wheel/>
        </div>
      </section>


      <section className="ml-wrap ml-principles ml-principles-side">
        <Venn/>
        <div className="ml-sec-head"><p className="ml-eyebrow">Beş ilke · Tek amaç</p><h2 className="ml-principles-title">İlkelerimiz</h2><p className="ml-muted">Beş ilke, tek amaç: markanıza yönelen tehdidi siz daha fark etmeden görünür ve durdurulabilir kılmak.</p>
          <ul className="ml-pr-list">{principles.map(([t,d])=><li key={t}><b>{t}</b><span>{d}</span></li>)}</ul></div>
      </section>

      <section id="platform" className="ml-wrap ml-duo">
        <div className="ml-duo-col">
          <p className="ml-eyebrow">Platform</p>
          <p className="ml-big">Markanızın sınırı web siteniz değil. Adınızın geçtiği her yer, <em>itibarınızın bir parçası.</em> Biz o sınırın dışını izliyoruz.</p>
        </div>
        <div className="ml-duo-col">
          <p className="ml-eyebrow">Yerli · Gerçek zamanlı</p>
          <h2 className="ml-duo-title">Türkiye’nin <em>en hızlı, en detaylı</em> yapay zekâ destekli dijital varlık koruma platformu.</h2>
          <p className="ml-muted">Markanızı taklit eden tehditleri resmî listelere düşmeden dakikalar içinde yakalarız; yerli kaynaklarla (USOM · BTK · ETBİS) ve Türk mühendislerle analiz eder, sınıflandırır ve raporlarız.</p>
        </div>
      </section>

      <section id="layers" className="ml-wrap ml-layers">
        <div className="ml-sec-head split"><div><p className="ml-eyebrow">Katman katman istihbarat</p><h2>Bir sinyal değil — sitenin her yüzünü görürüz.</h2></div><p className="ml-muted">Alan adını eşleştirmek yalnızca başlangıç. Asıl iş; sitenin kime, nasıl ve ne gösterdiğini ortaya çıkarmak.</p></div>
        <div className="ml-layer-grid">{layers.map(([I,t,d],i)=><article key={t}><div className="top"><I strokeWidth={1.4}/><span className="ml-num">0{i+1}</span></div><h3>{t}</h3><p>{d}</p></article>)}</div>
      </section>

      <section className="ml-wrap ml-inspect">
        <div><p className="ml-eyebrow">Derin inceleme</p><h2>Siteyi ziyaret eder,<br/><em>gerçekte ne olduğunu</em> görürüz.</h2>
          <p className="ml-muted lead">Her şüpheli adresi gerçek bir kullanıcı gibi açar, içeriğini okur ve ekran görüntüsünü yapay zekâyla değerlendiririz — bir taklidi meşru bir kurumdan, sitenin kendisine bakarak ayırırız.</p>
          <ul><li><b>İçerik analizi</b> — ödeme geçidi, TL fiyat, Türkçe sepet akışı</li><li><b>Görsel analiz</b> — ekran görüntüsünden “ne satıyor, taklit mi”</li><li><b>ETBİS çapraz kontrol</b> — kayıtlı mı, kayıt dışı mı</li></ul></div>
        <figure className="ml-case">
          <div className="hd"><span>kira-yardim-edevlet-tr-gov.ph</span><b>Yüksek · 100</b></div>
          <div className="shot"><div className="bar"><i/><i/><i/></div><div className="pg"><span/><span/><span/><strong>5</strong><span className="s"/></div></div>
          <dl><dt>İçerik</dt><dd>Park / satılık sayfası (aktif içerik yok)</dd><dt>Altyapı</dt><dd>Akamai Technologies, Inc.</dd></dl>
          <div className="verdict">Kimlik avı · risk 100</div>
          <figcaption>Örnek tespit kaydı</figcaption>
        </figure>
      </section>

      <section id="live" className="ml-live">
        <div className="ml-wrap">
          <div className="ml-sec-head center"><p className="ml-eyebrow">Mercek</p><h2>Canlı tespit,<br/>gözünüzün önünde.</h2><p className="ml-muted">Akıştan geçen her sertifika taranır; kritere uyan, yakalandığı an kırmızı yanar.</p></div>
          <Feed/>
        </div>
      </section>

      <section className="ml-band"><div className="ml-wrap ml-band-in"><div><h2>Markanız şu an taklit ediliyor olabilir.</h2><p>Web sitenizi girin, 30 saniyede öğrenin. Hesap gerekmez, ücretsiz.</p></div>
        <Button asChild size="lg" className="ml-btn"><a href="mailto:info@mirleon.ai?subject=%C3%9Ccretsiz%20Tarama">Ücretsiz tara <ArrowUpRight/></a></Button></div></section>

      <section id="method" className="ml-wrap ml-method">
        <div className="ml-sec-head"><p className="ml-eyebrow">Yöntem</p><h2>Daha çok veri değil;<br/>daha net bir karar.</h2></div>
        <ol>{method.map(([n,t,d])=><li key={n}><span className="ml-num">{n}</span><h3>{t}</h3><p>{d}</p></li>)}</ol>
      </section>

      <section id="scope" className="ml-scope">
        <div className="ml-wrap ml-scope-grid">
          <div className="ml-sec-head sticky"><p className="ml-eyebrow">Kapsam</p><h2>Neyi izliyoruz.</h2><p className="ml-muted">Dört alan, tek bir görünüm. Her bulgu, neden önemli olduğunu söyleyen kanıtla birlikte gelir.</p></div>
          <ul>{scope.map(([t,d],i)=><li key={t}><span className="ml-num">0{i+1}</span><div><h3>{t}</h3><p>{d}</p></div></li>)}</ul>
        </div>
      </section>

      <section className="ml-wrap ml-quote">
        <blockquote>“İyi bir uyarı sistemi size her şeyi söylemez. Size neyin <em>gerçekten</em> önemli olduğunu söyler.”</blockquote>
        <p className="ml-muted">MirLeon ilkesi</p>
      </section>

      <section id="contact" className="ml-wrap ml-contact">
        <p className="ml-eyebrow">Bir sonraki adım</p>
        <h2>Markanızın dışarıdaki<br/>haritasını <em>birlikte</em> çıkaralım.</h2>
        <div className="ml-contact-row">
          <p className="ml-muted">Otuz dakikalık bir görüşmede, markanız adına şu an açık olan riskleri canlı olarak gösterelim.</p>
        </div>
      </section>
    </main>

    <footer className="ml-footer ml-foot2">
      <div className="ml-wrap">
        <div className="ml-foot2-grid">
          <div><Brand/><p className="ml-foot2-k">Get in touch</p><a className="ml-foot2-mail" href="mailto:info@mirleon.ai"><Mail/>info@mirleon.ai</a></div>
          <div><h4>Useful links</h4><Link className="ml-foot2-muted" to="/privacy">Privacy</Link></div>
          <div><h4><MapPin/>Türkiye</h4><p className="ml-foot2-muted">ODTÜ TEKNOKENT Co-Zone<br/>Mustafa Kemal Mah. Dumlupınar Blv.<br/>No: 280G İç Kapı No:1260<br/>Çankaya/Ankara</p><a className="ml-foot2-tel" href="tel:+903129001542"><Phone/>+90 312 900 15 42</a></div>
          <div><h4><MapPin/>United Kingdom</h4><p className="ml-foot2-muted">1st Floor 31-33 High Holborn, London,<br/>England, WC1V 6AX</p><a className="ml-foot2-tel" href="tel:+442045384102"><Phone/>+44 20 4538 4102</a></div>
        </div>
        <div className="ml-foot2-bar"><span>© Copyright 2025 – MirLeon All Rights Reserved.</span>
          <div className="ml-foot2-soc"><a href="#" aria-label="LinkedIn"><Linkedin/></a><a href="#" aria-label="Instagram"><Instagram/></a><a href="#" aria-label="X"><b>𝕏</b></a><a href="#" aria-label="N"><b>N</b></a></div></div>
      </div>
    </footer>
  </div>;
}
