import React, { createContext, FC } from 'react'
import { GameStats } from '../types'


export interface GameContextType {
    // eslint-disable-next-line no-unused-vars
    onButtonPress: (key: string) => void
    gameStats?: GameStats
    // eslint-disable-next-line no-unused-vars
    updateGameStats?: (win: boolean) => void
}

export const GameContext = createContext<GameContextType | null>(null)

export const GameContextProvider: FC<{ value: GameContextType }> = ({ value, children }) => (
    <GameContext.Provider value={value}>
        {children}
    </GameContext.Provider>
)