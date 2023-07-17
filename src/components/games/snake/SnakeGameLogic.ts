import {CellStyles, GridCellData, GridCellLocation, GridData} from "../../grid/GridTypes.ts";
import {SnakePieceType, SnakeGameData, SnakeGameDirections, SnakePieceCell, SnakeColors} from "./SnakeGameTypes.ts";
import {CSSProperties} from "vue";

export const GridHeight = 25;
export const GridWidth = 25;
export const FruitAmount = 4;

export const SnakeGameCellStyles: CellStyles = {
    ".": {
        backgroundColor: "#444",
        outline: "1px solid #333",
    },
    "F": GetImageStyling("url(src/assets/snake/SnakeFruit.png)"),
    ...GenerateAssetsList(),
}

function GenerateAssetsList(): CellStyles {
    const colors: SnakeColors[] = ["GREEN", "BLUE"];
    const snakePieceTypes: SnakePieceType[] = ["HEAD", "STRAIGHT", "CURVE", "TAIL"];
    const directions: SnakeGameDirections[] = ["UP", "DOWN", "LEFT", "RIGHT"];
    let styles: CellStyles = {};

    // Create all combinations of assets
    for (const color of colors) {
        for (const pieceType of snakePieceTypes) {
            for (const direction of directions) {
                const capColor = color[0].toUpperCase() + color.slice(1).toLowerCase();
                const capPieceType = pieceType[0].toUpperCase() + pieceType.slice(1).toLowerCase();
                styles[`${pieceType[0]}${color[0]}${direction[0]}`] = GetImageStyling(`url(src/assets/snake/Snake${capColor}${capPieceType}.png)`, direction);
            }
        }
    }

    return styles;
}

function GetImageStyling(path: string, direction: SnakeGameDirections = "UP"): CSSProperties {
    let rotation = "rotate(0deg)";
    switch (direction) {
        case "RIGHT":
            rotation = "rotate(90deg)";
            break;
        case "DOWN":
            rotation = "rotate(180deg)";
            break;
        case "LEFT":
            rotation = "rotate(270deg)";
            break;
    }

    return {
        backgroundColor: "#444",
        backgroundImage: path,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        transform: rotation,
        outline: "1px solid #333",
    };
}

export function SetupGame(): SnakeGameData {
    const GridHeightMiddle = Math.floor(GridWidth / 2);
    const GridWidthMiddle = Math.floor(GridHeight / 2);

    // Setup grid
    const grid = SetupEmptyGrid();

    // Setup initial data
    const gameData: SnakeGameData = {
        score: 0,
        gameOver: false,
        queuedMoves: [],
        fruits: [],
        snakeBody: [
            { y: GridHeightMiddle + 2, x: GridWidthMiddle, color: "GREEN", direction: "UP" },
            { y: GridHeightMiddle + 1, x: GridWidthMiddle, color: "GREEN", direction: "UP" },
            { y: GridHeightMiddle, x: GridWidthMiddle, color: "GREEN", direction: "UP" },
        ],
        direction: "UP",
        grid
    }

    // Setup fruit
    for (let i = 0; i < FruitAmount; i++) {
        SetupNewFruitLocation(gameData);
    }
    InsertSnakeBodyPiecesIntoGrid(grid, gameData.snakeBody);

    return gameData;
}

export function MoveForward(gameData: SnakeGameData): SnakeGameData {
    let newDirection = gameData.queuedMoves.shift();
    if (newDirection) gameData.direction = newDirection;

    if (CheckForBorder(gameData)) {
        gameData.gameOver = true;
        return gameData;
    }

    if (CheckForSnake(gameData)) {
        gameData.gameOver = true;
        return gameData;
    }

    const hitFruit = CheckForFruit(gameData);
    if (hitFruit !== undefined) {
        gameData.score++;
        gameData.fruits = gameData.fruits.filter(v => v !== hitFruit);
        SetupNewFruitLocation(gameData);
        gameData.snakeBody.unshift(gameData.snakeBody[0]);
    }

    gameData.snakeBody.shift();
    const snakeHead = GetNewHeadPosition(gameData)
    gameData.snakeBody.push(snakeHead);

    ResetGrid(gameData.grid);
    InsertValuesIntoGrid(gameData.grid, gameData.fruits, "F");
    InsertSnakeBodyPiecesIntoGrid(gameData.grid, gameData.snakeBody);

    return gameData;
}

