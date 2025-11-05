import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Board from './components/Board'
import { useGameStore } from './store/gameStore'
import { countOpenSquares, evaluateWinner, getGameStatus } from './utils/game'

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

      {/* ✅ Fixed Top Nav */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center gap-5 py-6 bg-[#b1251e]/90 backdrop-blur-md text-xs font-semibold uppercase tracking-[0.45em] text-white/80 shadow-[0_10px_25px_rgba(90,18,12,0.35)]">
        {NAV_LINKS.map((link) => (
          <button
            key={link}
            onClick={() => setActiveNav(link)}
            className={`rounded-full px-6 py-2 transition ${activeNav === link
              ? 'bg-white/30 text-white'
              : 'bg-white/10 hover:bg-white/20 hover:text-white/90'
              }`}
          >
            {link}
          </button>
        ))}
      </div>

      {/* ✅ Main content area */}
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
              className="max-w-xl text-cocoa mt-10"
            >
              <h2 className="text-3xl font-bold mb-4">📘 How to Play</h2>
              <ul className="list-disc text-left text-sm space-y-2 pl-5">
                <li>Players take turns marking squares with X or O.</li>
                <li>The first to align 3 symbols wins.</li>
                <li>If no winner and no squares left — it’s a draw.</li>
              </ul>
            </motion.div>
          )}

          {activeNav === 'About Us' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-xl text-cocoa mt-10"
            >
              <h2 className="text-3xl font-bold mb-4">👾 About This Game</h2>
              <p className="text-sm leading-relaxed">
                A retro-style Tic Tac Toe built with React, Zustand, TailwindCSS
                and Framer Motion. Designed for playful nostalgia and modern
                polish.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* 🎮 GameBoard content */
function GameBoard({
  scores,
  xIsNext,
  currentSquares,
  handlePlay,
  status,
  winningLine,
  isGameOver,
  playAgain,
  backToIntro,
}) {
  return (
    <div className="mt-12 flex w-full flex-col items-center gap-12">
      <section className="w-full max-w-5xl rounded-[38px] bg-[#b1251e] px-6 py-8 sm:px-10 sm:py-10 md:p-12 shadow-[0_40px_80px_rgba(133,32,21,0.35)]">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-5xl text-[_rgba(248,180,107,0.55)] font-black uppercase leading-tight text-ember drop-shadow-[0_10px_25px_rgba(120,33,15,0.35)] sm:text-6xl">
            The Tic-Tac-Toe Game
          </h1>
        </div>

        <div className="mt-12 flex flex-col items-center gap-12">
          <div className="w-full grid items-stretch justify-items-center gap-10 sm:gap-12 lg:gap-16 lg:grid-cols-[auto_minmax(0,1fr)_auto]">
            <ScoreCard player="Player X" score={scores.X} accent="X" />
            <Board
              squares={currentSquares}
              xIsNext={xIsNext}
              onPlay={handlePlay}
              status={status}
              winningLine={winningLine}
              isGameOver={isGameOver}
            />
            <ScoreCard player="Player O" score={scores.O} accent="O" />
          </div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <button
              onClick={playAgain}
              className="rounded-full bg-primary px-8 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-white shadow-[0_20px_45px_rgba(217,83,30,0.5)] hover:-translate-y-0.5 transition"
            >
              New Game
            </button>
            <button
              onClick={backToIntro}
              className="rounded-full border border-white/40 px-8 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-white/90 hover:bg-white/20 transition"
            >
              Exit Lobby
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

/* 🏁 Intro content (inside Play tab before game starts) */
function Intro({ onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-6 mt-12"
    >
      <h1 className="text-5xl font-black uppercase tracking-[0.4em] text-ember sm:text-6xl">
        Tic Tac Toe
      </h1>
      <p className="max-w-xl text-sm text-cocoa/80 sm:text-base">
        Slide into a retro arena of deep reds and golden glow. Challenge a
        friend, take turns, and race to three in a row before the board heats
        up.
      </p>
      <button
        onClick={onStart}
        className="rounded-full bg-primary px-12 py-4 text-xs font-semibold uppercase tracking-[0.5em] text-white shadow-[0_30px_60px_rgba(217,83,30,0.55)] hover:-translate-y-1 transition"
      >
        Start New Game
      </button>
    </motion.div>
  )
}

/* 🔥 Shared helpers */
function WarmBackdrop() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(248,180,107,0.55),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_bottom_right,_rgba(244,114,51,0.45),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.12)_0,rgba(255,255,255,0.12)_12px,rgba(227,142,83,0.08)_12px,rgba(227,142,83,0.08)_24px)] opacity-70" />
    </>
  )
}

function ScoreCard({ player, score, accent }) {
  const accentClass =
    accent === 'X'
      ? 'from-[#f97316] to-[#d9460f]'
      : 'from-[#fb8b24] to-[#f97316]'
  return (
    <div
      className={`w-full max-w-[11rem] rounded-[28px] bg-gradient-to-br ${accentClass} px-6 py-8 text-center text-white shadow-[0_25px_50px_rgba(120,33,15,0.35)] mx-auto`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/80">
        {player}
      </p>
      <p className="mt-5 text-5xl font-black">{score}</p>
      <p className="mt-1 text-sm font-medium uppercase tracking-[0.4em] text-white/80">
        Score
      </p>
    </div>
  )
}
