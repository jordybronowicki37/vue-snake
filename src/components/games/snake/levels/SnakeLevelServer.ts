import {SnakeGameData} from "../engine/SnakeTypes.ts";
import {SetupSnakeLevel1} from "./SnakeLevel1.ts";
import {SetupSnakeBattle} from "./SnakeBattle.ts";

export function GenerateLevel(levelId: string): SnakeGameData {
    switch (levelId) {
        case "1-1":
            return SetupSnakeLevel1();
        case "battle":
            return SetupSnakeBattle();
        default:
            return SetupSnakeLevel1();
    }
}