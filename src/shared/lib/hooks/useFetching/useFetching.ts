import React, {useEffect, useState} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './useFetching.module.scss'
import axios from 'axios'
import {request} from 'http'

interface useFetchingProps {
  urlProps: string | null
  bodyProps?: {}
}

export const useFetching = (props: useFetchingProps) => {
  const {urlProps, bodyProps} = props
  const [requestOptions, setRequestOptions] = useState<{url: string | null; body?: {} | undefined}>(
    {
      url: urlProps,
      body: bodyProps,
    }
  )
  const [data, setData] = useState()
  const [isError, setIsError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      if (!requestOptions.url) return
      setIsError(false)
      setIsLoading(true)
      try {
        if (requestOptions.body) {
          const result = await axios.post(requestOptions.url, requestOptions.body)
          setData(result.data)
        } else {
          const result = await axios.get(requestOptions.url)
          setData(result.data)
        }
      } catch (error) {
        console.log(error)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [requestOptions])

  return [{data, isLoading, isError}, setRequestOptions] as const
}
