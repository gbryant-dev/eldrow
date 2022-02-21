import React, { FC } from "react";
import { StyledHeader, Title } from "./Header.style";

interface Props {

}

export const Header: FC<Props> = ({ }) => {
    return <StyledHeader>
        <Title>Eldrow</Title>
    </StyledHeader>
}