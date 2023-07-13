import { FC } from 'react';
//styles
import style from './Button.module.css';
//types
import { TButton } from './types';
//tools
import clsx from 'clsx';

export const Button: FC<TButton> = ({
    text,
    onClick,
    className,
    isLoading,
    type = 'button',
    color = 'dark',
    isFullwidth,
}) => {
    const handleClick = async () => {
        if (isLoading || !onClick) return false;
        onClick();
    };
    return (
        <button
            type={type}
            className={clsx(
                style.button,
                style[color],
                isFullwidth && style['full-width'],
                className && className
            )}
            onClick={handleClick}
        >
            {text}
        </button>
    );
};
