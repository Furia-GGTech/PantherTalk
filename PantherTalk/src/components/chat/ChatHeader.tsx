
import { X } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star } from 'lucide-react';

interface ChatHeaderProps {
  onClose: () => void;
  showBadge: boolean;
}

const ChatHeader = ({ onClose, showBadge }: ChatHeaderProps) => {
  return (
    <div className="bg-furia-black p-4 flex items-center justify-between border-b border-furia-light-purple/20">
      <div className="flex items-center">
        <Avatar className="w-8 h-8 mr-3 bg-furia-purple">
          <AvatarImage src="https://api.draft5.gg/teams/330/logo" alt="PantherTalk" />
          <AvatarFallback>PT</AvatarFallback>
        </Avatar>
        <div>
          <span className="text-white font-medium">PantherTalk</span>
          {showBadge && (
            <Badge variant="outline" className="ml-2 bg-furia-purple/20 text-white text-xs">
              <Star className="w-3 h-3 mr-1" /> Sou FURIOSO
            </Badge>
          )}
        </div>
      </div>
      <button 
        onClick={onClose}
        className="text-gray-400 hover:text-white transition-colors"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default ChatHeader;
