import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star, Clock, Euro } from "lucide-react";

interface ProfessionalCardProps {
  professional: {
    id: string;
    name: string;
    profession: string;
    location: string;
    rating: number;
    reviewCount: number;
    price: string;
    nextAvailability: string;
    avatar: string;
    specialties: string[];
    isOnline?: boolean;
  };
}

export default function ProfessionalCard({ professional }: ProfessionalCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-soft transition-all duration-300 group cursor-pointer animate-scale-in">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          {/* Avatar */}
          <div className="relative">
            {professional.avatar ? (
              <img
                src={professional.avatar}
                alt={professional.name}
                className="w-16 h-16 rounded-xl object-cover shadow-md border-2 border-white"
              />
            ) : (
              <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">
                {professional.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            {professional.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                Dr. {professional.name}
              </h3>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{professional.rating}</span>
                <span className="text-xs text-muted-foreground">({professional.reviewCount})</span>
              </div>
            </div>

            {/* Profession */}
            <p className="text-primary font-medium mb-1">{professional.profession}</p>
            
            {/* Location */}
            <div className="flex items-center text-muted-foreground text-sm mb-3">
              <MapPin className="w-4 h-4 mr-1" />
              {professional.location}
            </div>

            {/* Specialties */}
            <div className="flex flex-wrap gap-1 mb-4">
              {professional.specialties.slice(0, 2).map((specialty) => (
                <Badge key={specialty} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))}
              {professional.specialties.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{professional.specialties.length - 2}
                </Badge>
              )}
            </div>

            {/* Availability & Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
                <span>Dispo {professional.nextAvailability}</span>
              </div>
              <div className="flex items-center text-sm font-medium text-foreground">
                <Euro className="w-4 h-4 mr-1" />
                {professional.price}
              </div>
            </div>

            {/* Action Button */}
            <Button 
              className="w-full mt-4 bg-primary hover:bg-primary-hover"
              size="sm"
            >
              Prendre rendez-vous
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}