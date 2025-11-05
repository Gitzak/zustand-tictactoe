import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const createEmptyBoard = () => Array(9).fill(null)
const initialState = {
    history: [createEmptyBoard()],
    currentMove: 0,
    scores: {
        X: 0,
        O: 0,
    },
}

export const useGameStore = create(
    combine(initialState, (set) => ({
        setHistory: (nextHistory) =>
            set((state) => ({
                history:
                    typeof nextHistory === 'function'
                        ? nextHistory(state.history)
                        : nextHistory,
            })),
        setCurrentMove: (nextMove) =>
            set((state) => ({
                currentMove:
                        typeof nextMove === 'function'
                            ? nextMove(state.currentMove)
                            : nextMove,
            })),
        resetGame: () =>
            set((state) => ({
                history: [createEmptyBoard()],
                currentMove: 0,
                scores: state.scores,
            })),
        incrementScore: (player) =>
            set((state) => {
                if (!['X', 'O'].includes(player)) return state
                return {
                    ...state,
                    scores: {
                        ...state.scores,
                        [player]: state.scores[player] + 1,
                    },
                }
            }),
        resetScores: () =>
            set((state) => ({
                ...state,
                scores: {
                    X: 0,
                    O: 0,
                },
            })),
    }))
)
