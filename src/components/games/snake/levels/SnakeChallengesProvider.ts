import challengesData from "./challenges-data.json";
import {SnakeLevelChallenge, SnakeLevelChallengeData} from "../engine/SnakeTypes.ts";
import {GetLevelData} from "../engine/SnakeStorage.ts";
import {CheckIsSinglePlayerGame} from "../engine/SnakeHelpers.ts";
import {GetChallengeCheck} from "./SnakeChallengeChecks.ts";

export function GetChallengesData(level: string): [SnakeLevelChallengeData, SnakeLevelChallengeData, SnakeLevelChallengeData] | undefined {
    // @ts-ignore
    return challengesData[level];
}

export function PrepareChallengeLogic(level: string): SnakeLevelChallenge[] | undefined {
    if (!CheckIsSinglePlayerGame(level)) return undefined;

    const challengesRawData = GetChallengesData(level);
    if (challengesRawData === undefined) return undefined;

    const progression = GetLevelData(level);

    const challengesData: SnakeLevelChallenge[] = [];
    for (let i = 0; i < challengesRawData.length; i++) {
        const {title, data, type} = challengesRawData[i];
        challengesData.push({
            title,
            data,
            completed: progression.completedChallenges[i],
            checkChallengeCompletion: GetChallengeCheck(type)
        });
    }
    return challengesData;
}
