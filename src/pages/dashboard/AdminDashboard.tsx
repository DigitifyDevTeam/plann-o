import React, { useState } from 'react';
import { Users, Briefcase, TrendingUp, AlertTriangle, Settings, Shield, BarChart3, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

const AdminDashboard = () => {
  const [stats] = useState({
    totalUsers: 1247,
    totalProfessionals: 89,
    pendingVerifications: 7,
    monthlyRevenue: 12450,
    activeSubscriptions: 76
  });

  const [pendingProfessionals] = useState([
    {
      id: '1',
      name: 'Dr. Marie Leclerc',
      specialty: 'Dentiste',
      email: 'marie.leclerc@email.com',
      registrationDate: '2024-01-15',
      documents: ['Diplôme', 'Carte professionnelle']
    },
    {
      id: '2',
      name: 'Sophie Wellness',
      specialty: 'Coach bien-être',
      email: 'sophie@wellness.com',
      registrationDate: '2024-01-14',
      documents: ['Certification', 'Assurance']
    }
  ]);

  const [recentActivity] = useState([
    {
      id: '1',
      type: 'registration',
      user: 'Jean Dupont',
      action: 'Nouvelle inscription client',
      timestamp: '2024-01-20 14:30'
    },
    {
      id: '2',
      type: 'verification',
      user: 'Dr. Martin',
      action: 'Professionnel vérifié',
      timestamp: '2024-01-20 11:15'
    },
    {
      id: '3',
      type: 'payment',
      user: 'Sophie Wellness',
      action: 'Abonnement renouvelé',
      timestamp: '2024-01-20 09:45'
    }
  ]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Administration Plannéo</h1>
          <p className="text-muted-foreground mt-2">Tableau de bord administrateur</p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+23 cette semaine</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Professionnels</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProfessionals}</div>
              <p className="text-xs text-muted-foreground">+5 ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En attente</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.pendingVerifications}</div>
              <p className="text-xs text-muted-foreground">Vérifications</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenus</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.monthlyRevenue.toLocaleString()}€</div>
              <p className="text-xs text-muted-foreground">Ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Abonnements</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeSubscriptions}</div>
              <p className="text-xs text-muted-foreground">Actifs</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="verifications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="verifications">Vérifications</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="categories">Catégories</TabsTrigger>
            <TabsTrigger value="analytics">Statistiques</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="verifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Professionnels en attente de vérification
                </CardTitle>
                <CardDescription>
                  {stats.pendingVerifications} demandes à traiter
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingProfessionals.map((professional) => (
                    <div key={professional.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>
                            {professional.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{professional.name}</h3>
                          <p className="text-sm text-muted-foreground">{professional.specialty}</p>
                          <p className="text-sm text-muted-foreground">{professional.email}</p>
                          <div className="flex gap-2 mt-1">
                            {professional.documents.map((doc) => (
                              <Badge key={doc} variant="outline" className="text-xs">
                                {doc}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Voir documents</Button>
                        <Button variant="destructive" size="sm">Rejeter</Button>
                        <Button size="sm">Approuver</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des utilisateurs</CardTitle>
                <CardDescription>
                  Modération et gestion des comptes utilisateurs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Button variant="outline">Exporter les données</Button>
                    <Button variant="outline">Envoi email groupé</Button>
                    <Button variant="outline">Statistiques détaillées</Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Fonctionnalités de gestion des utilisateurs à développer
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Catégories de métiers</CardTitle>
                <CardDescription>
                  Gérez les spécialités et catégories professionnelles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button>Ajouter une catégorie</Button>
                  <div className="grid gap-2">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm">Médecine générale</span>
                      <div className="flex gap-2">
                        <Badge variant="outline">23 professionnels</Badge>
                        <Button variant="ghost" size="sm">Modifier</Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm">Kinésithérapie</span>
                      <div className="flex gap-2">
                        <Badge variant="outline">15 professionnels</Badge>
                        <Button variant="ghost" size="sm">Modifier</Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm">Coaching sportif</span>
                      <div className="flex gap-2">
                        <Badge variant="outline">12 professionnels</Badge>
                        <Button variant="ghost" size="sm">Modifier</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Statistiques globales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Croissance utilisateurs</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Clients</span>
                        <span>1158 (+18% ce mois)</span>
                      </div>
                      <Progress value={75} />
                      <div className="flex justify-between text-sm">
                        <span>Professionnels</span>
                        <span>89 (+8% ce mois)</span>
                      </div>
                      <Progress value={45} />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Revenus par abonnement</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Premium mensuel (29€)</span>
                        <span>1740€ (60 abonnés)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Premium annuel (290€)</span>
                        <span>4640€ (16 abonnés)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Paramètres de la plateforme
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Notifications email</h3>
                      <p className="text-sm text-muted-foreground">Configurer les emails automatiques</p>
                    </div>
                    <Button variant="outline">Configurer</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Modes de paiement</h3>
                      <p className="text-sm text-muted-foreground">Gérer Stripe et autres passerelles</p>
                    </div>
                    <Button variant="outline">Configurer</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Modération automatique</h3>
                      <p className="text-sm text-muted-foreground">Filtres et règles de contenu</p>
                    </div>
                    <Button variant="outline">Configurer</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recent Activity */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.user}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;