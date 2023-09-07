import {SnakeGameData} from "./SnakeTypes";
import {ChangeDirection, MoveForward} from "./SnakeLogic";
import {GenerateLevel} from "../levels/SnakeLevelServer.ts";

export class SnakeEngine {
    private timerId: number | undefined;
    private score: number = 0;
    public gamePaused: boolean = false;
    public gameData: SnakeGameData;

    constructor(level: string) {
        this.gameData = GenerateLevel(level);
    }

    public StartEngine() {
        document.addEventListener("keydown", this.HandleUserInteractions.bind(this));
        this.SetupTimer();
    }

    public PauseEngine() {
        if (this.gamePaused) return;
        if (this.gameData.gameOver) return;
        this.gamePaused = true;
        this.ClearTimer();
    }

    public ContinueEngine() {
        if (!this.gamePaused) return;
        if (this.gameData.gameOver) return;
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
        MoveForward(this.gameData)
        if (this.gameData.gameOver) {
            this.ClearTimer();
        }
        const totalScore = this.gameData.players.map(v => v.score).reduce((a, b) => a + b, 0);
        if (this.score !== totalScore) {
            this.score = totalScore;
            this.ClearTimer()
            this.SetupTimer();
        }
    }

    private StartNewGame() {
        clearInterval(this.timerId);
        this.gameData = GenerateLevel(this.gameData.options.level);
        this.score = 0;
        this.SetupTimer();
    }

    private HandleUserInteractions(e: KeyboardEvent) {
        const secondaryControlToPlayer = this.gameData.players.length-1;
        switch (e.key) {
            case "Backspace":
                if (this.gamePaused) this.ContinueEngine();
                else this.PauseEngine();
                break;
            case "Enter":
                this.StartNewGame();
                break;
            case "w":
                ChangeDirection(this.gameData, 'UP')
                break;
            case "a":
                ChangeDirection(this.gameData, 'LEFT')
                break;
            case "s":
                ChangeDirection(this.gameData, 'DOWN')
                break;
            case "d":
                ChangeDirection(this.gameData, 'RIGHT')
                break;
            case "ArrowUp":
                ChangeDirection(this.gameData, 'UP', secondaryControlToPlayer)
                break;
            case "ArrowLeft":
                ChangeDirection(this.gameData, 'LEFT', secondaryControlToPlayer)
                break;
            case "ArrowDown":
                ChangeDirection(this.gameData, 'DOWN', secondaryControlToPlayer)
                break;
            case "ArrowRight":
                ChangeDirection(this.gameData, 'RIGHT', secondaryControlToPlayer)
                break;
        }
    }
}
