import {GridCellLocation, GridData} from "../../grid/GridTypes.ts";

export type SnakeGameDirections = "UP" | "DOWN" | "LEFT" | "RIGHT";
export type SnakePieceType = "HEAD" | "STRAIGHT" | "CURVE" | "TAIL";
export type SnakeColors = "GREEN" | "BLUE";

export type SnakePieceCell = GridCellLocation & {
    direction: SnakeGameDirections,
    color: SnakeColors,
}

export type SnakeGameData = {
    score: number;
    gameOver: boolean;

    queuedMoves: SnakeGameDirections[];
    grid: GridData;
    fruits: GridCellLocation[];
    snakeBody: SnakePieceCell[];
    snakeHead: SnakePieceCell;
    direction: SnakeGameDirections;
}
