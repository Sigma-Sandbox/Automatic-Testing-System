import React, { ButtonHTMLAttributes } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Button.module.scss'

export enum ThemeButton {
  BACKGROUND = 'backgroud',
  CLEAR = 'clear',
  OUTLINE = 'outline',
}

// Colors from global variables css
export enum ColorButton {
  PRIMARY_COLOR = 'primaryColor',
  SECONDARY_COLOR = 'secondaryColor',
  RED_COLOR = 'redColor',
  BACKGROUND_COLOR = 'backgroundColor',
  INVERT_BACKGROUND_COLOR = 'invertBackgroundColor',
  TRANSPARENT = 'transparent',
}
export enum SizeButton {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ThemeButton
  size?: SizeButton
  color?: ColorButton
}

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    className = '',
    children,
    theme = ThemeButton.BACKGROUND,
    size = SizeButton.M,
    color = ColorButton.PRIMARY_COLOR,
    ...otherProps
  } = props

  const mods: Record<string, boolean> = {}

  return (
    <button
      type="button"
      className={classNames(className, mods, [cls.button, cls[theme], cls[color], cls[size]])}
      {...otherProps}
    >
      {children}
    </button>
  )
}
