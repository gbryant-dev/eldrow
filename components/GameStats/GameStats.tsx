import React, { FC } from 'react'
import { GameStats } from '../../types'
import { Container, Title } from './GameStats.style'
import GameStatsFooter from './GameStatsFooter/GameStatsFooter'
import GuessDistribution from './GuessDistribution/GuessDistribution'
import Statistics from './Statistics/Statistics'

const GameStats: FC<{currentRow: number, gameStats: GameStats }> = ({ currentRow, gameStats }) => {

    if (!gameStats) return null

    return (
        <Container>
            <Title>Statistics</Title>
            <Statistics 
              gamesPlayed={gameStats.gamesPlayed} 
              winPercentage={gameStats.winPercentage}  
              currentStreak={gameStats.currentStreak}
              maxStreak={gameStats.maxStreak}  
            />
            <Title>Guess Distribution</Title>
            <GuessDistribution 
              guesses={gameStats.guesses}
              currentRow={currentRow}
            />
            <GameStatsFooter />
        </Container>
    )
    
}

export default GameStats