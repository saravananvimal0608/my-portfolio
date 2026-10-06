import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Star } from 'lucide-react';

const education = [
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'SRM Institute of Science and Technology',
    year: '2024',
    details: 'CGPA: 7.5 / 10',
  },
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Madras University',
    year: 'Pursuing',
    details: 'null',
  },
];

function SpotlightCard({ edu, index }) {
  const cardRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  // Floating particles
  const particles = Array.from({ length: 12 }, (_, i) => i);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.7, type: 'spring', bounce: 0.3 }}
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden border border-purple-800/40 cursor-default flex-1"
      style={{ background: 'linear-gradient(135deg, #1e1228 0%, #2D1E2F 50%, #1a1025 100%)' }}
    >
      {/* Spotlight glow */}
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: hovered
            ? `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(168,85,247,0.12), transparent 60%)`
            : 'none',
          transition: 'background 0.1s',
          zIndex: 1,
        }}
      />

      {/* Animated scan beam */}
      <motion.div
        animate={{ x: hovered ? ['−100%', '200%'] : '-100%' }}
        transition={{ duration: 1.4, ease: 'easeInOut', repeat: hovered ? Infinity : 0, repeatDelay: 0.8 }}
        style={{
          position: 'absolute', top: 0, bottom: 0, width: '40%',
          background: 'linear-gradient(90deg, transparent, rgba(199,125,255,0.07), transparent)',
          pointerEvents: 'none', zIndex: 2,
        }}
      />

      {/* Floating particles */}
      {particles.map((i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.sin(i) * 10, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            left: `${8 + (i * 8) % 90}%`,
            top: `${10 + (i * 13) % 80}%`,
            width: i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
            borderRadius: '50%',
            background: i % 2 === 0 ? '#a855f7' : '#ec4899',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 p-8">
        {/* Top row */}
        <div className="flex items-start justify-between mb-6">
          <motion.div
            animate={{ rotate: hovered ? 360 : 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="p-4 rounded-2xl"
            style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(236,72,153,0.2))', border: '1px solid rgba(168,85,247,0.3)' }}
          >
            <GraduationCap className="w-10 h-10 text-purple-400" />
          </motion.div>

          <div className="flex flex-col items-end gap-2">
            <motion.span
              animate={{ boxShadow: hovered ? '0 0 20px rgba(168,85,247,0.5)' : '0 0 0px transparent' }}
              className="px-4 py-1.5 rounded-full text-sm font-bold text-purple-200"
              style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.25), rgba(236,72,153,0.25))', border: '1px solid rgba(168,85,247,0.4)' }}
            >
              {edu.year}
            </motion.span>
            {edu.year !== 'Pursuing' && (
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Degree */}
        <h3 className="text-2xl font-black text-white mb-2 leading-tight">{edu.degree}</h3>

        {/* Animated underline */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '60%' }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="h-0.5 mb-4 rounded-full"
          style={{ background: 'linear-gradient(to right, #a855f7, #ec4899, transparent)' }}
        />

        <p className="text-lg text-purple-300 font-semibold mb-3">{edu.institution}</p>

        {/* CGPA bar — only show if details exist */}
        {edu.details && edu.details !== 'null' && (
          <div className="mt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-400 text-sm">CGPA</span>
              <span className="text-pink-400 font-bold text-sm">{edu.details.replace('CGPA: ', '')}</span>
            </div>
            <div className="h-2 rounded-full bg-purple-900/40 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '75%' }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 1.2, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(to right, #a855f7, #ec4899)' }}
              />
            </div>
          </div>
        )}

        {/* Pursuing badge */}
        {edu.year === 'Pursuing' && (
          <div className="mt-4 flex items-center gap-2">
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-green-400"
            />
            <span className="text-green-400 text-sm font-semibold">Currently Pursuing</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Education() {
  return (
    <section className="mb-20">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-10"
      >
        <GraduationCap className="w-8 h-8 text-pink-400" />
        <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Education
        </h2>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-6 w-full">
        {education.map((edu, index) => (
          <SpotlightCard key={index} edu={edu} index={index} />
        ))}
      </div>
    </section>
  );
}
