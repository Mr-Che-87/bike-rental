import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
//ui
import { Header } from '../../ui/Header';
import { FullscreenContainer } from '../../ui/FullscreenContainer';
import { Container } from '../../ui/Container';
import { Spacer } from '../../ui/Spacer';
import { FormSignUp } from '../../forms/FormSignUp';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../../store/userSlice/userSlice';
import { Navigate } from 'react-router-dom';

export const SignUp: FC = () => {
    const userData = useSelector(selectUserData);

    if (userData) {
        return <Navigate to="/account" />;
    }

    return (
        <>
            <Helmet>
                <title>Велопрокат: Регистрация</title>
            </Helmet>
            <Header />
            <FullscreenContainer>
                <Container size="small" align={'center'}>
                    <h1>Регистрация</h1>
                    <Spacer size="xs" />
                    <p>Добро пожаловать в наш велопрокат</p>
                    <Spacer size="m" />
                    <FormSignUp />
                </Container>
            </FullscreenContainer>
        </>
    );
};
