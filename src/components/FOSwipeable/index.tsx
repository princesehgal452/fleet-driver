import React, { ReactNode, useCallback, useEffect, useRef } from 'react';

interface IFOSwipeableOwnProps {
  children: ReactNode;
  onSwipeUp?: () => void;
  onSwipeRight?: () => void;
  onSwipeDown?: () => void;
  onSwipeLeft?: () => void;
}

type IFOSwipeableProps = IFOSwipeableOwnProps;

const FOSwipeable = ({ children, onSwipeUp, onSwipeRight, onSwipeDown, onSwipeLeft }: IFOSwipeableProps) => {
  const foSwipeableRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    foSwipeableRef.current.addEventListener('touchstart', startTouch, false);
    foSwipeableRef.current.addEventListener('touchmove', moveTouch, false);
    return () => {
      foSwipeableRef.current.removeEventListener('touchstart', startTouch);
      foSwipeableRef.current.removeEventListener('touchmove', moveTouch);
    };
  }, []);

  let initialX = null;
  let initialY = null;

  const startTouch = useCallback((e)=> {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
  }, [])

  const moveTouch = useCallback((e)=> {
    if (initialX === null) {
      return;
    }
    if (initialY === null) {
      return;
    }
    let currentX = e.touches[0].clientX;
    let currentY = e.touches[0].clientY;

    let diffX = initialX - currentX;
    let diffY = initialY - currentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        if(onSwipeLeft){
          onSwipeLeft();
        }
      } else {
        if(onSwipeRight){
          onSwipeRight();
        }
      }
    } else {
      if (diffY > 0) {
        if(onSwipeUp){
          onSwipeUp();
        }
      } else {
        if(onSwipeDown && !e.target.closest('.ignore-FOSwipeable')){
          onSwipeDown();
        }
      }
    }
    initialX = null;
    initialY = null;
    e.preventDefault();
  }, [])
  
  return (
    <div ref={foSwipeableRef}>
      {children}
    </div>
  );
};

export default FOSwipeable;
