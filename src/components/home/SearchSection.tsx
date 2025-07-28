import SearchBanner from "@/components/home/SearchBanner";

interface SearchSectionProps {
  fullPage?: boolean;
}

export default function SearchSection({ fullPage = false }: SearchSectionProps) {
  // Liste des métiers fixes
  const jobs = [
    "Maçon", "Carreleur", "Électricien", "Plombier-chauffagiste", "Couvreur-zingueur", "Menuisier", "Ebéniste", "Tailleur de pierre", "Plâtrier", "Staffeur-ornemaniste", "Marbrier", "Serrurier", "Ferronnier d'art", "Peintre en bâtiment", "Vitrier"
  ];
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <SearchBanner jobs={jobs} fullPage={fullPage} />
      </div>
    </section>
  );
}