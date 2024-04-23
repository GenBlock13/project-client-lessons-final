import cls from './Container.module.scss'

export const Container = ({ children }) => {
  return (
    <div className={cls.container}>{ children }</div>
  )
}
