import {GridCellLocation, GridData} from "../../../grid/GridTypes.ts";
import {
    SnakeColors,
    SnakeGameData,
    SnakeGameOptions,
    SnakePieceCell,
    SnakePieceType,
    SnakePlayer
} from "./SnakeTypes.ts";
import {
    InsertSnakeBodyPiecesIntoGrid,
    SetupNewFruitLocation,
    StandardPlayerOptions,
    StandardSnakeOptions
} from "./SnakeLogic.ts";

export function SetupEmptyGrid(height: number, width: number): GridData {
    const grid: GridData = [];
    for (let i = 0; i < height; i++) {
        let row: string[] = [];
        for (let j = 0; j < width; j++) {
            row.push(".");
        }
        grid.push(row);
    }
    return grid;
}

export function ResetGrid(gameData: GridData) {
    for (let i = 0; i < gameData.length; i++) {
        for (let j = 0; j < gameData[0].length; j++) {
            gameData[i][j] = ".";
        }
    }
}

export function GenerateTypeIndex(snakePiece: SnakePieceCell, pieceType: SnakePieceType): string {
    return `${pieceType[0]}${snakePiece.color[0]}${snakePiece.direction[0]}`;
}

export function InsertValueIntoGrid(gameData: GridData, location: GridCellLocation, value: string) {
    gameData[location.y][location.x] = value;
}

export function SetupGame(options: Partial<SnakeGameOptions>, players: SnakePlayer[]): SnakeGameData {
    const completedOptions: SnakeGameOptions = {...StandardSnakeOptions, ...options}
    const { gridHeight, gridWidth, fruitAmount } = completedOptions;
    const grid = SetupEmptyGrid(gridHeight, gridWidth);

    // Setup initial data
    const gameData: SnakeGameData = {
        options: completedOptions,
        gameOver: false,
        fruits: [],
        grid,
        players,
    }

    // Setup fruit
    for (let i = 0; i < fruitAmount; i++) {
        SetupNewFruitLocation(gameData);
    }

    // Generate snakes
    for (const player of gameData.players) {
        InsertSnakeBodyPiecesIntoGrid(grid, player.snakeBody);
    }

    return gameData;
}

export function GeneratePlayer(snakeHeadPosX: number, snakeHeadPosY: number, snakeSize: number, color: SnakeColors): SnakePlayer {
    const snakeBody: SnakePieceCell[] = [];
    for (let i = snakeSize-1; i >= 0; i--) {
        snakeBody.push({ y: snakeHeadPosY + i, x: snakeHeadPosX, color, direction: "UP" });
    }

    return {
        ...StandardPlayerOptions,
        queuedMoves: [],
        snakeBody,
    }
}

