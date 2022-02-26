import styled from 'styled-components'

export const Container = styled.div`
    width: 80%;
    padding-bottom: 10px;
`;

export const GraphContainer = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 4px;
    height: 20px;
`;

export const GuessLabel = styled.div`
    font-weight: bold;
    color: var(--tile-text-color);
`;

export const GraphLine = styled.div<{ $width?: number }>`
    display: flex;
    background-color: var(--color-correct);
    width: ${p => p.$width ?? 7}%; 
    height: 100%;
    margin-left: 4px;
    padding-right: 8px;
    justify-content: flex-end;
`;