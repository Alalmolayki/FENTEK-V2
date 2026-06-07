'use strict';

/* ══════════════════════════════════
   AUTH
══════════════════════════════════ */
const ADMIN_USER = 'adminala';
const ADMIN_PASS = 'adminala';

function doLogin(e) {
  e.preventDefault();
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value;
  const err  = document.getElementById('loginErr');

  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    sessionStorage.setItem('fentech_admin_auth', '1');
    showPanel();
  } else {
    err.style.display = 'block';
    document.getElementById('loginPass').value = '';
  }
}

function doLogout() {
  sessionStorage.removeItem('fentech_admin_auth');
  document.getElementById('adminPanel').style.display  = 'none';
  document.getElementById('loginScreen').style.display = '';
  // Trigger hashchange which calls checkAdminHash() → hides the overlay
  window.location.hash = '';
}

function showPanel() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('adminPanel').style.display  = 'flex';
  initPanel();
}

// Auth check is handled by app.js checkAdminHash() when embedded in index.html.
// This fallback handles the standalone admin/index.html redirect case.
window.addEventListener('DOMContentLoaded', () => {
  // Only auto-login if we're on the hash (not via app.js which runs first)
  // app.js checkAdminHash() calls initPanel() when needed; this is a no-op when embedded.
});

/* ══════════════════════════════════
   DEFAULT DATA (mirrors app.js defaults)
══════════════════════════════════ */
const ADMIN_COMP_DEFAULTS = {
  sorun:     { name: '"SORUN ! Çözen Nesiller" Proje Yarışması', icon: '🔬', pdfUrl: 'pdfs/SORUN_Proje_Yarisma.pdf', regUrl: '' },
  hackathon: { name: 'Hackathon Yarışması', icon: '💻', pdfUrl: 'pdfs/Hechaton Yarışma Şartnamesi.pdf', regUrl: '' },
  robofutbol:{ name: 'RoboFutbol Ligi', icon: '⚽', pdfUrl: 'pdfs/2026 RoboFutbol Yarışma Şartnamesi.pdf', regUrl: '' },
  ermeydan:  { name: 'Takımlar Er Meydanı', icon: '⚔️', pdfUrl: 'pdfs/2026 Takımlar Er Meydanı Yarışma Şartnamesi.pdf', regUrl: '' },
  cizgi:     { name: 'Temel Seviye Çizgi İzleyen Robot', icon: '🤖', pdfUrl: 'pdfs/2026 Temel Seviye Çizgi izleyen Yarışma Şartnamesi.pdf', regUrl: '' }
};

const DEFAULT_SCHEDULE = [
  [
    { time:'09:00', title:'Kayıt & Akreditasyon', desc:'Kimlik doğrulama, yaka kartı ve karşılama paketi teslimi', badge:'' },
    { time:'10:00', title:'Açılış Töreni', desc:'FenTECH 2026 resmi açılış ve protokol konuşmaları', badge:'keynote' },
    { time:'10:30', title:'SORUN! Çözen Nesiller — Ön Sunum', desc:'Proje yarışması ilk tur sunum ve jüri değerlendirmesi', badge:'comp' },
    { time:'11:00', title:'Hackathon Başlangıç', desc:'Serbest İnovasyon temalı 24 saatlik kodlama maratonu başlıyor', badge:'comp' },
    { time:'11:30', title:'Er Meydanı — Eleme Turları', desc:'Robot güreşi 120 cm dairesel arenada eleme maçları', badge:'comp' },
    { time:'13:00', title:'Öğle Arası', desc:'Katılımcılar için yemek ve kısa mola', badge:'social' },
    { time:'14:00', title:'Çizgi İzleyen — Eleme Turları', desc:'Otonom çizgi takipçi robotlar ~2400 cm pistte yarışıyor', badge:'comp' },
    { time:'15:30', title:'RoboFutbol — Grup Maçları', desc:"305×156 cm arenada 3'er robotlu takımlar havalı hokey topuyla karşılaşıyor", badge:'comp' },
    { time:'17:30', title:'Networking & Stant Gezisi', desc:'Sponsor firmalar ve mentörlerle buluşma', badge:'social' }
  ],
  [
    { time:'09:00', title:'Sabah Brifingi', desc:'Gün programı duyuruları ve teknik güncellemeler', badge:'' },
    { time:'09:30', title:'Hackathon Son Saatleri & Teslim', desc:"Ekipler projelerini tamamlıyor; saat 10:00'da kod dondurma", badge:'comp' },
    { time:'10:00', title:'SORUN! Final Sunumları', desc:'İlk turdan seçilen finalistlerin jüri önünde sunumu', badge:'comp' },
    { time:'11:00', title:'Er Meydanı — Yarı Final & Final', desc:'Robot güreşi yarı final, üçüncülük ve final maçları', badge:'comp' },
    { time:'12:30', title:'Öğle Arası', desc:'Katılımcılar için yemek ve son değerlendirme molası', badge:'social' },
    { time:'13:30', title:'Çizgi İzleyen — Final', desc:'En hızlı çizgi takipçi için şampiyona finalı', badge:'comp' },
    { time:'14:30', title:'RoboFutbol — Final', desc:'Şampiyon belirlenecek yarı final ve final maçları', badge:'comp' },
    { time:'15:30', title:'Hackathon Jüri Sunumları', desc:'Her ekip 5 dakika sunum + 5 dakika sorular', badge:'comp' },
    { time:'17:00', title:'Ödül Töreni', desc:'Tüm kategorilerde kazananların açıklanması ve ödüllerin takdimi', badge:'keynote' },
    { time:'18:00', title:'Kapanış & Hatıra Fotoğrafı', desc:'Resmi kapanış, sertifika dağıtımı ve toplu fotoğraf', badge:'social' }
  ]
];

