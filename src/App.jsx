import { useState } from 'react'
import PillNav from './PillNav'
import './App.css'

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

function App() {
  // Carousel state - isi array dengan gambar Anda sendiri
  const [images] = useState([
    '/assets/Tugumuda.png',
    '/assets/ChengHo_wisata.png',
    // Tambahkan gambar lain di sini
    // '/assets/gambar2.png',
    // '/assets/gambar3.png',
  ]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

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
      <main className="hero">
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
    </div>
  );
}

export default App