import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from './store/gameStore'
import { countOpenSquares, evaluateWinner, getGameStatus } from './utils/game'
import WarmBackdrop from './components/WarmBackdrop'
import Intro from './components/Intro'
import GameBoard from './components/GameBoard'
import TopNav from './components/TopNav'
import Docs from './components/Docs'
import About from './components/About'

const NAV_LINKS = ['Docs', 'Play', 'About Us']

export default function Game() {
  const history = useGameStore((state) => state.history)
  const setHistory = useGameStore((state) => state.setHistory)
  const currentMove = useGameStore((state) => state.currentMove)
  const setCurrentMove = useGameStore((state) => state.setCurrentMove)
  const resetGame = useGameStore((state) => state.resetGame)
  const incrementScore = useGameStore((state) => state.incrementScore)
  const resetScores = useGameStore((state) => state.resetScores)
  const scores = useGameStore((state) => state.scores)

  const [activeNav, setActiveNav] = useState('Play')
  const [started, setStarted] = useState(false)

  const currentSquares = history[currentMove]
  const xIsNext = currentMove % 2 === 0

  const { winner, line: winningLine } = useMemo(
    () => evaluateWinner(currentSquares),
    [currentSquares]
  )

  const turnsLeft = useMemo(
    () => countOpenSquares(currentSquares),
    [currentSquares]
  )

  const isGameOver = Boolean(winner) || turnsLeft === 0
  const status = getGameStatus({ winner, turnsLeft, xIsNext })
  const lastWinnerRef = useRef(null)

  useEffect(() => {
    if (winner && lastWinnerRef.current !== winner) {
      incrementScore(winner)
      lastWinnerRef.current = winner
    }
    if (!winner) lastWinnerRef.current = null
  }, [winner, incrementScore])

  function handlePlay(nextSquares) {
    const nextHistory = history.slice(0, currentMove + 1).concat([nextSquares])
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function startGame() {
    resetGame()
    resetScores()
    setStarted(true)
    setActiveNav('Play')
  }

  function playAgain() {
    resetGame()
  }

  function backToIntro() {
    resetGame()
    resetScores()
    setStarted(false)
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <WarmBackdrop />

      <TopNav links={NAV_LINKS} active={activeNav} onChange={setActiveNav} />

      <div className="pt-28 pb-16 px-6 flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          {activeNav === 'Play' && (
            <motion.div
              key="play"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-7xl"
            >
              {!started ? (
                <Intro onStart={startGame} />
              ) : (
                <GameBoard
                  scores={scores}
                  xIsNext={xIsNext}
                  currentSquares={currentSquares}
                  handlePlay={handlePlay}
                  status={status}
                  winningLine={winningLine}
                  isGameOver={isGameOver}
                  playAgain={playAgain}
                  backToIntro={backToIntro}
                />
              )}
            </motion.div>
          )}

          {activeNav === 'Docs' && (
            <motion.div
              key="docs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Docs />
            </motion.div>
          )}

          {activeNav === 'About Us' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <About />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

