import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Phone } from 'lucide-react';

const contactLinks = [
  { icon: Github,   label: 'GitHub',   value: 'github.com/saravananvimal0608',       href: 'https://github.com/saravananvimal0608',                        color: '#ffffff', glow: '#ffffff' },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/saravanan-vimal',      href: 'https://www.linkedin.com/in/saravanan-vimal-399364352',        color: '#0A66C2', glow: '#0A66C2' },
  { icon: Mail,     label: 'Email',    value: 'saravananvimal0608@gmail.com',          href: 'mailto:saravananvimal0608@gmail.com',                          color: '#ea4335', glow: '#ea4335' },
  { icon: Phone,    label: 'Phone',    value: '+91 8838144554',                        href: 'tel:+918838144554',                                            color: '#10b981', glow: '#10b981' },
  { icon: MapPin,   label: 'Location', value: 'Chennai, Tamil Nadu',                  href: null,                                                           color: '#f59e0b', glow: '#f59e0b' },
];

function useTypewriter(text, active, speed = 35) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    if (!active) { setDisplayed(''); return; }
    let i = 0;
    setDisplayed('');
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [active, text]);
  return displayed;
}

function ContactCard({ contact, index }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const Icon = contact.icon;
  const typed = useTypewriter(contact.value, hovered);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(x, { stiffness: 200, damping: 20 });

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    x.set(cx / rect.width * 14);
    y.set(-(cy / rect.height * 14));
  };
  const onLeave = () => { x.set(0); y.set(0); setHovered(false); };

  const Tag = contact.href ? motion.a : motion.div;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, type: 'spring', bounce: 0.35 }}
      style={{ perspective: 600 }}
    >
      <Tag
        ref={ref}
        href={contact.href || undefined}
        target={contact.href && !contact.href.startsWith('mailto') && !contact.href.startsWith('tel') ? '_blank' : undefined}
        rel="noreferrer"
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', textDecoration: 'none', display: 'block' }}
        className="relative rounded-2xl overflow-hidden cursor-pointer"
      >
        {/* Animated beam border */}
        <motion.div
          animate={{
            background: hovered
              ? [`conic-gradient(from 0deg at 50% 50%, ${contact.color}, transparent, ${contact.color})`,
                 `conic-gradient(from 360deg at 50% 50%, ${contact.color}, transparent, ${contact.color})`]
              : `conic-gradient(from 0deg at 50% 50%, transparent, transparent)`,
          }}
          transition={{ duration: 1.5, repeat: hovered ? Infinity : 0, ease: 'linear' }}
          style={{ position: 'absolute', inset: -1, borderRadius: 18, zIndex: 0 }}
        />

        <div
          className="relative z-10 p-5 flex items-center gap-4 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, #1e1228, #2D1E2F)',
            boxShadow: hovered ? `0 8px 32px ${contact.glow}30` : 'none',
            transition: 'box-shadow 0.3s',
          }}
        >
          {/* Icon with pulse ring */}
          <div className="relative flex-shrink-0">
            {hovered && (
              <motion.div
                animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{
                  position: 'absolute', inset: -4, borderRadius: '50%',
                  border: `2px solid ${contact.color}`,
                }}
              />
            )}
            <motion.div
              animate={{ boxShadow: hovered ? `0 0 20px ${contact.glow}80` : '0 0 0px transparent' }}
              transition={{ duration: 0.3 }}
              className="p-3 rounded-xl"
              style={{ background: `${contact.color}18`, border: `1px solid ${contact.color}35` }}
            >
              <Icon size={22} style={{ color: contact.color }} />
            </motion.div>
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">{contact.label}</p>
            <p
              className="font-semibold text-sm truncate"
              style={{ color: hovered ? contact.color : '#d1d5db', transition: 'color 0.3s' }}
            >
              {hovered ? typed : contact.value}
              {hovered && typed.length < contact.value.length && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  style={{ color: contact.color }}
                >|</motion.span>
              )}
            </p>
          </div>

          {/* Arrow */}
          {contact.href && (
            <motion.div
              animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.3 }}
              transition={{ duration: 0.2 }}
              style={{ color: contact.color, fontSize: 18, flexShrink: 0 }}
            >
              →
            </motion.div>
          )}
        </div>
      </Tag>
    </motion.div>
  );
}

export default function Contact() {
  return (
    <section className="mb-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-10"
      >
        <Mail className="w-8 h-8 text-pink-400" />
        <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Contact
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contactLinks.map((contact, index) => (
          <ContactCard key={index} contact={contact} index={index} />
        ))}
      </div>
    </section>
  );
}
