export type TUser = {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    approved?: boolean;
};

export type TUserSlice = {
    userData: {
        token: string;
        user: TUser;
    } | null;
};
