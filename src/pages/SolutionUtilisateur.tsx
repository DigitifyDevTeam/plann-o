import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import { 
  UserPlus, 
  Search, 
  Calendar, 
  CreditCard, 
  CheckCircle, 
  Clock, 
  Shield, 
  Smartphone, 
  Bell,
  Star,
  ArrowRight,
  Sparkles,
  Zap,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SelectionReservationIllustration from "@/components/illustrations/SelectionReservationIllustration";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

// Utils function
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Testimonial Card Component
interface TestimonialAuthor {
  name: string;
  handle: string;
  avatar: string;
}

interface TestimonialCardProps {
  author: TestimonialAuthor;
  text: string;
  href?: string;
  className?: string;
}

function TestimonialCard({ 
  author,
  text,
  href,
  className
}: TestimonialCardProps) {
  const Card = href ? 'a' : 'div';
  return (
    <Card
      {...(href ? { href } : {})}
      className={cn(
        "flex flex-col rounded-lg border-t",
        "bg-gradient-to-b from-muted/50 to-muted/10",
        "p-4 text-start sm:p-6",
        "hover:from-muted/60 hover:to-muted/20",
        "max-w-[320px] sm:max-w-[320px]",
        "transition-colors duration-300",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={author.avatar} alt={author.name} />
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-md font-semibold leading-none">
            {author.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {author.handle}
          </p>
        </div>
      </div>
      <p className="sm:text-md mt-4 text-sm text-muted-foreground">
        {text}
      </p>
    </Card>
  );
}

// Testimonials Section Component
interface TestimonialsSectionProps {
  title: string;
  description: string;
  testimonials: Array<{
    author: TestimonialAuthor;
    text: string;
    href?: string;
  }>;
  className?: string;
}

function TestimonialsSection({ 
  title,
  description,
  testimonials,
  className 
}: TestimonialsSectionProps) {
  return (
    <section className={cn(
      "bg-background text-foreground",
      "py-12 sm:py-24 md:py-32 px-0",
      className
    )}>
      <div className="mx-auto flex max-w-container flex-col items-center gap-4 text-center sm:gap-16">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
          <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
            {title}
          </h2>
          <p className="text-md max-w-[600px] font-medium text-muted-foreground sm:text-xl">
            {description}
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row [--duration:40s]">
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
              {[...Array(4)].map((_, setIndex) => (
                testimonials.map((testimonial, i) => (
                  <TestimonialCard 
                    key={`${setIndex}-${i}`}
                    {...testimonial}
                  />
                ))
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-background sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-background sm:block" />
        </div>
      </div>
    </section>
  );
}

// Feature Steps Component
interface Feature {
  step: string;
  title?: string;
  content: string;
  image: string | React.ReactNode;
}

interface FeatureStepsProps {
  features: Feature[];
  className?: string;
  title?: string;
  autoPlayInterval?: number;
  imageHeight?: string;
}

function FeatureSteps({
  features,
  className,
  title = "Comment ça marche",
  autoPlayInterval = 3000,
  imageHeight = "h-[400px]",
}: FeatureStepsProps) {
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
    <div className={cn("p-8 md:p-12 bg-gradient-to-br from-[#5EE0C1]/5 to-[#37C9A1]/5", className)}>
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 text-center text-gray-800">
          {title}
        </h2>

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
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
                    {feature.title || feature.step}
                  </h3>
                  <p className="text-sm md:text-lg text-gray-600">
                    {feature.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div
            className={cn(
              "order-1 md:order-2 relative h-[200px] md:h-[300px] lg:h-[400px] overflow-hidden rounded-lg"
            )}
          >
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
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
                        <img
                          src={feature.image}
                          alt={feature.step}
                          className="w-full h-full object-cover transition-transform transform"
                        />
                      ) : (
                        feature.image
                      )}
                      <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stat Counter Component
interface StatCounterProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix: string;
  delay: number;
}

function StatCounter({ icon, value, label, suffix, delay }: StatCounterProps) {
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: false });
  const [hasAnimated, setHasAnimated] = useState(false);

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 10,
  });

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
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay },
        },
      }}
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

