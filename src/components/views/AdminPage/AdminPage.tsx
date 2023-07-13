import type { FC } from 'react';
//ui
import { PrivateRoute } from '../PrivateRoute';
import { Helmet } from 'react-helmet-async';
import { Header } from '../../ui/Header';
import { Container } from '../../ui/Container';
import { Spacer } from '../../ui/Spacer';
import { Button } from '../../ui/Button';
import { FormEditUser } from '../../forms/FormEditUser/FormEditUser';
//redux
import { useSelector } from 'react-redux';
import { selectOfficers } from '../../../store/officersSlice/officersSlice';
//router
import { useNavigate, useParams } from 'react-router-dom';

export const AdminPage: FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const officer = useSelector(selectOfficers).filter((item) => item._id === id)[0];

    return (
        <PrivateRoute onlyAdmin={true}>
            <Helmet>
                <title>Велопрокат: Сотрудники</title>
            </Helmet>
            <Header />
            <Container>
                <Spacer size="xl" />
                <Button text="Назад" onClick={() => navigate(-1)} />
                <Spacer size="m" />
                <h1>{officer?.email}</h1>
                <Spacer size="m" />
                <FormEditUser officer={officer} />
            </Container>
            <Spacer size={'xl'} />
        </PrivateRoute>
    );
};
