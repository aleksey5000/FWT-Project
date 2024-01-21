import {useContext,useState} from 'react'
import openCloseList from '../services/openOrCloseCreatedInput'
import { QueryContext } from '../services/queryContex'
import { queryObj } from '../Types/queryType'

const CreatedList = (context:queryObj):JSX.Element => {
  let frm:number = -1
  let bfr:number = 2055
  let fromForm:number|undefined
  let beforeForm:number|undefined
  const [,setFrom] = useState(fromForm)
  const [,setBefore] = useState(beforeForm)
  let closed = true
  const fromImp = document.getElementById('from')
  const beforeImp = document.getElementById('before')
  const {setContext} = useContext(QueryContext)

  return (
    <div className="wholeCreatedInput" id = "createdForm">
      <button id='createdButton' onClick={()=>{
        const created = openCloseList(closed)
        closed = created
        }
      }>
        Created
      </button>
      <div className ='inputs' id = 'inputs'>
        <input 
        type="text" 
        placeholder='from' 
        id = 'from'
        onBlur={(e)=>{
          if (!!Number(e.target.value) && Number(e.target.value)>-1){
            context.created_gte = Number(e.target.value)
            setContext(context)
            setFrom(fromForm)
          } else {
            context.created_gte = -1
            setContext(context)
            setFrom(undefined)
          }
        }}
        onChange = {(e) => {
          !fromForm && (frm = -1, fromForm = -1);
          (!!Number(e.target.value) && Number(e.target.value)>-1)?
            (
              fromImp && (fromImp.style.backgroundColor = 'rgb(239, 239, 239)'),
              fromForm = Number(e.target.value),
              frm = fromForm
            ):(
              fromImp && (fromImp.style.backgroundColor = '#fde8e8'),
              frm = -1,
              setFrom(undefined),
              !e.target.value && fromImp && (fromImp.style.backgroundColor = 'rgb(239, 239, 239)')
            )
        }}
        onKeyDown={(e)=>{
          if (e.key == 'Enter'){
            frm?(context.created_gte = frm):(context.created_gte = -1)
            setContext(context)
            setFrom(fromForm)
            fromImp?.blur()
          }
        }}
        />
        <hr/>
        <input 
        type="text" 
        placeholder='before' 
        id = 'before'
        onFocus={(e)=>{(!!Number(e.target.value) && Number(e.target.value)>0) && (beforeForm = Number(e.target.value))}}
        onBlur={(e)=>{
          if (!!Number(e.target.value) && Number(e.target.value)>-1){
            context.created_lte=Number(e.target.value)
            setContext(context)
            setBefore(beforeForm)
          } else {
            context.created_lte=2055
            setContext(context)
            setBefore(undefined)
          }
        }}
        onChange = {(e) => {
          (!!Number(e.target.value) && Number(e.target.value)>-1 && Number(e.target.value) >= frm)?
            (
              beforeImp && (beforeImp.style.backgroundColor = 'rgb(239, 239, 239)'),
              beforeForm = Number(e.target.value),
              bfr = beforeForm
            ):(
              beforeImp && (beforeImp.style.backgroundColor = '#fde8e8'),
              bfr = 2055,
              setBefore(undefined),
              !e.target.value && beforeImp && (beforeImp.style.backgroundColor = 'rgb(239, 239, 239)')
            )
        }}
        onKeyDown={(e)=>{
          if (e.key == 'Enter'){
            bfr?(context.created_lte=bfr):(context.created_lte=2055)
            setContext(context)
            setBefore(beforeForm)
            beforeImp?.blur()
          }
        }}
        />
      </div>
    </div>
  )
}

export default CreatedList