import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Phone, Send, User, MessageSquare, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import emailjs from '@emailjs/browser';

// ✅ Replace these with your EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_lvpcild';
const EMAILJS_TEMPLATE_ID = 'template_xgfag0v'; // 👈 paste your template_xxxxxxx here
const EMAILJS_PUBLIC_KEY = 'SLLvw8_VRf0pHhe8L';

const contactLinks = [
  { icon: Github, label: 'GitHub', value: 'github.com/saravananvimal0608', href: 'https://github.com/saravananvimal0608', color: '#ffffff', glow: '#ffffff' },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/saravanan-vimal', href: 'https://www.linkedin.com/in/saravanan-vimal-399364352', color: '#0A66C2', glow: '#0A66C2' },
  { icon: Mail, label: 'Email', value: 'saravananvimal0608@gmail.com', href: 'mailto:saravananvimal0608@gmail.com', color: '#ea4335', glow: '#ea4335' },
  { icon: Phone, label: 'Phone', value: '+91 8838144554', href: 'tel:+918838144554', color: '#10b981', glow: '#10b981' },
  { icon: MapPin, label: 'Location', value: 'Chennai, Tamil Nadu', href: null, color: '#f59e0b', glow: '#f59e0b' },
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
    x.set((e.clientX - rect.left - rect.width / 2) / rect.width * 14);
    y.set(-((e.clientY - rect.top - rect.height / 2) / rect.height * 14));
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
          <div className="relative flex-shrink-0">
            {hovered && (
              <motion.div
                animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: `2px solid ${contact.color}` }}
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
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">{contact.label}</p>
            <p className="font-semibold text-sm truncate" style={{ color: hovered ? contact.color : '#d1d5db', transition: 'color 0.3s' }}>
              {hovered ? typed : contact.value}
              {hovered && typed.length < contact.value.length && (
                <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} style={{ color: contact.color }}>|</motion.span>
              )}
            </p>
          </div>
          {contact.href && (
            <motion.div
              animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.3 }}
              transition={{ duration: 0.2 }}
              style={{ color: contact.color, fontSize: 18, flexShrink: 0 }}
            >→</motion.div>
          )}
        </div>
      </Tag>
    </motion.div>
  );
}

function ContactForm() {
  const formRef = useRef(null);
  const [form, setForm] = useState({ from_name: '', from_email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [focused, setFocused] = useState('');

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.from_name || !form.from_email || !form.message) return;
    setStatus('loading');
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY);
      setStatus('success');
      setForm({ from_name: '', from_email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const fields = [
    { name: 'from_name', label: 'Your Name', icon: User, type: 'text', placeholder: 'John Doe' },
    { name: 'from_email', label: 'Your Email', icon: Mail, type: 'email', placeholder: 'john@example.com' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2, type: 'spring', bounce: 0.3 }}
      className="relative rounded-2xl overflow-hidden mt-10"
    >
      {/* Animated border */}
      <motion.div
        animate={{
          background: [
            'conic-gradient(from 0deg at 50% 50%, #a855f7, #ec4899, #6366f1, #a855f7)',
            'conic-gradient(from 360deg at 50% 50%, #a855f7, #ec4899, #6366f1, #a855f7)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', inset: -1, borderRadius: 18, zIndex: 0 }}
      />

      <div className="relative z-10 rounded-2xl p-8" style={{ background: 'linear-gradient(135deg, #1a1025, #2D1E2F, #1e1228)' }}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="p-3 rounded-xl"
            style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(236,72,153,0.2))', border: '1px solid rgba(168,85,247,0.3)' }}
          >
            <Send size={22} className="text-purple-400" />
          </motion.div>
          <div>
            <h3 className="text-xl font-black text-white">Send me a message</h3>
            <p className="text-gray-500 text-sm">I'll get back to you within 24 hours</p>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
          {/* Name & Email row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {fields.map(({ name, label, icon: Icon, type, placeholder }) => (
              <div key={name} className="relative">
                <label className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2 block">{label}</label>
                <div className="relative">
                  <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400/60 pointer-events-none" />
                  <motion.input
                    animate={{
                      boxShadow: focused === name
                        ? '0 0 0 2px rgba(168,85,247,0.5), 0 0 20px rgba(168,85,247,0.15)'
                        : '0 0 0 1px rgba(168,85,247,0.2)',
                    }}
                    transition={{ duration: 0.2 }}
                    type={type}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    onFocus={() => setFocused(name)}
                    onBlur={() => setFocused('')}
                    placeholder={placeholder}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.04)', border: 'none' }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Message */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2 block">Message</label>
            <div className="relative">
              <MessageSquare size={16} className="absolute left-4 top-4 text-purple-400/60 pointer-events-none" />
              <motion.textarea
                animate={{
                  boxShadow: focused === 'message'
                    ? '0 0 0 2px rgba(168,85,247,0.5), 0 0 20px rgba(168,85,247,0.15)'
                    : '0 0 0 1px rgba(168,85,247,0.2)',
                }}
                transition={{ duration: 0.2 }}
                name="message"
                value={form.message}
                onChange={handleChange}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused('')}
                placeholder="Hi Saravanan, I came across your portfolio and would love to connect..."
                required
                rows={5}
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 outline-none resize-none transition-all"
                style={{ background: 'rgba(255,255,255,0.04)', border: 'none' }}
              />
            </div>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            whileHover={{ scale: status === 'idle' ? 1.02 : 1 }}
            whileTap={{ scale: status === 'idle' ? 0.98 : 1 }}
            className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-3 transition-all duration-300 disabled:cursor-not-allowed"
            style={{
              background: status === 'success'
                ? 'linear-gradient(135deg, #10b981, #059669)'
                : status === 'error'
                  ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                  : 'linear-gradient(135deg, #a855f7, #ec4899)',
              boxShadow: status === 'idle' ? '0 0 30px rgba(168,85,247,0.3)' : 'none',
            }}
          >
            {status === 'loading' && <Loader size={18} className="animate-spin" />}
            {status === 'success' && <CheckCircle size={18} />}
            {status === 'error' && <AlertCircle size={18} />}
            {status === 'idle' && <Send size={18} />}
            {status === 'loading' ? 'Sending...'
              : status === 'success' ? 'Message Sent! 🎉'
                : status === 'error' ? 'Failed. Try again'
                  : 'Send Message'}
          </motion.button>
        </form>
      </div>
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

      <ContactForm />
    </section>
  );
}
