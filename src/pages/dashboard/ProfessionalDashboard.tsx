
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Calendar, Clock, Users, TrendingUp, Settings, CreditCard, Star, MapPin, Phone, Mail, Globe, Camera, Edit3, Save, X, BarChart3, Bell, FileText, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PlanningManagement from '@/pages/planning/PlanningManagement';
import ProfessionalProfileComponent from '@/pages/dashboard/ProfessionalProfileComponent';
import InteractiveCalendar from '@/components/dashboard/InteractiveCalendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Stats {
  totalAppointments: number;
  monthlyRevenue: number;
  clientSatisfaction: number;
  cancellationRate: number;
  trends: {
    appointments: number;
    revenue: number;
  };
}

interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  date: string;
  time: string;
  duration: number;
  status: 'confirmed' | 'pending' | 'canceled' | 'completed';
  type: 'physical' | 'teleconsultation';
  notes?: string;
  service?: string; // Added for bookings page
  prix?: number; // Added for bookings page
  clientAvatar?: string; // Added for client avatar
  clientPhone?: string; // Added for client phone
}

const ProfessionalDashboard: React.FC = () => {
  const menuItems = [
    { title: "Tableau de bord", path: "/dashboard/professional", icon: "LayoutDashboard" },
    { title: "Planning", path: "/dashboard/professional/planning", icon: "Calendar" },
    { title: "Rendez vous", path: "/dashboard/professional/bookings", icon: "BookOpen" },
    { title: "Profil", path: "/dashboard/professional/profile", icon: "User" }
  ];

  // Move appointments state here
  const currentYear = new Date().getFullYear();
  const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      clientName: 'Jean Dupont',
      clientEmail: 'jean.dupont@email.com',
      date: '2024-01-15',
      time: '09:00',
      duration: 30,
      status: 'pending',
      type: 'physical',
      notes: 'Installation électrique',
      service: 'Installation électrique',
      prix: 80,
      clientAvatar: 'https://randomuser.me/api/portraits/men/44.jpg'
    },
    {
      id: '2',
      clientName: 'Sophie Martin',
      clientEmail: 'sophie.martin@email.com',
      date: '2024-01-15',
      time: '10:30',
      duration: 45,
      status: 'pending',
      type: 'teleconsultation',
      notes: 'Dépannage plomberie',
      service: 'Dépannage plomberie',
      prix: 60,
      clientAvatar: 'https://randomuser.me/api/portraits/women/65.jpg'
    },
    {
      id: '3',
      clientName: 'Pierre Bernard',
      clientEmail: 'pierre.bernard@email.com',
      date: '2024-01-16',
      time: '14:00',
      duration: 30,
      status: 'confirmed',
      type: 'physical',
      notes: 'Pose carrelage',
      service: 'Pose carrelage',
      prix: 120,
      clientAvatar: 'https://randomuser.me/api/portraits/men/65.jpg'
    },
    // Add two confirmed appointments for July 28 of the current year
    {
      id: '4',
      clientName: 'Alice Durand',
      clientEmail: 'alice.durand@email.com',
      date: `${currentYear}-07-28`,
      time: '09:00',
      duration: 60,
      status: 'confirmed',
      type: 'physical',
      notes: 'Rénovation cuisine',
      service: 'Rénovation cuisine',
      prix: 200,
      clientAvatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: '5',
      clientName: 'Marc Petit',
      clientEmail: 'marc.petit@email.com',
      date: `${currentYear}-07-28`,
      time: '14:00',
      duration: 45,
      status: 'confirmed',
      type: 'teleconsultation',
      notes: 'Conseil isolation',
      service: 'Conseil isolation',
      prix: 90,
      clientAvatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    // Add two confirmed appointments for several random days in the current month
    {
      id: '6',
      clientName: 'Paul Martin',
      clientEmail: 'paul.martin@email.com',
      date: `${currentYear}-${currentMonth}-03`,
      time: '10:00',
      duration: 30,
      status: 'confirmed',
      type: 'physical',
      notes: 'Réparation toiture',
      service: 'Réparation toiture',
      prix: 150,
      clientAvatar: 'https://randomuser.me/api/portraits/men/70.jpg'
    },
    {
      id: '7',
      clientName: 'Julie Robert',
      clientEmail: 'julie.robert@email.com',
      date: `${currentYear}-${currentMonth}-03`,
      time: '15:00',
      duration: 45,
      status: 'confirmed',
      type: 'teleconsultation',
      notes: 'Conseil peinture',
      service: 'Conseil peinture',
      prix: 70,
      clientAvatar: 'https://randomuser.me/api/portraits/women/55.jpg'
    },
    {
      id: '8',
      clientName: 'Luc Moreau',
      clientEmail: 'luc.moreau@email.com',
      date: `${currentYear}-${currentMonth}-10`,
      time: '11:00',
      duration: 60,
      status: 'confirmed',
      type: 'physical',
      notes: 'Installation fenêtre',
      service: 'Installation fenêtre',
      prix: 180,
      clientAvatar: 'https://randomuser.me/api/portraits/men/80.jpg'
    },
    {
      id: '9',
      clientName: 'Emma Leroy',
      clientEmail: 'emma.leroy@email.com',
      date: `${currentYear}-${currentMonth}-10`,
      time: '16:00',
      duration: 30,
      status: 'confirmed',
      type: 'teleconsultation',
      notes: 'Conseil isolation',
      service: 'Conseil isolation',
      prix: 90,
      clientAvatar: 'https://randomuser.me/api/portraits/women/60.jpg'
    },
    {
      id: '10',
      clientName: 'Nina Petit',
      clientEmail: 'nina.petit@email.com',
      date: `${currentYear}-${currentMonth}-15`,
      time: '09:30',
      duration: 45,
      status: 'confirmed',
      type: 'physical',
      notes: 'Pose carrelage',
      service: 'Pose carrelage',
      prix: 120,
      clientAvatar: 'https://randomuser.me/api/portraits/women/70.jpg'
    },
    {
      id: '11',
      clientName: 'Louis Garnier',
      clientEmail: 'louis.garnier@email.com',
      date: `${currentYear}-${currentMonth}-15`,
      time: '13:00',
      duration: 60,
      status: 'confirmed',
      type: 'teleconsultation',
      notes: 'Conseil menuiserie',
      service: 'Conseil menuiserie',
      prix: 110,
      clientAvatar: 'https://randomuser.me/api/portraits/men/90.jpg'
    },
    {
      id: '12',
      clientName: 'Camille Dubois',
      clientEmail: 'camille.dubois@email.com',
      date: `${currentYear}-${currentMonth}-22`,
      time: '10:30',
      duration: 30,
      status: 'confirmed',
      type: 'physical',
      notes: 'Réparation plomberie',
      service: 'Réparation plomberie',
      prix: 80,
      clientAvatar: 'https://randomuser.me/api/portraits/women/85.jpg'
    },
    {
      id: '13',
      clientName: 'Hugo Lefevre',
      clientEmail: 'hugo.lefevre@email.com',
      date: `${currentYear}-${currentMonth}-22`,
      time: '17:00',
      duration: 45,
      status: 'confirmed',
      type: 'teleconsultation',
      notes: 'Conseil toiture',
      service: 'Conseil toiture',
      prix: 95,
      clientAvatar: 'https://randomuser.me/api/portraits/men/100.jpg'
    },
    {
      id: '14',
      clientName: 'Sarah Bernard',
      clientEmail: 'sarah.bernard@email.com',
      date: `${currentYear}-${currentMonth}-27`,
      time: '08:00',
      duration: 60,
      status: 'confirmed',
      type: 'physical',
      notes: 'Installation porte',
      service: 'Installation porte',
      prix: 160,
      clientAvatar: 'https://randomuser.me/api/portraits/women/90.jpg'
    },
    {
      id: '15',
      clientName: 'Mathieu Simon',
      clientEmail: 'mathieu.simon@email.com',
      date: `${currentYear}-${currentMonth}-27`,
      time: '18:00',
      duration: 30,
      status: 'confirmed',
      type: 'teleconsultation',
      notes: 'Conseil rénovation',
      service: 'Conseil rénovation',
      prix: 100,
      clientAvatar: 'https://randomuser.me/api/portraits/men/110.jpg'
    }
  ]);

  // Add planning config state to ProfessionalDashboard
  const [planningConfig, setPlanningConfig] = useState({
    joursAbsence: [],
    joursFeries: []
  });

  return (
    <DashboardLayout menuItems={menuItems} userType="professional">
      <div className="p-6">
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/planning" element={<PlanningManagement planningConfig={planningConfig} setPlanningConfig={setPlanningConfig} />} />
          <Route path="/bookings" element={<BookingsPage appointments={appointments} setAppointments={setAppointments} joursAbsence={planningConfig.joursAbsence} joursFeries={planningConfig.joursFeries} />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/dashboard/professional" replace />} />
        </Routes>
      </div>
    </DashboardLayout>
  );
};

