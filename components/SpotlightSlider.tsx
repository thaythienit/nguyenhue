import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useArticles } from '../contexts/ArticleContext';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

const SpotlightSlider: React.FC = () => {
  const { articles } = useArticles();
  const [currentIndex, setCurrentIndex] = useState(0);

  const spotlightArticles = useMemo(() => {
    return articles.filter(a => a.spotlight);
  }, [articles]);

  const goToPrevious = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? spotlightArticles.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, spotlightArticles.length]);

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === spotlightArticles.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, spotlightArticles.length]);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    if (spotlightArticles.length > 1) {
      const sliderInterval = setInterval(() => {
        goToNext();
      }, 5000); // Change slide every 5 seconds
      return () => clearInterval(sliderInterval);
    }
  }, [goToNext, spotlightArticles.length]);

  if (spotlightArticles.length === 0) {
    return (
      <div className="h-96 bg-slate-200 rounded-xl flex items-center justify-center">
        <p className="text-slate-500">Chưa có bài viết tâm điểm nào.</p>
      </div>
    );
  }

  const currentSlide = spotlightArticles[currentIndex];

  return (
    <div className="relative w-full h-80 md:h-[450px] group">
      <div className="w-full h-full rounded-xl overflow-hidden relative">
        {spotlightArticles.map((slide, slideIndex) => (
          <div
            key={slide.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${slideIndex === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </div>
        ))}

        <div className="absolute bottom-0 left-0 p-6 md:p-10 text-white w-full md:w-3/4 lg:w-2/3">
            <span className="inline-block bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">{currentSlide.category}</span>
            <Link to={`/news/${currentSlide.id}`}>
                <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-2 hover:underline">
                    {currentSlide.title}
                </h1>
            </Link>
            <p className="hidden md:block text-slate-200">{currentSlide.excerpt}</p>
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <button 
        onClick={goToPrevious}
        className="absolute top-1/2 -translate-y-1/2 left-3 md:left-5 h-10 w-10 bg-black/30 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/50"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <button 
        onClick={goToNext}
        className="absolute top-1/2 -translate-y-1/2 right-3 md:right-5 h-10 w-10 bg-black/30 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/50"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 right-5 flex space-x-2">
        {spotlightArticles.map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${currentIndex === slideIndex ? 'bg-white' : 'bg-white/50 hover:bg-white'}`}
            aria-label={`Go to slide ${slideIndex + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default SpotlightSlider;
