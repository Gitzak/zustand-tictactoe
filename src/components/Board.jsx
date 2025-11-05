import Square from './Square'

export default function Board({
  squares,
  xIsNext,
  onPlay,
  status,
  winningLine,
  isGameOver,
}) {
  function handleClick(i) {
    if (squares[i] || isGameOver) return
    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? 'X' : 'O'
    onPlay(nextSquares)
  }

  return (
    <section
      className="w-full place-self-stretch flex items-center justify-center px-2 sm:px-4"
      aria-label="Tic Tac Toe Board"
    >
      <div className="w-fit rounded-[15px] bg-[#f7c09a] px-5 sm:px-8 md:px-10 py-8 shadow-inner shadow-[#f0905f]/40 flex flex-col items-center gap-6">
        <p className="w-72 sm:w-80 rounded-full bg-[#b1251e] px-8 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.5em] text-white shadow-[0_10px_25px_rgba(120,33,15,0.3)] text-center whitespace-nowrap">
          {status}
        </p>

        <div className="grid grid-cols-3 gap-4 place-items-center">
          {squares.map((square, i) => (
            <Square
              key={i}
              value={square}
              onSquareClick={() => handleClick(i)}
              isWinning={winningLine?.includes(i)}
              isGameOver={isGameOver}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
