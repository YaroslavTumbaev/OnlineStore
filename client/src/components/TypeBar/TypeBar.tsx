import { FC, useContext } from 'react'
import styles from './TypeBar.module.css'
import { UserContext } from '../../contexts/UserContext'

interface TypeBarProps {
    currentType: number | undefined
    setCurrentType: React.Dispatch<React.SetStateAction<number | undefined>>
}


const TypeBar: FC<TypeBarProps> = ({ currentType, setCurrentType }) => {
    const context = useContext(UserContext)

    return (
        <div className={styles.TypeBar}>
            {context?.types.map(e => (
                <div key={e.id} className={styles.barElem} onClick={() => {
                    if (e.id === currentType) {
                        setCurrentType(undefined)   
                    }else {
                        setCurrentType(e.id)  
                    }
                }}
                    style={{backgroundColor: currentType === e.id ? 'rgb(138, 206, 139)' : 'white', color: currentType === e.id ? 'rgb(254, 214, 214)' : 'black'}}
                >{e.name}</div>
            ))}
        </div>
    )
}

export default TypeBar