/* ══════════════════════════════════════════
   FenTECH 2026 — Main Application Script
══════════════════════════════════════════ */

'use strict';

/* ── Competition Settings (admin-overridable via localStorage) ── */
const DEFAULT_COMP_SETTINGS = {
  sorun:    { name: '"SORUN ! Çözen Nesiller" Proje Yarışması', pdfUrl: 'pdfs/SORUN_Proje_Yarisma.pdf', regUrl: '#register' },
  hackathon:{ name: 'Hackathon Yarışması', pdfUrl: 'pdfs/Hechaton Yarışma Şartnamesi.pdf', regUrl: '#register' },
  robofutbol:{ name: 'RoboFutbol Ligi', pdfUrl: 'pdfs/2026 RoboFutbol Yarışma Şartnamesi.pdf', regUrl: '#register' },
  ermeydan: { name: 'Takımlar Er Meydanı', pdfUrl: 'pdfs/2026 Takımlar Er Meydanı Yarışma Şartnamesi.pdf', regUrl: '#register' },
  cizgi:    { name: 'Temel Seviye Çizgi İzleyen Robot', pdfUrl: 'pdfs/2026 Temel Seviye Çizgi izleyen Yarışma Şartnamesi.pdf', regUrl: '#register' }
};
// Merge with admin overrides (admin overrides artık Firestore'dan geliyor;
// refreshCompSettingsFromDB() bu objeyi yerinde günceller — referans sabit kalır)
const compSettings = {};
Object.keys(DEFAULT_COMP_SETTINGS).forEach(k => {
  compSettings[k] = Object.assign({}, DEFAULT_COMP_SETTINGS[k]);
});
function refreshCompSettingsFromDB() {
  const saved = (window.FentechDB && window.FentechDB.cache.compSettings) || {};
  Object.keys(DEFAULT_COMP_SETTINGS).forEach(k => {
    compSettings[k] = Object.assign({}, DEFAULT_COMP_SETTINGS[k], saved[k] || {});
  });
}

