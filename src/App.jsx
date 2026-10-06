import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Code, Download } from 'lucide-react';
import TechLoader from './components/TechLoader';
import Navbar from './components/Navbar';
import CareerObjective from './components/CareerObjective';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Skills from './components/Skills';
// import Strengths from './components/Strengths';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import profileImage from './assets/Profile-img.jpeg';
import resume from './assets/SARAVANAN-VIMAL-RESUME.pdf'
import Antigravity from './components/Antigravity';

function DecayCard({ image }) {
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg)');

  const onMouseMove = e => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setTransform(`rotateX(${(-y * 18).toFixed(2)}deg) rotateY(${(x * 18).toFixed(2)}deg)`);
    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(199,125,255,0.25) 0%, transparent 70%)`;
    }
  };

  const onMouseLeave = () => {
    setTransform('rotateX(0deg) rotateY(0deg)');
    if (glareRef.current) glareRef.current.style.background = 'none';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="flex-shrink-0"
      style={{ perspective: 800 }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          transform,
          transition: 'transform 0.1s ease',
          transformStyle: 'preserve-3d',
          width: 280,
          height: 320,
          borderRadius: 24,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(78,42,79,0.6), 0 0 0 1px rgba(199,125,255,0.15)',
        }}
      >
        <img
          src={image}
          alt="Saravanan Developer"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {/* Decay noise overlay */}
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.08\'/%3E%3C/svg%3E")',
            backgroundSize: 'cover',
            mixBlendMode: 'overlay',
            pointerEvents: 'none',
          }}
        />
        {/* Glare */}
        <div ref={glareRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', transition: 'background 0.1s ease' }} />
      </div>
    </motion.div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <TechLoader />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4E2A4F] via-[#2D1E2F] to-black relative">
      <Antigravity dotColor="#C77DFF" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none"></div>

      <div className="relative">
        <Navbar />
        <motion.header
          id="home"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="pt-20 pb-16 px-4"
        >
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 max-w-6xl mx-auto">

            {/* Content */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="inline-flex items-center justify-center w-24 h-24 mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full p-1"
              >
                <div className="w-full h-full bg-[#2D1E2F] rounded-full flex items-center justify-center">
                  <Code className="w-12 h-12 text-purple-400" />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
              >
                Saravanan
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-medium mb-6"
              >
                <span className="title"></span>
              </motion.p>

              <motion.a
                href={resume}
                download="Saravanan_Resume.pdf"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </motion.a>

            </div>

            {/* Profile Image — DecayCard */}
            <DecayCard image={profileImage} />

          </div>
        </motion.header>

        <main className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
          <CareerObjective />
          <Experience />
          <div id="projects">
            <Projects />
          </div>
          <Skills />
          <Education />
          {/* <Strengths /> */}
          <Certifications />
          <div id="contact">
            <Contact />
          </div>
        </main>

        <footer className="border-t border-purple-800/30 py-8 text-center">
          <p className="text-gray-500 mt-2">
            &copy; 2026 Saravanan . All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
