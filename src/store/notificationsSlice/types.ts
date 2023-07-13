export type TNotificationsSlice = {
    notifications: TErrorNotification | null;
};

export type TErrorNotification = {
    errCode?: string;
    message: string;
    status: string;
};
