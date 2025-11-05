export default function Square({ value, onSquareClick }) {
  return (
    <button
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        backgroundColor: '#8d7777ff',
        border: '1px solid #999',
        outline: 0,
        borderRadius: 0,
        fontSize: '1.5rem',
        fontWeight: 'bold',
        width: '2.5rem',
        height: '2.5rem',
        cursor: 'pointer',
      }}
      onClick={onSquareClick}
    >
      {value}
    </button>
  )
}
