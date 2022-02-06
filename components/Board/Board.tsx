import React, { FC, useState } from "react";
import { GameRow } from "../Game/GameRow/GameRow";
import { Container, Grid } from "./Board.style";

interface Props {
    rows: number;
    columns: number;
}

export const Board: FC<Props> = ({ rows, columns }) => {

    return <Container>
        <Grid>
            {Array.from({ length: rows }).map((_, i) => <GameRow key={i} columns={columns} />)}
        </Grid>
    </Container>
}