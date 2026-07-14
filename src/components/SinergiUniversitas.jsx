import { motion } from "framer-motion";

export function SinergiUniversitas() {
  const p1 = "Pemerintah Kota Semarang secara aktif menempatkan perguruan tinggi lokal bukan sekadar sebagai lembaga pencetak lulusan, melainkan sebagai mitra strategis utama dalam merumuskan kebijakan berbasis data dan menciptakan solusi yang tepat sasaran.";
  const p2 = "Kolaborasi ini melahirkan ekosistem yang saling menguntungkan (mutualistik). Dari ruang riset dan laboratorium kampus, lahir berbagai kajian ilmiah, teknologi tata kota, hingga inovasi kecerdasan buatan (artificial intelligence). Pemerintah kota kemudian hadir untuk menjembatani hasil riset tersebut agar dapat diuji coba dan diterapkan secara nyata pada sistem pelayanan masyarakat. Sinergi dinamis inilah yang mempercepat transformasi Semarang menjadi Smart City terdepan, sekaligus menjadi bukti nyata bagaimana dunia akademik dan birokrasi dapat berjalan beriringan demi meningkatkan kualitas hidup warganya.";

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.015,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 120,
      },
    },
  };

  return (
    <div className="w-full min-h-[70vh] flex items-center justify-start relative z-10 py-16 sinergi-section-container">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="w-full max-w-3xl text-left flex flex-col items-start gap-6"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-left mb-4">
          {"Sinergi Universitas & Pemerintah".split(" ").map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              style={{ display: "inline-block", marginRight: "0.35em" }}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <motion.p className="text-lg md:text-xl text-neutral-300 leading-relaxed text-left">
          {p1.split(" ").map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              style={{ display: "inline-block", marginRight: "0.35em" }}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>

        <motion.p className="text-lg md:text-xl text-neutral-300 leading-relaxed text-left pt-2">
          {p2.split(" ").map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              style={{ display: "inline-block", marginRight: "0.35em" }}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>
      </motion.div>
    </div>
  );
}
