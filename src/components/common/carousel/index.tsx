import { useState } from 'react';
import Image from 'next/image';

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = ['/assets/test.jpg', '/assets/test2.jpg', '/assets/test3.jpg'];

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="carousel">
        <button className="prev" onClick={goToPrev}>
          &#10094;
        </button>
        <div className="carousel-images">
          <Image src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} width={800} height={500} />
        </div>
        <button className="next" onClick={goToNext}>
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
          transition: transform 0.5s ease;
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
