import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import { Code2, Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Developed a responsive e-commerce web application with product listing, user authentication, and cart functionality.',
    technologies: ['ReactJS', 'ExpressJs', 'MongoDB', 'Redux'],
    github: 'https://github.com/saravananvimal0608/ecommerce-front-end',
    live: 'https://ecommerce-front-end-inky.vercel.app/',
    image: 'https://picsum.photos/seed/ecommerce/800/600',
    color: '#a855f7',
  },
  {
    title: 'Todo List Application',
    description: 'Full-stack Todo app with separate Admin and User dashboards, authentication and Redux-based state management.',
    technologies: ['ReactJS', 'ExpressJs', 'MongoDB'],
    github: '#',
    live: '#',
    image: 'https://picsum.photos/seed/todo/800/600',
    color: '#ec4899',
  },
  {
    title: 'YouTube Clone',
    description: 'Static YouTube clone replicating the core UI layout with video thumbnails and responsive structure using YouTube API.',
    technologies: ['ReactJS', 'HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/saravananvimal0608/youtube-clone',
    live: 'https://myapp-gilt-six.vercel.app/',
    image: 'https://picsum.photos/seed/youtube/800/600',
    color: '#61DAFB',
  },
  {
    title: 'Real Estate Website',
    description: 'Responsive static real estate website using reusable React components with clean UI and mobile-friendly design.',
    technologies: ['ReactJS', 'HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/saravananvimal0608/Real-Estate-Website',
    live: 'https://real-estate-website-13tm-git-main-saravananvimal0608s-projects.vercel.app/',
    image: 'https://picsum.photos/seed/realestate/800/600',
    color: '#f59e0b',
  },
];

const CARD_WIDTH = 300;
const CARD_GAP = 16;
const STEP = CARD_WIDTH + CARD_GAP;

function AccordionGallery() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex gap-2 h-[480px] rounded-2xl overflow-hidden">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          onClick={() => setActive(index)}
          animate={{ flex: active === index ? 5 : 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative cursor-pointer overflow-hidden rounded-2xl"
          style={{ minWidth: 0 }}
        >
          <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

          <AnimatePresence>
            {active !== index && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="text-white font-bold text-sm whitespace-nowrap rotate-90 tracking-widest uppercase opacity-80">
                  {project.title}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {active === index && (
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.35, delay: 0.15 }}
                className="absolute bottom-0 left-0 right-0 p-6"
              >
                <h3 className="text-2xl font-bold text-pink-400 mb-2">{project.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-gradient-to-r from-pink-500/30 to-purple-500/30 border border-pink-500/40 rounded-full text-xs text-pink-300">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a href={project.github} onClick={e => e.stopPropagation()} className="flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors text-sm">
                    <Github className="w-4 h-4" /> Code
                  </a>
                  <a href={project.live} onClick={e => e.stopPropagation()} className="flex items-center gap-2 text-pink-300 hover:text-pink-200 transition-colors text-sm">
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

function Carousel() {
  const [current, setCurrent] = useState(0);
  const x = useMotionValue(0);

  const goTo = (index) => {
    const clamped = Math.max(0, Math.min(projects.length - 1, index));
    setCurrent(clamped);
    animate(x, -clamped * STEP, { type: 'spring', stiffness: 300, damping: 30 });
  };

  const onDragEnd = (_, info) => {
    if (info.offset.x < -50) goTo(current + 1);
    else if (info.offset.x > 50) goTo(current - 1);
    else goTo(current);
  };

  return (
    <div>
      <div className="overflow-hidden rounded-2xl" style={{ cursor: 'grab' }}>
        <motion.div
          drag="x"
          dragConstraints={{ left: -(projects.length - 1) * STEP, right: 0 }}
          dragElastic={0.1}
          onDragEnd={onDragEnd}
          style={{ x, display: 'flex', gap: CARD_GAP, width: projects.length * STEP }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              animate={{ scale: current === index ? 1 : 0.93, opacity: current === index ? 1 : 0.5 }}
              transition={{ duration: 0.4 }}
              style={{ width: CARD_WIDTH, flexShrink: 0 }}
              className="relative rounded-2xl overflow-hidden"
            >
              {current === index && (
                <motion.div
                  animate={{
                    background: [
                      `conic-gradient(from 0deg at 50% 50%, ${project.color}, transparent, ${project.color})`,
                      `conic-gradient(from 360deg at 50% 50%, ${project.color}, transparent, ${project.color})`,
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  style={{ position: 'absolute', inset: -1, borderRadius: 18, zIndex: 0 }}
                />
              )}
              <div className="relative z-10 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a1025, #2D1E2F)', border: `1px solid ${project.color}25` }}>
                <div className="relative h-44 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" draggable={false} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #1a1025 0%, transparent 60%)' }} />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold" style={{ background: `${project.color}25`, color: project.color, border: `1px solid ${project.color}40` }}>
                    {index + 1} / {projects.length}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-black text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-2 py-1 rounded-full text-xs font-semibold" style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}30` }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a href={project.github} onClick={e => e.stopPropagation()} className="flex items-center gap-2 text-sm font-semibold" style={{ color: project.color }}>
                      <Github size={15} /> Code
                    </a>
                    <a href={project.live} onClick={e => e.stopPropagation()} className="flex items-center gap-2 text-sm font-semibold text-pink-400 hover:text-pink-300 transition-colors">
                      <ExternalLink size={15} /> Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Dots + arrows */}
      <div className="flex items-center justify-center gap-4 mt-5">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => goTo(current - 1)} disabled={current === 0}
          className="w-8 h-8 rounded-full flex items-center justify-center border border-purple-500/30 text-purple-400 disabled:opacity-30"
          style={{ background: 'rgba(168,85,247,0.1)' }}>
          <ChevronLeft size={16} />
        </motion.button>

        <div className="flex gap-2">
          {projects.map((p, i) => (
            <motion.button key={i} onClick={() => goTo(i)}
              animate={{ width: current === i ? 20 : 8, background: current === i ? p.color : 'rgba(168,85,247,0.3)' }}
              transition={{ duration: 0.3 }}
              style={{ height: 8, borderRadius: 4, border: 'none', cursor: 'pointer' }}
            />
          ))}
        </div>

        <motion.button whileTap={{ scale: 0.9 }} onClick={() => goTo(current + 1)} disabled={current === projects.length - 1}
          className="w-8 h-8 rounded-full flex items-center justify-center border border-purple-500/30 text-purple-400 disabled:opacity-30"
          style={{ background: 'rgba(168,85,247,0.1)' }}>
          <ChevronRight size={16} />
        </motion.button>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="mb-20">
      <div className="flex items-center gap-3 mb-10">
        <Code2 className="w-8 h-8 text-purple-400" />
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Projects
        </h2>
      </div>

      {/* Desktop: Accordion */}
      <div className="hidden md:block">
        <AccordionGallery />
      </div>

      {/* Mobile: Carousel */}
      <div className="md:hidden">
        <Carousel />
      </div>
    </section>
  );
}
