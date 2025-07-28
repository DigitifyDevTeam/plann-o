import ProfessionalCard from "@/components/professionals/ProfessionalCard";

const featuredProfessionals = [
  {
    id: "1",
    name: "Marie Dubois",
    profession: "Médecin généraliste",
    location: "Paris 15ème",
    rating: 4.8,
    reviewCount: 142,
    price: "50€",
    nextAvailability: "aujourd'hui",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    specialties: ["Médecine générale", "Téléconsultation", "Urgences"],
    isOnline: true
  },
  {
    id: "2",
    name: "Jean Martin",
    profession: "Kinésithérapeute",
    location: "Lyon 3ème",
    rating: 4.9,
    reviewCount: 89,
    price: "45€",
    nextAvailability: "demain",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    specialties: ["Sport", "Rééducation", "Massages"],
    isOnline: false
  },
  {
    id: "3",
    name: "Sophie Chen",
    profession: "Psychologue",
    location: "Marseille",
    rating: 4.7,
    reviewCount: 67,
    price: "70€",
    nextAvailability: "dans 2 jours",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    specialties: ["TCC", "Anxiété", "Burnout"],
    isOnline: true
  },
  {
    id: "4",
    name: "Pierre Lemaire",
    profession: "Ostéopathe",
    location: "Toulouse",
    rating: 4.8,
    reviewCount: 156,
    price: "60€",
    nextAvailability: "cette semaine",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    specialties: ["Sportifs", "Enfants", "Grossesse"]
  }
];

export default function FeaturedProfessionals() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Professionnels recommandés
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos professionnels les mieux notés, disponibles près de chez vous
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {featuredProfessionals.map((professional, index) => (
            <div key={professional.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProfessionalCard professional={professional} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="text-primary font-medium hover:text-primary-hover transition-colors">
            Voir tous les professionnels →
          </button>
        </div>
      </div>
    </section>
  );
}