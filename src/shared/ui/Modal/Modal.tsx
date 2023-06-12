import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Modal.module.scss'

interface ModalProps {
  className?: string
  children: React.ReactNode
  closeModal: () => void
  fullScreen?: boolean
}

export const Modal: React.FC<ModalProps> = (props) => {
  const { className = '', children, closeModal, fullScreen = false } = props

  return (
    <div className={cls.cardModalCover} onClick={closeModal}>
      <div
        className={classNames(cls.cardModal, { [cls.fullScreen]: fullScreen }, [className])}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
