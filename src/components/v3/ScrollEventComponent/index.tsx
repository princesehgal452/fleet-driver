import React, { ReactNode, useCallback, useEffect } from 'react';

interface IScrollEventComponentOwnProps {
  children: ReactNode;
  onScrollUp?: () => void;
  onScrollDown?: () => void;
}

type IScrollEventComponentProps = IScrollEventComponentOwnProps;
let lastScrollPos = 0;
const ScrollEventComponent = ({ children, onScrollUp, onScrollDown }: IScrollEventComponentProps) => {

  const handleScroll = useCallback((e) => {
    const currentScrollPos = e.srcElement.scrollTop;
    if (lastScrollPos > currentScrollPos) {
      if (onScrollDown) {
        onScrollDown();
      }
    } else if (lastScrollPos < currentScrollPos) {
      if (onScrollUp) {
        onScrollUp();
      }
    }
    lastScrollPos = currentScrollPos;
  }, [lastScrollPos]);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll, true);
    return () => {
      document.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  return (
    <div>
      {children}
    </div>
  );
};
export default ScrollEventComponent;
