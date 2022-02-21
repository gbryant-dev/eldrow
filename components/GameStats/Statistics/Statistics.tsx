import React, { FC } from 'react'
import { GameStats } from '../../../types'
import Statistic from './Statistic/Statistic'
import { Container } from './Statistics.style'

type Props = Partial<GameStats>

const Statistics: FC<Props> = ({ gamesPlayed, winPercentage, currentStreak, winStreak }) => {

    return (
        <Container>
            <Statistic label='Played' value={gamesPlayed}></Statistic>
            <Statistic label='Win %' value={winPercentage}></Statistic>
            <Statistic label='Current Streak' value={currentStreak}></Statistic>
            <Statistic label='Win Streak' value={winStreak}></Statistic>
        </Container>
    )
}

export default Statistics