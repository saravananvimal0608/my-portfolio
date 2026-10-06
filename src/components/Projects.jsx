import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Developed a responsive e-commerce web application with product listing, user authentication, and cart functionality.',
    technologies: ['ReactJS', 'Express.js', 'MongoDB'],
    github: 'https://github.com/saravananvimal0608/ecommerce-front-end',
    live: 'https://ecommerce-front-end-inky.vercel.app/',
    image: 'https://picsum.photos/seed/ecommerce/800/600',
  },
  {
    title: 'Todo List Application',
    description: 'Full-stack Todo app with separate Admin and User dashboards, authentication and Redux-based state management.',
    technologies: ['ReactJS', 'Express.js', 'MongoDB', 'Redux'],
    github: '#',
    live: '#',
    image: 'https://picsum.photos/seed/todo/800/600',
  },
  {
    title: 'YouTube Clone',
    description: 'Static YouTube clone replicating the core UI layout with video thumbnails and responsive structure using YouTube API.',
    technologies: ['ReactJS', 'HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/saravananvimal0608/youtube-clone',
    live: 'https://myapp-gilt-six.vercel.app/',
    image: 'https://picsum.photos/seed/youtube/800/600',
  },
  {
    title: 'Real Estate Website',
    description: 'Responsive static real estate website using reusable React components with clean UI and mobile-friendly design.',
    technologies: ['ReactJS', 'HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/saravananvimal0608/Real-Estate-Website',
    live: 'https://real-estate-website-13tm-git-main-saravananvimal0608s-projects.vercel.app/',
    image: 'https://picsum.photos/seed/realestate/800/600',
  },
];

export default function Projects() {
  const [active, setActive] = useState(0);

  return (
    <section className="mb-20">
      <div className="flex items-center gap-3 mb-10">
        <Code2 className="w-8 h-8 text-purple-400" />
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Projects
        </h2>
      </div>

      {/* Accordion Gallery */}
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
            {/* Background image */}
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

            {/* Collapsed label — rotated title */}
            <AnimatePresence>
              {active !== index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="text-white font-bold text-sm whitespace-nowrap rotate-90 tracking-widest uppercase opacity-80">
                    {project.title}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Expanded content */}
            <AnimatePresence>
              {active === index && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.35, delay: 0.15 }}
                  className="absolute bottom-0 left-0 right-0 p-6"
                >
                  <h3 className="text-2xl font-bold text-pink-400 mb-2">{project.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gradient-to-r from-pink-500/30 to-purple-500/30 border border-pink-500/40 rounded-full text-xs text-pink-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      onClick={e => e.stopPropagation()}
                      className="flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors text-sm"
                    >
                      <Github className="w-4 h-4" /> Code
                    </a>
                    <a
                      href={project.live}
                      onClick={e => e.stopPropagation()}
                      className="flex items-center gap-2 text-pink-300 hover:text-pink-200 transition-colors text-sm"
                    >
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
