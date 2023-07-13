import axios, { AxiosResponse, isAxiosError } from 'axios';
//types
import type { TUser, TUserSlice } from '../store/userSlice/types';
import type { TFormReportInputs } from '../components/forms/FormReport/types';
import type { TFormSignUpInputs } from '../components/forms/FormSignUp/types';
import type { TFormEditUserInputs } from '../components/forms/FormEditUser/types';
import type { TCase, TCasesSlice } from '../store/casesSlice/types';

const authToken = localStorage.getItem('br_auth_token');

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,  //клиент ID  файл .env
    headers: {
        common: {
            Authorization: authToken ? `Bearer ${authToken}` : undefined,
        },
    },
});

export const apiErrorHandler = (error: any) => {
    if (isAxiosError(error) && error.response) {
        return error.response.data;
    } else {
        return {
            errCode: 'SOMETHING_WENT_WRONG',
            message: 'Что-то пошло не так',
            status: 'ERR',
        };
    }
};

export const signInUser = async (email: string, password: string) => {  //логин-пароль
    try {
        const result: AxiosResponse<{ data: TUserSlice['userData'] }> = await api.post(
            '/auth/sign_in',
            {
                email: email,
                password: password,
            }
        );

        api.defaults.headers.common['Authorization'] = `Bearer ${result.data.data?.token}`;

        return result;
    } catch (error) {
        throw error;
    }
};

export const signUpUser = async (data: TFormSignUpInputs) => {
    try {
        await api.post('/auth/sign_up', {
            ...data,
            clientId: import.meta.env.VITE_CLIENT_ID,
        });

        return true;
    } catch (error) {
        throw error;
    }
};

export const checkToken = async () => {
    if (!authToken) return false;
    try {
        const result: AxiosResponse<{ data: TUserSlice['userData'] }> = await api.get('/auth');
        return result.data.data;
    } catch (error) {
        throw error;
    }
};

export const sendPublicReport = async (
    data: TFormReportInputs & { color: string; type: string; officer?: string }
) => {
    try {
        const result = await api.post('/public/report', {
            ...data,
            status: 'new',
            clientId: import.meta.env.VITE_CLIENT_ID,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return result;
    } catch (error) {
        throw error;
    }
};

export const sendAuthenticatedReport = async (
    data: TFormReportInputs & { color: string; type: string; officer?: string }
) => {
    try {
        const result = await api.post('/cases', {
            ...data,
            status: 'new',
            clientId: import.meta.env.VITE_CLIENT_ID,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return result;
    } catch (error) {
        throw error;
    }
};

export const getOfficers = async () => {
    try {
        const result: AxiosResponse<{ officers: TUser[] }> = await api.get('/officers');
        return result.data.officers;
    } catch (error) {
        throw error;
    }
};

export const updateOfficer = async (id: string, data: TFormEditUserInputs) => {
    try {
        const result = await api.put(`/officers/${id}`, data);
        return result;
    } catch (error) {
        throw error;
    }
};

export const deleteOfficer = async (id: string) => {
    try {
        const result = await api.delete(`/officers/${id}`);
        return result;
    } catch (error) {
        throw error;
    }
};

export const getCases = async () => {
    try {
        const result: AxiosResponse<{ data: TCasesSlice['cases'] }> = await api.get('/cases');
        return result.data.data;
    } catch (error) {
        throw error;
    }
};

export const updateCase = async (id: string, data: TCase) => {
    try {
        const result = await api.put(`/cases/${id}`, data);
        return result;
    } catch (error) {
        throw error;
    }
};
