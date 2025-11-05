export default function WarmBackdrop() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(248,180,107,0.55),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_bottom_right,_rgba(244,114,51,0.45),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.12)_0,rgba(255,255,255,0.12)_12px,rgba(227,142,83,0.08)_12px,rgba(227,142,83,0.08)_24px)] opacity-70" />
    </>
  )
}

