import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PillNav from './components/PillNav'
import GridMotion from './components/GridMotion'
import { StickyScrollCards } from '@/components/ui/sticky-scroll-cards'
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
      description: 'Tradisi unik perayaan Ramadan dengan arak-arakan boneka raksasa yang meriah',
      image: '/assets/dugderan_budaya.png'
    },
    {
      id: 2,
      title: 'Seni Gambang',
      description: 'Musik tradisional Jawa dengan instrumen gamelan khas Semarang',
      image: '/assets/Gambang_budaya.png'
    },
    {
      id: 3,
      title: 'Terbang Kolong',
      description: 'Seni musik tradisional dengan alat musik perkusi yang dimainkan secara bersamaan',
      image: '/assets/Terbang_budaya.png'
    },
    {
      id: 4,
      title: 'Wayang Kulit',
      description: 'Seni pertunjukan wayang tradisional yang menceritakan kisah-kisah dari Ramayana dan Mahabharata',
      image: '/assets/Wayang_budaya.png'
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
                        <img src={item.image} alt={item.title} />
                        <div className="budaya-card-overlay"></div>
                      </div>
                      <div className="budaya-card-content">
                        <h3>{item.title}</h3>
                        <div className="budaya-card-details">
                          <hr className="budaya-card-divider" />
                          <p>{item.description}</p>
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
          <img src="/assets/herotek.jpeg" alt="Semarang Kota Teknologi" className="teknologi-bg-image" />
          <div className="teknologi-gradient-top"></div>
          <div className="teknologi-gradient-bottom"></div>
          
          <div className="teknologi-content-wrapper">
            <div className="teknologi-content-inner">
              <div className="teknologi-line" ref={teknologiLineRef}></div>
              <div className="teknologi-content-bottom" ref={teknologiContentRef}>
                <div className="teknologi-title-col">
                  <h2>Semarang<br/>Dapur Inovasi<br/>Nusantara</h2>
                </div>
                <div className="teknologi-desc-col">
                  <p>
                    Sebagai kota yang dinamis, Semarang terus berinovasi dan mengintegrasikan teknologi terkini untuk menciptakan kota cerdas yang berkelanjutan. Menjadi percontohan transformasi digital, Semarang memfasilitasi berbagai ruang kolaborasi yang siap mencetak generasi inovator masa depan bagi nusantara.
                  </p>
                  <p>
                    Melalui inisiatif Semarang Smart City, berbagai layanan publik kini dapat diakses secara terpadu. Infrastruktur cerdas dan pemanfaatan data besar memberikan kemudahan bagi masyarakat, mengukuhkan Semarang sebagai pelopor inovasi berkelas global.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Part: Empty Tech Space with Logo Marquee */}
        <div className="teknologi-tech-part">
          <div className="tech-ornaments">
            <div className="tech-grid"></div>
            <div className="tech-glow"></div>
            <div className="tech-dots"></div>
          </div>

          <div className="sticky-cards-wrapper z-10 relative">
            <StickyScrollCards />
          </div>
        </div>

        {/* University Logos Marquee - Separate from scroll area */}
        <div className="univ-marquee-section">
          <div className="univ-marquee-container">
            <div className="univ-marquee-track">
              {/* Duplicate sets for infinite scroll effect */}
              {[0, 1].map((setIdx) => (
                <div key={setIdx} className="univ-marquee-set" aria-hidden={setIdx > 0 ? "true" : "false"}>
                  {[
                    '/assets/polines.png',
                    '/assets/scu.png',
                    '/assets/udinus.png',
                    '/assets/uin.png',
                    '/assets/unimus.png',
                    '/assets/unisbank.png',
                    '/assets/unisula.jpeg',
                    '/assets/unnes.png',
                    '/assets/unwahas.png'
                  ].map((logo, idx) => (
                    <div key={idx} className="univ-logo-card">
                      <img src={logo} alt={`University Logo ${idx}`} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Peta Section */}
      <section className="section" id="peta" style={{ background: '#f5fff0' }}>
        <div style={{ textAlign: 'center', maxWidth: '800px', padding: '2rem' }}>
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