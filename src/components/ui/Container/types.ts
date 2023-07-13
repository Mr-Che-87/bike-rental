import { ElementType, ReactNode } from 'react';

export type TContainer = {
    children: ReactNode;
    size?: 'big' | 'small';
    className?: string;
    align?: 'left' | 'center';
    as?: ElementType;
};
