import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
//ui
import { Spacer } from '../Spacer';
import { Image } from '../Image';
import { Button } from '../Button/Button';
//styles
import style from './HeroBanner.module.css';
//types
import { THeroBanner } from './types';

export const HeroBanner: FC<THeroBanner> = ({ title, text, button, image }) => {
    const navigate = useNavigate();
    return (
        <section className={style.banner}>
            <div className={style.info}>
                <h1 className={style.title}>{title}</h1>
                <Spacer size={'xs'} />
                <p className={style.text}>{text}</p>
                <Spacer size={'m'} />
                <Button
                    className={style.button}
                    color={'light'}
                    text={button.text}
                    onClick={() => navigate('/sign-up')}
                />
            </div>
            <Image className={style.image} {...image} />
        </section>
    );
};
