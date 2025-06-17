import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const images = ['/assets/test3.jpg', '/assets/test.jpg', '/assets/test2.jpg', '/assets/test3.jpg', '/assets/test.jpg'];

  useEffect(() => {
    if (carouselRef.current !== null) {
      carouselRef.current.style.transform = `translateX(-${currentIndex * 800}px)`;
    }
  }, [currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const moveToNthSlide = (index: number) => {
    setTimeout(() => {
      setCurrentIndex(index);
      if (carouselRef.current !== null) {
        carouselRef.current.style.transition = '';
      }
    }, 500);
  };

  const handleSwipe = (direction: number) => {
    const newIndex = currentIndex + direction;

    if (newIndex === 4) {
      moveToNthSlide(1);
    } else if (newIndex === 0) {
      moveToNthSlide(3);
    }

    setCurrentIndex((prev) => prev + direction);
    if (carouselRef.current !== null) {
      carouselRef.current.style.transition = 'all 0.5s ease-in-out';
    }
  };

  return (
    <>
      <div className="carousel">
        <button className="prev" onClick={() => handleSwipe(-1)}>
          &#10094;
        </button>
        <div className="carousel-images" ref={carouselRef}>
          {images.map((image, index) => (
            <div key={index}>
              <Image src={image} alt={`Slide ${index + 1}`} width={800} height={500} />
            </div>
          ))}
        </div>
        <button className="next" onClick={() => handleSwipe(1)}>
          &#10095;
        </button>
      </div>
      <style jsx>{`
        .carousel {
          position: relative;
          width: 800px;
          height: 500px;
          margin: 0 auto;
          overflow: hidden;
          border: 2px solid #ddd;
        }

        .carousel-images {
          display: flex;
          //transition: transform 0.5s ease-in-out;
          // transform: translateX(-${currentIndex * 800}px);
        }

        button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          font-size: 30px;
          padding: 10px;
          cursor: pointer;
          z-index: 1;
        }

        .prev {
          left: 0;
        }

        .next {
          right: 0;
        }

        button:hover {
          background-color: rgba(0, 0, 0, 0.8);
        }
      `}</style>
    </>
  );
}
