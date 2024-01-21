import {useQuery} from '@tanstack/react-query'
import Queries from '../services/queryToAPI'
import TypeLocation from '../Types/LocationType'
import { useEffect, useState, useContext} from 'react'
import cutLength from '../services/cutLength'
import liHover from '../services/liHover'
import { QueryContext } from '../services/queryContex'


const LocationList = (light:boolean):JSX.Element =>{
  const {data,isSuccess} = useQuery(['Location data'],()=> Queries.getLocation())
  const [locations, setLocations] = useState(data?.data)
  useEffect(()=>setLocations(data?.data),[isSuccess,data?.data])

  const {context, setContext} = useContext(QueryContext)

  let fieldstate:string|undefined
  const [locField, setLocField] = useState(fieldstate)
  const [prevValue, setPrevValue] = useState(fieldstate)
  const isNotFound = (!prevValue?.includes(`${locField}`.slice(0,33)))

  const qlocation = document.getElementById('Location')
  const qlocationlist = document.getElementById('locationList')
  const notFound = document.getElementById('notFound')
  const qlocationParent = document.getElementById('LocationParent')


  const manipulate = ([ln,lnlst,nfd]:[string,number,string]) => {
    qlocation && (qlocation.style.borderBottom = ln)
    qlocationlist && (qlocationlist.style.height = `${lnlst}px`)
    qlocationParent && (qlocationParent.style.height = `${45+lnlst}px`)
    notFound && (notFound.style.display = nfd)
  }

  const func = () => {
    (`${locField}`.slice(0,33)==prevValue || !locField) && 
    manipulate(['none',0,'none'])
  }
  
  document.onclick = func

  const openLocList = () =>{
    if (!prevValue && !locField) {setLocField('')}
    setTimeout(()=>{
      if (`${prevValue}`.slice(0,33)==locField?.slice(0,33) || !locField){
        setLocField(undefined)
        manipulate(['1px solid grey',315,'none'])}
    },0)
  }

  const LocationOption = function():JSX.Element|undefined {
    if (locations) {
      if (!locField) {
        return (
          locations.map((location:TypeLocation)=>
          (<li 
            key = {location.id} 
            onMouseOver = {(e)=>{light?liHover(e,'black','white'):liHover(e,'white','black')}}
            onMouseOut = {(e)=>{light?liHover(e,'transparent','black'):liHover(e,'transparent','white')}}
            onClick={()=>{
              setPrevValue(location.location)
              setLocField(cutLength(location.location))
              manipulate(['none',0,'none'])
              context.locationId=location.id
              setContext(context)
            }}>
            {cutLength(location.location)}
          </li>
          ))
        )
      } else {
          manipulate(['none',0,'none'])
          if (locField!=prevValue) {
            const filteredLocations = locations.filter((item:TypeLocation)=>item.location.includes(locField))
            if (filteredLocations.length) {
              (filteredLocations.length < 7)?
                manipulate(['1px solid grey',filteredLocations.length*45,'none']):
                manipulate(['1px solid grey',315,'none'])
              return (
                filteredLocations.map((filteredLocation:TypeLocation)=>(
                  <li 
                  key = {filteredLocation.id} 
                  onMouseOver={(e)=>{light?liHover(e,'black','white'):liHover(e,'white','black')}}
                  onMouseOut={(e)=>{light?liHover(e,'transparent','black'):liHover(e,'transparent','white')}}
                  onClick={()=>{
                    setLocField(cutLength(filteredLocation.location))
                    setPrevValue(filteredLocation.location)
                    context.locationId=filteredLocation.id
                    setContext(context)
                  }}>
                  {cutLength(filteredLocation.location)}
                  </li>
                ))
              )
            } else {
              if (isNotFound){
                notFound?(
                  manipulate(['1px solid grey',0,'block']),
                  qlocationParent && (qlocationParent.style.height = `90px`)
                ):undefined
              } 
            } 
          } else {
            manipulate(['none',0,'none'])
          }
      }  
    } else {
      return <option>Loading...</option>
    }
  } 

  return (
    <div id = 'LocationParent' className='LocationParent'>
      <input 
        type="text"  
        id = 'Location' 
        value = {locField} 
        defaultValue='Location' 
        placeholder='Location'
        onClick={openLocList} 
        onChange={(e)=>{
          setLocField(cutLength(e.target.value))
          if (!e.target.value) {
            manipulate(['1px solid grey',315,'none'])
            context.locationId=0
            setContext(context)
          }
        }}
      />
      <div className='locationList' id = 'locationList' >
        <ul>
          <LocationOption/>
        </ul>
      </div>
      <div className='notFound' id = 'notFound'>
        Location not found 
      </div>
    </div>
    )
}

export default LocationList