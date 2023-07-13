import type { FC } from 'react';
//ui
import { PrivateRoute } from '../PrivateRoute';
import { Helmet } from 'react-helmet-async';
import { Header } from '../../ui/Header';
import { Container } from '../../ui/Container';
import { Spacer } from '../../ui/Spacer';
import { Button } from '../../ui/Button';
//router
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCases } from '../../../store/casesSlice/casesSlice';
import { format, parseISO } from 'date-fns';
import { FormEditCase } from '../../forms/FormEditCase/FormEditCase';

export const CasePage: FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const caseData = useSelector(selectCases).filter((item) => item._id === id)[0];

    return (
        <PrivateRoute onlyAdmin={true}>
            <Helmet>
                <title>Велопрокат: Кража {caseData?.licenseNumber}</title>
            </Helmet>
            <Header />
            <Container>
                <Spacer size="xl" />
                <Button text="Назад" onClick={() => navigate(-1)} />
                <Spacer size="m" />
                <h1>
                    Кража велосипеда
                    <br />
                    {caseData?.licenseNumber}
                </h1>
                <Spacer size="m" />
                <p>Добавлено: {caseData && format(parseISO(caseData.createdAt), 'dd-MM-yyyy')}</p>
                <Spacer size="m" />
                <FormEditCase caseData={caseData} />
            </Container>
            <Spacer size={'xl'} />
        </PrivateRoute>
    );
};
