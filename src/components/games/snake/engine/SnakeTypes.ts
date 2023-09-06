import {GridCellLocation, GridData} from "../../../grid/GridTypes";

export type SnakeGameDirections = "UP" | "DOWN" | "LEFT" | "RIGHT";
export const AllSnakeDirections: SnakeGameDirections[] = ["UP", "DOWN", "LEFT", "RIGHT"];
export type SnakePieceType = "HEAD" | "STRAIGHT" | "CURVE" | "TAIL";
export const AllSnakePieceTypes: SnakePieceType[] = ["HEAD", "STRAIGHT", "CURVE", "TAIL"];
export type SnakeColors = "GREEN" | "BLUE";
export const AllSnakeColors: SnakeColors[] = ["GREEN", "BLUE"];

export type SnakePieceCell = GridCellLocation & {
    direction: SnakeGameDirections;
    color: SnakeColors;
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

    snakeSize: number;
    snakeGrowth: boolean;
}
