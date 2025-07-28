import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Claire Moreau",
    profession: "Enseignante",
    content: "Plannéo m'a fait gagner un temps précieux ! Plus besoin d'appeler pendant les heures d'ouverture, je réserve mes rendez-vous médicaux quand ça m'arrange.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    id: 2,
    name: "Marc Dubois",
    profession: "Chef d'entreprise",
    content: "Interface très intuitive et professionnels de qualité. J'ai trouvé un excellent ostéopathe près de mon bureau en quelques clics.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/43.jpg"
  },
  {
    id: 3,
    name: "Sarah Ben Ali",
    profession: "Étudiante",
    content: "Parfait pour mes consultations de psychologie. Les rappels automatiques m'évitent d'oublier mes rendez-vous importants.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/22.jpg"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-gradient-soft">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ce que disent nos utilisateurs
          </h2>
          <p className="text-muted-foreground">
            Découvrez les retours de ceux qui utilisent Plannéo au quotidien
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              className="relative overflow-hidden animate-fade-in hover:shadow-soft transition-all duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center">
                  {testimonial.avatar && testimonial.avatar.startsWith('http') ? (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover shadow-md mr-4 border-2 border-white"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.profession}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}