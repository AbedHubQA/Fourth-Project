import { Link } from 'react-router-dom'
import { authenticatedUser } from '../../helpers/auth'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { userTokenFunction } from '../../helpers/auth'
import GameContext from '../../GameContext'


const ChallengeGrid = () => {

  const { game, sections, sectionsStatus } = useContext(GameContext)

  return (
    <main className='challenges-leaderboard'>
      <div className="overall-container">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className={`${section.difficulty.toLowerCase()}-container`}>
            <div className="title-challenge">
              <h2>{section.difficulty} Challenges</h2>
            </div>
            <div className="section-buttons">
              {section.themes.map((theme, index) => (
                <Link style={{ pointerEvents: sectionsStatus.length > 0 ? sectionsStatus[sectionIndex].themes[index].is_completed ? 'none' : 'auto' : 'none' }}
                  key={index}
                  to={`/challenge/${section.difficulty.toLowerCase()}/${theme.name.toLowerCase()}`}
                >
                  <button className={`challenge-button ${sectionsStatus.length > 0 ? (sectionsStatus[sectionIndex].themes[index].is_completed ? 'completed' : 'active') : 'locked'}`}
                    disabled={sectionsStatus.length > 0 ? sectionsStatus[sectionIndex].themes[index].is_completed : true}>
                    <span>
                      {theme.name}
                    </span>
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


// <main className='challenges-leaderboard'>
//   <div className="overall-container">
//     {sectionsStatus.length > 0 && sectionsStatus.map((section, index) => (
//       <div key={index} className={`${section.difficulty.toLowerCase()}-container`}>
//         <div className="title-challenge">
//           <h2>{section.difficulty} Challenges</h2>
//         </div>
//         <div className="section-buttons">
//           {section.themes.map((theme, index) => (
//             <Link
//               key={index}
//               to={`/challenge/${section.difficulty.toLowerCase()}/${theme.name.toLowerCase()}`}
//             >
//               <button className={`challenge-button ${theme.is_completed ? 'completed' : 'playable'}`} disabled={theme.is_completed}>
//                 <span style={{ pointerEvents: theme.is_completed ? 'none' : 'auto' }}>
//                   {theme.name}
//                 </span>
//               </button>
//             </Link>
//           ))}
//         </div>
//       </div>
//     ))}
//   </div>
// </main>