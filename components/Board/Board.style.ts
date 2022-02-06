import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
`


export const Grid = styled.div`
    display: grid;
    grid-template-rows: repeat(6, 1fr);
    grid-gap: 5px;
    padding: 10px;
`

