import { GameStats } from "../../../types";

export const getWins = (guesses: GameStats['guesses']) => {
    // eslint-disable-next-line no-unused-vars
    const { fail, ...winGuesses } = guesses
    const sorted = Object.entries(guesses).sort((a, b) => b[1] - a[1])
    const [mostCommonKey, mostCommonValue] = sorted[0][0] === 'fail' ? sorted[1] : sorted[0]
    const data = {}
    for (const key in winGuesses) {
        const value = winGuesses[key]
        if ((key === mostCommonKey || value === winGuesses[mostCommonKey]) && mostCommonValue > 0) {
            data[key] = { value: value, proportion: 1 }
        } else {
            data[key] = { value: value, proportion: value / mostCommonValue }
        }
    }
    return data
}