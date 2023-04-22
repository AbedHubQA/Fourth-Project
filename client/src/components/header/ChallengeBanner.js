import React, { useContext, useState, useEffect } from 'react'
import GameContext from '../../GameContext'
import UserContext from '../../UserContext'
import axios from 'axios'

const ChallengeBanner = () => {
  const { game, createGame, gameManager, countdown, setCountdown, gameInProgress, setGameInProgress, challengesCompleted, setChallengesCompleted, userPoints, setUserPoints, userRank, setUserRank, gameDataFetched, fetchUserRankAndPoints, userCountdowns, setUserCountdowns } = useContext(GameContext)
  const { user } = useContext(UserContext)

  const startNewGame = async () => {
    await createGame()
    setGameInProgress(true)
    setChallengesCompleted(0)
    setCountdown(60)
  }
  

  const formatCountdown = (countdown) => {
    const days = Math.floor(countdown / 86400)
    const hours = Math.floor((countdown % 86400) / 3600)
    const minutes = Math.floor((countdown % 3600) / 60)
    const seconds = countdown % 60

    return `${days} Days : ${hours} Hours : ${minutes} Mins : ${seconds} Secs`
  }

  return (
    <div className="challenge-banner">
      <h2>
        Challenges Completed:{' '}
        {gameDataFetched ? `${challengesCompleted}/12` : '-'}
      </h2>
      <h2>
        User Points: {gameDataFetched ? userPoints : '-'} | User Rank:{' '}
        {gameDataFetched ? userRank : '-'}
      </h2>
      <h2>Challenge Time Remaining:</h2>
      <h3>{formatCountdown(countdown)}</h3>
      <button onClick={startNewGame} disabled={gameInProgress}>
        Start New Game
      </button>
    </div>
  )
  
}

export default ChallengeBanner
