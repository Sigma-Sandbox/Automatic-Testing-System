import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Loader.module.scss'

interface LoaderProps {
  className?: string
  text?: string
}

export const Loader = ({ className = '' }: LoaderProps) => (
  <div className={cls.wrap}>
    <span className={cls.loader}></span>
  </div>
)
