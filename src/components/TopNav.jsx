export default function TopNav({ links, active, onChange }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center gap-5 py-6 bg-[#b1251e]/90 backdrop-blur-md text-xs font-semibold uppercase tracking-[0.45em] text-white/80 shadow-[0_10px_25px_rgba(90,18,12,0.35)]">
      {links.map((link) => (
        <button
          key={link}
          onClick={() => onChange?.(link)}
          className={`rounded-full px-6 py-2 transition ${
            active === link
              ? 'bg-white/30 text-white'
              : 'bg-white/10 hover:bg-white/20 hover:text-white/90'
          }`}
        >
          {link}
        </button>
      ))}
    </div>
  )
}

