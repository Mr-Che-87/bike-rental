import { createSlice } from '@reduxjs/toolkit';
//types
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { TCase, TCasesSlice } from './types';

const initialState: TCasesSlice = {
    cases: [],
};

export const casesSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addCases: (state, action: PayloadAction<TCasesSlice['cases']>) => {
            state.cases = action.payload;
        },
        updateCases: (state, action: PayloadAction<TCase>) => {
            state.cases = [
                ...state.cases.filter((item) => item._id !== action.payload._id),
                action.payload,
            ];
        },
        cleanCases: (state) => {
            state.cases = initialState['cases'];
        },
    },
});

export const { addCases, updateCases, cleanCases } = casesSlice.actions;

export const selectCases = (state: RootState) => state.cases.cases;

export default casesSlice.reducer;
