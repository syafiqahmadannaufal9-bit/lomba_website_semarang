"use client";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import ReactLenis from "lenis/react";
import { useEffect, useRef, useState } from "react";
import { SinergiUniversitas } from "@/components/SinergiUniversitas";

const DEFAULT_CARDS = [
  {
    title: "Integrated Smart System Platform (I-SSP) untuk Smart City Kota Semarang",
    username: "semarang.id ",
    caption: "Integrated Smart System Platform (I-SSP) untuk Smart City Kota Semarang",
    hashtags: "#smartcitysmg #semaranghebat",
    likes: "12.847",
    description: "\n Kota Semarang saat ini telah memiliki command room smart city yang diberi nama Situation Room Pemerintah Kota Semarang. Kota Semarang saat ini sudah memiliki sistem pelaporan masyarakat berbasis aplikasi sehingga masyarakat dapat turut aktif berpartisipasi mengawasi kinerja pemerintah. Kota Semarang sudah memiliki pusat data Kota Semarang serta sudah menerapkan berbagai macam aplikasi dalam upaya pengelolaan kota.\n\n1. Sistem Integrated Smart System Platform (I-SSP) Kota Semarang yang dilengkapi dengan fitur city analytics Kota Semarang yang terpasang di Situation Room Kota Semarang.\n2. Pengembangan Integrasi layanan-layanan Smart City Kota Semarang (Single Sign On).\n3. Implementasi sistem integrasi data dalam bentuk micro service API, database connector, dan data integrator.",
    src: "https://www.devjelita.semarangkota.go.id/uploads/galeri/20230329093555-2023-03-29galeri093535.jpg",
  },
  {
    title: "AI pengelolaan sampah AISSA",
    username: "lia.diary ",
    caption: "Kota tercintaku jadi juara inovasi dunia",
    hashtags: "#KotaTerbaik #InovasiMasaDepan",
    likes: "8.392",
    description: "\n Kota Semarang kembali mengukir prestasi di tingkat internasional. Inovasi Artificial Intelligence Solusi Sampah (AISSA) berhasil masuk dalam 30 Exemplary Initiatives pada ajang bergengsi 7th Guangzhou International Award for Urban Innovation 2026, mengukuhkan Semarang sebagai salah satu kota paling inovatif di dunia. \n Penghargaan tersebut diumumkan dalam rangkaian 2026 United Cities and Local Governments (UCLG) World Congress di Tangier, Maroko, pada 25 Juni 2026. Capaian ini menjadi pengakuan internasional atas keberhasilan Pemerintah Kota Semarang menghadirkan solusi berbasis teknologi untuk menjawab persoalan perkotaan.\n\n Aissa bekerja dengan memanfaatkan kamera pengawas (CCTV) yang dipasang di 23 titik TPS (Tempat Pembuangan Sementara) di seluruh Kota Semarang. Sistem ini memiliki kemampuan deteksi otomatis selama 24 jam penuh untuk memantau berbagai kondisi di sekitar tempat sampah. Dengan teknologi AI-nya, Aissa dapat mengidentifikasi tumpukan sampah yang berserakan, mendeteksi kontainer yang sudah overload, dan memastikan tidak ada sampah yang tercecer di luar area yang ditentukan.",
    src: "https://www.rmoljawatengah.id/uploads/images/2026/07/image_750x_6a4d08584ce98.jpg",
  },
  {
    title: "Semarang Mantapkan Langkah Menuju Transportasi Hijau, Bus Listrik Hyundai Jalani Uji Operasional",
    username: "semarang.id ",
    caption: "Transformasi sistem transportasi publik berbasis energi bersih",
    hashtags: "#TransportasiHijau #SemarangHebat",
    likes: "23.105",
    description: "\n Kota Semarang semakin serius mempersiapkan transformasi sistem transportasi publik berbasis energi bersih. Upaya tersebut ditandai dengan dimulainya uji operasional bus listrik Hyundai yang menjadi bagian dari pengembangan ekosistem angkutan umum ramah lingkungan di ibu kota Provinsi Jawa Tengah.\n\n Peluncuran uji coba bus listrik dilakukan usai pelaksanaan Focus Group Discussion (FGD) bertajuk “Membangun Ekosistem Transportasi Publik Ramah Lingkungan: Integrasi Aspek Keselamatan, Infrastruktur Pengisian Daya, dan Pembiayaan Angkutan Umum Berbasis Listrik di Kota Semarang” yang digelar di Hotel Metro Park View Semarang.",
    src: "https://www.jatengnews.id/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-29-at-20.02.55.jpeg",
  },
  {
    title: "ANJASWARA (Anjungan Kesehatan Mandiri Warga Kota Semarang)",
    username: "ahmad aimar ",
    caption: "Anjungan Kesehatan Mandiri Warga Kota Semarang",
    hashtags: "#ANJASWARA #KesehatanDigital #SemarangHebat",
    likes: "15.620",
    description: "\n merupakan alat skrining kesehatan berbasis IOT yang terdiri dari tiga komponen yaitu, tinggi badan, berat badan dan pemeriksaan gula, dan selanjutnya akan dikembangkan oleh berbagai skrining Kesehatan. Deteksi Penyakit sedini mungkin adalah salah satu tujuan dilakukannya skrining Kesehatan. \n\n Sistem Anjungan ini menggunakan :\n 1. Aplikasi antarmuka pengguna untuk desktop yang memungkinkan interaksi dengan perangkat keras dan memproses data pengguna\n 2. Sistem analisis berbasis kecerdasan buatan untuk pengolahan data glukosa yang mampu memberikan hasil analisis yang akurat dan cepat secara non Invasif atau tanpa proses pengambilan darah.\n 3. Pengembangan back end server dan aplikasi web untuk mengelola data, menyediakan layanan API, dan antarmuka web yang memungkinkan akses jarak jauh ke sistem.",
    src: "/assets/anjaswara.png",
  },
  {
    title: "KATULISTIWA (Katalis Otomasi dan Integrasi Sistem Teknologi Informasi Untuk Pengumpulan Data Cuaca Berbasis IoT di wilayah Kota Semarang).",
    username: "maulana.peak ",
    caption: "KATULISTIWA (Katalis Otomasi Untuk Pengumpulan Data Cuaca Berbasis IoT di wilayah Kota Semarang).",
    hashtags: "#katulistiwa",
    likes: "10.831",
    description: "\nInovasi ini berfokus pada manajemen data dan analisis data cuaca dengan menggunakan teknologi Internet of Things (IoT). Dirancang dengan berbagai komponen untuk mengumpulkan data cuaca. Sensor yang terpasang meliputi sensor suhu udara dengan rentang pengukuran dari -40°C hingga 125°C dan kelembapan udara dari 0% hingga 100%. Peran inovasi ini sebagai pemercepat dalam penerapan teknologi informasi dan otomasi di bidang meteorology. Penggunaan teknologi untuk mengotomatiskan proses manajemen data cuaca, mengurangi intervensi manusia, dan meningkatkan efisiensi. Penggabungan berbagai sistem teknologi informasi untuk memastikan data yang terkumpul dapat dianalisis dan digunakan secara efektif. Pemanfaatan perangkat IoT yang terhubung untuk mengumpulkan data secara real-time dari berbagai lokasi di wilayah kota Semarang.",
    src: "https://www.niubol.com/static/upload/image/20231218/1702904385211216.png",
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
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] opacity-30 text-white">
                {hint}
              </p>
              <span className="h-12 w-px bg-gradient-to-b from-white/30 to-transparent" />
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
                <h3 className="text-3xl md:text-4xl font-extrabold text-[#c5c3c3] mb-8 tracking-tight">
                  {cards[activeIndex]?.title}
                </h3>
                <p className="text-base md:text-lg text-neutral-300 leading-relaxed whitespace-pre-line">
                  {cards[activeIndex]?.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
        <SinergiUniversitas />

      </main>
    </ReactLenis>
  );
}
