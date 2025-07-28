import * as React from "react";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Users, Crown, ArrowRight, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
// Utility function for className merging
function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

interface PricingTier {
  name: string;
  subtitle: string;
  price: { monthly: number; yearly: number };
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  borderGradient: string;
  features: string[];
  highlight: boolean;
  badge: string | null;
  popular?: boolean;
}

interface FrenchPricingProps {
  onPlanSelect?: (planName: string, isYearly: boolean) => void;
}

const pricingPlans: PricingTier[] = [
  {
    name: "Gratuit",
    subtitle: "Pour les utilisateurs",
    price: { monthly: 0, yearly: 0 },
    description: "Parfait pour commencer votre parcours",
    icon: Users,
    gradient: "from-[#5EE0C1]/20 to-[#37C9A1]/20",
    borderGradient: "from-[#5EE0C1] to-[#37C9A1]",
    features: [
      "5 projets par mois",
      "Accès aux modèles de base",
      "Support par email",
      "Modèles standards",
      "1GB de stockage cloud",
      "Analyses de base"
    ],
    highlight: false,
    badge: null
  },
  {
    name: "Professionnel",
    subtitle: "Pour les professionnels",
    price: { monthly: 30, yearly: 300 },
    description: "Capacités avancées pour les équipes en croissance",
    icon: Crown,
    gradient: "from-[#5EE0C1]/30 to-[#37C9A1]/30",
    borderGradient: "from-[#5EE0C1] to-[#37C9A1]",
    features: [
      "Projets illimités",
      "Modèles premium",
      "Support prioritaire",
      "Modèles personnalisés",
      "100GB de stockage cloud",
      "Analyses avancées",
      "Collaboration d'équipe",
      "Accès API"
    ],
    highlight: true,
    badge: "Plus Populaire",
    popular: true
  }
];

