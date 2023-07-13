import type { FC } from 'react';
//redux
import { useSelector } from 'react-redux';
import { selectOfficers } from '../../../store/officersSlice/officersSlice';
import { selectUserData } from '../../../store/userSlice/userSlice';
//view
import { PrivateRoute } from '../PrivateRoute';
//ui
import { Helmet } from 'react-helmet-async';
import { Header } from '../../ui/Header';
import { Container } from '../../ui/Container';
import { Spacer } from '../../ui/Spacer';
import { UserList } from '../../forms/UserList/UserList';
import { Button } from '../../ui/Button';
import { useNavigate } from 'react-router-dom';

export const AdminsPage: FC = () => {
    const navigate = useNavigate();
    const userData = useSelector(selectUserData);
    const officersData = useSelector(selectOfficers);

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
                <h1>Сотрудники</h1>
                <Spacer size="m" />
                <UserList users={officersData.filter((item) => item._id !== userData?.user._id)} />
            </Container>
            <Spacer size={'xl'} />
        </PrivateRoute>
    );
};
