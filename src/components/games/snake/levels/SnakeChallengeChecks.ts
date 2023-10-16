import {SnakeGameData, SnakeLevelChallenge} from "../engine/SnakeTypes";

export function GetChallengeCheck(type: string): SnakeLevelChallenge["checkChallengeCompletion"] {
  switch (type) {
    case "checkScore":
      return checkScore;
    case "checkConsumable":
      return checkConsumable;
    default:
      return checkNotFound;
  }
}

function checkScore(gameData: SnakeGameData, index: number) {
  if (gameData.challenges === undefined) return false;
  const data = gameData.challenges[index].data;
  return gameData.players[0].score >= data;
}

function checkConsumable(gameData: SnakeGameData, index: number) {
  if (gameData.challenges === undefined) return false;
  const data = gameData.challenges[index].data;
  return false;
}

function checkNotFound() {
  console.warn("Challenge check was not found");
  return false;
}
