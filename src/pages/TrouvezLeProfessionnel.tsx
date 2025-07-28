import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchSection from "@/components/home/SearchSection";

const TrouvezLeProfessionnel = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SearchSection fullPage />
      <Footer />
    </div>
  );
};

export default TrouvezLeProfessionnel; 