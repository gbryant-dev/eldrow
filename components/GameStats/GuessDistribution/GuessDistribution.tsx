import { FC } from "react";
import { GameStats } from "../../../types";
import { Container, GraphContainer, GraphLine, GuessLabel } from "./GuessDistribution.style";

type Props = Partial<GameStats>

const GuessDistribution: FC<Props> = ({ guesses, gamesPlayed }) => {

    return (
        <Container>
                {Object.keys(guesses).slice(0, -1).map(key => (
                    <GraphContainer key={key}>
                        <div>{key}</div>
                        <GraphLine $width={(gamesPlayed / guesses[key] * 100) / gamesPlayed}>
                            <GuessLabel>{guesses[key]}</GuessLabel>
                            </GraphLine> 
                    </GraphContainer>
                ))}
        </Container>
    )
}

export default GuessDistribution