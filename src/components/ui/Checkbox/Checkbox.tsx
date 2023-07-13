import { FC, forwardRef } from 'react';
//tools
import clsx from 'clsx';
//styles
import style from './Checkbox.module.css';
//types
import { TCheckbox } from './types';

export const Checkbox: FC<TCheckbox> = forwardRef(
    ({ defaultChecked, onChange, className, children, ...rest }, ref: any) => {
        return (
            <label className={clsx(style.label, className && className)}>
                <input
                    ref={ref}
                    defaultChecked={defaultChecked}
                    className={style.checkbox}
                    type="checkbox"
                    onChange={onChange}
                    {...rest}
                />
                <span className={style.text}>{children}</span>
            </label>
        );
    }
);
