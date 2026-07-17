import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PillNav from './components/PillNav'
import GridMotion from './components/GridMotion'
import { StickyScrollCards } from '@/components/ui/sticky-scroll-cards'
import { SinergiUniversitas } from '@/components/SinergiUniversitas'
import { motion } from 'framer-motion'
import InteractiveHoneycomb from './components/ui/InteractiveHoneycomb'
import BorderGlow from './components/ui/BorderGlow'
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

// Per-letter split text component for hover animation
function SplitText({ text, className, wrapperRef, colored }) {
  let letterCount = 0;
  return (
    <span className={className} ref={wrapperRef}>
      {text.split('').map((char, i) => {
        if (char === ' ') {
          return <span key={i} className="letter-space">&nbsp;</span>;
        }
        const idx = ++letterCount;
        const cls = colored ? `letter letter-colored letter-n${idx}` : 'letter';
        return <span key={i} className={cls}>{char}</span>;
      })}
    </span>
  );
}

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

const kulinerTop = [
  {
    name: "Lumpia Semarang",
    image: "/assets/lumpia-semarang.jpeg",
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
  // Carousel state - isi array dengan gambar Anda sendiri
  const [images] = useState([
    '/assets/Tugumuda.png',
    '/assets/ChengHo_wisata.png',
    // Tambahkan gambar lain di sini
    // '/assets/gambar2.png',
    // '/assets/gambar3.png',
  ]);

  // Budaya Carousel state
  const budayaItems = [
    {
      id: 1,
      title: 'Dugderan & Warak Ngendog',
      description: 'Tradisi Dugderan dilaksanakan menjelang bulan ramadhan dan menandai akan segara dimulainya ibadah puasa. Acara ini sarat dengan simbol budaya lokal, dimulai dengan arak-arakan yang dipimpin oleh Warak Ngendog, sebuah figur mitologi unik yang mencerminkan keberagaman budaya di Semarang.',
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
      description: 'Tradisi Popokan ini bermula dari kisah seekor macan yang pernah masuk ke Desa Sendang dan menimbulkan kerusakan. Berbagai cara telah dilakukan, termasuk menggunakan senjata, namun macan tersebut tetap bertahan. Kemudian atas saran seorang pemuka adat, warga mulai melemparkan tanah atau lumpur, dan akhirnya macan itu pergi. ',
      image: 'https://img.merahputih.com/media/2015/09/20/70Ia2LETJR1442730555.jpg'
    },
    {
      id: 4,
      title: 'Tradisi Padusan',
      description: 'Padusan merupakan tradisi membersihkan diri sebelum bulan Ramadan. Di Semarang, tradisi ini biasa dilakukan di sumber mata air alami seperti Umbul Senjoyo. Warga akan beramai-ramai mandi dan mencuci peralatan ibadah sebagai simbol menyucikan diri sebelum menjalankan ibadah puasa.',
      image: 'https://asset.kompas.com/crops/0n6TCCBPFJkxfoql5AQrPS05scE=/0x0:1800x1200/1200x800/data/photo/2023/03/23/641bc2a41d7bb.jpg'
    },
    {
      id: 5,
      title: 'Sesaji Rewanda',
      description: 'Masyarakat di kawasan Semarang, khususnya di sekitar Gunung Merbabu, masih melestarikan tradisi sakral Sesaji Rewanda. Tradisi ini merupakan bentuk penghormatan kepada leluhur dan penjaga alam, dengan mempersembahkan sesaji berupa hasil bumi, bunga, serta makanan tradisional.',
      image: 'https://asset.kompas.com/crops/0n6TCCBPFJkxfoql5AQrPS05scE=/0x0:1800x1200/1200x800/data/photo/2023/03/23/641bc2a41d7bb.jpg'
    }
  ];

  const [currentBudayaIndex, setCurrentBudayaIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  // State independen untuk pause marquee kuliner per baris
  const [isTopPaused, setIsTopPaused] = useState(false);
  const [isBottomPaused, setIsBottomPaused] = useState(false);

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
      }, "-=0.6")
      .from(shapesRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out"
      }, "-=0.8");
      
      // Floating animation loop for shapes
      shapesRef.current.forEach((shape) => {
        gsap.to(shape, {
          y: "random(-20, 20)",
          x: "random(-20, 20)",
          rotation: "random(-15, 15)",
          duration: "random(2.5, 4)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });

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
        duration: 0.8,
        ease: "power3.inOut"
      })
      .from(teknologiContentRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.4");
    }, teknologiSectionRef);

    return () => ctx.revert();
  }, []);


  const handlePrevImage = () => {
    if (isAnimating) return;
    const newIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    setNextImageIndex(newIndex);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentImageIndex(newIndex);
      setNextImageIndex(null);
      setIsAnimating(false);
    }, 800);
  };

  const handleNextImage = () => {
    if (isAnimating) return;
    const newIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
    setNextImageIndex(newIndex);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentImageIndex(newIndex);
      setNextImageIndex(null);
      setIsAnimating(false);
    }, 800);
  };

  const handlePrevBudaya = () => {
    setCurrentBudayaIndex(currentBudayaIndex === 0 ? budayaItems.length - 1 : currentBudayaIndex - 1);
  };

  const handleNextBudaya = () => {
    setCurrentBudayaIndex(currentBudayaIndex === budayaItems.length - 1 ? 0 : currentBudayaIndex + 1);
  };

  return (
    <div className="app">
      {/* PillNav Header */}
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

      {/* Hero Section */}
      <main className="hero" id="home">
        <div className={`hero-content ${isAnimating ? 'animating' : ''}`}>
          {/* Left Side Content */}
          <div className="hero-left">
            <h1 className="hero-title">
              WELCOME TO<br />
              <span className="text-red">SEMARANG<br />SMART</span> CITY
            </h1>
            <div className="hero-divider"></div>
            <p className="hero-description">
              kota bersejarah dengan <strong>keaneka</strong> - ragaman<br />
              <strong>budaya</strong> dan <strong>tradisi</strong> yang masih lestari
            </p>
          </div>

          {/* Center Image */}
          <div className="hero-center">
            <div className="carousel-wrapper">
              {nextImageIndex === null ? (
                <img 
                  src={images[currentImageIndex]} 
                  alt="Carousel Image" 
                  className="hero-image"
                  fetchpriority="high"
                />
              ) : (
                <>
                  <img 
                    src={images[currentImageIndex]} 
                    alt="Current Image" 
                    className="hero-image fade-out"
                  />
                  <img 
                    src={images[nextImageIndex]} 
                    alt="Next Image" 
                    className="hero-image fade-in"
                  />
                </>
              )}
            </div>
          </div>

          {/* Right Side Content */}
          <div className={`hero-right ${isAnimating ? 'animating' : ''}`}>
            <div className="feature-item">
              <h2 className="feature-title">HISTORICAL</h2>
              <p className="feature-subtitle">Building & <strong>Culture</strong></p>
            </div>

            <div className="feature-item">
              <h2 className="feature-title text-red">MEMORABLE</h2>
              <p className="feature-subtitle text-red">National <strong className="text-red">hero</strong> figures</p>
            </div>

            <div className="feature-item">
              <h2 className="feature-title">INOVATING</h2>
              <p className="feature-subtitle">Technologies & <strong>Infrastructure</strong></p>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button className="arrow-btn arrow-left" aria-label="Previous" onClick={handlePrevImage}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="arrow-btn arrow-right" aria-label="Next" onClick={handleNextImage}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
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
      </main>

      {/* Welcome / Page 2 Section */}
      <section className="section welcome-section" id="welcome" ref={welcomeSectionRef}>
        <div className="welcome-content">
          <h2 className="welcome-text-1" ref={welcomeText1Ref}>
            <SplitText text="Selamat Menjelajah" className="split-line" />
          </h2>
          <h1 className="welcome-text-2" ref={welcomeText2Ref}>
            <SplitText text="Kota Semarang" className="split-line" colored />
          </h1>
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
        <div className="wisata-inovasi-header">
          <h2 className="wisata-inovasi-title">WISATA <span className="text-red" style={{ fontFamily: "'Caveat', cursive", fontSize: "1.3em", fontWeight: "700", textTransform: "capitalize", letterSpacing: "1px", padding: "0 4px" }}>Ikonik</span> SEMARANG</h2>
        </div>
        <div className="sticky-cards-wrapper z-10 relative">
          <StickyScrollCards />
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
                  <h2>Kota<br/>Semarang<br/>Dapur Inovasi<br/>Nusantara</h2>
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
                { title: "Aplikasi Stress Meter", desc: "Stress Meter, sebuah aplikasi berbasis website yang dirancang untuk membantu masyarakat mengidentifikasi tingkat stres secara mandiri. Melalui pengisian beberapa instrumen kuesioner yang valid, sistem akan langsung memetakan kondisi psikologis pengguna secara real-time.", src: "https://unkartur.ac.id/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-30-at-08.55.27.jpeg", link: "https://unkartur.ac.id/blog/2026/06/30/kolaborasi-dengan-brida-kota-semarang-universitas-karangturi-pamerkan-dua-inovasi-berbasis-web-di-jateng-fair-2026/" },
                { title: "Inovasi MOLISA (Mobil Listrik Karya Mahasiswa)", desc: "merupakan langkah nyata kolaborasi akademisi dalam mendorong pemanfaatan energi bersih serta ketahanan pangan perkotaan. di wilayah pesisir merupakan langkah nyata kolaborasi akademisi dalam mendorong pemanfaatan energi bersih serta ketahanan pangan perkotaan.", src: "https://cdn.antaranews.com/cache/1200x800/2026/06/11/pengembangan-mobil-listrik-tenaga-surya-110626-aaa-11.jpg.webp", link: "https://www.antaranews.com/foto/5603932/mahasiswa-unissula-kembangkan-mobil-listrik-tenaga-surya-ramah-lingkungan" },
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
                      <div className="w-full overflow-hidden bg-neutral-100 rounded-sm shadow-inner mb-4">
                        <img
                          src={item.src}
                          alt={item.title}
                          className="block w-full aspect-video object-cover hover:scale-110 transition-transform duration-700"
                          draggable={false} />
                      </div>
                      <h4 className="glow-card-title">{item.title}</h4>
                      <p className="glow-card-desc flex-grow mb-6">{item.desc}</p>
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="mt-auto self-end px-2 py-1 text-[11px] font-bold tracking-widest uppercase text-neutral-400 bg-transparent border-none cursor-pointer hover:text-white transition-colors z-10 no-underline"
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
      <section className="section" id="peta" style={{ background: '#f5fff0' }}>
        <div style={{ textAlign: 'center', maxWidth: '800px', padding: '2rem', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#e74c3c' }}>PETA</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#333' }}>
            Temukan lokasi berbagai tempat menarik dan penting di Semarang melalui peta interaktif kami.
          </p>
        </div>
      </section>
    </div>
  );
}

export default App