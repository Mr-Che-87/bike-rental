import { TImage } from '../Image/types';

export type THeroBanner = {
    title: string;
    text: string;
    button: {
        text: string;
        href: string;
    };
    image: TImage;
};
