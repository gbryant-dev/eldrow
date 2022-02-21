import React, { ButtonHTMLAttributes, FC, useContext, useEffect, useState } from 'react'
import { GameContext } from '../../../../GameContext/GameContext'
import { StyledButton } from './KeyboardButton.style'


interface Props {
    value: string
}

export const KeyboardButton: FC<ButtonHTMLAttributes<HTMLButtonElement> & Props> = ({ value }) => {
    const { onButtonPress } = useContext(GameContext)

    return <StyledButton onClick={() => onButtonPress(value)}>{value}</StyledButton>
}