import Board from './Board'
import ScoreCard from './ScoreCard'

export default function GameBoard({
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

