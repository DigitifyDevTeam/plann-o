
import React from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { JourTravail, Service } from '@/types/planning.types';
import { format, startOfWeek, addDays, isSameDay, addWeeks, subWeeks } from 'date-fns';
import { fr } from 'date-fns/locale';

interface CalendarViewProps {
  joursTravail: JourTravail[];
  services: Service[];
  joursAbsence: Date[];
}

const CalendarView: React.FC<CalendarViewProps> = ({
  joursTravail,
  services,
  joursAbsence
}) => {
  const [currentWeek, setCurrentWeek] = React.useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }));

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));

  const getJourConfig = (date: Date) => {
    const jourNom = format(date, 'EEEE', { locale: fr }).toLowerCase() as JourTravail['jour'];
    return joursTravail.find(j => j.jour === jourNom);
  };

  const isAbsent = (date: Date) => {
    return joursAbsence.some(absenceDate => isSameDay(date, absenceDate));
  };

  const generateCreneaux = (jourConfig: JourTravail, services: Service[]) => {
    if (!jourConfig.actif || services.length === 0) return [];

    const creneaux = [];
    const [heureDebut, minuteDebut] = jourConfig.heureDebut.split(':').map(Number);
    const [heureFin, minuteFin] = jourConfig.heureFin.split(':').map(Number);
    
    const startMinutes = heureDebut * 60 + minuteDebut;
    const endMinutes = heureFin * 60 + minuteFin;
    
    // Prendre la durée du premier service pour exemple
    const dureeService = services[0]?.duree || 60;
    
    for (let minutes = startMinutes; minutes < endMinutes; minutes += dureeService) {
      const heures = Math.floor(minutes / 60);
      const mins = minutes % 60;
      creneaux.push(`${heures.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`);
    }
    
    return creneaux;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Aperçu du planning
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium px-3">
              Semaine du {format(currentWeek, 'd MMMM yyyy', { locale: fr })}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((date, index) => {
            const jourConfig = getJourConfig(date);
            const absent = isAbsent(date);
            const creneaux = jourConfig ? generateCreneaux(jourConfig, services) : [];

            return (
              <div
                key={index}
                className={`min-h-[200px] border rounded-lg p-2 ${
                  absent ? 'bg-destructive/10 border-destructive/20' : 
                  jourConfig?.actif ? 'bg-primary/5 border-primary/20' : 'bg-muted/50'
                }`}
              >
                <div className="text-center mb-2">
                  <div className="font-medium capitalize text-sm">
                    {format(date, 'EEEE', { locale: fr })}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {format(date, 'd MMM', { locale: fr })}
                  </div>
                </div>

                {absent ? (
                  <Badge variant="destructive" className="text-xs w-full justify-center">
                    Absent
                  </Badge>
                ) : jourConfig?.actif ? (
                  <div className="space-y-1">
                    <div className="text-xs text-center text-muted-foreground">
                      {jourConfig.heureDebut} - {jourConfig.heureFin}
                    </div>
                    {creneaux.length > 0 && (
                      <div className="space-y-1">
                        <div className="text-xs font-medium">Créneaux:</div>
                        <div className="text-xs text-muted-foreground">
                          {creneaux.slice(0, 3).map(creneau => (
                            <div key={creneau} className="truncate">{creneau}</div>
                          ))}
                          {creneaux.length > 3 && (
                            <div>+{creneaux.length - 3} autres</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Badge variant="outline" className="text-xs w-full justify-center">
                    Fermé
                  </Badge>
                )}
              </div>
            );
          })}
        </div>

        {services.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Ajoutez des services pour voir les créneaux disponibles</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CalendarView;
