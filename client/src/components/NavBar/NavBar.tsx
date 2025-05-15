import { useContext } from 'react'
import styles from './NavBar.module.css'
import { UserContext } from '../../contexts/UserContext'
import { Link } from 'react-router-dom'
import { paths } from '../../utils/consts'

const NavBar = () => {

    const context = useContext(UserContext)

    return (
        <div className={styles.NavBar}>
            <p style={{fontSize: 25, marginLeft: 30}}><Link to='/' style={{ textDecoration: 'none', color: 'rgb(148, 221, 149)' }}>Online Store</Link></p>
            <div style={{marginRight: 30}}>
            {context?.user._isAuth && 
                <>
                    <Link to='/admin'><button>Админ панель</button></Link>
                    <button onClick={() => {
                        context.setUser({
                            _isAuth: false,
                            _user: undefined
                        })
                        localStorage.removeItem('token')
                    }}>Выйти</button>
                </>
            }
            {!context?.user._isAuth && 
                <>
                    <Link to={paths.LOGIN_PATH}>
                        <button>Авторизация</button>
                    </Link>
                </>
            }
            </div>
        </div>
    )
}

export default NavBar