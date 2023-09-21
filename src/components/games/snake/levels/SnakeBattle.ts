import {SnakeGameData} from "../engine/SnakeTypes";
import {GeneratePlayer, SetupGame} from "../engine/SnakeHelpers.ts";

export function SetupSnakeBattle(): SnakeGameData {
    return SetupGame({
            level: "battle",
        },
        [
            GeneratePlayer(8, 12, 3),
            GeneratePlayer(16, 12, 3)
        ]
    );
}