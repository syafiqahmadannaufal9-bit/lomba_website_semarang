import { useState, useMemo } from 'react';
import Stack from './Stack';
import './WisataMobileStack.css';

const DEFAULT_WISATA_CARDS = [
  {
    title: "Saloka Theme Park",
    username: "burhan.daily",
    caption: "Liburan akhir tahun telah tiba, yuk explore wahana seru di Saloka Theme Park",
    hashtags: "#SalokaThemePark #SemarangHeritage #DolanSemarang",
    likes: "18.421",
    description: "Taman rekreasi tematik terbesar di Jawa Tengah yang berlokasi di Jl. Fatmawati No.154, Tuntang, Kabupaten Semarang. Berdiri di lahan seluas 12 hektare, tempat ini menawarkan lebih dari 25 wahana modern yang terbagi dalam 5 zona: Pesisir, Balalantar, Kamayayi, Segara Prada, dan Ararya.\n\nSelain wahana permainan, restoran, cafe dan foodtruck, Saloka juga mempunyai pertunjukan spektakuler yaitu Baru Klinthing Show, Pertunjukan film yang menggabungkan teknologi laser, air mancur menari dan animasi 3D.\n\n Saloka Theme Park berlokasi di Jalan Fatmawati Nomor 154, Gumuk Sari, Lopait, Kecamatan Tuntang, Kabupaten Semarang, Jawa Tengah.",
    src: "https://semarangkita.id/wp-content/uploads/2025/07/63c4bbaed1729.jpeg",
  },
  {
    title: "Lawang Sewu",
    username: "history.semarang",
    caption: "Menelusuri sejarah megah gedung berpintu seribu",
    hashtags: "#LawangSewu #ExploreSemarang #PesonaIndonesia",
    likes: "22.589",
    description: "Hampir selalu menjadi jawaban pertama saat orang menyebut ikon kota Semarang. Dibangun pada awal abad ke-20, bangunan megah bergaya arsitektur Belanda ini dulunya merupakan kantor perusahaan kereta api NIS (Nederlandsch-Indische Spoorweg Maatschappij).\n\nDikenal dengan arsitektur art deco berkarakter pintu dan jendela besar yang sangat banyak menyerupai seribu pintu. Destinasi ikonik ini menyajikan galeri sejarah perkeretaapian Indonesia serta keindahan arsitektur kolonial yang megah.\n\n Lokasinya yang strategis di pusat kota membuat ikon Kota Semarang ini mudah diakses.",
    src: "https://ik.imagekit.io/tvlk/blog/2025/04/Lawang-Sewu.jpg?tr=q-70,c-at_max,w-1000,h-600",
  },
  {
    title: "Kelenteng Sam Poo Kong",
    username: "lukman_hdr",
    caption: "Simbol keharmonisan dan akulturasi budaya yang lestari",
    hashtags: "#SamPooKong #AkulturasiBudaya #SemarangSmartCity",
    likes: "15.932",
    description: "Kelenteng Sam Poo Kong adalah situs bersejarah bekas pendaratan dan tempat persinggahan pertama Laksamana Cheng Ho, laksamana Tiongkok beragama Islam.\n\nSitus ini menjadi tempat ibadah sekaligus tempat wisata ikonik dengan bangunan kelenteng megah berarsitektur Tionghoa bernuansa merah, melambangkan harmoni akulturasi budaya Tionghoa dan Jawa di Kota Semarang.\n\n Kelenteng Sam Poo Kong berlokasi di Jalan Simongan Raya nomor 129, Semarang.",
    src: "https://akcdn.detik.net.id/community/media/visual/2021/02/11/kelenteng-sam-poo-kong_43.jpeg?w=700&q=90",
  },
  {
    title: "Kota Lama Semarang",
    username: "arif_rizal_nugroho",
    caption: "Kemegahan bangunnan tempo dulu yang menawan",
    hashtags: "#KotaLama #WisataSejarah #SemarangHebat",
    likes: "14.280",
    description: "Kawasan bersejarah yang membawa kita kembali ke masa kolonial, ketika Semarang menjadi pusat perdagangan penting di Nusantara. Dijuluki \"Little Netherland,\" area ini menampilkan deretan bangunan bergaya Eropa klasik dengan fasad megah, jendela-jendela besar, dan kanal yang menciptakan suasana khas kota tua di Belanda.\n\n Daya tarik utama Kota Lama tak hanya terletak pada keindahan arsitekturnya, tetapi juga pada cerita di balik setiap bangunannya.\n\n Kawasan Kota Lama Semarang berpusat di Jalan Letjen Suprapto, Kelurahan Tanjung Mas, Kecamatan Semarang Utara.",
    src: "https://asset.kompas.com/crops/JZNK8UKlaRwuZOgD1TqMn7gBxPA=/0x0:1800x1200/1200x800/data/photo/2024/03/02/65e32e5b5743c.jpg",
  },
  {
    title: "Pantai Marina",
    username: "bima.ariyama",
    caption: "Keindahan senja di pesisir Utara Semarang yang bersih dari sampah dan pencemaran.",
    hashtags: "#PantaiMarina #SemarangCreative #WarnaWarni",
    likes: "11.642",
    description: "Pantai Marina Semarang terletak di pesisir utara Jawa Tengah, dekat dengan pelabuhan Tanjung Emas dan bandara Ahmad Yani. Dulunya merupakan kawasan rawa dan tambak, kini telah disulap menjadi destinasi wisata pesisir modern.\n\nKeunikan utama Pantai Marina adalah panorama sunset yang spektakuler, serta berbagai fasilitas rekreasi seperti waterboom, banana boat, perahu nelayan, area kuliner seafood, dan dermaga panjang yang menjorok ke laut.\n\n Pantai Marina Semarang terletak di Jalan Taman Marina, Tawangsari, Kota Semarang.",
    src: "https://cdn0-production-images-kly.akamaized.net/QJbnYcOLeDdPGvjC-HPTfIK2WAI=/1280x720/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/2383625/original/034346700_1539590317-8.JPG",
  },
];

