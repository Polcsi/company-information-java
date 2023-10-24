/* 
  This component creates a button on the right bottom corner that scrolls top of the page. The button is only visible when the user is scrolled.
*/

import { useEffect, useState, useCallback } from "react";
import { FaArrowUp } from "react-icons/fa";

const TopScrollButton = () => {
  // state for scrolling distance
  const [scrollTopDistance, setScrollTopDistance] = useState<number>(0);

  const scrollEvent = useCallback(() => {
    setScrollTopDistance(window.pageYOffset);
  }, []);

  useEffect(() => {
    // add event listener for scroll event
    window.addEventListener("scroll", scrollEvent);

    return () => {
      // remove event listener for scroll event
      window.removeEventListener("scroll", scrollEvent);
    };
  }, [scrollEvent]);

  // The component is only rendered when the scrolling distance is above 200
  if (scrollTopDistance < 200) {
    return null;
  } else {
    return (
      <div
        className="top-scroll-container"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <FaArrowUp />
      </div>
    );
  }
};

export default TopScrollButton;
