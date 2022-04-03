import React, { FC } from "react";
import { BoardType } from "../../types";
import { GameRow } from "../Game/GameRow/GameRow";
import { Container, Grid } from "./Board.style";

interface Props {
  data: BoardType;
  currentRow: number;
}

export const Board: FC<Props> = ({ data, currentRow }) => {

  return (
    <Container>
      <Grid>
        {data.map((row, i) => <GameRow isCurrent={i === currentRow} key={i} row={row} />)}
      </Grid>
    </Container>
  )
}