export function WisataMobileStack({ cards = DEFAULT_WISATA_CARDS, className }) {
  // Set activeIndex awal ke card teratas (index terakhir)
  const [activeIndex, setActiveIndex] = useState(cards.length - 1);

  const stackCards = useMemo(() => cards.map((card, index) => (
    <div key={index} className="wisata-stack-card">
      <div className="wisata-stack-image-wrapper">
        <img 
          src={card.src} 
          alt={card.title}
          className="wisata-stack-image"
        />
      </div>
      {/* Teks dipindahkan ke area kosong di bawah gambar */}
      <div className="wisata-stack-info-area">
        <h3 className="wisata-stack-title">{card.title}</h3>
        <p className="wisata-stack-caption">{card.caption}</p>
        <div className="wisata-stack-meta">
          <span className="wisata-stack-username">@{card.username}</span>
          <span className="wisata-stack-likes">❤️ {card.likes}</span>
        </div>
      </div>
    </div>
  )), [cards]);

  const handleStackChange = (newActiveIndex) => {
    console.log('Stack changed to index:', newActiveIndex); // Debug log
    setActiveIndex(newActiveIndex);
  };

  return (
    <div className={`wisata-mobile-stack ${className || ''}`}>
      <div className="wisata-stack-container">
        <Stack
          cards={stackCards}
          randomRotation={true}
          autoplay={false}
          autoplayDelay={4000}
          pauseOnHover={true}
          animationConfig={{ stiffness: 300, damping: 25 }}
          onActiveCardChange={handleStackChange}
        />
      </div>
      
      {/* Deskripsi yang berubah sesuai card aktif */}
      <div className="wisata-stack-description">
        <div className="wisata-description-content">
          <h3 className="wisata-description-title">{cards[activeIndex]?.title}</h3>
          <p className="wisata-description-text">{cards[activeIndex]?.description}</p>
          <div className="wisata-description-hashtags">{cards[activeIndex]?.hashtags}</div>
        </div>
      </div>

      <div className="wisata-stack-hint">
        <p className="hint-text">Tap atau drag kartu untuk melihat destinasi lain</p>
        <div className="hint-dots">
          {cards.map((_, index) => (
            <div 
              key={index} 
              className={`hint-dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => {
                console.log('Dot clicked, setting active index to:', index); // Debug log
                setActiveIndex(index);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}