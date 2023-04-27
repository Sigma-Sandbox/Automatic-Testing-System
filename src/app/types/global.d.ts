declare module '*.scss' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames
  export = classNames
}
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'

declare module 'highlightjs-line-numbers.js'

declare const __IS_DEV__: boolean
