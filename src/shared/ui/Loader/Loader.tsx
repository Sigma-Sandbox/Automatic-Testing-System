import {classNames} from 'shared/lib/classNames/classNames'
import cls from './Loader.module.scss'

interface LoaderProps {
  className?: string
}

export const Loader = ({className = ''}: LoaderProps) => <span className={cls.loader}></span>
