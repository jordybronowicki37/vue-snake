import {GeneratePlayer, SetupGame, StandardSnakeOptions} from "../engine/SnakeLogic";
import {SnakeGameData} from "../engine/SnakeTypes";

export function SetupSnakeLevel1(): SnakeGameData {
    return SetupGame({
        players: [GeneratePlayer(12, 12, StandardSnakeOptions.snakeSize, "BLUE")]
    });
}