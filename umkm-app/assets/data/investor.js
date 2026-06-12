/* Data peluang investasi + chat strategis (WhatsApp Business style) */
window.App = window.App || {}; App.DATA = App.DATA || {};

App.DATA.INV_OPPS = [
  {name:'UMKM Bu Sari',cat:'Kuliner',kec:'Surabaya',roi:'24%',omzet:'Rp42Jt',rating:4.8,modal:'Rp80\u2013200Jt',desc:'Produsen onde onde & jajanan tradisional. Omzet stabil, pelanggan loyal 5 tahun.',emoji:'\uD83C\uDF61',ready:true},
  {name:'Batik Kranggan',cat:'Fashion',kec:'Surabaya',roi:'31%',omzet:'Rp78Jt',rating:4.9,modal:'Rp150\u2013500Jt',desc:'Batik tulis motif Surya Majapahit. Ekspor ke 12 negara, permintaan terus meningkat.',emoji:'\uD83D\uDC57',ready:true},
  {name:'Bambu Karya',cat:'Kerajinan',kec:'Gresik',roi:'18%',omzet:'Rp35Jt',rating:4.6,modal:'Rp50\u2013150Jt',desc:'Kerajinan bambu premium untuk hotel & resort. Kontrak jangka panjang tersedia.',emoji:'\uD83E\uDEB5',ready:true},
  {name:'Catering Bu Dewi',cat:'Jasa',kec:'Gresik',roi:'22%',omzet:'Rp55Jt',rating:4.8,modal:'Rp100\u2013300Jt',desc:'Katering hajatan & korporasi. Pipeline order Q2 2025 sudah terisi 80%.',emoji:'\uD83C\uDF7D\uFE0F',ready:true},
  {name:'Anyaman Putri',cat:'Kerajinan',kec:'Surabaya',roi:'15%',omzet:'Rp28Jt',rating:4.7,modal:'Rp30\u2013100Jt',desc:'Tas anyam ramah lingkungan. Tren green product mendorong permintaan melonjak.',emoji:'\uD83D\uDC5C',ready:false},
  {name:'Tenun Lokal Jatim',cat:'Fashion',kec:'Surabaya',roi:'28%',omzet:'Rp62Jt',rating:4.9,modal:'Rp200\u2013800Jt',desc:'Kain tenun ATBM premium. Mitra potensial brand fashion nasional & internasional.',emoji:'\uD83C\uDFA8',ready:true},
];

App.DATA.chatData = {
  active:0,
  threads:[
    {name:'UMKM Bu Sari',role:'Kuliner \u00B7 Kranggan',emoji:'\uD83C\uDF61',msgs:[
      {from:'investor',text:'Halo Bu Sari, kami dari PT. Maju Bersama tertarik untuk bermitra dengan UMKM Anda.',time:'09:14'},
      {from:'umkm',text:'Terima kasih! Kami sangat senang mendapat perhatian investor. Bagaimana bisa saya bantu?',time:'09:22'},
      {from:'investor',text:'Kami ingin diskusi mengenai potensi ekspansi produk ke pasar luar kota. Apakah Bu Sari terbuka untuk meeting minggu ini?',time:'09:25'},
      {from:'umkm',text:'Tentu! Saya tersedia Rabu dan Kamis. Produk kami sudah punya pelanggan tetap di Surabaya dan Sidoarjo.',time:'09:30'},
    ]},
    {name:'Batik Kranggan',role:'Fashion \u00B7 Kranggan',emoji:'\uD83D\uDC57',msgs:[
      {from:'investor',text:'Selamat pagi, kami sangat kagum dengan kualitas batik tulis Anda. Ada rencana ekspansi ke mancanegara?',time:'10:05'},
      {from:'umkm',text:'Alhamdulillah, kami sudah ekspor ke Malaysia dan Singapura. Sedang menjajaki pasar Eropa.',time:'10:18'},
    ]},
    {name:'Catering Bu Dewi',role:'Jasa \u00B7 Prajuritkulon',emoji:'\uD83C\uDF7D\uFE0F',msgs:[
      {from:'umkm',text:'Halo Pak/Bu Investor, kami menerima tawaran kerjasama untuk katering korporasi skala besar.',time:'08:45'},
    ]},
  ]
};

App.DATA.CHAT_TEMPLATES = [
  'Halo, kami tertarik bermitra dengan UMKM Anda.',
  'Bisakah kita jadwalkan meeting minggu ini?',
  'Boleh saya minta proposal & laporan keuangan terbaru?',
  'Berapa kebutuhan modal untuk ekspansi?',
];

App.DATA.AUTO_REPLIES = [
  'Terima kasih atas pesannya! Kami akan segera merespons.',
  'Baik, kami catat. Bisa kami diskusikan lebih lanjut via meeting?',
  'Sangat menarik! Tim kami akan follow up dalam 1-2 hari kerja.',
  'Alhamdulillah, kami terbuka untuk kerjasama yang saling menguntungkan.',
];

App.DATA.QUICK_QUESTIONS = [
  'Apakah UMKM ini layak investasi?',
  'Apa risiko utama investasi ini?',
  'Berapa modal minimal yang disarankan?',
  'Bagaimana potensi jangka panjangnya?',
];