/* ══════════════════════════════════
   HELPERS
══════════════════════════════════ */
function getRegs()     { return JSON.parse(localStorage.getItem('fentech_registrations') || '[]'); }
function getCompSets() {
  const saved = JSON.parse(localStorage.getItem('fentech_comp_settings') || '{}');
  const merged = {};
  Object.keys(ADMIN_COMP_DEFAULTS).forEach(k => {
    merged[k] = Object.assign({}, ADMIN_COMP_DEFAULTS[k], saved[k] || {});
  });
  return merged;
}
function getSched() {
  const saved = JSON.parse(localStorage.getItem('fentech_schedule') || 'null');
  if (saved && Array.isArray(saved[0]) && Array.isArray(saved[1])) return saved;
  return JSON.parse(JSON.stringify(DEFAULT_SCHEDULE)); // deep clone
}
function getStats() { return JSON.parse(localStorage.getItem('fentech_stats') || '{}'); }

const COMP_LABELS = {
  sorun:'SORUN! Proje', hackathon:'Hackathon', robofutbol:'RoboFutbol',
  ermeydan:'Er Meydanı', cizgi:'Çizgi İzleyen'
};

/* ══════════════════════════════════
   INIT PANEL
══════════════════════════════════ */
function initPanel() {
  renderDashboard();
  renderCompEditors();
  renderScheduleEditor();
  renderParticipants();
}

/* ══════════════════════════════════
   TABS
══════════════════════════════════ */
function showTab(name, btn) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.sb-link').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
  btn.classList.add('active');

  // Refresh on tab switch
  if (name === 'dashboard')    renderDashboard();
  if (name === 'participants') renderParticipants();
}

/* ══════════════════════════════════
   DASHBOARD
══════════════════════════════════ */
function renderDashboard() {
  const regs = getRegs();
  document.getElementById('dashRegCount').textContent = regs.length;

  const stats = getStats();
  const prize = stats.prizePool ? Number(stats.prizePool).toLocaleString('tr-TR') + ' ₺' : '500.000 ₺';
  document.getElementById('dashPrize').textContent = prize;

  // Pre-fill stats form
  if (stats.participantTarget) document.getElementById('statParticipant').value = stats.participantTarget;
  if (stats.prizePool)         document.getElementById('statPrize').value = stats.prizePool;

  // Recent 5 regs
  const recent = regs.slice(-5).reverse();
  const wrap = document.getElementById('recentRegs');
  if (recent.length === 0) {
    wrap.innerHTML = '<p class="no-data">Henüz kayıt yok.</p>';
    return;
  }
  wrap.innerHTML = `
    <table class="part-table">
      <thead><tr>
        <th>Ad Soyad</th><th>Rol</th><th>Yarışma</th><th>Tarih</th>
      </tr></thead>
      <tbody>
        ${recent.map(r => `
          <tr>
            <td>${esc(r.firstName)} ${esc(r.lastName)}</td>
            <td><span class="part-badge ${r.role}">${r.role === 'student' ? 'Öğrenci' : 'Öğretmen'}</span></td>
            <td>${COMP_LABELS[r.competition] || r.competition}</td>
            <td>${new Date(r.timestamp).toLocaleDateString('tr-TR')}</td>
          </tr>`).join('')}
      </tbody>
    </table>`;
}

