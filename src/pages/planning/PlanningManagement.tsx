
import React, { useState } from 'react';
import { Save, Settings, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import MetierSelector from '@/components/planning/MetierSelector';
import ServiceForm from '@/components/planning/ServiceForm';
import WorkingDaysConfig from '@/components/planning/WorkingDaysConfig';
import CalendarView from '@/components/planning/CalendarView';
import { PlanningConfig, JourTravail, Service } from '@/types/planning.types';

// Accept planningConfig and setPlanningConfig as props
const PlanningManagement: React.FC<{ planningConfig: { joursAbsence: Date[]; joursFeries: Date[] }; setPlanningConfig: (cfg: any) => void }> = ({ planningConfig, setPlanningConfig }) => {
  // Keep the config shape correct for PlanningConfig
  const [config, setConfig] = useState<PlanningConfig>({
    metiers: [],
    services: [],
    joursTravail: [],
    joursAbsence: planningConfig.joursAbsence,
    joursFeries: planningConfig.joursFeries
  });

  const handleSaveConfig = () => {
    // Validation basique
    if (config.metiers.length === 0) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez sélectionner au moins un métier.",
        variant: "destructive"
      });
      return;
    }

    if (config.services.length === 0) {
      toast({
        title: "Erreur de validation", 
        description: "Veuillez ajouter au moins un service.",
        variant: "destructive"
      });
      return;
    }

    // Ici, on sauvegarderait en base de données
    console.log('Configuration sauvegardée:', config);
    toast({
      title: "Configuration sauvegardée",
      description: "Votre planning a été mis à jour avec succès.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* En-tête */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Gestion du Planning
            </h1>
            <p className="text-muted-foreground mt-2">
              Configurez vos métiers, services et disponibilités
            </p>
          </div>
          <Button onClick={handleSaveConfig} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Sauvegarder
          </Button>
        </div>

        {/* Onglets principaux */}
        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Services
            </TabsTrigger>
            <TabsTrigger value="horaires" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Horaires
            </TabsTrigger>
          </TabsList>

          {/* Section Services */}
          <TabsContent value="services" className="space-y-6">
                <ServiceForm
                  selectedMetiers={config.metiers}
                  services={config.services}
                  onServicesChange={(services) => setConfig({ ...config, services })}
                />
          </TabsContent>

          {/* Configuration des horaires */}
          <TabsContent value="horaires">
            <WorkingDaysConfig
              joursTravail={config.joursTravail}
              onJoursTravailChange={(joursTravail) => setConfig({ ...config, joursTravail })}
              joursAbsence={planningConfig.joursAbsence}
              onJoursAbsenceChange={(joursAbsence) => setPlanningConfig({ ...planningConfig, joursAbsence })}
              joursFeries={planningConfig.joursFeries}
              onJoursFeriesChange={(joursFeries) => setPlanningConfig({ ...planningConfig, joursFeries })}
            />
          </TabsContent>

        </Tabs>

        {/* Résumé rapide */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Résumé de la configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">Métiers sélectionnés:</span>
                <p className="text-muted-foreground">{config.metiers.length || 'Aucun'}</p>
              </div>
              <div>
                <span className="font-medium">Services configurés:</span>
                <p className="text-muted-foreground">{config.services.length || 'Aucun'}</p>
              </div>
              <div>
                <span className="font-medium">Jours d'absence:</span>
                <p className="text-muted-foreground">{config.joursAbsence.length || 'Aucun'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlanningManagement;
