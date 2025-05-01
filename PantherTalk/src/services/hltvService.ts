
interface HLTVMatch {
  event: string;
  team1: string;
  team2: string;
  date: string;
  gameType: string;
}

export const getNextFuriaMatch = async (): Promise<HLTVMatch | null> => {
  try {
    const response = await fetch("https://hltv-api.vercel.app/api/team.json?id=8297", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error('Failed to fetch FURIA matches');
    }

    // Adicionando tratamento para resposta vazia ou undefined
    const text = await response.text();
    if (!text || text === 'undefined') {
      console.log('Empty or undefined response from HLTV API');
      return null;
    }

    const data = JSON.parse(text);
    const nextMatch = data.matches?.[0];

    if (!nextMatch) {
      return null;
    }

    return {
      event: nextMatch.event,
      team1: nextMatch.team1,
      team2: nextMatch.team2,
      date: nextMatch.date,
      gameType: nextMatch.gameType
    };
  } catch (error) {
    console.error('Error fetching FURIA matches:', error);
    return null;
  }
};
