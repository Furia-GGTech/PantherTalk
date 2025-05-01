import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Star } from 'lucide-react';
import { getRandomQuizQuestions } from '@/data/furiaData';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Props {
  onComplete: (score: number) => void;
}

const QuizGame = ({ onComplete }: Props) => {
  const [questions] = useState<Question[]>(() => getRandomQuizQuestions(3));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswer = (selectedOption: number) => {
    setSelectedOption(selectedOption);
    const correct = selectedOption === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
    }
    
    setShowExplanation(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setShowExplanation(false);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        onComplete(correct ? score + 1 : score);
      }
    }, 2000);
  };

  if (currentQuestion >= questions.length) {
    return null;
  }

  const question = questions[currentQuestion];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-medium text-lg">{question.question}</p>
        <div className="flex items-center bg-furia-black/50 px-2 py-1 rounded-full">
          <Star className="w-4 h-4 text-furia-light-purple mr-1" />
          <span className="text-sm">{score}/{currentQuestion}</span>
        </div>
      </div>
      
      <div className="grid gap-2">
        {question.options.map((option, index) => (
          <Button
            key={index}
            variant="outline"
            disabled={showExplanation}
            className={`
              bg-furia-dark-gray hover:bg-furia-dark-purple text-white border-furia-light-purple/30
              transition-all duration-300
              ${showExplanation && index === question.correctAnswer ? 'border-green-500 bg-green-500/20' : ''}
              ${showExplanation && selectedOption === index && index !== question.correctAnswer ? 'border-red-500 bg-red-500/20' : ''}
            `}
            onClick={() => handleAnswer(index)}
          >
            {option}
          </Button>
        ))}
      </div>
      
      {showExplanation && (
        <div className={`p-3 rounded-md text-sm animate-fade-in ${isCorrect ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
          <p className="font-medium mb-1">{isCorrect ? '🎯 Acertou!' : '👀 Não foi dessa vez!'}</p>
          <p>{question.explanation}</p>
        </div>
      )}
      
      <p className="text-sm text-furia-light-gray">
        Pergunta {currentQuestion + 1} de {questions.length}
      </p>
    </div>
  );
};

export default QuizGame;
