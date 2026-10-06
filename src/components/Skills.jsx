import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaBootstrap,FaDocker } from 'react-icons/fa';
import { SiNextdotjs, SiMui, SiAntdesign, SiTailwindcss, SiExpress, SiMongodb, SiPostgresql, SiPostman, SiOpenai, SiGooglegemini } from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';


import { AiFillAmazonSquare } from 'react-icons/ai';

const ICON_MAP = {
  'HTML5': { icon: FaHtml5, color: '#E34F26', glow: '#E34F2660' },
  'CSS3': { icon: FaCss3Alt, color: '#1572B6', glow: '#1572B660' },
  'JavaScript': { icon: FaJs, color: '#F7DF1E', glow: '#F7DF1E60' },
  'React.js': { icon: FaReact, color: '#61DAFB', glow: '#61DAFB60' },
  'Next.js': { icon: SiNextdotjs, color: '#ffffff', glow: '#ffffff40' },
  'Material UI': { icon: SiMui, color: '#007FFF', glow: '#007FFF60' },
  'Ant Design': { icon: SiAntdesign, color: '#0170FE', glow: '#0170FE60' },
  'Bootstrap': { icon: FaBootstrap, color: '#7952B3', glow: '#7952B360' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4', glow: '#06B6D460' },
  'Node.js': { icon: FaNodeJs, color: '#339933', glow: '#33993360' },
  'Express.js': { icon: SiExpress, color: '#ffffff', glow: '#ffffff40' },
  'MongoDB': { icon: SiMongodb, color: '#47A248', glow: '#47A24860' },
  'PostgreSQL': { icon: SiPostgresql, color: '#4169E1', glow: '#4169E160' },
  'Git': { icon: FaGitAlt, color: '#F05032', glow: '#F0503260' },
  'GitHub': { icon: FaGithub, color: '#ffffff', glow: '#ffffff40' },
  'VS Code': { icon: VscVscode, color: '#007ACC', glow: '#007ACC60' },
  'Postman': { icon: SiPostman, color: '#FF6C37', glow: '#FF6C3760' },
  'ChatGPT':       { icon: SiOpenai,           color: '#74AA9C', glow: '#74AA9C60' },
  'Google Gemini': { icon: SiGooglegemini,      color: '#4285F4', glow: '#4285F460' },
  'DeepSeek':      { icon: SiNextdotjs,         color: '#4D6BFE', glow: '#4D6BFE60' },
  'Claude':        { icon: SiOpenai,            color: '#D97757', glow: '#D9775760' },
  'Amazon Q':      { icon: AiFillAmazonSquare,  color: '#FF9900', glow: '#FF990060' },
  'Docker':      { icon: FaDocker,         color: '#2496ED', glow: '#2496ED60' },

};


const skillCategories = [
  { category: 'Frontend', skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Next.js'] },
  { category: 'UI Libraries & Styling', skills: ['Material UI', 'Ant Design', 'Bootstrap', 'Tailwind CSS'] },
  { category: 'Backend', skills: ['Node.js', 'Express.js', 'REST APIs'] },
  { category: 'Database', skills: ['MongoDB', 'PostgreSQL'] },
  { category: 'Developer Tools', skills: ['Docker','Git', 'GitHub', 'VS Code', 'Postman'] },
  { category: 'AI Tools', skills: ['ChatGPT', 'Claude', 'Google Gemini', 'DeepSeek', 'Amazon Q'] },
];

function MagneticSkill({ skill }) {
  const ref = useRef(null);
  const entry = ICON_MAP[skill];
  const Icon = entry?.icon;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-30, 30], [12, -12]), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-30, 30], [-12, 12]), { stiffness: 300, damping: 20 });

  const [hovered, setHovered] = useState(false);

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const onLeave = () => { x.set(0); y.set(0); setHovered(false); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 400 }}
      className="relative cursor-default"
    >
      <motion.div
        animate={{ boxShadow: hovered && entry ? `0 0 20px 4px ${entry.glow}, 0 0 40px 8px ${entry.glow}` : '0 0 0px 0px transparent' }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-purple-500/30 bg-gradient-to-br from-[#2D1E2F] to-[#3a2540] hover:border-purple-400/60 transition-colors duration-200"
      >
        {Icon
          ? <Icon size={16} style={{ color: entry.color }} />
          : <span className="w-2 h-2 rounded-full bg-purple-400 inline-block" />
        }
        <span className="text-purple-200 font-medium text-sm whitespace-nowrap">{skill}</span>
      </motion.div>
    </motion.div>
  );
}

const categoryColors = [
  { from: '#a855f7', to: '#ec4899' },
  { from: '#06b6d4', to: '#6366f1' },
  { from: '#10b981', to: '#06b6d4' },
  { from: '#f59e0b', to: '#ef4444' },
  { from: '#6366f1', to: '#a855f7' },
  { from: '#ec4899', to: '#f59e0b' },
];

export default function Skills() {
  return (
    <section className="mb-20">
      <style>{`
        @keyframes borderSpin {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-10"
      >
        <Sparkles className="w-8 h-8 text-purple-400" />
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Technical Skills
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category, index) => {
          const col = categoryColors[index];
          return (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5, type: 'spring', bounce: 0.3 }}
              className="relative rounded-2xl p-[1.5px] overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${col.from}55, ${col.to}55, #2D1E2F, ${col.from}55)`,
                backgroundSize: '300% 300%',
                animation: 'borderSpin 4s linear infinite',
              }}
            >
              <div className="bg-gradient-to-br from-[#1e1228] to-[#2D1E2F] rounded-2xl p-6 h-full">
                {/* Category header with animated underline */}
                <div className="mb-5">
                  <h3
                    className="text-xl font-bold mb-1 inline-block"
                    style={{ color: col.from }}
                  >
                    {category.category}
                  </h3>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                    style={{ height: 2, background: `linear-gradient(to right, ${col.from}, ${col.to}, transparent)`, borderRadius: 2 }}
                  />
                </div>

                <div className="flex flex-wrap gap-3" style={{ perspective: 600 }}>
                  {category.skills.map((skill) => (
                    <MagneticSkill key={skill} skill={skill} />
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
