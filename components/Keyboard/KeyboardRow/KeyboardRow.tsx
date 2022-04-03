import React, { FC } from 'react'
import { CellState } from '../../../types'
import { KeyboardButton } from './KeyboardButton/KeyboardButton'
import { Container, Spacer } from './KeyboardRow.style'
import { MdOutlineBackspace } from 'react-icons/md'

interface Props {
    index: number;
    letters: string;
    states: { [k: string]: CellState };
    // eslint-disable-next-line no-unused-vars
    onKey: (key: string) => void;
}

export const KeyboardRow: FC<Props> = ({ index, letters, states, onKey }) => {

    return <Container>
        {index === 1 && <Spacer />}
        {index === 2 && <KeyboardButton sizeScale={1.5} key="enter" value="enter" state={CellState.EMPTY} onKey={onKey} />}
        {letters.split('').map(letter => <KeyboardButton key={letter} value={letter} state={states[letter]} onKey={onKey} />)}
        {index === 2 && <KeyboardButton sizeScale={1.5} key="backspace" value="backspace" icon={<MdOutlineBackspace fontSize={24} />} state={CellState.EMPTY} onKey={onKey} /> }
        {index === 1 && <Spacer />}
    </Container>
}