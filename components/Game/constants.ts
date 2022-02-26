import { GameStats } from "../../types"

export const ROWS = 6
export const COLUMNS = 5

export const INITIAL_GAME_STATS: GameStats = {
    currentStreak: 0,
    gamesPlayed: 0,
    gamesWon: 0,
    guesses: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, fail: 0 },
    winPercentage: 0,
    maxStreak: 0
}