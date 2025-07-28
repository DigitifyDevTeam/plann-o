import React from 'react';
import { useLocation, useNavigate, useParams, Link, Routes, Route } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Clock, ArrowLeft, Mail, Phone, Globe, Calendar, Settings } from 'lucide-react';
import PublicProfileCalendar from '@/components/dashboard/PublicProfileCalendar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const mockHoraires = [
  { jour: 'Lundi', horaires: '09:00 - 18:00' },
  { jour: 'Mardi', horaires: '09:00 - 18:00' },
  { jour: 'Mercredi', horaires: '09:00 - 18:00' },
  { jour: 'Jeudi', horaires: '09:00 - 18:00' },
  { jour: 'Vendredi', horaires: '09:00 - 18:00' },
  { jour: 'Samedi', horaires: '10:00 - 14:00' },
  { jour: 'Dimanche', horaires: 'Fermé' },
];

// Mock ratings summary data
const ratingsSummary = {
  average: 4.1,
  total: 427,
  distribution: [
    { stars: 5, count: 300 },
    { stars: 4, count: 70 },
    { stars: 3, count: 30 },
    { stars: 2, count: 15 },
    { stars: 1, count: 12 },
  ]
};
const maxCount = Math.max(...ratingsSummary.distribution.map(d => d.count));
const reviews = [
  {
    name: 'Marie L.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    date: '2024-06-01',
    comment: 'Très professionnel, à l’écoute et ponctuel. Je recommande vivement !'
  },
  {
    name: 'Paul D.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4,
    date: '2024-05-20',
    comment: 'Bon accueil, explications claires, rendez-vous rapide.'
  },
  {
    name: 'Sophie M.',
    avatar: '',
    rating: 5,
    date: '2024-05-10',
    comment: 'Excellent service, très satisfait du résultat.'
  }
];

// Mock absence and holiday dates for the agenda
const joursAbsence = [
  '2025-07-03', // Absence
  '2025-07-10', // Congé
];
const joursFeries = [
  '2025-07-14', // Férié
];

