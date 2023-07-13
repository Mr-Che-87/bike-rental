import { FC } from 'react';
//styles
import style from './Box.module.css';
//types
import { TBox } from './types';

export const Box: FC<TBox> = ({ children }) => {
    return <div className={style.box}>{children}</div>;
};
