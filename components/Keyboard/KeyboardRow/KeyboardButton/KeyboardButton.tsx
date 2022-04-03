import React, { ButtonHTMLAttributes, FC } from 'react'
import { CellState } from '../../../../types'
import { StyledButton } from './KeyboardButton.style'


interface Props {
    value: string;
    icon?: JSX.Element;
    state: CellState;
    // eslint-disable-next-line no-unused-vars
    onKey: (key: string) => void;
    sizeScale?: number;
}

export const KeyboardButton: FC<ButtonHTMLAttributes<HTMLButtonElement> & Props> = ({ value, icon, state, onKey, sizeScale }) => {

    return <StyledButton $scale={sizeScale} $state={state} onClick={() => onKey(value)}>{icon ? icon : value}</StyledButton>
}