/* ── Competition Data — gerçek PDF şartnamelerinden ── */
const competitions = {
  sorun: {
    html: `
      <h2>🔬 "SORUN ! Çözen Nesiller" Proje Yarışması</h2>
      <div class="m-meta">
        <span>👥 Ekip: <strong>Takım halinde</strong></span>
        <span>📅 Festival: <strong>23–24 Haziran 2026</strong></span>
        <span>🎓 Seviye: <strong>Lise Öğrencileri</strong></span>
        <span>📍 Yer: <strong>Bahçelievler, İstanbul</strong></span>
      </div>
      <h3>Yarışmanın Amacı</h3>
      <p>"SORUN ! Çözen Nesiller" Proje Yarışması; öğrencilerin bilim, teknoloji, mühendislik ve matematik (STEM) disiplinlerini kullanarak gerçek yaşam problemlerine çözüm üretmelerini teşvik etmek amacıyla düzenlenmektedir.</p>
      <h3>Yarışma Temaları</h3>
      <ul>
        <li>İklim Değişikliği</li>
        <li>Çevre Kirliliği</li>
        <li>Atık Yönetimi</li>
        <li>Yenilenebilir Enerji</li>
        <li>Su Kaynaklarının Korunması</li>
        <li>Sürdürülebilir Yaşam</li>
      </ul>
      <p style="color:var(--c1);margin-top:0.5rem">⚠️ Yarışma günü jüri tarafından seçilen bir problem yarışmacılara sunulacaktır.</p>
      <h3>Yarışma Yöntemi — 2 Aşamalı Hibrit Yapı</h3>
      <ul>
        <li><strong>Ön Geliştirme & Ön Eleme:</strong> Takımlar proje fikirlerini çevrim içi ortamda sunar; en yüksek puanlı ilk 10 takım finale davet edilir</li>
        <li><strong>Final (Festival Alanı):</strong> Jüri tarafından hazırlanan "Değerli Mühendisler" mektubu ile problem iletilir; takımlar 2 gün boyunca problemi analiz eder, prototip tasarlar, test eder ve jüriye sunar</li>
      </ul>
      <h3>2 Günlük Final Süreci</h3>
      <ul>
        <li><strong>1. Gün:</strong> Problem tanıtımı → Problem analizi ve tasarım (Mühendislik Defteri) → Malzeme teminı → Prototip üretimine başlama</li>
        <li><strong>2. Gün:</strong> Prototip üretimini tamamlama → Test süreci (performans, dayanıklılık, işlevsellik) → Proje sunumu + Ürün tanıtım videosu → Mühendislik Defteri teslimi</li>
      </ul>
      <h3>Teslim Edilecekler</h3>
      <ul>
        <li>İşlevsel prototip</li>
        <li>Mühendislik Defteri (tüm tasarım süreci)</li>
        <li>Ürün tanıtım videosu</li>
        <li>Jüri sunumu</li>
      </ul>
      <h3>Önemli Tarihler</h3>
      <ul>
        <li>📌 Ön Eleme Başvuruları: Duyurulacak</li>
        <li>📌 Final: 23–24 Haziran 2026</li>
        <li>📌 Yer: Bahçelievler 15 Temmuz Şehitleri Teknoloji Proje AİHL</li>
      </ul>`
  },
  hackathon: {
    html: `
      <h2>💻 Hackathon Yarışması</h2>
      <div class="m-meta">
        <span>👥 Ekip: <strong>2–3 kişi</strong></span>
        <span>📅 Festival: <strong>23–24 Haziran 2026</strong></span>
        <span>🎓 Seviye: <strong>Lise Öğrencileri</strong></span>
        <span>📍 Yer: <strong>Bahçelievler, İstanbul</strong></span>
      </div>
      <h3>Tema</h3>
      <p style="font-size:1.1rem;color:var(--c1);font-weight:600">"Serbest İnovasyon: Sınırsız Çözümler"</p>
      <p>Hackathon kategorisinde herhangi bir konu sınırlaması bulunmamaktadır. Öğrenciler kendi gözlem ve deneyimlerinden hareketle tespit ettikleri gerçek bir probleme, dijital tabanlı ve mümkün olduğunca yapay zekâ destekli çözümler geliştirirler.</p>
      <h3>Katılım Şartları</h3>
      <ul>
        <li>Yarışmaya takım halinde katılmak esastır</li>
        <li>Takımlar en az 2, en fazla 3 öğrenciden oluşur</li>
        <li>Her takım için bir danışman öğretmen belirlenir</li>
        <li>Katılımcılar aynı anda yalnızca bir takımda yer alabilir</li>
      </ul>
      <h3>Çalışma Alanları</h3>
      <ul>
        <li>Bilim ve teknoloji</li>
        <li>Eğitim teknolojileri</li>
        <li>Sosyal fayda ve toplumsal çözümler</li>
        <li>Yapay zekâ uygulamaları</li>
        <li>Yazılım ve dijital sistemler</li>
        <li>Sürdürülebilirlik ve çevre</li>
      </ul>
      <h3>Teknoloji Kullanımı — "Technology Agnostic"</h3>
      <ul>
        <li><strong>Programlama Dilleri:</strong> Python, Java, C#, JavaScript (Node.js), Swift, Kotlin, Flutter, Go vb.</li>
        <li><strong>Yapay Zekâ:</strong> TensorFlow, PyTorch, Keras, Scikit-learn, OpenCV</li>
        <li><strong>LLM API:</strong> ChatGPT, Gemini, Claude API entegrasyonu — ancak özgün değer önerisi şart</li>
        <li>Tüm kütüphaneler Açık Kaynak veya geçerli lisanslı olmalıdır</li>
      </ul>
      <h3>Süreç — 2 Aşamalı</h3>
      <ul>
        <li><strong>Ön Eleme:</strong> Proje tanıtım metni, teknik açıklama, demo materyali online teslim → En yüksek puanlı 8 takım finale davet edilir</li>
        <li><strong>Final (Kodlama Maratonu):</strong> Festival alanında belirlenen süre boyunca yoğun geliştirme → Dışarıdan kod desteği yasak → Jüri sunumu</li>
      </ul>
      <h3>Teslim Edilecekler</h3>
      <ul>
        <li>Kaynak Kodlar (GitHub/GitLab — public veya erişime açık)</li>
        <li>Çalışan prototip / uygulama bağlantısı veya kurulum dosyası</li>
        <li>Sunum dosyası (problem, çözüm, teknik yapı, hedef kitle)</li>
        <li>Tanıtım videosu (isteğe bağlı)</li>
      </ul>
      <h3>Mentorluk</h3>
      <p>Final aşamasında üniversite, kamu ve teknoloji sektöründen mentorlar destek verir. Mentorlar yönlendirme yapabilir; ancak kod yazamaz ve geliştirici konumuna geçemez.</p>
      <h3>Önemli Tarihler</h3>
      <ul>
        <li>📌 Ön Eleme Başvuruları: Duyurulacak</li>
        <li>📌 Final Kodlama Maratonu: 23–24 Haziran 2026</li>
        <li>📌 Yer: Bahçelievler 15 Temmuz Şehitleri Teknoloji Proje AİHL</li>
      </ul>`
  },
  robofutbol: {
    html: `
      <h2>⚽ RoboFutbol Ligi Yarışma Kuralları</h2>
      <div class="m-meta">
        <span>👥 Ekip: <strong>3+1 yedek sporcu + 1 danışman</strong></span>
        <span>📅 Festival: <strong>23–24 Haziran 2026</strong></span>
        <span>🎓 Seviye: <strong>Lise Öğrencileri</strong></span>
        <span>📍 Yer: <strong>Bahçelievler, İstanbul</strong></span>
      </div>
      <h3>Yarışmanın Amacı</h3>
      <p>Bu kategoride öğrenci kontrollü robotlar, rakip kaleye gol atmaya çalışır. Süre sonunda en çok gol atan takım kazanmış sayılır. Her biri 3 robottan oluşan iki takım arasında futbol oyunu oynanır.</p>
      <h3>Saha Özellikleri</h3>
      <ul>
        <li>Alan: 305 cm uzunluğunda × 156 cm genişliğinde yeşil zemin</li>
        <li>Kale: 40 cm genişliğinde</li>
        <li>Top: Havalı hokey topu</li>
        <li>Zemin: Dekota malzeme, zeminden 1 cm yükseklik, 10 cm koruma alanı</li>
        <li>2 hakem tarafından kontrol edilir</li>
      </ul>
      <h3>Robot Teknik Özellikleri</h3>
      <ul>
        <li><strong>Boyut:</strong> Maks. 18 cm en × 18 cm boy (yükseklik sınırlaması yok)</li>
        <li><strong>Mikrokontrolör:</strong> Deneyap Mini, Deneyap Kart veya Deneyap 1A</li>
        <li><strong>Motor Sürücü:</strong> L293D veya L298 DC Motor Sürücü Modülü</li>
        <li><strong>DC Motor:</strong> L redüktörlü 6-12V 250rpm sarı motor — maks. 2 adet (zorunlu)</li>
        <li><strong>Tekerlek:</strong> Maks. 70 mm çap × 30 mm kalınlık — maks. 2 adet</li>
        <li><strong>Kontrol:</strong> Xbox/PS kumandası veya Bluetooth ile cep telefonu/tablet</li>
      </ul>
      <h3>Maç Kuralları</h3>
      <ul>
        <li>Toplam süre: 6 dakika (2 yarı × 3 dakika)</li>
        <li>Her takımın 2 mola hakkı vardır (biri teknik mola)</li>
        <li>1 oyuncu değişim hakkı — yedek oyuncu varsa 1 dakika mola</li>
        <li>Çalışan tek robot kalan takım 3-0 mağlup sayılır</li>
        <li>Molada oyun süresi durdurulur</li>
      </ul>
      <h3>Yasaklar</h3>
      <ul>
        <li>Rakibin çalışmasını engelleyen frekans/dalga boyu etkileyen parçalar</li>
        <li>Saha yüzeyine zarar veren malzemeler</li>
        <li>Sıvı, gaz veya patlayıcı kullanımı</li>
        <li>Batarya için sigorta/koruma devresi zorunludur — aksi hâlde diskalifiye</li>
      </ul>
      <h3>Müsabaka Formatı</h3>
      <p>Katılım sayısına göre lig, grup veya eleme usulüne göre yapılır.</p>
      <h3>Önemli Tarihler</h3>
      <ul>
        <li>📌 Müsabakalar: 23–24 Haziran 2026</li>
        <li>📌 Yer: Bahçelievler 15 Temmuz Şehitleri Teknoloji Proje AİHL</li>
      </ul>`
  },
  ermeydan: {
    html: `
      <h2>⚔️ Takımlar Er Meydanı — Robot Güreşi</h2>
      <div class="m-meta">
        <span>👥 Ekip: <strong>2 sporcu + 1 danışman öğretmen</strong></span>
        <span>📅 Festival: <strong>23–24 Haziran 2026</strong></span>
        <span>🎓 Seviye: <strong>Lise Öğrencileri</strong></span>
        <span>📍 Yer: <strong>Bahçelievler, İstanbul</strong></span>
      </div>
      <h3>Yarışmanın Amacı</h3>
      <p>Bu kategoride öğrenci kontrollü robotlar, yaptıkları ikili karşılaşmalarda rakiplerini güreş minderinden atmaya çalışır. Her biri 2 robottan oluşan iki takım arasında meydan güreşi yapılır. Yarışma sonunda minderde en son kalan aracın takımı kazanmış sayılır.</p>
      <h3>Güreş Sahası</h3>
      <ul>
        <li>Zemin: 120 cm çapında daire, 5 cm yükseklikte, dekota malzeme</li>
        <li>Sınır çizgisi: 2 cm eninde beyaz çizgi — müsabaka alanı dâhilindedir</li>
        <li>Zemin rengi: Siyah, sınır: beyaz</li>
      </ul>
      <h3>Robot Teknik Özellikleri</h3>
      <ul>
        <li><strong>Boyut:</strong> Maks. 18 cm en × 18 cm boy (yükseklik sınırlaması yok)</li>
        <li><strong>Ağırlık:</strong> 700 gramdan hafif olmak zorunludur</li>
        <li><strong>Mikrokontrolör:</strong> Deneyap Mini, Deneyap Kart veya Deneyap 1A (standart şase zorunlu)</li>
        <li><strong>Motor Sürücü:</strong> L293D veya L298 DC Motor Sürücü Modülü</li>
        <li><strong>DC Motor:</strong> L redüktörlü 6-12V 250rpm sarı motor — maks. 2 adet (zorunlu)</li>
        <li><strong>Tekerlek:</strong> Maks. 70 mm çap × 30 mm kalınlık — maks. 2 adet</li>
        <li><strong>Kontrol:</strong> Xbox/PS kumandası veya Bluetooth ile cep telefonu/tablet</li>
        <li>RoboFutbol liginde kullanılan robotlar bu yarışmada da kullanılabilir</li>
      </ul>
      <h3>Maç Kuralları</h3>
      <ul>
        <li>Müsabaka 3 set üzerinden 2 seti alan takım kazanır</li>
        <li>Her sette takımlar 2 çalışan robotla sahaya çıkmalıdır (tek robotla yarışılamaz)</li>
        <li>Takımların müsabaka boyunca set aralarında 1 dakika mola hakkı vardır</li>
        <li>Çalışmayan veya hasar alan robot molada tamir edilemezse 2 dakika teknik mola verilir — bu sürede de tamir edilemezse hükmen yenik</li>
        <li>Bir takımda yalnızca 1 robot kalırsa set sona erer, o takım maçı kaybeder</li>
        <li>Robotlar hakem tarafından belirlenen noktada konumlandırılır; hakem düdüğüyle başlatılır</li>
      </ul>
      <h3>Yasaklar</h3>
      <ul>
        <li>Rakibin çalışmasını etkileyen frekans/dalga boyu değiştiren parçalar</li>
        <li>Saha yüzeyine zarar veren veya iz bırakan malzemeler</li>
        <li>Sıvı, gaz veya saldırı silahı niteliğinde malzeme kullanımı</li>
        <li>Batarya için sigorta/koruma devresi zorunludur</li>
      </ul>
      <h3>Müsabaka Formatı</h3>
      <p>Katılım sayısına göre lig, grup veya eleme usulüne göre yapılır.</p>
      <h3>Önemli Tarihler</h3>
      <ul>
        <li>📌 Müsabakalar: 23–24 Haziran 2026</li>
        <li>📌 Yer: Bahçelievler 15 Temmuz Şehitleri Teknoloji Proje AİHL</li>
      </ul>`
  },
  cizgi: {
    html: `
      <h2>🤖 Temel Seviye Çizgi İzleyen Robot Yarışması</h2>
      <div class="m-meta">
        <span>👥 Ekip: <strong>Maks. 2 sporcu + 1 danışman</strong></span>
        <span>📅 Festival: <strong>23–24 Haziran 2026</strong></span>
        <span>🎓 Seviye: <strong>Lise Öğrencileri</strong></span>
        <span>📍 Yer: <strong>Bahçelievler, İstanbul</strong></span>
      </div>
      <h3>Yarışmanın Amacı</h3>
      <p>Çizgi izleyen robotlar siyah zemin üzerindeki beyaz çizgiyi otonom olarak takip ederek parkuru en kısa sürede ve en az ceza puanı ile tamamlamaya çalışırlar. Sıralama yarışmasında süre esastır.</p>
      <h3>Parkur Özellikleri</h3>
      <ul>
        <li>Pist uzunluğu: Yaklaşık 2400 cm</li>
        <li>Zemin: 18 mm sunta üzerine siyah mat dekota — 250×400 cm plakalar</li>
        <li>Çizgi: 20±2 mm kalınlığında beyaz mat folyo — yol kenarından merkeze 200±5 mm</li>
        <li>Başlangıç/Bitiş çizgisi: 40 cm uzunluk, pist başlangıcından 40 cm içeride</li>
        <li>Başlama/Bitiş sensörleri: 15 mm yüksekliğinde</li>
        <li>Parkurda farklı açılarda dönüşler bulunmaktadır</li>
      </ul>
      <h3>Robot Teknik Özellikleri</h3>
      <ul>
        <li><strong>Boyut:</strong> Maks. 280 mm boy × 180 mm en</li>
        <li><strong>Mikrokontrolör:</strong> Yalnızca Deneyap Kart, Arduino UNO veya Arduino Nano</li>
        <li><strong>Çizgi Sensör:</strong> Maks. 8'li Çizgi Sensör Kartı</li>
        <li><strong>Motor Sürücü:</strong> Arduino Motor Shield - L293D veya L298 DC Motor Sürücü Modülü</li>
        <li><strong>DC Motor:</strong> L redüktörlü 6-12V 250rpm sarı motor (zorunlu)</li>
        <li><strong>Tekerlek:</strong> Maks. 65 mm çap × 30 mm kalınlık</li>
      </ul>
      <h3>Yarışma Kuralları</h3>
      <ul>
        <li>Robotlar çekilen kuradaki sıraya göre yarışır; hepsi aynı noktadan başlar</li>
        <li>Toplam yarışma süresi: 5 dakikayı geçemez</li>
        <li>Start yapamayan robota 10 saniye ceza — 5 start hakkı vardır</li>
        <li>Yarışmacılara mola, bakım veya tamir zamanı verilmez</li>
        <li>Başlama öncesi kalibrasyon için süre verilir</li>
        <li>Robot pistte kalıcı iz bırakamazjurydan/yola zarar veremez — diskalifiye</li>
        <li>Yarışma süresince lastik ve pil değişimi dışında robot üzerinde değişiklik yapılamaz</li>
        <li>Kare kod robot gövdesine sabit yapıştırılmalıdır</li>
      </ul>
      <h3>Müsabaka Formatı</h3>
      <p>Katılım sayısına göre lig, grup veya eleme usulüne göre yapılır. Sıralama ceza süreleri hesaplandıktan sonra hakemler tarafından ilan edilir.</p>
      <h3>Önemli Tarihler</h3>
      <ul>
        <li>📌 Müsabakalar: 23–24 Haziran 2026</li>
        <li>📌 Yer: Bahçelievler 15 Temmuz Şehitleri Teknoloji Proje AİHL</li>
      </ul>`
  }
};

