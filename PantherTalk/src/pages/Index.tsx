
import { useState } from 'react';
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChat = () => {
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header openChat={openChat} />
      <main className="flex-grow">
        <HeroSection openChat={openChat} />
        <FeaturesSection />
      </main>
      <Footer />
      <ChatWidget isOpen={isChatOpen} onClose={closeChat} />
    </div>
  );
};

export default Index;
