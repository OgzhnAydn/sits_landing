import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import logo from '@/assets/mirleon-logo.png.asset.json';

export const Route = createFileRoute('/privacy')({
  head: () => ({ meta: [
    { title: 'Gizlilik Politikası — MirLeon' },
    { name: 'description', content: 'MirLeon gizlilik politikası: hangi verileri, hangi amaçla işleriz ve haklarınız nelerdir.' },
    { property: 'og:title', content: 'Gizlilik Politikası — MirLeon' },
    { property: 'og:description', content: 'MirLeon gizlilik politikası: hangi verileri, hangi amaçla işleriz ve haklarınız nelerdir.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }), component: Privacy,
});

const sections: [string, string][] = [
  ['1. Genel', 'MirLeon, dijital risk istihbaratı hizmeti kapsamında işlediği tüm kişisel verileri 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve ilgili mevzuata uygun olarak işlemektedir. Bu politika, hangi verileri hangi amaçla işlediğimizi ve haklarınızı açıklar.'],
  ['2. İşlediğimiz veriler', 'Sitemizi ziyaret ettiğinizde yalnızca teknik olarak gerekli olan veriler (tarayıcı türü, erişim zamanı gibi) işlenir. Hizmet sürecinde ise iletişim formu, e-posta veya demo talebi aracılığıyla paylaştığınız ad, kurum, e-posta adresi ve telefon gibi iletişim verilerini işleriz.'],
  ['3. İşleme amacı', 'Verileriniz yalnızca talebinizi yanıtlamak, demo ve tarama hizmetini sunmak, hizmet sözleşmesinin ifası ve yasal yükümlülüklerin yerine getirilmesi amacıyla kullanılır. Verileriniz pazarlama amacıyla açık rızanız olmadan kullanılmaz ve üçüncü taraflara satılmaz.'],
  ['4. Saklama süresi', 'İletişim verileri, hizmet ilişkisinin sona ermesinden itibaren yasal saklama süreleri boyunca tutulur; bu süreler dolduğunda silinir veya anonim hâle getirilir.'],
  ['5. Çerezler', 'Sitemiz temel işlevler için zorunlu çerezler dışında, açık rızanıza bağlı olmayan kalıcı izleyici çerezi kullanmaz.'],
  ['6. Haklarınız', 'KVKK m.11 uyarınca; verilerinize erişme, düzeltilmesini veya silinmesini isteme, işlemeye itiraz etme ve rızanızı geri çekme hakkına sahipsiniz. Taleplerinizi info@mirleon.ai adresine iletebilirsiniz.'],
  ['7. İletişim', 'Gizlilik ile ilgili tüm sorularınız için: MirLeon · ODTÜ TEKNOKENT Co-Zone, Çankaya/Ankara · info@mirleon.ai'],
];

function Privacy() {
  return <div className="ml-legal">
    <header className="ml-legal-bar">
      <div className="ml-wrap ml-legal-nav">
        <Link to="/" className="ml-legal-brand"><img src={logo.url} alt="MirLeon" className="brand-logo"/></Link>
        <Link to="/" className="ml-legal-back"><ArrowLeft size={14}/> Ana sayfa</Link>
      </div>
    </header>
    <main className="ml-wrap">
      <p className="ml-eyebrow">Yasal</p>
      <h1>Gizlilik Politikası</h1>
      <p className="ml-legal-updated">Son güncelleme: Ekim 2026</p>
      {sections.map(([t, d]) => <section key={t}><h2>{t}</h2><p>{d}</p></section>)}
    </main>
  </div>;
}
