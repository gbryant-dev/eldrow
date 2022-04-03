import React, { FC } from "react";
import { KeyboardRow } from "./KeyboardRow/KeyboardRow";
import { Container } from "./Keyboard.style";
import { CellState } from "../../types";


interface Props {
    states: { [k: string]: CellState };
    // eslint-disable-next-line no-unused-vars
    onKey: (key: string) => void;
}

export const Keyboard: FC<Props> = ({ states, onKey }) => {

    return <Container>
        <KeyboardRow index={0} onKey={onKey} letters="qwertyuiop" states={states} />
        <KeyboardRow index={1} onKey={onKey} letters="asdfghjkl" states={states} />
        <KeyboardRow index={2} onKey={onKey} letters="zxcvbnm" states={states} /> 
    </Container>
}