function saveStats() {
  const p = parseInt(document.getElementById('statParticipant').value) || 0;
  const r = parseInt(document.getElementById('statPrize').value) || 0;
  const obj = {};
  if (p) obj.participantTarget = p;
  if (r) obj.prizePool = r;
  localStorage.setItem('fentech_stats', JSON.stringify(obj));
  flashMsg('statsSaveMsg');
  renderDashboard();
  window.dispatchEvent(new CustomEvent('fentech-admin-update'));
}

/* ══════════════════════════════════
   COMPETITIONS
══════════════════════════════════ */
function renderCompEditors() {
  const settings = getCompSets();
  const wrap = document.getElementById('compEditors');
  wrap.innerHTML = Object.keys(ADMIN_COMP_DEFAULTS).map(key => {
    const s = settings[key];
    const hasUpload = window._adminPdfUrls && window._adminPdfUrls[key];
    const uploadLabel = window._adminPdfNames && window._adminPdfNames[key]
      ? `✅ ${window._adminPdfNames[key]}`
      : (hasUpload ? '✅ PDF yüklendi (oturum)' : '📂 PDF seçin...');
    return `
      <div class="comp-editor-card">
        <div class="ce-header">
          <span class="ce-icon">${s.icon}</span>
          <span class="ce-title">${key.toUpperCase()}</span>
        </div>
        <div class="ce-fields">
          <div class="afg">
            <label>Yarışma Adı</label>
            <input type="text" id="ce_name_${key}" value="${esc(s.name)}" placeholder="Yarışma adı">
          </div>
          <div class="afg">
            <label>Başvuru Linki (URL)</label>
            <input type="url" id="ce_regurl_${key}" value="${esc(s.regUrl)}" placeholder="https://...">
          </div>
          <div class="afg">
            <label>Şartname PDF Yükle</label>
            <label class="pdf-upload-btn" for="ce_pdffile_${key}">
              <span id="ce_pdf_label_${key}">${uploadLabel}</span>
              <input type="file" id="ce_pdffile_${key}" accept=".pdf" style="display:none"
                onchange="uploadCompPdf('${key}', this)">
            </label>
            <p class="pdf-upload-note">⚠️ Yüklenen PDF yalnızca oturum süresince aktiftir.</p>
          </div>
        </div>
      </div>`;
  }).join('');
}

/* ── PDF Upload ── */
window._adminPdfUrls  = window._adminPdfUrls  || {};
window._adminPdfNames = window._adminPdfNames || {};

function uploadCompPdf(key, input) {
  const file = input.files[0];
  if (!file) return;
  if (file.type !== 'application/pdf') {
    alert('Yalnızca PDF dosyası yükleyebilirsiniz.');
    return;
  }
  // Create a blob URL (session-only, no localStorage needed)
  if (window._adminPdfUrls[key]) {
    URL.revokeObjectURL(window._adminPdfUrls[key]);
  }
  window._adminPdfUrls[key]  = URL.createObjectURL(file);
  window._adminPdfNames[key] = file.name;
  const label = document.getElementById(`ce_pdf_label_${key}`);
  if (label) label.textContent = `✅ ${file.name}`;
}

function saveCompSettings() {
  const current = JSON.parse(localStorage.getItem('fentech_comp_settings') || '{}');
  Object.keys(ADMIN_COMP_DEFAULTS).forEach(key => {
    current[key] = current[key] || {};
    current[key].name   = document.getElementById(`ce_name_${key}`)?.value?.trim()   || ADMIN_COMP_DEFAULTS[key].name;
    current[key].regUrl = document.getElementById(`ce_regurl_${key}`)?.value?.trim() || '';
    // pdfUrl stays as default path; blob URLs are in window._adminPdfUrls (session-only)
    current[key].pdfUrl = ADMIN_COMP_DEFAULTS[key].pdfUrl;
  });
  localStorage.setItem('fentech_comp_settings', JSON.stringify(current));
  flashMsg('compSaveMsg');
  // Notify main page to refresh
  window.dispatchEvent(new CustomEvent('fentech-admin-update'));
}

