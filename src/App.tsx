import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Github,
  Mail,
  Send,
  Code,
  Brain,
  Activity,
  Microscope,
} from 'lucide-react';

declare global {
  interface Window {
    VANTA: {
      NET: (config: any) => any;
    };
    THREE: any;
  }
}

function TypewriterText() {
  const phrases = [
    'Turning coffee into code',
    'Debugging is my cardio',
    'Making machines since 2018',
    'Connecting students, building communities',
    'Extracting vessels, enhancing vision',
    'From tumors to insights, one pixel at a time',
    'Exploring the tech-verse',
  ];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseDuration = 2000;

    const timeout = setTimeout(
      () => {
        const currentPhrase = phrases[currentPhraseIndex];

        if (!isDeleting) {
          setCurrentText(currentPhrase.substring(0, currentText.length + 1));

          if (currentText === currentPhrase) {
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        } else {
          setCurrentText(currentPhrase.substring(0, currentText.length - 1));

          if (currentText === '') {
            setIsDeleting(false);
            setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
          }
        }
      },
      isDeleting ? deleteSpeed : typeSpeed
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentPhraseIndex]);

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-lg md:text-2xl text-gray-300 mb-8 h-8"
      style={{ fontFamily: "'Satoshi', sans-serif" }}
    >
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
      >
        |
      </motion.span>
    </motion.p>
  );
}

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const backdropBlur = useTransform(
    scrollYProgress,
    [0, 0.25],
    ['blur(0px)', 'blur(5px)']
  );

  const technologies = [
    {
      name: 'Python',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      color: 'hover:text-yellow-400',
    },
    {
      name: 'PostgreSQL',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      color: 'hover:text-blue-400',
    },
    {
      name: 'HTML',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      color: 'hover:text-orange-500',
    },
    {
      name: 'React',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      color: 'hover:text-blue-500',
    },
    {
      name: 'TensorFlow',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
      color: 'hover:text-orange-500',
    },
    {
      name: 'CNN',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg',
      color: 'hover:text-blue-300',
    },
    {
      name: 'Keras',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Keras_logo.svg',
      color: 'hover:text-red-500',
    },
    {
      name: 'PyTorch',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
      color: 'hover:text-orange-600',
    },
  ];

  useEffect(() => {
    if (!vantaEffect && vantaRef.current && window.VANTA) {
      setVantaEffect(
        window.VANTA.NET({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xb5b5d9,
          backgroundColor: 0x0b0b0b,
          points: 12.0,
          maxDistance: 20.0,
          spacing: 20.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const projects = [
    {
      title: 'MUJ Connect',
      description:
        'A comprehensive social media platform for college students, facilitating connections and information sharing.',
      icon: Code,
      status: 'Completed',
      link: 'https://mujconnect.in/',
      isExternal: true,
    },
    {
      title: 'MRI Stroke Classification',
      description:
        'Developed deep learning models to classify MRI scans for stroke detection, utilizing advanced neural networks for accurate medical diagnosis.',
      icon: Brain,
      status: 'Completed',
      link: 'https://github.com/VisheshVarshney/mri-stroke-classification',
      isExternal: false,
    },
    {
      title: 'Brain Tumor Detector',
      description:
        'A machine learning project capable of detecting benign and malignant tumors, providing crucial assistance in early diagnosis and treatment planning.',
      icon: Activity,
      status: 'Completed',
      link: 'https://github.com/VisheshVarshney/brain-tumor-detector',
      isExternal: false,
    },
    {
      title: 'Retinal Vessel Segmentation',
      description:
        'Implemented classical image processing techniques for retinal vessel extraction.',
      icon: Microscope,
      status: 'Completed',
      link: 'https://github.com/VisheshVarshney/retinal-vessel-segmentation',
      isExternal: false,
    },
  ];

  return (
    <div ref={vantaRef} className="min-h-screen text-white overflow-x-hidden">
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ backdropFilter: backdropBlur }}
      />
      <div
        className="custom-cursor"
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{ scale }}
      >
        <div className="container mx-auto px-4 z-10 text-center overflow-hidden">
          <motion.h1
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-8xl font-bold mb-4"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            Vishesh Varshney
          </motion.h1>
          <TypewriterText />
        </div>
      </motion.section>

      {/* Projects Section */}
      <section className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <h2
            className="text-6xl font-bold mb-12"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            Projects
          </h2>
          <div className="space-y-8">
            {projects.map((project, index) => (
              <motion.a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                whileHover={{
                  scale: 1.02,
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="block bg-white/5 p-8 rounded-2xl backdrop-blur-sm border-2 border-transparent hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <project.icon className="w-8 h-8" />
                  <h3
                    className="text-3xl font-bold"
                    style={{ fontFamily: "'Clash Display', sans-serif" }}
                  >
                    {project.title}
                  </h3>
                </div>
                <p
                  className="text-xl text-gray-300 mb-6"
                  style={{ fontFamily: "'Satoshi', sans-serif" }}
                >
                  {project.description}
                </p>
                <div className="flex gap-4">
                  <span
                    className="px-4 py-2 bg-white/10 rounded-full"
                    style={{ fontFamily: "'Satoshi', sans-serif" }}
                  >
                    {project.status}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <h2
            className="text-6xl font-bold mb-12"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            Tech Stack
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`bg-white/5 p-6 rounded-2xl backdrop-blur-sm flex flex-col items-center justify-center gap-4 ${tech.color} transition-all hover:shadow-lg hover:shadow-white/10`}
              >
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-16 h-16 object-contain"
                  loading="lazy"
                />
                <p
                  className="text-lg font-medium text-center"
                  style={{ fontFamily: "'Satoshi', sans-serif" }}
                >
                  {tech.name}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <h2
            className="text-6xl font-bold mb-12"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            Contact
          </h2>
          <div className="max-w-2xl mx-auto">
            <motion.form
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
              action="https://formspree.io/f/mzzzyjjj"
              method="POST"
            >
              <div>
                <label
                  className="block text-xl mb-2"
                  style={{ fontFamily: "'Clash Display', sans-serif" }}
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-white/30"
                  style={{ fontFamily: "'Satoshi', sans-serif" }}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-xl mb-2"
                  style={{ fontFamily: "'Clash Display', sans-serif" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-white/30"
                  style={{ fontFamily: "'Satoshi', sans-serif" }}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-xl mb-2"
                  style={{ fontFamily: "'Clash Display', sans-serif" }}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-white/30"
                  style={{ fontFamily: "'Satoshi', sans-serif" }}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-white/10 hover:bg-white/20 text-white py-4 px-8 rounded-lg flex items-center justify-center gap-2 transition-all"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </motion.form>

            <div className="flex justify-center gap-8 mt-12">
              <a
                href="https://github.com/visheshvarshney"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
              >
                <Github className="w-8 h-8" />
              </a>
              <a
                href="mailto:varshneyvisheshin@gmail.com"
                className="text-white/70 hover:text-white transition-colors"
              >
                <Mail className="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
