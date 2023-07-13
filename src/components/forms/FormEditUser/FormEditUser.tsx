import { useState, type FC, useEffect } from 'react';
//redux
import { useDispatch } from 'react-redux';
import { addMessage } from '../../../store/notificationsSlice/notificationsSlice';
import { updateOfficers } from '../../../store/officersSlice/officersSlice';
//tools
import { apiErrorHandler, updateOfficer } from '../../../tools/api';
//ui
import { Box } from '../../ui/Box';
import { Button } from '../../ui/Button';
import { Checkbox } from '../../ui/Checkbox/Checkbox';
import { Spacer } from '../../ui/Spacer';
//form
import { useForm } from 'react-hook-form';
//types
import type { TFormEditUser, TFormEditUserInputs } from './types';
import type { TUser } from '../../../store/userSlice/types';
import { useNavigate } from 'react-router-dom';

export const FormEditUser: FC<TFormEditUser> = ({ officer }) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        formState: { isSubmitted, isSubmitSuccessful },
        handleSubmit,
    } = useForm<TFormEditUserInputs>();

    const onSubmit = async (data: TFormEditUserInputs) => {
        const updatedOfficer: TUser = {
            ...officer,
            approved: data.approved,
        };
        try {
            await updateOfficer(officer._id, { approved: data.approved });
            dispatch(updateOfficers(updatedOfficer));
            navigate('/account/admins');
        } catch (error) {
            dispatch(addMessage(apiErrorHandler(error)));
        }
    };

    useEffect(() => {
        if (isSubmitted) {
            setIsLoading(true);
        }
    }, [isSubmitted]);

    useEffect(() => {
        if (isSubmitted) {
            setIsLoading(false);
        }
    }, [isSubmitSuccessful]);

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Checkbox defaultChecked={officer?.approved} {...register('approved')}>
                    Администратор
                </Checkbox>
                <Spacer size={'m'} />
                <Button type={'submit'} text={'Сохранить'} isLoading={isLoading} />
            </form>
        </Box>
    );
};
