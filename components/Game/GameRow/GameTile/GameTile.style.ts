import styled, { keyframes, css } from 'styled-components'
import { CellState } from '../../../../types'


const getColorForState = (state: CellState) => {
    switch(state) {
        case CellState.TBD:
            return css`
                border: 2px solid var(--color-tone-3);
            `
        case CellState.ABSENT:
            return css`
                background-color: var(--key-bg-absent);
                color: var(--tile-text-color);
                border: 2px solid var(--color-tone-4);
            ` 
        case CellState.PRESENT:
            return css`
                background-color: var(--key-bg-present);
                color: var(--tile-text-color);
                border: 2px solid var(--color-tone-4);
            ` 
        case CellState.CORRECT:
            return css`
                background-color: var(--key-bg-correct);
                color: var(--tile-text-color);
                border: 2px solid var(--color-tone-4);
            ` 
        default:
            return css`
                
            `
    }

}

const flipIn = keyframes`
    0% {
        transform: rotateX(0);
    }

    50% {
        transform: rotateX(-90deg);
    }
    
    100% {
        transform: rotateX(0);
    }
`

const animateFlip = css<{ $state: CellState, $order: number }>`
    animation-name: ${flipIn};
    animation-duration: 500ms;
    animation-timing-function: ease-in;
    animation-delay: ${props => props.$order * 150}ms;
`

const popIn = keyframes`
   0% {
       transform: scale(0.8);
   }

   50% {
       transform: scale(1.1);
   }

`;

const animatePopIn = css<{ $state: CellState, $order: number }>`
    animation-name: ${popIn};
    animation-duration: 100ms;
`

export const StyledTile = styled.div<{ $state: CellState, $order: number }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border: 2px solid var(--color-tone-4);
    font-weight: bold;
    font-size: 2rem;
    text-transform: uppercase;
    ${props => props.$state > 1 && animateFlip };
    ${props => props.$state === 1 && animatePopIn };
    ${props => getColorForState(props.$state)};
    
`

