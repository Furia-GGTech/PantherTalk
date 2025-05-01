
import { Calendar, Star, Trophy, Book, MessageCircle, Users } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: { 
  icon: React.ElementType;
  title: string; 
  description: string; 
}) => {
  return (
    <div className="bg-furia-dark-gray hover:bg-furia-dark-gray/80 transition-colors rounded-lg p-6 shadow-lg border border-furia-light-purple/10 hover:border-furia-light-purple/30 group">
      <div className="bg-furia-purple/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-furia-purple group-hover:bg-furia-purple group-hover:text-white transition-all">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: Star,
      title: "Estatísticas em tempo real",
      description: "Acesse dados atualizados sobre o desempenho dos jogadores da FURIA em todas as competições."
    },
    {
      icon: Calendar,
      title: "Agenda de jogos com alertas",
      description: "Nunca perca uma partida com nosso calendário completo e sistema de notificações personalizadas."
    },
    {
      icon: Trophy,
      title: "Ranking e resultados",
      description: "Acompanhe a classificação da FURIA nos rankings mundiais e os resultados das últimas partidas."
    },
    {
      icon: Book,
      title: "Curiosidades e história",
      description: "Descubra fatos interessantes sobre o time e toda a trajetória da FURIA no cenário competitivo."
    },
    {
      icon: MessageCircle,
      title: "Interação com fãs",
      description: "Participe de quizzes, responda perguntas e teste seu conhecimento sobre seu time favorito."
    },
    {
      icon: Users,
      title: "Modo fã",
      description: "Desbloqueie interações especiais e conteúdos exclusivos ao demonstrar sua lealdade ao time."
    },
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-furia-black to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Funcionalidades do <span className="text-furia-purple">PantherTalk</span></h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Muito mais que um simples chatbot, o PantherTalk é seu companheiro definitivo para acompanhar a FURIA e estar por dentro de tudo que acontece no mundo CS:GO.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
