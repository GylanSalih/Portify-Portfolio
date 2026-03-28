'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Github, Linkedin, Dribbble, Mail } from 'lucide-react';
import styles from './AboutMe.module.scss';

const SVG_BASE = '/assets/images/svg%20animated';

const AboutMe = () => {
  const timelineRef = useRef(null);
  const [timelineProgress, setTimelineProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const viewportTrigger = windowH * 0.6;
      const progress = (viewportTrigger - rect.top) / rect.height;
      setTimelineProgress(Math.max(0, Math.min(1, progress)));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={styles.section} id="about">
      <div className={styles.container}>
        <div className={styles.timelineSection}>
          <h5>Mein Prozess</h5>

          <div className={styles.timelineGrid} ref={timelineRef} style={{ '--timeline-progress': `${timelineProgress * 100}%` }}>

            <div className={`${styles.timelineItem} ${timelineProgress >= 0.05 ? styles.timelineItemActive : ''}`}>
              <div className={styles.timelineCard}>
                <span className={styles.timelineCardLabel}>Vertrauen</span>
                <div className={styles.timelineInfo}>
                  <ul className={styles.dotList}>
                    <li className={styles.dotItem}><strong className={styles.dotKeyword}>Transparenz</strong><span className={styles.dotText}>Alle Preise offen, ohne versteckte Fixkosten</span></li>
                    <li className={styles.dotItem}><strong className={styles.dotKeyword}>Ziele</strong><span className={styles.dotText}>Ich bespreche, was gewünscht wird und wie wir dort ankommen</span></li>
                    <li className={styles.dotItem}><strong className={styles.dotKeyword}>Einsatz</strong><span className={styles.dotText}>Ich bearbeite die Website wie meine eigene, mit vollem Einsatz</span></li>
                    <li className={styles.dotItem}><strong className={styles.dotKeyword}>Verlässlichkeit</strong><span className={styles.dotText}>Flexibel, offen und immer erreichbar, damit du dich aufs Wesentliche konzentrieren kannst</span></li>
                  </ul>
                </div>
                <div className={styles.timelineSvgWrap}>
                  <img src={`${SVG_BASE}/vertrauenAnimated.svg`} alt="Vertrauen" className={styles.timelineSvg} />
                </div>
              </div>
            </div>

            <div className={`${styles.timelineItem} ${timelineProgress >= 0.3 ? styles.timelineItemActive : ''}`}>
              <div className={styles.timelineCard}>
                <span className={styles.timelineCardLabel}>Strategie</span>
                <div className={styles.timelineInfo}>
                  <ul className={styles.dotList}>
                    <li className={styles.dotItem}><strong className={styles.dotKeyword}>Wireframe</strong><span className={styles.dotText}>Ich teile das Vorhaben in klare, überschaubare Abschnitte auf</span></li>
                    <li className={styles.dotItem}><strong className={styles.dotKeyword}>Struktur</strong><span className={styles.dotText}>Fundament und Aufbau so sauber und solide wie möglich errichten</span></li>
                    <li className={styles.dotItem}><strong className={styles.dotKeyword}>Fokus</strong><span className={styles.dotText}>Jeden Abschnitt mit voller Aufmerksamkeit und Präzision ausarbeiten</span></li>
                    <li className={styles.dotItem}><strong className={styles.dotKeyword}>Qualität</strong><span className={styles.dotText}>Das Ergebnis auf höchstem Standard liefern, Schritt für Schritt</span></li>
                  </ul>
                </div>
                <div className={styles.timelineSvgWrap}>
                  <img src={`${SVG_BASE}/strategieAnimated.svg`} alt="Strategie" className={styles.timelineSvg} />
                </div>
              </div>
            </div>

            <div className={`${styles.timelineItem} ${timelineProgress >= 0.58 ? styles.timelineItemActive : ''}`}>
              <div className={styles.timelineCard}>
                <span className={styles.timelineCardLabel}>Redesign</span>
                <div className={styles.timelineInfo}>
                  <ul className={styles.dotList}>
                    <li className={styles.dotItem}><strong className={styles.dotKeyword}>Markenidentität</strong><span className={styles.dotText}>Bestehende Muster, Farben und Typografie des Unternehmens analysieren</span></li>
                    <li className={styles.dotItem}><strong className={styles.dotKeyword}>Farbkonzept</strong><span className={styles.dotText}>Farben bewusst einsetzen, damit das Design die Marke präsentiert</span></li>
                    <li className={styles.dotItem}><strong className={styles.dotKeyword}>Typografie</strong><span className={styles.dotText}>Saubere, moderne Schriftsprache die zur Marke passt und Vertrauen schafft</span></li>
                    <li className={styles.dotItem}><strong className={styles.dotKeyword}>Konsistenz</strong><span className={styles.dotText}>Einheitliches, gepflegtes Layout auf allen Seiten und Geräten</span></li>
                  </ul>
                </div>
                <div className={styles.timelineSvgWrap}>
                  <img src={`${SVG_BASE}/redesignAnimated.svg`} alt="Redesign" className={styles.timelineSvg} />
                </div>
              </div>
            </div>

            <div className={`${styles.timelineItem} ${timelineProgress >= 0.82 ? styles.timelineItemActive : ''}`}>
              <div className={styles.timelineCard}>
                <span className={styles.timelineCardLabel}>Performance</span>
                <div className={styles.timelineInfo}>
                  <ul className={styles.dotList}>
                    <li className={styles.dotItem}><strong className={styles.dotKeyword}>Bildoptimierung</strong><span className={styles.dotText}>Bilder in bester Qualität und minimaler Ladezeit darstellen</span></li>
                    <li className={styles.dotItem}><strong className={styles.dotKeyword}>SEO</strong><span className={styles.dotText}>Keywords strategisch einsetzen für mehr Sichtbarkeit und Reichweite</span></li>
                    <li className={styles.dotItem}><strong className={styles.dotKeyword}>Ladezeit</strong><span className={styles.dotText}>Sauberer, optimierter Code für schnelle und flüssige Interfaces</span></li>
                    <li className={styles.dotItem}><strong className={styles.dotKeyword}>Vermarktung</strong><span className={styles.dotText}>Durch Performance und SEO die Präsenz und Vermarktung nachhaltig stärken</span></li>
                  </ul>
                </div>
                <div className={styles.timelineSvgWrap}>
                  <img src={`${SVG_BASE}/performanceAnimated.svg`} alt="Performance" className={styles.timelineSvg} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;