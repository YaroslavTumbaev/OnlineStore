import { useContext, useEffect, useState } from 'react'
import BrandBar from '../../components/BrandBar/BrandBar'
import DeviceBlock from '../../components/DeviceBlock/DeviceBlock'
import TypeBar from '../../components/TypeBar/TypeBar'
import styles from './Shop.module.css'
import DrawerBlock from '../../components/Drawer/Drawer'
import { checkBasket } from '../../http/basketApi'
import { UserContext } from '../../contexts/UserContext'

const Shop = () => {
    const [currentType, setCurrentType] = useState<number | undefined>(undefined)
    const [isDrawer, setIsDrawer] = useState<boolean>(false)
    const [currentBrand, setCurrentBrand] = useState<number | undefined>(undefined)
    const context = useContext(UserContext)

    useEffect(() => {
        checkBasket().then(data => context?.setBasket(data.data.basket.basket_devices))
    }, [])


    return (
        <div className={styles.screen}>
            <TypeBar setCurrentType={setCurrentType} currentType={currentType}/>
            <div className={styles.secondBlock}>
                <BrandBar currentBrand={currentBrand} setCurrentBrand={setCurrentBrand}/>
                <DeviceBlock currentType={currentType} currentBrand={currentBrand}/>
                <button onClick={() => setIsDrawer(prev => !prev)} className={styles.basketButton}>Корзина</button>
                <DrawerBlock isDrawer={isDrawer} setIsDrawer={setIsDrawer}/>
            </div>
        </div>
    )
}

export default Shop