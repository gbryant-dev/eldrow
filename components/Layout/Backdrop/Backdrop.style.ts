import { motion } from 'framer-motion'
import styled from 'styled-components'

export const Container = styled(motion.div)`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: var(--opacity-50);
    z-index: 1000;
`