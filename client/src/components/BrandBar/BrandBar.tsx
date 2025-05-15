import { FC, useContext, useState } from 'react'
import styles from './BrandBar.module.css'
import { UserContext } from '../../contexts/UserContext'
import { IType } from '../../types/types'

interface BrandBarProps {
    currentBrand: number | undefined
    setCurrentBrand: React.Dispatch<React.SetStateAction<number | undefined>>
}

const BrandBar: FC<BrandBarProps> = ({ currentBrand, setCurrentBrand }) => {
     const context = useContext(UserContext)

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            {context?.brands.map(e => (
                <div key={e.id} className={styles.brand} onClick={() => {
                    if (e.id === currentBrand) {
                        setCurrentBrand(undefined)   
                    }else {
                        setCurrentBrand(e.id)  
                    }
                }}
                style={{backgroundColor: currentBrand === e.id ? 'rgb(138, 206, 139)' : 'white', color: currentBrand === e.id ? 'rgb(254, 214, 214)' : 'black'}}
            >{e.name}</div>
            ))}
        </div>
    )
}

export default BrandBar