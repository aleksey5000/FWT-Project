const openCloseList = (state:boolean):boolean => {
  const createdForm = document.getElementById('createdForm')
  const inputs = document.getElementById('inputs')
  const windowWidth = window.innerWidth
  let height:string
  let display:string
 
  state?(
    (windowWidth>1024)?(height = '130px'):(height = '190px'),
    display = 'flex'
    ):(
    height = '45px',
    display = 'none'
    )

  createdForm && (createdForm.style.height = height)
  inputs && (inputs.style.display = display)
  
  return !state
}
export default openCloseList