import React from 'react';
import type { ImgHTMLAttributes } from 'react';
interface Breakpoint {
    maxWidth: number;
    zoomFactor: number;
}
interface ImageZoomProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    defaultZoomFactor?: number;
    transition?: number;
    breakpoints?: Breakpoint[];
    imgClassName?: string;
    debug?: boolean;
}
declare const _default: React.NamedExoticComponent<ImageZoomProps>;
export default _default;
