import {GridCellLocation, GridData} from "../../grid/GridTypes.ts";

export type SnakeGameDirections = "UP" | "DOWN" | "LEFT" | "RIGHT"

export type SnakeGameData = {
    score: number;
    gameOver: boolean;

    queuedMoves: SnakeGameDirections[];
    grid: GridData;
    fruits: GridCellLocation[];
    snakeBody: GridCellLocation[];
    snakeHead: GridCellLocation;
    direction: SnakeGameDirections;
}
