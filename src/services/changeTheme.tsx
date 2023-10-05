const changeTheme = (state:boolean):boolean => {
  let input = document.querySelector('input')
  let select = document.querySelectorAll('select')
  let backgroundColor:string, selectColor:string, url:string
  let errorMessage = new Error("Can't find tags <input> or <select>")

  state?(
    backgroundColor = 'black',
    selectColor = 'white',
    url = "url('../public/Vector_for_dark.svg')",
    state = false
  ):(
    backgroundColor = 'white',
    selectColor = 'black',
    url = "url('../public/Vector_for_light.svg')",
    state = true
  )

    document.body.style.backgroundColor = backgroundColor
    input?input.style.borderColor = selectColor:errorMessage
    select?select.forEach((e)=>e.style.borderColor = selectColor):errorMessage
    select?select.forEach((e)=>e.style.color = selectColor):errorMessage
    select?select.forEach((e)=>e.style.backgroundImage = url):errorMessage
  
  return state
}

export default changeTheme