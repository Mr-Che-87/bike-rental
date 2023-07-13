import { FC, useEffect, useState } from 'react';
//router
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { MainPage } from '../MainPage/MainPage';
import { AccountPage } from '../Account/Account';
import { SignUp } from '../SignUp';
import { Report } from '../Report/Report';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, selectUserData } from '../../../store/userSlice/userSlice';
import { addMessage } from '../../../store/notificationsSlice/notificationsSlice';
import { apiErrorHandler, checkToken, getCases, getOfficers } from '../../../tools/api';
import { addOfficers } from '../../../store/officersSlice/officersSlice';
import { Loader } from '../../ui/Loader/Loader';
import { CasesPage } from '../Cases/Cases';
import { AdminsPage } from '../Admins';
import { AdminPage } from '../AdminPage';
import { addCases } from '../../../store/casesSlice/casesSlice';
import { CasePage } from '../CasePage/CasePage';
import { ReportSuccess } from '../ReportSuccess/ReportSuccess';
import { Notifications } from '../../ui/Notifications/Notifications';

const router = createBrowserRouter([
    { path: '/', element: <MainPage /> },
    { path: '/account', element: <AccountPage /> },
    { path: '/account/admins', element: <AdminsPage /> },
    { path: '/account/admins/:id', element: <AdminPage /> },
    { path: '/account/cases', element: <CasesPage /> },
    { path: '/account/cases/:id', element: <CasePage /> },
    { path: '/sign-up', element: <SignUp /> },
    { path: '/report', element: <Report /> },
    { path: '/report-success', element: <ReportSuccess /> },
]);

export const Root: FC = ({}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const userData = useSelector(selectUserData);
    const dispatch = useDispatch();

    const checkForAuth = async () => {
        try {
            const userData = await checkToken();
            if (!userData) {
                setIsLoaded(true);
            } else {
                dispatch(loginUser(userData));
                if (userData.user.approved === false) {
                    setIsLoaded(true);
                }
            }
        } catch (error) {
            dispatch(addMessage(apiErrorHandler(error)));
        }
    };

    const getAdminContent = async () => {
        try {
            const officers = await getOfficers();
            const cases = await getCases();
            dispatch(addCases(cases));
            dispatch(addOfficers(officers));
        } catch (error) {
            dispatch(addMessage(apiErrorHandler(error)));
        }
        setIsLoaded(true);
    };

    useEffect(() => {
        if (userData?.user.approved) {
            getAdminContent();
        }
    }, [userData]);

    useEffect(() => {
        checkForAuth();
    }, []);

    if (!isLoaded) {
        return <Loader />;
    }

    return (
        <>
            <RouterProvider router={router} />
            <Notifications />
        </>
    );
};
