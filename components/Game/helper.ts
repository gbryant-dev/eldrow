import { BoardState, CellState } from "../../types"
import words from "../../words"
import { COLUMNS, ROWS, START_DATE } from "./constants"

export const setupGame = (currentState?: BoardState) => {
    const boardState = currentState ?? getInitialBoardState()
    
    const gridData = Array.from({ length: ROWS })
        .map((_, i) => Array.from({ length: COLUMNS })
            .map((_, j) => ({
                index: i * COLUMNS + j,
                row: i,
                column: j,
                value: boardState.guesses[i] && boardState.guesses[i][j],
                state: boardState.evaluations[i][j]
            })
            )
        )
    return gridData
}

export const getWinKeyword = (row: number) => {
    const keywords = ["Genius", "Magnificent", "Impressive", "Splendid", "Great", "Phew"]
    return keywords[row]   
}

export const getInitialBoardState = () => {
    const guesses = Array.from({ length: COLUMNS }).map(() => null)
    const evaluations = Array.from({ length: ROWS }).map(() => Array.from({ length: COLUMNS }).map(() => CellState.EMPTY))

    return { guesses, evaluations }
}

export const getWordIndex = (ts?: number): number => {
    const start = new Date(START_DATE)
    const dateTs = ts ?? new Date().getTime()
    const offset = new Date(dateTs).setHours(0, 0, 0, 0) - start.setHours(0, 0, 0, 0)
    return Math.round(offset / 864e5) % words.length
}

export const getWordForTheDay = () => {
    const index = getWordIndex()
    return words[index]
}

export const isNewDay = (lastPlayedTs: number): boolean => {
    const lastPlayedIndex = getWordIndex(lastPlayedTs)
    const currentIndex = getWordIndex()
    return lastPlayedIndex !== currentIndex
}

export const hasPlayedInLast24Hours = (lastCompletedTs: number): boolean => {
    const lastCompletedDate = new Date(lastCompletedTs)
    const nowDate = new Date()
    nowDate.setDate(nowDate.getDate() - 1) 
    return lastCompletedDate.getTime() > nowDate.getTime()
}