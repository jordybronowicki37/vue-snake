import {CellStyles, GridCellData, GridCellLocation, GridData} from "../../grid/GridTypes.ts";
import {SnakeGameData, SnakeGameDirections} from "./SnakeGameTypes.ts";

export const GridHeight = 25;
export const GridWidth = 25;

export const SnakeGameCellStyles: CellStyles = {
    ".": "#444",
    "S": "green",
    "H": "blue",
    "F": "red",
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
        fruits: [],
        snakeHead: { y: GridHeightMiddle, x: GridWidthMiddle },
        snakeBody: [ {y: GridHeightMiddle + 1, x: GridWidthMiddle} ],
        direction: "UP",
        grid
    }

    // Setup fruit
    SetupNewFruitLocation(gameData);
    InsertValuesIntoGrid(grid, gameData.snakeBody, "S");
    InsertValueIntoGrid(grid, gameData.snakeHead, "H");

    return gameData;
}

export function MoveForward(gameData: SnakeGameData): SnakeGameData {
    if (CheckForBorder(gameData)) {
        gameData.gameOver = true;
        return gameData;
    }

    if (CheckForSnake(gameData)) {
        gameData.gameOver = true;
        return gameData;
    }

    if (CheckForFruit(gameData)) {
        gameData.score++;
        gameData.fruits.pop();
        SetupNewFruitLocation(gameData);
        gameData.snakeBody.unshift(gameData.snakeBody[0]);
    }

    gameData.snakeBody.shift();
    gameData.snakeBody.push(gameData.snakeHead);
    gameData.snakeHead = GetNewHeadPosition(gameData);

    ResetGrid(gameData.grid);
    InsertValuesIntoGrid(gameData.grid, gameData.fruits, "F");
    InsertValuesIntoGrid(gameData.grid, gameData.snakeBody, "S");
    InsertValueIntoGrid(gameData.grid, gameData.snakeHead, "H");

    return gameData;
}

export function ChangeDirection(gameData: SnakeGameData, direction: SnakeGameDirections): SnakeGameData {
    if (gameData.direction === "UP" || gameData.direction === "DOWN") {
        if (direction === "LEFT" || direction === "RIGHT") {
            gameData.direction = direction;
        }
    } else {
        if (direction === "UP" || direction === "DOWN") {
            gameData.direction = direction;
        }
    }
    return gameData;
}

function CheckForBorder(gameData: SnakeGameData): boolean {
    const { direction, snakeHead } = gameData;

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
    const { direction, grid, snakeHead} = gameData;

    switch (direction) {
        case "UP":
            return grid[snakeHead.y - 1][snakeHead.x] === "S";
        case "LEFT":
            return grid[snakeHead.y][snakeHead.x - 1] === "S";
        case "DOWN":
            return grid[snakeHead.y + 1][snakeHead.x] === "S";
        case "RIGHT":
            return grid[snakeHead.y][snakeHead.x + 1] === "S";
    }
}

function CheckForFruit(gameData: SnakeGameData): boolean {
    const { direction, fruits, snakeHead } = gameData;

    switch (direction) {
        case "UP":
            return fruits.some((fruit) => snakeHead.x === fruit.x && snakeHead.y === fruit.y + 1);
        case "LEFT":
            return fruits.some((fruit) => snakeHead.x === fruit.x + 1 && snakeHead.y === fruit.y);
        case "DOWN":
            return fruits.some((fruit) => snakeHead.x === fruit.x && snakeHead.y === fruit.y - 1);
        case "RIGHT":
            return fruits.some((fruit) => snakeHead.x === fruit.x - 1 && snakeHead.y === fruit.y);
    }
}

function GetNewHeadPosition(gameData: SnakeGameData): GridCellLocation {
    const { direction, snakeHead } = gameData;

    switch (direction) {
        case "UP":
            return { x: snakeHead.x, y: snakeHead.y - 1 };
        case "LEFT":
            return { x: snakeHead.x - 1, y: snakeHead.y };
        case "DOWN":
            return { x: snakeHead.x, y: snakeHead.y + 1 };
        case "RIGHT":
            return { x: snakeHead.x + 1, y: snakeHead.y };
    }
}

function SetupNewFruitLocation(gameData: SnakeGameData) {
    const fruitLocation = FindNewFruitLocation(gameData);
    gameData.fruits.push(fruitLocation);
    InsertValueIntoGrid(gameData.grid, fruitLocation, "F");
}

function FindNewFruitLocation(gameData: SnakeGameData): GridCellLocation {
    const viablePositions: GridCellData[] = gameData.grid
        .flatMap((row, y) =>
            row.map<GridCellData>((value, x) => ({x, y, value})))
        .filter(v => v.value === ".");

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

function InsertValuesIntoGrid(gameData: GridData, locations: GridCellLocation[], value: string) {
    for (const location of locations) {
        InsertValueIntoGrid(gameData, location, value);
    }
}

function InsertValueIntoGrid(gameData: GridData, location: GridCellLocation, value: string) {
    gameData[location.y][location.x] = value;
}
