import { Dispatch, SetStateAction } from 'react';
import { ChatMessage } from '@/types/chat';
import { getUniqueRandomFacts, getRandomStats, getRandomHistoryFact, getPlayerStats } from '@/data/furiaData';
import { chatOptions, easterEggs } from '@/constants/chatConstants';

// Keep track of last shown content to avoid repetition
let lastShownStats: string | null = null;
let lastShownHistoryFact: string | null = null;
let lastCuriosityFacts: string[] = [];

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
    // Get unique facts that weren't shown in the last interaction
    const facts = getUniqueRandomFacts(3, lastCuriosityFacts);
    lastCuriosityFacts = [...facts]; // Store current facts to avoid repeating next time
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
        // Get a random stat that's different from the last one shown
        botResponse = getRandomStats(lastShownStats);
        lastShownStats = botResponse; // Store current stat to avoid repeating
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
        // Get a random history fact that's different from the last one shown
        botResponse = getRandomHistoryFact(lastShownHistoryFact);
        lastShownHistoryFact = botResponse; // Store current fact to avoid repeating
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
    
    // Check for easter eggs
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
    
    // Check for player stats request
    if (lowerText.includes('estatística') || lowerText.includes('estatisticas') || lowerText.includes('stats') || 
        lowerText.includes('numeros') || lowerText.includes('números') || lowerText.includes('desempenho')) {
      
      const playerStats = getPlayerStats(lowerText);
      if (playerStats) {
        response = playerStats;
        setLastAnimation('success');
        setTimeout(() => {
          setLastAnimation(null);
        }, 3000);
      } else if (lowerText.includes('jogador') || lowerText.includes('player')) {
        response = "Posso te mostrar estatísticas dos jogadores da FURIA! Mencione o nome de um jogador como FalleN, arT, KSCERATO, yuurih ou chelo junto com a palavra 'estatísticas'.";
      }
    }

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
