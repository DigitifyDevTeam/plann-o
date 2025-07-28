import React, { useState } from 'react';
import { Search, Briefcase, MapPin, Calendar, Star, Phone, Clock, User, LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

interface Professional {
  id: string;
  name: string;
  profession: string;
  specialty?: string;
  rating: number;
  reviewCount: number;
  location: string;
  distance: string;
  phone: string;
  nextAvailability: string;
  price: string;
  image: string;
  verified: boolean;
}

interface SearchBannerProps {
  jobs: string[];
  onSearch?: (data: { profession: string; location: string; date: string }) => void;
  fullPage?: boolean;
}

const SearchBanner: React.FC<SearchBannerProps> = ({ 
  jobs,
  onSearch = () => {},
  fullPage = false
}) => {
  const [profession, setProfession] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<Professional[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    onSearch({ profession, location, date });
    // Mock search results
    const mockResults: Professional[] = [
      {
        id: '1',
        name: 'Jean Dupont',
        profession: 'Maçon',
        specialty: 'Gros œuvre',
        rating: 4.8,
        reviewCount: 127,
        location: '15 Rue de la Paix, 75001 Paris',
        distance: '2.3 km',
        phone: '01 42 34 56 78',
        nextAvailability: 'Aujourd\'hui 14h30',
        price: '50€',
        image: 'https://randomuser.me/api/portraits/men/44.jpg',
        verified: true
      },
      {
        id: '2',
        name: 'Sophie Martin',
        profession: 'Électricien',
        specialty: 'Installation électrique',
        rating: 4.6,
        reviewCount: 89,
        location: '42 Avenue des Champs, 75008 Paris',
        distance: '3.7 km',
        phone: '01 45 67 89 10',
        nextAvailability: 'Demain 9h00',
        price: '80€',
        image: 'https://randomuser.me/api/portraits/women/65.jpg',
        verified: true
      },
      {
        id: '3',
        name: 'Pierre Bernard',
        profession: 'Plombier-chauffagiste',
        specialty: 'Chauffage',
        rating: 4.9,
        reviewCount: 203,
        location: '8 Boulevard Saint-Germain, 75005 Paris',
        distance: '1.8 km',
        phone: '01 56 78 90 12',
        nextAvailability: 'Aujourd\'hui 16h00',
        price: '65€',
        image: 'https://randomuser.me/api/portraits/men/65.jpg',
        verified: false
      }
    ];
    setSearchResults(mockResults);
    setShowResults(true);
  };

  const handleChipClick = (job: string) => {
    setProfession(job);
  };

  return (
    <div className="w-full bg-white min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-in fade-in duration-300">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4"
            style={{ fontFamily: 'Poppins, sans-serif', color: '#0F1B2A' }}
          >
            {showResults ? 'Résultats de la recherche' : 'Trouvez le professionnel qu\'il vous faut'}
          </h1>
          <p 
            className="text-lg md:text-xl lg:text-2xl"
            style={{ fontFamily: 'Inter, sans-serif', color: '#0F1B2A' }}
          >
            {showResults ? `${searchResults.length} professionnel${searchResults.length > 1 ? 's' : ''} trouvé${searchResults.length > 1 ? 's' : ''} près de vous` : 'Recherchez par métier, localisation ou disponibilité'}
          </p>
        </div>

        {/* Search Card */}
        <Card 
          className="p-6 md:p-8 animate-in fade-in duration-300 delay-150"
          style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', border: 'none' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            {/* Profession Field */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Briefcase size={20} />
              </div>
              <select
                value={profession}
                onChange={e => setProfession(e.target.value)}
                className="pl-10 h-12 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#37C9A1] focus:border-transparent w-full rounded-md"
                aria-label="Rechercher par métier"
              >
                <option value="">Sélectionner un métier...</option>
                {jobs.map((job) => (
                  <option key={job} value={job}>{job}</option>
                ))}
              </select>
            </div>
            {/* Location Field */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <MapPin size={20} />
              </div>
              <Input
                type="text"
                placeholder="Ville, code postal..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 h-12 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#37C9A1] focus:border-transparent"
                style={{ backgroundColor: '#FFFFFF', color: '#0F1B2A' }}
                aria-label="Rechercher par ville ou code postal"
              />
            </div>
            {/* Date Field */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Calendar size={20} />
              </div>
              <Input
                type="date"
                placeholder="jj/mm/aaaa"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="pl-10 h-12 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#37C9A1] focus:border-transparent"
                style={{ backgroundColor: '#FFFFFF', color: '#0F1B2A' }}
                aria-label="Sélectionner une date de disponibilité"
              />
            </div>
            {/* Search Button */}
            <Button
              onClick={handleSearch}
              className="h-12 font-medium text-white transition-all duration-200 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-[#37C9A1] focus:ring-offset-2"
              style={{ backgroundColor: '#5EE0C1', borderRadius: '8px' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg, #5EE0C1 0%, #37C9A1 100%)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#5EE0C1'; }}
            >
              <Search size={18} className="mr-2" />
              Rechercher
            </Button>
          </div>
        </Card>
        {/* Popular Jobs Chips */}
        {!showResults ? (
          <div className="mt-8 text-center animate-in fade-in duration-300 delay-300">
            <p className="text-sm mb-4" style={{ color: '#6B7280' }}>
              Métiers populaires :
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {jobs.map((job, index) => (
                <button
                  key={index}
                  onClick={() => handleChipClick(job)}
                  className="px-4 py-2 rounded-full border transition-all duration-200 hover:border-[#37C9A1] hover:text-[#37C9A1] focus:outline-none focus:ring-2 focus:ring-[#37C9A1] focus:ring-offset-2"
                  style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E7EB', color: '#0F1B2A' }}
                >
                  {job}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-8 text-center">
            <Button
              onClick={() => setShowResults(false)}
              variant="outline"
              className="border-[#37C9A1] text-[#37C9A1] hover:bg-[#37C9A1] hover:text-white"
            >
              Nouvelle recherche
            </Button>
          </div>
        )}
        {/* Search Results */}
        {showResults && (
          <div className="mt-12 animate-in fade-in duration-300">
            {/* Grid/List Toggle */}
            <div className="flex justify-end mb-4 gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#37C9A1] text-white' : 'bg-gray-100 text-gray-500'}`}
                aria-label="Vue grille"
              >
                <LayoutGrid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#37C9A1] text-white' : 'bg-gray-100 text-gray-500'}`}
                aria-label="Vue liste"
              >
                <List size={20} />
              </button>
            </div>
            <div className={viewMode === 'grid' ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3' : 'flex flex-col gap-6'}>
              {searchResults.map((professional) => (
                <motion.div
                  key={professional.id}
                  onMouseEnter={() => setHoveredId(professional.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  animate={hoveredId === professional.id ? { scale: 1.05, boxShadow: '0 8px 32px rgba(55,201,161,0.10)' } : { scale: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  style={{ borderRadius: '16px', border: '1px solid #F3F4F6', backgroundColor: '#FFFFFF' }}
                  className={viewMode === 'grid' ? 'hover:shadow-lg transition-shadow duration-200' : 'hover:shadow-lg transition-shadow duration-200 w-full'}
                >
                  {viewMode === 'list' ? (
                    <div className="flex flex-row items-center w-full gap-6">
                      <img
                        src={professional.image}
                        alt={professional.name}
                        className="w-20 h-20 rounded-full object-cover mr-6"
                      />
                      <div className="flex-1 flex flex-col items-start">
                        <h3 className="font-semibold text-lg mb-1" style={{ color: '#0F1B2A' }}>{professional.name}</h3>
                        <p className="text-[#37C9A1] font-medium mb-1">{professional.profession}</p>
                        {professional.location && (
                          <p className="text-sm text-gray-600 mb-2 flex items-center"><MapPin size={16} className="mr-1" />{professional.location}</p>
                        )}
                        <div className="flex items-center gap-2 mb-2">
                          <Star size={16} className="text-yellow-400 fill-current" />
                          <span className="font-medium text-gray-700">{professional.rating}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Clock size={16} className="text-[#37C9A1]" />
                          <span className="text-sm text-[#37C9A1] font-medium">Disponible aujourd'hui</span>
                        </div>
                        {professional.verified && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs mb-2">Vérifié</Badge>
                        )}
                      </div>
                      <Button
                        className="ml-auto text-white font-medium"
                        style={{ backgroundColor: '#5EE0C1', minWidth: 150 }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg, #5EE0C1 0%, #37C9A1 100%)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#5EE0C1'; }}
                        onClick={() => navigate(`/professionnel/${professional.id}`, { state: { professional } })}
                      >
                        Voir le profil
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center md:items-start md:flex-row gap-6 w-full">
                      <img
                        src={professional.image}
                        alt={professional.name}
                        className="w-20 h-20 rounded-full object-cover mb-4 md:mb-0"
                      />
                      <div className="flex-1 flex flex-col items-center md:items-start">
                        <h3 className="font-semibold text-lg mb-1" style={{ color: '#0F1B2A' }}>{professional.name}</h3>
                        <p className="text-[#37C9A1] font-medium mb-1">{professional.profession}</p>
                        {professional.location && (
                          <p className="text-sm text-gray-600 mb-2 flex items-center"><MapPin size={16} className="mr-1" />{professional.location}</p>
                        )}
                        <div className="flex items-center gap-2 mb-2">
                          <Star size={16} className="text-yellow-400 fill-current" />
                          <span className="font-medium text-gray-700">{professional.rating}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Clock size={16} className="text-[#37C9A1]" />
                          <span className="text-sm text-[#37C9A1] font-medium">Disponible aujourd'hui</span>
                        </div>
                        {professional.verified && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs mb-2">Vérifié</Badge>
                        )}
                        <Button
                          className="w-full mt-2 text-white font-medium"
                          style={{ backgroundColor: '#5EE0C1' }}
                          onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg, #5EE0C1 0%, #37C9A1 100%)'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = '#5EE0C1'; }}
                          onClick={() => navigate(`/professionnel/${professional.id}`, { state: { professional } })}
                        >
                          Voir le profil
                        </Button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
        {/* Add 'Voir plus' button if not fullPage */}
        {!fullPage && (
          <div className="text-center mt-12">
            <Link to="/trouvez-le-professionnel">
              <button
                className="text-primary font-medium hover:text-primary-hover transition-colors border border-primary px-6 py-2 rounded-lg"
              >
                Trouver un professionnel
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBanner; 