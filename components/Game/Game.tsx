import React, { FC } from 'react';
import { Board } from '../Board/Board';
import { Header } from '../Header/Header';
import { Keyboard } from '../Keyboard/Keyboard';
import { Container } from './Game.style';


const ROWS = 6
const COLUMNS = 5

interface GameProps {
    
}

export const Game: FC<GameProps> = () => {
    return <Container>
        <Header />
        <Board rows={ROWS} columns={COLUMNS} />
        <Keyboard />
    </Container>
}