/* ── Schedule Data ── */
const scheduleData = [
  /* 23 Haziran 2026 — 1. GÜN: Grup Karşılaşmaları (FenTECH 2026 Yarışma Fikstürü afişine göre) */
  [
    { time: '09:00', title: 'Kayıt & Akreditasyon', desc: 'Kimlik doğrulama, yaka kartı ve karşılama paketi teslimi', badge: '' },
    { time: '09:30', title: 'Açılış Töreni', desc: 'FenTECH 2026 resmi açılış ve protokol konuşmaları', badge: 'keynote' },
    { time: '10:00', title: 'SORUN! Çözen Nesiller — Ön Sunum', desc: 'Proje yarışması ilk tur sunum ve jüri değerlendirmesi', badge: 'comp' },
    { time: '10:00', title: 'RoboFutbol — Grup Aşaması 1. Tur', desc: '1., 2. ve 3. tur maçları 15\'er dakikalık aralıklarla 4 farklı sahada eş zamanlı icra edilecek (10:00–10:45)', badge: 'comp' },
    { time: '11:00', title: 'Hackathon Başlangıç', desc: 'Serbest İnovasyon temalı 24 saatlik kodlama maratonu başlıyor', badge: 'comp' },
    { time: '11:00', title: 'RoboFutbol — Grup Aşaması 2. Tur', desc: 'Grup aşaması ikinci tur maçları 15\'er dakikalık aralıklarla sürüyor (11:00–11:45)', badge: 'comp' },
    { time: '12:00', title: 'RoboFutbol — Grup Aşaması 3. Tur', desc: 'Grup aşamasının son turuyla 2. gün eleme sıralaması netleşiyor (12:00–12:45)', badge: 'comp' },
    { time: '13:00', title: 'Öğle Arası', desc: 'Katılımcılar için yemek ve kısa mola', badge: 'social' },
    { time: '14:30', title: 'Er Meydanı — 1. Tur', desc: 'Robotlar 1. turdan itibaren 10\'ar dakikalık maçlarla 1. ve 2. minderde ter dökecek (14:30–15:40)', badge: 'comp' },
    { time: '14:30', title: 'Çizgi İzleyen — 1. Tur', desc: '48 robotun yer aldığı geniş katılımlı ilk tur, 1. ve 2. pistlerde 15 dakikalık periyotlarla tamamlanacak (14:30–17:15)', badge: 'comp' },
    { time: '15:50', title: 'Er Meydanı — 2. Tur', desc: '1. ve 2. minderde 10\'ar dakikalık maçlarla ikinci tur mücadeleleri (15:50–17:00)', badge: 'comp' },
    { time: '17:10', title: 'Er Meydanı — 3. Tur', desc: 'Günün son er meydanı turuyla 1. gün mücadeleleri tamamlanıyor (17:10–18:20)', badge: 'comp' },
    { time: '18:30', title: 'Networking & Stant Gezisi', desc: 'Sponsor firmalar ve mentörlerle buluşma, proje standlarını ziyaret', badge: 'social' },
  ],
  /* 24 Haziran 2026 — 2. GÜN: Eleme Turları ve Finaller (FenTECH 2026 Yarışma Fikstürü afişine göre) */
  [
    { time: '08:30', title: 'Sabah Brifingi', desc: 'Gün programı duyuruları ve teknik güncellemeler', badge: '' },
    { time: '09:00', title: 'Hackathon Son Saatleri & Teslim', desc: 'Ekipler projelerini tamamlıyor; saat 10:00\'da kod dondurma', badge: 'comp' },
    { time: '09:00', title: 'RoboFutbol — Eleme 32\'li Tur', desc: 'Sabah seansında elemeler 4 sahada eş zamanlı olarak 32\'li turla başlıyor (09:00–09:45)', badge: 'comp' },
    { time: '10:00', title: 'SORUN! Çözen Nesiller — Final Sunumları', desc: 'İlk turdan seçilen finalistlerin jüri önünde kapsamlı sunum ve Q&A', badge: 'comp' },
    { time: '10:00', title: 'RoboFutbol — Eleme 16\'lı Tur', desc: '16\'lı turla başlayan eleme maçları finale doğru hızla ilerliyor (10:00–10:45)', badge: 'comp' },
    { time: '11:30', title: 'Çizgi İzleyen — 2. Tur', desc: 'Robot sırası 1-40 arasında eleme turları 15\'er dakikalık aralıklarla devam ediyor (11:30–13:45)', badge: 'comp' },
    { time: '11:30', title: 'Er Meydanı — 1. Tur (2. Gün)', desc: 'İkinci güne ait grup maçlarıyla eleme turları 15\'er dakikalık aralıklarla sürüyor (11:30–13:45)', badge: 'comp' },
    { time: '13:00', title: 'Öğle Arası', desc: 'Katılımcılar için yemek ve son değerlendirme molası', badge: 'social' },
    { time: '14:00', title: 'Çizgi İzleyen — FİNAL', desc: 'Şampiyonluk yarışında en hızlı ve hatasız robotu belirleyecek final start ediyor', badge: 'keynote' },
    { time: '14:45', title: 'RoboFutbol — FİNAL', desc: '1.lik ve 3.lük maçlarıyla RoboFutbol Ligi şampiyonu belirleniyor', badge: 'keynote' },
    { time: '15:30', title: 'Hackathon Jüri Sunumları', desc: 'Her ekip 5 dakika sunum + 5 dakika sorular', badge: 'comp' },
    { time: '16:10', title: 'Er Meydanı — BÜYÜK FİNAL', desc: '1.lik ve 3.lük maçlarıyla Takımlar Er Meydanı turnuvası şampiyonunu buluyor', badge: 'keynote' },
    { time: '17:00', title: 'Ödül Töreni', desc: 'Tüm kategorilerde kazananların açıklanması ve ödüllerin takdimi', badge: 'keynote' },
    { time: '18:00', title: 'Kapanış & Hatıra Fotoğrafı', desc: 'Resmi kapanış, sertifika dağıtımı ve toplu fotoğraf', badge: 'social' },
  ],
];

