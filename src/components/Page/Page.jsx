import cls from './Page.module.scss'

export const Page = ({ children }) => {
  return (
    <main className={cls.main}>{ children }</main>
  )
}
