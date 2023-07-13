import { FC } from 'react';
//styles
import style from './Logo.module.css';
//types
import { TLogo } from './types';
//tools
import clsx from 'clsx';

export const Logo: FC<TLogo> = ({ className }) => {
    return (
        <a href={'/'} className={clsx(className && className, style.logo)}>
            В
        </a>
    );
};
