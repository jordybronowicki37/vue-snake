import {GridCellData, GridCellLocation, GridData} from "../../../grid/GridTypes.ts";
import {
    SnakeGameData, SnakeGameDirections,
    SnakeGameOptions, SnakeLevelOptions,
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
import {SnakeGameCellStyles} from "./SnakeStyling.ts";
import {GetLevelData, GetSnakeStorage} from "./SnakeStorage.ts";
import {PrepareChallengeLogic} from "../levels/SnakeChallengesProvider.ts";

export function SetupEmptyLevel(height: number, width: number, staticObstacles: GridCellData[]): GridData {
    const grid: GridData = [];
    for (let i = 0; i < height; i++) {
        let row: string[] = [];
        for (let j = 0; j < width; j++) {
            row.push(".");
        }
        grid.push(row);
    }
    for (const obstacle of staticObstacles) {
        grid[obstacle.y][obstacle.x] = obstacle.value;
    }
    return grid;
}

export function GetNextPosition(
    gridWidth: number,
    gridHeight: number,
    position: GridCellLocation,
    direction: SnakeGameDirections): GridCellLocation {
    switch (direction) {
        case "UP":
            if (position.y === 0) return { y: gridHeight-1, x: position.x }
            return { y:position.y - 1, x:position.x };
        case "LEFT":
            if (position.x === 0) return { y: position.y, x: gridWidth-1 }
            return { y:position.y, x:position.x - 1 };
        case "DOWN":
            if (position.y === gridHeight-1) return { y: 0, x: position.x }
            return { y:position.y + 1, x:position.x };
        case "RIGHT":
            if (position.x === gridWidth-1) return { y: position.y, x: 0 }
            return { y:position.y, x:position.x + 1 };
    }
}

export function GenerateTypeIndex(snakePiece: Omit<Omit<SnakePieceCell, "x">, "y">, pieceType: SnakePieceType): string {
    return `S${pieceType[0]}${snakePiece.player}${snakePiece.direction[0]}`;
}

export function InsertValueIntoGrid(gameData: GridData, location: GridCellLocation, value: string) {
    gameData[location.y][location.x] = value;
}

export function SetupGameFromLevelOptions(options: SnakeLevelOptions): SnakeGameData {
    const players = [];
    for (const playerOptions of options.players) {
        players.push(GeneratePlayer(playerOptions.position.x, playerOptions.position.y, playerOptions.length))
    }

    return SetupGame(options.gameOptions, players);
}

export function SetupGame(options: Partial<SnakeGameOptions>, players: SnakePlayer[]): SnakeGameData {
    const completedOptions: SnakeGameOptions = {...StandardSnakeOptions, ...options}
    const { gridHeight, gridWidth, fruitAmount, obstacles, level } = completedOptions;

    const grid = SetupEmptyLevel(gridHeight, gridWidth, obstacles);
    const localData = GetSnakeStorage();
    const progression = CheckIsSinglePlayerGame(level) ? GetLevelData(level) : undefined;
    const challenges = PrepareChallengeLogic(level);

    // Set player values correctly
    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        player.speed = completedOptions.initialSpeed;

        // Make sure the correct player index is set to the body pieces
        for (const snakeBodyElement of player.snakeBody) {
            snakeBodyElement.player = i;
        }
    }

    // Setup initial data
    const gameData: SnakeGameData = {
        progression,
        challenges,
        assetStyles: SnakeGameCellStyles(localData.snakeSkins),
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

export function GeneratePlayer(snakeHeadPosX: number, snakeHeadPosY: number, snakeSize: number): SnakePlayer {
    const snakeBody: SnakePieceCell[] = [];
    for (let i = snakeSize-1; i >= 0; i--) {
        snakeBody.push({
            y: snakeHeadPosY + i,
            x: snakeHeadPosX,
            player: 0,
            direction: "UP"
        });
    }

    return {
        ...StandardPlayerOptions,
        queuedMoves: [],
        snakeBody,
    }
}

export function CheckIsSinglePlayerGame(level: string): boolean {
    return !["battle", "versus"].includes(level);
}

