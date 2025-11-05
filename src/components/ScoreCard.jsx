export default function ScoreCard({ player, score, accent }) {
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

