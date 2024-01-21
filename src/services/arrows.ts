const arrow = (state: boolean, currentPage:number, lastPage:number) => {
  const arrLeft2 = document.getElementById('arrleft2')
  const arrLeft = document.getElementById('arrleft')
  const arrRight = document.getElementById('arrright')
  const arrRight2 = document.getElementById('arrright2')
  const arr2L = document.getElementById('arr2L')
  const arrL = document.getElementById('arrL')
  const arrR = document.getElementById('arrR')
  const arr2R = document.getElementById('arr2R')

  let color:string
  state?(color = 'black'):(color = 'white')

  if (currentPage==1 && lastPage!=1) {
    arr2L && (arr2L.setAttribute('fill-opacity','0.3'))
    arrL && (arrL.setAttribute('fill-opacity','0.3'))
    arrR && (arrR.setAttribute('fill-opacity','1'))
    arr2R && (arr2R.setAttribute('fill-opacity','1'))
    arrLeft2 && (
      arrLeft2.style.cursor = 'default',
      arrLeft2.style.border = '1px solid grey',
      arrLeft2.style.borderRight = 'none'
    )
    arrLeft && (
      arrLeft.style.cursor = 'default',
      arrLeft.style.border = '1px solid grey'
    )
    arrRight && (
      arrRight.style.border = `1px solid ${color}`,
      arrRight.style.borderRight = 'none',
      arrRight.style.cursor = 'pointer'
    )
    arrRight2 && (
      arrRight2.style.border = `1px solid ${color}`,
      arrRight2.style.borderRight = 'none',
      arrRight2.style.cursor = 'pointer'
    )
  } else if (currentPage == lastPage && lastPage!=1) {
    arr2L && (arr2L.setAttribute('fill-opacity','1'))
    arrL && (arrL.setAttribute('fill-opacity','1'))
    arrR && (arrR.setAttribute('fill-opacity','0.3'))
    arr2R && (arr2R.setAttribute('fill-opacity','0.3'))
    arrLeft2 && (
      arrLeft2.style.border = `1px solid ${color}`,
      arrLeft2.style.borderRight = 'none',
      arrLeft2.style.cursor = 'pointer'
    )
    arrLeft && (
      arrLeft.style.border = `1px solid ${color}`,
      arrLeft.style.cursor = 'pointer'
    )
    arrRight && (
      arrRight.style.cursor ='default',
      arrRight.style.border = '1px solid grey',
      arrRight.style.borderRight = 'none'
    )
    arrRight2 && (
      arrRight2.style.cursor ='default',
      arrRight2.style.border = '1px solid grey',
      arrRight2.style.borderRight = 'none'
    )
  } else if (lastPage == 1) {
    arr2L && (arr2L.setAttribute('fill-opacity','0.3'))
    arrL && (arrL.setAttribute('fill-opacity','0.3'))
    arrR && (arrR.setAttribute('fill-opacity','0.3'))
    arr2R && (arr2R.setAttribute('fill-opacity','0.3'))
    arrLeft2 && (
      arrLeft2.style.border = '1px solid grey',
      arrLeft2.style.borderRight = 'none',
      arrLeft2.style.cursor = 'default'
    )
    arrLeft && (
      arrLeft.style.border = '1px solid grey',
      arrLeft.style.cursor = 'default'
    )
    arrRight && (
      arrRight.style.border = '1px solid grey',
      arrRight.style.borderRight = 'none',
      arrRight.style.cursor = 'default'
    )
    arrRight2 && (
      arrRight2.style.border = '1px solid grey',
      arrRight2.style.borderRight = 'none',
      arrRight2.style.cursor = 'default'
    )
  } else {
    arr2L && (arr2L.setAttribute('fill-opacity','1'))
    arrL && (arrL.setAttribute('fill-opacity','1'))
    arrR && (arrR.setAttribute('fill-opacity','1'))
    arr2R && (arr2R.setAttribute('fill-opacity','1'))
    arrLeft2 && (
      arrLeft2.style.border = `1px solid ${color}`,
      arrLeft2.style.borderRight = 'none',
      arrLeft2.style.cursor = 'pointer'
    )
    arrLeft && (
      arrLeft.style.border = `1px solid ${color}`,
      arrLeft.style.cursor = 'pointer'
    )
    arrRight && (
      arrRight.style.border = `1px solid ${color}`,
      arrRight.style.borderRight = 'none',
      arrRight.style.cursor = 'pointer'
    )
    arrRight2 && (
      arrRight2.style.border = `1px solid ${color}`,
      arrRight2.style.borderRight = 'none',
      arrRight2.style.cursor = 'pointer'
    )
  }
}

export default arrow