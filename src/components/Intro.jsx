import { motion } from 'framer-motion'

export default function Intro({ onStart }) {
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

