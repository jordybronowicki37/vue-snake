import challengesData from "./challenges.json";

export function GetChallengesTexts(level: string): [string, string, string] {
    // @ts-ignore
    let challengeData: {texts: [string, string, string]} | undefined = challengesData[level];
    if (challengeData === undefined) challengeData = {texts: ["", "", ""]};
    return challengeData.texts;
}
