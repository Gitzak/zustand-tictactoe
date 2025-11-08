import { memo } from 'react'

function Docs() {
  return (
    <div className="max-w-xl text-cocoa mt-10">
      <h2 className="text-3xl font-bold mb-4">How to Play</h2>
      <ul className="list-disc text-left text-sm space-y-2 pl-5">
        <li>Players alternate marking empty squares with X or O.</li>
        <li>The first player to align three in a row—horizontally, vertically, or diagonally—wins.</li>
        <li>If the board fills with no winner, it’s a draw.</li>
      </ul>
    </div>
  )
}

export default memo(Docs)

