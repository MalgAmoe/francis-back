const shuffleArray = (array) => {
  const newArray = [].concat(array)
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = newArray[i]
    newArray[i] = newArray[j]
    newArray[j] = temp
  }
  return newArray
}

module.exports = {
  shuffleArray
}
