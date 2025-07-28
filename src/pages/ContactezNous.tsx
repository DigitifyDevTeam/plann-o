import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, Easing } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  User, 
  MessageSquare, 
  Building, 
  ArrowRight,
  Sparkles,
  CheckCircle,
  Clock,
  Globe,
  Shield,
  Zap
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Get in touch via email",
    value: "dhileepkumargm@21st.dev",
    link: "mailto:dhileepkumargm@gmail.com",
    gradient: "from-[#5EE0C1]/20 to-[#37C9A1]/20",
    hoverColor: "mint"
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our team",
    value: "+1 (555) 123-4567",
    link: "tel:+15551234567",
    gradient: "from-[#37C9A1]/20 to-[#5EE0C1]/20",
    hoverColor: "turquoise"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Our headquarters",
    value: "San Francisco, CA",
    link: "#Europe, Middle East, and Africa (EMEA)",
    gradient: "from-[#5EE0C1]/20 to-[#37C9A1]/20",
    hoverColor: "mint"
  }
];

const companyStats = [
  { label: "Response Time", value: "< 2 hours", icon: Clock },
  { label: "Global Clients", value: "500+", icon: Globe },
  { label: "Security Level", value: "SOC 2", icon: Shield },
  { label: "Success Rate", value: "99.9%", icon: Zap }
];

