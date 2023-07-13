import type { FC } from 'react';
//view
import { PrivateRoute } from '../PrivateRoute';
//ui
import { Helmet } from 'react-helmet-async';
import { Header } from '../../ui/Header';
import { Container } from '../../ui/Container';
import { Spacer } from '../../ui/Spacer';
import { Button } from '../../ui/Button';
//router
import { useNavigate } from 'react-router-dom';
import { CasesList } from '../../forms/CasesList/CasesList';
import { useSelector } from 'react-redux';
import { selectCases } from '../../../store/casesSlice/casesSlice';

export const CasesPage: FC = () => {
    const navigate = useNavigate();
    const casesData = useSelector(selectCases);

    return (
        <PrivateRoute onlyAdmin={true}>
            <Helmet>
                <title>Велопрокат: Кражи</title>
            </Helmet>
            <Header />
            <Container>
                <Spacer size="xl" />
                <Button text="Назад" onClick={() => navigate(-1)} />
                <Spacer size="m" />
                <h1>Кражи</h1>
                <Spacer size="m" />
                <CasesList cases={casesData} />
            </Container>
        </PrivateRoute>
    );
};
