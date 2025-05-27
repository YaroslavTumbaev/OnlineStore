import { useLocation, useNavigate } from 'react-router-dom'
import styles from './Auth.module.css'
import { paths } from '../../utils/consts'
import { Input } from 'antd'
import { Link } from 'react-router-dom'
import { login, registration } from '../../http/userApi'
import { useContext, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'

const Auth = () => {

    const { pathname } = useLocation()
    const isLogin: boolean = pathname === paths.LOGIN_PATH
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const context = useContext(UserContext)
    const navigate = useNavigate()

    const click = async () => {
        try {
            if (isLogin) {
                await login(data.email, data.password)
                console.log(1);
            }else {
                await registration(data.email, data.password)
            }
            context?.setUser({
                _isAuth: true,
                _user: undefined
            })
            navigate('/')
        } catch (e: any) {
            alert(e.response.data.message)
        }
    }
    

    return (
        <div className={styles.Auth}>
            {isLogin ? <h2>Авторизация</h2> : <h2>Регистрация</h2>}

            <Input placeholder='Введите email...' type="text" style={{width: '90%', marginTop: 70}} value={data.email} onChange={e => setData(prev => ({...prev, email: e.target.value}))}/>
            <Input placeholder='Введите пароль...' type="text" style={{width: '90%', marginTop: 10}} value={data.password} onChange={e => setData(prev => ({...prev, password: e.target.value}))}/>

            
            <div style={{marginTop: 30}}>
                {isLogin ?
                    <button onClick={click}>Войти</button>
                    :
                    <button onClick={click}>Зарегистрироваться</button>
                }
            </div>

            <div style={{marginTop: 50}}>
                {isLogin ? 
                    <p>Нет аккаунта? <Link to={paths.REGISTRATION_PATH}>Зарегистрироваться</Link></p>
                    :
                    <p>Есть аккаунт? <Link to={paths.LOGIN_PATH}>Войти</Link></p>
                }
            </div>
        </div>
    )
}

export default Auth