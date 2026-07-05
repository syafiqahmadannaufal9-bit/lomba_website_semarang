import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PillNav from './PillNav'
import './App.css'

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Wisata", href: "#wisata" },
  { label: "Budaya", href: "#budaya" },
  { label: "Kuliner", href: "#kuliner" },
  { label: "Sejarah", href: "#sejarah" },
  { label: "Teknologi", href: "#teknologi" },
  { label: "Peta", href: "#peta" },
];

// Create inline SVG logo for Semarang
const semarangLogo = `data:image/svg+xml,${encodeURIComponent(`
  <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#e74c3c"/>
    <circle cx="50" cy="35" r="5" fill="white"/>
    <circle cx="50" cy="50" r="5" fill="white"/>
    <circle cx="50" cy="65" r="5" fill="white"/>
    <text x="50" y="85" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">SMG</text>
  </svg>
`)}`;

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

  // Refs for GSAP Welcome Section (Page 2)
  const welcomeSectionRef = useRef(null);
  const welcomeText1Ref = useRef(null);
  const welcomeText2Ref = useRef(null);
  const shapesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ScrollTrigger timeline for smooth reveal from bottom
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: welcomeSectionRef.current,
          start: "top 75%",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
        delay: 1.2
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

      {/* Wisata Section */}
      <section className="section" id="wisata" style={{ background: '#fff5e6' }}>
        <div style={{ textAlign: 'center', maxWidth: '800px', padding: '2rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#e74c3c' }}>WISATA</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#333' }}>
            Jelajahi destinasi wisata menarik di Semarang dengan berbagai atraksi budaya, pantai, dan tempat bersejarah yang menakjubkan.
          </p>
        </div>
      </section>

      {/* Budaya Section */}
      <section className="section" id="budaya" style={{ background: '#ffffff', padding: '3rem 2rem' }}>
        <div style={{ width: '100%', maxWidth: '1200px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#e74c3c', textAlign: 'center' }}>BUDAYA</h2>
          <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#666', textAlign: 'center', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem' }}>
            Semarang kaya dengan tradisi dan budaya lokal yang telah diwariskan turun-temurun oleh generasi sebelumnya.
          </p>
          
          <div className="budaya-carousel-container">
            {/* Carousel Items */}
            <div className="budaya-carousel" style={{ transform: `translateX(-${currentBudayaIndex * 100}%)` }}>
              {budayaItems.map((item) => (
                <div key={item.id} className="budaya-card">
                  <div className="budaya-card-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="budaya-card-content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button className="budaya-nav-btn budaya-nav-prev" onClick={handlePrevBudaya}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="budaya-nav-btn budaya-nav-next" onClick={handleNextBudaya}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Indicators */}
          <div className="budaya-indicators">
            {budayaItems.map((_, index) => (
              <button
                key={index}
                className={`budaya-indicator ${index === currentBudayaIndex ? 'active' : ''}`}
                onClick={() => setCurrentBudayaIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Kuliner Section */}
      <section className="section" id="kuliner" style={{ background: '#fff0f5' }}>
        <div style={{ textAlign: 'center', maxWidth: '800px', padding: '2rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#e74c3c' }}>KULINER</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#333' }}>
            Nikmati cita rasa autentik makanan khas Semarang yang lezat dan menggugah selera dari berbagai warung hingga restoran ternama.
          </p>
        </div>
      </section>

      {/* Sejarah Section */}
      <section className="section" id="sejarah" style={{ background: '#e6f7ff' }}>
        <div style={{ textAlign: 'center', maxWidth: '800px', padding: '2rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#e74c3c' }}>SEJARAH</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#333' }}>
            Pelajari sejarah panjang Semarang sebagai kota pelabuhan yang menjadi saksi perjalanan bangsa Indonesia.
          </p>
        </div>
      </section>

      {/* Teknologi Section */}
      <section className="section" id="teknologi" style={{ background: '#f0f5ff' }}>
        <div style={{ textAlign: 'center', maxWidth: '800px', padding: '2rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#e74c3c' }}>TEKNOLOGI</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#333' }}>
            Semarang terus berinovasi dengan teknologi terkini untuk menciptakan kota yang lebih smart dan berkelanjutan.
          </p>
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