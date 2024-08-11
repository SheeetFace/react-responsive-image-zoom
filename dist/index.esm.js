import React, { memo, useState, useRef, useMemo, useCallback, useEffect } from 'react';

const ImageZoom = ({ src, defaultZoomFactor = 1.3, transition = .3, breakpoints = [], imgClassName, debug = false, }) => {
    const [zoom, setZoom] = useState(false);
    const [currentZoomFactor, setCurrentZoomFactor] = useState(defaultZoomFactor);
    const [screenWidthDebug, setScreenWidthDebug] = useState(window.innerWidth);
    const imgRef = useRef(null);
    const sortedBreakpoints = useMemo(() => {
        return [...breakpoints].sort((a, b) => a.maxWidth - b.maxWidth);
    }, [breakpoints]);
    const calculateZoomFactor = useCallback(() => {
        const screenWidth = window.innerWidth;
        let newZoomFactor = defaultZoomFactor;
        if (debug)
            setScreenWidthDebug(screenWidth);
        for (const bp of sortedBreakpoints) {
            if (screenWidth <= bp.maxWidth) {
                newZoomFactor = bp.zoomFactor;
                break;
            }
        }
        setCurrentZoomFactor(newZoomFactor);
    }, [sortedBreakpoints, defaultZoomFactor]);
    useEffect(() => {
        calculateZoomFactor();
        window.addEventListener('resize', calculateZoomFactor);
        return () => { window.removeEventListener('resize', calculateZoomFactor); };
    }, [sortedBreakpoints, defaultZoomFactor]);
    const handleMouseMove = useCallback((e) => {
        if (zoom && imgRef.current) {
            const { left, top, width, height } = imgRef.current.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            imgRef.current.style.transformOrigin = `${x * 100}% ${y * 100}%`;
        }
    }, [zoom]);
    return (React.createElement("div", { style: { overflow: 'hidden' }, onMouseEnter: () => setZoom(true), onMouseLeave: () => setZoom(false), onMouseMove: handleMouseMove },
        React.createElement("img", { ref: imgRef, src: src, className: imgClassName, style: {
                transition: `transform ${transition}s ease-out`,
                transform: zoom ? `scale(${currentZoomFactor})` : 'scale(1)',
                maxWidth: '100%',
                height: 'auto',
            } }),
        debug && (React.createElement("div", { style: {
                position: 'absolute',
                top: 5,
                left: 5,
                background: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '.3rem',
                fontSize: '.7rem',
            } },
            "w:",
            screenWidthDebug,
            "px, zoom:",
            currentZoomFactor.toFixed(2)))));
};
var ImageZoom$1 = memo(ImageZoom);

export { ImageZoom$1 as ImageZoom };
//# sourceMappingURL=index.esm.js.map