const DashboardOverview: React.FC = () => {
  const [stats] = useState<Stats>({
    totalAppointments: 127,
    monthlyRevenue: 3250,
    clientSatisfaction: 4.8,
    cancellationRate: 3.2,
    trends: {
      appointments: 12,
      revenue: -2.5
    }
  });

  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      clientName: 'Jean Dupont',
      clientEmail: 'jean.dupont@email.com',
      date: '2024-01-15',
      time: '09:00',
      duration: 30,
      status: 'confirmed',
      type: 'physical',
      notes: 'Consultation de suivi',
      clientAvatar: 'https://via.placeholder.com/50' // Added clientAvatar
    },
    {
      id: '2',
      clientName: 'Sophie Martin',
      clientEmail: 'sophie.martin@email.com',
      date: '2024-01-15',
      time: '10:30',
      duration: 45,
      status: 'pending',
      type: 'teleconsultation',
      clientAvatar: 'https://via.placeholder.com/50' // Added clientAvatar
    },
    {
      id: '3',
      clientName: 'Pierre Bernard',
      clientEmail: 'pierre.bernard@email.com',
      date: '2024-01-16',
      time: '14:00',
      duration: 30,
      status: 'confirmed',
      type: 'physical',
      clientAvatar: 'https://via.placeholder.com/50' // Added clientAvatar
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Tableau de bord professionnel</h1>
        <p className="text-muted-foreground mt-2">Gérez votre activité et vos rendez-vous</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">RDV ce mois</p>
                <p className="text-2xl font-bold">{stats.totalAppointments}</p>
              </div>
              <div className="flex items-center text-primary">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm">+{stats.trends.appointments}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenus</p>
                <p className="text-2xl font-bold">{stats.monthlyRevenue}€</p>
              </div>
              <div className="flex items-center text-destructive">
                <TrendingDown className="w-4 h-4 mr-1" />
                <span className="text-sm">{stats.trends.revenue}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Satisfaction</p>
                <p className="text-2xl font-bold">{stats.clientSatisfaction}/5</p>
              </div>
              <div className="w-full mt-2">
                <Progress value={stats.clientSatisfaction * 20} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Annulations</p>
                <p className="text-2xl font-bold">{stats.cancellationRate}%</p>
              </div>
              <div className="w-full mt-2">
                <Progress value={stats.cancellationRate} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions Rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex-col gap-2">
              <Calendar className="w-6 h-6" />
              Nouveau RDV
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Users className="w-6 h-6" />
              Clients
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <BarChart3 className="w-6 h-6" />
              Statistiques
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Settings className="w-6 h-6" />
              Paramètres
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Prochains Rendez-vous</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments.slice(0, 3).map((apt) => (
              <div key={apt.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div>
                    <p className="font-medium">{apt.clientName}</p>
                    <p className="text-sm text-muted-foreground">{apt.date} à {apt.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={apt.type === 'teleconsultation' ? 'default' : 'secondary'}>
                    {apt.type === 'teleconsultation' ? 'Télé' : 'Cabinet'}
                  </Badge>
                  <Button variant="outline" size="sm">Modifier</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Update BookingsPage to accept appointments and setAppointments as props
interface BookingsPageProps {
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  joursAbsence: string[];
  joursFeries: string[];
}

const BookingsPage: React.FC<BookingsPageProps> = ({ appointments, setAppointments, joursAbsence, joursFeries }) => {
  const [tab, setTab] = useState<'rendezvous' | 'planning'>('rendezvous');
  const [selectedClient, setSelectedClient] = useState<any | null>(null);
  const handleConfirm = (id: string) => {
    setAppointments(appts => appts.map(a => a.id === id ? { ...a, status: 'confirmed' } : a));
  };
  const handleDelete = (id: string) => {
    setAppointments(appts => appts.filter(a => a.id !== id));
  };
  const handleReschedule = (id: string) => {
    alert('Fonctionnalité de report à développer');
  };

  return (
    <div className="space-y-6">
      {/* Modal for client profile */}
      <Dialog open={!!selectedClient} onOpenChange={open => !open && setSelectedClient(null)}>
        <DialogContent>
          {selectedClient && (
            <>
              <DialogHeader>
                <DialogTitle>Profil du client</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={selectedClient.clientAvatar} alt={selectedClient.clientName} />
                  <AvatarFallback>{selectedClient.clientName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="text-lg font-semibold">{selectedClient.clientName}</div>
                <div className="w-full mt-2">
                  <div className="font-medium mb-1">Informations de Contact</div>
                  <div className="flex flex-col gap-1 text-sm">
                    <span><b>Mail:</b> {selectedClient.clientEmail || 'Non renseigné'}</span>
                    <span><b>Téléphone:</b> {selectedClient.clientPhone || 'Non renseigné'}</span>
                  </div>
                </div>
                <div className="w-full mt-4">
                  <div className="font-medium mb-1">Localisation</div>
                  <div className="rounded-lg overflow-hidden border w-full h-40 flex items-center justify-center bg-muted">
                    {/* Generic map image for visualization */}
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/World_map_blank_without_borders.svg/512px-World_map_blank_without_borders.svg.png" alt="Map" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded-t-lg font-semibold border-b-2 transition-colors ${tab === 'rendezvous' ? 'border-primary text-primary bg-background' : 'border-transparent text-muted-foreground bg-muted'}`}
          onClick={() => setTab('rendezvous')}
        >
          Rendez-vous
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg font-semibold border-b-2 transition-colors ${tab === 'planning' ? 'border-primary text-primary bg-background' : 'border-transparent text-muted-foreground bg-muted'}`}
          onClick={() => setTab('planning')}
        >
          Aperçu planning
        </button>
      </div>
      {tab === 'rendezvous' && (
        <>
          <h1 className="text-3xl font-bold">Rendez-vous</h1>
      <div className="bg-card text-card-foreground p-6 rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Client</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Service</th>
              <th className="px-4 py-2 text-left">Durée</th>
              <th className="px-4 py-2 text-left">Prix (€)</th>
              <th className="px-4 py-2 text-left">Statut</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(apt => (
              <tr key={apt.id} className="border-b">
                    <td className="px-4 py-2 flex items-center gap-2 cursor-pointer" onClick={() => setSelectedClient(apt)}>
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={apt.clientAvatar} alt={apt.clientName} />
                        <AvatarFallback>{apt.clientName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <span className="underline hover:text-primary">{apt.clientName}</span>
                    </td>
                <td className="px-4 py-2">{apt.date} à {apt.time}</td>
                <td className="px-4 py-2">{apt.service}</td>
                <td className="px-4 py-2">{apt.duration} min</td>
                <td className="px-4 py-2">{apt.prix}</td>
                <td className="px-4 py-2">
                  {apt.status === 'confirmed' ? (
                    <span className="text-green-600 font-semibold">Confirmé</span>
                  ) : (
                    <span className="text-yellow-600 font-semibold">En attente</span>
                  )}
                </td>
                <td className="px-4 py-2 space-x-2">
                  {apt.status !== 'confirmed' && (
                    <Button size="sm" onClick={() => handleConfirm(apt.id)}>
                      Confirmer
                    </Button>
                  )}
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(apt.id)}>
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </>
      )}
      {tab === 'planning' && (
        <>
          <h1 className="text-3xl font-bold">Perçu planning</h1>
          <p className="text-muted-foreground mb-4">Visualisez votre planning global, vos absences et jours fériés.</p>
          <div className="bg-card text-card-foreground p-6 rounded-lg border">
            <InteractiveCalendar confirmedAppointments={appointments.filter(a => a.status === 'confirmed')} joursAbsence={joursAbsence} joursFeries={joursFeries} />
          </div>
        </>
      )}
    </div>
  );
};

const ProfilePage: React.FC = () => {
  return <ProfessionalProfileComponent />;
};

export default ProfessionalDashboard;
