import { Link } from 'react-router-dom'
import { authenticatedUser } from '../../helpers/auth'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { userTokenFunction } from '../../helpers/auth'

const ChallengeGrid = () => {

  const [sections, setSections] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const getSections = async () => {
      try {
        const { data } = await axios.get('/api/challenges/sections/')
        setSections(data)
      } catch (error) {
        setError(error.response.data.detail)
      }
    }
    getSections()
  }, [])


  return (
    <main className='challenges-leaderboard'>
      <div className="overall-container">
        {sections.map((section, index) => (
          <div key={index} className={`${section.difficulty.toLowerCase()}-container`}>
            <div className="title-challenge">
              <h2>{section.difficulty} Challenges</h2>
            </div>
            <div className="section-buttons">
              {section.themes.map((theme, index) => (

                <Link
                  key={index}
                  to={`/challenge/${section.difficulty.toLowerCase()}/${theme.name.toLowerCase()}`}
                >
                  <button className="challenge-button">
                    <span>{theme.name}</span>
                  </button>
                </Link>

              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default ChallengeGrid