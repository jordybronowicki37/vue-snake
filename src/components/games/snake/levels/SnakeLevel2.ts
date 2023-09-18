import {SnakeGameData} from "../engine/SnakeTypes";
import {GeneratePlayer, SetupGame} from "../engine/SnakeHelpers";
import {StandardSnakeOptions} from "../engine/SnakeLogic";

export function SetupSnakeLevel2(): SnakeGameData {
    return SetupGame({
            level: "1-1",
        },
        [GeneratePlayer(12, 12, StandardSnakeOptions.snakeSize)]
    );
}