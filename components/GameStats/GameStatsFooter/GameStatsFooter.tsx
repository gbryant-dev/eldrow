import { FC } from "react";
import { Countdown, Footer, Share, Title } from "./GameStatsFooter.style";

const GameStatsFooter: FC = () => {

    return <Footer>
        <Countdown>
            <Title>Next Wordle</Title>
        </Countdown>
        <Share>Share</Share>
    </Footer>
}

export default GameStatsFooter