// Add a professional FAQ section for users at the end of the page
const userFaqs = [
  {
    question: "Comment réserver un professionnel sur Plannéo ?",
    answer: "Il vous suffit de rechercher le métier ou le service souhaité, de choisir un professionnel disponible, puis de sélectionner un créneau horaire et de valider votre rendez-vous."
  },
  {
    question: "Puis-je annuler ou modifier un rendez-vous ?",
    answer: "Oui, vous pouvez annuler ou reporter un rendez-vous directement depuis votre espace personnel, dans la rubrique 'Mes rendez-vous'."
  },
  {
    question: "Comment laisser un avis sur un professionnel ?",
    answer: "Après chaque prestation, vous recevrez une invitation à évaluer le professionnel et à laisser un commentaire. Votre retour aide la communauté à faire le bon choix."
  },
  {
    question: "Vais-je recevoir des rappels pour mes rendez-vous ?",
    answer: "Oui, vous recevrez des notifications par e-mail pour vous rappeler vos rendez-vous à venir."
  },
  {
    question: "Que faire si j’ai un problème avec un professionnel ?",
    answer: "Vous pouvez contacter notre support via le chat ou par e-mail à support@planneo.fr. Nous intervenons rapidement pour trouver une solution."
  },
  {
    question: "Mes informations sont-elles partagées avec d’autres personnes ?",
    answer: "Non, vos données ne sont partagées qu’avec le professionnel que vous avez choisi. Elles restent confidentielles et sécurisées."
  }
];

