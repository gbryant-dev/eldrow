import React, { FC } from 'react'
import { Button, Container, Spacer } from './KeyboardRow.style'

interface Props {
    items: { key: string, value: string }[];
    index: number;
}

export const KeyboardRow: FC<Props> = ({ items, index }) => {
    return <Container>
        {index === 1 && <Spacer />}
        {items.map(({ key, value }) => <Button key={key}>{value}</Button>)}
        {index === 1 && <Spacer />}
    </Container>
}