import { FC, useEffect, useState } from "react";
import { GameStats } from "../../../types";
import { Container, GraphContainer, GraphLine, GuessLabel } from "./GuessDistribution.style";
import { getWins } from "./helper";

type Props = Partial<GameStats> & { currentRow: number }

const GuessDistribution: FC<Props> = ({ guesses, currentRow }) => {
    const [wins, setWins] = useState(() => {
        return {}
    })


    useEffect(() => {
        const data = getWins(guesses)
        setWins(data)
    }, [guesses])

    return (
        <Container>
                {Object.keys(wins).map(key => (
                    <GraphContainer key={key}>
                        <div>{key}</div>
                        <GraphLine $colored={key === currentRow.toString()} $width={wins[key].proportion * 100}>
                            <GuessLabel>{wins[key].value}</GuessLabel>
                            </GraphLine> 
                    </GraphContainer>
                ))}
        </Container>
    )
}

export default GuessDistribution