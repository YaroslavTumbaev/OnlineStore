import { Input, InputNumber, Select } from 'antd'
import styles from './DeviceModal.module.css'
import { FC, useContext, useState } from 'react'
import { IParam } from '../../pages/Admin/Admin'
import { nanoid } from 'nanoid'
import { IDevice, IInfo } from '../../types/types'
import { UserContext } from '../../contexts/UserContext'


interface DeviceModalProps {
    setParams: React.Dispatch<React.SetStateAction<IParam[]>>
    params: IParam[]
    data: IDevice
    setData: React.Dispatch<React.SetStateAction<IDevice>>
}

const DeviceModal: FC<DeviceModalProps> = ({ setParams, params, data, setData }) => {

    const [info, setInfo] = useState<IInfo>({
        title: '',
        description: ''
    }) 

    const context = useContext(UserContext)

return (
    <div className={styles.deviceModal}>
        <Select
            placeholder='Выберите бренд'
            style={{ width: 200 }}
            onChange={value => {
                if (context?.brands) {
                    const newBrands = context?.brands.find(e => e.name === value)
                    console.log(data);
                    
                    if (newBrands || newBrands === 0) {
                        console.log('great');
                        setData(prev => ({...prev, brandId: context?.brands.indexOf(newBrands) + 1}))   
                    }   
                }
            }}
            options={[
                ...context!.brands.map(e => {
                    return {value: e.name, lable: e.name.toLowerCase(), key: nanoid()}
                })
            ]}
        />

        <Select
            placeholder='Выберите тип'
            style={{ width: 200 }}
            onChange={value => {
                if (context?.types) {
                    const newTypes = context?.types.find(e => e.name === value)
                    console.log(data);
                    
                    if (newTypes || newTypes === 0) {
                        console.log('great');
                        setData(prev => ({...prev, typeId: context?.types.indexOf(newTypes) + 1}))   
                    }   
                }
            }}
            options={[
                ...context!.types.map(e => {
                    return {value: e.name, lable: e.name.toLowerCase(), key: nanoid()}
                })
            ]}
        />
        <Input placeholder='Введите название' value={data.name} onChange={e => setData(prev => ({...prev, name: e.target.value}))}/>
        <InputNumber placeholder='Введите цену' style={{width: '100%'}} value={data.price} onChange={e => setData(prev => ({...prev, price: e}))}/>
        <Input placeholder='Введите url картинки' value={data.img} onChange={e => setData(prev => ({...prev, img: e.target.value}))}/>


        <div style={{borderRadius: 5,border: '1px solid rgba(172, 172, 172, 0.677)', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between'}} >
            <div style={{display: 'flex'}}>
                <Input placeholder='Введите название свойства' style={{width: '50%'}} value={info.title} onChange={e => setInfo(prev => ({...prev, title: e.target.value}))}/>
                <Input placeholder='Введите значение свойства' style={{width: '50%'}} value={info.description} onChange={e => setInfo(prev => ({...prev, description: e.target.value}))}/>
            </div>
            <button onClick={() => {
                setParams(prev => [...prev, info])
            }}>Добавить характеристику</button>
        </div>
        <div className={styles.params}>
            {params?.map(e => (
                <div key={nanoid()}>
                    <div>{e.title}:{e.description}</div>
                    <button onClick={() => {
                        setParams(prev => prev.filter(el => el !== e))
                        console.log(params);
                        
                    }}>Удалить</button>
                </div>
            ))}
        </div>
    </div>
)
}

export default DeviceModal