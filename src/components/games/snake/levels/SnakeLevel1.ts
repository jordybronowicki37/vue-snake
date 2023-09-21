import {SnakeGameData} from "../engine/SnakeTypes";
import {GeneratePlayer, SetupGame} from "../engine/SnakeHelpers";

export function SetupSnakeLevel1(): SnakeGameData {
    return SetupGame({
            level: "1-1",
        },
        [GeneratePlayer(12, 12, 3)]
    );
}