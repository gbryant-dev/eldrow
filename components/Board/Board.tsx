import React, { FC, useState } from "react";
import { BoardType } from "../../types";
import { GameRow } from "../Game/GameRow/GameRow";
import { Container, Grid } from "./Board.style";

interface Props {
    data: BoardType
}

export const Board: FC<Props> = ({ data }) => {

    return <Container>
        <Grid>
            {/* {Array.from({ length: rows }).map((_, i) => <GameRow key={i} columns={columns} />)} */}
            {data.map((row, i) => <GameRow key={i} i={i} row={row} />)}
        </Grid>
    </Container>
}
