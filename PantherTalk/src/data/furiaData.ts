
interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: "Qual jogador da FURIA é conhecido como 'Professor'?",
    options: ["arT", "KSCERATO", "FalleN"],
    correctAnswer: 0,
    explanation: "O arT é conhecido como 'Professor' por seu estilo de jogo inteligente e estratégico!"
  },
  {
    question: "Qual é o principal jogo da FURIA?",
    options: ["Valorant", "CS:GO", "Dota 2"],
    correctAnswer: 1,
    explanation: "CS:GO é o principal jogo da FURIA, onde conquistou reconhecimento mundial!"
  },
  {
    question: "Em que ano a FURIA foi fundada?",
    options: ["2016", "2017", "2018"],
    correctAnswer: 1,
    explanation: "A FURIA Esports foi fundada em 2017 e rapidamente se tornou uma das principais organizações de esports do Brasil!"
  },
  {
    question: "Qual foi o primeiro Major que a FURIA participou?",
    options: ["Katowice 2019", "Berlin 2019", "Stockholm 2021"],
    correctAnswer: 1,
    explanation: "A FURIA fez sua estreia em Majors no Berlin Major 2019!"
  },
  {
    question: "Qual destes jogadores nunca jogou pela FURIA?",
    options: ["coldzera", "drop", "saffee"],
    correctAnswer: 0,
    explanation: "Coldzera nunca jogou pela FURIA! Drop e saffee são parte importante da história do time!"
  },
  {
    question: "Qual é a nacionalidade de todos os jogadores da FURIA?",
    options: ["Brasileira", "Mista", "Argentina"],
    correctAnswer: 0,
    explanation: "A FURIA mantém uma linha 100% brasileira desde sua fundação!"
  }
];

export const randomFacts = [
  "A FURIA foi a primeira organização brasileira a ter uma gaming house na Europa! 🏠",
  "O logo da FURIA representa uma pantera, simbolizando força e agilidade! 🐆",
  "A FURIA tem uma das maiores torcidas do CS:GO mundial! 🌎",
  "O uniforme preto da FURIA é um dos mais vendidos do esports! 👕",
  "A FURIA já alcançou o Top 3 do ranking mundial de CS:GO! 🏆",
  "O arT é conhecido por seu estilo de jogo agressivo e único! 🎯",
  "A FURIA tem uma das melhores infraestruturas do esports mundial! 🚀",
  "O mascote da FURIA, a pantera, foi escolhido pelos próprios fãs! 😺",
  "A FURIA foi a primeira equipe brasileira da história a chegar ao top 5 do ranking mundial! 🥇",
  "O CT spawn da Ancient é carinhosamente chamado de 'quarto do arT'! 🛏️",
  "A FURIA foi a primeira organização brasileira a disputar um Major de CS:GO em 2019! 🎮",
  "O KSCERATO é considerado um dos melhores jogadores do mundo! 👑",
  "A base de treinamento da FURIA na Europa fica em Varsóvia, Polônia! 🇵🇱",
  "A FURIA já venceu mais de 10 torneios internacionais! 🌟",
  "O grito de guerra da torcida 'Vamo FURIA' é um dos mais conhecidos do cenário! 📢"
];

export function getRandomQuizQuestions(count: number): QuizQuestion[] {
  const shuffled = [...quizQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function getRandomUniqueQuizQuestions(count: number): QuizQuestion[] {
  const availableQuestions = [...quizQuestions];
  const selectedQuestions: QuizQuestion[] = [];
  
  for (let i = 0; i < count && availableQuestions.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    selectedQuestions.push(availableQuestions[randomIndex]);
    availableQuestions.splice(randomIndex, 1);
  }
  
  return selectedQuestions;
}

export function getRandomFact(): string {
  const randomIndex = Math.floor(Math.random() * randomFacts.length);
  return randomFacts[randomIndex];
}

export function getUniqueRandomFacts(count: number): string[] {
  const availableFacts = [...randomFacts];
  const selectedFacts: string[] = [];
  
  for (let i = 0; i < count && availableFacts.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * availableFacts.length);
    selectedFacts.push(availableFacts[randomIndex]);
    availableFacts.splice(randomIndex, 1);
  }
  
  return selectedFacts;
}
