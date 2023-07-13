import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
//ui
import { Header } from '../../ui/Header';
import { FullscreenContainer } from '../../ui/FullscreenContainer';
import { Container } from '../../ui/Container';
import { Spacer } from '../../ui/Spacer';
import { FormReport } from '../../forms/FormReport';
import { Box } from '../../ui/Box';

export const Report: FC = () => {
    return (
        <>
            <Helmet>
                <title>Велопрокат: Сообщение о краже</title>
            </Helmet>
            <Header />
            <FullscreenContainer>
                <Container align={'center'}>
                    <h1>Сообщение о краже</h1>
                    <Spacer size="xs" />
                </Container>
                <Container size="small" align={'center'}>
                    <p>
                        Если вы столкнулись с кражей арендованного велосипеда, пожалуйста, заполните
                        эту форму, чтобы мы могли немедленно принять меры и помочь вам восстановить
                        потерянное имущество.
                    </p>
                    <Spacer size="m" />
                    <Box>
                        <FormReport />
                    </Box>
                </Container>
            </FullscreenContainer>
        </>
    );
};
