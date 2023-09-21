import {GridCellData, GridCellLocation, GridData} from "../../../grid/GridTypes";
import {
    SnakeGameData,
    SnakeGameDirections,
    SnakePieceCell,
    SnakePlayer,
    SnakeGameOptions
} from "./SnakeTypes";
import {GenerateTypeIndex, GetNextPosition, InsertValueIntoGrid, ResetGrid} from "./SnakeHelpers.ts";

export const StandardSnakeOptions: SnakeGameOptions = {
    level: "1-1",
    gridHeight: 25,
    gridWidth: 25,
    fruitAmount: 1,
    snakeGrowth: true,
    obstacles: [],
}

export const StandardPlayerOptions: Omit<Omit<SnakePlayer, "snakeBody">, "queuedMoves"> = {
    score: 0,
    gameOver: false,
    direction: "UP",
}

export function MoveForward(gameData: SnakeGameData, playerId: number): SnakeGameData {
    const player = gameData.players[playerId];

    // Execute a move if it is queued
    let newDirection = player.queuedMoves.shift();
    if (newDirection) player.direction = newDirection;

    if (CheckForSnake(gameData, playerId)) {
        player.gameOver = true;
        if (CheckForGameOver(gameData)) {
            gameData.gameOver = true;
            return gameData;
        }
    }

    const hitFruit = CheckForFruit(gameData, playerId);
    if (hitFruit !== undefined) {
        player.score++;
        gameData.fruits = gameData.fruits.filter(v => v !== hitFruit);
        SetupNewFruitLocation(gameData);
        player.snakeBody.unshift(player.snakeBody[0]);
    }

    ResetGrid(gameData);
    
    player.snakeBody.shift();
    const snakeHead = GetNewHeadPosition(gameData, playerId)
    player.snakeBody.push(snakeHead);

    for (const fruit of gameData.fruits) {
        InsertValueIntoGrid(gameData.grid, fruit, "F");
    }
    for (const player of gameData.players) {
        InsertSnakeBodyPiecesIntoGrid(gameData.grid, player.snakeBody);
    }

    return gameData;
}

export function ChangeDirection(gameData: SnakeGameData, newDirection: SnakeGameDirections, playerIndex: number = 0) {
    const player = gameData.players[playerIndex];
    const { queuedMoves, direction } = player;

    let actualDirection = queuedMoves[queuedMoves.length - 1];
    if (!actualDirection) actualDirection = direction;

    if (actualDirection === "UP" || actualDirection === "DOWN") {
        if (newDirection === "LEFT" || newDirection === "RIGHT") {
            queuedMoves.push(newDirection);
        }
    } else {
        if (newDirection === "UP" || newDirection === "DOWN") {
            queuedMoves.push(newDirection);
        }
    }
}

export function CheckForSnake(gameData: SnakeGameData, playerIndex: number): boolean {
    const { players, options: { gridWidth, gridHeight }, grid } = gameData;
    const player = players[playerIndex];
    const { direction, snakeBody} = player;
    const snakeHead = snakeBody[snakeBody.length-1];
    const position = GetNextPosition(gridWidth, gridHeight, snakeHead, direction);
    const positionContent = grid[position.y][position.x];

    // FIXME: When a snakes eats a fruit the tail does not retract. A different snakes can hit this tail and would not die.
    return positionContent !== "." && positionContent !== "F" && positionContent[0] !== "T";
}

export function CheckForFruit(gameData: SnakeGameData, playerIndex: number): GridCellLocation | undefined {
    const player = gameData.players[playerIndex];
    const { direction, snakeBody } = player;
    const { fruits, options: { gridHeight, gridWidth } } = gameData;
    const snakeHead = snakeBody[snakeBody.length-1];
    const nextPosition = GetNextPosition(gridWidth, gridHeight, snakeHead, direction);
    return fruits.find(fruit => nextPosition.x === fruit.x && nextPosition.y === fruit.y);
}

export function CheckForGameOver(gameData: SnakeGameData): boolean {
    let amountStillPlaying = gameData.players.map(p => p.gameOver).filter(v => !v).length;

    // Single player mode
    if (gameData.players.length === 1) {
        return amountStillPlaying === 0;
    }
    // Versus mode
    return amountStillPlaying === 1;
}

export function GetNewHeadPosition(gameData: SnakeGameData, playerIndex: number): SnakePieceCell {
    const { players, options: { gridHeight, gridWidth } } = gameData;
    const { direction, snakeBody } = players[playerIndex];
    const snakeHead = snakeBody[snakeBody.length-1];
    const newPosition = GetNextPosition(gridWidth, gridHeight, snakeHead, direction);
    return {...newPosition, player: snakeHead.player, direction};
}

export function SetupNewFruitLocation(gameData: SnakeGameData) {
    const fruitLocation = FindNewFruitLocation(gameData);
    if (fruitLocation === undefined) return;
    gameData.fruits.push(fruitLocation);
    InsertValueIntoGrid(gameData.grid, fruitLocation, "F");
}

export function FindNewFruitLocation(gameData: SnakeGameData): GridCellLocation | undefined {
    const viablePositions: GridCellData[] = gameData.grid
        .flatMap((row, y) =>
            row.map<GridCellData>((value, x) => ({x, y, value})))
        .filter(v => v.value === ".");
    if (viablePositions.length === 0) return undefined;
    return viablePositions[Math.floor(Math.random()*viablePositions.length)];
}

export function InsertSnakeBodyPiecesIntoGrid(gameGrid: GridData, snakeBody: SnakePieceCell[]) {
    snakeBody = [...snakeBody].reverse();
    const snakeHead: SnakePieceCell = snakeBody[0];
    snakeBody.shift();
    InsertValueIntoGrid(gameGrid, snakeHead, GenerateTypeIndex(snakeHead, "HEAD"));

    for (let i = 0; i < snakeBody.length; i++) {
        const bodyPiece = snakeBody[i];

        let previousPiece = snakeHead;
        if (i !== 0) {
            previousPiece = snakeBody[i-1];
        }

        // Tail of snakes
        if (i+1 === snakeBody.length) {
            InsertValueIntoGrid(gameGrid, bodyPiece, GenerateTypeIndex({...bodyPiece, direction: previousPiece.direction}, "TAIL"));
            break;
        }

        // Straight piece
        if (previousPiece.direction === bodyPiece.direction) {
            InsertValueIntoGrid(gameGrid, bodyPiece, GenerateTypeIndex(bodyPiece, "STRAIGHT"));
            continue;
        }

        // Curves
        let curveDirection = bodyPiece.direction;
        if (curveDirection === "UP" && previousPiece.direction === "RIGHT") curveDirection = "LEFT";
        else if (curveDirection === "RIGHT" && previousPiece.direction === "DOWN") curveDirection = "UP";
        else if (curveDirection === "DOWN" && previousPiece.direction === "LEFT") curveDirection = "RIGHT";
        else if (curveDirection === "LEFT" && previousPiece.direction === "UP") curveDirection = "DOWN";
        InsertValueIntoGrid(gameGrid, bodyPiece, GenerateTypeIndex({...bodyPiece, direction: curveDirection}, "CURVE"));
    }
}