/* ══════════════════════════════════
   CURSOR
══════════════════════════════════ */
function initCursor() {
  const outer = document.getElementById('cursorOuter');
  const dot   = document.getElementById('cursorDot');
  if (!outer || !dot) return;

  let mx = 0, my = 0, ox = 0, oy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function moveOuter() {
    ox += (mx - ox) * 0.15;
    oy += (my - oy) *.15;
    outer.style.left = ox + 'px';
    outer.style.top  = oy + 'px';
    requestAnimationFrame(moveOuter);
  })();

  document.querySelectorAll('a, button, .comp-card, .faq-q, input, select, textarea, .stab').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-grow'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-grow'));
  });
}

/* ══════════════════════════════════
   INTRO ANIMATION
══════════════════════════════════ */
function initIntro() {
  const screen  = document.getElementById('introScreen');
  const canvas  = document.getElementById('introCanvas');
  const iFen    = document.getElementById('iFen');
  const iTech   = document.getElementById('iTech');
  const iYear   = document.getElementById('iYear');
  const iTag    = document.getElementById('iTagline');
  const iBar      = document.getElementById('iBar');
  const iFestName = document.getElementById('iFestName');

  /* Intro canvas particles */
  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - .5) * 0.4,
    vy: (Math.random() - .5) * 0.4,
    r: Math.random() * 1.5 + 0.5,
    a: Math.random() * 0.6 + 0.2
  }));

  let animId;
  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,245,255,${p.a})`;
      ctx.fill();
    });

    particles.forEach((a, i) => {
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0,245,255,${0.12 * (1 - d / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    });
    animId = requestAnimationFrame(drawParticles);
  }
  drawParticles();

  /* Sequence */
  setTimeout(() => iFen.classList.add('show'), 400);
  setTimeout(() => iTech.classList.add('show'), 900);
  setTimeout(() => { if (iFestName) iFestName.classList.add('show'); }, 1200);
  setTimeout(() => iYear.classList.add('show'), 1500);
  setTimeout(() => iTag.classList.add('show'), 2100);
  setTimeout(() => {
    iBar.classList.add('show');
    setTimeout(() => iBar.querySelector('.intro-bar-fill').classList.add('fill'), 50);
  }, 2400);
  setTimeout(() => {
    cancelAnimationFrame(animId);
    screen.classList.add('fade-out');
    screen.addEventListener('animationend', () => screen.remove(), { once: true });
  }, 4600);
}

/* ══════════════════════════════════
   HERO PARTICLE CANVAS
══════════════════════════════════ */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W = canvas.width  = window.innerWidth;
  let H = canvas.height = window.innerHeight;
  let mouse = { x: W / 2, y: H / 2 };

  const count = Math.min(120, Math.floor(W * H / 10000));
  const pts = Array.from({ length: count }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - .5) * 0.5,
    vy: (Math.random() - .5) * 0.5,
    r: Math.random() * 1.8 + 0.5,
    hue: Math.random() < 0.15 ? 330 : 190  // mostly cyan, some pink
  }));

  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

  window.addEventListener('resize', () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });

  (function tick() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 180) {
        p.vx += dx / dist * 0.015;
        p.vy += dy / dist * 0.015;
      }
      p.vx *= 0.99; p.vy *= 0.99;
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.hue === 330
        ? `rgba(255,0,110,0.6)`
        : `rgba(0,245,255,0.6)`;
      ctx.fill();
    });

    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
        if (d < 130) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0,245,255,${0.15 * (1 - d / 130)})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(tick);
  })();
}

/* ══════════════════════════════════
   NAVBAR
══════════════════════════════════ */
function initNavbar() {
  const nav = document.getElementById('navbar');
  const ham = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  ham.addEventListener('click', () => {
    links.classList.toggle('open');
    ham.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      ham.classList.remove('open');
    });
  });
}

/* ══════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════ */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.dataset.delay) || 0;
        setTimeout(() => e.target.classList.add('visible'), delay);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

/* ══════════════════════════════════
   STATS COUNTER
══════════════════════════════════ */
function initStats() {
  const cards = document.querySelectorAll('.stat-card');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const card = e.target;
      card.classList.add('visible');
      const target = parseInt(card.dataset.target);
      const el = card.querySelector('.counter');
      let start = 0;
      const dur = 1800;
      const step = timestamp => {
        if (!start) start = timestamp;
        const prog = Math.min((timestamp - start) / dur, 1);
        const ease = 1 - Math.pow(1 - prog, 3);
        el.textContent = Math.floor(ease * target).toLocaleString('tr-TR');
        if (prog < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      io.unobserve(card);
    });
  }, { threshold: 0.3 });
  cards.forEach(c => io.observe(c));
}

/* ══════════════════════════════════
   COUNTDOWN
══════════════════════════════════ */
function initCountdown() {
  const target = new Date('2026-06-23T09:00:00+03:00');
  const dEl = document.getElementById('cdDays');
  const hEl = document.getElementById('cdHours');
  const mEl = document.getElementById('cdMins');
  const sEl = document.getElementById('cdSecs');

  function pad(n) { return String(n).padStart(2, '0'); }

  function update() {
    const diff = target - Date.now();
    if (diff <= 0) {
      dEl.textContent = hEl.textContent = mEl.textContent = sEl.textContent = '00';
      return;
    }
    const days  = Math.floor(diff / 864e5);
    const hours = Math.floor((diff % 864e5) / 36e5);
    const mins  = Math.floor((diff % 36e5) / 6e4);
    const secs  = Math.floor((diff % 6e4) / 1e3);
    dEl.textContent = String(days);
    hEl.textContent = pad(hours);
    mEl.textContent = pad(mins);
    sEl.textContent = pad(secs);
  }
  update();
  setInterval(update, 1000);
}

/* ══════════════════════════════════
   SCHEDULE
══════════════════════════════════ */
function renderSchedule(dayIdx) {
  const tl = document.getElementById('schedTimeline');
  tl.innerHTML = '';
  scheduleData[dayIdx].forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'se-item';
    div.style.animationDelay = i * 0.07 + 's';
    const badgeLabels = { keynote:'KEYNOTE', workshop:'WORKSHOP', comp:'YARIŞMA', social:'SOSYAL' };
    const badgeClass = badgeLabels[item.badge] ? item.badge : 'custom';
    const badgeText  = badgeLabels[item.badge] || (item.badge ? item.badge.toUpperCase() : '');
    const badgeHtml  = item.badge ? `<span class="se-badge ${badgeClass}">${badgeText}</span>` : '';
    div.innerHTML = `
      <div class="se-time">${item.time}</div>
      <div class="se-dot"></div>
      <div class="se-content">
        <div class="se-title">${item.title}</div>
        <div class="se-desc">${item.desc}</div>
      </div>
      ${badgeHtml}`;
    tl.appendChild(div);
  });
}

function switchDay(dayIdx, btn) {
  document.querySelectorAll('.stab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderSchedule(dayIdx);
}

/* ══════════════════════════════════
   MODAL
══════════════════════════════════ */
/* Sync visible competition card titles with admin-edited names */
function applyCompSettingsToCards() {
  Object.keys(compSettings).forEach(key => {
    const card = document.querySelector(`.comp-card[data-comp="${key}"]`);
    if (!card) return;
    const titleEl = card.querySelector('.cc-title');
    const name = compSettings[key]?.name;
    if (titleEl && name) titleEl.textContent = name;
    // Keep the registration form's category dropdown in sync too
    const opt = document.querySelector(`#regForm select[name="competition"] option[value="${key}"]`);
    if (opt && name) opt.textContent = name;
  });
}

