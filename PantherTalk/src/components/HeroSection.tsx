
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getRandomFact } from "@/data/furiaData";

const HeroSection = ({ openChat }: { openChat: () => void }) => {
  const [randomFact, setRandomFact] = useState<string>("");
  
  useEffect(() => {
    setRandomFact(getRandomFact());
  }, []);

  return (
    <section id="about" className="relative pt-28 pb-20 md:pt-32 md:pb-32 hero-gradient">
      <div className="absolute inset-0 z-[-2] overflow-hidden">
        <div className="absolute inset-0 bg-furia-black/90"></div>
        <img
          src="https://api.draft5.gg/teams/330/logo"
          alt="FURIA Background Logo"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] max-w-[150%] opacity-10"
        />
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold mb-6 text-white leading-tight">
              Descubra o <span className="text-furia-purple">PantherTalk</span>
              <span className="block">o chatbot oficial dos fãs da FURIA 🔥🐾</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              Receba novidades, estatísticas, curiosidades, eventos e muito mais diretamente do mundo FURIOSO!
            </p>
            <Button 
              onClick={openChat}
              size="lg" 
              className="bg-furia-purple hover:bg-furia-dark-purple text-white text-lg py-6 px-8 rounded-lg btn-glow animate-fade-in"
            >
              Começar conversa
            </Button>
          </div>
          
          <div className="w-full lg:w-1/2 lg:pl-10 animate-fade-in">
            <div className="bg-furia-dark-gray rounded-2xl shadow-2xl overflow-hidden border border-furia-light-purple/20">
              <div className="bg-furia-black p-4 flex items-center border-b border-furia-light-purple/20">
                <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                  <img 
                    src="https://api.draft5.gg/teams/330/logo" 
                    alt="PantherTalk Avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-white font-medium">PantherTalk</span>
              </div>
              <div className="p-4 h-[400px] overflow-y-auto">
                <div className="flex flex-col gap-4">
                  <div className="chat-bubble-bot">
                    <p className="mb-2">⚡ Olá, torcedor da FURIA! Seja bem-vindo ao PantherTalk! 🐾</p>
                    <p className="mb-2">🔥 Curiosidade: {randomFact}</p>
                    <p>Como posso ajudar você hoje?</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 my-2">
                    <button className="bg-furia-purple/20 hover:bg-furia-purple/30 text-white px-4 py-2 rounded-full text-sm transition-colors">
                      Estatísticas
                    </button>
                    <button className="bg-furia-purple/20 hover:bg-furia-purple/30 text-white px-4 py-2 rounded-full text-sm transition-colors">
                      Próximo jogo
                    </button>
                    <button className="bg-furia-purple/20 hover:bg-furia-purple/30 text-white px-4 py-2 rounded-full text-sm transition-colors">
                      História da FURIA
                    </button>
                  </div>
                  
                  <div className="chat-bubble-user">
                    <p>Quando será o próximo jogo da FURIA?</p>
                  </div>
                  
                  <div className="chat-bubble-bot">
                    <p className="mb-2">A FURIA enfrentará a MIBR amanhã às 19h (horário de Brasília) pela ESL Pro League!</p>
                    <p>Quer que eu te mande um lembrete antes do jogo começar?</p>
                  </div>
                  
                  <div className="chat-bubble-bot">
                    <div className="typing-indicator">
                      <span className="typing-dot"></span>
                      <span className="typing-dot"></span>
                      <span className="typing-dot"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
