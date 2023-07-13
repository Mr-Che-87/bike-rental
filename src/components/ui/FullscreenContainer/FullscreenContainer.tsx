import { FC } from 'react';
import clsx from 'clsx';
//styles
import style from './FullscreenContainer.module.css';
//types
import { TFullscreenContainer } from './types';
import { Footer } from '../Footer';

export const FullscreenContainer: FC<TFullscreenContainer> = ({
    children,
    hasPadding = true,
    hasFooter = true,
}) => {
    return (
        <div className={clsx(style.wrap, hasPadding && style['has-padding'])}>
            <div className={style.content}>
                <div className={style.inner}>{children}</div>
            </div>
            {hasFooter && <Footer className={style.footer} />}
        </div>
    );
};
