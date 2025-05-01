
import { useRef, useEffect } from 'react';
import { useChatState } from '@/hooks/useChatState';
import { getNextFuriaMatch } from '@/services/hltvService';
import { useQuery } from '@tanstack/react-query';
import ChatHeader from './chat/ChatHeader';
import ChatMessages from './chat/ChatMessages';
import ChatInput from './chat/ChatInput';
import { chatOptions } from '@/constants/chatConstants';
import { handleOptionClick, handleUserInput, handleQuizComplete } from '@/utils/chatHandlers';

const ChatWidget = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const {
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
  } = useChatState();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: nextMatch, isLoading: isLoadingMatch } = useQuery({
    queryKey: ['nextFuriaMatch'],
    queryFn: getNextFuriaMatch,
    refetchInterval: 300000, // Refetch every 5 minutes
    enabled: isOpen
  });

  useEffect(() => {
    if (!isOpen) {
      resetChat();
    } else if (messages.length === 0) {
      setMessages([initialMessage]);
    }
  }, [isOpen, initialMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, lastAnimation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleQuizCompleteCallback = (score: number) => {
    handleQuizComplete(score, setIsQuizMode, setMessages, setLastAnimation, setShowBadge);
  };

  const handleOptionClickCallback = (option: string) => {
    handleOptionClick(option, setMessages, setIsTyping, setIsQuizMode, nextMatch, isLoadingMatch);
  };

  const handleUserInputCallback = (e: React.FormEvent) => {
    e.preventDefault();
    handleUserInput(userInput.trim(), setMessages, setIsTyping, setUserInput, setLastAnimation);
  };

  return (
    <>
      <button
        onClick={isOpen ? onClose : () => {}}
        className={`fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-furia-purple shadow-lg flex items-center justify-center animate-bounce-small transition-all duration-300 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <img 
          src="https://api.draft5.gg/teams/330/logo" 
          alt="PantherTalk Chat" 
          className="w-10 h-10"
        />
      </button>
      
      <div className={`fixed bottom-6 right-6 z-50 flex flex-col ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'} transition-all duration-300 ease-in-out`}>
        <div className="w-[330px] sm:w-[380px] h-[500px] bg-furia-dark-gray rounded-xl shadow-2xl flex flex-col border border-furia-light-purple/20 overflow-hidden">
          <ChatHeader onClose={onClose} showBadge={showBadge} />
          
          <ChatMessages 
            messages={messages}
            isTyping={isTyping}
            isQuizMode={isQuizMode}
            onQuizComplete={handleQuizCompleteCallback}
            lastAnimation={lastAnimation}
            messagesEndRef={messagesEndRef}
          />
          
          <ChatInput 
            userInput={userInput}
            onInputChange={setUserInput}
            onSubmit={handleUserInputCallback}
            onOptionClick={handleOptionClickCallback}
            options={chatOptions}
          />
        </div>
      </div>
    </>
  );
};

export default ChatWidget;
