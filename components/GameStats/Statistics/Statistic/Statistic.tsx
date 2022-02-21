import React, { FC } from 'react'
import { Container, Label, Stat } from './Statistic.style'

interface Props {
    label: string;
    value: number;
    
}

const Statistic: FC<Props> = ({ value, label }) => {

    return (
        <Container>
            <Stat>{value}</Stat>
            <Label>{label}</Label>
        </Container>
    )
}

export default Statistic