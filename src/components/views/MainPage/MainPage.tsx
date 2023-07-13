import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
//ui
import { Card } from '../../ui/Card/Card';
import { Header } from '../../ui/Header/Header';
import { Footer } from '../../ui/Footer';
import { Grid } from '../../ui/Grid/Grid';
import { Spacer } from '../../ui/Spacer';
import { HeroBanner } from '../../ui/HeroBanner/HeroBanner';
import { Container } from '../../ui/Container';
//content
import { bikes } from '../../../content/bikes';

export const MainPage: FC = () => {
    return (
        <>
            <Helmet>
                <title>Велопрокат</title>
            </Helmet>
            <Header />
            <Container as={'main'}>
                <Spacer size={'xl'} />
                <HeroBanner
                    title={'Велопрокат'}
                    text={
                        'Мы предлагаем удобные и надежные велосипеды, обеспечивающие комфорт и безопасность на протяжении всего пути.'
                    }
                    button={{
                        text: 'Создай аккаунт сейчас',
                        href: '/account',
                    }}
                    image={{
                        src: '/images/hero-banner/hero.jpg',
                        alt: 'Мужчина с велосипедом',
                        height: 1440,
                        width: 810,
                        sources: [
                            {
                                srcSet: ['/images/hero-banner/hero-mobile.avif'],
                                type: 'avif',
                                breakpoint: 724,
                            },
                            {
                                srcSet: ['/images/hero-banner/hero-mobile.webp'],
                                type: 'webp',
                                breakpoint: 724,
                            },
                            {
                                srcSet: ['/images/hero-banner/hero-mobile.jpg'],
                                type: 'jpg',
                                breakpoint: 724,
                            },
                        ],
                    }}
                />
                <Spacer size={'l'} />
                <h2>Велосипеды</h2>
                <Spacer size={'m'} />
                <Grid>
                    {bikes.map((bike, i) => {
                        return <Card key={i} {...bike} />;
                    })}
                </Grid>
            </Container>
            <Spacer size={'xl'} />
            <Footer />
        </>
    );
};
