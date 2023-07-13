import { TImage } from '../Image/types';

export type TCard = {
    title: string;
    text: string;
    image: Omit<TImage, 'className'>;
    licenseNumber: string;
    color: string;
    type: string;
};
