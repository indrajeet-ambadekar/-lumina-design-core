// src/Carousel.js

import React, { useState, useEffect, useRef } from "react";
import "./Carousel.scss";
import ChevronLeftIcon from "../../assets/icons/ChevronLeft.js";
import ChevronRightIcon from "../../assets/icons/ChevronRight.js";

const Carousel = ({
  children,
  dots = true,
  slideShowInterval,
  loop = true,
  className,
  id
}) => {
  const [currentIndex, setCurrentIndex] = useState(loop ? 1 : 0); // Start from the first slide if loop is false
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slideRef = useRef(null);

  const totalSlides = React.Children.count(children);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (loop) {
      if (currentIndex === 0) {
        // If we are on the fake first slide, reset to the last real slide
        setCurrentIndex(totalSlides);
        slideRef.current.style.transition = "none";
        slideRef.current.style.transform = `translateX(-${totalSlides * 100}%)`;
      } else if (currentIndex === totalSlides + 1) {
        // If we are on the fake last slide, reset to the first real slide
        setCurrentIndex(1);
        slideRef.current.style.transition = "none";
        slideRef.current.style.transform = `translateX(-100%)`;
      }
    }
  };

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => {
        if (loop) {
          return prevIndex + 1;
        } else {
          return Math.min(prevIndex + 1, totalSlides - 1);
        }
      });
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => {
        if (loop) {
          return prevIndex - 1;
        } else {
          return Math.max(prevIndex - 1, 0);
        }
      });
    }
  };

  useEffect(() => {
    if (isTransitioning) {
      slideRef.current.style.transition = "transform 0.5s ease-in-out";
      slideRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex, isTransitioning]);

  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        slideRef.current.style.transition = "transform 0.5s ease-in-out";
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  useEffect(() => {
    let interval;
    if (slideShowInterval && slideShowInterval > 5000) {
      interval = setInterval(() => {
        nextSlide();
      }, slideShowInterval);
    }
    return () => clearInterval(interval);
  }, [slideShowInterval, currentIndex]);

  return (
    <div className={`carousel ${className}`} id={id}>
      <button
        onClick={prevSlide}
        className="carousel-button"
        disabled={!loop && currentIndex === 0} // Disable Prev button if loop is false and on the first slide
      >
        <ChevronLeftIcon width={16} height={16} />
      </button>
      <div className="carousel-container">
        <div
          className="carousel-slide"
          ref={slideRef}
          onTransitionEnd={handleTransitionEnd}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {loop && (
            <div key={totalSlides + 1} className="carousel-item">
              {children[totalSlides - 1]}
            </div>
          )}
          {React.Children.map(children, (child, index) => (
            <div key={index} className="carousel-item">
              {child}
            </div>
          ))}
          {loop && (
            <div key={totalSlides + 2} className="carousel-item">
              {children[0]}
            </div>
          )}
        </div>
      </div>
      <button
        onClick={nextSlide}
        className="carousel-button"
        disabled={!loop && currentIndex === totalSlides - 1} // Disable Next button if loop is false and on the last slide
      >
        <ChevronRightIcon width={16} height={16} />
      </button>
      {dots && (
        <div className="carousel-dots">
          {React.Children.map(children, (_, index) => (
            <span
              key={index}
              className={`carousel-dot ${
                (loop && index === currentIndex - 1) ||
                (!loop && index === currentIndex)
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                !isTransitioning && setCurrentIndex(loop ? index + 1 : index)
              }
            ></span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
