import styled from 'styled-components'


export const Footer = styled.div`
    display: flex;
    width: 100%;
`

export const Countdown = styled.div`
    border-right: 1px solid var(--color-tone-1);
    width: 50%;
    padding-right: 12px;
`

export const Share = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 12px;
`
export const ShareButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    background-color: var(--key-bg-correct);
    color: var(--tile-text-color);
    text-transform: uppercase;
    width: 80%;
    height: 52px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
`

export const Title = styled.div`
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    text-align: center;
    width: 100%;
    margin-bottom: 10px;
`

export const Timer = styled.div`
    font-size: 24px;
    text-align: center;
`