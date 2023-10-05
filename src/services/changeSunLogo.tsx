const SunLogo = (state:boolean):JSX.Element => {
  let theme, theme_rus
  
  if (state) {
    theme = 'dark'
    theme_rus = 'ночная'
  } else {
    theme = 'light'
    theme_rus = 'дневная'
  }
  
  return <img src = {`../public/sun_${theme}.svg`} alt={`${theme_rus} тема`}/>
}

export default SunLogo