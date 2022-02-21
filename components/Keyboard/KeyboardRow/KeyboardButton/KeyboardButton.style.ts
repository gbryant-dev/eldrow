import styled from 'styled-components'


export const StyledButton = styled.button`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    border: 0;
    border-radius: 4px;
    margin: 2px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    background-color: var(--key-bg);
    color: var(--key-text-color)
`