function openModal(key) {
  const data = competitions[key];
  const cfg  = compSettings[key];
  if (!data) return;
  document.getElementById('modalBody').innerHTML = data.html;
  // Action buttons in modal
  const rawPdfUrl = (window._adminPdfUrls && window._adminPdfUrls[key]) || cfg?.pdfUrl || '#';
  const pdfUrl = rawPdfUrl !== '#' ? encodeURI(rawPdfUrl) : '#';
  const regUrl = cfg?.regUrl || '#register';
  document.getElementById('modalActions').innerHTML = `
    <button onclick="openPdf('${key}')" class="modal-btn-pdf">📄 Şartnameyi İndir / Aç</button>
    <a href="${regUrl.startsWith('#') ? regUrl : regUrl}" ${!regUrl.startsWith('#') ? 'target="_blank" rel="noopener"' : ''} class="modal-btn-reg">📝 Yarışmaya Başvur</a>
  `;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function openPdf(key) {
  // Check session-uploaded blob URL first (set by admin PDF upload)
  if (window._adminPdfUrls && window._adminPdfUrls[key]) {
    window.open(window._adminPdfUrls[key], '_blank', 'noopener,noreferrer');
    return;
  }
  const url = compSettings[key]?.pdfUrl;
  if (url && url !== '#') {
    window.open(encodeURI(url), '_blank', 'noopener,noreferrer');
  } else {
    alert('Bu yarışma için şartname henüz yüklenmemiştir.');
  }
}

function openRegLink(key) {
  const url = compSettings[key]?.regUrl;
  if (!url || url === '#' || url === '#register') {
    document.getElementById('register').scrollIntoView({ behavior: 'smooth' });
  } else {
    window.open(url, '_blank', 'noopener');
  }
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* ══════════════════════════════════
   FAQ
══════════════════════════════════ */
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = answer.classList.contains('open');

  document.querySelectorAll('.faq-a.open').forEach(a => {
    a.classList.remove('open');
    a.previousElementSibling.classList.remove('open');
  });

  if (!isOpen) {
    answer.classList.add('open');
    btn.classList.add('open');
  }
}

/* ══════════════════════════════════
   ROLE CHANGE HANDLER
══════════════════════════════════ */
function onRoleChange(radio) {
  const fieldClass       = document.getElementById('fieldClass');
  const fieldSchool      = document.getElementById('fieldSchool');
  const fieldInstitution = document.getElementById('fieldInstitution');
  const classSelect      = document.getElementById('classSelect');
  const schoolInput      = document.getElementById('schoolNameInput');
  const instInput        = document.getElementById('institutionInput');

  if (radio.value === 'student') {
    fieldClass.style.display       = '';
    fieldSchool.style.display      = '';
    fieldInstitution.style.display = 'none';
    classSelect.setAttribute('required', '');
    schoolInput.setAttribute('required', '');
    instInput.removeAttribute('required');
  } else {
    fieldClass.style.display       = 'none';
    fieldSchool.style.display      = 'none';
    fieldInstitution.style.display = '';
    instInput.setAttribute('required', '');
    classSelect.removeAttribute('required');
    schoolInput.removeAttribute('required');
  }
}

/* ══════════════════════════════════
   FORM SUBMISSION
══════════════════════════════════ */
async function submitForm(e) {
  e.preventDefault();
  const form    = e.target;
  const errMsg  = document.getElementById('regErrMsg');
  errMsg.style.display = 'none';
  let valid = true;

  // Clear previous errors
  form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

  // Validate visible required fields
  form.querySelectorAll('[required]').forEach(field => {
    if (field.closest('.role-field') && field.closest('.role-field').style.display === 'none') return;
    const isEmpty = (field.type === 'checkbox') ? !field.checked
                  : (field.type === 'radio')    ? false   // handled separately
                  : !field.value.trim();
    if (isEmpty) { field.classList.add('error'); valid = false; }
    if (field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
      field.classList.add('error'); valid = false;
    }
  });

  // Role must be selected
  const role = form.querySelector('input[name="role"]:checked');
  if (!role) {
    valid = false;
    errMsg.textContent = 'Lütfen öğrenci veya öğretmen rolünüzü seçin.';
    errMsg.style.display = 'block';
  }

  if (!valid) {
    const first = form.querySelector('.error');
    if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  // Gather form data
  const firstName = form.firstName.value.trim();
  const lastName  = form.lastName.value.trim();
  const email     = form.email.value.trim();
  const phone     = form.phone.value.trim();
  const province  = form.province.value;
  const roleVal   = role.value;
  const classVal  = roleVal === 'student' ? form.class.value : '';
  const schoolVal = roleVal === 'student' ? form.schoolName.value.trim() : '';
  const instVal   = roleVal === 'teacher' ? form.institution.value.trim() : '';
  const comp      = form.competition.value;

  const submitBtn = form.querySelector('[type="submit"]');
  if (submitBtn) submitBtn.disabled = true;

  try {
    if (!window.FentechDB) throw new Error('Veritabanı bağlantısı bulunamadı.');
    await window.FentechDB.ready;

    // Duplicate check (same Ad + Soyad) — canlı veritabanı önbelleğine göre
    const registrations = window.FentechDB.cache.registrations || [];
    const fullName = `${firstName} ${lastName}`.toLowerCase();
    const duplicate = registrations.find(r => `${r.firstName} ${r.lastName}`.toLowerCase() === fullName);
    if (duplicate) {
      errMsg.textContent = `"${firstName} ${lastName}" adına daha önce kayıt yapılmıştır.`;
      errMsg.style.display = 'block';
      if (submitBtn) submitBtn.disabled = false;
      return;
    }

    // Save registration to Firestore — tüm cihazlarda anlık olarak görünür olur
    const newReg = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      firstName, lastName, email, phone, province,
      role: roleVal, class: classVal, schoolName: schoolVal, institution: instVal, competition: comp
    };
    await window.FentechDB.addRegistration(newReg);

    form.style.opacity = '0.5';
    form.style.pointerEvents = 'none';

    setTimeout(() => {
      form.style.display = 'none';
      document.getElementById('regSuccessMsg').textContent =
        `Merhaba ${firstName}! FenTECH 2026'ya kaydınız tamamlandı.`;
      document.getElementById('regSuccess').style.display = 'block';
      document.getElementById('regSuccess').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 700);
  } catch (err) {
    console.error('Kayıt gönderilemedi:', err);
    errMsg.textContent = 'Kaydınız gönderilirken bir hata oluştu. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.';
    errMsg.style.display = 'block';
    if (submitBtn) submitBtn.disabled = false;
  }
}

/* ══════════════════════════════════
   THEME TOGGLE
══════════════════════════════════ */
function initTheme() {
  const html = document.documentElement;
  const btn  = document.getElementById('themeToggle');
  const icon = document.getElementById('ttIcon');
  const saved = localStorage.getItem('fentech_theme') || 'dark';
  html.setAttribute('data-theme', saved);
  if (icon) icon.textContent = saved === 'dark' ? '☀️' : '🌙';

  if (btn) {
    btn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next    = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('fentech_theme', next);
      if (icon) icon.textContent = next === 'dark' ? '☀️' : '🌙';
    });
  }
}

