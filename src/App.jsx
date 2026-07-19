import { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PillNav from './components/PillNav'
import StaggeredMenu from './components/StaggeredMenu'
import GridMotion from './components/GridMotion'
import { StickyScrollCards } from '@/components/ui/sticky-scroll-cards'
import { WisataMobileStack } from '@/components/ui/WisataMobileStack'
import { SinergiUniversitas } from '@/components/SinergiUniversitas'
import { motion } from 'framer-motion'
import InteractiveHoneycomb from './components/ui/InteractiveHoneycomb'
import BorderGlow from './components/ui/BorderGlow'
import SplitText from '@/components/ui/SplitText'
import './App.css'

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Sejarah", href: "#sejarah" },
  { label: "Budaya", href: "#budaya" },
  { label: "Wisata", href: "#wisata" },
  { label: "Kuliner", href: "#kuliner" },
  { label: "Teknologi", href: "#teknologi" },
  { label: "Peta", href: "#peta" },
];

// Use the Semarang Semakin Hebat logo
const semarangLogo = '/assets/semarang-semakin-hebat-seeklogo.png';

// SplitText helper removed, using React Bits component imported above

const sejarahData = [
  {
    year: "Abad 8",
    title: "Awal Mula: Pelabuhan Pragota",
    desc: "Pada awalnya, daerah pesisir Semarang merupakan pelabuhan bernama Pragota, menjadi bagian dari Kerajaan Mataram Kuno. Daerah ini dulunya merupakan gugusan pulau kecil akibat endapan lumpur.",
  },
  {
    year: "1435",
    title: "Kedatangan Laksamana Cheng Ho",
    desc: "Pada tahun 1435 M, armada Laksamana Cheng Ho bersandar di Pelabuhan Simongan. Sebagai bentuk penghormatan dan kenang-kenangan, didirikanlah sebuah kelenteng dan masjid yang kini dikenal sebagai Sam Po Kong (Gedung Batu), simbol harmoni budaya yang masih tegak hingga hari ini.",
  },
  {
    year: "1705",
    title: "Masuknya VOC & Kolonial Belanda",
    desc: "Semarang diserahkan kepada VOC. Belanda membangun kawasan Kota Lama (Outstadt) dengan benteng dan arsitektur Eropa klasik yang menjadi pusat perdagangan komersial.",
    image: null,
  },
  {
    year: "1942",
    title: "Masa Pendudukan Jepang",
    desc: "Militer Jepang mengambil alih kekuasaan dari Belanda. Masa ini membawa perubahan drastis dalam tatanan sosial, ekonomi, dan pemerintahan di Semarang.",
    image: null,
  },
  {
    year: "1945",
    title: "Masa Perjuangan & Kemerdekaan",
    desc: "Pecah Pertempuran Lima Hari di Semarang antara pemuda pejuang melawan tentara Jepang. Monumen Tugu Muda dibangun untuk mengenang keberanian para pahlawan.",
  }
];

// Data lokasi Wisata untuk Peta Interaktif Semarang
const lokasiWisata = [
  {
    id: 'w1',
    type: 'wisata',
    name: 'Lawang Sewu',
    kategori: 'Wisata',
    lat: -6.9834,
    lng: 110.4102,
    desc: 'Gedung bersejarah peninggalan Belanda dengan seribu pintu dan jendela, dulunya kantor perusahaan kereta api NIS.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Lawang%20Sewu%20Semarang%20Indonesia%201.jpg'
  },
  {
    id: 'w2',
    type: 'wisata',
    name: 'Kota Lama Semarang',
    kategori: 'Wisata',
    lat: -6.9691,
    lng: 110.4283,
    desc: 'Kawasan "Little Netherland" berisi bangunan-bangunan bergaya Eropa klasik, ikonnya Gereja Blenduk.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Gereja%20Blenduk%20Kota%20Lama%20Semarang.jpg'
  },
  {
    id: 'w3',
    type: 'wisata',
    name: 'Tugu Muda',
    kategori: 'Wisata',
    lat: -6.9838,
    lng: 110.4106,
    desc: 'Monumen untuk mengenang Pertempuran Lima Hari, perjuangan rakyat Semarang melawan tentara Jepang.',
    image: 'https://asset.kompas.com/crops/d-vo69tFajbCplKB0Xn_hc9fwRE=/0x0:800x533/1200x800/data/photo/2018/10/11/1781745539.jpg'
  },
  {
    id: 'w4',
    type: 'wisata',
    name: 'Simpang Lima',
    kategori: 'Wisata',
    lat: -6.9899,
    lng: 110.4229,
    desc: 'Alun-alun pusat kota dengan lima ruas jalan bertemu, pusat kuliner dan kegiatan warga Semarang.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Simpang%20Lima%2CSemarang.jpg'
  },
  {
    id: 'w5',
    type: 'wisata',
    name: 'Pantai Marina',
    kategori: 'Wisata',
    lat: -6.9459,
    lng: 110.3958,
    desc: 'Kawasan pantai di utara kota, tempat favorit warga menikmati sunset dan kuliner laut.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Sunset%20di%20Pantai%20Tirang%20Semarang.jpg'
  },
  {
    id: 'w6',
    type: 'wisata',
    name: 'Museum Ronggowarsito',
    kategori: 'Wisata',
    lat: -6.9853,
    lng: 110.3898,
    desc: 'Museum negeri yang menyimpan koleksi sejarah, budaya, dan seni khas Jawa Tengah.',
    image: '/assets/museum-ronggo.jpg'
  },
  {
    id: 'w7',
    type: 'wisata',
    name: 'Klenteng Sam Poo Kong',
    kategori: 'Wisata',
    lat: -6.9961,
    lng: 110.3986,
    desc: 'Klenteng tertua di Semarang, petilasan pendaratan Laksamana Cheng Ho yang jadi simbol akulturasi budaya Tionghoa dan Jawa.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Gedung%20Batu%20Temple%20Semarang.jpg'
  },
  {
    id: 'w8',
    type: 'wisata',
    name: 'Masjid Agung Jawa Tengah',
    kategori: 'Wisata',
    lat: -6.9847,
    lng: 110.4482,
    desc: 'Masjid provinsi yang megah dengan perpaduan arsitektur Jawa, Timur Tengah, dan Yunani, serta menara pandang setinggi 99 meter.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Masjid%20Agung%20Jawa%20Tengah%20Indonesia.jpg'
  },
  {
    id: 'w9',
    type: 'wisata',
    name: 'Vihara Buddhagaya Watugong',
    kategori: 'Wisata',
    lat: -7.0861,
    lng: 110.4089,
    desc: 'Kompleks Buddhis dengan Pagoda Avalokitesvara setinggi 45 meter, salah satu pagoda tertinggi di Indonesia.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pagoda%20Avalokitesvara%20-%20Buddhagaya%20Watugong.jpg'
  },
  {
    id: 'w10',
    type: 'wisata',
    name: 'Klenteng Tay Kak Sie',
    kategori: 'Wisata',
    lat: -6.9742,
    lng: 110.4279,
    desc: 'Klenteng terbesar di kawasan Pecinan Semarang sejak 1746, tempat pemujaan Dewi Kwan Im yang kaya nilai sejarah.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Tay%20Kak%20Sie%20Kelenteng%20Gang%20Lombok%20Semarang.jpg'
  },
  {
    id: 'w11',
    type: 'wisata',
    name: 'Gereja Blenduk',
    kategori: 'Wisata',
    lat: -6.9681,
    lng: 110.4275,
    desc: 'Gereja tertua di Jawa Tengah, dibangun tahun 1753 dengan kubah tembaga ikonik, jantung kawasan Kota Lama Semarang.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Gereja%20Blenduk%20Semarang.jpg'
  },
];


