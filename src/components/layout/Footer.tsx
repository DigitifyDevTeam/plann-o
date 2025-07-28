import { Calendar, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold">Plannéo</span>
            </div>
            <p className="text-background/80 mb-6 max-w-md">
              La plateforme qui simplifie la prise de rendez-vous entre professionnels et clients. 
              Réservez en ligne, 24h/24, en toute simplicité.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
              <Instagram className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
              <Linkedin className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
            </div>
          </div>

          {/* Pour les clients */}
          <div>
            <h3 className="font-semibold mb-4">Pour les clients</h3>
            <ul className="space-y-2 text-background/80">
              <li><a href="#" className="hover:text-primary transition-colors">Trouver un professionnel</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Prendre rendez-vous</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Gérer mes rendez-vous</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Aide et support</a></li>
            </ul>
          </div>

          {/* Pour les professionnels */}
          <div>
            <h3 className="font-semibold mb-4">Pour les professionnels</h3>
            <ul className="space-y-2 text-background/80">
              <li><a href="#" className="hover:text-primary transition-colors">Rejoindre Plannéo</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Tarifs et abonnements</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Gestion du planning</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Espace professionnel</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-background/60 text-sm">
            © 2024 Plannéo. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-background/60 text-sm hover:text-primary transition-colors">
              Mentions légales
            </a>
            <a href="#" className="text-background/60 text-sm hover:text-primary transition-colors">
              Confidentialité
            </a>
            <a href="#" className="text-background/60 text-sm hover:text-primary transition-colors">
              CGU
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}