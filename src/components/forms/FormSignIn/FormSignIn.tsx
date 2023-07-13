import { useState, type FC, useEffect } from 'react';
//tools
import { useForm } from 'react-hook-form';
//ui
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Spacer } from '../../ui/Spacer';
//redux
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../store/userSlice/userSlice';
//axios
import { apiErrorHandler, signInUser } from '../../../tools/api';
import { addMessage } from '../../../store/notificationsSlice/notificationsSlice';
//types
import type { TFormSignInInputs } from './types';
import type { SubmitHandler } from 'react-hook-form';
import type { TUserSlice } from '../../../store/userSlice/types';
import type { AxiosResponse } from 'axios';

export const FormSignIn: FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        formState: { errors, isSubmitted, isSubmitSuccessful },
        handleSubmit,
    } = useForm<TFormSignInInputs>();
    const dispatch = useDispatch();

    const onSubmit: SubmitHandler<TFormSignInInputs> = async (data) => {
        try {
            await signInUser(data.email, data.password).then(
                (result: AxiosResponse<{ data: TUserSlice['userData'] }>) => {
                    dispatch(loginUser(result.data.data));
                }
            );
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                type={'email'}
                label="E-mail*"
                error={errors.email}
                {...register('email', {
                    required: {
                        value: true,
                        message: 'Обязательное поле',
                    },
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Неверный формат e-mail',
                    },
                })}
            />
            <Spacer size="s" />
            <Input
                type={'password'}
                label="Пароль*"
                error={errors.password}
                {...register('password', {
                    required: 'Обязательное поле',
                    minLength: {
                        value: 3,
                        message: 'Минимум 3 символа',
                    },
                    maxLength: {
                        value: 12,
                        message: 'Максимум 12 символов',
                    },
                })}
            />
            <Spacer size="m" />
            <Button type={'submit'} isFullwidth={true} text={'Войти'} isLoading={isLoading} />
        </form>
    );
};
