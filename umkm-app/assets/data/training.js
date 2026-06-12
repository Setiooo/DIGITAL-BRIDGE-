/* Data pelatihan UMKM + kelayakan investasi */
window.App = window.App || {}; App.DATA = App.DATA || {};

App.DATA.TRAINING = [
  {id:1,title:'Interpretation and Implementation of HACCP',org:'Kadin Institute',cat:'Sertifikasi Pangan',catKey:'Sertifikasi Pangan',mode:'Online Zoom',date:'12 Mei 2025',time:'09.00\u201316.00 WIB',status:'open',statusLabel:'Pendaftaran Dibuka',benefits:['Sertifikat Pelatihan','E-book Materi','Akses Rekaman'],month:true,emoji:'\uD83C\uDF7D\uFE0F',desc:'Memahami prinsip dan implementasi sistem HACCP untuk keamanan pangan produk UMKM.'},
  {id:2,title:'Digital Marketing & Media Sosial untuk UMKM',org:'Dinkop UKM Jatim',cat:'Digital Marketing',catKey:'Digital Marketing',mode:'Online Zoom',date:'18 Mei 2025',time:'13.00\u201317.00 WIB',status:'open',statusLabel:'Pendaftaran Dibuka',benefits:['Sertifikat','Modul PDF','Template Konten'],month:true,emoji:'\uD83D\uDCF1',desc:'Strategi pemasaran digital, pengelolaan media sosial, dan iklan berbayar untuk UMKM.'},
  {id:3,title:'Branding & Desain Kemasan Produk UMKM',org:'Bapperida Jatim',cat:'Branding UMKM',catKey:'Branding',mode:'Hybrid (Offline + Zoom)',date:'22 Mei 2025',time:'08.00\u201315.00 WIB',status:'open',statusLabel:'Pendaftaran Dibuka',benefits:['Sertifikat','Template Desain','Konsultasi Branding'],month:true,emoji:'\uD83C\uDFF7\uFE0F',desc:'Membangun identitas merek, desain label, dan kemasan yang menarik dan kompetitif.'},
  {id:4,title:'Legalitas Usaha: NIB, PIRT, & Halal MUI',org:'Diskopukmperindag Jatim',cat:'Legalitas Usaha',catKey:'Legalitas',mode:'Online Zoom',date:'28 Mei 2025',time:'09.00\u201312.00 WIB',status:'open',statusLabel:'Pendaftaran Dibuka',benefits:['Sertifikat','Panduan Pengajuan','Konsultasi Legal'],month:false,emoji:'\u2696\uFE0F',desc:'Panduan lengkap mengurus izin usaha: NIB, PIRT, sertifikasi halal, dan dokumen legalitas lainnya.'},
  {id:5,title:'Pembukuan Keuangan & Akses Modal KUR',org:'Bank Jatim & Dinkop UKM',cat:'Keuangan UMKM',catKey:'Keuangan',mode:'Online Zoom',date:'5 Juni 2025',time:'13.00\u201316.00 WIB',status:'soon',statusLabel:'Segera Dibuka',benefits:['Sertifikat','Template Excel','Akses Konsultan'],month:false,emoji:'\uD83D\uDCB0',desc:'Belajar pembukuan sederhana, laporan keuangan, dan cara mengajukan KUR untuk modal usaha.'},
  {id:6,title:'Sertifikasi SNI & BPOM untuk Produk UMKM',org:'Kadin Institute & BPOM Jatim',cat:'Sertifikasi Pangan',catKey:'Sertifikasi Pangan',mode:'Offline \u2013 Surabaya',date:'10 Juni 2025',time:'08.00\u201317.00 WIB',status:'soon',statusLabel:'Segera Dibuka',benefits:['Sertifikat','Panduan SNI','Simulasi BPOM'],month:false,emoji:'\uD83D\uDCCB',desc:'Persyaratan, prosedur, dan langkah-langkah pengajuan sertifikasi SNI dan BPOM untuk produk UMKM.'},
];
App.DATA.TRAINING_CATS = [['semua','Semua'],['Sertifikasi Pangan','Sertifikasi Pangan'],['Digital Marketing','Digital Marketing'],['Branding','Branding'],['Legalitas','Legalitas'],['Keuangan','Keuangan']];

App.DATA.INDICATOR_LABELS = {
  profil:'Kelengkapan Profil Usaha',legalitas:'Legalitas Usaha',pembukuan:'Konsistensi Pembukuan',
  penjualan:'Aktivitas Penjualan',pelatihan:'Keikutsertaan Pelatihan',komunikasi:'Respons Komunikasi',produksi:'Kesiapan Produksi'
};

App.DATA.READINESS = [
  {name:'UMKM Bu Sari',emoji:'\uD83C\uDF61',cat:'Kuliner',kec:'Kranggan',indicators:{profil:90,legalitas:85,pembukuan:80,penjualan:95,pelatihan:100,komunikasi:90,produksi:85},trainings:[{name:'HACCP Implementation',org:'Kadin Institute',date:'Mar 2025'},{name:'Digital Marketing',org:'Dinkop UKM',date:'Feb 2025'},{name:'Branding & Kemasan',org:'Bapperida Jatim',date:'Jan 2025'}]},
  {name:'Batik Kranggan',emoji:'\uD83D\uDC57',cat:'Fashion',kec:'Kranggan',indicators:{profil:95,legalitas:90,pembukuan:85,penjualan:90,pelatihan:80,komunikasi:85,produksi:95},trainings:[{name:'Branding & Desain Kemasan',org:'Bapperida Jatim',date:'Feb 2025'},{name:'Legalitas Usaha & NIB',org:'Diskopukmperindag',date:'Des 2024'}]},
  {name:'Bambu Karya',emoji:'\uD83E\uDEB5',cat:'Kerajinan',kec:'Prajuritkulon',indicators:{profil:75,legalitas:70,pembukuan:60,penjualan:75,pelatihan:60,komunikasi:70,produksi:85},trainings:[{name:'Digital Marketing untuk UMKM',org:'Dinkop UKM',date:'Jan 2025'}]},
  {name:'Catering Bu Dewi',emoji:'\uD83C\uDF7D\uFE0F',cat:'Jasa',kec:'Prajuritkulon',indicators:{profil:88,legalitas:80,pembukuan:78,penjualan:90,pelatihan:90,komunikasi:92,produksi:80},trainings:[{name:'HACCP Implementation',org:'Kadin Institute',date:'Mar 2025'},{name:'Keuangan UMKM & KUR',org:'Bank Jatim',date:'Nov 2024'}]},
  {name:'Anyaman Putri',emoji:'\uD83D\uDC5C',cat:'Kerajinan',kec:'Kranggan',indicators:{profil:65,legalitas:55,pembukuan:50,penjualan:60,pelatihan:40,komunikasi:60,produksi:70},trainings:[]},
  {name:'Tenun Lokal Jatim',emoji:'\uD83C\uDFA8',cat:'Fashion',kec:'Kranggan',indicators:{profil:92,legalitas:88,pembukuan:82,penjualan:88,pelatihan:85,komunikasi:80,produksi:90},trainings:[{name:'Sertifikasi SNI & BPOM',org:'Kadin Institute',date:'Feb 2025'},{name:'Digital Marketing',org:'Dinkop UKM',date:'Jan 2025'}]},
];
