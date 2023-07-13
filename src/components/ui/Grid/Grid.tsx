import { FC } from 'react';
//styles
import style from './Grid.module.css';
//types
import { TGrid } from './types';

export const Grid: FC<TGrid> = ({ children }) => {
    return <div className={style.grid}>{children}</div>;
};
