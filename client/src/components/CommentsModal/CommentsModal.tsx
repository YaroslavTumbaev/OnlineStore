import { FC, useEffect } from 'react'
import styles from './CommentsModal.module.css'
import { checkMessage } from '../../http/messageApi'
import { StarOutlined } from '@ant-design/icons'
import { IComment } from '../../pages/DevicePage/DevicePage'

interface CommentsModalProps {
    deviceId: number
    setComments: React.Dispatch<React.SetStateAction<IComment[]>>
    comments: IComment[]
}
const CommentsModal: FC<CommentsModalProps> = ({ deviceId, setComments, comments }) => {

    useEffect(() => {
        checkMessage(deviceId).then(data => setComments(data.data.comments))
    }, [])

    return (
        <>
            {comments.map(e => {
                return <div key={e.id} className={styles.Comment}>
                    <div className={styles.commentText}>
                        <p style={{ color: 'gray' }}>{e.text}</p>
                        <p style={{ color: 'yellow' }}><StarOutlined /> {e.rate}</p>
                    </div>
                    <p style={{ color: 'white' }}>{e.userName}</p>
                </div>
            })}
        </>
    )
}

export default CommentsModal