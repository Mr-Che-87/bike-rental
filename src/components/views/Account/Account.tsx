import type { FC } from 'react';
//redux
import { useSelector } from 'react-redux';
import { selectUserData } from '../../../store/userSlice/userSlice';
//view
import { PrivateRoute } from '../PrivateRoute';
//ui
import { Helmet } from 'react-helmet-async';
import { Header } from '../../ui/Header';
import { Container } from '../../ui/Container';
import { Spacer } from '../../ui/Spacer';
import { FullscreenContainer } from '../../ui/FullscreenContainer';
import { Button } from '../../ui/Button';
import { useNavigate } from 'react-router-dom';

export const AccountPage: FC = () => {
    const userData = useSelector(selectUserData);
    const navigation = useNavigate();

    return (
        <PrivateRoute>
            <Helmet>
                <title>Велопрокат: Мой Аккаунт</title>
            </Helmet>
            <Header />
            <FullscreenContainer>
                <Container size={'small'} align={'center'}>
                    <h1>
                        Привет, {userData?.user.firstName ?? userData?.user.email.split('@')[0]}
                    </h1>
                    {userData?.user.approved && (
                        <>
                            <Spacer size="m" />
                            <Button
                                isFullwidth
                                text="Сотрудники"
                                onClick={() => navigation('/account/admins')}
                            />
                            <Spacer size="s" />
                            <Button
                                isFullwidth
                                text="Кражи"
                                onClick={() => navigation('/account/cases')}
                            />
                        </>
                    )}
                </Container>
            </FullscreenContainer>
        </PrivateRoute>
    );
};
