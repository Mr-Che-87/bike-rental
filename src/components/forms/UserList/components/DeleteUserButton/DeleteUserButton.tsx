import { useState, type FC } from 'react';
import { Button } from '../../../../ui/Button';
import { TDeleteUserButton } from './types';
import { apiErrorHandler, deleteOfficer } from '../../../../../tools/api';
import { useDispatch } from 'react-redux';
import { removeOfficer } from '../../../../../store/officersSlice/officersSlice';
import { addMessage } from '../../../../../store/notificationsSlice/notificationsSlice';

export const DeleteUserButton: FC<TDeleteUserButton> = ({ id }) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const deleteUser = async (id: string) => {
        setIsLoading(true);
        await deleteOfficer(id)
            .then(() => {
                dispatch(removeOfficer(id));
            })
            .catch((error) => {
                dispatch(addMessage(apiErrorHandler(error)));
            });
        setIsLoading(false);
    };
    return <Button isLoading={isLoading} text={'×'} onClick={() => deleteUser(id)} />;
};
