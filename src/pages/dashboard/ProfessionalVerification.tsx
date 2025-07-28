import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, CheckCircle, Clock, FileText, AlertCircle } from 'lucide-react';

const ProfessionalVerification = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    businessName: '',
    specialty: '',
    description: '',
    address: '',
    phone: '',
    website: '',
    siretNumber: '',
    documents: [] as File[]
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const specialties = [
    'Médecine générale',
    'Dentaire',
    'Kinésithérapie',
    'Ostéopathie',
    'Psychologie',
    'Coaching sportif',
    'Coaching bien-être',
    'Nutrition',
    'Esthétique',
    'Coiffure',
    'Massage',
    'Autre'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, ...newFiles]
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulation de l'envoi
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mise à jour du statut utilisateur
    updateUser({ 
      isVerified: false, // En attente de vérification admin
      profileComplete: true 
    });
    
    setIsSubmitted(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (user?.isVerified) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-6 max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-green-600">Profil vérifié !</CardTitle>
              <CardDescription>
                Votre compte professionnel est maintenant actif
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button onClick={() => window.location.href = '/dashboard'}>
                Accéder à mon tableau de bord
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isSubmitted || (user?.profileComplete && !user?.isVerified)) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-6 max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-orange-600">Vérification en cours</CardTitle>
              <CardDescription>
                Votre demande est en cours de traitement par notre équipe
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Nous examinerons vos documents sous 48h ouvrées. Vous recevrez un email de confirmation une fois votre profil approuvé.
                </AlertDescription>
              </Alert>
              <div className="text-center">
                <Button variant="outline" onClick={() => window.location.href = '/dashboard'}>
                  Retour au tableau de bord
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary">Vérification professionnelle</CardTitle>
            <CardDescription>
              Complétez votre profil pour commencer à recevoir des clients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Nom professionnel *</Label>
                  <Input
                    id="businessName"
                    placeholder="Cabinet médical, nom commercial..."
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialty">Spécialité *</Label>
                  <Select value={formData.specialty} onValueChange={(value) => handleInputChange('specialty', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisissez votre spécialité" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Présentation professionnelle *</Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez votre activité, votre expérience, vos spécialisations..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone professionnel *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="01 23 45 67 89"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Site web (optionnel)</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://monsite.fr"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Adresse professionnelle *</Label>
                <Input
                  id="address"
                  placeholder="123 Rue de la Santé, 75014 Paris"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="siret">Numéro SIRET (optionnel)</Label>
                <Input
                  id="siret"
                  placeholder="12345678901234"
                  value={formData.siretNumber}
                  onChange={(e) => handleInputChange('siretNumber', e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <Label>Documents justificatifs *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        Cliquez pour télécharger vos documents
                      </span>
                      <span className="mt-1 block text-xs text-gray-500">
                        Diplômes, certifications, carte professionnelle, assurance...
                      </span>
                    </label>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                    />
                  </div>
                </div>

                {formData.documents.length > 0 && (
                  <div className="space-y-2">
                    <Label>Documents téléchargés :</Label>
                    {formData.documents.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{file.name}</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          Supprimer
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Votre profil sera examiné par notre équipe sous 48h ouvrées. Une fois approuvé, vous pourrez commencer à recevoir des réservations.
                </AlertDescription>
              </Alert>

              <Button type="submit" className="w-full" size="lg">
                Soumettre ma demande de vérification
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfessionalVerification;