import { FC, useEffect, useState } from "react";
import { BoardState, CellState } from "../../../types";
import { Countdown, Footer, Share, ShareButton, Timer, Title } from "./GameStatsFooter.style";

interface Props {
    currentRow: number;
    cellEvaluations: BoardState['evaluations'];
}

const GameStatsFooter: FC<Props> = ({ currentRow, cellEvaluations }) => {
    const [time, setTime] = useState<string>('')


    useEffect(() => {

        const calculateRemainingTime = () => {
            const nextDay = new Date().setHours(24, 0, 0, 0)
            const remainingTimeDate = new Date(nextDay - new Date().getTime())
            const hours = remainingTimeDate.getUTCHours().toString().padStart(2,'0')
            const minutes = remainingTimeDate.getUTCMinutes().toString().padStart(2, '0')
            const seconds = remainingTimeDate.getUTCSeconds().toString().padStart(2, '0')
            const remainingTimeString = `${hours}:${minutes}:${seconds}`
            setTime(remainingTimeString)
        }
        calculateRemainingTime()
        const interval = setInterval(calculateRemainingTime, 1000);

        return () => clearInterval(interval)
    }, [])

    /**
     * Look at evaluations
     * Render emoji based on state e.g ⬜️⬜️🟨🟩⬜️
     */
    const createShareableResult = async () => {

        const stateMap = {
            [CellState.PRESENT]: '🟨',
            [CellState.CORRECT]: '🟩',
            default: '⬜️'
        }

        const content = cellEvaluations.slice(0, currentRow).map(row => row.map((state) => {
            return (stateMap[state] || stateMap.default)
        }).join('')).join('\n')

        await window.navigator.clipboard.writeText(content)
    }

    return <Footer>
        <Countdown>
            <Title>Next Wordle</Title>
            <Timer>{time}</Timer>
        </Countdown>
        <Share>
            <ShareButton onClick={createShareableResult}>Share</ShareButton>
        </Share>
    </Footer>
}

export default GameStatsFooter