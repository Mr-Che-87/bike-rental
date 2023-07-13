import { createSlice } from '@reduxjs/toolkit';
//types
import type { TNotificationsSlice } from './types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState: TNotificationsSlice = {
    notifications: null,
};

export const notificationsSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<TNotificationsSlice['notifications']>) => {
            state.notifications = action.payload;
        },
        clearMessage: (state) => {
            state.notifications = initialState['notifications'];
        },
    },
});

export const { addMessage, clearMessage } = notificationsSlice.actions;

export const selectNotifications = (state: RootState) => state.notifications.notifications;
export default notificationsSlice.reducer;
