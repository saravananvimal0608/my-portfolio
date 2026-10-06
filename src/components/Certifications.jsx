import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, BadgeCheck, Building2, Calendar } from 'lucide-react';

const certifications = [
  { name: 'Java Full Stack',              issuer: 'Intellisense Academy', year: '2025', color: '#f59e0b', glow: '#f59e0b' },
  { name: 'Mern-Stack Developer Intern',  issuer: 'Jnana Inventive',      year: '2025', color: '#10b981', glow: '#10b981' },
  { name: 'ReactJS / NextJS Developer',   issuer: 'Cotyledon Technologies',year: '2026', color: '#61DAFB', glow: '#61DAFB' },
];

function HoloCard({ cert, index }) {
  const [flipped, setFlipped] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const tiltX = (mousePos.y - 0.5) * -20;
  const tiltY = (mousePos.x - 0.5) * 20;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.7, type: 'spring', bounce: 0.3 }}
      style={{ perspective: 800 }}
      onClick={() => setFlipped(f => !f)}
      onMouseMove={onMove}
      onMouseLeave={() => setMousePos({ x: 0.5, y: 0.5 })}
      className="cursor-pointer"
    >
      <motion.div
        animate={{
          rotateY: flipped ? 180 : 0,
          rotateX: flipped ? 0 : tiltX,
          rotateZ: flipped ? 0 : tiltY * 0.1,
        }}
        transition={{ duration: 0.6, type: 'spring', bounce: 0.2 }}
        style={{ transformStyle: 'preserve-3d', position: 'relative', height: 200 }}
      >
        {/* FRONT */}
        <div
          style={{ backfaceVisibility: 'hidden', position: 'absolute', inset: 0 }}
          className="rounded-2xl overflow-hidden"
        >
          {/* Holographic shimmer */}
          <div
            style={{
              position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', borderRadius: 16,
              background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
            }}
          />
          <div
            style={{
              position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
              background: `linear-gradient(${mousePos.x * 360}deg, rgba(168,85,247,0.15), rgba(236,72,153,0.1), rgba(99,102,241,0.15))`,
              mixBlendMode: 'overlay',
            }}
          />

          <div
            className="relative z-10 h-full p-6 flex flex-col justify-between"
            style={{
              background: `linear-gradient(135deg, #1e1228, #2D1E2F)`,
              border: `1px solid ${cert.color}40`,
              boxShadow: `0 0 30px ${cert.glow}20, inset 0 0 30px rgba(0,0,0,0.3)`,
              borderRadius: 16,
            }}
          >
            <div className="flex justify-between items-start">
              <motion.div
                animate={{ boxShadow: `0 0 20px ${cert.glow}60` }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
                className="p-3 rounded-xl"
                style={{ background: `${cert.color}20`, border: `1px solid ${cert.color}40` }}
              >
                <Award size={28} style={{ color: cert.color }} />
              </motion.div>
              <span
                className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: `${cert.color}20`, color: cert.color, border: `1px solid ${cert.color}40` }}
              >
                {cert.year}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-black text-white mb-1 leading-tight">{cert.name}</h3>
              <p className="text-sm font-medium" style={{ color: cert.color }}>{cert.issuer}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                    style={{ width: 6, height: 6, borderRadius: '50%', background: cert.color }}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">Click to flip</span>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          style={{ backfaceVisibility: 'hidden', position: 'absolute', inset: 0, transform: 'rotateY(180deg)' }}
          className="rounded-2xl overflow-hidden"
        >
          <div
            className="h-full p-6 flex flex-col justify-center items-center gap-4"
            style={{
              background: `linear-gradient(135deg, ${cert.color}15, #1e1228, ${cert.color}10)`,
              border: `1px solid ${cert.color}50`,
              borderRadius: 16,
              boxShadow: `0 0 40px ${cert.glow}30`,
            }}
          >
            <BadgeCheck size={48} style={{ color: cert.color }} />
            <div className="text-center">
              <p className="text-white font-black text-lg mb-1">{cert.name}</p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-1">
                <Building2 size={14} />
                <span>{cert.issuer}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm" style={{ color: cert.color }}>
                <Calendar size={14} />
                <span>{cert.year}</span>
              </div>
            </div>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="px-4 py-1.5 rounded-full text-xs font-bold"
              style={{ background: `${cert.color}25`, color: cert.color, border: `1px solid ${cert.color}50` }}
            >
              ✓ Certified
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Certifications() {
  return (
    <section className="mb-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-10"
      >
        <Award className="w-8 h-8 text-purple-400" />
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Certifications
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {certifications.map((cert, index) => (
          <HoloCard key={index} cert={cert} index={index} />
        ))}
      </div>
    </section>
  );
}
