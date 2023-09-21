import {SnakeGameData, SnakeLevelOptions} from "../engine/SnakeTypes.ts";
import {SetupSnakeBattle} from "./SnakeBattle.ts";
import {SetupGameFromLevelOptions} from "../engine/SnakeHelpers.ts";
import level_1_1 from "./level-1-1.json"
import level_1_2 from "./level-1-2.json"

export function GenerateLevel(levelId: string): SnakeGameData {
    switch (levelId) {
        case "1-1":
            return SetupGameFromLevelOptions(level_1_1 as SnakeLevelOptions);
        case "1-2":
            return SetupGameFromLevelOptions(level_1_2 as SnakeLevelOptions);
        case "battle":
            return SetupSnakeBattle();
        default:
            return SetupGameFromLevelOptions(level_1_1 as SnakeLevelOptions);
    }
}
