
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from 'lucide-react';
import { ChatOption } from '@/types/chat';

interface ChatInputProps {
  userInput: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onOptionClick: (option: string) => void;
  options: ChatOption[];
}

const ChatInput = ({ 
  userInput, 
  onInputChange, 
  onSubmit, 
  onOptionClick,
  options 
}: ChatInputProps) => {
  return (
    <div className="p-4 bg-furia-black border-t border-furia-light-purple/20">
      <form onSubmit={onSubmit} className="flex gap-2 mb-2">
        <Input
          value={userInput}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-1 bg-furia-dark-gray text-white border-furia-light-purple/30"
        />
        <Button 
          type="submit"
          size="icon"
          className="bg-furia-purple hover:bg-furia-dark-purple"
        >
          <Send size={18} />
        </Button>
      </form>

      <div className="grid grid-cols-2 gap-2">
        {options.map(option => (
          <Button
            key={option.id}
            onClick={() => onOptionClick(option.label)}
            variant="outline"
            className="bg-furia-dark-gray hover:bg-furia-dark-purple text-white border-furia-light-purple/30"
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ChatInput;
