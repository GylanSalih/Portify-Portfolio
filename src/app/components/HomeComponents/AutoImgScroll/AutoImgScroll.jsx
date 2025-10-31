import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import styles from './AutoImgScroll.module.scss';

const AutoImgScroll = () => {
  // Mixed images from OniGirl, OniBoy series and portfolio
  const scrollItems = [
    {
      id: 1,
      title: "OniGirl 1",
      description: "Character artwork series",
      category: "Digital Art",
      tags: ["Character", "Art", "Oni"],
      image: "/assets/images/landing/OniGirl1.webp",
      href: "/portfolio"
    },
    {
      id: 2,
      title: "OniBoy 1",
      description: "Character artwork series",
      category: "Digital Art",
      tags: ["Character", "Art", "Oni"],
      image: "/assets/images/landing/OniBoy1.webp",
      href: "/portfolio"
    },
    {
      id: 3,
      title: "Portfolio Akira",
      description: "Cyberpunk inspired artwork",
      category: "3D Art",
      tags: ["3D", "Cyberpunk", "Character"],
      image: "/assets/images/portfolio/Akira1.jpg",
      href: "/portfolio"
    },
    {
      id: 4,
      title: "OniGirl 2",
      description: "Character artwork series",
      category: "Digital Art",
      tags: ["Character", "Art", "Oni"],
      image: "/assets/images/landing/OniGirl2.jpg",
      href: "/portfolio"
    },
    {
      id: 5,
      title: "OniBoy 2",
      description: "Character artwork series",
      category: "Digital Art",
      tags: ["Character", "Art", "Oni"],
      image: "/assets/images/landing/OniBoy2.webp",
      href: "/portfolio"
    },
    {
      id: 6,
      title: "Portfolio City",
      description: "Urban landscape artwork",
      category: "Environment",
      tags: ["City", "Landscape", "3D"],
      image: "/assets/images/portfolio/City.jpg",
      href: "/portfolio"
    },
    {
      id: 7,
      title: "OniGirl 3",
      description: "Character artwork series",
      category: "Digital Art",
      tags: ["Character", "Art", "Oni"],
      image: "/assets/images/landing/OniGirl3.jpg",
      href: "/portfolio"
    },
    {
      id: 8,
      title: "OniBoy 3",
      description: "Character artwork series",
      category: "Digital Art",
      tags: ["Character", "Art", "Oni"],
      image: "/assets/images/landing/OniBoy3.jpg",
      href: "/portfolio"
    },
    {
      id: 9,
      title: "Portfolio GITS",
      description: "Ghost in the Shell inspired",
      category: "Concept Art",
      tags: ["Anime", "Sci-Fi", "Character"],
      image: "/assets/images/portfolio/GITS.jpg",
      href: "/portfolio"
    },
    {
      id: 10,
      title: "OniGirl 4",
      description: "Character artwork series",
      category: "Digital Art",
      tags: ["Character", "Art", "Oni"],
      image: "/assets/images/landing/OniGirl4.jpg",
      href: "/portfolio"
    },
    {
      id: 11,
      title: "OniBoy 4",
      description: "Character artwork series",
      category: "Digital Art",
      tags: ["Character", "Art", "Oni"],
      image: "/assets/images/landing/OniBoy4.webp",
      href: "/portfolio"
    },
    {
      id: 12,
      title: "OniGirl 5",
      description: "Character artwork series",
      category: "Digital Art",
      tags: ["Character", "Art", "Oni"],
      image: "/assets/images/landing/OniGirl5.webp",
      href: "/portfolio"
    },
    {
      id: 13,
      title: "Portfolio Akira 2",
      description: "Cyberpunk inspired artwork",
      category: "3D Art",
      tags: ["3D", "Cyberpunk", "Character"],
      image: "/assets/images/portfolio/Akira2.jpg",
      href: "/portfolio"
    },
    {
      id: 14,
      title: "OniGirl 6",
      description: "Character artwork series",
      category: "Digital Art",
      tags: ["Character", "Art", "Oni"],
      image: "/assets/images/landing/OniGirl6.webp",
      href: "/portfolio"
    },
    {
      id: 15,
      title: "Portfolio New",
      description: "Creative portfolio piece",
      category: "Portfolio",
      tags: ["Design", "Creative", "Art"],
      image: "/assets/images/portfolio/New1.png",
      href: "/portfolio"
    },
    {
      id: 16,
      title: "OniGirl 7",
      description: "Character artwork series",
      category: "Digital Art",
      tags: ["Character", "Art", "Oni"],
      image: "/assets/images/landing/OniGirl7.webp",
      href: "/portfolio"
    },
    {
      id: 17,
      title: "OniGirl 8",
      description: "Character artwork series",
      category: "Digital Art",
      tags: ["Character", "Art", "Oni"],
      image: "/assets/images/landing/OniGirl8.jpg",
      href: "/portfolio"
    },
    {
      id: 18,
      title: "Portfolio City 2",
      description: "Urban landscape artwork",
      category: "Environment",
      tags: ["City", "Landscape", "3D"],
      image: "/assets/images/portfolio/City2.jpg",
      href: "/portfolio"
    },
    {
      id: 19,
      title: "OniGirl 9",
      description: "Character artwork series",
      category: "Digital Art",
      tags: ["Character", "Art", "Oni"],
      image: "/assets/images/landing/OniGirl9.jpg",
      href: "/portfolio"
    },
    {
      id: 20,
      title: "OniGirl 10",
      description: "Character artwork series",
      category: "Digital Art",
      tags: ["Character", "Art", "Oni"],
      image: "/assets/images/landing/OniGirl10.jpg",
      href: "/portfolio"
    },
    {
      id: 21,
      title: "Portfolio GITS 2",
      description: "Ghost in the Shell inspired",
      category: "Concept Art",
      tags: ["Anime", "Sci-Fi", "Character"],
      image: "/assets/images/portfolio/GITS2.jpg",
      href: "/portfolio"
    },
    {
      id: 22,
      title: "OniGirl 11",
      description: "Character artwork series",
      category: "Digital Art",
      tags: ["Character", "Art", "Oni"],
      image: "/assets/images/landing/OniGirl11.webp",
      href: "/portfolio"
    },
    {
      id: 23,
      title: "OniGirl 13",
      description: "Character artwork series",
      category: "Digital Art",
      tags: ["Character", "Art", "Oni"],
      image: "/assets/images/landing/OniGirl13.webp",
      href: "/portfolio"
    },
    {
      id: 24,
      title: "Portfolio New 2",
      description: "Creative portfolio piece",
      category: "Portfolio",
      tags: ["Design", "Creative", "Art"],
      image: "/assets/images/portfolio/New2.png",
      href: "/portfolio"
    }
  ];

  // Duplicate items for seamless loop
  const duplicatedItems = [...scrollItems, ...scrollItems];

  return (
    <div className={styles.autoImgScroll}>
      <div className={styles.viewAllLink}>
        <a href="/about" className={styles.link}>
          <h1>View all projects</h1>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className={styles.arrow}
          >
            <path 
              fillRule="evenodd" 
              d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" 
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
      
      <div className={styles.container}>
        <div className={styles.scrollRow}>
          <div className={styles.scrollContent}>
            <div className={styles.scrollTrack}>
              {duplicatedItems.map((item, index) => (
                <a
                  key={`${item.id}-${index}`}
                  href={item.href}
                  className={styles.scrollItem}
                  onDragStart={(e) => e.preventDefault()}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = item.href;
                  }}
                >
                  <figure className={styles.figure}>
                    {item.isVideo ? (
                      <video
                        className={styles.media}
                        loop
                        autoPlay
                        playsInline
                        muted
                        poster={item.image}
                      >
                        <source src={item.video} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        src={item.image}
                        alt={item.title}
                        className={styles.media}
                        loading="lazy"
                        draggable="false"
                      />
                    )}
                    <div className={styles.overlay}>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.category}</p>
                        <div className={styles.tags}>
                          {item.tags.map((tag, idx) => (
                            <span key={idx} className={styles.tag}>{tag}</span>
                          ))}
                        </div>
                      </div>
                      <div className={styles.linkIcon}>
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                  </figure>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className={styles.scrollRow}>
          <div className={styles.scrollContent}>
            <div className={`${styles.scrollTrack} ${styles.reverse}`}>
              {duplicatedItems.map((item, index) => (
                <a
                  key={`reverse-${item.id}-${index}`}
                  href={item.href}
                  className={styles.scrollItem}
                  onDragStart={(e) => e.preventDefault()}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = item.href;
                  }}
                >
                  <figure className={styles.figure}>
                    {item.isVideo ? (
                      <video
                        className={styles.media}
                        loop
                        autoPlay
                        playsInline
                        muted
                        poster={item.image}
                      >
                        <source src={item.video} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        src={item.image}
                        alt={item.title}
                        className={styles.media}
                        loading="lazy"
                        draggable="false"
                      />
                    )}
                    <div className={styles.overlay}>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.category}</p>
                        <div className={styles.tags}>
                          {item.tags.map((tag, idx) => (
                            <span key={idx} className={styles.tag}>{tag}</span>
                          ))}
                        </div>
                      </div>
                      <div className={styles.linkIcon}>
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                  </figure>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoImgScroll;
