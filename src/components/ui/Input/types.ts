import { Ref } from 'react';
import { FieldError } from 'react-hook-form';

export type TInput = {
    type?: 'email' | 'text' | 'password';
    value?: string;
    error?: FieldError;
    label: string;
    ref?: Ref<HTMLInputElement>;
};
