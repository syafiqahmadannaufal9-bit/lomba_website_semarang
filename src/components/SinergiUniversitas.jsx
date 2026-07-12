import { motion } from "framer-motion";
import { TextRepel } from "@/components/ui/text-repel";

export function SinergiUniversitas() {
  const p1 = "Pemerintah Kota Semarang secara aktif menempatkan perguruan tinggi lokal bukan sekadar sebagai lembaga pencetak lulusan, melainkan sebagai mitra strategis utama dalam merumuskan kebijakan berbasis data dan menciptakan solusi yang tepat sasaran.";
  const p2 = "Kolaborasi ini melahirkan ekosistem yang saling menguntungkan (mutualistik). Dari ruang riset dan laboratorium kampus, lahir berbagai kajian ilmiah, teknologi tata kota, hingga inovasi kecerdasan buatan (artificial intelligence). Pemerintah kota kemudian hadir untuk menjembatani hasil riset tersebut agar dapat diuji coba dan diterapkan secara nyata pada sistem pelayanan masyarakat. Sinergi dinamis inilah yang mempercepat transformasi Semarang menjadi Smart City terdepan, sekaligus menjadi bukti nyata bagaimana dunia akademik dan birokrasi dapat berjalan beriringan demi meningkatkan kualitas hidup warganya.";

  return (
    <div className="w-full min-h-[90vh] flex items-center justify-center relative z-10 px-6">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-4xl mx-auto text-center flex flex-col items-center gap-6"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-center mb-4">
          Sinergi Universitas & Pemerintah
        </h2>
        
        <TextRepel 
          text={p1} 
          className="text-lg md:text-xl text-neutral-300 leading-relaxed max-w-3xl text-center justify-center"
        />
        
        <TextRepel 
          text={p2} 
          className="text-lg md:text-xl text-neutral-300 leading-relaxed max-w-3xl text-center justify-center pt-2"
        />
      </motion.div>
    </div>
  );
}
