import {StandardSnakeOptions} from "../engine/SnakeLogic";
import {SnakeGameData} from "../engine/SnakeTypes";
import {GeneratePlayer, SetupGame} from "../engine/SnakeHelpers.ts";

export function SetupSnakeBattle(): SnakeGameData {
    return SetupGame({
            level: "versus",
        },
        [
            GeneratePlayer(8, 12, StandardSnakeOptions.snakeSize, "BLUE"),
            GeneratePlayer(16, 12, StandardSnakeOptions.snakeSize, "GREEN")
        ]
    );
}