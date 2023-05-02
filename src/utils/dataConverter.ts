export function timeConverter(time: number): string {
  const hours = hoursWord(time)
  const minutes = minutesWord(time - Math.floor(time / 3600) * 3600)
  return hours + minutes
}

const manyExample = [0, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19]
const threeExample = [2, 3, 4]

function minutesWord(time: number): string {
  const minutes = `${Math.floor(time / 60)}`

  if (+minutes === 0) {
    return ''
  }

  if (minutes.length === 1 && manyExample.includes(+minutes[0])) {
    return ` ${minutes} минут`
  } else if (minutes.length === 2 && (manyExample.includes(+minutes) || manyExample.includes(+minutes[1]))) {
    return ` ${minutes} минут`
  } else if (minutes.length === 1 && threeExample.includes(+minutes[0])) {
    return ` ${minutes} минуты`
  } else if (minutes.length === 2 && threeExample.includes(+minutes[1])) {
    return ` ${minutes} минуты`
  } else if (minutes.length === 1 && +minutes === 1) {
    return ` ${minutes} минута`
  } else {
    return ` ${minutes} минута`
  }
}

function hoursWord(time: number): string {
  const hours = `${Math.floor(time / 3600)}`

  if (+hours === 0) {
    return ''
  }

  if (hours.length === 1 && manyExample.includes(+hours[0])) {
    return `${hours} часов`
  } else if (hours.length === 2 && (manyExample.includes(+hours) || manyExample.includes(+hours[1]))) {
    return `${hours} часов`
  } else if (hours.length === 1 && threeExample.includes(+hours[0])) {
    return `${hours} часа`
  } else if (hours.length === 2 && threeExample.includes(+hours[1])) {
    return `${hours} часа`
  } else if (hours.length === 1 && +hours === 1) {
    return `${hours} час`
  } else {
    return `${hours} час`
  }
}
