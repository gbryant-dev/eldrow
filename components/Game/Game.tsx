import React, { FC } from 'react';
import { Board } from '../Board/Board';
import { Header } from '../Header/Header';
import { Keyboard } from '../Keyboard/Keyboard';
import { Container } from './Game.style';

interface GameProps {
    
}

export const Game: FC<GameProps> = () => {
    return <Container>
        <Header />
        <Board />
        <Keyboard />
    </Container>
}