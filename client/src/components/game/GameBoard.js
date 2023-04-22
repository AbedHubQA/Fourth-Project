import { useState } from 'react'

const GameBoard = ({ imageURL, gridSize, onSquareClick }) => {
  const [revealedSquares, setRevealedSquares] = useState(new Set())

  const handleSquareClick = (index) => {
    setRevealedSquares((prev) => {
      const updated = new Set(prev)
      updated.add(index)
      return updated
    })
    onSquareClick(index)
  }

  const renderSquare = (index) => {
    const isRevealed = revealedSquares.has(index)
    return (
      <div
        key={index}
        className={`square ${isRevealed ? 'revealed' : ''}`}
        onClick={() => !isRevealed && handleSquareClick(index)}
      >
        {isRevealed && <img src={imageURL} alt="Challenge" />}
      </div>
    )
  }

  const squares = []
  for (let i = 0; i < gridSize; i++) {
    squares.push(renderSquare(i))
  }

  return <div className="game-board">{squares}</div>
}

export default GameBoard
