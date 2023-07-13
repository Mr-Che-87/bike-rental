import { FC, useEffect, useState } from 'react';
//axios
import { apiErrorHandler, sendAuthenticatedReport, sendPublicReport } from '../../../tools/api';
//redux
import { addMessage } from '../../../store/notificationsSlice/notificationsSlice';
import { selectUserData } from '../../../store/userSlice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { InputSelect } from '../../ui/InputSelect';
import { selectOfficersShortList } from '../../../store/officersSlice/officersSlice';
//form
import { useForm } from 'react-hook-form';
//ui
import { Input } from '../../ui/Input';
import { Spacer } from '../../ui/Spacer';
import { Button } from '../../ui/Button';
//types
import type { TFormReportInputs } from './types';
import type { TCard } from '../../ui/Card/types';
//content
import { bikes } from '../../../content/bikes';
import { useNavigate } from 'react-router-dom';

export const FormReport: FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const userData = useSelector(selectUserData);
    const officersList = useSelector(selectOfficersShortList);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const {
        register,
        formState: { errors, isSubmitted, isSubmitSuccessful },
        handleSubmit,
    } = useForm<TFormReportInputs>();

    const findBikeByNumber = (number: string): TCard | undefined => {
        return bikes.filter((item) => item.licenseNumber === number)[0];
    };

    const onSubmit = async (data: TFormReportInputs) => {
        const { color, type } = findBikeByNumber(data.licenseNumber)!;

        const report = {
            ...data,
            color: color,
            type: type,
        };

        try {
            if (userData) {
                await sendAuthenticatedReport(report);
            } else {
                await sendPublicReport(report);
            }

            dispatch(
                addMessage({
                    message: 'Спасибо! Сообщение отправлено',
                    status: 'SUCCESS',
                })
            );

            navigate('/report-success');
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
                type={'text'}
                label="Номер лицензии*"
                error={errors.licenseNumber}
                {...register('licenseNumber', {
                    required: {
                        value: true,
                        message: 'Обязательное поле',
                    },
                    minLength: {
                        value: 1,
                        message: 'Слишком короткое значение',
                    },
                    maxLength: {
                        value: 12,
                        message: 'Слишком короткое значение',
                    },
                    validate: (value) => {
                        const bike = findBikeByNumber(value);
                        return !!bike || 'Введенный номер лицензии не найден.';
                    },
                })}
            />
            <Spacer size="s" />
            <Input
                type={'text'}
                label="ФИО*"
                error={errors.ownerFullName}
                {...register('ownerFullName', {
                    required: {
                        value: true,
                        message: 'Обязательное поле',
                    },
                    minLength: {
                        value: 3,
                        message: 'Слишком короткое значение',
                    },
                    maxLength: {
                        value: 50,
                        message: 'Слишком длинное значение',
                    },
                })}
            />
            <Spacer size="s" />
            <Input
                type={'text'}
                label="Дополнительная информация"
                error={errors.description}
                {...register('description', {
                    minLength: {
                        value: 3,
                        message: 'Слишком короткое значение',
                    },
                    maxLength: {
                        value: 50,
                        message: 'Слишком длинное значение',
                    },
                })}
            />
            {officersList && officersList.length > 0 && (
                <>
                    <Spacer size="s" />
                    <InputSelect
                        label="Ответственный сотрудник"
                        error={errors.officer}
                        options={officersList}
                        defaultValue={officersList[0]?.id}
                        {...register('officer', {
                            minLength: {
                                value: 3,
                                message: 'Слишком короткое значение',
                            },
                            maxLength: {
                                value: 50,
                                message: 'Слишком длинное значение',
                            },
                        })}
                    />
                </>
            )}
            <Spacer size="m" />
            <Button isLoading={isLoading} isFullwidth={true} type={'submit'} text={'Отправить'} />
        </form>
    );
};
