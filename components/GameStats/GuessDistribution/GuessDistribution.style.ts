import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
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

export const GraphLine = styled.div<{ $width?: number, $colored: boolean }>`
    display: flex;
    background-color: ${p => p.$colored ? 'var(--color-correct)' : 'var(--color-absent)'};
    width: ${p => Math.max(p.$width, 4)}%; 
    height: 100%;
    margin-left: 4px;
    padding-right: 8px;
    justify-content: flex-end;
    text-align: center;
`;