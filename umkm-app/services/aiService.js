/* services/aiService.js — AI Advisor engine (simulasi, offline-first)
   Pengganti panggilan langsung ke api.anthropic.com dari browser (gagal CORS/tanpa kunci).
   Menghasilkan analisis berbasis data UMKM sehingga demo tetap berfungsi penuh. */
window.App = window.App || {};
(function(App){
  function pctNum(s){ return parseInt(String(s).replace(/\D/g,'')) || 0; }

  function summarize(u){
    var roi = pctNum(u.roi);
    var risk = u.ready ? (roi>=25 ? 'rendah\u2013sedang' : 'sedang') : 'sedang\u2013tinggi';
    var verdict = roi>=28 ? 'sangat menarik' : (roi>=20 ? 'menarik' : 'cukup menarik');
    var status = u.ready ? 'siap menerima investasi' : 'masih dalam tahap review kesiapan';
    var rec = u.ready
      ? ('alokasikan modal pada kisaran ' + u.modal + ' dengan milestone kinerja kuartalan.')
      : 'lakukan pendampingan & due diligence sebelum komitmen pendanaan.';
    return u.name + ' (' + u.cat + ', ' + u.kec + ') menunjukkan profil investasi yang ' + verdict +
      ' dengan estimasi ROI ' + u.roi + ' dan omzet ' + u.omzet + '/bulan. ' +
      'Keunggulan utama: rating ' + u.rating + '/5 serta ' + u.desc.toLowerCase() + ' ' +
      'Risiko dinilai ' + risk + '; status saat ini ' + status + '. Rekomendasi: ' + rec;
  }

  function answer(u, q){
    var t = (q||'').toLowerCase();
    var roi = pctNum(u.roi);
    if(/layak|worth|bagus|investasi ini/.test(t)){
      var l1 = u.ready ? 'tergolong layak dipertimbangkan' : 'belum sepenuhnya siap';
      var l2 = roi>=25 ? 'kuat' : 'cukup';
      var l3 = u.ready ? 'Disarankan masuk bertahap dengan evaluasi kuartalan.' : 'Sebaiknya tunggu hasil pembinaan/review terlebih dahulu.';
      return u.name + ' ' + l1 + '. Dengan ROI ' + u.roi + ' dan rating ' + u.rating + '/5, fundamental usaha ' + l2 + '. ' + l3;
    }
    if(/risiko|risk|bahaya|rugi/.test(t)){
      var r1 = u.ready ? 'eksekusi ekspansi' : 'kesiapan administrasi & legalitas';
      return 'Risiko utama ' + u.name + ': ketergantungan pada permintaan musiman sektor ' + u.cat.toLowerCase() +
        ', skala produksi, dan ' + r1 + '. Mitigasi: kontrak suplai, pencatatan keuangan rutin, dan target penjualan terukur.';
    }
    if(/modal|dana|biaya|berapa/.test(t)){
      return 'Kebutuhan modal yang disarankan berada pada kisaran ' + u.modal + '. Dengan omzet ' + u.omzet +
        '/bulan, modal sebaiknya difokuskan pada peningkatan kapasitas produksi dan pemasaran digital untuk mengejar ROI ' + u.roi + '.';
    }
    if(/jangka panjang|prospek|potensi|masa depan|growth/.test(t)){
      var p1 = roi>=25 ? 'tinggi' : 'moderat';
      return 'Potensi jangka panjang ' + u.name + ' ' + p1 + ': ' + u.desc.toLowerCase() +
        ' Tren sektor ' + u.cat.toLowerCase() + ' mendukung, sehingga pertumbuhan omzet 15\u201325% per tahun realistis bila pendampingan berjalan.';
    }
    var s1 = u.ready ? 'Siap investasi.' : 'Masih review.';
    return 'Untuk ' + u.name + ': ROI ' + u.roi + ', omzet ' + u.omzet + '/bln, modal ' + u.modal + ', rating ' + u.rating + '/5. ' + s1 +
      ' Silakan tanya soal kelayakan, risiko, modal, atau prospek jangka panjangnya.';
  }

  App.ai = {
    summary: function(u){ return new Promise(function(res){ setTimeout(function(){ res(summarize(u)); }, 900 + Math.random()*700); }); },
    reply: function(u,q){ return new Promise(function(res){ setTimeout(function(){ res(answer(u,q)); }, 700 + Math.random()*900); }); },
  };
})(window.App);
