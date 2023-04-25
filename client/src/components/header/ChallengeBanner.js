import React, { useContext, useState, useEffect } from 'react'
import GameContext from '../../GameContext'
import UserContext from '../../UserContext'
import axios from 'axios'

const ChallengeBanner = () => {
  const { game, totalCompleted, setTotalCompleted, createGame, countdown, setCountdown, gameInProgress, setGameInProgress, challengesCompleted, setChallengesCompleted, userPoints, setUserPoints, userRank, setUserRank, gameDataFetched, fetchUserRankAndPoints, userCountdowns, setUserCountdowns, sectionsStatus } = useContext(GameContext)
  const { user } = useContext(UserContext)

  const startNewGame = async () => {
    await createGame()
    setGameInProgress(true)
    setChallengesCompleted(0)
    setCountdown(30)
  }



  useEffect(() => {
    const newTotalCompleted = sectionsStatus.length > 0 ? sectionsStatus.reduce((acc, cur) => acc += cur.themes.filter((t) => t.is_completed).length, 0) : 0
    console.log(newTotalCompleted)
    setTotalCompleted(newTotalCompleted)
    if (gameDataFetched) {
      fetchUserRankAndPoints()
    }
  }, [userPoints, totalCompleted, countdown])

  const ordinalSuffix = (number) => {
    const lastDigit = number % 10
    const lastTwoDigits = number % 100

    if (lastDigit === 1 && lastTwoDigits !== 11) {
      return `${number}st`
    }
    if (lastDigit === 2 && lastTwoDigits !== 12) {
      return `${number}nd`
    }
    if (lastDigit === 3 && lastTwoDigits !== 13) {
      return `${number}rd`
    }
    return `${number}th`
  }

  useEffect(() => {
    let intervalId
    if (countdown !== null && countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown((countdown) => countdown - 1)
      }, 1000)
    }

    return () => clearInterval(intervalId)
  }, [countdown])

  const getBackgroundColor = () => {
    if (countdown === null) return 'white'
    if (countdown === 0) return 'white'
    if (countdown <= 10) return 'firebrick'
    if (countdown <= 30) return 'chocolate'
    return 'white'
  }

  const formatCountdown = (countdown) => {
    if (countdown === null || countdown === 0) {
      return ['-', '-', '-', '-']
    }

    const days = Math.floor(countdown / 86400)
    const hours = Math.floor((countdown % 86400) / 3600)
    const minutes = Math.floor((countdown % 3600) / 60)
    const seconds = countdown % 60

    return [`${days} Days`, `${hours} Hours`, `${minutes} Mins`, `${seconds} Secs`]
  }

  return (
    <>
      <div className="overall-banner">
        <div className="start-game">
          <button onClick={startNewGame} disabled={gameInProgress}>
            START NEW GAME
          </button>
        </div>
        <div className="challenge-banner">
          <div className="current-score">
            <h3>CURRENT SCORE</h3>
            <div className="score-box">
              {gameDataFetched ? `${userPoints}pts |  ${ordinalSuffix(userRank)}` : '-'}
            </div>
          </div>
          <div className="time-remaining">
            <h3>CHALLENGE TIME REMAINING</h3>
            <div className="countdown">
              {formatCountdown(countdown).map((timePart, index) => (
                <div
                  key={index}
                  className="countdown-part"
                >
                  <span className="countdown-number" style={{ color: getBackgroundColor() }}>{timePart.split(' ')[0]}</span>
                  <span className="countdown-unit" style={{ color: getBackgroundColor() }}>{timePart.split(' ')[1]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="challenges-completed">
            <h3>CHALLENGES COMPLETED</h3>
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{
                  width: `${(totalCompleted / 12) * 100}%`,
                }}
              ></div>
              <div className="progress-text">
                {gameDataFetched ? `${totalCompleted}/12` : '-'}
              </div>
            </div>
          </div>
        </div>

      </div>

    </>
  )
}

export default ChallengeBanner
