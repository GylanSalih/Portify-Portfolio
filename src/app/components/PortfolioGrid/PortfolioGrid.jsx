'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Filter from './Filter/Filter';
import HolographicCard from './HolographicCard/HolographicCard';
import './PortfolioGrid.css';

const Portfolio = () => {
  const [cardsData, setCardsData] = useState([]);
  const [category, setCategory] = useState('all');
  const [cardType, setCardType] = useState('normal');
  const [activeLayout, setActiveLayout] = useState(1);
  const [visibleCardsCount, setVisibleCardsCount] = useState(4);
  const [isLoading, setIsLoading] = useState(false);

  // Laden der Portfolio-Daten-JSON
  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const response = await fetch('/data/portfoliogrid.json');
        const data = await response.json();
        setCardsData(data);
      } catch (error) {
        console.error('Error loading portfolio data:', error);
      }
    };
    loadPortfolio();
  }, []);

  const filteredCards = useMemo(() => {
    return cardsData
      .filter(card => {
        const matchesCategory =
          category === 'all' || card.category === category;
        return matchesCategory;
      })
      .map(card => {
        return {
          ...card,
          rarity: cardType !== 'normal' ? cardType : card.rarity,
        };
      });
  }, [category, cardType, cardsData]);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCardsCount(prevCount => prevCount + 4);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="PatternPortfolioGrid">
      {/* Hero Section mit Hintergrundbild */}
      <div className="HeroSection">
        <div className="ProjectGrid">
          <div className="ProjectOverlay">
            <img
              src="/assets/images/landing/OniGirl7.webp"
              alt="Oni Girl Background"
              className="ProjectHeroImg"
            />
          </div>
        </div>

        {/* Tiger Deko-Element */}
        <div className="TigerDecoration" />
      </div>

      {/* Filter in eigenem Container - außerhalb des Hero-Bereichs */}
      <div className="FiltersPortfolioGrid">
        <Filter
          onCategoryChange={setCategory}
          onCardTypeChange={setCardType}
          onLayoutChange={setActiveLayout}
        />
      </div>

      {/* Portfolio Grid - separater Bereich */}
      <div className="PortfolioContent">
        <div className={`card-grid layout-${activeLayout}`}>
          {filteredCards.slice(0, visibleCardsCount).map((card, index) => (
            <div
              key={index}
              className={`holographic__section ${index < visibleCardsCount ? 'loaded' : ''}`}
            >
              <Link href={`/portfolio/${card.slug}`}>
                <HolographicCard
                  imgSrc={card.imgSrc}
                  category={card.category}
                  rarity={card.rarity}
                />
              </Link>
            </div>
          ))}
        </div>

        {filteredCards.length > visibleCardsCount && (
          <button
            onClick={handleLoadMore}
            className="load-more-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
