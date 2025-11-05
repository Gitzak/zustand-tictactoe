export default function Square({
  value,
  onSquareClick,
  isWinning = false,
  isGameOver = false,
}) {
  const disabled = Boolean(value) || isGameOver

  const baseClasses =
    'relative flex w-[70px] h-[70px] items-center justify-center rounded-[12px] border-2 border-[#5e1e10]/40 bg-[#7c2d12] shadow-[0_15px_25px_rgba(80,25,15,0.6)] transition-all duration-200 ease-out focus:outline-none focus:ring-4 focus:ring-primary/30'

  const interactionClasses = disabled
    ? 'cursor-default'
    : 'cursor-pointer hover:-translate-y-1 hover:border-primary-light hover:bg-primary/50 hover:shadow-[0_0_70px_rgba(251,146,60,0.45)] active:scale-95'

  const winningClasses = isWinning
    ? 'border-white/70 bg-primary text-white shadow-[0_0_80px_rgba(249,115,22,0.75)] animate-pop'
    : ''

  const textClasses =
    value === 'X'
      ? 'text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]'
      : value === 'O'
      ? 'text-amber-200 drop-shadow-[0_0_25px_rgba(254,252,191,0.5)]'
      : 'text-white/20'

  return (
    <button
      type="button"
      onClick={onSquareClick}
      disabled={disabled}
      className={[baseClasses, interactionClasses, winningClasses].join(' ')}
    >
      <span
        className={`absolute inset-0 flex items-center justify-center text-[clamp(1.25rem,4vw,2rem)] leading-none font-black uppercase tracking-[0.08em] ${textClasses}`}
      >
        {value ?? ''}
      </span>
    </button>
  )
}
