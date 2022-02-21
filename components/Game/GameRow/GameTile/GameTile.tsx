import React, { FC } from 'react';
import { Cell } from '../../../../types';
import { StyledTile } from './GameTile.style';

interface Props {
    cell: Cell
}

const GameTile: FC<Props> = ({ cell }) => {

    return (
        <StyledTile
            $state={cell.state}
            $order={cell.column + 1}
        >
            {cell.value}
        </StyledTile>
    )
}

export default GameTile