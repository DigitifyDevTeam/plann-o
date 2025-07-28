import React, { useState } from 'react';
import { Calendar, Clock, Star, MapPin, Phone, Mail, Heart, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Appointment {
  id: string;
  professionalName: string;
  professionalSpecialty: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  location: string;
  price: number;
  avatar?: string;
}

interface Favorite {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  location: string;
  avatar?: string;
}

const ClientDashboard = () => {
  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      professionalName: 'Dr. Sophie Martin',
      professionalSpecialty: 'Médecin généraliste',
      date: '2024-01-20',
      time: '14:30',
      status: 'upcoming',
      location: '123 Rue de la Santé, Paris',
      price: 45
    },
    {
      id: '2',
      professionalName: 'Marie Dubois',
      professionalSpecialty: 'Kinésithérapeute',
      date: '2024-01-18',
      time: '10:00',
      status: 'completed',
      location: '456 Avenue du Sport, Lyon',
      price: 60
    }
  ]);

  const [favorites] = useState<Favorite[]>([
    {
      id: '1',
      name: 'Dr. Sophie Martin',
      specialty: 'Médecin généraliste',
      rating: 4.8,
      location: 'Paris 15ème'
    },
    {
      id: '2',
      name: 'Jean Lecoach',
      specialty: 'Coach sportif',
      rating: 4.9,
      location: 'Boulogne-Billancourt'
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800">À venir</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Terminé</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Annulé</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Mon espace client</h1>
          <p className="text-muted-foreground mt-2">Gérez vos rendez-vous et vos professionnels favoris</p>
        </div>

        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="appointments">Mes rendez-vous</TabsTrigger>
            <TabsTrigger value="favorites">Mes favoris</TabsTrigger>
            <TabsTrigger value="profile">Mon profil</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Prochains rendez-vous
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {appointments.filter(apt => apt.status === 'upcoming').map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={appointment.avatar} />
                            <AvatarFallback>
                              {appointment.professionalName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{appointment.professionalName}</h3>
                            <p className="text-sm text-muted-foreground">{appointment.professionalSpecialty}</p>
                            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(appointment.date).toLocaleDateString('fr-FR')}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {appointment.time}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {appointment.location}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(appointment.status)}
                          <p className="text-sm font-semibold mt-1">{appointment.price}€</p>
                          <div className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm">Modifier</Button>
                            <Button variant="destructive" size="sm">Annuler</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Historique des rendez-vous</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {appointments.filter(apt => apt.status === 'completed').map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={appointment.avatar} />
                            <AvatarFallback>
                              {appointment.professionalName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{appointment.professionalName}</h3>
                            <p className="text-sm text-muted-foreground">{appointment.professionalSpecialty}</p>
                            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(appointment.date).toLocaleDateString('fr-FR')}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {appointment.time}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(appointment.status)}
                          <p className="text-sm font-semibold mt-1">{appointment.price}€</p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Reprendre RDV
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Mes professionnels favoris
                </CardTitle>
                <CardDescription>
                  Retrouvez rapidement vos praticiens préférés
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {favorites.map((favorite) => (
                    <div key={favorite.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={favorite.avatar} />
                            <AvatarFallback>
                              {favorite.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{favorite.name}</h3>
                            <p className="text-sm text-muted-foreground">{favorite.specialty}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{favorite.rating}</span>
                          </div>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {favorite.location}
                          </span>
                        </div>
                        <Button size="sm">Prendre RDV</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mes informations personnelles</CardTitle>
                <CardDescription>
                  Gérez vos informations de contact et préférences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Nom</label>
                      <p className="text-sm text-muted-foreground mt-1">Marie Dupont</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <p className="text-sm text-muted-foreground mt-1">client@planneo.fr</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Téléphone</label>
                      <p className="text-sm text-muted-foreground mt-1">06 12 34 56 78</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Date de naissance</label>
                      <p className="text-sm text-muted-foreground mt-1">15/03/1985</p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button>Modifier mes informations</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientDashboard;