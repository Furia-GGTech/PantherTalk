
import { useState } from 'react';
import { ChatMessage, ChatUIState } from '@/types/chat';
import { getRandomFact, getRandomHistoryFact } from '@/data/furiaData';

export function useChatState() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [lastAnimation, setLastAnimation] = useState<'success' | 'error' | null>(null);

  // Escolhe aleatoriamente entre uma curiosidade ou um fato histórico
  const getInitialGreeting = (): string => {
    const messageType = Math.random() > 0.5 ? 'fact' : 'history';
    
    if (messageType === 'history') {
      return `⚡ Yo, fã da FURIA! Eu sou o PantherTalk, a voz felina da FURIA!\n\n📜 ${getRandomHistoryFact()}\n\nComo posso te ajudar hoje?`;
    } else {
      return `⚡ Yo, fã da FURIA! Eu sou o PantherTalk, a voz felina da FURIA!\n\n🔥 Curiosidade: ${getRandomFact()}\n\nComo posso te ajudar hoje?`;
    }
  };

  const initialMessage: ChatMessage = {
    sender: 'bot',
    text: getInitialGreeting()
  };

  const resetChat = () => {
    setMessages([{
      sender: 'bot',
      text: getInitialGreeting()
    }]);
    setIsQuizMode(false);
    setUserInput('');
    setShowBadge(false);
    setLastAnimation(null);
  };

  return {
    messages,
    setMessages,
    isTyping,
    setIsTyping,
    userInput,
    setUserInput,
    isQuizMode,
    setIsQuizMode,
    showBadge,
    setShowBadge,
    lastAnimation,
    setLastAnimation,
    initialMessage,
    resetChat
  };
}
