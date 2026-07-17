import { useEffect, useRef, useState } from "react";
import Folder from "./Folder";

// Lightweight reveal hook using Intersection Observer (no Framer Motion overhead)
function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect(); // once — no need to keep observing
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export function SinergiUniversitas() {
  const p1 = "Pemerintah Kota Semarang secara aktif menempatkan perguruan tinggi lokal bukan sekadar sebagai lembaga pencetak lulusan, melainkan sebagai mitra strategis utama dalam merumuskan kebijakan berbasis data dan menciptakan solusi yang tepat sasaran.";
  const p2 = "Kolaborasi ini melahirkan ekosistem yang saling menguntungkan (mutualistik). Dari ruang riset dan laboratorium kampus, lahir berbagai kajian ilmiah, teknologi tata kota, hingga inovasi kecerdasan buatan (artificial intelligence). Pemerintah kota kemudian hadir untuk menjembatani hasil riset tersebut agar dapat diuji coba dan diterapkan secara nyata pada sistem pelayanan masyarakat. Sinergi dinamis inilah yang mempercepat transformasi Semarang menjadi Smart City terdepan, sekaligus menjadi bukti nyata bagaimana dunia akademik dan birokrasi dapat berjalan beriringan demi meningkatkan kualitas hidup warganya.";

  const [containerRef, isVisible] = useReveal(0.15);

  const folderItems = [
    <img key="1" src="https://unkartur.ac.id/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-30-at-08.55.27.jpeg" alt="Undip" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />,
    <img key="2" src="https://awsimages.detik.net.id/community/media/visual/2024/11/29/gelar-karya-inovasi-mahasiswa-dan-pelajar-di-semarang-1_169.jpeg?w=700&q=90" alt="Unnes" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />,
    <img key="3" src="https://koranbernas.id/uploads/images/202512/image_870x_69384e238b8e0.jpg" alt="Udinus" style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#fff', borderRadius: '10px' }} />,
  ];

  return (
    <div
      className="w-full min-h-[70vh] flex flex-col lg:flex-row items-center justify-between relative z-10 py-16 px-6 sm:px-10 lg:px-16 sinergi-section-container gap-12"
    >
      <div
        ref={containerRef}
        className="w-full lg:w-3/5 max-w-3xl text-left flex flex-col items-start gap-6"
      >
        {/* Heading — word-split kept (short text, acceptable) */}
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-left mb-4 sinergi-reveal"
          style={{
            '--delay': '0ms',
            animation: isVisible ? 'sinergiReveal 0.7s cubic-bezier(0.22,1,0.36,1) both' : 'none',
          }}
        >
          Sinergi Universitas &amp; Pemerintah
        </h2>

        {/* Paragraph 1 — single block reveal, no per-word motion */}
        <p
          className="text-lg md:text-xl text-neutral-300 leading-relaxed text-left"
          style={{
            animation: isVisible ? 'sinergiReveal 0.75s 0.12s cubic-bezier(0.22,1,0.36,1) both' : 'none',
          }}
        >
          {p1}
        </p>

        {/* Paragraph 2 */}
        <p
          className="text-lg md:text-xl text-neutral-300 leading-relaxed text-left pt-2"
          style={{
            animation: isVisible ? 'sinergiReveal 0.75s 0.24s cubic-bezier(0.22,1,0.36,1) both' : 'none',
          }}
        >
          {p2}
        </p>
      </div>

      <div 
        className="w-full lg:w-2/5 flex justify-center items-center mt-12 lg:mt-0"
        style={{
          animation: isVisible ? 'sinergiReveal 0.75s 0.36s cubic-bezier(0.22,1,0.36,1) both' : 'none',
          opacity: 0
        }}
      >
        <Folder size={3} color="#b33939" items={folderItems} />
      </div>
    </div>
  );
}
