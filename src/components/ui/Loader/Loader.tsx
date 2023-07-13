import type { FC } from 'react';
//ui
import { FullscreenContainer } from '../FullscreenContainer';
//styles
import style from './Loader.module.css';

export const Loader: FC = () => {
    return (
        <FullscreenContainer hasPadding={false} hasFooter={false}>
            <svg
                className={style.loader}
                xmlns="http://www.w3.org/2000/svg"
                viewBox={`0 0 24 24`}
                fill="none"
            >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                    fill="#000"
                    d="M12 2a1 1 0 011 1v3a1 1 0 01-2 0V3a1 1 0 011-1zm0 15a1 1 0 011 1v3a1 1 0 01-2 0v-3a1 1 0 011-1zm8.66-10a1 1 0 01-.366 1.366l-2.598 1.5a1 1 0 11-1-1.732l2.598-1.5A1 1 0 0120.66 7zM7.67 14.5a1 1 0 01-.366 1.366l-2.598 1.5a1 1 0 11-1-1.732l2.598-1.5a1 1 0 011.366.366zM20.66 17a1 1 0 01-1.366.366l-2.598-1.5a1 1 0 011-1.732l2.598 1.5A1 1 0 0120.66 17zM7.67 9.5a1 1 0 01-1.366.366l-2.598-1.5a1 1 0 111-1.732l2.598 1.5A1 1 0 017.67 9.5z"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        repeatCount="indefinite"
                        dur="2s"
                        values="0 12 12;360 12 12"
                        keyTimes="0;1"
                    />
                </path>
            </svg>
        </FullscreenContainer>
    );
};
