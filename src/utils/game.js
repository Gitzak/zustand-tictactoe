const WINNING_LINES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

export function evaluateWinner(squares) {
    for (let [a, b, c] of WINNING_LINES) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], line: [a, b, c] }
        }
    }

    return { winner: null, line: [] }
}

export function countOpenSquares(squares) {
    return squares.filter((sq) => !sq).length
}

export function getGameStatus({ winner, turnsLeft, xIsNext }) {
    if (!winner && !turnsLeft) return 'It is a draw!'
    if (winner) return `Winner: ${winner}`
    return `Next player: ${xIsNext ? 'X' : 'O'}`
}
