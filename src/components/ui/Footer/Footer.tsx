import { FC } from 'react';
import clsx from 'clsx';
//styles
import style from './Footer.module.css';
//ui
import { Container } from '../Container';
//types
import { TFooter } from './types';

export const Footer: FC<TFooter> = ({ className }) => {
    const currentYear = new Date().getFullYear();
    return (
        <Container as={'footer'} className={clsx(style.footer, className && className)}>
            <div className={style.inner}>
                <p>Велопрокат © {currentYear}</p>
            </div>
        </Container>
    );
};
