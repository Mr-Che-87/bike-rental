import { ElementType, FC } from 'react';
//tools
import clsx from 'clsx';
//styles
import style from './Container.module.css';
//types
import { TContainer } from './types';

export const Container: FC<TContainer> = ({
    children,
    size = 'big',
    className,
    as = 'div',
    align = 'left',
}) => {
    const TitleTag: ElementType = as;
    return (
        <TitleTag
            className={clsx(style.container, style[size], style[align], className && className)}
        >
            <div className={style.inner}>{children}</div>
        </TitleTag>
    );
};
