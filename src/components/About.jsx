import { memo } from 'react'

function About() {
  return (
    <div className="max-w-3xl text-cocoa mt-10">
      <h2 className="text-3xl font-bold mb-4">About This Game</h2>
      <p className="text-sm leading-relaxed">
        This project is a modern take on a timeless classic: a
        retro-inspired Tic‑Tac‑Toe crafted with React for the UI, Zustand for
        state management, Tailwind&nbsp;CSS for styling, and Framer Motion for
        tasteful animations. The focus is on clarity, responsiveness, and a
        smooth player experience without unnecessary complexity or weight.
      </p>
      <p className="text-sm leading-relaxed mt-4">
        Zustand powers a tiny, predictable store that keeps the board, turns,
        and outcomes in sync with minimal boilerplate. Functional components and
        hooks keep the codebase approachable, while memoization helps ensure
        only the parts of the interface that change are re‑rendered. Tailwind’s
        utility‑first approach provides consistent spacing, color, and
        typography, enabling rapid iteration while staying visually coherent.
        Framer Motion contributes subtle, performant transitions that make state
        changes easy to follow without being distracting.
      </p>
      <p className="text-sm leading-relaxed mt-4">
        The architecture favors small modules, explicit naming, and pure
        functions. Derived values come from a single source of truth, effects
        are isolated, and rendering remains deterministic. This approach
        simplifies reasoning about behavior, reduces bugs, and makes the code
        straightforward to extend—whether you want to tweak visuals, add new
        rules, or explore alternate game modes.
      </p>
      <p className="text-sm leading-relaxed mt-4">
        The result is a clean, responsive game that feels familiar on desktop
        and mobile. Animations are tuned to be quick and lightweight, and
        assets are kept minimal to preserve a small bundle footprint. Whether
        you’re here to play a few rounds or to learn from the source, we hope
        the experience is enjoyable, understandable, and fast.
      </p>
    </div>
  )
}

export default memo(About)
