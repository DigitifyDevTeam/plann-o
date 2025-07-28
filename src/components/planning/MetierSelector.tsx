
import React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { METIERS_BATIMENT, Metier } from '@/types/planning.types';

interface MetierSelectorProps {
  selectedMetiers: string[];
  onMetiersChange: (metiers: string[]) => void;
}

const MetierSelector: React.FC<MetierSelectorProps> = ({
  selectedMetiers,
  onMetiersChange
}) => {
  const [open, setOpen] = React.useState(false);

  const handleMetierToggle = (metierId: string) => {
    if (selectedMetiers.includes(metierId)) {
      onMetiersChange(selectedMetiers.filter(id => id !== metierId));
    } else {
      onMetiersChange([...selectedMetiers, metierId]);
    }
  };

  const selectedMetiersLabels = METIERS_BATIMENT
    .filter(metier => selectedMetiers.includes(metier.id))
    .map(metier => metier.nom);

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Métiers exercés
        </label>
        <p className="text-sm text-muted-foreground">
          Sélectionnez un ou plusieurs métiers du bâtiment
        </p>
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedMetiers.length === 0
              ? "Sélectionner des métiers..."
              : `${selectedMetiers.length} métier(s) sélectionné(s)`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Rechercher un métier..." />
            <CommandList>
              <CommandEmpty>Aucun métier trouvé.</CommandEmpty>
              <CommandGroup>
                {METIERS_BATIMENT.map((metier) => (
                  <CommandItem
                    key={metier.id}
                    value={metier.nom}
                    onSelect={() => handleMetierToggle(metier.id)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedMetiers.includes(metier.id) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {metier.nom}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedMetiers.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedMetiersLabels.map((nom) => (
            <Badge key={nom} variant="secondary">
              {nom}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default MetierSelector;
