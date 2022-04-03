import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components'


const SlideUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(50px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }

`;

const SlideDown = keyframes`
    from {
        opacity: 1;
        transform: translateY(0);
    }

    to {
        opacity: 0;
        transform: translateY(50px);
    }
`;

export const Container = styled.div<{ $closing: boolean, $opening: boolean }>`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    max-width: var(--game-max-width);
    max-height: 90%;
    background-color: var(--modal-content-bg);
    color: var(--color-tone-1);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    padding: 16px;
    transform: translateY(0);
    opacity: 1;
    animation: 300ms ${props => props.$closing ? SlideDown : SlideUp} ease-in;
    border-radius: 8px;
`;

export const MotionContainer = styled(motion.div)`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    max-width: var(--game-max-width);
    max-height: 90%;
    background-color: var(--modal-content-bg);
    color: var(--color-tone-1);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    padding: 16px;
    border-radius: 8px;
`

export const CloseIcon = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    color: var(--color-tone-1);
    background-color: var(--modal-content-bg);
    cursor: pointer;
`