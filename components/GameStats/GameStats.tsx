import React, { FC, useContext } from 'react'
import { GameContext } from '../../GameContext/GameContext'
import { GameStats } from '../../types'
import { Container, Title } from './GameStats.style'
import GuessDistribution from './GuessDistribution/GuessDistribution'
import Statistics from './Statistics/Statistics'

const GameStats: FC = () => {
    const { gameStats } = useContext(GameContext)

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
              gamesPlayed={gameStats.gamesPlayed} 
            />
        </Container>
    )
    
}

export default GameStats