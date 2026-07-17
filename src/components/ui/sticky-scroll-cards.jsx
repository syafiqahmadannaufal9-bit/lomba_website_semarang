"use client";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { ReactLenis } from 'lenis/react';
import { useEffect, useRef, useState } from "react";


const DEFAULT_CARDS = [
  {
    title: "Saloka Theme Park",
    username: "burhan.daily ",
    caption: "Liburan akhir tahun telah tiba, yuk explore wahana seru di Saloka Theme Park",
    hashtags: "#SalokaThemePark #SemarangHeritage #DolanSemarang",
    likes: "18.421",
    description: "\ntaman rekreasi tematik terbesar di Jawa Tengah yang berlokasi di Jl. Fatmawati No.154, Tuntang, Kabupaten Semarang. Berdiri di lahan seluas 12 hektare, tempat ini menawarkan lebih dari 25 wahana modern yang terbagi dalam 5 zona: Pesisir, Balalantar, Kamayayi, Segara Prada, dan Ararya\n\nSelain wahana permainan, restoran, cafe dan foodtruck, Saloka juga mempunyai pertunjukan spektakuler yaitu Baru Klinthing Show, Pertunjukan film yang menggabungkan teknologi laser, air mancur menari dan animasi 3D.\n\n Saloka Theme Park berlokasi di Jalan Fatmawati Nomor 154, Gumuk Sari, Lopait, Kecamatan Tuntang, Kabupaten Semarang, Jawa Tengah. Letaknya sangat strategis di persimpangan kota Semarang, Salatiga, Surakarta, dan Yogyakarta, tepat di kawasan wisata Rawa Pening.",
    src: "https://semarangkita.id/wp-content/uploads/2025/07/63c4bbaed1729.jpeg",
  },
  {
    title: "Lawang Sewu",
    username: "history.semarang ",
    caption: "Menelusuri sejarah megah gedung berpintu seribu",
    hashtags: "#LawangSewu #ExploreSemarang #PesonaIndonesia",
    likes: "22.589",
    description: "\nhampir selalu menjadi jawaban pertama saat orang menyebut ikon kota Semarang. Dibangun pada awal abad ke-20, bangunan megah bergaya arsitektur Belanda ini dulunya merupakan kantor perusahaan kereta api NIS (Nederlandsch-Indische Spoorweg Maatschappij).\n\nDikenal dengan arsitektur art deco berkarakter pintu dan jendela besar yang sangat banyak menyerupai seribu pintu. Destinasi ikonik ini menyajikan galeri sejarah perkeretaapian Indonesia serta keindahan arsitektur kolonial yang megah.\n\n Lokasinya yang strategis di pusat kota membuat ikon Kota Semarang ini mudah diakses. Jika kamu tertarik mendalami sisi sejarah Indonesia sambil menikmati keindahan arsitektur klasik, Lawang Sewu adalah destinasi wajib.",
    src: "https://ik.imagekit.io/tvlk/blog/2025/04/Lawang-Sewu.jpg?tr=q-70,c-at_max,w-1000,h-600",
  },
  {
    title: "Kelenteng Sam Poo Kong",
    username: "lukman_hdr ",
    caption: "Simbol keharmonisan dan akulturasi budaya yang lestari",
    hashtags: "#SamPooKong #AkulturasiBudaya #SemarangSmartCity",
    likes: "15.932",
    description: "\nKelenteng Sam Poo Kong adalah situs bersejarah bekas pendaratan dan tempat persinggahan pertama Laksamana Cheng Ho, laksamana Tiongkok beragama Islam.\n\nSitus ini menjadi tempat ibadah sekaligus tempat wisata ikonik dengan bangunan kelenteng megah berarsitektur Tionghoa bernuansa merah, melambangkan harmoni akulturasi budaya Tionghoa dan Jawa di Kota Semarang.\n\n Kelenteng Sam Poo Kong berlokasi di Jalan Simongan Raya nomor 129, Semarang. Tempat wisata ini buka untuk umum mulai pukul 09.00 (hari biasa) dan pukul 08.00 (akhir pekan)  serta tutup pukul 20.00 WIB.",
    src: "https://akcdn.detik.net.id/community/media/visual/2021/02/11/kelenteng-sam-poo-kong_43.jpeg?w=700&q=90",
  },
  {
    title: "Kota Lama Semarang ",
    username: "arif_rizal_nugroho ",
    caption: "Kemegahan bangunnan tempo dulu yang menawan",
    hashtags: "#MasjidAgungJateng #WisataReligi #SemarangHebat",
    likes: "14.280",
    description: "\nkawasan bersejarah yang membawa kita kembali ke masa kolonial, ketika Semarang menjadi pusat perdagangan penting di Nusantara. Dijuluki “Little Netherland,” area ini menampilkan deretan bangunan bergaya Eropa klasik dengan fasad megah, jendela-jendela besar, dan kanal yang menciptakan suasana khas kota tua di Belanda. Di sinilah benteng VOC dulu berdiri, dan kini berganti fungsi menjadi museum, galeri seni, hingga kafe kekinian tanpa kehilangan nuansa masa lalu.\n\n Daya tarik utama Kota Lama tak hanya terletak pada keindahan arsitekturnya, tetapi juga pada cerita di balik setiap bangunannya. Mulai dari gereja tua yang masih aktif, bekas gedung perkantoran kolonial, hingga gudang rempah yang pernah menjadi pusat kegiatan ekspor-impor. Setiap sudut kawasan ini menyimpan jejak peran penting Semarang dalam jalur perdagangan global pada abad ke-17 hingga ke-19.\n\n Kawasan Kota Lama Semarang berpusat di Jalan Letjen Suprapto, Kelurahan Tanjung Mas, Kecamatan Semarang Utara, Kota Semarang, Jawa Tengah.",
    src: "https://asset.kompas.com/crops/JZNK8UKlaRwuZOgD1TqMn7gBxPA=/0x0:1800x1200/1200x800/data/photo/2024/03/02/65e32e5b5743c.jpg",
  },
  {
    title: "Pantai Marina",
    username: "bima.ariyama ",
    caption: "Keindahan senja di pesisir Utara Semarang",
    hashtags: "#PantaiMarina #SemarangCreative #WarnaWarni",
    likes: "11.642",
    description: "\nPantai Marina Semarang terletak di pesisir utara Jawa Tengah, dekat dengan pelabuhan Tanjung Emas dan bandara Ahmad Yani. Dulunya merupakan kawasan rawa dan tambak, kini telah disulap menjadi destinasi wisata pesisir modern.\n\nKeunikan utama Pantai Marina adalah panorama sunset yang spektakuler, serta berbagai fasilitas rekreasi seperti waterboom,banana boat, perahu nelayan, area kuliner seafood, dan dermaga panjang yang menjorok ke laut.\n\n Pantai Marina Semarang terletak di Jalan Taman Marina, Tawangsari, Kota Semarang, Jawa Tengah, dengan lokasi yang strategis dan mudah dijangkau. Dari Simpang Lima Semarang, jaraknya sekitar 9 km atau dapat ditempuh dalam waktu sekitar 20 menit. Pantai ini juga hanya berjarak sekitar 3,8 km dari Bandara Ahmad Yani dan sekitar 15 km dari pusat kota Semarang.",
    src: "https://cdn0-production-images-kly.akamaized.net/QJbnYcOLeDdPGvjC-HPTfIK2WAI=/1280x720/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/2383625/original/034346700_1539590317-8.JPG",
  },
];

