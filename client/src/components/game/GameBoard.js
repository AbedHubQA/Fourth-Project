import { useContext, useState } from 'react'
import { userTokenFunction } from '../../helpers/auth'
import axios from 'axios'

const GameBoard = ({ challenge, challengeState, setChallengeState, imageURL, gridSize, onSquareClick, setTotalScore, totalScore, revealedSquares, setRevealedSquares }) => {

  const getScoreDeduction = (index) => {
    const outerLayer = new Set([0, 1, 2, 3, 4, 5, 9, 15, 19, 20, 21, 22, 23, 24])
    const innerLayer = new Set([6, 7, 8, 10, 14, 16, 17, 18])

    if (outerLayer.has(index)) return 25
    if (innerLayer.has(index)) return 50
    return 100
  }

  const handleSquareClick = async (index) => {
    const deduction = getScoreDeduction(index)
    setTotalScore((prevTotalScore) => prevTotalScore - deduction)
  
    const updatedRevealedSquares = new Set(revealedSquares)
    updatedRevealedSquares.add(index)
    setRevealedSquares(updatedRevealedSquares)
    
    try {
      const userToken = userTokenFunction()
      const { data } = await axios.put(
        `/api/user_challenges/update-revealed-squares/${challenge.user_challenge_id}/`,
        {
          revealed_squares: Array.from(updatedRevealedSquares).join(','),
          total_available_points: totalScore - deduction,
        },
        userToken
      )
    } catch (error) {
      console.error('Error updating revealed squares:', error)
    }
  
    onSquareClick(index)
  }
  

  const renderSquare = (index) => {
    const isRevealed = revealedSquares.has(index)
    return (
      <div
        key={index}
        className={`square ${isRevealed ? 'revealed' : ''}`}
        onClick={() => !isRevealed && handleSquareClick(index)}
      ></div>
    )
  }

  const squares = []
  for (let i = 0; i < gridSize; i++) {
    squares.push(renderSquare(i))
  }

  return (
    <div className="game-board" style={{ backgroundImage: `url(${imageURL})` }}>
      <div className="challenge-score">Available points: {totalScore}</div>
      {squares}
    </div>
  )
}

export default GameBoard