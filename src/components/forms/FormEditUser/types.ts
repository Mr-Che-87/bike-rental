import { TUser } from '../../../store/userSlice/types';

export type TFormEditUser = {
    officer: TUser;
};

export type TFormEditUserInputs = {
    approved: boolean;
};
