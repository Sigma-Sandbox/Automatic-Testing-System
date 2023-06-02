import React from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './CreateAndEditTaskSet.module.scss'
import {TaskSet} from 'entities/Candidate/TestTask'
import {Modal} from 'shared/ui/Modal/Modal'
import {StartEdit} from './StartEdit/StartEdit'
import {MainEditTaskSet} from './MainEditTaskSet/MainEditTaskSet'

interface CreateAndEditTaskSetProps {
  className?: string
  taskSet: TaskSet | null
  finishEditTaskSet: () => void
}

export const CreateAndEditTaskSet: React.FC<CreateAndEditTaskSetProps> = (props) => {
  const {className = '', taskSet, finishEditTaskSet} = props

  return (
    <Modal fullScreen={true} closeModal={finishEditTaskSet}>
      <MainEditTaskSet></MainEditTaskSet>
    </Modal>
  )
}
