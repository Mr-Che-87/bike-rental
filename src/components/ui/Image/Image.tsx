import { FC } from 'react';
//tools
import { clsx } from 'clsx';
//styles
import style from './Image.module.css';
//types
import { TImage } from './types';

export const Image: FC<TImage> = ({ width, height, alt, lazy, src, sources, className }) => {
    return (
        <picture className={clsx(style.image, className && className)}>
            {sources?.map((item, i) => {
                return (
                    <source
                        key={i}
                        media={item.breakpoint ? `(max-width: ${item.breakpoint}px)` : undefined}
                        srcSet={item.srcSet.toString()}
                        type={`image/${item.type}`}
                    />
                );
            })}
            <img
                src={src}
                loading={lazy ? 'lazy' : 'eager'}
                width={width}
                height={height}
                alt={alt}
            />
        </picture>
    );
};
