"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Camera,
  Save,
  Edit3,
  Building2,
  Clock,
  Video,
  Star,
  CheckCircle
} from "lucide-react";

interface ProfessionalProfile {
  firstName: string;
  lastName: string;
  title: string;
  specialization: string;
  email: string;
  phone: string;
  website: string;
  bio: string;
  avatar: string;
  logo: string;
  physicalAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  teleconsultation: {
    enabled: boolean;
    platforms: string[];
    hours: string;
  };
  certifications: string[];
  languages: string[];
  rating: number;
  verified: boolean;
}

const useImageUpload = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleThumbnailClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return {
    previewUrl,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange,
    handleRemove,
  };
};

const ProfessionalProfileComponent: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfessionalProfile>({
    firstName: "Dr. Marie",
    lastName: "Dubois",
    title: "Médecin Généraliste",
    specialization: "Médecine Générale & Téléconsultation",
    email: "marie.dubois@cabinet-medical.fr",
    phone: "+33 1 23 45 67 89",
    website: "www.cabinet-dubois.fr",
    bio: "Médecin généraliste avec plus de 15 ans d'expérience, spécialisée dans la prise en charge globale du patient. Je propose des consultations en cabinet et en téléconsultation pour un suivi médical personnalisé et accessible.",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    logo: "",
    physicalAddress: {
      street: "123 Avenue de la Santé",
      city: "Paris",
      postalCode: "75014",
      country: "France"
    },
    teleconsultation: {
      enabled: true,
      platforms: ["Doctolib", "Zoom", "Teams"],
      hours: "Lun-Ven: 9h-18h, Sam: 9h-12h"
    },
    certifications: ["Diplôme d'État de Docteur en Médecine", "Formation Télémédecine", "Certification Urgences"],
    languages: ["Français", "Anglais", "Espagnol"],
    rating: 4.8,
    verified: true
  });

  const avatarUpload = useImageUpload();
  const logoUpload = useImageUpload();

  const handleInputChange = (field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddressChange = (field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      physicalAddress: {
        ...prev.physicalAddress,
        [field]: value
      }
    }));
  };

  const handleTeleconsultationChange = (field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      teleconsultation: {
        ...prev.teleconsultation,
        [field]: value
      }
    }));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Header Card */}
      <Card className="relative overflow-hidden">
        <CardContent className="relative pt-6 pb-6">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
            {/* Avatar Section */}
            <div className="relative flex-shrink-0">
              <Avatar className="w-32 h-32 border-4 border-background shadow-lg">
                <AvatarImage 
                  src={avatarUpload.previewUrl || profile.avatar} 
                  alt={`${profile.firstName} ${profile.lastName}`} 
                />
              </Avatar>
              {isEditing && (
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                  onClick={avatarUpload.handleThumbnailClick}
                >
                  <Camera className="w-4 h-4" />
                </Button>
              )}
              <input
                type="file"
                ref={avatarUpload.fileInputRef}
                onChange={avatarUpload.handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </div>
            {/* Profile Info */}
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl font-bold text-foreground break-words whitespace-normal">
                  {profile.firstName} {profile.lastName}
                </h1>
                {profile.verified && (
                  <CheckCircle className="w-6 h-6 text-blue-500" />
                )}
              </div>
              {isEditing ? (
                <div className="max-w-xs mt-1">
                  <Label htmlFor="profession">Profession</Label>
                  <Input
                    id="profession"
                    value={profile.title}
                    onChange={e => handleInputChange('title', e.target.value)}
                  />
                </div>
              ) : (
                <p className="text-xl text-muted-foreground">{profile.title}</p>
              )}
              
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">{renderStars(profile.rating)}</div>
                <span className="text-sm text-muted-foreground">
                  {profile.rating}/5 (127 avis)
                </span>
              </div>

            </div>
            {/* Action Button */}
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "default" : "outline"}
              className="gap-2"
            >
              {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              {isEditing ? "Sauvegarder" : "Modifier"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Informations de Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    value={profile.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="website">Site Web</Label>
                  <Input
                    id="website"
                    value={profile.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span>{profile.website}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Logo Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Logo/Cabinet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-24 h-24 border-2 border-dashed border-border rounded-lg flex items-center justify-center bg-muted">
                {logoUpload.previewUrl ? (
                  <img 
                    src={logoUpload.previewUrl} 
                    alt="Logo" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <Building2 className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
              {isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logoUpload.handleThumbnailClick}
                  className="gap-2"
                >
                  <Camera className="w-4 h-4" />
                  Ajouter Logo
                </Button>
              )}
              <input
                type="file"
                ref={logoUpload.fileInputRef}
                onChange={logoUpload.handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Address Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Adresse du Cabinet
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="street">Adresse</Label>
                <Input
                  id="street"
                  value={profile.physicalAddress.street}
                  onChange={(e) => handleAddressChange('street', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Ville</Label>
                <Input
                  id="city"
                  value={profile.physicalAddress.city}
                  onChange={(e) => handleAddressChange('city', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Code Postal</Label>
                <Input
                  id="postalCode"
                  value={profile.physicalAddress.postalCode}
                  onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
              <div>
                <p>{profile.physicalAddress.street}</p>
                <p>{profile.physicalAddress.postalCode} {profile.physicalAddress.city}</p>
                <p>{profile.physicalAddress.country}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Biography */}
      <Card>
        <CardHeader>
          <CardTitle>Présentation</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="space-y-2">
              <Label htmlFor="bio">Biographie</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={4}
                placeholder="Décrivez votre parcours, vos spécialités et votre approche..."
              />
            </div>
          ) : (
            <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
          )}
        </CardContent>
      </Card>

      {/* Languages & Certifications */}
      {/* Removed the 'Langues Parlées' card/section entirely */}
    </div>
  );
};

export default ProfessionalProfileComponent; 