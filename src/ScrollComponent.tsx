import React, { useRef, useEffect } from 'react';

const ScrollComponent: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollHorizontally = (e: React.WheelEvent) => {
      e = window.event || e;
      const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
      if (divRef.current) {
        divRef.current.scrollLeft -= delta * 40; // Multiplied by 40
      }
      e.preventDefault();
    };

    const targetDiv = divRef.current;

    if (targetDiv) {
      if (targetDiv.addEventListener) {
        // IE9, Chrome, Safari, Opera
        targetDiv.addEventListener('wheel', scrollHorizontally, false);
        // Firefox
        targetDiv.addEventListener('DOMMouseScroll', scrollHorizontally, false);
      } else {
        // IE 6/7/8
        //targetDiv.attachEvent('onmousewheel', scrollHorizontally);
      }
    }

    return () => {
      if (targetDiv) {
        targetDiv.removeEventListener('wheel', scrollHorizontally);
        targetDiv.removeEventListener('DOMMouseScroll', scrollHorizontally);
        //targetDiv.detachEvent('onmousewheel', scrollHorizontally);
      }
    };
  }, []);

  return (<div className="markers" ref={divRef}>
    <ul>
        <li>Content here</li>
        <li>Content here</li>
        <li>Content here</li>
        <li>Content here</li>
        <li>Content here</li>
        <li>Content here</li>
    </ul>
  </div>);
};

export default ScrollComponent;