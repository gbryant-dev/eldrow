import { GameStats } from "../../../types";

// *TODO* fix width when fail is the most common 
export const getWins = (guesses: GameStats['guesses']) => {
    // eslint-disable-next-line no-unused-vars
    const { fail, ...winGuesses } = guesses
    const mostCommonKey = Object.keys(guesses).reduce((prev, curr) => guesses[curr] > guesses[prev] ? curr : prev)
    const data = {}
    for (const key in winGuesses) {
        const value = winGuesses[key]
        if (key === mostCommonKey || value === winGuesses[mostCommonKey]) {
            data[key] = { value: value, proportion: 1 }
        } else {
            data[key] = { value: value, proportion: value / winGuesses[mostCommonKey] }
        }
    }
    return data
}