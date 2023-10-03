const changeTheme = (state:boolean):boolean => {
  if (state) {
    document.body.style.backgroundColor = 'black'
    state = false
  }
  else {
    document.body.style.backgroundColor = 'white'
    state = true
  }
  return state
}

export default changeTheme