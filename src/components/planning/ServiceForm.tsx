
import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DUREES_CRENEAUX, Service, METIERS_BATIMENT } from '@/types/planning.types';

interface ServiceFormProps {
  selectedMetiers: string[];
  services: Service[];
  onServicesChange: (services: Service[]) => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({
  selectedMetiers,
  services,
  onServicesChange
}) => {
  const [newService, setNewService] = useState({
    nom: '',
    duree: 30,
    prix: 0
  });

  const handleAddService = () => {
    if (!newService.nom || newService.prix <= 0) return;

    const service = {
      id: `service-${Date.now()}`,
      nom: newService.nom,
      duree: newService.duree,
      prix: newService.prix
    };

    onServicesChange([...services, service]);
    setNewService({ nom: '', duree: 30, prix: 0 });
  };

  const handleRemoveService = (serviceId: string) => {
    onServicesChange(services.filter(s => s.id !== serviceId));
  };

  const getMetierNom = (metierId: string) => {
    return METIERS_BATIMENT.find(m => m.id === metierId)?.nom || metierId;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Services proposés</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Formulaire d'ajout */}
        <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
          <h4 className="font-medium">Ajouter un nouveau service</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="service-nom">Nom du service</Label>
              <Input
                id="service-nom"
                placeholder="Ex: Installation électrique"
                value={newService.nom}
                onChange={(e) => setNewService({ ...newService, nom: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="service-duree">Durée du créneau</Label>
              <Select
                value={newService.duree.toString()}
                onValueChange={(value) => setNewService({ ...newService, duree: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DUREES_CRENEAUX.map(duree => (
                    <SelectItem key={duree} value={duree.toString()}>
                      {duree} minutes
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="service-prix">Prix (€)</Label>
              <Input
                id="service-prix"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={newService.prix || ''}
                onChange={(e) => setNewService({ ...newService, prix: parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>

          <Button onClick={handleAddService} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter le service
          </Button>
        </div>

        {/* Liste des services */}
        {services.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">Services configurés</h4>
            {services.map(service => (
              <div key={service.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{service.nom}</div>
                  <div className="text-sm text-muted-foreground">
                    {service.duree} min • {service.prix}€
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveService(service.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceForm;
