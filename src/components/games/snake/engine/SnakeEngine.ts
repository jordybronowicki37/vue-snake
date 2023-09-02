import {SnakeGameData} from "./SnakeTypes";
import {ChangeDirection, MoveForward} from "./SnakeLogic";
import {SetupSnakeLevel1} from "../levels/SnakeLevel1";

export class SnakeEngine {
    private timerId: number | undefined;
    private score: number = 0;
    public gamePaused: boolean = false;
    public snakeGameData: SnakeGameData;

    constructor(snakeGameData: SnakeGameData) {
        this.snakeGameData = snakeGameData;
    }

    public StartEngine() {
        document.addEventListener("keydown", this.HandleUserInteractions.bind(this));
        this.SetupTimer();
    }

    public PauseEngine() {
        if (this.gamePaused) return;
        if (this.snakeGameData.gameOver) return;
        this.gamePaused = true;
        this.ClearTimer();
    }

    public ContinueEngine() {
        if (!this.gamePaused) return;
        if (this.snakeGameData.gameOver) return;
        this.gamePaused = false;
        this.SetupTimer();
    }

    public StopEngine(){
        document.removeEventListener("keydown", this.HandleUserInteractions.bind(this));
        this.ClearTimer()
    }

    private SetupTimer() {
        if(this.timerId) this.ClearTimer();
        this.timerId = setInterval(this.NextTimeStep.bind(this), 350 * Math.pow(0.98, this.score));
    }

    private ClearTimer() {
        clearInterval(this.timerId);
    }

    private NextTimeStep() {
        MoveForward(this.snakeGameData)
        if (this.snakeGameData.gameOver) {
            this.ClearTimer();
        }
        const totalScore = this.snakeGameData.players.map(v => v.score).reduce((a, b) => a + b, 0);
        if (this.score !== totalScore) {
            this.score = totalScore;
            this.ClearTimer()
            this.SetupTimer();
        }
    }

    private StartNewGame() {
        clearInterval(this.timerId);
        this.snakeGameData = SetupSnakeLevel1();
        this.score = 0;
        this.SetupTimer();
    }

    private HandleUserInteractions(e: KeyboardEvent) {
        switch (e.key) {
            case "Backspace":
                if (this.gamePaused) this.ContinueEngine();
                else this.PauseEngine();
                break;
            case "Enter":
                this.StartNewGame();
                break;
            case "w":
                ChangeDirection(this.snakeGameData, 'UP', 0)
                break;
            case "a":
                ChangeDirection(this.snakeGameData, 'LEFT', 0)
                break;
            case "s":
                ChangeDirection(this.snakeGameData, 'DOWN', 0)
                break;
            case "d":
                ChangeDirection(this.snakeGameData, 'RIGHT', 0)
                break;
        }
        if (this.snakeGameData.players.length === 1) return;
        switch (e.key) {
            case "ArrowUp":
                ChangeDirection(this.snakeGameData, 'UP', 1)
                break;
            case "ArrowLeft":
                ChangeDirection(this.snakeGameData, 'LEFT', 1)
                break;
            case "ArrowDown":
                ChangeDirection(this.snakeGameData, 'DOWN', 1)
                break;
            case "ArrowRight":
                ChangeDirection(this.snakeGameData, 'RIGHT', 1)
                break;
        }
    }
}
