import {useQuery, useQueryClient,QueryKey} from '@tanstack/react-query'
import { useEffect, useState} from 'react'
import TypePics from '../Types/PicsType'
import TypeLocation from '../Types/LocationType'
import TypeAuthor from '../Types/AuthorType'
import axios from 'axios'


const Paintings = (link:string):JSX.Element => {
  const key = `${link}`
  const {data,isSuccess} = useQuery([key],()=> axios.get(link))
  const [paintings, setPaintings] = useState(data?.data)

  useEffect(()=>{setPaintings(data?.data)},[isSuccess,link,data?.data])
  
  const queryClient = useQueryClient()
  const locations = queryClient.getQueriesData<QueryKey & {data:TypeLocation[]}>(['Location data'])[0][1]
  const authors = queryClient.getQueriesData<QueryKey & {data:TypeAuthor[]}>(['Authors data'])[0][1]
  
  const findAuthor = (id:number): string | undefined => {
    if (authors) {
      const author:TypeAuthor|undefined = authors.data.find((elem:TypeAuthor)=>(elem.id == id))
      return author?.name
    }
  }
  const findLocation = (id:number): string | undefined => {
    if (locations) {
      const location:TypeLocation | undefined = locations.data.find((elem:TypeLocation)=>(elem.id == id))
      return location?.location
    } 
  }

  const Pics = ():JSX.Element => {
    if (paintings) {
      if (paintings.length>0){
        return paintings.map((pic:TypePics)=>(
        <div key = {pic.id} className='picBlocks'>
          <img src={`https://test-front.framework.team${pic.imageUrl}`} alt={`${pic.name}`}/>
          <div>
            <h1>{pic.name}</h1><br/>
            <p>
              <span>Author:</span> {findAuthor(pic.authorId)} <br/><br/>
              <span>Created:</span> {pic.created} <br/><br/>
              <span>Location:</span> {findLocation(pic.locationId)}
            </p>
          </div>
        </div>
        ))
      } else {
        return <div>Data not found :\</div>
      }
    }
     else {return <div>Loading...</div>}
  }

  return (
    <Pics/>
  )
}

export default Paintings