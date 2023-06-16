import React, { useEffect, useMemo, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './TaskTest.module.scss'
import { all } from 'axios'
import { Button, ColorButton, SizeButton } from 'shared/ui/Button/Button'

interface TaskTestItemProps {
  className?: string
  descript: string
  wrongAnswers: string[]
  correctAnswers: string[]
  nextQuestion: (selectedItems: string[], result: boolean) => void
  calcTransform: string
}

export const TaskTestItem: React.FC<TaskTestItemProps> = (props) => {
  const { className = '', descript, correctAnswers, wrongAnswers, nextQuestion, calcTransform } = props

  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const addSelectedItems = (newItem: string) => {
    const newState = [...selectedItems, newItem]
    setSelectedItems(newState)
  }

  const removeSelectedItems = (delItem: string) => {
    const newState = selectedItems.filter((item) => item !== delItem)
    setSelectedItems(newState)
  }

  const handlerItems = (item: string) => {
    if (correctAnswers.length === 1) {
      setSelectedItems([item])
      return
    }
    if (selectedItems.includes(item)) {
      removeSelectedItems(item)
    } else {
      addSelectedItems(item)
    }
  }

  const createAllItem = useMemo(() => {
    const copyRightAns = correctAnswers.slice()
    const copyWrongAns = wrongAnswers.slice()
    const countAllAnswer = wrongAnswers.length + correctAnswers.length
    let allItem: string[] = []
    for (let i = 0; i < countAllAnswer; i++) {
      if (copyRightAns.length === 0 || copyWrongAns.length === 0) {
        allItem = [...allItem, ...copyRightAns, ...copyWrongAns]
        break
      } else {
        if (Math.random() > 0.5) {
          const newElem = copyRightAns.pop()
          newElem && allItem.push(newElem)
        } else {
          const newElem = copyWrongAns.pop()
          newElem && allItem.push(newElem)
        }
      }
    }

    return allItem
  }, [])

  const itemOptions = useMemo(() => {
    const allItems = createAllItem
    return allItems.map((item, index) => {
      return (
        <label key={`${index} ${selectedItems.includes(item)}`}>
          <input
            type={correctAnswers.length > 1 ? 'checkbox' : 'radio'}
            checked={selectedItems.includes(item)}
            value={item}
            onChange={() => handlerItems(item)}
            name="testUser"
          />

          {item}
        </label>
      )
    })
  }, [createAllItem, selectedItems])
  return (
    <div className={classNames(cls.taskTestItem, {}, [className])} style={{ transform: calcTransform }}>
      <div className={classNames(cls.itemDescr)}>{descript}</div>

      <div className={classNames(cls.itemOptions)}>{itemOptions}</div>

      {selectedItems.length > 0 && (
        <Button
          className={classNames(cls.itemButton)}
          color={ColorButton.SECONDARY_COLOR}
          size={SizeButton.L}
          onClick={() =>
            nextQuestion(
              selectedItems,
              JSON.stringify(selectedItems.sort()) === JSON.stringify(correctAnswers.slice().sort())
            )
          }
        >
          Продолжить
        </Button>
      )}
    </div>
  )
}
