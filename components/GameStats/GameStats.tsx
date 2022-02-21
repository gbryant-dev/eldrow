import React, { FC, useEffect } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import { GameStats } from '../../types'
import { Container, Title } from './GameStats.style'
import GuessDistribution from './GuessDistribution/GuessDistribution'
import Statistics from './Statistics/Statistics'


interface Props {

}

const initialGameStats: GameStats = {
    currentStreak: 0,
    gamesPlayed: 0,
    gamesWon: 0,
    guesses: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, fail: 0 },
    winPercentage: 0,
    winStreak: 0
}

const GameStats: FC<Props> = () => {
    const [gameStats, setGameStats] = useLocalStorage<GameStats>('statistics', null)

    useEffect(() => {
        setGameStats(initialGameStats)
    }, [setGameStats])

    if (!gameStats) return null

    return (
        <Container>
            <Title>Statistics</Title>
            <Statistics 
              gamesPlayed={gameStats.gamesPlayed} 
              winPercentage={gameStats.winPercentage}  
              currentStreak={gameStats.currentStreak}
              winStreak={gameStats.winStreak}  
            />
            <Title>Guess Distribution</Title>
            <GuessDistribution guesses={gameStats.guesses} />
        </Container>
    )
    
}

export default GameStats