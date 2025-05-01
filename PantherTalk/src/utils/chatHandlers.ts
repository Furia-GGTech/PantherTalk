import { Dispatch, SetStateAction } from 'react';
import { ChatMessage } from '@/types/chat';
import { getUniqueRandomFacts } from '@/data/furiaData';
import { chatOptions, easterEggs } from '@/constants/chatConstants';

export const handleOptionClick = (
  option: string,
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>,
  setIsTyping: Dispatch<SetStateAction<boolean>>,
  setIsQuizMode: Dispatch<SetStateAction<boolean>>,
  nextMatch: any,
  isLoadingMatch: boolean
) => {
  const selectedOption = chatOptions.find(opt => opt.label === option);

  if (selectedOption?.url) {
    window.open(selectedOption.url, '_blank');
    return;
  }

  if (option === 'Curiosidades rápidas') {
    const facts = getUniqueRandomFacts(3);
    const botResponse = facts.join('\n\n');
    setMessages(prev => [...prev, 
      { sender: 'user', text: option },
      { sender: 'bot', text: botResponse }
    ]);
    return;
  }

  if (option === 'Iniciar Quiz') {
    setIsQuizMode(true);
    setMessages(prev => [...prev, 
      { sender: 'user', text: 'Quero participar do quiz!' },
      { sender: 'bot', text: 'Ótimo! Vamos testar seus conhecimentos sobre a FURIA. Responda corretamente para ganhar pontos!' }
    ]);
    return;
  }

  setMessages(prev => [...prev, { sender: 'user', text: option }]);
  setIsTyping(true);
  
  setTimeout(() => {
    setIsTyping(false);
    
    let botResponse = '';
    switch (option) {
      case 'Estatísticas':
        botResponse = '📊 Stats atualizados da FURIA:\n\n🎯 KSCERATO: 1.27 rating\n💪 arT: 1.15 rating\n🔥 chelo: 1.12 rating\n\nWin rate do time: 68% nos últimos 3 meses!\n\nQuer saber mais sobre algum jogador específico?';
        break;
      case 'Próximo jogo':
        if (isLoadingMatch) {
          botResponse = '⌛ Carregando informações do próximo jogo...';
        } else if (!nextMatch) {
          botResponse = '😕 Desculpe, não consegui encontrar informações sobre o próximo jogo da FURIA no momento. Tente novamente mais tarde!';
        } else {
          const matchDate = new Date(nextMatch.date);
          botResponse = `🎮 Próxima partida da FURIA:\n\nFURIA vs ${nextMatch.team1 === 'FURIA' ? nextMatch.team2 : nextMatch.team1}\n📅 ${matchDate.toLocaleDateString('pt-BR')} às ${matchDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}\n🏆 ${nextMatch.event}\n\nQuer que eu te lembre quando o jogo começar?`;
        }
        break;
      case 'História da FURIA':
        botResponse = '📚 A FURIA Esports foi fundada em 2017 e se tornou uma das principais organizações de esports do Brasil!\n\nMarcos importantes:\n\n🏆 2019: Top 4 no Major de Berlim\n🌟 2020: #3 ranking mundial\n🎖️ 2021: Vitória na IEM Fall\n\nQuer saber mais sobre alguma época específica?';
        break;
      default:
        botResponse = 'Pode escolher uma das opções abaixo ou me fazer uma pergunta!';
    }
    
    setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
  }, 1500);
};

export const handleUserInput = (
  inputText: string,
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>,
  setIsTyping: Dispatch<SetStateAction<boolean>>,
  setUserInput: Dispatch<SetStateAction<string>>,
  setLastAnimation: Dispatch<SetStateAction<'success' | 'error' | null>>
) => {
  if (!inputText.trim()) return;

  setMessages(prev => [...prev, { sender: 'user', text: inputText }]);
  setIsTyping(true);
  setUserInput('');
  
  setTimeout(() => {
    setIsTyping(false);
    let response = "Me conte mais sobre isso! Estou aqui para ajudar com qualquer dúvida sobre a FURIA. Você também pode escolher uma das opções abaixo para navegarmos por tópicos específicos.";
    
    const lowerText = inputText.toLowerCase();
    Object.entries(easterEggs).forEach(([key, value]) => {
      if (lowerText.includes(key.toLowerCase())) {
        response = value;
        setLastAnimation('success');
        setTimeout(() => {
          setLastAnimation(null);
        }, 3000);
      }
    });

    setMessages(prev => [...prev, { sender: 'bot', text: response }]);
  }, 1500);
};

export const handleQuizComplete = (
  score: number,
  setIsQuizMode: Dispatch<SetStateAction<boolean>>,
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>,
  setLastAnimation: Dispatch<SetStateAction<'success' | 'error' | null>>,
  setShowBadge: Dispatch<SetStateAction<boolean>>
) => {
  setIsQuizMode(false);
  const total = 3;
  let message = '';
  
  if (score === total) {
    message = '🎯 Você é CLUTCH total! Tá pronto pra representar na B1!\n\n🏆 Parabéns! Você completou o quiz com 100% de acerto!';
    setLastAnimation('success');
    setShowBadge(true);
  } else if (score >= Math.floor(total / 2)) {
    message = `Você acertou ${score} de ${total}! Quase lá!\n\n💪 Continue estudando para se tornar um verdadeiro FURIOSO!`;
    setLastAnimation('success');
  } else {
    message = `👀 Tá precisando assistir uns highlights, hein...\n\nVocê acertou ${score} de ${total}. Não se preocupe, a FURIA sempre tem novas oportunidades de aprender!`;
    setLastAnimation('error');
  }

  setMessages(prev => [...prev, { sender: 'bot', text: message }]);

  setTimeout(() => {
    setLastAnimation(null);
  }, 3000);
};
