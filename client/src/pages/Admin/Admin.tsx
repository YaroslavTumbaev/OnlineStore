import { useState } from 'react'
import styles from './Admin.module.css'
import { Modal, Input } from 'antd'
import { IDevice, ModalType } from '../../types/types'
import DeviceModal from '../../components/DeviceModal/DeviceModal'
import { createBrand, createDevice, createType } from '../../http/deviceApi'
import { nanoid } from 'nanoid'

export interface IParam {
    title?: string,
    description?: string
}


const Admin = () => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [isModal2Open, setIsModal2Open] = useState<boolean>(false)
    const [currentModal, setCurrentModal] = useState<ModalType>('brand')
    const [text, setText] = useState('')

    const [params, setParams] = useState<IParam[]>([])
    const [data, setData] = useState<IDevice>({
        name: '',
        price: 0,
        img: '',
        brandId: undefined,
        typeId: undefined,
    })


    const openModal = (currentModal: ModalType) => {
        if(currentModal === 'brand' || currentModal === 'type') {
            setIsModalOpen(true)
            setCurrentModal(currentModal)
        }else {
            setIsModal2Open(true)
        }
    }

    const cancelModal = (currentModal: ModalType | undefined) => {
        if(currentModal === 'brand' || currentModal === 'type') {
            setIsModalOpen(false)
            setCurrentModal('brand')
        }else {
            setIsModal2Open(false)
        }
    } 

    const addType = (currentModal: ModalType) => {
        if (currentModal === 'type') {
            createType({name: text}).then(() => {
                setText('')
                setIsModalOpen(false)
            })
        }
        if (currentModal === 'brand') {
            createBrand({name: text}).then(() => {
                setText('')
                setIsModalOpen(false)
            })
        }
    }

    const addDevice = () => {
        console.log(data);
        
        createDevice(data).then(data => console.log(data))
    }

    return (
        <div className={styles.Admin}>
            <Modal title="Basic Modal" open={isModalOpen} onCancel={() => cancelModal(currentModal)} footer={[
                <button onClick={() => addType(currentModal)}>Добавить {currentModal === 'brand' ? 'бренд' : 'тип'}</button>
            ]}>
                <Input placeholder={`Введите название ${currentModal === 'brand' ? 'бренда' : 'типа'}`}
                    onChange={e => setText(e.target.value)}
                    value={text}
                />

            </Modal>


            <Modal title="Basic Modal" open={isModal2Open} onCancel={() => setIsModal2Open(false)} footer={[
                <button onClick={() => addDevice()} key={nanoid()}>Добавить девайс</button>
            ]}>
                <DeviceModal setParams={setParams} params={params} data={data} setData={setData}/>
            </Modal>
            <button onClick={() => openModal('brand')}>Добавить бренд</button>
            <button onClick={() => openModal('type')}>Добавить тип</button>
            <button onClick={() => openModal('device')}>Добавить устройство</button>
        </div>
    )
}

export default Admin