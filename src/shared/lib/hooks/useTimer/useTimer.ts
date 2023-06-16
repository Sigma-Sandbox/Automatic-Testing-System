import { useEffect, useMemo, useRef, useState } from 'react'

export enum TimeType {
  MM_SS = 'MM_SS',
  HH_MM_SS = 'HH_MM_SS',
  SS = 'SS',
  HH_MM = 'HH_MM',
}

export const useTimer = (time: number) => {
  const [seconds, setSeconds] = useState<number>(time)
  const timerId = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (seconds <= 0) {
      if (timerId.current !== null) clearInterval(timerId.current)
      timerId.current = null
    }
  }, [seconds])
  const startTimer = () => {
    timerId.current = setInterval(() => {
      setSeconds((prev) => prev - 1)
    }, 1000)
  }

  const stopTimer = () => {
    if (timerId.current !== null) clearInterval(timerId.current)
    timerId.current = null
  }

  const getTime = (typeT: TimeType) => {
    const timeDay = Math.trunc(seconds / (60 * 60 * 24))
    const timeHour = Math.trunc(seconds / (60 * 60))
    const timeMin = Math.trunc(seconds / 60)
    const timeSec = seconds % 60

    const answer = { HH: timeHour, MM: timeMin, SS: timeSec }

    switch (typeT) {
      case TimeType.HH_MM_SS:
        return `${addPrefix(answer.HH)}:${addPrefix(answer.MM - 60 * timeHour)}:${addPrefix(answer.SS)}`
        break
      case TimeType.HH_MM:
        return `${addPrefix(answer.HH)}:${addPrefix(answer.MM - 60 * timeHour)}`
        break
      case TimeType.MM_SS:
        return `${addPrefix(answer.MM)}:${addPrefix(answer.SS)}`
        break
      case TimeType.SS:
        return `${addPrefix(seconds)}`
        break
    }
  }
  const setNewTime = (seconds: number) => {
    stopTimer()
    setSeconds(seconds)
  }
  const addPrefix = (num: number) => {
    if (num > 9) {
      return `${num}`
    } else {
      return `0${num}`
    }
  }

  return [seconds, { startTimer, stopTimer, getTime, setNewTime }] as const
}
