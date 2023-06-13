import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './CreateOrEditCard.module.scss'
import { Modal } from 'shared/ui/Modal/Modal'
import { User } from 'entities/User'
import { CardForm } from './CardForm/CardForm'
import { ToastContainer } from 'react-toastify'

interface CreateOrEditCardProps {
  className?: string
  user: User | null
  finishEditCard: () => void
}

export const CreateOrEditCard: React.FC<CreateOrEditCardProps> = (props) => {
  const { className = '', user, finishEditCard } = props

  return (
    <Modal closeModal={finishEditCard}>
      <CardForm user={user} closeModal={finishEditCard}></CardForm>
    </Modal>
  )
}