export function PremiumContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeInOut" as Easing
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Contact Section */}
        <section className="relative py-32 bg-gradient-to-br from-[#5EE0C1]/10 via-[#37C9A1]/10 to-white text-[#222] overflow-hidden">
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0">
            {/* Animated gradient mesh */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-[#5EE0C1]/10 via-[#37C9A1]/10 to-white/10"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: '400% 400%'
              }}
            />
            {/* Moving orbs */}
            <motion.div
              className="absolute top-1/3 left-1/5 w-96 h-96 bg-[#5EE0C1]/20 rounded-full blur-3xl"
              animate={{
                x: [0, 200, 0],
                y: [0, 100, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/5 w-80 h-80 bg-[#37C9A1]/20 rounded-full blur-3xl"
              animate={{
                x: [0, -150, 0],
                y: [0, -80, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* Communication lines */}
            <div className="absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-px h-40 bg-gradient-to-b from-transparent via-[#5EE0C1]/30 to-transparent"
                  style={{
                    left: `${20 + (i * 15)}%`,
                    top: `${25 + (i * 8)}%`,
                    transform: `rotate(${30 + i * 20}deg)`
                  }}
                  animate={{
                    opacity: [0.2, 0.8, 0.2],
                    scaleY: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>
          </div>
          <motion.div 
            ref={containerRef}
            className="relative z-10 max-w-7xl mx-auto px-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Header */}
            <motion.div 
              className="text-center mb-20"
              variants={fadeInUp}
            >
              <motion.div
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.08] border border-[#5EE0C1]/30 backdrop-blur-sm mb-6"
                whileHover={{ scale: 1.05, borderColor: "#37C9A1" }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-4 w-4 text-[#5EE0C1]" />
                </motion.div>
                <span className="text-sm font-medium text-[#37C9A1]">
                  ✨ Contactez-nous
                </span>
                <div className="w-2 h-2 bg-[#5EE0C1] rounded-full animate-pulse" />
              </motion.div>
              <motion.h2 
                className="text-4xl sm:text-6xl md:text-7xl font-bold mb-8 tracking-tight"
                variants={fadeInUp}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5EE0C1] to-[#37C9A1]">
                  Contactez
                </span>
                <br />
                <motion.span 
                  className="bg-clip-text text-transparent bg-gradient-to-r from-[#37C9A1] via-[#5EE0C1] to-white"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    backgroundSize: '200% 200%'
                  }}
                >
                  Nous
                </motion.span>
              </motion.h2>
              <motion.p 
                className="text-xl sm:text-2xl text-[#37C9A1] max-w-4xl mx-auto leading-relaxed"
                variants={fadeInUp}
              >
                Prêt à transformer votre business ? Discutons de vos objectifs et comment nous pouvons vous aider à les atteindre.
              </motion.p>
            </motion.div>
            {/* Stats Bar */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
              variants={fadeInUp}
            >
              {companyStats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 bg-white/[0.05] backdrop-blur-xl rounded-2xl border border-[#5EE0C1]/30 group hover:bg-white/[0.08] transition-all"
                  whileHover={{ scale: 1.05, y: -5 }}
                  variants={fadeInUp}
                >
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5EE0C1]/20 to-[#37C9A1]/20 border border-white/20 flex items-center justify-center mx-auto mb-3"
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="w-6 h-6 text-[#37C9A1]" />
                  </motion.div>
                  <div className="text-2xl font-bold text-[#37C9A1] mb-1">{stat.value}</div>
                  <div className="text-[#5EE0C1] text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div 
                className="space-y-8 bg-white rounded-2xl p-8 shadow-md"
                variants={fadeInUp}
              >
                <div>
                  <h3 className="text-3xl font-bold text-[#37C9A1] mb-4">Envoyez-nous un message</h3>
                  <p className="text-[#5EE0C1] text-lg">
                    Parlez-nous de votre projet et nous vous répondrons sous 24h.
                  </p>
                </div>
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-6"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#37C9A1]/40" />
                          <input
                            type="text"
                            placeholder="Votre nom"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className={`w-full pl-10 pr-4 py-4 bg-white/[0.08] border rounded-xl text-[#222] placeholder-[#37C9A1]/40 focus:outline-none focus:border-[#5EE0C1] transition-all ${
                              errors.name ? 'border-red-400' : 'border-[#5EE0C1]/30'
                            }`}
                          />
                          {errors.name && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-400 text-sm mt-2"
                            >
                              {errors.name}
                            </motion.p>
                          )}
                        </div>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#37C9A1]/40" />
                          <input
                            type="email"
                            placeholder="Adresse email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={`w-full pl-10 pr-4 py-4 bg-white/[0.08] border rounded-xl text-[#222] placeholder-[#37C9A1]/40 focus:outline-none focus:border-[#5EE0C1] transition-all ${
                              errors.email ? 'border-red-400' : 'border-[#5EE0C1]/30'
                            }`}
                          />
                          {errors.email && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-400 text-sm mt-2"
                            >
                              {errors.email}
                            </motion.p>
                          )}
                        </div>
                      </div>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#37C9A1]/40" />
                        <input
                          type="text"
                          placeholder="Entreprise (optionnel)"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className="w-full pl-10 pr-4 py-4 bg-white/[0.08] border border-[#5EE0C1]/30 rounded-xl text-[#222] placeholder-[#37C9A1]/40 focus:outline-none focus:border-[#5EE0C1] transition-all"
                        />
                      </div>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-4 h-5 w-5 text-[#37C9A1]/40" />
                        <textarea
                          placeholder="Parlez-nous de votre projet..."
                          rows={6}
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          className={`w-full pl-10 pr-4 py-4 bg-white/[0.08] border rounded-xl text-[#222] placeholder-[#37C9A1]/40 focus:outline-none focus:border-[#5EE0C1] transition-all resize-none ${
                            errors.message ? 'border-red-400' : 'border-[#5EE0C1]/30'
                          }`}
                        />
                        {errors.message && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-sm mt-2"
                          >
                            {errors.message}
                          </motion.p>
                        )}
                      </div>
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full relative group overflow-hidden bg-gradient-to-r from-[#5EE0C1] to-[#37C9A1] hover:from-[#37C9A1] hover:to-[#5EE0C1] text-white font-medium py-4 px-6 rounded-xl transition-all disabled:opacity-50"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.5 }}
                        />
                        <span className="relative flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <motion.div
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                          ) : (
                            <>
                              <Send className="h-5 w-5" />
                              Envoyer
                              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </span>
                      </motion.button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        className="w-20 h-20 rounded-full bg-[#5EE0C1]/20 border border-[#37C9A1]/30 flex items-center justify-center mx-auto mb-6"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        <CheckCircle className="w-10 h-10 text-[#37C9A1]" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-[#37C9A1] mb-4">Message envoyé !</h3>
                      <p className="text-[#5EE0C1] text-lg mb-6">
                        Merci pour votre message. Nous vous répondrons sous 24h.
                      </p>
                      <motion.button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ name: '', email: '', company: '', message: '' });
                        }}
                        className="px-6 py-3 bg-white/[0.08] border border-[#5EE0C1]/30 rounded-xl text-[#37C9A1] hover:bg-white/[0.12] transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Envoyer un autre message
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              {/* Contact Methods */}
              <motion.div 
                className="space-y-8 bg-white rounded-2xl p-8 shadow-md"
                variants={fadeInUp}
              >
                <div>
                  <h3 className="text-3xl font-bold text-[#37C9A1] mb-4">Autres moyens de contact</h3>
                  <p className="text-[#5EE0C1] text-lg">
                    Choisissez la méthode qui vous convient le mieux.
                  </p>
                </div>
                <div className="space-y-6">
                  {contactMethods.map((method, index) => (
                    <motion.a
                      key={index}
                      href={method.link}
                      className="block p-6 bg-white/[0.05] backdrop-blur-xl rounded-2xl border border-[#5EE0C1]/30 hover:bg-white/[0.08] transition-all group"
                      variants={fadeInUp}
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <div className="flex items-center gap-4">
                        <motion.div
                          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${method.gradient} border border-white/20 flex items-center justify-center`}
                          whileHover={{ scale: 1.1, rotateY: 180 }}
                          transition={{ duration: 0.6 }}
                        >
                          <method.icon className="w-7 h-7 text-[#37C9A1]" />
                        </motion.div>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-[#37C9A1] mb-1">{method.title}</h4>
                          <p className="text-[#5EE0C1] text-sm mb-2">{method.description}</p>
                          <p className="text-[#37C9A1] font-medium">{method.value}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-[#5EE0C1]/40 group-hover:text-[#37C9A1] group-hover:translate-x-1 transition-all" />
                      </div>
                    </motion.a>
                  ))}
                </div>
                {/* Additional Info */}
                <motion.div
                  className="p-6 bg-gradient-to-br from-[#5EE0C1]/10 to-[#37C9A1]/10 backdrop-blur-xl rounded-2xl border border-[#5EE0C1]/30"
                  variants={fadeInUp}
                >
                  <h4 className="text-lg font-semibold text-[#37C9A1] mb-3">Réponse rapide garantie</h4>
                  <p className="text-[#5EE0C1] text-sm leading-relaxed">
                    Nous nous engageons à répondre sous 2h pendant les horaires d'ouverture, et à planifier un appel sous 24h pour discuter de votre projet en détail.
                  </p>
                </motion.div>
              </motion.div>
            </div>
            {/* Floating Elements */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[#5EE0C1]/20 rounded-full"
                style={{
                  left: `${10 + (i * 12)}%`,
                  top: `${20 + (i * 10)}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 2, 1],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.6,
                }}
              />
            ))}
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 