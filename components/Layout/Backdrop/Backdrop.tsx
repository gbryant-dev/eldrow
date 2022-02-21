import React, { FC } from "react";
import { Container } from "./Backdrop.style";

interface Props {
    onClick?: () => void
}

const Backdrop: FC<Props> = ({ children, onClick }) => {
    return (
        <Container 
         onClick={onClick}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
         exit={{ opacity: 0 }} 
        >
            {children}
        </Container>
    )
}

export default Backdrop