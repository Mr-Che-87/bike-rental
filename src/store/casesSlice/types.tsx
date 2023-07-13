export type TCasesSlice = {
    cases: Array<TCase>;
};

export type TCase = {
    _id: string;
    color: string;
    createdAt: string;
    date: string;
    description: string;
    licenseNumber: string;
    officer: string;
    ownerFullName: string;
    status: string;
    type: string;
    resolution: string;
};
