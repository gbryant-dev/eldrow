import styled from 'styled-components'

export const StyledToast = styled.div<{ $fade: boolean }>`
    padding: 20px 16px;
    background-color: var(--color-tone-1);
    color: var(--color-tone-7);
    margin-bottom: 16px;
    border-radius: 4px;
    font-weight: bold;
    pointer-events: none;
    text-align: center;
    font-size: 20px;
    opacity: ${p => p.$fade ? 1 : 0};
    transition: opacity 1s ease-out;
`;