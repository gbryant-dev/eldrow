import React, { FC } from "react";
import { KeyboardRow } from "./KeyboardRow/KeyboardRow";
import { Container } from "./Keyboard.style";


const KEYBOARD_ROWS = [
    [{ key: 'q', value: 'q' }, { key: 'w', value: 'w' }, { key: 'e', value: 'e' }, { key: 'r', value: 'r' }, { key: 't', value: 't' }, { key: 'y', value: 'y' }, { key: 'u', value: 'u' }, { key: 'i', value: 'i' }, { key: 'o', value: 'o' }, { key: 'p', value: 'p' }],
    [{ key: 'a', value: 'a' }, { key: 's', value: 's' }, { key: 'd', value: 'd' }, { key: 'f', value: 'f' }, { key: 'g', value: 'g' }, { key: 'h', value: 'h' }, { key: 'j', value: 'j' }, { key: 'k', value: 'k' }, { key: 'l', value: 'l' }],
    [{ key: 'enter', value: 'enter' }, { key: 'z', value: 'z' }, { key: 'x', value: 'x' }, { key: 'c', value: 'c' }, { key: 'v', value: 'v' }, { key: 'b', value: 'b' }, { key: 'n', value: 'n' }, { key: 'm', value: 'm' }, { key: 'backspace', value: 'backspace' }]
]


interface Props {

}

export const Keyboard: FC<Props> = ({ }) => {
    return <Container>
        {KEYBOARD_ROWS.map((row, i) => <KeyboardRow key={i} items={row} index={i} />)}
    </Container>
}