import {CellStyles, GridCellData, GridCellLocation, GridData} from "../../../grid/GridTypes";

export type SnakeGameDirections = "UP" | "DOWN" | "LEFT" | "RIGHT";
export const AllSnakeDirections: SnakeGameDirections[] = ["UP", "DOWN", "LEFT", "RIGHT"];
export type SnakePieceType = "HEAD" | "STRAIGHT" | "CURVE" | "TAIL";
export const AllSnakePieceTypes: SnakePieceType[] = ["HEAD", "STRAIGHT", "CURVE", "TAIL"];

export type SnakePieceCell = GridCellLocation & {
    direction: SnakeGameDirections;
    player: number;
}

export type SnakePlayer = {
    score: number;
    gameOver: boolean;
    queuedMoves: SnakeGameDirections[];
    snakeBody: SnakePieceCell[];
    direction: SnakeGameDirections;
}

export type SnakeGameData = {
    options: SnakeGameOptions;
    assetStyles: CellStyles;
    grid: GridData;
    fruits: GridCellLocation[];
    players: SnakePlayer[];
    gameOver: boolean;
}

export type SnakeGameOptions = {
    level: string;
    gridHeight: number;
    gridWidth: number;
    fruitAmount: number;
    obstacles: GridCellData[];

    snakeGrowth: boolean;
}

export type SnakeLevelOptions = {
    gameOptions: SnakeGameOptions;
    players: SnakeLevelPlayerOptions[];
}

export type SnakeLevelPlayerOptions = {
    direction: SnakeGameDirections;
    position: GridCellLocation;
    length: number;
}

export type SnakeLevelProgression = {
    level: string;
    completedChallenges: [boolean, boolean, boolean];
    highScore: number;
}

export type SnakeStorage = {
    snakeSkins: string[];
    soloProgression: {
        [key: string]: SnakeLevelProgression
    };
}