/* ══════════════════════════════════
   ADMIN HASH ROUTING
══════════════════════════════════ */
function checkAdminHash() {
  const adminWrap = document.getElementById('adminWrapper');
  if (!adminWrap) return;
  if (window.location.hash === '#admin') {
    adminWrap.style.display = 'block';
    document.body.style.overflow = 'hidden';
    const login = document.getElementById('loginScreen');
    const panel = document.getElementById('adminPanel');

    const showLoggedIn = () => {
      if (login) login.style.display = 'none';
      if (panel) panel.style.display = 'flex';
      if (typeof initPanel === 'function') initPanel();
    };
    const showLoginScreen = () => {
      if (login) login.style.display = '';
      if (panel) panel.style.display = 'none';
    };

    if (window.FentechDB && window.FentechDB.auth) {
      // Firebase Authentication ilk oturum durumunu belirleyene kadar bekle —
      // aksi halde sayfa yenilemesinde "giriş yapılmamış" sanıp giriş ekranı
      // bir an için yanlışlıkla gösterilebilir.
      window.FentechDB.authReady.then(() => {
        if (window.location.hash !== '#admin') return; // kullanıcı bu sırada başka yere gitmiş olabilir
        if (window.FentechDB.auth.currentUser) showLoggedIn();
        else showLoginScreen();
      });
    } else {
      showLoginScreen();
    }
  } else {
    adminWrap.style.display = 'none';
    document.body.style.overflow = '';
  }
}