export default function ProfessionalPublicProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [professional, setProfessional] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState('essentiel');

  React.useEffect(() => {
    async function fetchProfessional() {
      setLoading(true);
      try {
        // Replace with real API call if available
        const response = await fetch(`/api/professionals/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProfessional(data);
        } else {
          throw new Error('Not found');
        }
      } catch (e) {
        setProfessional({
          name: 'Jean Dupont',
          profession: 'Maçon',
          specialty: 'Gros œuvre',
          rating: 4.8,
          reviewCount: 127,
          location: '15 Rue de la Paix, 75001 Paris',
          image: 'https://randomuser.me/api/portraits/men/44.jpg',
          verified: true,
          email: 'jean.dupont@email.com',
          phone: '01 42 34 56 78',
          website: '',
          logo: '',
          address: {
            street: '15 Rue de la Paix',
            city: 'Paris',
            postalCode: '75001',
            country: 'France',
          },
          bio: '',
        });
      }
      setLoading(false);
    }
    fetchProfessional();
  }, [id]);

  const services = [
    { nom: 'Pose de parpaings', duree: 60, prix: 80 },
    { nom: 'Coulage de dalle', duree: 90, prix: 120 },
    { nom: 'Montage de mur', duree: 45, prix: 70 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#5EE0C1]/5 to-[#37C9A1]/10 flex flex-col">
      <Header />
      <main className="flex-1 w-full py-12 px-4">
        <div className="w-full max-w-5xl mx-auto">
          {/* Top profile layout */}
          <div className="flex flex-row items-center gap-6 mb-8">
            <div className="flex-shrink-0">
              <img
                src={professional?.image}
                alt={professional?.name}
                className="w-24 h-24 rounded-xl object-cover border-4 border-[#5EE0C1] bg-white"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold text-[#0F1B2A]">{professional?.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Star size={18} className="text-yellow-400 fill-current" />
                <span className="font-medium text-gray-700">{professional?.rating}</span>
                <span className="text-gray-400">({professional?.reviewCount} avis)</span>
              </div>
              <p className="text-[#37C9A1] font-medium">{professional?.profession}</p>
              {professional?.specialty && <p className="text-gray-600">{professional.specialty}</p>}
            </div>
          </div>

          {/* Tab Bar */}
          <div className="flex items-center bg-[#f5f8fa] rounded-xl mb-8 overflow-x-auto">
            <button
              className={`flex items-center gap-2 px-8 py-4 font-semibold text-lg transition-colors ${activeTab === 'essentiel' ? 'bg-white shadow text-[#222]' : 'text-[#6b7280] hover:text-[#222]'}`}
              onClick={() => setActiveTab('essentiel')}
            >
              <Settings className="w-5 h-5" /> Essentiel
            </button>
            <button
              className={`flex items-center gap-2 px-8 py-4 font-semibold text-lg transition-colors ${activeTab === 'avis' ? 'bg-white shadow text-[#222]' : 'text-[#6b7280] hover:text-[#222]'}`}
              onClick={() => setActiveTab('avis')}
            >
              <Star className="w-5 h-5" /> Avis
            </button>
            <button
              className={`flex items-center gap-2 px-8 py-4 font-semibold text-lg transition-colors ${activeTab === 'rendezvous' ? 'bg-white shadow text-[#222]' : 'text-[#6b7280] hover:text-[#222]'}`}
              onClick={() => setActiveTab('rendezvous')}
            >
              <Calendar className="w-5 h-5" /> Rendez-vous
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'essentiel' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3">
                <Card className="lg:col-span-2">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                      <Mail className="w-5 h-5" /> Informations de Contact
                    </h3>
                    <div className="space-y-3">
                      {professional?.email && (
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span>{professional.email}</span>
                        </div>
                      )}
                      {professional?.phone && (
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{professional.phone}</span>
                        </div>
                      )}
                      {professional?.website && (
                        <div className="flex items-center gap-3">
                          <Globe className="w-4 h-4 text-gray-400" />
                          <a href={professional.website.startsWith('http') ? professional.website : `https://${professional.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{professional.website}</a>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="p-4 flex flex-col items-center">
                    <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                      <MapPin className="w-5 h-5" /> Logo/Cabinet
                    </h3>
                    <div className="w-12 h-12 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                      {professional?.logo ? (
                        <img src={professional.logo} alt="Logo" className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <MapPin className="w-8 h-8 text-gray-300" />
                      )}
                    </div>
                  </div>
                </Card>
              </div>
              <Card className="mb-3">
                <div className="p-4 flex flex-col lg:flex-row gap-4 items-stretch">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                      <MapPin className="w-5 h-5" /> Adresse du Cabinet
                    </h3>
                    {professional?.address ? (
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                        <div>
                          <p>{professional.address.street}</p>
                          <p>{professional.address.postalCode} {professional.address.city}</p>
                          <p>{professional.address.country}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-500">Adresse non renseignée.</div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center min-h-[180px] gap-2">
                    {/* Dynamic map using Google Maps embed */}
                    {professional?.address && (
                      <iframe
                        title="Cabinet Map"
                        width="100%"
                        height="180"
                        className="rounded-lg border"
                        style={{ minWidth: '200px', minHeight: '180px' }}
                        src={`https://www.google.com/maps?q=${encodeURIComponent(`${professional.address.street}, ${professional.address.postalCode} ${professional.address.city}, ${professional.address.country}`)}&output=embed`}
                        allowFullScreen
                        loading="lazy"
                      ></iframe>
                    )}
                  </div>
                </div>
              </Card>
              <Card className="mb-3">
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-4">Présentation</h3>
                  {professional?.bio ? (
                    <p className="text-gray-700 leading-relaxed">{professional.bio}</p>
                  ) : (
                    <p className="text-gray-500">Aucune présentation renseignée.</p>
                  )}
                </div>
              </Card>
              {/* Horaires Section */}
              <Card className="p-4 mb-3">
                <h2 className="text-lg font-bold mb-4 text-[#37C9A1]">Horaires</h2>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {mockHoraires.map((h, idx) => (
                    <li key={idx} className="text-gray-700 flex items-center gap-2">
                      <span className="font-semibold w-24">{h.jour}:</span>
                      <span>{h.horaires}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              {/* Services Section */}
              <Card className="p-4 mb-3">
                <h2 className="text-lg font-bold mb-4 text-[#37C9A1]">Services proposés</h2>
                <table className="w-full text-left text-gray-700">
                  <thead>
                    <tr>
                      <th className="pb-2">Service</th>
                      <th className="pb-2">Durée du créneau</th>
                      <th className="pb-2">Prix</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="py-2">{service.nom}</td>
                        <td className="py-2">{service.duree} min</td>
                        <td className="py-2">{service.prix} €</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          )}
          {activeTab === 'avis' && (
            <div className="space-y-6">
              <Card className="p-6 mb-3">
                <h2 className="text-lg font-bold mb-6 text-[#37C9A1]">Avis des patients</h2>
                {/* Ratings summary bar */}
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                  <div className="flex flex-col gap-1 w-full max-w-[220px]">
                    {ratingsSummary.distribution.map((d, idx) => (
                      <div key={d.stars} className="flex items-center gap-2">
                        <span className="text-sm font-medium w-3 text-right">{d.stars}</span>
                        <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-3 bg-yellow-400 rounded-full"
                            style={{ width: `${(d.count / maxCount) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col items-center justify-center min-w-[120px]">
                    <span className="text-4xl font-bold text-[#222]">{ratingsSummary.average.toLocaleString('fr-FR', { minimumFractionDigits: 1 })}</span>
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} className={i < Math.round(ratingsSummary.average) ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
                      ))}
                    </div>
                    <span className="text-gray-500 text-sm">{ratingsSummary.total} avis</span>
                  </div>
                </div>
                {/* Reviews list */}
                <div className="space-y-4">
                  {reviews.map((review, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row md:items-center gap-4 bg-[#f8fafc] rounded-lg p-4 border border-[#e5e7eb]">
                      <div className="flex items-center gap-3 min-w-[120px]">
                        {review.avatar ? (
                          <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#5EE0C1]" />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-500 border-2 border-[#5EE0C1]">
                            {review.name[0]}
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="font-semibold text-[#222]">{review.name}</span>
                          <span className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
                          ))}
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
          {activeTab === 'rendezvous' && (
            <Card className="p-4 mb-3">
              <div className="flex flex-col items-start">
                <div className="w-full flex justify-start">
                  <div className="max-w-full">
                    <PublicProfileCalendar
                      confirmedAppointments={[
                        {
                          id: '1',
                          clientName: 'Test Client',
                          clientEmail: 'test@example.com',
                          date: `${new Date().getFullYear()}-${(new Date().getMonth()+1).toString().padStart(2,'0')}-15`,
                          time: '10:00',
                          duration: 60,
                          status: 'confirmed',
                          type: 'physical',
                          notes: '',
                          service: 'Consultation',
                          prix: 0
                        }
                      ]}
                      joursAbsence={joursAbsence}
                      joursFeries={joursFeries}
                      horaires={mockHoraires}
                    />
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
} 