export function FrenchPricing({ onPlanSelect }: FrenchPricingProps = {}) {
  const [isYearly, setIsYearly] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  const handlePlanSelect = (planName: string) => {
    onPlanSelect?.(planName, isYearly);
  };

  const calculateYearlySavings = (monthlyPrice: number, yearlyPrice: number) => {
    return Math.max(0, (monthlyPrice * 12) - yearlyPrice);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.23, 0.86, 0.39, 0.96] 
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

  const cardHover = {
    rest: { scale: 1, y: 0 },
    hover: { 
      scale: 1.05, 
      y: -10,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative py-32 bg-gradient-to-br from-white via-[#5EE0C1]/5 to-white text-foreground overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-[#5EE0C1]/[0.08] via-[#37C9A1]/[0.05] to-white/[0.08]"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: '400% 400%'
          }}
        />
        
        <motion.div
          className="absolute top-1/4 left-1/6 w-80 h-80 bg-[#5EE0C1]/10 rounded-full blur-3xl"
          animate={{
            x: [0, 150, 0],
            y: [0, 80, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/6 w-64 h-64 bg-[#37C9A1]/10 rounded-full blur-3xl"
          animate={{
            x: [0, -120, 0],
            y: [0, -60, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#5EE0C1]/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div 
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
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#5EE0C1]/[0.08] border border-[#5EE0C1]/[0.15] backdrop-blur-sm mb-6"
            whileHover={{ scale: 1.05, borderColor: "#5EE0C1" }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-4 w-4 text-[#37C9A1]" />
            </motion.div>
            <span className="text-sm font-medium text-foreground/80">
              ✨ Plans Premium
            </span>
            <div className="w-2 h-2 bg-[#5EE0C1] rounded-full animate-pulse" />
          </motion.div>

          <motion.h2 
            className="text-4xl sm:text-6xl md:text-7xl font-bold mb-8 tracking-tight"
            variants={fadeInUp}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
              Choisissez Votre
            </span>
            <br />
            <motion.span 
              className="bg-clip-text text-transparent bg-gradient-to-r from-[#5EE0C1] via-[#37C9A1] to-[#5EE0C1]"
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
              Plan Parfait
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-xl sm:text-2xl text-foreground/60 max-w-4xl mx-auto leading-relaxed mb-12"
            variants={fadeInUp}
          >
            Débloquez tout le potentiel de notre plateforme avec nos plans conçus pour chaque étape de votre parcours.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div 
            className="flex items-center justify-center gap-4"
            variants={fadeInUp}
          >
            <span className={`text-sm font-medium ${!isYearly ? 'text-foreground' : 'text-foreground/60'}`}>
              Mensuel
            </span>
            <motion.button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-16 h-8 rounded-full border-2 transition-all ${
                isYearly ? 'bg-[#5EE0C1] border-[#37C9A1]' : 'bg-background border-border'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-lg"
                animate={{
                  x: isYearly ? 32 : 2
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30
                }}
              />
            </motion.button>
            <span className={`text-sm font-medium ${isYearly ? 'text-foreground' : 'text-foreground/60'}`}>
              Annuel
            </span>
            {isYearly && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-2 py-1 bg-[#5EE0C1]/20 border border-[#37C9A1]/30 rounded-full text-xs text-[#37C9A1]"
              >
                1 mois gratuit
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 max-w-4xl mx-auto"
          variants={staggerContainer}
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className="relative"
              variants={fadeInUp}
              onHoverStart={() => setHoveredPlan(index)}
              onHoverEnd={() => setHoveredPlan(null)}
            >
              <Card
                className={cn(
                  "relative h-full p-8 rounded-3xl border backdrop-blur-xl overflow-hidden transition-all duration-300",
                  plan.highlight
                    ? 'bg-gradient-to-br from-[#5EE0C1]/[0.12] to-[#37C9A1]/[0.04] border-[#5EE0C1]/50 shadow-[0_25px_50px_-12px_rgba(94,224,193,0.4)]'
                    : 'bg-background border-border hover:border-[#5EE0C1]/30'
                )}
              >
                {/* Badge */}
                {plan.badge && (
                  <motion.div
                    className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 z-20"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Badge className="bg-gradient-to-r from-[#5EE0C1] to-[#37C9A1] text-white border-0">
                      {plan.badge}
                    </Badge>
                  </motion.div>
                )}

                {/* Gradient overlay */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} rounded-3xl opacity-60`}
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: '300% 300%'
                  }}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} border border-[#5EE0C1]/20 flex items-center justify-center mb-6`}
                    whileHover={{ scale: 1.1, rotateY: 180 }}
                    transition={{ duration: 0.6 }}
                  >
                    <plan.icon className="w-8 h-8 text-[#37C9A1]" />
                  </motion.div>

                  {/* Plan Info */}
                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-foreground/60 text-sm mb-4">{plan.subtitle}</p>
                  <p className="text-foreground/80 mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-foreground">
                        {plan.price.monthly === 0 ? 'Gratuit' : `${isYearly ? plan.price.yearly : plan.price.monthly}€`}
                      </span>
                      {plan.price.monthly > 0 && (
                        <span className="text-foreground/60">
                          /{isYearly ? 'an' : 'mois'}
                        </span>
                      )}
                    </div>
                    {isYearly && plan.price.monthly > 0 && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[#37C9A1] text-sm mt-1"
                      >
                        Économisez {calculateYearlySavings(plan.price.monthly, plan.price.yearly)}€ par an
                      </motion.p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-center gap-3 py-1.5"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                      >
                        <div className="w-5 h-5 rounded-full bg-[#5EE0C1]/20 border border-[#37C9A1]/30 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-[#37C9A1]" />
                        </div>
                        <span className="text-foreground/80 text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => handlePlanSelect(plan.name)}
                    className={cn(
                      "w-full py-4 px-6 rounded-xl font-medium transition-all group",
                      plan.highlight
                        ? 'bg-gradient-to-r from-[#5EE0C1] to-[#37C9A1] hover:from-[#37C9A1] hover:to-[#5EE0C1] text-white border-0'
                        : 'bg-background border border-[#5EE0C1]/30 text-foreground hover:bg-[#5EE0C1]/10 hover:border-[#5EE0C1]/50'
                    )}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {plan.price.monthly === 0 ? 'Commencer Gratuitement' : 'Choisir ce Plan'}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </div>

                {/* Hover glow effect */}
                <AnimatePresence>
                  {hoveredPlan === index && (
                    <motion.div
                      className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#5EE0C1]/20 to-[#37C9A1]/10"
                      style={{
                        filter: 'blur(20px)',
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          variants={fadeInUp}
        >
          <div className="relative bg-gradient-to-br from-[#5EE0C1]/[0.08] to-[#37C9A1]/[0.02] backdrop-blur-xl rounded-3xl border border-[#5EE0C1]/[0.15] p-8 md:p-12 overflow-hidden group max-w-4xl mx-auto">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#5EE0C1]/[0.08] via-[#37C9A1]/[0.05] to-white/[0.08] rounded-3xl"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: '300% 300%'
              }}
            />
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-[#37C9A1] to-[#5EE0C1] bg-clip-text text-transparent">
                  Prêt à Transformer Votre Travail ?
                </span>
              </h3>
              <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
                Rejoignez des milliers d'utilisateurs qui utilisent déjà notre plateforme pour révolutionner leur façon de travailler. 
                Commencez votre essai gratuit dès aujourd'hui.
              </p>
              
              <Button
                className="relative group overflow-hidden bg-gradient-to-r from-[#5EE0C1] to-[#37C9A1] hover:from-[#37C9A1] hover:to-[#5EE0C1] text-white font-medium py-4 px-8 rounded-xl transition-all border-0"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Star className="h-5 w-5" />
                  Commencer l'Essai Gratuit
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function FrenchPricingDemo() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FrenchPricing 
        onPlanSelect={(planName, isYearly) => {
          console.log(`Plan sélectionné: ${planName}, Annuel: ${isYearly}`);
        }}
      />
      <Footer />
    </div>
  );
}

export default FrenchPricingDemo; 