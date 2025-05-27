import { StarOutlined } from '@ant-design/icons'
import styles from './DeviceBlock.module.css'
import { FC, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { paths } from '../../utils/consts'
import { UserContext } from '../../contexts/UserContext'

interface DeviceCardProps {
    name: string,
    img: string,
    rate: number,
    id: number
    brandId: number | undefined
    typeId: number | undefined
}

const DeviceCard: FC<DeviceCardProps> = ({name, img, rate, id, brandId}) => {

    const navigate = useNavigate()
    const context = useContext(UserContext)

    return (
        <div className={styles.DeviceCard} onClick={() => navigate(`${paths.DEVICE_PATH}/${id}`)}>
            <img src={img ? img : 'unknown img'} alt="" className={styles.img}/>
            <div className={styles.textBlock}>
                <div className={styles.description}>
                    <p>{context!.brands.find(e => e.id === brandId)?.name}</p>
                    <p><StarOutlined /> {rate}</p>
                </div>
                <p>{name}</p>
            </div>
        </div>
    )
}

export default DeviceCard