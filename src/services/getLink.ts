import { queryObj } from "../Types/queryType"

const getLink = (cont:queryObj):string => {
  const link = 'https://test-front.framework.team/paintings'
  const filtCouples = []
  let result = ''
  const clone = {
    'name_like': '',
    'authorId':0,
    'locationId': 0,
    'created_gte': -1,
    'created_lte': 2055
  }
  const a = Object.entries(cont)
  const b = Object.entries(clone)
  for (let i = 0; i < Object.values(cont).length;i++) {
    if (a[i][1] != b[i][1]){
      filtCouples.push(a[i])
    }
  }
  if (filtCouples.length > 0) {
    result = filtCouples.reduce((sum,current)=>{
      return sum+current[0].toString()+'='+current[1].toString()+'&'
    },`${link}?`)
  } else { result = `${link}?` }
  return result
  }

export default getLink