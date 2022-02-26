import React, { FC } from 'react'
import { GameStats } from '../../../types'
import Statistic from './Statistic/Statistic'
import { Container } from './Statistics.style'

type Props = Partial<GameStats>

const Statistics: FC<Props> = ({ gamesPlayed, winPercentage, currentStreak, maxStreak }) => {

    return (
        <Container>
            <Statistic label='Played' value={gamesPlayed}></Statistic>
            <Statistic label='Win %' value={winPercentage}></Statistic>
            <Statistic label='Current Streak' value={currentStreak}></Statistic>
            <Statistic label='Max Streak' value={maxStreak}></Statistic>
        </Container>
    )
}

export default Statistics