/* ══════════════════════════════════
   SCHEDULE
══════════════════════════════════ */
let currentSchedDay = 0;
let schedData = getSched();

function showSchedDay(day, btn) {
  currentSchedDay = day;
  document.querySelectorAll('.sdt').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderScheduleEditor();
}

function renderScheduleEditor() {
  const day   = schedData[currentSchedDay];
  const wrap  = document.getElementById('schedEditor');

  wrap.innerHTML = `
    <div class="se-row-header">
      <span>Saat</span><span>Başlık</span><span>Açıklama</span><span>Kategori</span><span></span>
    </div>
    ${day.map((item, i) => buildSeRow(item, i)).join('')}`;
}

function buildSeRow(item, i) {
  const cats = ['','keynote','workshop','comp','social','custom'];
  const catOpts = cats.map(c => {
    const labels = {'':`-- Yok --`, keynote:'KEYNOTE', workshop:'WORKSHOP', comp:'YARIŞMA', social:'SOSYAL', custom:'ÖZEL'};
    return `<option value="${c}" ${item.badge === c ? 'selected' : ''}>${labels[c] || c}</option>`;
  }).join('');

  const badgeVal = item.badge || '';
  return `
    <div class="se-row" data-idx="${i}">
      <div class="afg"><input type="time" class="se-time-in" value="${item.time}" onchange="updateSchedItem(${i},'time',this.value)"></div>
      <div class="afg"><input type="text" class="se-title-in" value="${esc(item.title)}" placeholder="Başlık" onchange="updateSchedItem(${i},'title',this.value)"></div>
      <div class="afg"><input type="text" class="se-desc-in" value="${esc(item.desc)}" placeholder="Açıklama" onchange="updateSchedItem(${i},'desc',this.value)"></div>
      <div class="afg">
        <select class="se-badge-sel" onchange="onBadgeChange(${i},this)">
          ${catOpts}
        </select>
        ${badgeVal === 'custom' ? `<input type="text" style="margin-top:4px" class="se-custom-in" id="se_custom_${i}" value="${esc(item.customBadge||'')}" placeholder="Özel etiket" onchange="updateSchedItem(${i},'customBadge',this.value)">` : ''}
      </div>
      <button class="se-del" onclick="deleteSchedItem(${i})" title="Sil">✕</button>
    </div>`;
}

function onBadgeChange(i, sel) {
  schedData[currentSchedDay][i].badge = sel.value;
  if (sel.value === 'custom') schedData[currentSchedDay][i].customBadge = '';
  else delete schedData[currentSchedDay][i].customBadge;
  renderScheduleEditor();
}

function updateSchedItem(i, field, value) {
  schedData[currentSchedDay][i][field] = value;
}

function deleteSchedItem(i) {
  schedData[currentSchedDay].splice(i, 1);
  renderScheduleEditor();
}

function addSchedItem() {
  schedData[currentSchedDay].push({ time:'12:00', title:'Yeni Etkinlik', desc:'', badge:'' });
  renderScheduleEditor();
  // Scroll to last
  const wrap = document.getElementById('schedEditor');
  wrap.lastElementChild?.scrollIntoView({ behavior:'smooth', block:'nearest' });
}

function saveSchedule() {
  // Collect latest values from DOM inputs before saving
  const rows = document.querySelectorAll('.se-row');
  rows.forEach((row, i) => {
    const item = schedData[currentSchedDay][i];
    if (!item) return;
    item.time  = row.querySelector('.se-time-in')?.value  || item.time;
    item.title = row.querySelector('.se-title-in')?.value || item.title;
    item.desc  = row.querySelector('.se-desc-in')?.value  || item.desc;
    item.badge = row.querySelector('.se-badge-sel')?.value || item.badge;
    const customIn = row.querySelector('.se-custom-in');
    if (customIn) item.customBadge = customIn.value;
  });

  // For 'custom' badge, replace badge text with customBadge value so main site uses it
  const toSave = schedData.map(day => day.map(item => {
    if (item.badge === 'custom' && item.customBadge) {
      return { ...item, badge: item.customBadge };
    }
    return item;
  }));

  localStorage.setItem('fentech_schedule', JSON.stringify(toSave));
  flashMsg('schedSaveMsg');
  window.dispatchEvent(new CustomEvent('fentech-admin-update'));
}

/* ══════════════════════════════════
   PARTICIPANTS
══════════════════════════════════ */
let filteredRegs = [];

