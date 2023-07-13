import { createSelector, createSlice } from '@reduxjs/toolkit';
//types
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { TOfficersSlice } from './types';
import type { TUser } from '../userSlice/types';

const initialState: TOfficersSlice = {
    officers: [],
};

export const officersSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addOfficers: (state, action: PayloadAction<TOfficersSlice['officers']>) => {
            state.officers = action.payload;
        },
        updateOfficers: (state, action: PayloadAction<TUser>) => {
            state.officers = [
                ...state.officers.filter((item) => item._id !== action.payload._id),
                action.payload,
            ];
        },
        removeOfficer: (state, action: PayloadAction<string>) => {
            state.officers = state.officers.filter((item) => item._id !== action.payload);
        },
        cleanOfficers: (state) => {
            state.officers = initialState['officers'];
        },
    },
});

export const { addOfficers, cleanOfficers, removeOfficer, updateOfficers } = officersSlice.actions;

export const selectOfficers = (state: RootState) => state.officers.officers;
export const selectOfficersShortList = createSelector(
    (state: RootState) => state.officers.officers,
    (officers) => {
        if (officers) {
            let shortList: Array<{ id: string; text: string }> = [];

            officers
                .filter((item) => item.approved)
                .forEach((item) => {
                    shortList.push({ id: item._id, text: item.email });
                });

            return shortList;
        }
    }
);
export default officersSlice.reducer;
