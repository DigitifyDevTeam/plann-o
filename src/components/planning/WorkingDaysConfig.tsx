
import React from 'react';
import { Calendar, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { JourTravail } from '@/types/planning.types';
import { cn } from '@/lib/utils';

interface WorkingDaysConfigProps {
  joursTravail: JourTravail[];
  onJoursTravailChange: (jours: JourTravail[]) => void;
  joursAbsence: Date[];
  onJoursAbsenceChange: (jours: Date[]) => void;
  joursFeries: Date[];
  onJoursFeriesChange: (jours: Date[]) => void;
}

const JOURS_SEMAINE: JourTravail['jour'][] = [
  'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'
];

const WorkingDaysConfig: React.FC<WorkingDaysConfigProps> = ({
  joursTravail,
  onJoursTravailChange,
  joursAbsence,
  onJoursAbsenceChange,
  joursFeries,
  onJoursFeriesChange
}) => {
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [selectedFerie, setSelectedFerie] = React.useState<Date>();

  const handleJourChange = (jour: JourTravail['jour'], field: keyof JourTravail, value: any) => {
    const updatedJours = joursTravail.map(j => 
      j.jour === jour ? { ...j, [field]: value } : j
    );
    onJoursTravailChange(updatedJours);
  };

  const handleAddAbsence = () => {
    if (selectedDate && !joursAbsence.some(date => 
      date.toDateString() === selectedDate.toDateString()
    )) {
      onJoursAbsenceChange([...joursAbsence, selectedDate]);
      setSelectedDate(undefined);
    }
  };

  const handleRemoveAbsence = (dateToRemove: Date) => {
    onJoursAbsenceChange(joursAbsence.filter(date => 
      date.toDateString() !== dateToRemove.toDateString()
    ));
  };

  const handleAddFerie = () => {
    if (selectedFerie && !joursFeries.some(date => 
      date.toDateString() === selectedFerie.toDateString()
    )) {
      onJoursFeriesChange([...joursFeries, selectedFerie]);
      setSelectedFerie(undefined);
    }
  };

  const handleRemoveFerie = (dateToRemove: Date) => {
    onJoursFeriesChange(joursFeries.filter(date => 
      date.toDateString() !== dateToRemove.toDateString()
    ));
  };

  // Initialiser les jours de travail si vide
  React.useEffect(() => {
    if (joursTravail.length === 0) {
      const defaultJours: JourTravail[] = JOURS_SEMAINE.map(jour => ({
        jour,
        actif: ['samedi', 'dimanche'].includes(jour) ? false : true,
        heureDebut: '08:00',
        heureFin: '18:00'
      }));
      onJoursTravailChange(defaultJours);
    }
  }, [joursTravail.length, onJoursTravailChange]);

  return (
    <div className="space-y-6">
      {/* Configuration des jours de travail */}
      <Card>
        <CardHeader>
          <CardTitle>Jours et horaires de travail</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {joursTravail.map(jour => (
            <div key={jour.jour} className="flex items-center space-x-4 p-3 border rounded-lg">
              <div className="w-20 capitalize font-medium">
                {jour.jour}
              </div>
              
              <Switch
                checked={jour.actif}
                onCheckedChange={(checked) => handleJourChange(jour.jour, 'actif', checked)}
              />
              
              {jour.actif && (
                <>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`debut-${jour.jour}`} className="text-sm">De</Label>
                    <Input
                      id={`debut-${jour.jour}`}
                      type="time"
                      value={jour.heureDebut}
                      onChange={(e) => handleJourChange(jour.jour, 'heureDebut', e.target.value)}
                      className="w-24"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`fin-${jour.jour}`} className="text-sm">à</Label>
                    <Input
                      id={`fin-${jour.jour}`}
                      type="time"
                      value={jour.heureFin}
                      onChange={(e) => handleJourChange(jour.jour, 'heureFin', e.target.value)}
                      className="w-24"
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Gestion des absences */}
      <Card>
        <CardHeader>
          <CardTitle>Jours d'absence et congés</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-fit">
                  <Calendar className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, 'dd MMMM yyyy', { locale: fr }) : 'Sélectionner une date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
            
            <Button onClick={handleAddAbsence} disabled={!selectedDate}>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter
            </Button>
          </div>

          {joursAbsence.length > 0 && (
            <div className="space-y-2">
              <Label>Jours d'absence planifiés</Label>
              <div className="flex flex-wrap gap-2">
                {joursAbsence.map((date, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {format(date, 'dd/MM/yyyy')}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => handleRemoveAbsence(date)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Gestion des jours fériés */}
      <Card>
        <CardHeader>
          <CardTitle>Jours fériés</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-fit">
                  <Calendar className="mr-2 h-4 w-4" />
                  {selectedFerie ? format(selectedFerie, 'dd MMMM yyyy', { locale: fr }) : 'Sélectionner un jour férié'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={selectedFerie}
                  onSelect={setSelectedFerie}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
            <Button onClick={handleAddFerie} disabled={!selectedFerie}>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter
            </Button>
          </div>
          {joursFeries.length > 0 && (
            <div className="space-y-2">
              <Label>Jours fériés enregistrés</Label>
              <div className="flex flex-wrap gap-2">
                {joursFeries.map((date, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {format(date, 'dd/MM/yyyy')}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => handleRemoveFerie(date)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkingDaysConfig;
