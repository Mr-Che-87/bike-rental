import { FC } from 'react';
//tools
import { useNavigate } from 'react-router-dom';
//styles
import style from './CasesList.module.css';
//types
import type { TCasesList } from './types';
import { Button } from '../../ui/Button';
//ui

export const CasesList: FC<TCasesList> = ({ cases }) => {
    const navigate = useNavigate();
    return (
        <div className={style.list}>
            {cases.map((item, i) => {
                return (
                    <div key={i} className={style.row}>
                        <div className={style.info}>Кража велосипеда: {item.licenseNumber}</div>
                        <div className={style.actions}>
                            <Button
                                text="✎"
                                onClick={() => navigate(`/account/cases/${item._id}`)}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
