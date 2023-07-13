import { ChangeEvent, ReactNode } from 'react';

export type TCheckbox = {
    className?: string;
    defaultChecked?: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    children: ReactNode;
};
