import React, { createContext, FC } from 'react'
import { GameStats } from '../types'


export interface GameContextType {
    onButtonPress: (key: string) => void
    gameStats?: GameStats
    updateGameStats?: (stats: Partial<GameStats>) => void
}

export const GameContext = createContext<GameContextType | null>(null)

export const GameContextProvider: FC<{ value: GameContextType }> = ({ value, children }) => (
    <GameContext.Provider value={value}>
        {children}
    </GameContext.Provider>
)