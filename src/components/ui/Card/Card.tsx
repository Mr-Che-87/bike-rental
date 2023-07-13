import { FC } from 'react';
//styles
import style from './Card.module.css';
//types
import { TCard } from './types';
//ui
import { Image } from '../Image';
import { Spacer } from '../Spacer';

export const Card: FC<TCard> = ({ title, text, image }) => {
    return (
        <div className={style.card}>
            <div className={style.image}>
                <Image {...image} />
            </div>
            <div className={style.info}>
                <p className={style.title}>{title}</p>
                <Spacer size={'xs'} />
                <p className={style.text}>{text}</p>
            </div>
        </div>
    );
};
