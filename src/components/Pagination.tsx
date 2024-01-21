import {useQuery} from '@tanstack/react-query'
import  {useState,useContext,useEffect} from 'react'
import Paintings from './Paintings'
import liHover from '../services/liHover'
import arrow from '../services/arrows'
import arrL from './arrleft_disable'
import arr2L from './2arrleft_disable'
import { QueryContext } from '../services/queryContex'
import getLink from '../services/getLink'
import axios from 'axios'

const Pagination = (light:boolean):JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pages, setPages] = useState([1])
  const [lastPage,setLastPage]=useState(1)
  const {context} = useContext(QueryContext)
  const link = getLink(context)+`_page=${currentPage}&_limit=12`
  const fullLink = getLink(context)

  const {data,isSuccess} = useQuery([fullLink],()=>axios.get(fullLink))
  useEffect(()=>{setCurrentPage(1);setLastPage(Math.ceil(data?.data.length/12))},[isSuccess,fullLink,data?.data.length])
  
  if (lastPage > 1 && pages.length == 1) {
    if (lastPage == 2) {
      setPages([1,2])
    } else {
      setPages([1,2,3])
    }
  }

  const Pages = () =>{
    let stl:object
    let crnStl:object
    (light)?(
      stl={
        'color': 'black',
        'border': '1px solid black', 
        'border-left': 'none'
      },
      crnStl={
        'background-color':'black',
        'color':'white'
      }
    ):(
      stl={
        'color': 'white',
        'border': '1px solid white',
        'border-left': 'none'
      },
      crnStl={
        'background-color':'white',
        'color':'black'
      }
    )

    return (
      pages.map((bttn)=>(
        <button 
        key = {bttn} 
        id = {`pageN ${bttn}`}
        style={(bttn == currentPage)?crnStl:stl}
        onClick = {()=>{
          setCurrentPage(bttn)
        }}
        onMouseOver = {(e)=>{
          if (bttn !=currentPage) {
            light?
              liHover(e,'rgba(237,237,237,0.75)','black'):
              liHover(e,'rgba(237,237,237,0.75)','white')
          }
        }}
        onMouseOut = {(e)=>{
          if (bttn !=currentPage) {
            light?
              liHover(e,'transparent','black'):
              liHover(e,'transparent','white')
          }
        }}
        >
          {bttn}
        </button>
      ))
    )
  }

  arrow(light,currentPage,lastPage)
  
  return (
    <>
    <div className='pics'>
      <div id = 'Paintings' className='blocks'>
        {Paintings(link)}
      </div>
      <div className='pagination'>
        <button 
          className='twoArrLeft' 
          id = 'arrleft2' 
          onClick={()=>{
            (currentPage != 1) && (
             setCurrentPage(1),
              (lastPage != 2)?setPages([1,2,3]):(setPages([1,2]))
            )
          }}
        >
          {arr2L(light, 'arr2L')}
        </button>
        <button 
          className='arrLeft' 
          id = 'arrleft' 
          onClick={()=>{
            if (currentPage != 1) {
              setCurrentPage(currentPage - 1)
              if (currentPage >= 3 && (currentPage < lastPage)) {setPages([currentPage-2,currentPage-1,currentPage])}
           }
          }}
        >
          {arrL(light,'arrL')}
        </button>
        <Pages/>
        <button 
          className='arrRight' 
          id = 'arrright' 
          onClick={()=>{
            if (currentPage != lastPage) {
              setCurrentPage(currentPage+1)
              if (currentPage >= 2 && (currentPage < lastPage-1)) {setPages([currentPage,currentPage+1,currentPage+2])}
            }
          }}
        >
          {arrL(light,'arrR')}
        </button>
        <button 
          className='twoArrRight' 
          id = 'arrright2' 
          onClick={()=>{
            (currentPage != lastPage) && (
            setCurrentPage(lastPage),
            (lastPage != 2)?setPages([lastPage-2,lastPage-1,lastPage]):(setPages([1,2]))
            )
          }}
        >
          {arr2L(light, 'arr2R')}
        </button>
      </div>
    </div></>
  )
}

export default Pagination