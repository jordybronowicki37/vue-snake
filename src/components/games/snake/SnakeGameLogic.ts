import {GridCellData, GridCellLocation, GridData} from "../../grid/GridTypes.ts";
import {
    SnakePieceType,
    SnakeGameData,
    SnakeGameDirections,
    SnakePieceCell
} from "./SnakeGameTypes.ts";

export function MoveForward(gameData: SnakeGameData): SnakeGameData {
    for (let i = 0; i < gameData.players.length; i++) {
        const player = gameData.players[i];

        // Execute a move if it is queued
        let newDirection = player.queuedMoves.shift();
        if (newDirection) player.direction = newDirection;

        if (CheckForBorder(gameData, i)) {
            player.gameOver = true;
            if (CheckForGameOver(gameData)) {
                gameData.gameOver = true;
                return gameData;
            }
        }

        if (CheckForSnake(gameData, i)) {
            player.gameOver = true;
            if (CheckForGameOver(gameData)) {
                gameData.gameOver = true;
                return gameData;
            }
        }

        const hitFruit = CheckForFruit(gameData, i);
        if (hitFruit !== undefined) {
            player.score++;
            gameData.fruits = gameData.fruits.filter(v => v !== hitFruit);
            SetupNewFruitLocation(gameData);
            player.snakeBody.unshift(player.snakeBody[0]);
        }

        player.snakeBody.shift();
        const snakeHead = GetNewHeadPosition(gameData, i)
        player.snakeBody.push(snakeHead);
    }

    ResetGrid(gameData.grid);
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

export function CheckForBorder(gameData: SnakeGameData, playerIndex: number): boolean {
    const player = gameData.players[playerIndex];
    const { direction, snakeBody } = player;
    const snakeHead = snakeBody[snakeBody.length-1];

    switch (direction) {
        case "UP":
            return snakeHead.y === 0;
        case "LEFT":
            return snakeHead.x === 0;
        case "DOWN":
            return snakeHead.y === gameData.options.gridHeight - 1;
        case "RIGHT":
            return snakeHead.x === gameData.options.gridWidth - 1;
    }
}

export function CheckForSnake(gameData: SnakeGameData, playerIndex: number): boolean {
    const player = gameData.players[playerIndex];
    const { direction, snakeBody} = player;
    const { grid } = gameData;
    const snakeHead = snakeBody[snakeBody.length-1];
    let nextPosition: string;

    switch (direction) {
        case "UP":
            nextPosition = grid[snakeHead.y - 1][snakeHead.x];
            break;
        case "LEFT":
            nextPosition = grid[snakeHead.y][snakeHead.x - 1];
            break;
        case "DOWN":
            nextPosition = grid[snakeHead.y + 1][snakeHead.x];
            break;
        case "RIGHT":
            nextPosition = grid[snakeHead.y][snakeHead.x + 1];
            break;
    }

    // FIXME: When a snake eats a fruit the tail does not retract. A different snake can hit this tail and would not die.
    return nextPosition !== "." && nextPosition !== "F" && nextPosition[0] !== "T";
}

export function CheckForFruit(gameData: SnakeGameData, playerIndex: number): GridCellLocation | undefined {
    const player = gameData.players[playerIndex];
    const { direction, snakeBody } = player;
    const { fruits } = gameData;
    const snakeHead = snakeBody[snakeBody.length-1];

    switch (direction) {
        case "UP":
            return fruits.find((fruit) => snakeHead.x === fruit.x && snakeHead.y === fruit.y + 1);
        case "LEFT":
            return fruits.find((fruit) => snakeHead.x === fruit.x + 1 && snakeHead.y === fruit.y);
        case "DOWN":
            return fruits.find((fruit) => snakeHead.x === fruit.x && snakeHead.y === fruit.y - 1);
        case "RIGHT":
            return fruits.find((fruit) => snakeHead.x === fruit.x - 1 && snakeHead.y === fruit.y);
    }
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
    const player = gameData.players[playerIndex];
    const { direction, snakeBody } = player;
    const snakeHead = snakeBody[snakeBody.length-1];
    const { x, y, color } = snakeHead;

    switch (direction) {
        case "UP":
            return { x, y: y - 1, color, direction };
        case "LEFT":
            return { y, x: x - 1, color, direction };
        case "DOWN":
            return { x, y: y + 1, color, direction };
        case "RIGHT":
            return { y, x: x + 1, color, direction };
    }
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

        // Tail of snake
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

export function InsertValueIntoGrid(gameData: GridData, location: GridCellLocation, value: string) {
    gameData[location.y][location.x] = value;
}
