import { useState, type FC, useEffect } from 'react';
//router
import { useNavigate } from 'react-router-dom';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../../store/notificationsSlice/notificationsSlice';
import { apiErrorHandler, updateCase } from '../../../tools/api';
import { selectOfficersShortList } from '../../../store/officersSlice/officersSlice';
//ui
import { Box } from '../../ui/Box';
import { Button } from '../../ui/Button';
import { InputSelect } from '../../ui/InputSelect';
import { Spacer } from '../../ui/Spacer';
import { Input } from '../../ui/Input';
//form
import { useForm } from 'react-hook-form';
//types
import type { TFormEditCase, TFormEditCaseInputs } from './types';
import type { TCase } from '../../../store/casesSlice/types';

export const FormEditCase: FC<TFormEditCase> = ({ caseData }) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const officersList = useSelector(selectOfficersShortList);

    const {
        register,
        formState: { isSubmitted, isSubmitSuccessful },
        handleSubmit,
        watch, // Added watch from react-hook-form
    } = useForm<TFormEditCaseInputs>();

    const status = watch('status');

    const getSeletedOfficer = () => {
        if (!officersList) {
            return undefined;
        }
        return (
            officersList.filter((item) => item.id === caseData.officer)[0]?.id || officersList[0].id
        );
    };

    const onSubmit = async (data: TFormEditCaseInputs) => {
        const updatedCase: TCase = {
            ...caseData,
            ...data,
        };
        try {
            await updateCase(caseData._id, updatedCase);
            navigate('/account/cases');
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
                <InputSelect
                    label={'Статус'}
                    defaultValue={caseData.status}
                    options={[
                        { id: 'new', text: 'Новый' },
                        { id: 'resolved', text: 'Завершен' },
                    ]}
                    {...register('status')}
                />

                {status === 'resolved' && ( // Render the 'resolution' field if 'status' is 'resolved'
                    <>
                        <Spacer size={'m'} />
                        <Input label={'Вывод'} {...register('resolution')} />
                    </>
                )}
                <Spacer size={'m'} />
                <Input
                    label={'Описание'}
                    {...register('description', {
                        value: caseData.description,
                    })}
                />
                <Spacer size={'m'} />
                <Input
                    label={'Владелец'}
                    {...register('ownerFullName', {
                        value: caseData.ownerFullName,
                    })}
                />

                {officersList && (
                    <>
                        <Spacer size={'m'} />
                        <InputSelect
                            label="Ответственный сотрудник"
                            options={officersList}
                            defaultValue={getSeletedOfficer()}
                            {...register('officer')}
                        />
                    </>
                )}
                <Spacer size={'m'} />
                <Button type={'submit'} text={'Сохранить'} isLoading={isLoading} />
            </form>
        </Box>
    );
};
