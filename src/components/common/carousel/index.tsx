'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface CarouselProps {
  items: string[];
}

export default function Carousel({ items }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselItems, setCarouselItems] = useState<string[]>([]);

  useEffect(() => {
    if (items.length !== 0) {
      const startData = items[0];
      const endData = items[items.length - 1];
      const newList = [endData, ...items, startData];

      setCarouselItems(newList);
    }
  }, [items]);

  useEffect(() => {
    if (carouselRef.current !== null) {
      carouselRef.current.style.transform = `translateX(-${currentIndex * 800}px)`;
    }
  }, [currentIndex]);

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

    if (newIndex === items.length + 1) {
      moveToNthSlide(1);
    } else if (newIndex === 0) {
      moveToNthSlide(items.length);
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
          {carouselItems.map((carouselItem, index) => (
            <div key={index}>
              <Image src={carouselItem} alt={`Slide ${index + 1}`} width={800} height={500} />
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
