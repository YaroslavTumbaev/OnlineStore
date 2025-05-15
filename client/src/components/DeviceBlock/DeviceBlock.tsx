import { FC, useContext } from 'react'
import styles from './DeviceBlock.module.css'
import DeviceCard from './DeviceCard'
import { UserContext } from '../../contexts/UserContext'
import { IType } from '../../types/types'

interface DeviceBlockProps {
    currentType: number | undefined
    currentBrand: number | undefined
}

const DeviceBlock: FC<DeviceBlockProps> = ({ currentType, currentBrand }) => {

    const context = useContext(UserContext)

    return (
        <div className={styles.DeviceBlock}>
            {context?.devices.map(e => {
                if (currentType !== e.typeId && currentType !== undefined) {
                    return
                }

                if (currentBrand !== e.brandId && currentBrand !== undefined) {
                    return
                }

                return <div key={e.id}><DeviceCard id={e.id} name={e.name} img={e.img} rate={e.rating} brandId={e.brandId} typeId={e.typeId}/></div>
            })}
        </div>
    )
}

export default DeviceBlock