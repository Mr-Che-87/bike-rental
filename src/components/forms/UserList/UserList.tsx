import { FC } from 'react';
//tools
import { useNavigate } from 'react-router-dom';
//styles
import style from './UserList.module.css';
//types
import type { TUserList } from './types';
//ui
import { Button } from '../../ui/Button';
import { DeleteUserButton } from './components/DeleteUserButton/DeleteUserButton';

export const UserList: FC<TUserList> = ({ users }) => {
    const navigate = useNavigate();
    return (
        <div className={style.list}>
            {users.map((user, i) => {
                return (
                    <div key={i} className={style.row}>
                        <div className={style.info}>{user.email}</div>
                        <div className={style.type}>{user.approved && 'Админ'}</div>
                        <div className={style.actions}>
                            <Button
                                text="✎"
                                onClick={() => navigate(`/account/admins/${user._id}`)}
                            />
                            <DeleteUserButton id={user._id} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
