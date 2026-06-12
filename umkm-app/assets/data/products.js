/* Data produk marketplace + transaksi UMKM */
window.App = window.App || {}; App.DATA = App.DATA || {};

App.DATA.CATS = ["Semua","Kuliner","Fashion","Kerajinan","Jasa"];

App.DATA.PRODS = [
  {id:1,name:"Onde Onde Jawa Timur",price:15000,cat:"Kuliner",seller:"UMKM Bu Sari",emoji:"\uD83C\uDF61",desc:"Onde onde khas Jawa Timur dengan isian kacang hijau pilihan dan taburan wijen renyah. Dibuat fresh setiap pagi dari bahan alami tanpa pengawet.",kec:"Kranggan",wa:"6281234567890",views:320,sold:185,rating:4.8,reviews:42,weight:"200gr/bungkus",status:"approved"},
  {id:2,name:"Batik Jawa Timur Klasik",price:120000,cat:"Fashion",seller:"UMKM Batik Kranggan",emoji:"\uD83D\uDC57",desc:"Batik tulis dengan motif Surya Majapahit khas Jawa Timur. Dibuat pengrajin lokal berpengalaman 20+ tahun dengan teknik tradisional.",kec:"Kranggan",wa:"6281234567891",views:210,sold:97,rating:4.9,reviews:28,weight:"250gr",status:"approved"},
  {id:3,name:"Sambal Pecel Jawa Timur",price:25000,cat:"Kuliner",seller:"UMKM Dapur Mak Nem",emoji:"\uD83E\uDD63",desc:"Sambal pecel otentik dengan bumbu rempah rahasia turun-temurun. Kacang pilihan, tanpa MSG, tahan 2 minggu. Cocok untuk berbagai masakan.",kec:"Magersari",wa:"6281234567892",views:285,sold:163,rating:4.7,reviews:55,weight:"250gr",status:"approved"},
  {id:4,name:"Kerajinan Bambu Ukir",price:85000,cat:"Kerajinan",seller:"UMKM Bambu Karya",emoji:"\uD83E\uDEB5",desc:"Kerajinan bambu ukir motif batik Jawa Timur. Dikerjakan tangan, cocok sebagai hiasan dinding atau souvenir premium.",kec:"Prajuritkulon",wa:"6281234567893",views:150,sold:72,rating:4.6,reviews:19,weight:"500gr",status:"approved"},
  {id:5,name:"Kue Klepon Pandan",price:18000,cat:"Kuliner",seller:"UMKM Jajanan Ibu",emoji:"\uD83D\uDFE2",desc:"Klepon pandan asli isian gula merah Jawa Timur. Dibungkus daun pisang segar, aroma wangi alami. Order minimal 20 pcs.",kec:"Magersari",wa:"6281234567894",views:195,sold:110,rating:4.5,reviews:31,weight:"10pcs/bungkus",status:"approved"},
  {id:6,name:"Tas Anyam Pandan",price:65000,cat:"Kerajinan",seller:"UMKM Anyaman Putri",emoji:"\uD83D\uDC5C",desc:"Tas anyam daun pandan pilihan. Dikerjakan pengrajin wanita lokal. Kuat, ramah lingkungan, unik sebagai oleh-oleh.",kec:"Kranggan",wa:"6281234567895",views:175,sold:58,rating:4.7,reviews:16,weight:"300gr",status:"approved"},
  {id:7,name:"Jasa Katering Pernikahan",price:45000,cat:"Jasa",seller:"Catering Bu Dewi",emoji:"\uD83C\uDF7D\uFE0F",desc:"Katering pernikahan dan hajatan. Masakan Jawa otentik. Harga per porsi, min 50 porsi. Termasuk peralatan makan.",kec:"Prajuritkulon",wa:"6281234567896",views:130,sold:42,rating:4.8,reviews:12,weight:"per porsi",status:"approved"},
  {id:8,name:"Kain Tenun Jawa Timur",price:200000,cat:"Fashion",seller:"UMKM Tenun Lokal",emoji:"\uD83C\uDFA8",desc:"Kain tenun ATBM khas Jawa Timur motif Surya Majapahit. Pewarna alam, ramah lingkungan. Ukuran 2\u00D71 meter.",kec:"Kranggan",wa:"6281234567897",views:165,sold:45,rating:4.9,reviews:23,weight:"2\u00D71m",status:"approved"},
];

App.DATA.KEC = [
  ['semua','\uD83D\uDDFA\uFE0F Semua Wilayah'],['Kranggan','\uD83D\uDCCD Kota Mojokerto'],['Magersari','\uD83D\uDCCD Kab. Mojokerto'],
  ['Prajuritkulon','\uD83D\uDCCD Kota Surabaya'],['Malang','\uD83D\uDCCD Kota Malang'],['Gresik','\uD83D\uDCCD Kab. Gresik'],
  ['Sidoarjo','\uD83D\uDCCD Kab. Sidoarjo'],['Jember','\uD83D\uDCCD Kab. Jember'],['Banyuwangi','\uD83D\uDCCD Kab. Banyuwangi'],['Batu','\uD83D\uDCCD Kota Batu'],
];

App.DATA.txList = [
  {id:1,tgl:"2025-03-01",ket:"Penjualan Onde Onde (30 pcs)",jml:450000,jenis:"pemasukan"},
  {id:2,tgl:"2025-03-02",ket:"Beli bahan baku kacang hijau",jml:120000,jenis:"pengeluaran"},
  {id:3,tgl:"2025-03-03",ket:"Penjualan Onde Onde (25 pcs)",jml:375000,jenis:"pemasukan"},
  {id:4,tgl:"2025-03-04",ket:"Biaya kemasan & packaging",jml:50000,jenis:"pengeluaran"},
  {id:5,tgl:"2025-03-05",ket:"Penjualan Onde Onde (40 pcs)",jml:600000,jenis:"pemasukan"},
  {id:6,tgl:"2025-03-06",ket:"Biaya listrik dapur",jml:80000,jenis:"pengeluaran"},
];
