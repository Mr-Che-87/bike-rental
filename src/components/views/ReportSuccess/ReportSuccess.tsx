import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '../../ui/Header';
import { FullscreenContainer } from '../../ui/FullscreenContainer';
import { Container } from '../../ui/Container';
import { Spacer } from '../../ui/Spacer';

export const ReportSuccess: FC = () => {
    return (
        <>
            <Helmet>
                <title>Велопрокат: Заявка отправлена</title>
            </Helmet>
            <Header />
            <FullscreenContainer>
                <Container size="small" align={'center'}>
                    <h1>Готово</h1>
                    <Spacer size="xs" />
                    <p>Ваша заявка отправлена</p>
                </Container>
            </FullscreenContainer>
        </>
    );
};
