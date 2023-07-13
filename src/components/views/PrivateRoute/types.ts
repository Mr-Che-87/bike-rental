import { ReactNode } from 'react';

export type TPrivateRoute = {
    children: ReactNode;
    onlyAdmin?: boolean;
};
