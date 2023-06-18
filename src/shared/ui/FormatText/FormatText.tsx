export const FormatText = (text: string) => {
  console.log(text)
  const textArr = text.split('\\n')

  const returnAns = []

  for (let i = 0; i < textArr.length; i++) {
    if (i === 0) {
      returnAns.push(textArr[i])
      continue
    } else {
      returnAns.push(<br />)
      returnAns.push(textArr[i])
    }
  }

  return returnAns
}
