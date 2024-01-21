const changeTheme = (state:boolean):boolean => {
  const input = document.querySelectorAll('input')
  const created = document.getElementById('createdForm')
  const from = document.getElementById('from')
  const before = document.getElementById('before')
  const createdButton = document.getElementById('createdButton')
  const buttons = document.querySelectorAll('button')
  const hr = document.querySelector('hr')
  const qlocationParent = document.getElementById('LocationParent')
  const qauthorParent = document.getElementById('authorParent')
  const ul = document.querySelectorAll('ul')
  const location = document.getElementById('Location')
  const author = document.getElementById('Author')
  const qlocationlist = document.getElementById('locationList')
  const qauthorlist = document.getElementById('authorList')
 
  let backgroundColor:string 
  let componentColor:string
  let selectColor:string
  let url:string
  
  state?(
    backgroundColor = 'black',
    componentColor = 'rgba(12,12,12)',
    selectColor = 'white',
    url = "url('../public/Vector_for_dark.svg')"
  ):(
    backgroundColor = 'white',
    componentColor ='white',
    selectColor = 'black',
    url = "url('../public/Vector_for_light.svg')"
  )

  document.body.style.backgroundColor = backgroundColor
  input && input.forEach((e)=>{
    e.style.borderColor = selectColor
    e.style.color = selectColor
    e.style.backgroundColor = componentColor
  })
  ul && ul.forEach((e)=>{
    e.style.color = selectColor
    e.style.backgroundColor = componentColor
  })
  ul && ul.forEach((e)=>{
    e.style.color = selectColor
    e.style.backgroundColor = componentColor
  })
  created && (
    created.style.borderColor = selectColor,
    created.style.backgroundColor = componentColor
    )
  location && (location.style.backgroundImage = url)
  author && (author.style.backgroundImage = url)
  from && (
    from.style.backgroundColor = 'rgb(239, 239, 239)',
    from.style.color = 'black'
  )
  before && (
    before.style.backgroundColor = 'rgb(239, 239, 239)',
    before.style.color = 'black'
  )
    
  qauthorlist && (qauthorlist.style.backgroundColor = componentColor)
  qlocationlist && (qlocationlist.style.backgroundColor = componentColor)
  hr && (hr.style.backgroundColor = selectColor)
  createdButton && (createdButton.style.backgroundImage = url)
  qlocationParent && (qlocationParent.style.borderColor = selectColor)
  qauthorParent && (qauthorParent.style.borderColor = selectColor)
  buttons && buttons.forEach((e)=>{e.style.color = selectColor})

  return !state
}

export default changeTheme