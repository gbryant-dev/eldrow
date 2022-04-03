import styled, { css } from 'styled-components'
import { CellState } from '../../../../types'

const getColorForState = (state: CellState) => {
    switch (state) {
        case CellState.ABSENT:
            return css`
                background-color: var(--key-bg-absent);
                color: var(--tile-text-color);
            `
        case CellState.PRESENT:
            return css`
                background-color: var(--key-bg-present);
                color: var(--tile-text-color);
            `
        case CellState.CORRECT:
            return css`
                background-color: var(--key-bg-correct);
                color: var(--tile-text-color);
            `
        default:
            return css`
                background-color: var(--key-bg);
                color: var(--key-text-color);
        `
    }
}

export const StyledButton = styled.button<{ $state: CellState, $scale?: number }>`
    display: flex;
    flex: ${props => 1 * props.$scale};
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    border: 0;
    border-radius: 4px;
    margin-right: 6px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    height: 58px;
    ${p => getColorForState(p.$state)}
`

StyledButton.defaultProps = {
    $scale: 1
}