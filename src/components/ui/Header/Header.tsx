import type { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, selectUserData } from '../../../store/userSlice/userSlice';
import { cleanOfficers } from '../../../store/officersSlice/officersSlice';
import { cleanCases } from '../../../store/casesSlice/casesSlice';
//styles
import style from './Header.module.css';
//ui
import { Button } from '../Button/Button';
import { Logo } from './components/Logo';
import { Container } from '../Container';

export const Header: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const userData = useSelector(selectUserData);
    const isAccount = location.pathname.toString().includes('account');

    const handleSignOut = () => {
        dispatch(logoutUser());
        dispatch(cleanOfficers());
        dispatch(cleanCases());
    };

    const handleSignIn = () => {
        navigate('/account');
    };

    const handleReport = () => {
        navigate('/report');
    };

    return (
        <Container as={'header'} className={style.header}>
            <div className={style.inner}>
                <Logo className={style.logo} />
                <div className={style.actions}>
                    <Button text={'Сообщить о краже'} onClick={handleReport} />
                    {isAccount && userData ? (
                        <Button text={'Выйти'} onClick={handleSignOut} />
                    ) : (
                        <Button text={!userData ? 'Войти' : 'Мой Аккаунт'} onClick={handleSignIn} />
                    )}
                </div>
            </div>
        </Container>
    );
};
