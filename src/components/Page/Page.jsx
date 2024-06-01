import cls from './Page.module.scss'
import { useEffect } from 'react'

export const Page = ({ children }) => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [])

  return (
    <main className={cls.main}>{ children }</main>
  )
}
