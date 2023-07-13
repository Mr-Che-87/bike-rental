import { FC } from 'react';
//tools
import clsx from 'clsx';
//styles
import style from './Spacer.module.css';
//types
import { TSpacerProps } from './types';

export const Spacer: FC<TSpacerProps> = ({ size }) => {
    return <div className={clsx(style.spacer, style[`size-${size}`])} />;
};