function renderParticipants(query) {
  const regs = getRegs();
  const q    = (query || '').toLowerCase();
  filteredRegs = q
    ? regs.filter(r =>
        `${r.firstName} ${r.lastName} ${r.email} ${r.competition}`.toLowerCase().includes(q))
    : regs;

  const wrap = document.getElementById('partTable');
  document.getElementById('partCount').textContent = `Toplam: ${filteredRegs.length} kayıt`;

  if (filteredRegs.length === 0) {
    wrap.innerHTML = '<p class="no-data">Kayıt bulunamadı.</p>';
    return;
  }

  wrap.innerHTML = `
    <table class="part-table">
      <thead><tr>
        <th>#</th>
        <th>Ad Soyad</th>
        <th>E-posta</th>
        <th>Telefon</th>
        <th>İl</th>
        <th>Rol</th>
        <th>Sınıf / Okul / Kurum</th>
        <th>Yarışma</th>
        <th>Tarih</th>
        <th></th>
      </tr></thead>
      <tbody>
        ${filteredRegs.map((r, i) => `
          <tr>
            <td>${i + 1}</td>
            <td><strong>${esc(r.firstName)} ${esc(r.lastName)}</strong></td>
            <td>${esc(r.email)}</td>
            <td>${esc(r.phone)}</td>
            <td>${esc(r.province || '-')}</td>
            <td><span class="part-badge ${r.role}">${r.role === 'student' ? '🎓 Öğrenci' : '👨‍🏫 Öğretmen'}</span></td>
            <td>${r.role === 'student'
                  ? `${esc(classLabel(r.class))}${r.schoolName ? ' — ' + esc(r.schoolName) : ''}`
                  : esc(r.institution || '-')}</td>
            <td>${COMP_LABELS[r.competition] || esc(r.competition)}</td>
            <td>${new Date(r.timestamp).toLocaleDateString('tr-TR')}</td>
            <td><button class="a-btn-sm" onclick="deleteReg(${r.id})">Sil</button></td>
          </tr>`).join('')}
      </tbody>
    </table>`;
}

function filterParticipants() {
  const q = document.getElementById('searchPart').value;
  renderParticipants(q);
}

function deleteReg(id) {
  if (!confirm('Bu kaydı silmek istediğinizden emin misiniz?')) return;
  const regs = getRegs().filter(r => r.id !== id);
  localStorage.setItem('fentech_registrations', JSON.stringify(regs));
  renderParticipants(document.getElementById('searchPart')?.value);
}

function clearAllRegs() {
  if (!confirm('TÜM kayıtlar silinecek. Onaylıyor musunuz?')) return;
  localStorage.removeItem('fentech_registrations');
  renderParticipants();
  renderDashboard();
}

function exportExcel() {
  const regs = filteredRegs.length > 0 ? filteredRegs : getRegs();
  if (regs.length === 0) { alert('İndirilecek kayıt yok.'); return; }

  const rows = regs.map((r, i) => ({
    'No':              i + 1,
    'Ad':              r.firstName,
    'Soyad':           r.lastName,
    'E-posta':         r.email,
    'Telefon':         r.phone,
    'İl':              r.province || '',
    'Rol':             r.role === 'student' ? 'Öğrenci' : 'Öğretmen',
    'Sınıf':           r.role === 'student' ? classLabel(r.class) : '',
    'Okuduğu Okul':    r.role === 'student' ? (r.schoolName || '') : '',
    'Kurum Adı':       r.role === 'teacher' ? (r.institution || '') : '',
    'Yarışma':         COMP_LABELS[r.competition] || r.competition,
    'Kayıt Tarihi':    new Date(r.timestamp).toLocaleDateString('tr-TR')
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  // Column widths
  ws['!cols'] = [
    {wch:5},{wch:15},{wch:15},{wch:28},{wch:16},{wch:14},{wch:12},{wch:12},{wch:24},{wch:22},{wch:22},{wch:15}
  ];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Katılımcılar');
  XLSX.writeFile(wb, `FenTECH2026_Katilimcilar_${new Date().toISOString().slice(0,10)}.xlsx`);
}

/* ══════════════════════════════════
   UTILS
══════════════════════════════════ */
function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* Format a student "class" value (e.g. "11" or "hazirlik") into a readable label */
function classLabel(val) {
  if (!val) return '-';
  if (val === 'hazirlik') return 'Hazırlık';
  return `${val}. Sınıf`;
}

function flashMsg(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 3000);
}
