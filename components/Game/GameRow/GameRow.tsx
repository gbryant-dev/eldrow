import React, { FC } from 'react'
import { Container } from './GameRow.style'
import { GameTile } from './GameTile/GameTile'

interface Props {
    columns: number;
}

export const GameRow: FC<Props> = ({ columns }) => {
    return <Container>
        {Array.from({ length: columns }).map((_, c) => <GameTile key={c} />)}
    </Container>
}