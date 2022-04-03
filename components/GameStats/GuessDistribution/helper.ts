import { GameStats } from "../../../types";

export const getWins = (guesses: GameStats['guesses']) => {
    // eslint-disable-next-line no-unused-vars
    const { fail, ...winGuesses } = guesses
    const mostCommonKey = Object.keys(winGuesses).reduce((prev, curr) => winGuesses[curr] > winGuesses[prev] ? curr : prev)
    const data = { [mostCommonKey]: { value: winGuesses[mostCommonKey], proportion: 1 }}
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