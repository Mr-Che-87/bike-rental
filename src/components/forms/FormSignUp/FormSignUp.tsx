import { FC, useEffect, useState } from 'react';
//tools
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
//redux
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../store/userSlice/userSlice';
import { addMessage } from '../../../store/notificationsSlice/notificationsSlice';
//axios
import { apiErrorHandler, signInUser, signUpUser } from '../../../tools/api';
//ui
import { Input } from '../../ui/Input';
import { Box } from '../../ui/Box/Box';
import { Button } from '../../ui/Button';
import { Spacer } from '../../ui/Spacer';
//types
import type { TFormSignUpInputs } from './types';
import type { SubmitHandler } from 'react-hook-form';
import type { TUserSlice } from '../../../store/userSlice/types';
import type { AxiosResponse } from 'axios';

export const FormSignUp: FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        formState: { errors, isSubmitSuccessful, isSubmitted },
        handleSubmit,
    } = useForm<TFormSignUpInputs>();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<TFormSignUpInputs> = async (data) => {
        try {
            await signUpUser(data);
            await signInUser(data.email, data.password).then(
                (result: AxiosResponse<{ data: TUserSlice['userData'] }>) => {
                    dispatch(loginUser(result.data.data));
                }
            );
            navigate('/account');
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
                <Spacer size="xs" />
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
                <Spacer size="xs" />
                <Input
                    type={'text'}
                    label="Имя"
                    error={errors.firstName}
                    {...register('firstName', {
                        maxLength: {
                            value: 20,
                            message: 'Слишком длинное значение',
                        },
                    })}
                />
                <Spacer size="xs" />
                <Input
                    type={'text'}
                    label="Фамилия"
                    error={errors.lastName}
                    {...register('lastName', {
                        maxLength: {
                            value: 20,
                            message: 'Слишком длинное значение',
                        },
                    })}
                />
                <Spacer size="m" />
                <Button isLoading={isLoading} type={'submit'} isFullwidth={true} text={'Войти'} />
            </form>
        </Box>
    );
};
