import { createSlice } from '@reduxjs/toolkit';
//types
import type { TUserSlice } from './types';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

const initialState: TUserSlice = {
    userData: null,
};

export const userSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<TUserSlice['userData']>) => {
            state.userData = action.payload;
            localStorage.setItem('br_auth_token', `${action.payload?.token}`);
        },
        logoutUser: (state) => {
            state.userData = initialState['userData'];
            localStorage.removeItem('br_auth_token');
        },
    },
});

export const { loginUser, logoutUser } = userSlice.actions;

export const selectUserData = (state: RootState) => state.user.userData;

export default userSlice.reducer;
