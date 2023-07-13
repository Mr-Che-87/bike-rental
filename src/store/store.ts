import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice/userSlice';
import notificationsSlice from './notificationsSlice/notificationsSlice';
import officersSlice from './officersSlice/officersSlice';
import casesSlice from './casesSlice/casesSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        notifications: notificationsSlice,
        officers: officersSlice,
        cases: casesSlice,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
