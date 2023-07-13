import { FC, forwardRef } from 'react';
import clsx from 'clsx';
//styles
import style from './Input.module.css';
//types
import { TInput } from './types';
//ui
import { Spacer } from '../Spacer';

export const Input: FC<TInput> = forwardRef(
    ({ error, value, label, type = 'text', ...rest }, ref) => {
        return (
            <label className={clsx(style.label, error && style.error)}>
                <span className={style.text}>{label}</span>
                <Spacer size={'xxs'} />
                <input
                    ref={ref}
                    className={clsx(style.input, error && style.error)}
                    type={type}
                    {...rest}
                />
                {error && (
                    <>
                        <Spacer size={'xxs'} />
                        <span className={style.error}>{error.message}</span>
                    </>
                )}
            </label>
        );
    }
);
