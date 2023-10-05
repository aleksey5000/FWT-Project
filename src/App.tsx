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
        <main>
          <div className='filters'>
            <input type="text" placeholder='Name' id = 'Name' />
            <select>
              <option defaultValue={undefined}>Author</option>
            </select>
            <select>
              <option defaultValue={undefined}>Location</option>
            </select>
            <select>
              <option defaultValue={undefined}>Created</option>
            </select>
          </div>
        </main>
        <footer></footer>
      </div>
  )
}

export default App
