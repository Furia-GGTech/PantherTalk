
export interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
}

export interface ChatUIState {
  isTyping: boolean;
  showBadge: boolean;
  lastAnimation: 'success' | 'error' | null;
  isQuizMode: boolean;
}

export interface ChatOption {
  id: string;
  label: string;
  url?: string;
}
