import React, { useState, useRef, useEffect, useMemo, memo, useCallback } from 'react';

import type { ImgHTMLAttributes, MouseEvent } from 'react';

interface Breakpoint{
  maxWidth:number
  zoomFactor:number
}

interface ImageZoomProps extends ImgHTMLAttributes<HTMLImageElement>{
  src:string
  defaultZoomFactor?:number
  transition?:number
  breakpoints?:Breakpoint[]
  imgClassName?:string
  debug?: boolean
}

const ImageZoom:React.FC<ImageZoomProps>=({
  src,
  defaultZoomFactor = 1.3,
  transition = .3,
  breakpoints = [],
  imgClassName,
  debug = false,
})=>{

  const [zoom, setZoom] = useState<boolean>(false);
  const [currentZoomFactor, setCurrentZoomFactor] = useState<number>(defaultZoomFactor);
  const [screenWidthDebug, setScreenWidthDebug] = useState<number>(window.innerWidth);

  const imgRef = useRef<HTMLImageElement>(null);

  const sortedBreakpoints = useMemo(()=>{
    return [...breakpoints].sort((a,b)=> a.maxWidth - b.maxWidth)
  },[breakpoints])

  const calculateZoomFactor=useCallback(()=>{
    const screenWidth = window.innerWidth;
    let newZoomFactor = defaultZoomFactor;

    if(debug) setScreenWidthDebug(screenWidth);

    for(const bp of sortedBreakpoints){
      if(screenWidth <= bp.maxWidth){
        newZoomFactor = bp.zoomFactor
        break
      }
    }

    setCurrentZoomFactor(newZoomFactor);
  },[sortedBreakpoints, defaultZoomFactor])

  useEffect(()=>{
    calculateZoomFactor();
    window.addEventListener('resize',calculateZoomFactor);
    
    return()=>{window.removeEventListener('resize',calculateZoomFactor)}

  },[sortedBreakpoints, defaultZoomFactor])

  const handleMouseMove =useCallback((e:MouseEvent<HTMLDivElement>)=>{
    if(zoom && imgRef.current){
      const {left,top,width,height} = imgRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      imgRef.current.style.transformOrigin = `${x * 100}% ${y * 100}%`;
    }
  },[zoom])

  return(
    <div style={{overflow:'hidden'}}
         onMouseEnter={()=>setZoom(true)}
         onMouseLeave={()=>setZoom(false)}
         onMouseMove={handleMouseMove}
    >

      <img  ref={imgRef} src={src}
            className={imgClassName}
            style={{
              transition: `transform ${transition}s ease-out`,
              transform: zoom ? `scale(${currentZoomFactor})` : 'scale(1)',
              maxWidth: '100%',
              height: 'auto',
            }}
        />
        {debug && (
          <div style={{
                position: 'absolute',
                top: 5,
                left: 5,
                background: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '.3rem',
                fontSize: '.7rem',
              }}
          >
            w:{screenWidthDebug}px, zoom:{currentZoomFactor.toFixed(2)}
          </div>
        )}

      </div>
  )
}

export default memo(ImageZoom);