import { useState } from "react";

const faqs = [
  {
    question: "Que deviennent mes données personnelles ?",
    answer: "Vos données sont stockées en toute sécurité sur des serveurs européens. Elles ne sont partagées qu’avec le professionnel que vous choisissez. Vous pouvez supprimer votre compte à tout moment dans la section « Paramètres »."
  },
  {
    question: "L’utilisation de Plannéo est-elle payante pour moi ?",
    answer: "Non, l’inscription et la prise de rendez-vous sont entièrement gratuites. Vous ne payez que la prestation du professionnel, le cas échéant."
  },
  {
    question: "Dois-je créer un compte pour prendre rendez-vous ?",
    answer: "Oui, la création d’un compte (e-mail + mot de passe, ou via Google/Apple) permet la confirmation instantanée de votre rendez-vous et l’accès à votre historique."
  },
  {
    question: "Comment contacter le support en cas de problème ?",
    answer: "Vous pouvez contacter notre équipe via le bouton de chat sur la page d’accueil ou par e-mail à support@planneo.fr. Nous sommes là pour vous aider !"
  },
  {
    question: "Puis-je annuler ou reporter un rendez-vous ?",
    answer: "Bien sûr. Vous pouvez gérer, annuler ou reporter vos rendez-vous directement depuis votre espace personnel."
  },
  {
    question: "Mes paiements sont-ils sécurisés ?",
    answer: "Oui, tous les paiements sont traités via des prestataires de paiement sécurisés et reconnus. Vos informations bancaires ne sont jamais stockées sur nos serveurs."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">FAQ - Questions fréquentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border rounded-lg p-4 bg-white shadow">
              <button
                className="w-full text-left font-semibold text-primary focus:outline-none"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                {faq.question}
              </button>
              {openIndex === idx && (
                <p className="mt-2 text-muted-foreground animate-fade-in">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 