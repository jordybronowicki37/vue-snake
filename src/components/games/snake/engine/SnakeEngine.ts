import {SnakeGameData} from "./SnakeTypes";
import {ChangeDirection, MoveForward} from "./SnakeLogic";
import {GenerateLevel} from "../levels/SnakeLevelServer.ts";

export class SnakeEngine {
    private timerIds: (number | undefined)[] = []
    private timerSpeeds: number[] = [];
    public gamePaused: boolean = false;
    public gameData: SnakeGameData;

    constructor(level: string) {
        this.gameData = GenerateLevel(level);
        for (let i = 0; i < this.gameData.players.length; i++) {
            this.timerIds.push(undefined);
            this.timerSpeeds.push(this.gameData.players[i].speed);
        }
    }

    public StartEngine() {
        document.addEventListener("keydown", this.HandleUserInteractions.bind(this));
        this.SetupTimers();
    }

    public PauseEngine() {
        if (this.gamePaused) return;
        if (this.gameData.gameOver) return;
        this.gamePaused = true;
        this.ClearTimers();
    }

    public ContinueEngine() {
        if (!this.gamePaused) return;
        if (this.gameData.gameOver) return;
        this.gamePaused = false;
        this.SetupTimers();
    }

    public StopEngine(){
        document.removeEventListener("keydown", this.HandleUserInteractions.bind(this));
        this.ClearTimers()
    }

    private SetupTimers() {
        for (let i = 0; i < this.timerIds.length; i++) {
            this.SetupTimer(i);
        }
    }

    private SetupTimer(playerId: number) {
        this.ClearTimer(playerId);
        this.timerIds[playerId] = setInterval(this.NextTimeStep.bind(this, playerId), this.gameData.players[playerId].speed);
    }

    private ClearTimer(playerId: number) {
        const timerId = this.timerIds[playerId];
        if (typeof timerId !== "number") return;
        clearInterval(timerId);
    }

    private ClearTimers() {
        for (let i = 0; i < this.timerIds.length; i++) {
            const timerId = this.timerIds[i];
            if (typeof timerId !== "number") continue;
            clearInterval(timerId);
            this.timerIds[i] = undefined;
        }
    }

    private NextTimeStep(playerId: number) {
        MoveForward(this.gameData, playerId)
        if (this.gameData.gameOver) {
            this.ClearTimer(playerId);
        }
        const player = this.gameData.players[playerId];
        if (this.timerSpeeds[playerId] !== player.speed) {
            this.timerSpeeds[playerId] = player.speed;
            this.ClearTimer(playerId)
            this.SetupTimer(playerId);
        }
    }

    private StartNewGame() {
        this.gamePaused = false;
        this.ClearTimers();
        this.gameData = GenerateLevel(this.gameData.options.level);
        for (let i = 0; i < this.gameData.players.length; i++) {
            this.timerSpeeds[i] = this.gameData.players[i].speed;
        }
        this.SetupTimers();
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