export function ChangeDirection(gameData: SnakeGameData, direction: SnakeGameDirections) {
    const { queuedMoves } = gameData;
    let actualDirection = queuedMoves[queuedMoves.length - 1];
    if (!actualDirection) actualDirection = gameData.direction;

    if (actualDirection === "UP" || actualDirection === "DOWN") {
        if (direction === "LEFT" || direction === "RIGHT") {
            queuedMoves.push(direction);
        }
    } else {
        if (direction === "UP" || direction === "DOWN") {
            queuedMoves.push(direction);
        }
    }
}

function CheckForBorder(gameData: SnakeGameData): boolean {
    const { direction, snakeBody } = gameData;
    const snakeHead = gameData.snakeBody[snakeBody.length-1];

    switch (direction) {
        case "UP":
            return snakeHead.y === 0;
        case "LEFT":
            return snakeHead.x === 0;
        case "DOWN":
            return snakeHead.y === GridHeight - 1;
        case "RIGHT":
            return snakeHead.x === GridWidth - 1;
    }
}

function CheckForSnake(gameData: SnakeGameData): boolean {
    const { direction, grid, snakeBody} = gameData;
    const snakeHead = gameData.snakeBody[snakeBody.length-1];
    let nextPosition: string;

    switch (direction) {
        case "UP":
            nextPosition = grid[snakeHead.y - 1][snakeHead.x];
            return nextPosition !== "." && nextPosition !== "F";
        case "LEFT":
            nextPosition = grid[snakeHead.y][snakeHead.x - 1];
            return nextPosition !== "." && nextPosition !== "F";
        case "DOWN":
            nextPosition = grid[snakeHead.y + 1][snakeHead.x];
            return nextPosition !== "." && nextPosition !== "F";
        case "RIGHT":
            nextPosition = grid[snakeHead.y][snakeHead.x + 1];
            return nextPosition !== "." && nextPosition !== "F";
    }
}

function CheckForFruit(gameData: SnakeGameData): GridCellLocation | undefined {
    const { direction, fruits, snakeBody } = gameData;
    const snakeHead = gameData.snakeBody[snakeBody.length-1];

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

function GetNewHeadPosition(gameData: SnakeGameData): SnakePieceCell {
    const { direction, snakeBody } = gameData;
    const snakeHead = gameData.snakeBody[snakeBody.length-1];

    switch (direction) {
        case "UP":
            return { x: snakeHead.x, y: snakeHead.y - 1, color: "GREEN", direction };
        case "LEFT":
            return { x: snakeHead.x - 1, y: snakeHead.y, color: "GREEN", direction };
        case "DOWN":
            return { x: snakeHead.x, y: snakeHead.y + 1, color: "GREEN", direction };
        case "RIGHT":
            return { x: snakeHead.x + 1, y: snakeHead.y, color: "GREEN", direction };
    }
}

function SetupNewFruitLocation(gameData: SnakeGameData) {
    const fruitLocation = FindNewFruitLocation(gameData);
    if (fruitLocation === undefined) return;
    gameData.fruits.push(fruitLocation);
    InsertValueIntoGrid(gameData.grid, fruitLocation, "F");
}

function FindNewFruitLocation(gameData: SnakeGameData): GridCellLocation | undefined {
    const viablePositions: GridCellData[] = gameData.grid
        .flatMap((row, y) =>
            row.map<GridCellData>((value, x) => ({x, y, value})))
        .filter(v => v.value === ".");
    if (viablePositions.length === 0) return undefined;
    return viablePositions[Math.floor(Math.random()*viablePositions.length)];
}

function SetupEmptyGrid(): GridData {
    const grid: GridData = [];
    for (let i = 0; i < GridWidth; i++) {
        let row: string[] = [];
        for (let j = 0; j < GridHeight; j++) {
            row.push(".");
        }
        grid.push(row);
    }
    return grid;
}

function ResetGrid(gameData: GridData) {
    for (let i = 0; i < GridHeight; i++) {
        for (let j = 0; j < GridWidth; j++) {
            gameData[i][j] = ".";
        }
    }
}

function GenerateTypeIndex(snakePiece: SnakePieceCell, pieceType: SnakePieceType): string {
    return `${pieceType[0]}${snakePiece.color[0]}${snakePiece.direction[0]}`;
}

function InsertSnakeBodyPiecesIntoGrid(gameGrid: GridData, snakeBody: SnakePieceCell[]) {
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

function InsertValuesIntoGrid(gameData: GridData, locations: GridCellLocation[], value: string) {
    for (const location of locations) {
        InsertValueIntoGrid(gameData, location, value);
    }
}

function InsertValueIntoGrid(gameData: GridData, location: GridCellLocation, value: string) {
    gameData[location.y][location.x] = value;
}
