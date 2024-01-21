import './App.scss'
import {useState} from 'react'
import changeTheme from './services/changeTheme'
import SunLogo from './services/changeSunLogo'
import AuthorList from './components/AuthorList'
import LocationList from './components/LocationList'
import CreatedList from './components/CreatedList'
import Pagination from './components/Pagination'
import paintings from './services/paintings'
import { QueryContext } from './services/queryContex'

function App() {
  const [sunState, setSunState] = useState(true)
  
  let nameField:string|undefined
  const [,setName] = useState(nameField)
  const [context,setContext] = useState(paintings)
  let form:string
  const inp = document.getElementById('Name')

  return (
    <QueryContext.Provider value={{context,setContext}}>
      <div className='container'>
        <header>
          <div className='logo'>
            <img src="../public/logo.svg" alt=""/>
          </div>
          <div>
            <button onClick={() => {
                const sun = changeTheme(sunState)
                setSunState(sun)
              }}>
                {SunLogo(sunState)} 
            </button>
          </div>
        </header>
        <main>
          <div className='filters'>
            <div className='theFirstInput'>
              <input 
                type="text" 
                placeholder='Name' 
                id = 'Name' 
                className = 'firstInput'
                onBlur={(e) => {
                  if (e.target.value){
                    context.name_like = e.target.value
                    setContext(context)
                    setName(e.target.value)
                  } else {
                    context.name_like = ''
                    setContext(context)
                    setName(undefined) 
                  }
                }}
                onChange = {(e) => {e.target.value?(form = e.target.value):(form='')}}
                onKeyDown={(e) => {
                  if (e.key == 'Enter'){
                    setName(form)
                    form?(context.name_like = form):(context.name_like = '')
                    setContext(context)
                    inp?.blur()
                  }
                }}
              />
            </div>
            {AuthorList(sunState)}
            {LocationList(sunState)}
            {CreatedList(context)}
          </div>
          {Pagination(sunState)}
        </main>
      </div>
    </QueryContext.Provider>  
  )
}

export default App
