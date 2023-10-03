import './App.scss'
import {useState} from 'react'
import changeTheme from './services/changeTheme'
import SunLogo from './services/changeSunLogo'

function App() {
  
  let isLight:boolean = true
  let [sunState, setSunState] = useState(isLight)

  return (
      <div className='container'>
        <header>
          <div className='logo'>
            <img src="../public/logo.svg" alt=""/>
          </div>
          <div>
            <button onClick={() => {
                let isLight = changeTheme(sunState)
                setSunState(isLight)
              }}>
                {SunLogo(sunState)} 
            </button>
          </div>
        </header>
        <main></main>
        <footer></footer>
      </div>
  )
}

export default App