const lokasiPeta = [...lokasiWisata];

const kulinerTop = [
  {
    name: "Lumpia Semarang",
    image: "https://asset.kompas.com/crops/UxROXDbwKoZ9Vr57w4sc0qHVfnM=/59x38:939x625/1200x800/data/photo/2022/05/05/62733af9841d8.jpg",
    desc: "Perpaduan budaya Tionghoa dan Jawa berisi rebung manis, telur, dan udang/ayam dibungkus kulit renyah."
  },
  {
    name: "Bandeng Presto",
    image: "/assets/bandeng-juwana-semarang-google-image.jpg",
    desc: "Olahan ikan bandeng segar berbumbu rempah dimasak dengan uap tinggi hingga seluruh durinya sangat lunak."
  },
  {
    name: "Wingko Babat",
    image: "/assets/wingko_babat.jpg",
    desc: "Kue tradisional berbahan ketan dan kelapa parut dengan cita rasa manis gurih dipanggang kecokelatan."
  },
  {
    name: "Mie Kopyok",
    image: "/assets/Mie Kopyok Semarang.jpg",
    desc: "Mie khas Semarang disajikan dengan tahu pong, lontong, tauge, kerupuk gendar, seledri dan kuah kaldu segar."
  }
];

const kulinerBottom = [
  {
    name: "Soto Semarang",
    image: "/assets/Soto Semarang.jpg",
    desc: "Soto ayam berkuah bening segar dengan bumbu kemiri khas, disajikan bersama suwiran ayam dan sate kerang."
  },
  {
    name: "Kue Mochi",
    image: "/assets/kue-mochi-semarang-google-image.jpg",
    desc: "Kue kenyal tradisional dari tepung ketan berisi kacang tanah manis gurih berbalut wijen harum."
  },
  {
    name: "Nasi Ayam",
    image: "/assets/nasi-ayam-semarang.jpg",
    desc: "Nasi gurih hangat dengan siraman opor ayam suwir, telur pindang, tahu manis, dan siraman kuah santan sedap."
  },
  {
    name: "Tahu Gimbal",
    image: "/assets/tahu-gimbal.jpg",
    desc: "Sajian irisan ketupat, tahu goreng, tauge, kubis, dan gimbal udang garing dengan siraman saus bumbu petis manis."
  }
];

