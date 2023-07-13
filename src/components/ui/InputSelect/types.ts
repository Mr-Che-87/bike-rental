import { Ref } from 'react';
import { FieldError } from 'react-hook-form';

export type TInputSelect = {
    defaultValue?: string;
    error?: FieldError;
    label: string;
    ref?: Ref<HTMLSelectElement>;
    options: Array<{
        id: string;
        text: string;
    }>;
};
