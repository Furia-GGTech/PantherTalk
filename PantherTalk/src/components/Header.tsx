
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu } from 'lucide-react';

const Header = ({ openChat }: { openChat: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-furia-black/90 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="flex items-center">
          <img 
            src="https://api.draft5.gg/teams/330/logo" 
            alt="FURIA Logo" 
            className="h-10 mr-3" 
          />
          <span className="text-white font-bold text-xl hidden sm:inline">PantherTalk</span>
        </a>
        
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="text-white p-2"
          >
            <Menu />
          </button>
        </div>
        
        <nav className={`md:flex items-center space-x-1 lg:space-x-6 ${isMobileMenuOpen ? 'absolute top-full left-0 right-0 bg-furia-black/95 flex flex-col items-center space-y-4 py-4 shadow-lg' : 'hidden'}`}>
          <a href="#about" className="text-white hover:text-furia-purple px-3 py-2 transition-colors">Sobre</a>
          <a href="#features" className="text-white hover:text-furia-purple px-3 py-2 transition-colors">Funções</a>
          <a href="https://wa.me/5511993404466" target="_blank" rel="noopener noreferrer" className="text-white hover:text-furia-purple px-3 py-2 transition-colors">Contato</a>
          <Button 
            onClick={openChat}
            variant="default" 
            className="bg-furia-purple hover:bg-furia-dark-purple text-white btn-glow"
          >
            Converse com o PantherTalk
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
