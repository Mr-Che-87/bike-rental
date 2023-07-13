import { FC } from 'react';
//tools
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
//redux
import { useSelector } from 'react-redux';
import { selectUserData } from '../../../store/userSlice/userSlice';
//ui
import { Header } from '../../ui/Header';
import { FullscreenContainer } from '../../ui/FullscreenContainer';
import { Container } from '../../ui/Container';
import { Spacer } from '../../ui/Spacer';
import { FormSignIn } from '../../forms/FormSignIn';
//types
import type { TPrivateRoute } from './types';
import { Button } from '../../ui/Button';
import { Box } from '../../ui/Box';

export const PrivateRoute: FC<TPrivateRoute> = ({ children, onlyAdmin = false }) => {
    const userData = useSelector(selectUserData);
    const navigate = useNavigate();

    if (userData?.user) {
        if (onlyAdmin) {
            if (userData.user.approved) {
                return children;
            } else {
                return (
                    <>
                        <Helmet>
                            <title>Велопрокат: Доступ запрещен</title>
                        </Helmet>
                        <Header />
                        <FullscreenContainer>
                            <Container size="small" align={'center'}>
                                <h1>Доступ запрещен</h1>
                            </Container>
                        </FullscreenContainer>
                    </>
                );
            }
        } else {
            return children;
        }
    }

    return (
        <>
            <Helmet>
                <title>Велопрокат: Вход</title>
            </Helmet>
            <Header />
            <FullscreenContainer>
                <Container size="small" align={'center'}>
                    <h1>Вход</h1>
                    <Spacer size="xs" />
                    <p>Только для зарегистрированных пользователей</p>
                    <Spacer size="m" />
                    <Box>
                        <FormSignIn />
                    </Box>
                    <Spacer size="m" />
                    <p>Нет аккаунта?</p>
                    <Spacer size="xs" />
                    <Box>
                        <Button
                            isFullwidth
                            text="Зарегистрироваться"
                            onClick={() => navigate('/sign-up')}
                        />
                    </Box>
                </Container>
            </FullscreenContainer>
        </>
    );
};
