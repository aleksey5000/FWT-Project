import React from 'react'
import paintings from './paintings'
import {queryType} from '../Types/queryType'

const props = {context:paintings,setContext: ()=>{} }
const QueryContext = React.createContext<queryType>(props)

export  {QueryContext}