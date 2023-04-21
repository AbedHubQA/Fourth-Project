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
        // const userToken = userTokenFunction()
        const { data } = await axios.get('/api/challenges/sections/')
        setSections(data)
      } catch (error) {
        console.log(error)
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
            <h2>{section.difficulty}</h2>
            {section.themes.map((theme, index) => (
              <Link
                key={index}
                to={`/challenge/${section.difficulty.toLowerCase()}/${theme.name.toLowerCase()}`}
              >
                <button>{theme.name}</button>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </main>
  )  
}

export default ChallengeGrid