import {GeneratePlayer, SetupGame, StandardSnakeOptions} from "../SnakeGameLogic";
import {SnakeGameData} from "../SnakeGameTypes";

export function SetupSnakeLevel1(): SnakeGameData {
    return SetupGame({
        players: [GeneratePlayer(12, 12, StandardSnakeOptions.snakeSize, "BLUE")]
    });
}