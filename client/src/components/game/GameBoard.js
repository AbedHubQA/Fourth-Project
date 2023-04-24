import { useContext, useState } from 'react'
import { userTokenFunction } from '../../helpers/auth'
import axios from 'axios'
import image25 from '../../assets/images/1.png'
import image24 from '../../assets/images/2.png'
import image23 from '../../assets/images/3.png'
import image22 from '../../assets/images/4.png'
import image21 from '../../assets/images/5.png'
import image20 from '../../assets/images/6.png'
import image19 from '../../assets/images/7.png'
import image18 from '../../assets/images/8.png'
import image17 from '../../assets/images/9.png'
import image16 from '../../assets/images/10.png'
import image15 from '../../assets/images/11.png'
import image14 from '../../assets/images/12.png'
import image13 from '../../assets/images/13.png'
import image12 from '../../assets/images/14.png'
import image11 from '../../assets/images/15.png'
import image10 from '../../assets/images/16.png'
import image9 from '../../assets/images/17.png'
import image8 from '../../assets/images/18.png'
import image7 from '../../assets/images/19.png'
import image6 from '../../assets/images/20.png'
import image5 from '../../assets/images/21.png'
import image4 from '../../assets/images/22.png'
import image3 from '../../assets/images/23.png'
import image2 from '../../assets/images/24.png'
import image1 from '../../assets/images/25.png'

const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15, image16, image17, image18, image19, image20, image21, image22, image23, image24, image25]

const GameBoard = ({ challenge, challengeState, setChallengeState, imageURL, gridSize, onSquareClick, setTotalScore, totalScore, revealedSquares, setRevealedSquares, difficulty, theme }) => {

  const getScoreDeduction = (index) => {
    const outerLayer = new Set([0, 1, 2, 3, 4, 5, 9, 10, 14, 15, 19, 20, 21, 22, 23, 24])
    const innerLayer = new Set([6, 7, 8, 11, 13, 16, 17, 18])

    if (outerLayer.has(index)) return 25
    if (innerLayer.has(index)) return 50
    return 100
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
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
    const backgroundImage = `url(${images[index]})`

    return (
      <div
        key={index}
        className={`square ${isRevealed ? 'revealed' : ''}`}
        onClick={() => !isRevealed && handleSquareClick(index)}
        style={{ backgroundImage: isRevealed ? '' : backgroundImage }}
      ></div>
    )
  }

  const squares = []
  for (let i = 0; i < gridSize; i++) {
    squares.push(renderSquare(i))
  }

  return (
    <>
      <div className="game-title">
        <div className="game-titles">
          <h1>{capitalizeFirstLetter(difficulty)} - {capitalizeFirstLetter(theme)}</h1>
          <div className="challenge-score">Available Points: {totalScore}</div>
        </div>
        <hr></hr>
      </div>
      <div className="game-border">
        <div className="game-board" style={{ backgroundImage: `url(${imageURL})` }}>
          {squares}
        </div>
      </div>
    </>
  )
}

export default GameBoard