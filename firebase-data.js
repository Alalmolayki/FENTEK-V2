'use strict';
/*
 * FentechDB - Firestore data layer (compat SDK)
 * Loads BEFORE app.js / admin.js as a plain <script> tag (NOT type="module"),
 * so it can populate window.FentechDB synchronously before those scripts run
 * their top-level code, and so script execution order is guaranteed.
 *
 * Provides:
 *   - window.FentechDB.cache          : live in-memory mirror of Firestore data
 *   - window.FentechDB.ready          : Promise that resolves once first snapshot
 *                                       of every collection/doc has arrived
 *   - window.FentechDB.onUpdate(cb)   : subscribe to "data changed" notifications
 *   - window.FentechDB.save…/add…/delete… methods (all async, talk to Firestore)
 */
(function () {
  const firebaseConfig = {
    apiKey: "AIzaSyDlUChy41H5IE2dByoRlhKVMeyRYwdZTUA",
    authDomain: "fentek-v2.firebaseapp.com",
    projectId: "fentek-v2",
    storageBucket: "fentek-v2.firebasestorage.app",
    messagingSenderId: "447710489401",
    appId: "1:447710489401:web:8cb922cb0657d5feef56e8"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  const cache = {
    registrations: [],
    compSettings: {},
    schedule: null,
    stats: {}
  };

  const readyFlags = { regs: false, comp: false, sched: false, stats: false };
  let readyResolve;
  const ready = new Promise(function (res) { readyResolve = res; });
  function checkReady() {
    if (readyResolve && Object.keys(readyFlags).every(function (k) { return readyFlags[k]; })) {
      readyResolve();
      readyResolve = null;
    }
  }

  const listeners = [];
  function notify() {
    listeners.forEach(function (cb) {
      try { cb(); } catch (e) { console.error('FentechDB listener error:', e); }
    });
  }

  db.collection('registrations').orderBy('timestamp', 'asc').onSnapshot(function (snap) {
    cache.registrations = snap.docs.map(function (d) {
      return Object.assign({ _docId: d.id }, d.data());
    });
    readyFlags.regs = true; checkReady(); notify();
  }, function (err) {
    console.error('Kayıtlar alınamadı (Firestore):', err);
    readyFlags.regs = true; checkReady();
  });

  db.doc('settings/compSettings').onSnapshot(function (snap) {
    cache.compSettings = (snap.exists ? snap.data() : null) || {};
    readyFlags.comp = true; checkReady(); notify();
  }, function (err) {
    console.error('Yarışma ayarları alınamadı (Firestore):', err);
    readyFlags.comp = true; checkReady();
  });

  db.doc('settings/schedule').onSnapshot(function (snap) {
    // Firestore "nested arrays are not supported" hatası yüzünden program
    // [[gün0...], [gün1...]] biçiminde değil, { day0: [...], day1: [...] }
    // biçiminde saklanıyor. Burada eski [[...],[...]] formatına geri çeviriyoruz
    // ki app.js / admin.js kodları değişmeden çalışmaya devam etsin.
    const data = snap.exists ? snap.data() : null;
    let days = null;
    if (data) {
      const arr = [];
      let i = 0;
      while (Array.isArray(data['day' + i])) { arr.push(data['day' + i]); i++; }
      if (arr.length) days = arr;
    }
    cache.schedule = days;
    readyFlags.sched = true; checkReady(); notify();
  }, function (err) {
    console.error('Program alınamadı (Firestore):', err);
    readyFlags.sched = true; checkReady();
  });

  db.doc('settings/stats').onSnapshot(function (snap) {
    cache.stats = (snap.exists ? snap.data() : null) || {};
    readyFlags.stats = true; checkReady(); notify();
  }, function (err) {
    console.error('İstatistikler alınamadı (Firestore):', err);
    readyFlags.stats = true; checkReady();
  });

  window.FentechDB = {
    cache: cache,
    ready: ready,

    onUpdate: function (cb) {
      if (typeof cb === 'function') listeners.push(cb);
    },

    saveCompSettings: function (obj) {
      return db.doc('settings/compSettings').set(obj || {}, { merge: false });
    },

    saveSchedule: function (daysArray) {
      // Firestore iç içe diziye (array of arrays) izin vermiyor — her günü
      // ayrı bir alan olarak (day0, day1, ...) düz bir obje halinde kaydediyoruz.
      const obj = {};
      (daysArray || []).forEach(function (day, i) { obj['day' + i] = day; });
      return db.doc('settings/schedule').set(obj);
    },

    saveStats: function (obj) {
      return db.doc('settings/stats').set(obj || {});
    },

    addRegistration: function (reg) {
      return db.collection('registrations').add(reg);
    },

    deleteRegistration: function (id) {
      return db.collection('registrations').where('id', '==', id).get().then(function (snap) {
        const batch = db.batch();
        snap.forEach(function (doc) { batch.delete(doc.ref); });
        return batch.commit();
      });
    },

    clearAllRegistrations: function () {
      return db.collection('registrations').get().then(function (snap) {
        const batch = db.batch();
        snap.forEach(function (doc) { batch.delete(doc.ref); });
        return batch.commit();
      });
    }
  };
})();
