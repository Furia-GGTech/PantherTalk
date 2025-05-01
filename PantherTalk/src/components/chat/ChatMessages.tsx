
import { ChatMessage, ChatUIState } from '@/types/chat';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import QuizGame from '../QuizGame';

interface ChatMessagesProps {
  messages: ChatMessage[];
  isTyping: boolean;
  isQuizMode: boolean;
  onQuizComplete: (score: number) => void;
  lastAnimation: ChatUIState['lastAnimation'];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ChatMessages = ({ 
  messages, 
  isTyping, 
  isQuizMode, 
  onQuizComplete,
  lastAnimation,
  messagesEndRef 
}: ChatMessagesProps) => {
  return (
    <ScrollArea className={`flex-1 p-4 ${lastAnimation === 'success' ? 'success-animation' : lastAnimation === 'error' ? 'error-animation' : ''}`}>
      <div className="flex flex-col space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={message.sender === 'bot' ? 'chat-bubble-bot flex items-start' : 'chat-bubble-user flex items-start justify-end'}
          >
            {message.sender === 'bot' && (
              <Avatar className="w-6 h-6 mr-2 mt-1 flex-shrink-0 bg-furia-purple">
                <AvatarImage src="https://api.draft5.gg/teams/330/logo" alt="PantherTalk" />
                <AvatarFallback>PT</AvatarFallback>
              </Avatar>
            )}
            <div className={message.sender === 'bot' ? 'chat-bubble bg-furia-dark-purple text-white rounded-tl-sm max-w-[80%]' : 'chat-bubble bg-furia-light-purple text-white rounded-tr-sm ml-auto max-w-[80%]'}>
              {message.text.split('\n').map((line, i) => (
                <p key={i} className={i < message.text.split('\n').length - 1 ? 'mb-2' : ''}>
                  {line}
                </p>
              ))}
            </div>
            {message.sender === 'user' && (
              <Avatar className="w-6 h-6 ml-2 mt-1 flex-shrink-0 bg-furia-black">
                <AvatarFallback>FÃ</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="chat-bubble-bot flex items-start">
            <Avatar className="w-6 h-6 mr-2 mt-1 flex-shrink-0 bg-furia-purple">
              <AvatarImage src="https://api.draft5.gg/teams/330/logo" alt="PantherTalk" />
              <AvatarFallback>PT</AvatarFallback>
            </Avatar>
            <div className="chat-bubble bg-furia-dark-purple text-white rounded-tl-sm">
              <div className="typing-indicator">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          </div>
        )}

        {isQuizMode && (
          <div className="chat-bubble-bot flex items-start">
            <Avatar className="w-6 h-6 mr-2 mt-1 flex-shrink-0 bg-furia-purple">
              <AvatarImage src="https://api.draft5.gg/teams/330/logo" alt="PantherTalk" />
              <AvatarFallback>PT</AvatarFallback>
            </Avatar>
            <div className="chat-bubble bg-furia-dark-purple text-white rounded-tl-sm w-full">
              <QuizGame onComplete={onQuizComplete} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default ChatMessages;
