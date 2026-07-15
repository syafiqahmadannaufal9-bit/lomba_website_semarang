import { useEffect, useRef, useState } from "react";

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

  return (
    <div
      className="w-full min-h-[70vh] flex items-center justify-start relative z-10 py-16 sinergi-section-container"
    >
      <div
        ref={containerRef}
        className="w-full max-w-3xl text-left flex flex-col items-start gap-6"
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
    </div>
  );
}
