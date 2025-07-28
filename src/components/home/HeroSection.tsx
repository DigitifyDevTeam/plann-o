import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, Shield } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-gradient-soft py-20">
      <div className="container mx-auto px-4">
        <div className="md:flex md:items-center md:gap-12 text-center md:text-left animate-fade-in">
          {/* Hero Image - align left as much as possible */}
          <div className="md:flex-shrink-0 md:w-[48%] flex justify-start">
            <img
              src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80"
              alt="Professionnel sur le terrain"
              className="mb-8 md:mb-0 w-full rounded-3xl shadow-xl object-cover md:max-w-none md:w-full"
              style={{ aspectRatio: '3/2' }}
            />
          </div>
          <div className="flex-1">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Prenez rendez-vous en{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                quelques clics
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl md:mx-0 mx-auto leading-relaxed">
              Plannéo connecte les professionnels de tous secteurs avec leurs clients. 
              Réservez facilement vos créneaux en ligne, 24h/24.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-12">
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-lg px-8 py-4 shadow-soft">
                <Calendar className="w-5 h-5 mr-2" />
                Prendre rendez-vous
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Découvrir les professionnels
              </Button>
            </div>
          </div>
        </div>
        {/* Trust indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center animate-slide-up">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Réservation instantanée</h3>
              <p className="text-muted-foreground text-sm">Confirmez votre rendez-vous immédiatement</p>
            </div>
            
            <div className="flex flex-col items-center animate-slide-up delay-100">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Disponible 24h/24</h3>
              <p className="text-muted-foreground text-sm">Réservez à tout moment, même hors horaires</p>
            </div>
            
            <div className="flex flex-col items-center animate-slide-up delay-200">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Paiement sécurisé</h3>
              <p className="text-muted-foreground text-sm">Transactions protégées et rappels automatiques</p>
            </div>
          </div>
        </div>
    </section>
  );
}