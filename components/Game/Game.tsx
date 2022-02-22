import React, { FC, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { GameContextProvider } from '../../GameContext/GameContext';
import { BoardState, BoardType, CellState, GameStats, GameStatus } from '../../types';
import { Board } from '../Board/Board';
import { Header } from '../Layout/Header/Header';
import { Keyboard } from '../Keyboard/Keyboard';
import { Container } from './Game.style';
import words from '../../words';
import useLocalStorage from '../../hooks/useLocalStorage';
import { getWordForTheDay, setupGame } from './helper';
import { ROWS, COLUMNS, INITIAL_GAME_STATS } from './constants';
import Modal from '../Layout/Modal/Modal';
import GameStatistics from '../GameStats/GameStats';


export const Game: FC = () => {
    const [data, setData] = useState<BoardType>([])
    const [boardState, setBoardState] = useLocalStorage<BoardState | null>('boardState', null)
    const [currentRow, setCurrentRow] = useLocalStorage<number>('currentRow', 0)
    const [solution, setSolution] = useLocalStorage<string>('solution', '')
    const [gameStatus, setGameStatus] = useLocalStorage<GameStatus>('gameStatus', GameStatus.STARTED)
    const [showModal, setShowModal] = useState(false)
    const [gameStats, setGameStats] = useLocalStorage<GameStats>('statistics', INITIAL_GAME_STATS)

    const containerRef = useRef<HTMLDivElement>(null)
    const currentGuessRef = useRef<string[]>([])

    useEffect(() => {
        const word = getWordForTheDay()
        setSolution(word)
    }, [setSolution])

    useEffect(() => {
        containerRef.current?.focus()
    }, [])


    const initialiseGame = () => {
        const { data } = setupGame(boardState)
        setData(data)
        if (gameStatus === GameStatus.STARTED) {
            setGameStatus(GameStatus.IN_PROGESS)
        } else {
            if (gameStatus !== GameStatus.IN_PROGESS) {
                setShowModal(true)
            }
        }
    }

    useEffect(() => {
        initialiseGame()
    }, [])

    const updateGrid = useCallback(() => {
        if (gameStatus !== GameStatus.IN_PROGESS) return
        const updatedData = data.map((row, r) => r !== currentRow ?
            [...row] :
            row.map((cell, c) => ({ ...cell, value: currentGuessRef.current[c] ?? '', state: currentGuessRef.current[c] ? CellState.TBD : CellState.EMPTY })
            ))
        setData(updatedData)

    }, [currentRow, data, gameStatus, setData])

    const updateBoardState = useCallback(() => {
        const guesses = data.slice(0, currentRow).map(row => row.map(cell => cell.value).join(''))
        const evaluations = data.map(row => row.map(cell => cell.state))
        setBoardState({ guesses, evaluations })
    }, [data, setBoardState, currentRow])

    useEffect(() => {
        updateBoardState()
    }, [updateBoardState])


    const isValidWord = () => {
        return words.filter(word => word === currentGuessRef.current.join('')).length === 1
    }

    const winGame = () => {
        setGameStatus(GameStatus.WIN)
        updateGameStats(true)
        setShowModal(true)
    }

    const loseGame = () => {
        setGameStatus(GameStatus.FAIL)
        updateGameStats(false)
        setShowModal(true)
    }

    const hasWon = (states: number[]): boolean => {
        return states.every(v => v === CellState.CORRECT)
    }

    /** Need to come back to current streak */
    const updateGameStats = (win: boolean) => {

        const gamesWon = gameStats.gamesWon + (win ? 1: 0)
        const gamesPlayed = gameStats.gamesPlayed + 1
        const guessCount = currentRow + 1
        
        const updatedGameStats: GameStats = {
            ...gameStats,
            gamesWon,
            gamesPlayed,
            currentStreak: gameStats.currentStreak + 1,
            guesses: {
                ...gameStats.guesses,
                fail: gameStats.guesses.fail + (win ? 0 : 1),
                ...(win && { [guessCount]: gameStats.guesses[guessCount] + 1 }),
            },
            winStreak: gameStats.winStreak + (win ? 1 : 0),
            winPercentage: gamesWon / gamesPlayed * 100
        }

        setGameStats(updatedGameStats)
    }

    const makeGuess = () => {
        if (currentGuessRef.current.length < COLUMNS) return
        if (!isValidWord()) return

        const states = evaluateGuess()
        updateCellStates(states)

        const nextRow = currentRow + 1
        setCurrentRow(nextRow)

        if (hasWon(states)) {
            winGame()
            return
        }


        if (currentRow === ROWS - 1) {
            loseGame()
            return
        }

        currentGuessRef.current = []

    }

    const evaluateGuess = () => {

        const solutionMap = solution.split('').reduce((word, letter, i) => {
            if (letter in word) {
                word[letter].push(i)
            } else {
                word[letter] = [i]
            }
            return word
        }, {})

        const evaluations = [0, 0, 0, 0, 0]

        // Compare each letter again solution and update cell state
        currentGuessRef.current.forEach((letter, i) => {

            // Get positions of letter in solution
            const indices: number[] = solutionMap[letter] ?? []

            let status = CellState.ABSENT

            for (const index of indices) {

                if (indices.includes(index) && status < 3) {
                    status = CellState.PRESENT
                }

                if (index === i && status < 4) {
                    status = CellState.CORRECT
                }
            }

            evaluations[i] = status
        })

        return evaluations

    }

    const updateCellStates = (states: CellState[]) => {
        setData(data => data.map((row, r) => {
            return r !== currentRow ?
                [...row] :
                row.map((cell, c) => ({ ...cell, state: states[c] }))
        }))
    }

    const isValidKey = (key: string) => {
        return /\b([a-z]|backspace|enter)\b/i.test(key)
    }

    const addLetter = (key: string) => {
        updateGuess(key)
    }

    const removeLetter = () => {
        updateGuess('', true)
    }

    const updateGuess = (key: string, removeLetter: boolean = false) => {

        const updatedGuess = currentGuessRef.current.slice()
        if (!(updatedGuess.length === COLUMNS) && !removeLetter) {
            updatedGuess.push(key)
        } else if (updatedGuess.length > 0 && removeLetter) {
            updatedGuess.pop()
        }
        currentGuessRef.current = updatedGuess
        updateGrid()
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {

        // If the game is not in progress, return
        if (gameStatus !== GameStatus.IN_PROGESS) return

        const { key, ctrlKey, metaKey, shiftKey, altKey } = event

        // Ignore meta keys e.g Ctrl, Shift etc
        if (ctrlKey || metaKey || shiftKey || altKey) return

        // Only interested in A-Z, Backspace and Enter
        if (!isValidKey(key)) return

        // Check for special keys first
        if (key === 'Enter') {
            makeGuess()
            return
        }

        if (key === 'Backspace') {
            removeLetter()
            return
        }

        addLetter(key)

    }

    const handleButtonPress = (key: string) => {

        if (gameStatus !== GameStatus.IN_PROGESS) return

        const loweredKey = key.toLowerCase()

        // Check for special keys first
        if (loweredKey === 'enter') {
            makeGuess()
            return
        }

        if (loweredKey === 'backspace') {
            removeLetter()
            return
        }

        addLetter(key)


    }

    const handleModalClose = useCallback(() => {
        setShowModal(false)
    }, [])

    return (
        <GameContextProvider value={{ gameStats, updateGameStats, onButtonPress: handleButtonPress }}>
            <Modal show={showModal} onClose={handleModalClose}>
                <GameStatistics />
            </Modal>
            <Container ref={containerRef} tabIndex={0} onKeyDown={handleKeyDown}>
                <Header />
                {data && <Board data={data} />}
                <Keyboard />
            </Container>
        </GameContextProvider>
    )

}