// Very subtle tilts — natural scatter without looking messy
const CARD_ROTATIONS = [-1.4, 1.0, -0.8, 1.6, -1.1];

// Instagram gradient for the logo/avatar
const IG_GRADIENT = "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)";

function StickyScrollCard({
  i,
  title,
  src,
  username,
  caption,
  hashtags,
  likes,
  progress,
  range,
  targetScale
}) {
  const scale = useTransform(progress, range, [1, targetScale]);
  const rotation = CARD_ROTATIONS[i % CARD_ROTATIONS.length];

  return (
    <div className="sticky top-0 flex h-screen items-center justify-center">
      <motion.div
        style={{
          scale,
          rotate: rotation,
          top: `calc(-5vh + ${i * 6 + 120}px)`,
          borderRadius: 8,
          border: "10px solid #ffffff",
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.1), 0 10px 40px rgba(0,0,0,0.1)",
        }}
        className="relative -top-1/4 origin-top bg-white w-[380px] lg:w-[440px] p-6 lg:p-7">
        
        {/* ── Instagram Header ── */}
        <div className="flex items-center pb-4">
        </div>

        {/* ── Image ── */}
        <div className="w-full overflow-hidden bg-neutral-100 rounded-sm shadow-inner">
          <img
            src={src}
            alt={title}
            className="block w-full aspect-square object-cover"
            draggable={false} />
        </div>
                <br></br>
        {/* ── Action Row ── */}
        <div className="flex items-center justify-between pt-4 pb-2">
          <div className="flex items-center gap-4">
            {/* Outline Heart */}
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-neutral-900 cursor-pointer hover:text-neutral-600 transition-colors">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            {/* Comment */}
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-900 cursor-pointer hover:text-neutral-600 transition-colors">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            {/* Share / Paper plane */}
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-900 cursor-pointer hover:text-neutral-600 transition-colors">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </div>
          <div className="flex items-center gap-4">
            {/* Three dots (post menu) */}
            <div className="flex gap-[4px] cursor-pointer py-1 mr-2">
              <span className="w-[4px] h-[4px] rounded-full bg-neutral-400"></span>
              <span className="w-[4px] h-[4px] rounded-full bg-neutral-400"></span>
              <span className="w-[4px] h-[4px] rounded-full bg-neutral-400"></span>
              <span className="w-[4px] h-[4px] rounded-full bg-neutral-400"></span>
            </div>
            {/* Bookmark */}
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-900 cursor-pointer hover:text-neutral-600 transition-colors">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
        </div>

        {/* ── Likes ── */}
        <div className="pb-1.5">
          <p className="text-[14px] font-semibold text-neutral-900">{likes || "0"} likes</p>
        </div>

        {/* ── Caption with hashtags ── */}
        <div>
          <p className="text-[14px] text-neutral-900 leading-[1.4]">
            <span className="font-semibold mr-2">{username || "your.name"}</span>
            {caption || title}
            {hashtags && (
              <>
                {" "}
                <span className="text-neutral-500">{hashtags}</span>
              </>
            )}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export function StickyScrollCards({
  cards = DEFAULT_CARDS,
  hint = "scroll to explore",
  className
}) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(
      cards.length - 1,
      Math.max(0, Math.floor(latest * cards.length))
    );
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  // Hide the native scrollbar while this component is mounted
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "__sticky-scroll-cards-no-bar";
    style.textContent =
      "html { scrollbar-width: none; -ms-overflow-style: none; } html::-webkit-scrollbar { display: none; }";
    document.head.appendChild(style);
    return () => {
      document.getElementById("__sticky-scroll-cards-no-bar")?.remove();
    };
  }, []);

  return (
    <ReactLenis root>
      <main
        ref={container}
        className={cn(
          "relative w-full pb-0 pt-0",
          className
        )}>
        
        {/* Split Layout Container */}
        <div className="flex flex-col md:flex-row w-full h-full max-w-7xl mx-auto">
          
          {/* Left Side: Cards */}
          <div className="w-full md:w-[45%] relative">
            {/* Hint label */}
            <div
              className="absolute left-1/2 top-[2%] flex -translate-x-1/2 flex-col items-center gap-3 z-20">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] opacity-30 text-neutral-800">
                {hint}
              </p>
              <span className="h-12 w-px bg-gradient-to-b from-neutral-400/30 to-transparent" />
            </div>

            {cards.map((card, i) => {
              const targetScale = Math.max(0.5, 1 - (cards.length - i - 1) * 0.1);
              return (
                <StickyScrollCard
                  key={`card_${i}`}
                  i={i}
                  {...card}
                  progress={scrollYProgress}
                  range={[i * (1 / cards.length), 1]}
                  targetScale={targetScale} />
              );
            })}
          </div>

          {/* Right Side: Text */}
          <div className="w-full md:w-[55%] sticky top-0 h-screen flex flex-col justify-center pl-8 md:pl-16 pr-4 md:pr-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <h3 className="text-3xl md:text-4xl font-extrabold text-[#e74c3c] mb-8 tracking-tight">
                  {cards[activeIndex]?.title}
                </h3>
                <p className="text-base md:text-lg text-neutral-600 leading-relaxed whitespace-pre-line">
                  {cards[activeIndex]?.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </main>
    </ReactLenis>
  );
}
