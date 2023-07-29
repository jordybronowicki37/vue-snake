import {AllSnakeColors, SnakeColors, SnakeGameData, SnakeGameOptions, SnakePlayer} from "./SnakeGameTypes";
import {GridData} from "../../grid/GridTypes";
import {InsertSnakeBodyPiecesIntoGrid, SetupNewFruitLocation} from "./SnakeGameLogic";

const standardOptions: SnakeGameOptions = {
    gridHeight: 25,
    gridWidth: 25,
    fruitAmount: 4,
    playerAmount: 1,
}

export function SetupGame(options: Partial<SnakeGameOptions>): SnakeGameData {
    const completeOptions: SnakeGameOptions = {...standardOptions, ...options};
    const { gridHeight, gridWidth, fruitAmount } = completeOptions;
    const grid = SetupEmptyGrid(gridHeight, gridWidth);

    // Setup initial data
    const gameData: SnakeGameData = {
        options: completeOptions,
        gameOver: false,
        fruits: [],
        grid,
        players: [],
    }
    GenerateStartingPlayers(gameData);

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

function GenerateStartingPlayers(gameData: SnakeGameData) {
    const { gridWidth, gridHeight, playerAmount } = gameData.options;

    for (let i = 0; i < playerAmount; i++) {
        const SnakeHeadX = Math.floor(gridWidth / (playerAmount+1) * (i+1));
        const SnakeHeadY = Math.floor(gridHeight / 2);
        const color: SnakeColors = AllSnakeColors[i];
        gameData.players.push(GeneratePlayer(SnakeHeadX, SnakeHeadY, color));
    }
}

function GeneratePlayer(snakePosX: number, snakePosY: number, color: SnakeColors): SnakePlayer {
    return {
        score: 0,
        queuedMoves: [],
        gameOver: false,
        direction: "UP",
        snakeBody: [
            { y: snakePosY + 2, x: snakePosX, color, direction: "UP" },
            { y: snakePosY + 1, x: snakePosX, color, direction: "UP" },
            { y: snakePosY, x: snakePosX, color, direction: "UP" },
        ],
    }
}

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
