import { FC } from "react";
import { GameStats } from "../../../types";
import { Container } from "./GuessDistribution.style";

type Props = Partial<GameStats>

const GuessDistribution: FC<Props> = ({ guesses }) => {
    return (
        <Container>
            {JSON.stringify(guesses, null, 2)}
        </Container>
    )
}

export default GuessDistribution