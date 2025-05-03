
import { Github, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-furia-black py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center justify-center md:justify-start">
              <img 
                src="https://api.draft5.gg/teams/330/logo" 
                alt="FURIA Logo" 
                className="h-10 mr-3" 
              />
              <span className="text-white font-bold text-xl">PantherTalk</span>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <a href="https://twitter.com/FURIA" target="_blank" rel="noopener noreferrer" 
              className="bg-furia-dark-gray hover:bg-furia-purple transition-colors w-10 h-10 flex items-center justify-center rounded-full text-white">
              <Twitter size={20} />
            </a>
            <a href="https://www.instagram.com/furiagg/" target="_blank" rel="noopener noreferrer" 
              className="bg-furia-dark-gray hover:bg-furia-purple transition-colors w-10 h-10 flex items-center justify-center rounded-full text-white">
              <Instagram size={20} />
            </a>
            <a href="https://www.youtube.com/furiagg" target="_blank" rel="noopener noreferrer" 
              className="bg-furia-dark-gray hover:bg-furia-purple transition-colors w-10 h-10 flex items-center justify-center rounded-full text-white">
              <Youtube size={20} />
            </a>
            <a href="https://github.com/Furia-GGTech/PantherTalk.git" target="_blank" rel="noopener noreferrer" 
              className="bg-furia-dark-gray hover:bg-furia-purple transition-colors w-10 h-10 flex items-center justify-center rounded-full text-white">
              <Github size={20} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-center md:text-left mb-4 md:mb-0">
            Desafio Técnico — FURIA Tech 2025
          </p>
          
          <div>
            <a href="https://github.com/Furia-GGTech/PantherTalk.git" target="_blank" rel="noopener noreferrer" 
              className="text-furia-purple hover:text-furia-light-purple transition-colors flex items-center">
              <Github size={16} className="mr-2" />
              Veja o código do projeto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
