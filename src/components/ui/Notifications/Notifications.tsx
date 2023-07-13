import { FC } from 'react';
//styles
import style from './Notifications.module.css';
//redux
import { useDispatch, useSelector } from 'react-redux';
import {
    clearMessage,
    selectNotifications,
} from '../../../store/notificationsSlice/notificationsSlice';
//ui
import { Button } from '../Button';

export const Notifications: FC = () => {
    const notificationsData = useSelector(selectNotifications);
    const dispatch = useDispatch();

    const clearMessages = () => {
        dispatch(clearMessage());
    };

    if (!notificationsData) {
        return <></>;
    }

    return (
        <div className={style.wrap}>
            <div className={style.info}>
                <div className={style.title}>Ошибка</div>
                <div className={style.text}>{notificationsData?.message}</div>
            </div>
            <Button className={style.button} text="×" onClick={clearMessages} />
        </div>
    );
};
