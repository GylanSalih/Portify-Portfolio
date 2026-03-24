'use client';
import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Github, Linkedin, Dribbble, Mail, ArrowUpRight } from 'lucide-react';
import styles from './Footer.module.scss';

const Footer = () => {
  const pathname = usePathname();

  if (pathname.startsWith('/showcase') || pathname.startsWith('/portfolio')) return null;

  return (
    <div className={styles.shell}>
      <footer className={styles.outer}>

        {/* ── Banner ── */}
        <div className={styles.banner}>
          <Image
            src="/assets/images/landing/OniGirl13.webp"
            alt=""
            fill
            className={styles.bannerImg}
            aria-hidden="true"
          />
          <div className={styles.bannerOverlay} />
          <div className={styles.bannerContent}>
            {/* Stats row */}
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <span className={styles.statVal}>140+</span>
                <span className={styles.statLabel}>Github Stars</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statVal}>2+</span>
                <span className={styles.statLabel}>Experience</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statVal}>5+</span>
                <span className={styles.statLabel}>Projects</span>
              </div>
            </div>
            <h2 className={styles.headline}>
              Let's build something<br />great together.
            </h2>
            <a href="/about" className={styles.cta}>
              Get in touch <ArrowUpRight size={16} />
            </a>
          </div>

          {/* ── Inner card lives inside the banner ── */}
          <div className={styles.innerWrap}>
            <div className={styles.inner}>
            <div className={styles.left}>
              <span className={styles.copyright}>© Gylan Salih</span>
              <span className={styles.legal}>
                <a
                  href="https://github.com/GylanSalih/NextJS-Portify/tree/main"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open-source — feel free to visit the repository
                </a>
              </span>
            </div>
            <div className={styles.socials}>
              <a href="https://github.com/GylanSalih/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className={styles.icon} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className={styles.icon} />
              </a>
              <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" aria-label="Dribbble">
                <Dribbble className={styles.icon} />
              </a>
              <a href="mailto:hello@portfolio.com" aria-label="Email">
                <Mail className={styles.icon} />
              </a>
            </div>
          </div>
          </div>

        </div>

      </footer>
    </div>
  );
};

export default Footer;