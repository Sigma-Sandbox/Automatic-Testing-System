import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Modal.module.scss'
import { ToastContainer } from 'react-toastify'

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
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div
        className={classNames(cls.cardModal, { [cls.fullScreen]: fullScreen }, [className])}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
