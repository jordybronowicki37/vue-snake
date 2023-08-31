import {AllSnakeColors, SnakeColors, SnakeGameData, SnakeGameOptions} from "./SnakeGameTypes";
import {GeneratePlayer, InsertSnakeBodyPiecesIntoGrid, SetupEmptyGrid, SetupNewFruitLocation} from "./SnakeGameLogic";

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
