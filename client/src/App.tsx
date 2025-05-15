import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import './App.css'
import { UserContext } from './contexts/UserContext'
import { useContext, useEffect, useState } from 'react'
import { check } from './http/userApi'
import { Spin } from 'antd'
import { checkBrands, checkDevices, checkTypes } from './http/deviceApi'

function App() {

  const context = useContext(UserContext)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    check().then(decoded => {
      context?.setUser({
        _user: decoded,
        _isAuth: true
      })
    }).finally(() => setIsLoading(false))

    checkTypes().then(data => context?.setTypes(data))
    checkBrands().then(data => context?.setBrands(data))
    checkDevices().then(data => context?.setDevices(data.rows))
  }, [])

  if (isLoading) {
    return <div style={{display: 'flex', justifyContent: 'center'}}><Spin style={{marginTop: 350}}/></div>
  }

  return (
    <BrowserRouter>
        <AppRouter />
    </BrowserRouter>
  )
}

export default App
