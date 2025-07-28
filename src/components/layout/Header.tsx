
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Search, User, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Header() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground">Plannéo</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8 relative">
            <Link to="/trouvez-le-professionnel" className="text-foreground hover:text-primary transition-colors">
              Trouver un professionnel
            </Link>
            {/* Solution Dropdown */}
            <div className="relative group">
              <button className="text-foreground hover:text-primary transition-colors flex items-center gap-1 focus:outline-none">
                Solution
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className="absolute left-0 top-full mt-3 min-w-[340px] bg-white border border-border rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto transition-all z-50">
                <div className="flex flex-row divide-x">
                  {/* Utilisateur */}
                  <Link to="/solution/utilisateur" className="flex-1 flex flex-col items-center gap-2 p-6 hover:bg-muted/50 transition-colors text-center">
                    <User className="w-6 h-6 text-primary mb-2" />
                    <span className="font-bold text-foreground text-base">Utilisateurs</span>
                  </Link>
                  {/* Professionnel */}
                  <Link to="/solution/professional" className="flex-1 flex flex-col items-center gap-2 p-6 hover:bg-muted/50 transition-colors text-center">
                    <Briefcase className="w-6 h-6 text-secondary mb-2" />
                    <span className="font-bold text-foreground text-base">Professionnels</span>
                  </Link>
                </div>
              </div>
            </div>
            <Link to="/solution/professional" className="text-foreground hover:text-primary transition-colors">
              Fiche professionnelle
            </Link>
            <Link to="/pricing" className="text-foreground hover:text-primary transition-colors">
              Tarifs
            </Link>
            <Link to="/contactez-nous" className="text-foreground hover:text-primary transition-colors">
              Contactez-nous
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="hidden sm:flex">
                    <User className="w-4 h-4 mr-2" />
                    Tableau de bord
                  </Button>
                </Link>
                {/* Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="rounded-full bg-muted p-1.5 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user.avatar || undefined} alt={user.name} />
                        <AvatarFallback>
                          <User className="w-5 h-5 text-muted-foreground" />
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard/professional/profile">Mon profil</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>Se déconnecter</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-sm"
                >
                  Se déconnecter
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth/login">
                  <Button variant="outline" size="sm" className="hidden sm:flex">
                    <User className="w-4 h-4 mr-2" />
                    Se connecter
                  </Button>
                </Link>
                <Link to="/auth/register">
                  <Button size="sm" className="bg-primary hover:bg-primary-hover">
                    Rejoindre
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
