
import { useState } from 'react';
import { ChatMessage, ChatUIState } from '@/types/chat';
import { getRandomFact } from '@/data/furiaData';

export function useChatState() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [lastAnimation, setLastAnimation] = useState<'success' | 'error' | null>(null);

  const initialMessage: ChatMessage = {
    sender: 'bot',
    text: `⚡ Yo, fã da FURIA! Eu sou o PantherTalk, a voz felina da FURIA!\n\n🔥 Curiosidade: ${getRandomFact()}\n\nComo posso te ajudar hoje?`
  };

  const resetChat = () => {
    setMessages([initialMessage]);
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
