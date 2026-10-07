import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Briefcase, MapPin, Clock, ChevronRight } from 'lucide-react';

const experiences = [
  {
    title: 'Mern-Stack Developer Intern',
    company: 'Jnana Inventive',
    period: '4 Months (Completed)',
    description: 'Worked on real-time projects including Africa Duty Free (E-commerce Website) and BestRunners (Static Charity Website), focusing on responsive UI development and practical frontend implementation using modern web technologies.',
    technologies: ['Reactjs', 'Node.js', 'Express.js', 'MongoDB'],
    color: '#a855f7',
    glow: '#a855f7',
    icon: '🚀',
  },
  {
    title: 'Frontend Developer',
    company: 'VJM Technologies',
    period: '3 Months',
    description: 'Developed responsive static websites for colleges and schools while improving my frontend development and responsive design skills.',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    color: '#ec4899',
    glow: '#ec4899',
    icon: '💻',
  },
  {
    title: 'React JS / Next JS Developer',
    company: 'Cotyledon Technologies',
    period: '1 Year',
    description: 'Worked as a single developer on the Pick Your Slot product, handling frontend development for both Admin and Vendor modules. Built and maintained responsive React.js interfaces, identified and fixed a role-based access security issue using JWT role validation, and implemented UI and design updates.',
    technologies: ['ReactJS', 'NextJS', 'MUI', 'JavaScript', 'CSS3', 'Responsive Design'],
    color: '#61DAFB',
    glow: '#61DAFB',
    icon: '⚡',
  },
];

function ExperienceCard({ exp, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    setMousePos({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
  };

  const isLeft = index % 2 === 0;

  return (
    <div className={`flex items-center gap-4 md:gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}>

      {/* Card */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: isLeft ? -60 : 60, y: 20 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.15, type: 'spring', bounce: 0.3 }}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setMousePos({ x: 0.5, y: 0.5 }); }}
        className="flex-1 relative rounded-2xl overflow-hidden cursor-default"
        style={{ minHeight: 220 }}
      >
        {/* Animated conic beam border */}
        <motion.div
          animate={{
            opacity: hovered ? 1 : 0,
            background: [`conic-gradient(from 0deg at 50% 50%, ${exp.color}, transparent 60%, ${exp.color})`,
                         `conic-gradient(from 360deg at 50% 50%, ${exp.color}, transparent 60%, ${exp.color})`],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', inset: -1, borderRadius: 18, zIndex: 0 }}
        />

        {/* Spotlight */}
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', borderRadius: 16,
            background: hovered
              ? `radial-gradient(350px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, ${exp.color}18, transparent 65%)`
              : 'none',
            transition: 'background 0.1s',
          }}
        />

        {/* Scan beam */}
        <motion.div
          animate={hovered ? { x: ['-100%', '200%'] } : { x: '-100%' }}
          transition={{ duration: 1.6, ease: 'easeInOut', repeat: hovered ? Infinity : 0, repeatDelay: 1 }}
          style={{
            position: 'absolute', top: 0, bottom: 0, width: '35%', zIndex: 3, pointerEvents: 'none',
            background: `linear-gradient(90deg, transparent, ${exp.color}12, transparent)`,
          }}
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -15, 0], opacity: [0.15, 0.5, 0.15] }}
            transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, delay: i * 0.35, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              left: `${12 + i * 15}%`, top: `${15 + (i * 17) % 65}%`,
              width: i % 2 === 0 ? 3 : 2, height: i % 2 === 0 ? 3 : 2,
              borderRadius: '50%', background: exp.color,
              pointerEvents: 'none', zIndex: 1,
            }}
          />
        ))}

        {/* Card body */}
        <div
          className="relative z-10 p-6"
          style={{
            background: 'linear-gradient(135deg, #1a1025 0%, #2D1E2F 60%, #1e1228 100%)',
            border: `1px solid ${exp.color}30`,
            borderRadius: 16,
            boxShadow: hovered ? `0 12px 40px ${exp.glow}25` : '0 4px 20px rgba(0,0,0,0.4)',
            transition: 'box-shadow 0.3s',
          }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-3 gap-3">
            <div className="flex items-center gap-3">
              <motion.span
                animate={{ boxShadow: hovered ? `0 0 20px ${exp.glow}80` : `0 0 8px ${exp.glow}30` }}
                transition={{ duration: 0.3 }}
                className="text-2xl w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0"
                style={{ background: `${exp.color}18`, border: `1px solid ${exp.color}35` }}
              >
                {exp.icon}
              </motion.span>
              <div>
                <h3 className="text-lg font-black text-white leading-tight">{exp.title}</h3>
                <p className="font-semibold text-sm" style={{ color: exp.color }}>{exp.company}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Clock size={12} className="text-gray-500" />
              <span className="text-xs text-gray-400 whitespace-nowrap">{exp.period}</span>
            </div>
          </div>

          {/* Animated underline */}
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: '100%' } : {}}
            transition={{ delay: index * 0.15 + 0.4, duration: 0.8 }}
            style={{ height: 1, background: `linear-gradient(to right, ${exp.color}80, transparent)`, marginBottom: 12, borderRadius: 1 }}
          />

          <p className="text-gray-400 text-sm leading-relaxed mb-4">{exp.description}</p>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-2">
            {exp.technologies.map((tech, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.15 + 0.5 + i * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-3 py-1 rounded-full text-xs font-semibold cursor-default"
                style={{
                  background: `${exp.color}15`,
                  border: `1px solid ${exp.color}35`,
                  color: exp.color,
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Timeline node — hidden on mobile */}
      <div className="hidden md:flex flex-shrink-0 flex-col items-center" style={{ width: 40 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.2, type: 'spring', bounce: 0.5 }}
          className="relative"
        >
          <motion.div
            animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.5 }}
            style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: `2px solid ${exp.color}` }}
          />
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-black z-10 relative"
            style={{
              background: `linear-gradient(135deg, ${exp.color}30, ${exp.color}10)`,
              border: `2px solid ${exp.color}`,
              boxShadow: `0 0 20px ${exp.glow}50`,
            }}
          >
            {index + 1}
          </div>
        </motion.div>
      </div>

      {/* Spacer for alternating layout */}
      <div className="flex-1 hidden md:block" />
    </div>
  );
}

export default function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="mb-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-12"
      >
        <Briefcase className="w-8 h-8 text-pink-400" />
        <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Experience
        </h2>
      </motion.div>

      <div ref={containerRef} className="relative">
        {/* Animated vertical timeline line */}
        <div
          className="absolute hidden md:block"
          style={{ left: '50%', top: 0, bottom: 0, width: 2, transform: 'translateX(-50%)', background: 'rgba(168,85,247,0.1)', zIndex: 0 }}
        >
          <motion.div
            style={{ height: lineHeight, background: 'linear-gradient(to bottom, #a855f7, #ec4899, #61DAFB)', width: '100%', borderRadius: 2 }}
          />
        </div>

        <div className="flex flex-col gap-12 relative z-10">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
