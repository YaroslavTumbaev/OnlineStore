import { useParams } from 'react-router-dom'
import styles from './Device.module.css'
import { StarOutlined } from '@ant-design/icons'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { addDeviceInBasket } from '../../http/basketApi'
import { createMessage } from '../../http/messageApi'
import { Input, InputNumber, Modal } from 'antd'
import CommentsModal from '../../components/CommentsModal/CommentsModal'
import { updateRating } from '../../http/deviceApi'

export interface IComment {
    createdAt: string
    deviceId: number
    id: number
    rate: number
    text: string
    updatedAt: string
    userName: string
}

const Device = () => {

    const { id } = useParams()
    const context = useContext(UserContext)
    const device = context!.devices.find(e => id ? e.id === +id : null)
    const [message, setMessage] = useState<string>('')
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [comments, setComments] = useState<IComment[]>([])
    const [rate, setRate] = useState<number>(5)

    
    const addInBasket = () => {
        if (id) {
            addDeviceInBasket(+id).then(data => {
                if (data.message) {
                    alert(data.message.message)   
                }else {
                    alert('Товар добавлен в корзину')
                }
            })   
        }
    }

    const addComment = () => {
        createMessage(device!.id, message, rate).then(data => console.log(data))
        setMessage('')
        const newRating = (device!.rating + rate) / 2
        updateRating(device!.id, rate).then(data => console.log(data))
        setRate(5)
    }


    return (
        <div className={styles.Device}>
            <Modal
                title="Коментарии"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                footer=''
                onCancel={() => setIsModalOpen(false)}
            >
                <CommentsModal deviceId={Number(id)} comments={comments} setComments={setComments}/>
            </Modal>


            <div className={styles.mainBlock}>
                <img src={device?.img} alt="ФОТО" style={{width: 400, height: 400}}/>
                <div>
                    <div className={styles.description}>
                        <div style={{display: 'flex'}}>
                            <p style={{fontSize: 25, color: 'rgb(255, 255, 255)' }}>
                                {context!.brands.find(e => e.id === device!.brandId)?.name} {device?.name}
                            </p>
                            <p style={{fontSize: 25, color: 'yellow', marginLeft: 50}}><StarOutlined /> {device?.rating}</p>
                        </div>
                        <div className={styles.priceBlock}>
                            <p>{device?.price}$</p>  
                            <button onClick={addInBasket} style={{ marginLeft: 50 }}>В корзину</button>
                        </div>
                    </div>
                    <div className={styles.addComment}>
                        <p>Random comment <StarOutlined /> 4.6</p>
                        <button onClick={() => setIsModalOpen(true)}>Все коментарии</button>
                    </div>
                    <div className={styles.addComment2}>
                        <div>
                        <InputNumber min={1} max={5} defaultValue={5} value={rate} onChange={e => e && setRate(e)}/>
                        <StarOutlined />
                        </div>
                        <Input style={{ width: 200 }} type="text" value={message} onChange={e =>setMessage(e.target.value)}/>
                        <button onClick={addComment}>Оставить коментарий</button>
                    </div>
                </div>

                <div className={styles.info}>

                </div>
            </div>
        </div>
    )
}

export default Device