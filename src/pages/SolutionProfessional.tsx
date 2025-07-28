import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import { UserPlus, Search, Calendar, CreditCard, CheckCircle, Clock, Shield, Smartphone, Bell, Star, ArrowRight, Sparkles, Zap, Globe, Users, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

const cn = (...classes) => classes.filter(Boolean).join(' ');

// Professional FAQ
const proFaqs = [
  {
    question: "Comment m'inscrire en tant que professionnel sur Plannéo ?",
    answer: "Cliquez sur 'Rejoindre en tant que professionnel', remplissez vos informations et soumettez vos justificatifs. Notre équipe validera votre profil rapidement."
  },
  {
    question: "Comment gérer mes disponibilités et mes absences ?",
    answer: "Depuis votre espace professionnel, configurez vos horaires, jours d'absence et congés. Le calendrier se met à jour automatiquement pour vos clients."
  },
  {
    question: "Comment suis-je payé pour mes prestations ?",
    answer: "Les paiements sont sécurisés et transférés directement sur votre compte bancaire après chaque prestation, selon le mode choisi."
  },
  {
    question: "Puis-je recevoir des avis de mes clients ?",
    answer: "Oui, après chaque rendez-vous, vos clients peuvent laisser un avis qui sera visible sur votre profil."
  },
  {
    question: "Comment contacter le support Plannéo ?",
    answer: "Notre équipe est disponible via le chat intégré ou par e-mail à support@planneo.fr pour toute question ou assistance."
  }
];

// Steps for professionals
const features = [
  {
    step: "Étape 1",
    title: "Inscription et vérification",
    content: "Créez votre compte professionnel, renseignez vos informations et téléchargez vos justificatifs pour être vérifié.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80" // Person filling out a form on laptop
  },
  {
    step: "Étape 2",
    title: "Configuration du planning",
    content: "Définissez vos horaires, vos jours d'absence et vos services proposés. Votre agenda est synchronisé en temps réel.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" // Replace with the correct path or URL for the user's provided image
  },
  {
    step: "Étape 3",
    title: "Réception des rendez-vous",
    content: "Recevez des demandes de rendez-vous, validez-les et gérez votre activité depuis votre tableau de bord.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop" // Calendar on laptop with stylus, business context
  },
  {
    step: "Étape 4",
    title: "Paiement sécurisé",
    content: "Recevez vos paiements de façon sécurisée après chaque prestation, sans gestion administrative complexe.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop" // Secure payment/online banking
  },
  {
    step: "Étape 5",
    title: "Développez votre clientèle",
    content: "Profitez de la visibilité de Plannéo pour attirer de nouveaux clients et fidéliser votre clientèle existante.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop" // Professional with clients/networking
  }
];

const advantages = [
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Gain de temps",
    description: "Automatisez la prise de rendez-vous et réduisez les tâches administratives."
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Plus de clients",
    description: "Augmentez votre visibilité et attirez de nouveaux clients qualifiés."
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    title: "Organisation optimale",
    description: "Planifiez efficacement vos interventions et optimisez vos déplacements."
  },
  {
    icon: <Star className="w-8 h-8" />,
    title: "Satisfaction client",
    description: "Offrez une expérience moderne et professionnelle à vos clients."
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Paiements sécurisés",
    description: "Recevez vos paiements rapidement et en toute sécurité, sans gestion complexe."
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Statistiques avancées",
    description: "Suivez vos performances et analysez votre activité grâce à des rapports détaillés."
  },
  {
    icon: <Bell className="w-8 h-8" />,
    title: "Support dédié",
    description: "Bénéficiez d'une assistance réactive et personnalisée pour toutes vos questions."
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: "Réputation renforcée",
    description: "Valorisez votre expertise grâce aux avis clients et à la visibilité sur Plannéo."
  }
];

const stats = [
  { icon: <UserPlus />, value: 500, label: "Professionnels inscrits", suffix: "+" },
  { icon: <Calendar />, value: 10000, label: "Rendez-vous gérés", suffix: "+" },
  { icon: <Star />, value: 97, label: "Satisfaction pro", suffix: "%" },
  { icon: <Globe />, value: 100, label: "Métiers représentés", suffix: "+" },
];

function StatCounter({ icon, value, label, suffix, delay }) {
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: false });
  const [hasAnimated, setHasAnimated] = useState(false);
  const springValue = useSpring(0, { stiffness: 50, damping: 10 });
  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value);
      setHasAnimated(true);
    } else if (!isInView && hasAnimated) {
      springValue.set(0);
      setHasAnimated(false);
    }
  }, [isInView, value, springValue, hasAnimated]);
  const displayValue = useTransform(springValue, (latest) => Math.floor(latest));
  return (
    <motion.div
      className="bg-white/80 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center text-center group hover:bg-white transition-colors duration-300 border border-[#5EE0C1]/20"
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } } }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="w-14 h-14 rounded-full bg-[#5EE0C1]/10 flex items-center justify-center mb-4 text-[#37C9A1] group-hover:bg-[#5EE0C1]/20 transition-colors duration-300"
        whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
      >
        {icon}
      </motion.div>
      <motion.div ref={countRef} className="text-3xl font-bold text-gray-800 flex items-center">
        <motion.span>{displayValue}</motion.span>
        <span>{suffix}</span>
      </motion.div>
      <p className="text-gray-600 text-sm mt-1">{label}</p>
      <motion.div className="w-10 h-0.5 bg-[#5EE0C1] mt-3 group-hover:w-16 transition-all duration-300" />
    </motion.div>
  );
}

