import React, { FC, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { BoardState, BoardType, CellState, GameStats, GameStatus } from '../../types';
import { Board } from '../Board/Board';
import { Keyboard } from '../Keyboard/Keyboard';
import { Container } from './Game.style';
import words from '../../words';
import useLocalStorage from '../../hooks/useLocalStorage';
import { getInitialBoardState, getWinKeyword, getWordForTheDay, hasPlayedInLast24Hours, isNewDay, setupGame } from './helper';
import { ROWS, COLUMNS, INITIAL_GAME_STATS } from './constants';
import Modal from '../Layout/Modal/Modal';
import GameStatistics from '../GameStats/GameStats';
import Toaster from '../Toaster/Toaster';
import { ToastProps } from '../Toaster/Toast/Toast';

export const Game: FC = () => {
    const [data, setData] = useState<BoardType | null>(() => setupGame())
    const [boardState, setBoardState] = useLocalStorage<BoardState | null>('boardState', () => getInitialBoardState())
    const [currentRow, setCurrentRow] = useLocalStorage<number>('currentRow', 0)
    const [solution, setSolution] = useLocalStorage<string>('solution', () => getWordForTheDay())
    const [gameStatus, setGameStatus] = useLocalStorage<GameStatus>('gameStatus', GameStatus.IN_PROGRESS)
    const [showModal, setShowModal] = useState(false)
    const [gameStats, setGameStats] = useLocalStorage<GameStats>('statistics', INITIAL_GAME_STATS)
    const [toasts, setToasts] = useState<ToastProps[]>([])
    const [keyStates, setKeyStates] = useLocalStorage<{ [k: string]: CellState }>('keyStates', {})

    const containerRef = useRef<HTMLDivElement>(null)
    const currentGuessRef = useRef<string[]>([])
    const loadedRef = useRef<boolean>(false)
    const animatingRef = useRef<boolean>(false)

    useEffect(() => {
        containerRef.current?.focus()
    }, [])

    useEffect(() => {
        if (!loadedRef.current) {
            const state = setupGame(boardState)
            setData(state)
            loadedRef.current = true
        }
    }, [boardState, gameStatus, currentRow])

    useEffect(() => {
        const hasData = data.flat().map(cell => cell.state).reduce((prev, curr) => prev + curr, 0)
        if (gameStatus !== GameStatus.IN_PROGRESS && hasData > 0) {
            setShowModal(true)
        }
    }, [data, gameStatus])


    useEffect(() => {
        const newKeyStates: { [k: string]: CellState } = {}
        data.slice(0, currentRow).forEach(row => row.forEach(({ value, state }) => {
            newKeyStates[value] = getBestState(value, state, newKeyStates)
        }))

        setKeyStates(newKeyStates)
    }, [currentRow, data, setKeyStates])

    const resetGame = useCallback(() => {
        setBoardState(getInitialBoardState())
        setCurrentRow(0)
        setGameStatus(GameStatus.IN_PROGRESS)
        setData(setupGame())
        setSolution(getWordForTheDay())
    }, [setBoardState, setCurrentRow, setGameStatus, setSolution])

    useEffect(() => {
        if (!loadedRef.current) return
        if (!gameStats.lastPlayedTs || isNewDay(gameStats.lastPlayedTs)) {
            resetGame()
        }
    }, [gameStats.lastPlayedTs, resetGame])

    const updateGrid = () => {
        if (gameStatus !== GameStatus.IN_PROGRESS) return

        setData(data => data.map((row, r) => r !== currentRow ?
            [...row] :
            row.map((cell, c) => ({ ...cell, value: currentGuessRef.current[c] ?? '', state: currentGuessRef.current[c] ? CellState.TBD : CellState.EMPTY })
            )))
    }

    const isValidWord = () => {
        return words.filter(word => word === currentGuessRef.current.join('')).length === 1
    }

    const winGame = () => {
        addToast(getWinKeyword(currentRow), 1500)
        setGameStatus(GameStatus.WIN)
        updateGameStats(true)
        animatingRef.current = true
        setTimeout(() => {
            setShowModal(true)
            animatingRef.current = false
        }, 2000)

    }

    const loseGame = () => {
        addToast(solution.toUpperCase(), 1500)
        setGameStatus(GameStatus.FAIL)
        setCurrentRow(row => row + 1)
        updateGameStats(false)
        animatingRef.current = true
        setTimeout(() => {
            setShowModal(true)
            animatingRef.current = false
        }, 2000)
    }

    const isCorrectGuess = (states: number[]): boolean => {
        return states.every(v => v === CellState.CORRECT)
    }

    const updateGameStats = (win: boolean) => {

        const gamesWon = gameStats.gamesWon + (win ? 1 : 0)
        const gamesPlayed = gameStats.gamesPlayed + 1
        const guessCount = currentRow + 1
        const currentStreak = hasPlayedInLast24Hours(gameStats.lastCompletedTs) ? gameStats.currentStreak : 0
        const newStreak = win ? currentStreak + 1 : 0

        const updatedGameStats: GameStats = {
            ...gameStats,
            gamesWon,
            gamesPlayed,
            currentStreak: newStreak,
            guesses: {
                ...gameStats.guesses,
                fail: gameStats.guesses.fail + (win ? 0 : 1),
                ...(win && { [guessCount]: gameStats.guesses[guessCount] + 1 }),
            },
            maxStreak: Math.max(newStreak, gameStats.maxStreak),
            winPercentage: Math.round(gamesWon / gamesPlayed * 100),
            lastCompletedTs: new Date().getTime(),
            lastPlayedTs: new Date().getTime()
        }

        setGameStats(updatedGameStats)
    }

    const makeGuess = () => {
        if (currentGuessRef.current.length < COLUMNS) {
            addToast('Not enough letters')
            return
        }

        if (!isValidWord()) {
            addToast('Not in word list')
            return
        }

        const states = evaluateGuess()
        const updatedData = updateCellStates(states)

        const nextRow = currentRow + 1
        setCurrentRow(nextRow)

        const guesses = updatedData.slice(0, nextRow).map(row => row.map(cell => cell.value).join(''))
        const evaluations = updatedData.map(row => row.map(cell => cell.state))

        setBoardState({ guesses, evaluations })


        if (isCorrectGuess(states)) {
            winGame()
            return
        }

        if (currentRow === ROWS - 1) {
            loseGame()
            return
        }

        // Update lastPlayedTs
        setGameStats({ ...gameStats, lastPlayedTs: new Date().getTime() })
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
        const updatedData = data.map((row, r) => {
            return r !== currentRow ?
                [...row] :
                row.map((cell, c) => ({ ...cell, state: states[c] }))
        })

        setData(updatedData)
        return updatedData
    }

    const getBestState = (letter: string, state: CellState, states: { [k: string]: CellState }) => {
        // Get current state
        const currentState = states[letter] ?? CellState.EMPTY

        // Compare against state 
        return Math.max(currentState, state) as CellState
    }

    const isValidKey = (key: string) => {
        return /^[a-z]$/.test(key)
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


        const { key, ctrlKey, metaKey, shiftKey, altKey } = event

        // Ignore meta keys e.g Ctrl, Shift etc
        if (ctrlKey || metaKey || shiftKey || altKey) return

        handleKey(key)

    }

    const handleKey = (key: string) => {

        if (animatingRef.current) return

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

        // Only interested in A-Z
        if (!isValidKey(key)) return

        addLetter(key)
    }

    const handleModalClose = useCallback(() => {
        setShowModal(false)
    }, [])

    const addToast = (text: string, duration: number = 1000) => {
        setToasts(current => [...current, { text, duration }])
    }

    return (
        <>
            <Toaster toasts={toasts} />
            <Modal show={showModal} onClose={handleModalClose}>
                <GameStatistics boardState={boardState} gameStats={gameStats} gameStatus={gameStatus} currentRow={currentRow} />
            </Modal>
            <Container ref={containerRef} tabIndex={0} onKeyDown={handleKeyDown}>
                {data && <Board data={data} currentRow={currentRow} />}
                <Keyboard onKey={handleKey} states={keyStates} />
            </Container>
        </>
    )

}