import { BoardState, CellState } from "../../types"
import words from "../../words"


export const ROWS = 6
export const COLUMNS = 5


export const setupGame = (currentState: BoardState) => {
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
    return { data: gridData }
}

export const getWinKeyword = (row: number) => {
    const keywords = ["Genius", "Magnificent", "Impressive", "Splendid", "Great", "Phew"]
    return keywords[row]   
}

export const getInitialBoardState = () => {
    const guesses = Array.from({ length: COLUMNS }).map(_ => null)
    const evaluations = Array.from({ length: ROWS }).map(_ => Array.from({ length: COLUMNS }).map(_ => CellState.EMPTY))

    return { guesses, evaluations }
}

export const getWordForTheDay = () => {
    return words[Math.floor(Math.random() * words.length)]
}