// Add FeatureSteps component (copied and adapted from SolutionUtilisateur)
function FeatureSteps({ features, title = "Les étapes pour réussir sur Plannéo", autoPlayInterval = 4000 }) {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100));
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length);
        setProgress(0);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [progress, features.length, autoPlayInterval]);
  return (
    <div className="p-8 md:p-12 bg-gradient-to-br from-[#5EE0C1]/5 to-[#37C9A1]/5">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 text-center text-gray-800">{title}</h2>
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10">
          <div className="order-2 md:order-1 space-y-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-6 md:gap-8"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: index === currentFeature ? 1 : 0.3 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className={cn(
                    "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2",
                    index === currentFeature
                      ? "bg-[#5EE0C1] border-[#5EE0C1] text-white scale-110"
                      : "bg-gray-100 border-gray-300 text-gray-600",
                  )}
                >
                  {index <= currentFeature ? (
                    <span className="text-lg font-bold">✓</span>
                  ) : (
                    <span className="text-lg font-semibold">{index + 1}</span>
                  )}
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-800">{feature.title || feature.step}</h3>
                  <p className="text-sm md:text-lg text-gray-600">{feature.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="order-1 md:order-2 relative h-[200px] md:h-[300px] lg:h-[400px] overflow-hidden rounded-lg">
            <AnimatePresence mode="wait">
              {features.map((feature, index) =>
                index === currentFeature && (
                  <motion.div
                    key={index}
                    className="absolute inset-0 rounded-lg overflow-hidden"
                    initial={{ y: 100, opacity: 0, rotateX: -20 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: -100, opacity: 0, rotateX: 20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    {typeof feature.image === 'string' ? (
                      <img src={feature.image} alt={feature.step} className="w-full h-full object-cover transition-transform transform" />
                    ) : feature.image}
                    <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SolutionProfessional() {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } } };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } } };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#5EE0C1]/5 to-[#37C9A1]/10">
      <Header />
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#5EE0C1]/10 blur-3xl" style={{ y: y1 }} />
        <motion.div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#37C9A1]/10 blur-3xl" style={{ y: y2 }} />
      </div>
      <section ref={sectionRef} className="relative z-10">
        {/* Hero Section */}
        <motion.div className="container mx-auto px-6 py-20 text-center" initial="hidden" animate={isInView ? "visible" : "hidden"} variants={containerVariants}>
          <motion.div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#5EE0C1]/20 border border-[#5EE0C1]/30 backdrop-blur-sm mb-8" variants={itemVariants}>
            <Sparkles className="h-4 w-4 text-[#37C9A1]" />
            <span className="text-sm font-medium text-[#37C9A1]">Développez votre activité</span>
          </motion.div>
          <motion.h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800" variants={itemVariants}>
            Solution pour les professionnels
          </motion.h1>
          <motion.p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8" variants={itemVariants}>
            Plannéo vous aide à gérer vos rendez-vous, attirer de nouveaux clients et simplifier votre quotidien professionnel.
          </motion.p>
          <motion.p className="text-lg text-gray-500 max-w-2xl mx-auto" variants={itemVariants}>
            Gagnez du temps, sécurisez vos paiements et développez votre visibilité en ligne avec Plannéo.
          </motion.p>
        </motion.div>
        {/* Steps Section */}
        <FeatureSteps features={features} title="Les étapes pour réussir sur Plannéo" autoPlayInterval={4000} />
        {/* Advantages Section */}
        <motion.div className="container mx-auto px-6 py-20" initial="hidden" animate={isInView ? "visible" : "hidden"} variants={containerVariants}>
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Pourquoi choisir Plannéo ?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Découvrez tous les avantages pour les professionnels</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div key={index} className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-[#5EE0C1]/20 text-center group hover:bg-white hover:shadow-lg transition-all duration-300" variants={itemVariants} whileHover={{ y: -10, transition: { duration: 0.3 } }}>
                <motion.div className="w-16 h-16 rounded-full bg-[#5EE0C1]/10 flex items-center justify-center mx-auto mb-6 text-[#37C9A1] group-hover:bg-[#5EE0C1]/20 transition-colors duration-300" whileHover={{ scale: 1.1, rotate: 5 }}>
                  {advantage.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{advantage.title}</h3>
                <p className="text-gray-600 leading-relaxed">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* Stats Section */}
        <motion.div ref={statsRef} className="container mx-auto px-6 py-20" initial="hidden" animate={isStatsInView ? "visible" : "hidden"} variants={containerVariants}>
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Plannéo en chiffres</h2>
            <p className="text-xl text-gray-600">Des centaines de professionnels nous font confiance</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatCounter key={index} icon={stat.icon} value={stat.value} label={stat.label} suffix={stat.suffix} delay={index * 0.1} />
            ))}
          </div>
        </motion.div>
        {/* CTA Section */}
        <motion.div className="container mx-auto px-6 py-20" initial="hidden" animate={isInView ? "visible" : "hidden"} variants={containerVariants}>
          <motion.div className="bg-gradient-to-r from-[#5EE0C1] to-[#37C9A1] text-white p-12 rounded-3xl text-center" variants={itemVariants}>
            <motion.div className="inline-flex items-center gap-2 mb-6" animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
              <Zap className="w-8 h-8" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Rejoignez Plannéo Pro</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">Gérez votre activité, développez votre clientèle et simplifiez votre quotidien avec Plannéo.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-white text-[#37C9A1] hover:bg-gray-50 font-semibold px-8 py-4 rounded-full text-lg">Créer mon compte pro<ArrowRight className="ml-2 h-5 w-5" /></Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-full text-lg">En savoir plus</Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>
      {/* FAQ Section before Footer */}
      <div className="max-w-2xl mx-auto mt-12">
        <h2 className="text-2xl font-bold mb-4 text-[#37C9A1]">FAQ Professionnels</h2>
        <Accordion type="single" collapsible>
          {proFaqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <Footer />
    </div>
  );
} 