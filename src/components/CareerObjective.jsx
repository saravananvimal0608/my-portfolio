import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

export default function CareerObjective() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-20"
    >
      <div className="flex items-center gap-3 mb-6">
        <Target className="w-8 h-8 text-purple-400" />

        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Career Objective
        </h2>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-lg text-gray-300 leading-relaxed max-w-4xl"
      >
        Passionate React JS Developer with hands-on experience in building
        responsive and user-focused web applications using React JS,
        JavaScript, Node.js, Express.js, and MongoDB. Skilled in developing
        scalable and high-performance applications that solve real-world
        problems. Committed to writing clean, maintainable code, continuously
        improving technical skills, and collaborating effectively with teams
        to deliver high-quality software solutions.
      </motion.p>
    </motion.section>
  );
}