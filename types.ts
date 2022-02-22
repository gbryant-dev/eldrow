/* eslint-disable no-unused-vars */


export enum CellState {
    EMPTY,
    TBD,
    ABSENT,
    PRESENT,
    CORRECT
}

export type CellStateStrings = Lowercase<keyof typeof CellState>

export interface Cell {
    index: number;
    row: number;
    column: number;
    value: string;
    state: CellState;
}

export type BoardType = Cell[][]

export enum GameStatus {
    STARTED = "STARTED",
    IN_PROGESS = "IN_PROGRESS",
    WIN = "WIN",
    FAIL = "FAIL"
}

export interface BoardState {
    guesses: string[],
    evaluations: CellState[][]
}

export interface GameStats {
    gamesPlayed: number,
    winStreak: number,
    currentStreak: number,
    gamesWon: number,
    winPercentage: number,
    guesses: { fail: number, [key: number]: number }
}