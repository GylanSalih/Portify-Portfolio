'use client';

import React from 'react';
import { Github, Linkedin, Dribbble, Mail } from 'lucide-react';
import styles from './AboutMe.module.scss';

const AboutMe = () => {
  return (
    <section className={styles.section} id="about">
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <h2 className={styles.preheading}>About Me</h2>
          <h1 className={styles.heading}>
            Chasing progress, knowing that every step brings me{' '}
            <span className={styles.gradient}>closer and closer</span>
          </h1>
        </div>

        <div className={styles.socialLinks}>
          <div className={styles.socials}>
            <a
              href="https://github.com/GylanSalih/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className={styles.icon} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className={styles.icon} />
            </a>
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Dribbble className={styles.icon} />
            </a>
            <a href="mailto:hello@portfolio.com">
              <Mail className={styles.icon} />
            </a>
          </div>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.profileColumn}>
            <div className={styles.imageWrapper}>
              <img
                src="/assets/images/about/aboutme.jpg"
                alt="Profile"
                className={styles.profileImage}
              />
              <div className={styles.imageOverlay}></div>
            </div>

            <div className={styles.profileInformations}>
              <h3>About Me</h3>
              <ul>
                <li className="profile-item">
                  <span className="profile-label">Name</span>
                  <span className="profile-content">Gylan Salih</span>
                </li>
                <li className="profile-item">
                  <span className="profile-label">Profession</span>
                  <span className="profile-content">
                    Student &amp; Freelancer
                  </span>
                </li>
                <li className="profile-item">
                  <span className="profile-label">Hobbies</span>
                  <span className="profile-content">
                    Collecting retro games, playing Yu-Gi-Oh, watching anime,
                    and reading manga.
                  </span>
                </li>
                <li className="profile-item">
                  <span className="profile-label">Favorite Language</span>
                  <span className="profile-content">Next.js</span>
                </li>
                <li className="profile-item">
                  <span className="profile-label">Interests</span>
                  <span className="profile-content">
                    Coding successful things :D Maybe coming in the future, I
                    hope.
                  </span>
                </li>
              </ul>
            </div>

            <div className={styles.opensourceWrapper}>
              <div className={styles.opensource}>
                <div className="about-me-opensource-header">
                  <span className={styles.opensourceBadge}>Open Source</span>
                  <h3 className={styles.opensourceTitle}>
                    Contributions to the Open Source Community
                  </h3>
                </div>
                <p className={styles.opensourceText}>
                  80+ stars on GitHub, daily updates, and improved posts and
                  repositories - completely free for the community. Glad to
                  assist newbie developers, designers, and creators in achieving
                  better workflow.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.contentColumn}>
            <h5>More Than Code</h5>
            <p className={styles.intro}>
              Hello! You can call me Gylan Salih. I&#39;ve always had a passion
              for development, but due to life circumstances, I never had the
              chance to fully dive into it. Now, I finally have the security and
              opportunity to dedicate myself entirely to something I&#39;ve
              loved since I was young. I work as a developer, and after years of
              learning and experimenting, I&#39;m now focusing on creating
              projects that push me to grow. I&#39;m excited to have the chance
              to focus fully on development and to bring my ideas to life in a
              way I never could before.
            </p>

            <h5>My Personality</h5>
            <div className={styles.techstack}>
              <div className={styles.techItem}>
                <img
                  className={styles.techIcon}
                  src="/assets/images/about/team.svg"
                  alt="Teamwork"
                />
                <span className={styles.techText}>
                  Collaborative Team Player
                </span>
              </div>
              <div className={styles.techItem}>
                <img
                  className={styles.techIcon}
                  src="/assets/images/about/fire.svg"
                  alt="Problem Solving"
                />
                <span className={styles.techText}>
                  Analytical & Solution-Oriented
                </span>
              </div>
              <div className={styles.techItem}>
                <img
                  className={styles.techIcon}
                  src="/assets/images/about/code.svg"
                  alt="Passion"
                />
                <span className={styles.techText}>Driven & Passionate</span>
              </div>
              <div className={styles.techItem}>
                <img
                  className={styles.techIcon}
                  src="/assets/images/about/chat.svg"
                  alt="Communication"
                />
                <span className={styles.techText}>
                  Friendly & Strong Communicator
                </span>
              </div>
            </div>

            <div className={styles.timeline}>
              <h5>Achievements</h5>

              <div className={styles.timelineItem}>
                <div className={styles.timelineCard}>
                  <div className={styles.timelineHeader}>
                    <div className={styles.timelineYear}>05.2025 - Now</div>
                    <div className={styles.timelineCompany}>
                      Voluntary Work
                    </div>
                  </div>
                  <h3 className={styles.timelineTitle}>
                    Voluntary Work for Students and Children with Migration
                    Background
                  </h3>
                  <p className={styles.timelineDescription}>
                    I am currently involved in voluntary work, supporting
                    students and children with migration backgrounds. It is a
                    meaningful step in my life, as I help foster integration and
                    learning opportunities for those who need it most. This
                    experience is giving me a deeper connection to the community
                    and shaping my understanding of diverse backgrounds.
                  </p>
                </div>
              </div>

              <div className={styles.timelineItem}>
                <div className={styles.timelineCard}>
                  <div className={styles.timelineHeader}>
                    <div className={styles.timelineYear}>2023 - 2025</div>
                    <div className={styles.timelineCompany}>
                      Higher Education
                    </div>
                  </div>
                  <h3 className={styles.timelineTitle}>
                    Advanced Secondary Education (Fachabitur)
                  </h3>
                  <p className={styles.timelineDescription}>
                    I am currently working towards my Fachabitur - a huge step
                    in my life. Finally, I am making progress, finally, I have
                    security, finally, a step towards change.
                  </p>
                </div>
              </div>

              <div className={styles.timelineItem}>
                <div className={styles.timelineCard}>
                  <div className={styles.timelineHeader}>
                    <div className={styles.timelineYear}>
                      02.2019 - 08.2023
                    </div>
                    <div className={styles.timelineCompany}>
                      Higher Education
                    </div>
                  </div>
                  <h3 className={styles.timelineTitle}>
                    Secondary School Certificate (FORQ)
                  </h3>
                  <p className={styles.timelineDescription}>
                    I spent many years working towards this due to life
                    circumstances. But hey, if I made it, then you certainly can
                    too. Just don&#39;t give up—trust me!
                  </p>
                </div>
              </div>

              <div className={styles.timelineItem}>
                <div className={styles.timelineCard}>
                  <div className={styles.timelineHeader}>
                    <div className={styles.timelineYear}>
                      08.2018 - 02.2019
                    </div>
                    <div className={styles.timelineCompany}>
                      Higher Education
                    </div>
                  </div>
                  <h3 className={styles.timelineTitle}>
                    Extended General School Certificate
                  </h3>
                  <p className={styles.timelineDescription}>
                    I started with the preparatory course, then completed grade
                    9, and reaching grade 10 was my first real milestone.
                  </p>
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
