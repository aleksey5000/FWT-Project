function cutLength(word:string){
  if (word.length > 35){
    return `${word.substr(0,33)}...`
  } else {
    return word
  }
}

export default cutLength
  
