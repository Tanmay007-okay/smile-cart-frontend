// 1. Import useRef here!
import { useState, useEffect, useRef } from "react";

import classNames from "classnames";
import { Left, Right } from "neetoicons";
import { Button } from "neetoui";

const Carousel = ({ imageUrls, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 2. Create the "Sticky Note" for our timer
  const timerRef = useRef(null);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length
    );
    // 3. Reset timer on manual click
    resetTimer();
  };

  // 4. The function that destroys the old timer and makes a new one
  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(handleNext, 3000);
  };

  useEffect(() => {
    // 5. Save the timer to the sticky note (.current)
    timerRef.current = setInterval(handleNext, 3000);

    // Clean up when leaving the page
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <Button
          className="shrink-0 focus-within:ring-0 hover:bg-transparent"
          icon={Left}
          style="text"
          onClick={handlePrevious}
        />
        <img
          alt={title}
          className="max-w-56 h-56 max-h-56 w-56"
          src={imageUrls[currentIndex]}
        />
        <Button
          className="shrink-0 focus-within:ring-0 hover:bg-transparent"
          icon={Right}
          style="text"
          onClick={() => {
            handleNext();
            // 6. Reset timer on manual right click
            resetTimer();
          }}
        />
      </div>
      <div className="mt-4 flex space-x-1">
        {imageUrls.map((_, index) => (
          <span
            key={index}
            className={classNames(
              "neeto-ui-border-black neeto-ui-rounded-full h-3 w-3 cursor-pointer border",
              { "neeto-ui-bg-black": index === currentIndex }
            )}
            onClick={() => {
              setCurrentIndex(index);
              // 7. Reset timer when clicking a dot
              resetTimer();
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
