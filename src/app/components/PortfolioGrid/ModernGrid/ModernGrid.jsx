'use client';
import React from 'react';
import './ModernGrid.css';

const ModernGrid = () => {
  const gridItems = [
    {
      id: 1,
      title: "Silver Pinewood Residences",
      instructor: "Vide Infra",
      image: "/assets/images/portfolio/New1.png",
      link: "/portfolio/silver-pinewood"
    },
    {
      id: 2,
      title: "Mammoth Murals",
      instructor: "Huy Nguyen",
      image: "/assets/images/portfolio/New2.png",
      link: "/portfolio/mammoth-murals"
    },
    {
      id: 3,
      title: "CHANEL - Les 4 Ombres Boutons",
      instructor: "60fps",
      image: "/assets/images/portfolio/New3.png",
      link: "/portfolio/chanel-boutons"
    },
    {
      id: 4,
      title: "David Alaba Performance",
      instructor: "HOLOGRAPHIK",
      image: "/assets/images/portfolio/New4.png",
      link: "/portfolio/david-alaba"
    },
    {
      id: 5,
      title: "Eddie Assistant Platform",
      instructor: "Mambo Mambo",
      image: "/assets/images/portfolio/New5.png",
      link: "/portfolio/eddie-assistant"
    },
    {
      id: 6,
      title: "Example Agency Portfolio",
      instructor: "Somefolk",
      image: "/assets/images/portfolio/New6.png",
      link: "/portfolio/example-agency"
    }
  ];

  return (
    <div className="modern-grid-container">
      <div className="modern-grid-header">
        <h2>Modern Portfolio Grid</h2>
        <p>Entdecke unsere neuesten Projekte in einem modernen, awwwards-inspirierten Layout</p>
      </div>

      <ul className="modern-grid">
        {gridItems.map((item) => (
          <li key={item.id} className="modern-grid-item">
            <div className="card-course">
              <figure className="card-course__figure">
                <a href={item.link}>
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="card-course__img"
                  />
                  <div className="card-overlay">
                    <h3>{item.title}</h3>
                    <p>{item.instructor}</p>
                  </div>
                </a>
              </figure>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModernGrid;
