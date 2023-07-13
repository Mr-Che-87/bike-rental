type TSource = {
    type: string;
    srcSet: Array<string>;
    breakpoint?: number;
};

export type TImage = {
    width: number;
    height: number;
    alt: string;
    lazy?: boolean;
    src: string;
    sources?: Array<TSource>;
    className?: string;
};
