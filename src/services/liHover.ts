const liHover = (e: React.MouseEvent<HTMLElement, MouseEvent>,back:string,clr:string) => {
  const a: Partial<HTMLElement> = e.target
  if (a.style){
    return (
      a.style.backgroundColor = back,
      a.style.color = clr
    )
  }
}

export default liHover