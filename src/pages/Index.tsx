import Header from "@/components/layout/Header";
import HeroSection from "@/components/home/HeroSection";
import SearchSection from "@/components/home/SearchSection";
import FeaturedProfessionals from "@/components/home/FeaturedProfessionals";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import Footer from "@/components/layout/Footer";
import FaqSection from "@/components/home/FaqSection";
import ChatButton from "@/components/home/ChatButton";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SearchSection />
      <HeroSection />
      <FeaturedProfessionals />
      <div className="text-center my-8">
        <Link to="/pricing">
          <button className="bg-gradient-to-r from-[#5EE0C1] to-[#37C9A1] text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:from-[#37C9A1] hover:to-[#5EE0C1] transition-all">
            Voir nos offres et tarifs
          </button>
        </Link>
      </div>
      <TestimonialsSection />
      <FaqSection />
      <ChatButton />
      <Footer />
    </div>
  );
};

export default Index;
