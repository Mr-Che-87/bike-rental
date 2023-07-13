export type TButton = {
    type?: 'button' | 'submit';
    text: string;
    onClick?: () => void;
    className?: string;
    isLoading?: boolean;
    isFullwidth?: boolean;
    color?: 'dark' | 'light';
};
