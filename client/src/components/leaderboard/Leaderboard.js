import { Link } from 'react-router-dom'
import { authenticatedUser } from '../../helpers/auth'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { userTokenFunction } from '../../helpers/auth'
import Avatar from '@mui/material/Avatar'


const Leaderboard = () => {

  function stringToColor(string) {
    let hash = 0
    let i

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff
      color += `00${value.toString(16)}`.slice(-2)
    }

    return color
  }

  function stringAvatar(name) {
    const names = name.split(' ')
    let children = ''
    if (names.length === 1) {
      children = `${name[0]}`
    } else {
      children = `${names[0][0]}${names[1][0]}`
    }
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children,
    }
  }

  const [leaderboard, setLeaderboard] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const getLeaderboard = async () => {
      try {
        const { data } = await axios.get('/api/leaderboard/')
        setLeaderboard(data)
      } catch (error) {
        setError(error.response.data.detail)
      }
    }
    getLeaderboard()
  }, [])


  return (
    <div className='leaderboard-panel'>
      <div className='header'>
        <div className='rank'>Rank</div>
        <div className='avatar-space'></div>
        <div className='name-header'>Name</div>
        <div className='score'>Score</div>
      </div>
      {leaderboard.map((entry, index) => {
        const { id, user: { username }, total_points } = entry
        return (
          <div key={id} className='leaderboard-entry'>
            <div className='rank'>{index + 1}</div>
            <div className='name-avatar'>
              <Avatar className='avatar-leaderboard' {...stringAvatar(username)} />
            </div>
            <div className='name-username'>
              {username}
            </div>
            <div className='score'>{total_points}</div>
          </div>
        )
      })}
    </div >
  )
}

export default Leaderboard