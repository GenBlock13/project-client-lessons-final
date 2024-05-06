import { createContext, useContext } from 'react'
import { AuthStore } from './AuthStore'

// Создание объекта класса AuthStore
const authStore = new AuthStore()

// список сторов - сюда подключаем все сторы, которые у нас есть
const stores = {
  authStore,
}

// Создаем контекст для привязки сторов на верхнем уровне
const Context = createContext({...stores})

// Сам провайдер-обертка, который подключает сторы в контекст
export const StoreProvider = ({ children }) => {
  return <Context.Provider value={{...stores}}>{children}</Context.Provider>
}

// Кастомный хук, который позволяет работать с любым стором
// из списка сторов в любой части приложения
export const useStore = () => {
  const {...stores} = useContext(Context)
  return {...stores}
}
