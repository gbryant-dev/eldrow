import React, { FC, useCallback } from 'react'
import { KeyboardButton } from './KeyboardButton/KeyboardButton'
import { Container, Spacer } from './KeyboardRow.style'

interface Props {
    items: { key: string, value: string }[];
    index: number;
}

export const KeyboardRow: FC<Props> = ({ items, index }) => {


    const onButtonPress = useCallback((key: string, value: string) => {
        console.log(key, value)
    }, [])

    return <Container>
        {index === 1 && <Spacer />}
        {items.map(({ key, value }) => <KeyboardButton onClick={() => onButtonPress(key, value)} key={key} value={value} />)}
        {index === 1 && <Spacer />}
    </Container>
}