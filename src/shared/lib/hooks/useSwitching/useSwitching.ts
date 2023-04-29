import {useEffect, useMemo, useState} from 'react'

export const useSwitching = () => {
  const [isSwitch, setIsSwitch] = useState<boolean>(false)

  const turnOnSwitching = () => {
    setIsSwitch(true)
    setTimeout(() => setIsSwitch(false), 300)
  }

  return [isSwitch, turnOnSwitching] as const
}
