import styled from 'styled-components'

export const ToastContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 10%;
    left: 50%;
    z-index: 2;
    width: fit-content;
    transform: translateX(-50%);
`;