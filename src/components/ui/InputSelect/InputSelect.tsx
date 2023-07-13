import { FC, forwardRef } from 'react';
import clsx from 'clsx';
//styles
import style from './InputSelect.module.css';
//types
import { TInputSelect } from './types';
//ui
import { Spacer } from '../Spacer';

export const InputSelect: FC<TInputSelect> = forwardRef(
    ({ error, label, options, defaultValue, ...rest }, ref) => {
        return (
            <label className={clsx(style.label, error && style.error)}>
                <span className={style.text}>{label}</span>
                <Spacer size={'xxs'} />
                <select
                    ref={ref}
                    className={clsx(style.input, error && style.error)}
                    defaultValue={defaultValue}
                    {...rest}
                >
                    {options.map((option, i) => {
                        return (
                            <option key={i} value={option.id}>
                                {option.text}
                            </option>
                        );
                    })}
                </select>
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
