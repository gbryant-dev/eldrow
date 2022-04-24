import React, { FC } from 'react'
import { BoardState, GameStats, GameStatus } from '../../types'
import { Container, Title } from './GameStats.style'
import GameStatsFooter from './GameStatsFooter/GameStatsFooter'
import GuessDistribution from './GuessDistribution/GuessDistribution'
import Statistics from './Statistics/Statistics'

interface Props {
  currentRow: number;
  gameStats: GameStats;
  boardState: BoardState;
  gameStatus: GameStatus;
}

const GameStats: FC<Props> = ({ currentRow, gameStats, boardState, gameStatus }) => {

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
            <GuessDistribution currentRow={currentRow} guesses={gameStats.guesses} />
            {gameStatus !== GameStatus.IN_PROGRESS && <GameStatsFooter currentRow={currentRow} cellEvaluations={boardState.evaluations} />}
        </Container>
    )
    
}

export default GameStats