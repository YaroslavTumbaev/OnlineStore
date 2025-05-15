import { Route, Routes } from 'react-router-dom'
import { publicRoutes, authRoutes } from '../routes'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import NavBar from './NavBar/NavBar'

const AppRouter = () => {
    const context = useContext(UserContext)
    
    return (
        <>
        <NavBar />
        <Routes>
            {context?.user._isAuth && authRoutes.map(e => (
                <Route key={e.path} path={e.path} Component={e.component}/>
            ))}

            {publicRoutes.map(e => (
                <Route path={e.path} Component={e.component}/>
            ))}
        </Routes>
        </>
    )
}

export default AppRouter