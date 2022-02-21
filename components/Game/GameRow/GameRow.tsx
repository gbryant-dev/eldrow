import React, { FC } from 'react'
import { Cell } from '../../../types'
import { Container } from './GameRow.style'
import GameTile from './GameTile/GameTile'

interface Props {
    row: Cell[];
    i: number;
    word?: string;
}

export const GameRow: FC<Props> = ({ row }) => {
    return <Container>
        {row.map((cell, i) => <GameTile key={i} cell={cell} />)}
    </Container>
}