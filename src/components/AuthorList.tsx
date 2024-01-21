import {useQuery} from '@tanstack/react-query'
import Queries from '../services/queryToAPI'
import TypeAuthor from '../Types/AuthorType'
import { useEffect, useState,useContext} from 'react'
import cutLength from '../services/cutLength'
import liHover from '../services/liHover'
import { QueryContext } from '../services/queryContex'

const AuthorList = (light:boolean):JSX.Element =>{
  const {data,isSuccess} = useQuery(['Authors data'],()=> Queries.getAuthor())
  const [authors, setAuthors] = useState(data?.data)
  useEffect(()=>setAuthors(data?.data),[isSuccess,data?.data])

  const {context, setContext} = useContext(QueryContext)

  let fieldstate:string|undefined 
  const [auField, setAuField] = useState(fieldstate)
  const [prevValue, setPrevValue] = useState(fieldstate)

  const qauthor = document.getElementById('Author')
  const qauthorlist = document.getElementById('authorList')
  const qauthorParent = document.getElementById('authorParent')
  const notAuFound = document.getElementById('notAuFound')
  const isNotFound = (!prevValue?.includes(`${auField}`.slice(0,33)))

  const aumanipulate = ([ln,lnlst,nfd]:[string,number,string]) => {
    qauthor && (qauthor.style.borderBottom = ln)
    qauthorlist && (qauthorlist.style.height = `${lnlst}px`)
    qauthorParent && (qauthorParent.style.height = `${45+lnlst}px`)
    notAuFound && (notAuFound.style.display = nfd)
  }

  const aufunc = ()=>{
    (`${auField}`.slice(0,33)==prevValue || !auField) && 
      aumanipulate(['none',0,'none'])
  }

  window.onclick = aufunc

  const openAuList = () =>{
    if (!prevValue && !auField) {setAuField('')}
    setTimeout(()=>{
      if (`${prevValue}`.slice(0,33)==auField?.slice(0,33) || !auField){
        setAuField(undefined)
        aumanipulate(['1px solid grey',315,'none'])
      }
    },0)
  }

  const Option = function():JSX.Element|undefined {
    if (authors) {
      if (!auField) {
        return (
          authors.map((author:TypeAuthor)=>
          (<li 
            key = {author.id} 
            onMouseOver={(e)=>{light?liHover(e,'black','white'):liHover(e,'white','black')}}
            onMouseOut={(e)=>{light?liHover(e,'transparent','black'):liHover(e,'transparent','white')}}
            onClick={()=>{
              setPrevValue(author.name)
              setAuField(cutLength(author.name))
              aumanipulate(['none',0,'none'])
              context.authorId = author.id
              setContext(context)
            }}>
            {cutLength(author.name)}
          </li>
          ))
        )
      } else {
        aumanipulate(['none',0,'none'])
          if (auField!=prevValue) {
            const filteredAuthors = authors.filter((item:TypeAuthor)=>item.name.includes(auField))
            if (filteredAuthors.length) {
              (filteredAuthors.length < 7)?
                aumanipulate(['1px solid grey',filteredAuthors.length*45,'none']):
                aumanipulate(['1px solid grey',315,'none'])
              return (
                filteredAuthors.map((filteredAuthor:TypeAuthor)=>(
                  <li 
                  key = {filteredAuthor.id} 
                  onMouseOver={(e)=>{light?liHover(e,'black','white'):liHover(e,'white','black')}}
                  onMouseOut={(e)=>{light?liHover(e,'transparent','black'):liHover(e,'transparent','white')}}
                  onClick={()=>{
                    setAuField(cutLength(filteredAuthor.name))
                    setPrevValue(filteredAuthor.name)
                    context.authorId = filteredAuthor.id
                    setContext(context)
                  }}>
                  {cutLength(filteredAuthor.name)}
                  </li>
                ))
              )
            } else {
              if (isNotFound){
                notAuFound && (
                  aumanipulate(['1px solid grey',0,'block']),
                  qauthorParent && (qauthorParent.style.height = `93px`)
                )
              } 
            } 
          } else {
            aumanipulate(['none',0,'none'])
          }
      }  
    } else {
      return <option>Loading...</option>
    }
  } 

  return (
    <div id = 'authorParent' className='authorParent'>
      <input 
        type="text"  
        id = 'Author' 
        value = {auField} 
        defaultValue='Authors' 
        placeholder='Authors'
        onClick={openAuList} 
        onChange={(e)=>{
          setAuField(cutLength(e.target.value))
          if (!e.target.value) {
            aumanipulate(['1px solid grey',315,'none'])
            context.authorId = 0
            setContext(context)
          }
        }}
      />
      <div className='authorList' id = 'authorList'>
        <ul>
          <Option/>
        </ul>
      </div>
      <div className='notFound' id = 'notAuFound'>
        Author not found 
      </div>
    </div>
    )
}

export default AuthorList