window.addEventListener('hashchange', checkAdminHash);

// Giriş/çıkış her değiştiğinde admin görünümünü yeniden değerlendir
if (window.FentechDB && window.FentechDB.auth) {
  window.FentechDB.onAuthChange(() => checkAdminHash());
}

/* ── Live update from Firestore (admin panel changes sync to all devices) ── */
function refreshFromDB() {
  if (!window.FentechDB) return;

  // Refresh comp settings
  refreshCompSettingsFromDB();
  // Reflect updated competition names on the visible cards & registration dropdown
  applyCompSettingsToCards();

  // Refresh schedule
  const savedSched = window.FentechDB.cache.schedule;
  if (savedSched && Array.isArray(savedSched[0])) scheduleData[0] = savedSched[0];
  if (savedSched && Array.isArray(savedSched[1])) scheduleData[1] = savedSched[1];
  // Re-render visible schedule day
  const activeTab = document.querySelector('.stab.active');
  const dayIdx = activeTab ? Array.from(document.querySelectorAll('.stab')).indexOf(activeTab) : 0;
  renderSchedule(dayIdx);

  // Refresh stats counters
  const savedStats = window.FentechDB.cache.stats || {};
  if (savedStats.participantTarget) {
    const sc = document.querySelector('.stat-card[data-target="5000"]') ||
               document.querySelector('.stat-card[data-target]');
    if (sc) sc.setAttribute('data-target', savedStats.participantTarget);
  }
  if (savedStats.prizePool) {
    document.querySelectorAll('.stat-card').forEach(c => {
      if (c.querySelector('.stat-lbl')?.textContent.trim() === 'Toplam Ödül Havuzu') {
        c.setAttribute('data-target', savedStats.prizePool);
      }
    });
  }
}

if (window.FentechDB) {
  // Her Firestore güncellemesinde (admin panelinden veya başka bir cihazdan) yeniden çiz
  window.FentechDB.onUpdate(() => refreshFromDB());
}

/* ══════════════════════════════════
   INIT
══════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();

  // Firestore verisi yüklendiğinde (admin tarafından kaydedilmiş program/istatistik/
  // yarışma ayarları) sayfayı tüm cihazlarda anında güncelle
  if (window.FentechDB) {
    window.FentechDB.ready.then(() => refreshFromDB());
  }

  initIntro();
  initCursor();
  initNavbar();
  initHeroCanvas();
  initScrollReveal();
  initStats();
  initCountdown();
  renderSchedule(0);
  applyCompSettingsToCards();

  /* Smooth-link active state */
  const navLinks = document.querySelectorAll('.nav-lnk');
  const sections = document.querySelectorAll('section[id]');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-lnk[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  // Admin hash routing — run after DOM ready
  checkAdminHash();
});
