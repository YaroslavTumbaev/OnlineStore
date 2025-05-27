import { FC, useContext } from 'react'
import styles from './Drawer.module.css'

interface DrawerBlockProps {
    isDrawer: boolean
    setIsDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

import { Drawer } from 'antd'
import { UserContext } from '../../contexts/UserContext'
import { deleteDeviceOutBasket } from '../../http/basketApi'

const DrawerBlock: FC<DrawerBlockProps> = ({ isDrawer, setIsDrawer }) => {

    const context = useContext(UserContext)

    const deleteDevice = (deviceId: number) => {
        deleteDeviceOutBasket(deviceId).then(() => context?.setBasket(prev => prev?.filter(e => e.deviceId !== deviceId)))
    }
    
    return (
        <>
            
                <Drawer title="Корзина" closable={{ 'aria-label': 'Close Button' }} onClose={() => setIsDrawer(false)} open={isDrawer}>
                    {context?.basket?.length !== 0 &&
                        context?.basket?.map(e => (
                            <div className={styles.basketElement} key={e.id}>
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <p style={{ fontSize: 25 }}>{context!.brands.find(el => el.id === e.device.brandId)?.name} {e.device.name}</p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                                    <p style={{ fontSize: 25 }}>{e.device.price}$</p>
                                    <button onClick={() => deleteDevice(e.device.id)}>Удалить из корзины</button>
                                </div>
                            </div>
                        ))}

                    {context?.basket?.length === 0 && 
                        <p>Корзина пуста</p>
                    }
                </Drawer>
        </>
    )
}

export default DrawerBlock