// Main Component
export default function SolutionUtilisateur() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const features = [
    {
      step: "Étape 1",
      title: "Inscription",
      content: "Créez votre compte gratuitement en quelques clics. Renseignez vos informations de base et commencez votre parcours avec Plannéo.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop"
    },
    {
      step: "Étape 2", 
      title: "Recherche de professionnel",
      content: "Trouvez le professionnel idéal selon votre métier recherché, votre localisation et les disponibilités qui vous conviennent.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop"
    },
    {
      step: "Étape 3",
      title: "Sélection et réservation",
      content: "Choisissez le service qui correspond à vos besoins et réservez votre créneau en temps réel selon vos préférences.",
      image: <SelectionReservationIllustration />
    },
    {
      step: "Étape 4",
      title: "Paiement sécurisé",
      content: "Effectuez votre paiement en toute sécurité grâce à notre système de paiement crypté et certifié.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop"
    },
    {
      step: "Étape 5",
      title: "Confirmation et rappel",
      content: "Recevez instantanément votre confirmation par email, avec des rappels automatiques avant votre rendez-vous.",
      image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800&h=600&fit=crop"
    }
  ];

  const advantages = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Disponible 24/7",
      description: "Réservez vos rendez-vous à toute heure, même en dehors des heures d'ouverture."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Paiement sécurisé",
      description: "Transactions protégées par cryptage SSL et conformes aux normes bancaires."
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Rappels automatiques",
      description: "Notifications par email et pour ne jamais oublier vos rendez-vous."
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Interface intuitive",
      description: "Design responsive et simple d'utilisation sur tous vos appareils."
    }
  ];

  const testimonials = [
    {
      author: {
        name: "Marie Dubois",
        handle: "@marie_d",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
      },
      text: "Plannéo a révolutionné ma façon de prendre rendez-vous. Plus besoin d'appeler pendant les heures d'ouverture !",
    },
    {
      author: {
        name: "Thomas Martin",
        handle: "@thomas_m",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      text: "Interface très intuitive et rappels automatiques parfaits. Je recommande vivement cette plateforme.",
    },
    {
      author: {
        name: "Sophie Laurent",
        handle: "@sophie_l",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
      },
      text: "Gain de temps énorme ! En quelques clics, j'ai trouvé et réservé exactement ce dont j'avais besoin.",
    }
  ];

  const stats = [
    { icon: <UserPlus />, value: 10000, label: "Utilisateurs actifs", suffix: "+" },
    { icon: <Calendar />, value: 50000, label: "Rendez-vous pris", suffix: "+" },
    { icon: <Star />, value: 98, label: "Satisfaction client", suffix: "%" },
    { icon: <Globe />, value: 500, label: "Professionnels partenaires", suffix: "+" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#5EE0C1]/5 to-[#37C9A1]/10">
      <Header />
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#5EE0C1]/10 blur-3xl"
          style={{ y: y1 }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#37C9A1]/10 blur-3xl"
          style={{ y: y2 }}
        />
      </div>

      <section ref={sectionRef} className="relative z-10">
        {/* Hero Section */}
        <motion.div
          className="container mx-auto px-6 py-20 text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#5EE0C1]/20 border border-[#5EE0C1]/30 backdrop-blur-sm mb-8"
            variants={itemVariants}
          >
            <Sparkles className="h-4 w-4 text-[#37C9A1]" />
            <span className="text-sm font-medium text-[#37C9A1]">
              Simplifiez vos rendez-vous
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 text-gray-800"
            variants={itemVariants}
          >
            Comment ça marche ?
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            variants={itemVariants}
          >
            Plannéo révolutionne la prise de rendez-vous en ligne. Découvrez, réservez et payez vos services en quelques clics, 
            avec la garantie d'une expérience simple et sécurisée.
          </motion.p>

          <motion.p
            className="text-lg text-gray-500 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Fini les appels téléphoniques et les horaires contraignants. 
            Avec Plannéo, prenez le contrôle de votre agenda.
          </motion.p>
        </motion.div>

        {/* Steps Section */}
        <FeatureSteps 
          features={features}
          title="Les étapes pour réserver"
          autoPlayInterval={4000}
        />

        {/* Advantages Section */}
        <motion.div
          className="container mx-auto px-6 py-20"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Pourquoi choisir Plannéo ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez tous les avantages qui font de Plannéo la solution idéale pour vos rendez-vous
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-[#5EE0C1]/20 text-center group hover:bg-white hover:shadow-lg transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-[#5EE0C1]/10 flex items-center justify-center mx-auto mb-6 text-[#37C9A1] group-hover:bg-[#5EE0C1]/20 transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {advantage.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  {advantage.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {advantage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          className="container mx-auto px-6 py-20"
          initial="hidden"
          animate={isStatsInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Plannéo en chiffres
            </h2>
            <p className="text-xl text-gray-600">
              La confiance de milliers d'utilisateurs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatCounter
                key={index}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
                delay={index * 0.1}
              />
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="container mx-auto px-6 py-20"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div
            className="bg-gradient-to-r from-[#5EE0C1] to-[#37C9A1] text-white p-12 rounded-3xl text-center"
            variants={itemVariants}
          >
            <motion.div
              className="inline-flex items-center gap-2 mb-6"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Zap className="w-8 h-8" />
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à simplifier vos rendez-vous ?
            </h2>
            
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Rejoignez des milliers d'utilisateurs qui ont déjà adopté Plannéo. 
              Commencez dès maintenant, c'est gratuit !
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  className="bg-white text-[#37C9A1] hover:bg-gray-50 font-semibold px-8 py-4 rounded-full text-lg"
                >
                  Commencer gratuitement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-full text-lg"
                >
                  Réserver un pro
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>
      {/* Move the FAQ section so it appears immediately before the <Footer /> */}
      <div className="max-w-2xl mx-auto mt-12">
        <h2 className="text-2xl font-bold mb-4 text-[#37C9A1]">FAQ Utilisateurs</h2>
        <Accordion type="single" collapsible>
          {userFaqs.map((faq, idx) => (
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