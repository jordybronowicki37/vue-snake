import {SnakeLevelProgression, SnakeStorage} from "./SnakeTypes";

export function GetSnakeStorage(): SnakeStorage {
    const rawStorage = localStorage.getItem("snakeGame");
    if (rawStorage !== null) return JSON.parse(rawStorage);

    const basicStorage: SnakeStorage = {soloProgression: {}};
    SaveSnakeStorage(basicStorage);
    return basicStorage;
}

export function SaveSnakeStorage(storage: SnakeStorage) {
    localStorage.setItem("snakeGame", JSON.stringify(storage));
}

export function GetLevelData(level: string): SnakeLevelProgression {
    const storage = GetSnakeStorage();
    const foundLevel = storage.soloProgression[level]
    if (foundLevel !== undefined) return foundLevel;

    return {
        level,
        completedChallenges: [false, false, false],
        highScore: 0,
    }
}

export function SaveLevelData(levelProgression: SnakeLevelProgression) {
    const storage = GetSnakeStorage();
    storage.soloProgression[levelProgression.level] = levelProgression;
    SaveSnakeStorage(storage);
}
