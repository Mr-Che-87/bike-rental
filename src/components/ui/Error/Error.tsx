import { FC } from 'react';
//styles
import style from './Error.module.css';
import { TError } from './types';

export const Error: FC<TError> = ({ children }) => {
    return <div className={style.error}>{children}</div>;
};