function App() {
  // Hero Carousel state - tiap slide mewakili satu kategori dan mengarah ke section-nya
  const [heroSlides] = useState([
    {
      id: 'budaya',
      tag: 'Budaya',
      desc: 'Keberagaman tradisi dan akulturasi budaya yang masih lestari hingga kini adalah bukti identitas Kota Semarang.',
      image: '/assets/Tugumuda.png',
      mobileImage: 'https://asset.kompas.com/crops/Z1V9fEQb0jJbKl_pPoqqhhIUxm8=/319x0:1649x887/1200x800/data/photo/2021/11/09/618a892ad140e.jpeg',
      target: '#budaya',
      headingLine1: 'WELCOME TO',
      headingLine2: 'SEMARANG',
      headingLine3: 'SMART CITY',
      headingRedLine: 'SEMARANG',
      subDesc: ['kota bersejarah dengan ', 'keaneka', ' - ragaman', 'budaya', ' dan ', 'tradisi', ' yang masih lestari'],
     
    },
    {
      id: 'wisata',
      tag: 'Wisata',
      desc: 'Destinasi bersejarah dan alam yang masih lestari selalu menjadi favorit keluarga dan menjadi kebanggaan Kota Semarang.',
      image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Lawang%20Sewu%20Semarang%20Indonesia%201.jpg',
      mobileImage: 'https://kecsmgutara.semarangkota.go.id/medias/article/big/2689/73b2410c-970d-4550-90ab-5212f9fa6e96.jpg',
      target: '#wisata',
      headingLine1: 'JELAJAHI',
      headingLine2: 'WISATA',
      headingLine3: 'IKONIK',
      headingRedLine: 'WISATA',
      subDesc: ['temukan keajaiban ', 'lawang sewu', ' dan pesona klasik', 'kota lama', ' yang merekam ', 'jejak sejarah', ' abadi'],
      longDesc: 'Jadikan setiap momen perjalanan Anda bermakna dengan mengunjungi berbagai destinasi memukau. Rasakan sensasi perpaduan antara pesona alam yang asri dan megahnya peninggalan sejarah yang terus dijaga kelestariannya.',
    },
    {
      id: 'kuliner',
      tag: 'Kuliner',
      desc: 'Ragam kuliner khas memiliki cita rasa yang khas, menjadi identitas rasa Kota Semarang turun temurun.',
      image: 'https://asset.kompas.com/crops/UxROXDbwKoZ9Vr57w4sc0qHVfnM=/59x38:939x625/1200x800/data/photo/2022/05/05/62733af9841d8.jpg',
      mobileImage: 'https://i.pinimg.com/1200x/cf/4d/81/cf4d8152ed7184adbd029d3f1dc6f13c.jpg',
      target: '#kuliner',
      headingLine1: 'NIKMATI',
      headingLine2: 'KULINER',
      headingLine3: 'LEGENDARIS',
      headingRedLine: 'KULINER',
      subDesc: ['manjakan lidah dengan ', 'lumpia', ' autentik hingga', 'tahu gimbal', ' yang kaya akan ', 'rempah', ' dan tradisi'],
      longDesc: 'Nikmati setiap gigitan yang menggugah selera dari berbagai hidangan warisan turun-temurun. Semarang bukan hanya kota sejarah, tetapi juga surga bagi para pencinta kuliner yang mencari keaslian rasa Nusantara.',
    },
    {
      id: 'teknologi',
      tag: 'Teknologi',

      desc: 'Transformasi digital dan sinergi dengan universitas menjadi ujung tombak pelayanan yang lebih baik bagi masyarakat.',
      image: 'https://miniox.brin.go.id/website//uploads/images/posts//2024/10/1730116075-82504411.webp',
      mobileImage: 'https://koranbernas.id/uploads/images/202512/image_870x_69384e238b8e0.jpg',
      target: '#teknologi',
      headingLine1: 'MENUJU',
      headingLine2: 'KOTA',
      headingLine3: 'MASA DEPAN',
      headingRedLine: 'KOTA',
      subDesc: ['mengintegrasikan ', 'teknologi cerdas', ' dan tata ruang', 'digital', ' untuk menciptakan ', 'kehidupan', ' yang lebih baik'],
      longDesc: 'Menyongsong masa depan dengan infrastruktur digital yang inklusif dan berkelanjutan. Semarang terus berinovasi memberikan kemudahan dan kenyamanan melalui implementasi teknologi cerdas di berbagai sektor publik.',
    },
  ]);

  // Budaya Carousel state
  const budayaItems = [
    {
      id: 1,
      title: 'Dugderan & Warak Ngendog',
      description: 'Tradisi Dugderan dilaksanakan menjelang bulan ramadhan dan menandai akan dimulainya ibadah puasa. Acara ini erat dengan simbol budaya lokal, dimulai dengan arak-arakan, sebuah figur mitologi unik yang mencerminkan keberagaman budaya di Semarang.',
      image: '/assets/dugderan_budaya.png'
    },
    {
      id: 2,
      title: 'Seni Gambang',
      description: 'Tradisi Gambang Semarang ini bermula pada masa kolonial dan terus berkembang sebagai hiburan rakyat di acara-acara penting, seperti pernikahan dan festival budaya. Gambang Semarang adalah salah satu tradisi seni yang menjadi bagian tak terpisahkan dari budaya lokal Semarang.',
      image: '/assets/Gambang_budaya.png'
    },
    {
      id: 3,
      title: 'Tradisi Popokan',
      description: 'Bermula dari kisah seekor macan yang masuk ke Desa Sendang dan menimbulkan kerusakan. Berbagai cara telah dilakukan, termasuk menggunakan senjata, namun macan tersebut tetap bertahan. Warga mulai melemparkan tanah atau lumpur, dan akhirnya macan itu pergi. ',
      image: 'https://img.merahputih.com/media/2015/09/20/70Ia2LETJR1442730555.jpg'
    },
    {
      id: 4,
      title: 'Tradisi Padusan',
      description: 'Tradisi membersihkan diri sebelum bulan Ramadan, tradisi ini biasa dilakukan di sumber mata air alami seperti Umbul Senjoyo. Warga akan beramai-ramai mandi dan mencuci peralatan ibadah sebagai simbol menyucikan diri sebelum menjalankan ibadah puasa.',
      image: 'https://asset.kompas.com/crops/0n6TCCBPFJkxfoql5AQrPS05scE=/0x0:1800x1200/1200x800/data/photo/2023/03/23/641bc2a41d7bb.jpg'
    },
    {
      id: 5,
      title: 'Sesaji Rewanda',
      description: 'Masyarakat di kawasan Semarang, khususnya di sekitar Gunung Merbabu, masih melestarikan tradisi sakral Sesaji Rewanda. Tradisi ini merupakan bentuk penghormatan kepada leluhur dan penjaga alam, dengan mempersembahkan sesaji berupa hasil bumi, bunga, serta makanan tradisional.',
      image: 'https://awsimages.detik.net.id/community/media/visual/2026/03/28/sesaji-rewanda-gua-kreo-semarang-sabtu-2832026-1774686908938_169.jpeg?w=700&q=90'
    }
  ];

  const [currentBudayaIndex, setCurrentBudayaIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState('next'); // 'next' or 'prev'
  // State independen untuk pause marquee kuliner per baris
  const [isTopPaused, setIsTopPaused] = useState(false);
  const [isBottomPaused, setIsBottomPaused] = useState(false);

  // Refs for GSAP Hero Section (Page 1 / Home)
  const heroLeftRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroDividerRef = useRef(null);
  const heroDescRef = useRef(null);

  // Refs for GSAP Welcome Section (Page 2)
  const welcomeSectionRef = useRef(null);
  const welcomeText1Ref = useRef(null);
  const welcomeText2Ref = useRef(null);
  const shapesRef = useRef([]);

  // Refs for GSAP Sejarah Intro Section (Page 3)
  const sejarahIntroRef = useRef(null);
  const sejarahIntroContentRef = useRef(null);

  // Refs for GSAP Sejarah Section
  const sejarahListRef = useRef(null);

  // Refs for GSAP Teknologi Section
  const teknologiSectionRef = useRef(null);
  const teknologiContentRef = useRef(null);
  const teknologiLineRef = useRef(null);

  // Refs & state untuk Peta Interaktif (Leaflet dimuat lazy via CDN)
  const petaSectionRef = useRef(null);
  const petaMapContainerRef = useRef(null);
  const petaMapInstanceRef = useRef(null);
  const petaMarkersRef = useRef([]);
  const [petaMapStatus, setPetaMapStatus] = useState('idle'); // idle | loading | ready | error
  const [petaActiveId, setPetaActiveId] = useState(lokasiPeta[0]?.id ?? null);
  const petaActiveLokasi = lokasiPeta.find((l) => l.id === petaActiveId) || null;

  useEffect(() => {
    // Floating animation — runs permanently, outside scroll scope
    const floatingAnims = shapesRef.current.map((shape) => {
      if (!shape) return null;
      return gsap.to(shape, {
        y: "random(-25, 25)",
        x: "random(-15, 15)",
        rotation: "random(-12, 12)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: "random(0, 2)"
      });
    });

    return () => {
      floatingAnims.forEach(a => a && a.kill());
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Add scroll interactive classes to history cards to animate timeline dots
      const cards = gsap.utils.toArray(".history-card");
      
      cards.forEach((card) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 65%",
          end: "bottom 35%",
          onEnter: () => card.classList.add("active"),
          onLeave: () => card.classList.remove("active"),
          onEnterBack: () => card.classList.add("active"),
          onLeaveBack: () => card.classList.remove("active")
        });
      });

      // Animate entry for cards 3-5 (indices 2, 3, 4) only when scrolled into view
      cards.forEach((card, index) => {
        if (index >= 2) {
          gsap.fromTo(card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%", // Triggers when top of card reaches 85% of viewport
                once: true // Animate only once
              }
            }
          );
        }
      });
    }, sejarahListRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sejarahIntroContentRef.current, {
        scrollTrigger: {
          trigger: sejarahIntroRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: -100, // Slide down from top
        opacity: 0,
        duration: 1.2,
        delay: 0, // removed delay
        ease: "power3.out"
      });
    }, sejarahIntroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ScrollTrigger timeline for smooth reveal from bottom
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: welcomeSectionRef.current,
          start: "top 85%",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
        delay: 0.2
      });

      tl.from(welcomeText1Ref.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      })
      .from(welcomeText2Ref.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.6");
    }, welcomeSectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: teknologiSectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      });
      
      tl.from(teknologiLineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.6,
        ease: "power2.out"
      })
      .from(teknologiContentRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.3");
    }, teknologiSectionRef);

    return () => ctx.revert();
  }, []);

  // Lazy-load Leaflet (CSS+JS via CDN) hanya saat section Peta mendekati viewport,
  // supaya section lain tetap ringan dan tidak menambah bundle size project.
  useEffect(() => {
    const sectionEl = petaSectionRef.current;
    if (!sectionEl) return;

    let cancelled = false;

    const initMap = () => {
      if (cancelled || petaMapInstanceRef.current || !petaMapContainerRef.current) return;
      const L = window.L;
      if (!L) return;

      const map = L.map(petaMapContainerRef.current, {
        center: [-6.9865, 110.418],
        zoom: 13,
        scrollWheelZoom: false,
        preferCanvas: true,
        zoomControl: false,
      });

      L.control.zoom({ position: 'topright' }).addTo(map);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);

      const iconWisata = L.divIcon({
        className: 'peta-marker-icon peta-marker-wisata',
        html: '<span></span>',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
        popupAnchor: [0, -10],
      });

      const kulinerSvg = `
        <svg viewBox="0 0 24 24" width="12" height="12" xmlns="http://www.w3.org/2000/svg" fill="none">
          <g stroke="#e74c3c" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <g transform="rotate(-45 12 12)">
              <line x1="8" y1="2" x2="8" y2="9"/>
              <line x1="10.5" y1="2" x2="10.5" y2="9"/>
              <line x1="13" y1="2" x2="13" y2="9"/>
              <path d="M8 9c0 1.5 1.1 2.5 2.5 2.5S13 10.5 13 9"/>
              <line x1="10.5" y1="11.5" x2="10.5" y2="22"/>
            </g>
            <g transform="rotate(45 12 12)">
              <ellipse cx="15.5" cy="5.2" rx="2.8" ry="3.8" fill="#e74c3c" stroke="none"/>
              <line x1="15.5" y1="9" x2="15.5" y2="22"/>
            </g>
          </g>
        </svg>
      `;

      const iconKuliner = L.divIcon({
        className: 'peta-marker-icon peta-marker-kuliner',
        html: `<span>${kulinerSvg}</span>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -14],
      });

      petaMarkersRef.current = lokasiPeta.map((lokasi) => {
        const marker = L.marker([lokasi.lat, lokasi.lng], {
          icon: lokasi.type === 'kuliner' ? iconKuliner : iconWisata,
        }).addTo(map);
        marker.on('click', () => {
          setPetaActiveId(lokasi.id);
          map.flyTo([lokasi.lat, lokasi.lng], 16, { duration: 0.8 });
        });
        return { id: lokasi.id, marker };
      });

      // Enable scroll zoom hanya ketika peta difokus (klik), supaya scroll halaman tidak terganggu
      map.on('focus', () => map.scrollWheelZoom.enable());
      map.on('blur', () => map.scrollWheelZoom.disable());

      petaMapInstanceRef.current = map;
      setPetaMapStatus('ready');
    };

    const loadLeaflet = () => {
      if (cancelled) return;
      if (window.L) {
        initMap();
        return;
      }
      setPetaMapStatus('loading');

      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      let script = document.getElementById('leaflet-js');
      if (!script) {
        script = document.createElement('script');
        script.id = 'leaflet-js';
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.async = true;
        script.onload = initMap;
        script.onerror = () => !cancelled && setPetaMapStatus('error');
        document.body.appendChild(script);
      } else {
        script.addEventListener('load', initMap, { once: true });
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadLeaflet();
            observer.disconnect();
          }
        });
      },
      { rootMargin: '300px' }
    );
    observer.observe(sectionEl);

    return () => {
      cancelled = true;
      observer.disconnect();
      if (petaMapInstanceRef.current) {
        petaMapInstanceRef.current.remove();
        petaMapInstanceRef.current = null;
      }
    };
  }, []);

  const handlePetaCardClick = (lokasi) => {
    setPetaActiveId(lokasi.id);
    const map = petaMapInstanceRef.current;
    if (!map) return;
    map.flyTo([lokasi.lat, lokasi.lng], 16, { duration: 0.8 });
  };

  const petaListRefVal = useRef(null);
  const petaListRef = useCallback((node) => {
    if (petaListRefVal.current) {
      petaListRefVal.current.removeEventListener('wheel', petaListRefVal.current._handleWheel);
    }
    petaListRefVal.current = node;
    if (node) {
      const handleWheel = (e) => {
        e.preventDefault();
        node.scrollTop += e.deltaY;
      };
      node._handleWheel = handleWheel;
      node.addEventListener('wheel', handleWheel, { passive: false });
    }
  }, []);



  const handlePrevImage = () => {
    if (isAnimating) return;
    setSlideDirection('prev');
    const newIndex = currentImageIndex === 0 ? heroSlides.length - 1 : currentImageIndex - 1;
    setNextImageIndex(newIndex);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentImageIndex(newIndex);
      setNextImageIndex(null);
      setIsAnimating(false);
    }, 700);
  };

  const handleNextImage = () => {
    if (isAnimating) return;
    setSlideDirection('next');
    const newIndex = currentImageIndex === heroSlides.length - 1 ? 0 : currentImageIndex + 1;
    setNextImageIndex(newIndex);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentImageIndex(newIndex);
      setNextImageIndex(null);
      setIsAnimating(false);
    }, 700);
  };

  const goToHeroSlide = (index) => {
    if (isAnimating || index === currentImageIndex) return;
    setSlideDirection(index > currentImageIndex ? 'next' : 'prev');
    setNextImageIndex(index);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setNextImageIndex(null);
      setIsAnimating(false);
    }, 700);
  };

  // Navigasi tombol "Selengkapnya": scroll halus ke section yang sesuai
  // dengan slide yang sedang tampil (mis. slide Budaya -> #budaya).
  const handleHeroCtaClick = (e, target) => {
    e.preventDefault();
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setSlideDirection('next');
        setNextImageIndex((prevNext) => {
          const currentIdx = prevNext ?? currentImageIndex;
          const newIndex = currentIdx === heroSlides.length - 1 ? 0 : currentIdx + 1;
          
          setIsAnimating(true);
          setTimeout(() => {
            setCurrentImageIndex(newIndex);
            setNextImageIndex(null);
            setIsAnimating(false);
          }, 700);
          
          return newIndex;
        });
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [currentImageIndex, isAnimating, heroSlides.length]);

  // Render satu slide hero (gambar tidak ter-crop + info kategori + tombol Selengkapnya)
  const renderHeroSlide = (slide, extraClass = '') => (
    <div className={`hero-slide ${extraClass}`}>
      <div
        className="hero-slide-backdrop"
        style={{ backgroundImage: `url(${slide.image})` }}
        aria-hidden="true"
      />
      <picture className="hero-slide-picture">
        {slide.mobileImage && <source media="(max-width: 600px)" srcSet={slide.mobileImage} />}
        <img
          src={slide.image}
          alt={slide.title}
          className="hero-slide-img"
          fetchpriority={extraClass ? undefined : 'high'}
        />
      </picture>
      <div className="hero-slide-overlay">
        <div className="hero-slide-info">
          <h3 className="hero-slide-heading">{slide.title}</h3>
        </div>
        <a
          href={slide.target}
          className="hero-slide-cta"
          onClick={(e) => handleHeroCtaClick(e, slide.target)}
        >
          Selengkapnya
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );

  const handlePrevBudaya = () => {
    setCurrentBudayaIndex(currentBudayaIndex === 0 ? budayaItems.length - 1 : currentBudayaIndex - 1);
  };

  const handleNextBudaya = () => {
    setCurrentBudayaIndex(currentBudayaIndex === budayaItems.length - 1 ? 0 : currentBudayaIndex + 1);
  };

  const staggeredNavItems = [
    { label: 'Home', ariaLabel: 'Kembali ke halaman utama', link: '#home' },
    { label: 'Sejarah', ariaLabel: 'Sejarah Kota Semarang', link: '#sejarah' },
    { label: 'Budaya', ariaLabel: 'Budaya dan Toleransi', link: '#budaya' },
    { label: 'Wisata', ariaLabel: 'Destinasi Wisata', link: '#wisata' },
    { label: 'Kuliner', ariaLabel: 'Kuliner Khas Semarang', link: '#kuliner' },
    { label: 'Teknologi', ariaLabel: 'Inovasi dan Teknologi', link: '#teknologi' },
    { label: 'Peta', ariaLabel: 'Peta Interaktif', link: '#peta' },
  ];

  const staggeredSocialItems = [
    { label: 'Instagram', link: 'https://www.instagram.com/crawl2heaven?igsh=MWh0aG1iMnZmazBwag==' },
    { label: 'Facebook', link: 'https://www.facebook.com/profile.php?id=100019971024072' },
    { label: 'WhatsApp', link: 'https://wa.me/082121825192' },
  ];

  // Update URL hash saat scroll ke section tertentu (Ponytail way)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id) {
          window.history.replaceState(null, null, `/${entry.target.id}`);
        }
      });
    }, { rootMargin: '-40% 0px -60% 0px' });

    document.querySelectorAll('section[id], main[id]').forEach(sec => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="app">
      {/* PillNav — desktop only (hidden on mobile via CSS) */}
      <div className="nav-desktop-only">
        <PillNav
          logo={semarangLogo}
          logoAlt="Semarang Smart City"
          items={navItems}
          activeHref="#home"
          baseColor="#ffffff"
          pillColor="#e74c3c"
          hoveredPillTextColor="#e74c3c"
          pillTextColor="#ffffff"
          initialLoadAnimation={true}
        />
      </div>

      {/* StaggeredMenu — mobile only (hidden on desktop via CSS) */}
      <div className="nav-mobile-only">
        <StaggeredMenu
          position="right"
          items={staggeredNavItems}
          displayItemNumbering={true}
          menuButtonColor="#ffffff"
          openMenuButtonColor="#111111"
          changeMenuColorOnOpen={true}
          colors={['#c0392b', '#e74c3c']}
          logoUrl={semarangLogo}
          accentColor="#e74c3c"
          isFixed={true}
          onMenuOpen={() => console.log('Menu terbuka')}
          onMenuClose={() => console.log('Menu tertutup')}
        />
      </div>


      {/* Hero Section */}
      <main className="hero" id="home">
        {/* Fullscreen Carousel Background */}
        <div className={`hero-carousel-bg ${(nextImageIndex ?? currentImageIndex) === 0 ? 'slide-0-bg' : ''}`}>
          {nextImageIndex === null
            ? renderHeroSlide(heroSlides[currentImageIndex])
            : (
              <>
                {renderHeroSlide(heroSlides[currentImageIndex], `slide-out-${slideDirection}`)}
                {renderHeroSlide(heroSlides[nextImageIndex], `slide-in-${slideDirection}`)}
              </>
            )}
        </div>

        <div className={`hero-content ${(nextImageIndex ?? currentImageIndex) === 0 ? 'hero-content-grid' : ''} ${isAnimating ? 'animating' : ''}`}>
          {/* Left Side Content — dinamis per slide */}
          {(() => {
            const activeIdx = nextImageIndex ?? currentImageIndex;
            const slide = heroSlides[activeIdx];
            return (
              <div
                className={`hero-left ${isAnimating ? `slide-${slideDirection}-out` : 'slide-in'}`}
                ref={heroLeftRef}
              >
                <h1 className="hero-title" ref={heroTitleRef}>
                  {slide.headingLine1}<br />
                  <span className="text-red">{slide.headingLine2}<br className="hero-title-linebreak" />{' '}{slide.headingLine3.split(' ')[0]}</span>{slide.headingLine3.includes(' ') ? ' ' + slide.headingLine3.split(' ').slice(1).join(' ') : ''}
                </h1>
                <div className="hero-divider" ref={heroDividerRef}></div>
                <p className="hero-description" ref={heroDescRef}>
                  {slide.subDesc[0]}<strong>{slide.subDesc[1]}</strong>{slide.subDesc[2]} <strong>{slide.subDesc[3]}</strong>{slide.subDesc[4]}<strong>{slide.subDesc[5]}</strong>{slide.subDesc[6]}. <span className="hero-long-desc">{slide.longDesc}</span>
                </p>
              </div>
            );
          })()}

          {/* Render Center and Right columns ONLY for slide 0 */}
          {(nextImageIndex ?? currentImageIndex) === 0 && (
            <>
              {/* Center Image Carousel */}
              <div className="hero-center">
                <div className="carousel-wrapper">
                  <img
                    src={heroSlides[0].image}
                    alt={heroSlides[0].title}
                    className={`hero-image ${nextImageIndex === 0 ? 'fade-in' : ''}`}
                    fetchpriority="high"
                  />
                </div>
              </div>

              {/* Right Side — info kategori slide aktif */}
              <div className={`hero-right ${isAnimating ? `animating slide-${slideDirection}` : ''}`}>
                <div className="feature-item">
                  <h2 className="feature-title">HISTORICAL</h2>
                  <p className="feature-subtitle">Building &amp; <strong>Culture</strong></p>
                </div>
                <div className="feature-item">
                  <h2 className="feature-title text-red">MEMORABLE</h2>
                  <p className="feature-subtitle text-red">National <strong>hero</strong> figures</p>
                </div>
                <div className="feature-item">
                  <h2 className="feature-title">INOVATING</h2>
                  <p className="feature-subtitle">Technologies &amp; <strong>Infrastructure</strong></p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Dot Indicators */}
        <div className="hero-slide-dots">
          {heroSlides.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              className={`hero-slide-dot${(nextImageIndex ?? currentImageIndex) === idx ? ' active' : ''}`}
              aria-label={`Lihat slide ${slide.tag}`}
              onClick={() => goToHeroSlide(idx)}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button className="arrow-btn arrow-left" aria-label="Previous" onClick={handlePrevImage}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="arrow-btn arrow-right" aria-label="Next" onClick={handleNextImage}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Bottom Hashtags */}
        <div className="hashtags">
          <div className="hashtags-left">
            <span>#SemarangSemakinHebat</span>
            <span>#TerusBerbenah</span>
          </div>
          <div className="hashtags-right">
            <span>#SemarangBersatu</span>
            <span>#SemarangBergerak</span>
          </div>
        </div>

        {/* Tombol Selengkapnya khusus layar handphone — dirender sebagai sibling langsung
            dari hero-content (bukan di dalam hero-carousel-bg) supaya tetap berada di atas
            saat card welcome turun menutupi bagian bawah layar. */}
        {(nextImageIndex ?? currentImageIndex) !== 0 && (() => {
          const activeIdx = nextImageIndex ?? currentImageIndex;
          const slide = heroSlides[activeIdx];
          return (
            <a
              href={slide.target}
              className="hero-mobile-cta"
              onClick={(e) => handleHeroCtaClick(e, slide.target)}
            >
              Selengkapnya
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          );
        })()}
      </main>

      {/* Welcome / Page 2 Section */}
      <section className="section welcome-section" id="welcome" ref={welcomeSectionRef}>
        <div className="welcome-content">
          <SplitText
            text="Selamat Menjelajah"
            className="welcome-text-1"
            delay={50}
            duration={0.7}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
            tag="h2"
            textAlign="center"
            once={false}
            toggleActions="restart none none reverse"
          />
          <SplitText
            text="Kota Semarang"
            className="welcome-text-2"
            delay={50}
            duration={0.8}
            ease="back.out(1.5)"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            tag="h1"
            textAlign="center"
            once={false}
            toggleActions="restart none none reverse"
          />
        </div>
        
        {/* Floating Shapes */}
        <div className="shape shape-1" ref={el => shapesRef.current[0] = el}></div>
        <div className="shape shape-2" ref={el => shapesRef.current[1] = el}></div>
        <div className="shape shape-3" ref={el => shapesRef.current[2] = el}></div>
        <div className="shape shape-4" ref={el => shapesRef.current[3] = el}></div>
        <div className="shape shape-5" ref={el => shapesRef.current[4] = el}></div>
      </section>

      {/* Sejarah Section - Asal Usul (Awal Section Sejarah) */}
      <section className="section wisata-section" id="sejarah" ref={sejarahIntroRef}>
        <div className="wisata-content-container" ref={sejarahIntroContentRef}>
          <div className="wisata-text-column">
            <h2 style={{ fontSize: '2.8rem', marginBottom: '0.5rem', color: '#e74c3c', fontWeight: 'bold' }}>Sejarah Kota Semarang</h2>
            <p className="wisata-main-text">
              <span className="drop-cap">S</span>emarang (bahasa Jawa: <span className="javanese-text">ꦱꦼꦩꦫꦁ</span>, translit. Semarang) merupakan Ibu Kota Provinsi Jawa Tengah yang dinamis. Sebagai kota metropolitan terbesar kelima di Indonesia, Semarang menjadi pusat penting bagi ekonomi, budaya, dan sejarah dengan jumlah penduduk mencapai <strong>1,69 juta</strong> jiwa pada pertengahan 2024.
            </p>
            
            <div className="asal-usul-box">
              <span className="quote-mark-bg">“</span>
              <div className="asal-usul-title">
              </div>
              <p className="asal-usul-quote">
                “Semarang berasal dari kata <span className="highlight">Asem (Asam)</span> dan <span className="highlight">Arang (Jarang)</span>, yang berarti Pohon Asam yang tumbuh jarang-jarang.”
              </p>
            </div>
            
            <p className="wisata-footer-text">
              Penamaan ini bermula saat <strong>Ki Ageng Pandanaran I</strong> tiba di Pulau Tirang dan terkesima melihat fenomena alam unik tersebut. Di era kolonial, nama ini sempat disesuaikan menjadi "Samarang".
            </p>
          </div>

          <div className="wisata-grid-panel">
            <GridMotion
              gradientColor="#e74c3c"
              items={[
                '/assets/kuda.jpe',
                '/assets/laksamana.jpg',
                '/assets/patungpenari.jpe',
                '/assets/undip.jpg',
                '/assets/Warak ngendog.jpe',
                '/assets/kuda.jpe',
                '/assets/laksamana.jpg',
                '/assets/patungpenari.jpe',
                '/assets/Warak ngendog.jpe',
                '/assets/laksamana.jpg',
                '/assets/undip.jpg',
                '/assets/Warak ngendog.jpe',
                '/assets/patungpenari.jpe',
                '/assets/undip.jpg',
                '/assets/laksamana.jpg',
                '/assets/kuda.jpe',
              ]}
            />
          </div>
        </div>
      </section>

      {/* Sejarah Timeline Cards Section */}
      <section className="section sejarah-section" id="sejarah-timeline">
        <div className="sejarah-layout">
          {/* Left Side (Sticky) */}
          <div className="sejarah-sticky">
            <h3 className="sejarah-subtitle">Sejarah Kota Semarang</h3>
            <h2 className="sejarah-title">
              Jejak Langkah &<br /><span className="text-red">Peristiwa Bersejarah</span>
            </h2>
            <p className="sejarah-desc">
              Temukan berbagai peristiwa penting yang membentuk identitas dan budaya Kota Semarang dari masa ke masa. Mari telusuri jejak sejarahnya!
            </p>
            
            {/* Arrow image */}
            <img src="/assets/panah.png" className="sejarah-arrow" alt="arrow" />
          </div>

          {/* Right Side (Scrollable Cards) */}
          <div className="sejarah-list" ref={sejarahListRef}>
            {sejarahData.map((item, index) => (
              <div key={index} className="history-card">
                <div className="hc-timeline-node">
                  <div className="hc-timeline-line"></div>
                  <div className="hc-timeline-dot"></div>
                  <div className="hc-timeline-date">{item.year}</div>
                </div>
                
                {item.image && (
                  <div className={`hc-image${item.largeImage ? ' hc-image--large' : ''}`}>
                    <img src={item.image} alt={item.title} />
                  </div>
                )}
                
                <div className="hc-info">
                  <h3 className="hc-title">{item.title}</h3>
                  <div className="hc-divider"></div>
                  <p className="hc-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Budaya Section */}
      <section className="section budaya-section" id="budaya">
        <div className="budaya-section-inner">
          <header className="budaya-header">
            <h2 className="budaya-title">BUDAYA</h2>
          </header>

          <div className="budaya-marquee-container">
            <div className="budaya-marquee-track">
              {/* Duplicate the sets 4 times to ensure no empty space on ultra-wide screens */}
              {[0, 1, 2, 3].map((setIdx) => (
                <div key={setIdx} className="budaya-marquee-set" aria-hidden={setIdx > 0 ? "true" : "false"}>
                  {budayaItems.map((item) => (
                    <div key={item.id} className="budaya-card">
                      <div className="budaya-card-image">
                        <img src={item.image} alt={item.title} loading="lazy" />
                        <div className="budaya-card-overlay"></div>
                      </div>
                      <div className="budaya-card-content">
                        <h3>{item.title}</h3>
                        <div className="budaya-card-details">
                          <div className="budaya-card-details-inner">
                            <hr className="budaya-card-divider" />
                            <p>{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Wisata Section */}
      <section className="section wisata-inovasi-section" id="wisata">
        <div className="wisata-inovasi-body">
          <div className="wisata-inovasi-header">
            <h2 className="wisata-inovasi-title">WISATA <span style={{ fontFamily: "'Caveat', cursive",color: "#e74c3c", fontSize: "1.3em", fontWeight: "700", textTransform: "capitalize", letterSpacing: "1px", padding: "0 4px" }}>Ikonik</span> SEMARANG</h2>
          </div>
          
          {/* Desktop Version - StickyScrollCards */}
          <div className="sticky-cards-wrapper z-10 relative hidden md:block">
            <StickyScrollCards />
          </div>
          
          {/* Mobile Version - WisataMobileStack */}
          <div className="mobile-stack-wrapper block md:hidden">
            <WisataMobileStack />
          </div>
          
          <div className="wisata-inovasi-footer">
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.015,
                  },
                },
              }}
              className="wisata-inovasi-subtitle"
            >
              {"Perpaduan nilai warisan sejarah yang agung dan pesona kebudayaan lokal yang berakulturasi dengan harmonis menjadikan sektor pariwisata Kota Semarang terus berkembang pesat sebagai salah satu destinasi unggulan Nusantara.".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 25 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        type: "spring",
                        damping: 15,
                        stiffness: 120,
                      },
                    },
                  }}
                  style={{ display: "inline-block", marginRight: "0.35em" }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Kuliner Section */}
      <section className="section kuliner-section" id="kuliner">
        <div className="kuliner-container">
          <header className="kuliner-header">
            <h2 className="kuliner-title-main">KULINER</h2>
            <div className="kuliner-header-line"></div>
            <p className="kuliner-subtitle-main">Menjelajahi Cita Rasa Legendaris Kota Semarang</p>
          </header>

          {/* Top Marquee Row (Scrolling Right) — pause hanya baris ini saat card di-hover */}
          <div className="kuliner-marquee-container">
            <div className={`kuliner-marquee-track kuliner-marquee-track-right${isTopPaused ? ' paused' : ''}`}>
              {[0, 1].map((setIdx) => (
                <div key={setIdx} className="kuliner-marquee-set" aria-hidden={setIdx > 0 ? "true" : "false"}>
                  {kulinerTop.map((item, idx) => (
                    <div
                      key={idx}
                      className="kuliner-card"
                      onMouseEnter={() => setIsTopPaused(true)}
                      onMouseLeave={() => setIsTopPaused(false)}
                    >
                      <div className="kuliner-card-img-wrapper">
                        <img src={item.image} alt={item.name} className="kuliner-card-img" />
                      </div>
                      <div className="kuliner-card-info">
                        <h3 className="kuliner-card-title">{item.name}</h3>
                        <p className="kuliner-card-desc">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Marquee Row (Scrolling Left) — pause hanya baris ini saat card di-hover */}
          <div className="kuliner-marquee-container">
            <div className={`kuliner-marquee-track kuliner-marquee-track-left${isBottomPaused ? ' paused' : ''}`}>
              {[0, 1].map((setIdx) => (
                <div key={setIdx} className="kuliner-marquee-set" aria-hidden={setIdx > 0 ? "true" : "false"}>
                  {kulinerBottom.map((item, idx) => (
                    <div
                      key={idx}
                      className="kuliner-card"
                      onMouseEnter={() => setIsBottomPaused(true)}
                      onMouseLeave={() => setIsBottomPaused(false)}
                    >
                      <div className="kuliner-card-img-wrapper">
                        <img src={item.image} alt={item.name} className="kuliner-card-img" />
                      </div>
                      <div className="kuliner-card-info">
                        <h3 className="kuliner-card-title">{item.name}</h3>
                        <p className="kuliner-card-desc">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* Teknologi Section */}
      <section className="section teknologi-section" id="teknologi" ref={teknologiSectionRef}>
        
        {/* Top Part: Image and Content */}
        <div className="teknologi-hero-part">
          <img src="https://imgcdn.espos.id/@espos/images/2024/10/20241013184702-pemkot-semarang.jpeg?quality=60" alt="Semarang Kota Teknologi" className="teknologi-bg-image" loading="lazy" />
          <div className="teknologi-gradient-top"></div>
          <div className="teknologi-gradient-bottom"></div>
          
          <div className="teknologi-content-wrapper">
            <div className="teknologi-content-inner">
              <div className="teknologi-line" ref={teknologiLineRef}></div>
              <div className="teknologi-content-bottom teknologi-content-left" ref={teknologiContentRef}>
                <div className="teknologi-title-col">
                  <h2>Semarang<br/>Dapur Inovasi<br/>Nusantara</h2>
                </div>
                <div className="teknologi-desc-col">
                  <p>
                    Semarang terus berinovasi dan mengintegrasikan teknologi terkini untuk menciptakan kota cerdas yang berkelanjutan. Menjadi percontohan transformasi digital,Kota Semarang berhasil meraih juara pertama pada ajang Gajah Mada Digital Transformation Governance Index (GM-DTGI) tahun 2024, serta penghargaan sebagai kota dengan inovasi digital terbaik dalam pelayanan publik.
                  </p>
                  <p>
                    Kota Semarang dinilai unggul dibanding kota-kota lain di Indonesia karena keberhasilan dalam mengintegrasikan aplikasi-aplikasi digital yang mempermudah pelayanan publik, seperti Sapa Mbak Ita, Savira (Semarang Virtual Assistant), Call Center 112, serta aplikasi Pantau Sampah, Pantau Banjir dan Rob, Mengukuhkan Semarang sebagai pelopor inovasi berkelas global.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Part: Sinergi Universitas */}
        <div className="teknologi-tech-part">
          <InteractiveHoneycomb />

          <div className="sinergi-wrapper z-10 relative">
            <SinergiUniversitas />
          </div>
        </div>
          
        {/* Smart City Innovations */}
        <div className="smart-city-innovations">
          <h3 className="innovations-title">Inovasi Smart City</h3>
            <div className="glow-cards-grid">
              {[
                { title: "Electric Small Soil Digger", desc: "Inovasi Mesin Panen Kentang dengan Sistem IoT, tim dari Politeknik Negeri Semarang keluar sebagai juara 1 kategori mahasiswa pada babak final Lomba Inovasi Nasional Teknologi Pertanian 2025. ", src: "https://koranbernas.id/uploads/images/202512/image_870x_69384e238b8e0.jpg", link: "https://koranbernas.id/politeknik-negeri-semarang-juara-1-lomba-inovasi-nasional-teknologi-pertanian" },
                { title: "Aplikasi Stress Meter", desc: "Stress Meter, sebuah aplikasi berbasis website yang dirancang untuk membantu masyarakat mengidentifikasi tingkat stres secara mandiri. Melalui pengisian beberapa instrumen kuesioner yang valid, sistem akan langsung memetakan kondisi psikologis pengguna secara real-time.", src: "/assets/gambar-tekonologi.jpeg", link: "https://unkartur.ac.id/blog/2026/06/30/kolaborasi-dengan-brida-kota-semarang-universitas-karangturi-pamerkan-dua-inovasi-berbasis-web-di-jateng-fair-2026/" },
                { title: "MOLISA (Mobil Listrik Karya Mahasiswa)", desc: "merupakan langkah nyata kolaborasi akademisi dalam mendorong pemanfaatan energi bersih serta ketahanan pangan perkotaan. di wilayah pesisir merupakan langkah nyata kolaborasi akademisi dalam mendorong pemanfaatan energi bersih serta ketahanan pangan perkotaan.", src: "https://cdn.antaranews.com/cache/1200x800/2026/06/11/pengembangan-mobil-listrik-tenaga-surya-110626-aaa-11.jpg.webp", link: "https://www.antaranews.com/foto/5603932/mahasiswa-unissula-kembangkan-mobil-listrik-tenaga-surya-ramah-lingkungan" },
                { title: "Smart Farming berbasis Artificial Internet of Things (AIoT) dan energi baru terbarukan (EBT)", desc: "Tim peneliti UNNES Electrical Engineering Students Research Group (UEESRG) Universitas Negeri Semarang mengembangkan Sistem untuk membantu petani mengelola lahan secara presisi.", src: "https://assets.kompasiana.com/items/album/2025/08/08/screen-shot-2025-08-08-at-14-48-04-6895b6a1c925c415cc5dddd4.png?t=o&v=770", link: "https://www.kompasiana.com/ueesrg/6895b6dfed64151b73294e02/ueesrg-unnes-kembangkan-sistem-smart-farming-berbasis-aiot-dan-energi-surya?page=1&page_images=5" },
                { title: "AISSA (Artificial Intelligence Solusi Sampah) ", desc: "dikembangkan Pemerintah Kota Semarang berhasil masuk dalam daftar 30 Exemplary Initiatives pada ajang 7th Guangzhou International Award for Urban Innovation (Guangzhou Award) 2026.", src: "https://www.guangzhouaward.org/o/uploads/20260629/b909dc7f4e4d548d2ec011d539aa26ee.jpg", link: "https://www.guangzhouaward.org/a/3763.html?lang=en" },
                { title: "PETASOL (pengolahan sampah plastik menjadi Bahan Bakar Minyak)", desc: "Petasol memanfaatkan limbah plastik yang mengotori sungai dan irigasi menjadi bahan bakar alternatif ramah lingkungan. Teknologi Pirolisis Muktikondensor ini dikembangkan untuk memberikan solusi energi murah bagi petani, meningkatkan efisiensi, sekaligus mengurangi limbah plastik.", src: "https://miniox.brin.go.id/website//uploads/images/posts//2024/10/1730116075-82504411.webp", link: "https://brin.go.id/news/121287/kelola-limbah-plastik-inovasi-brin-dan-pemkot-semarang-wujudkan-ketahanan-energi" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: -50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                  className="flex flex-col"
                >
                  <BorderGlow
                    edgeSensitivity={30}
                    glowColor="40 80 80"
                    backgroundColor="#120F17"
                    borderRadius={28}
                    glowRadius={40}
                    glowIntensity={1.0}
                    coneSpread={25}
                    animated={false}
                    colors={['#e74c3c', '#f1c40f', '#3498db']}
                    className="h-full"
                  >
                    <div className="glow-card-content flex flex-col h-full">
                      <div className="w-full overflow-hidden bg-neutral-100 rounded-sm shadow-inner mb-1.5 sm:mb-4">
                        <img
                          src={item.src}
                          alt={item.title}
                          className="block w-full aspect-[4/3] sm:aspect-video object-cover hover:scale-110 transition-transform duration-700"
                          draggable={false} />
                      </div>
                      <h4 className="glow-card-title">{item.title}</h4>
                      <p className="glow-card-desc flex-grow mb-2 sm:mb-6">{item.desc}</p>
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="mt-auto self-end px-1 py-0.5 sm:px-2 sm:py-1 text-[8px] sm:text-[11px] font-bold tracking-widest uppercase text-neutral-400 bg-transparent border-none cursor-pointer hover:text-white transition-colors z-10 no-underline"
                      >
                        Sumber
                      </a>
                    </div>
                  </BorderGlow>
                </motion.div>
              ))}
            </div>
          </div>

      </section>

      {/* Peta Section */}
      <section className="section peta-section" id="peta" ref={petaSectionRef}>
        <div className="peta-header">
          <h2 className="peta-title">PETA</h2>
          <p className="peta-subtitle">
            Temukan lokasi berbagai tempat menarik dan penting di Semarang melalui peta interaktif kami.
          </p>
        </div>

        <div className="peta-content">
          <div className="peta-list-panel">
            <div className="peta-list" role="list" ref={petaListRef}>
              {lokasiPeta.map((lokasi) => (
                <button
                  key={lokasi.id}
                  type="button"
                  role="listitem"
                  className={`peta-list-item peta-list-item-${lokasi.type}${petaActiveId === lokasi.id ? ' active' : ''}`}
                  onClick={() => handlePetaCardClick(lokasi)}
                >
                  <span className={`peta-list-badge peta-list-badge-${lokasi.type}`}>{lokasi.kategori}</span>
                  <span className="peta-list-name">{lokasi.name}</span>
                  <span className="peta-list-desc">{lokasi.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="peta-map-wrapper">
            <div className="peta-map" ref={petaMapContainerRef} />

            <div className="peta-map-legend">
              <span className="peta-legend-item">
                <span className="peta-legend-swatch peta-legend-wisata" /> Wisata
              </span>
            </div>

            {petaActiveLokasi && (
              <div className={`peta-info-card peta-info-card-${petaActiveLokasi.type}`}>
                <button
                  type="button"
                  className="peta-info-card-close"
                  aria-label="Tutup"
                  onClick={() => setPetaActiveId(null)}
                >
                  ×
                </button>
                <div className="peta-info-card-img-wrapper">
                  <img src={petaActiveLokasi.image} alt={petaActiveLokasi.name} className="peta-info-card-img" />
                </div>
                <div className="peta-info-card-body">
                  <span className={`peta-list-badge peta-list-badge-${petaActiveLokasi.type}`}>
                    {petaActiveLokasi.kategori}
                  </span>
                  <h4 className="peta-info-card-name">{petaActiveLokasi.name}</h4>
                  <p className="peta-info-card-desc">{petaActiveLokasi.desc}</p>
                </div>
              </div>
            )}

            {petaMapStatus !== 'ready' && (
              <div className="peta-map-overlay">
                {petaMapStatus === 'error' ? (
                  <p>Gagal memuat peta. Periksa koneksi internet Anda.</p>
                ) : (
                  <>
                    <span className="peta-map-spinner" />
                    <p>Memuat peta interaktif…</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-section">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-brand">
              <img src="/assets/semarang-semakin-hebat-seeklogo.png" className="footer-logo" alt="Logo Semarang" />
              <p className="footer-desc">
                Jelajahi keindahan sejarah, keragaman budaya, pesona wisata, dan inovasi teknologi dari jantung Jawa Tengah.
              </p>
            </div>
            
            <div className="footer-links">
              <h4 className="footer-title">Main Content</h4>
              <ul>
                <li><a href="#home">Introduction</a></li>
                <li><a href="#sejarah">History of Semarang</a></li>
                <li><a href="#budaya">Culture and Tolerance</a></li>
                <li><a href="#wisata">Travel Destination</a></li>
              </ul>
            </div>

            <div className="footer-links">
              <h4 className="footer-title">Other</h4>
              <ul>
                <li><a href="#kuliner">signature culinary specialties</a></li>
                <li><a href="#teknologi">Innovation & Technology</a></li>
                <li><a href="#peta">Interactive Map</a></li>
              </ul>
            </div>

            <div className="footer-contact">
              <h4 className="footer-title">Contact</h4>
              <p>Pemerintah Kota Semarang</p>
              <p>Jl. Pemuda No. 148, Sekayu</p>
              <p>Semarang Tengah, 50132</p>
              <div className="footer-socials">
                <a href="https://www.instagram.com/crawl2heaven?igsh=MWh0aG1iMnZmazBwag==" target="_blank" rel="noreferrer" className="social-icon" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href="https://www.facebook.com/profile.php?id=100019971024072&mibextid=rS40aB7S9Ucbxw6v" target="_blank" rel="noreferrer" className="social-icon" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="https://wa.me/082121825192" target="_blank" rel="noreferrer" className="social-icon" aria-label="WhatsApp">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Lomba Website Nusantara. Dibuat dengan antusiasme untuk Kota Semarang.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App