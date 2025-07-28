
export interface Metier {
  id: string;
  nom: string;
}

export interface Service {
  id: string;
  nom: string;
  duree: number; // en minutes
  prix: number;
}

export interface JourTravail {
  jour: 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';
  actif: boolean;
  heureDebut: string;
  heureFin: string;
}

export interface PlanningConfig {
  metiers: string[];
  services: Service[];
  joursTravail: JourTravail[];
  joursAbsence: Date[];
  joursFeries: Date[];
}

export const METIERS_BATIMENT: Metier[] = [
  { id: 'macon', nom: 'Maçon' },
  { id: 'carreleur', nom: 'Carreleur' },
  { id: 'electricien', nom: 'Électricien' },
  { id: 'plombier-chauffagiste', nom: 'Plombier-chauffagiste' },
  { id: 'couvreur-zingueur', nom: 'Couvreur-zingueur' },
  { id: 'menuisier', nom: 'Menuisier' },
  { id: 'ebeniste', nom: 'Ébéniste' },
  { id: 'tailleur-pierre', nom: 'Tailleur de pierre' },
  { id: 'platrier', nom: 'Plâtrier' },
  { id: 'staffeur-ornemaniste', nom: 'Staffeur-ornemaniste' },
  { id: 'marbrier', nom: 'Marbrier' },
  { id: 'serrurier', nom: 'Serrurier' },
  { id: 'ferronnier-art', nom: 'Ferronnier d\'art' },
  { id: 'peintre-batiment', nom: 'Peintre en bâtiment' },
  { id: 'vitrier', nom: 'Vitrier' }
];

export const DUREES_CRENEAUX = [15, 30, 45, 60, 90, 120]; // en minutes
