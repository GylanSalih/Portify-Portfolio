'use client';

import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Dribbble, Mail } from 'lucide-react';
import Link from 'next/link';
import './AboutMe.css';

const AboutMe = () => {
  return (
    <section className="about-me-section" id="about">
      <div className="about-me-container">
        <div className="about-me-header-wrapper">
          <h2 className="about-me-preheading">About Me</h2>
          <h1 className="about-me-heading">
            Chasing progress, knowing that every step brings me{' '}
            <span className="about-me-gradient">closer and closer</span>
          </h1>
        </div>

        <div className="about-me-social-links">
          <div className="about-me-socials">
            <a
              href="https://github.com/GylanSalih/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="about-me-icon" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="about-me-icon" />
            </a>
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Dribbble className="about-me-icon" />
            </a>
            <a href="mailto:hello@portfolio.com">
              <Mail className="about-me-icon" />
            </a>
          </div>
        </div>

        <div className="about-me-content-grid">
          <div className="about-me-profile-column">
            <div className="about-me-image-wrapper">
              <img
                src="/assets/images/about/aboutme.jpg"
                alt="Profile"
                className="about-me-profile-image"
              />
              <div className="about-me-image-overlay"></div>
            </div>

            <div className="about-me-profile-informations">
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

            <div className="opensource-wrapper">
              <div className="about-me-opensource">
                <div className="about-me-opensource-header">
                  <span className="about-me-opensource-badge">Open Source</span>
                  <h3 className="about-me-opensource-title">
                    Contributions to the Open Source Community
                  </h3>
                </div>
                <p className="about-me-opensource-text">
                  80+ stars on GitHub, daily updates, and improved posts and
                  repositories - completely free for the community. Glad to
                  assist newbie developers, designers, and creators in achieving
                  better workflow.
                </p>
              </div>
            </div>
          </div>

          <div className="about-me-content-column">
            <h5>More Than Code</h5>
            <p className="about-me-intro">
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
            <div className="about-me-techstack">
              <div className="about-me-tech-item">
                <img
                  className="about-me-tech-icon"
                  src="/assets/images/about/team.svg"
                  alt="Teamwork"
                />
                <span className="about-me-tech-text">
                  Collaborative Team Player
                </span>
              </div>
              <div className="about-me-tech-item">
                <img
                  className="about-me-tech-icon"
                  src="/assets/images/about/fire.svg"
                  alt="Problem Solving"
                />
                <span className="about-me-tech-text">
                  Analytical & Solution-Oriented
                </span>
              </div>
              <div className="about-me-tech-item">
                <img
                  className="about-me-tech-icon"
                  src="/assets/images/about/code.svg"
                  alt="Passion"
                />
                <span className="about-me-tech-text">Driven & Passionate</span>
              </div>
              <div className="about-me-tech-item">
                <img
                  className="about-me-tech-icon"
                  src="/assets/images/about/chat.svg"
                  alt="Communication"
                />
                <span className="about-me-tech-text">
                  Friendly & Strong Communicator
                </span>
              </div>
            </div>

            <div className="about-me-timeline">
              <h5>Achievements</h5>

              <div className="about-me-timeline-item">
                <div className="about-me-timeline-card">
                  <div className="about-me-timeline-header">
                    <div className="about-me-timeline-year">05.2025 - Now</div>
                    <div className="about-me-timeline-company">
                      Voluntary Work
                    </div>
                  </div>
                  <h3 className="about-me-timeline-title">
                    Voluntary Work for Students and Children with Migration
                    Background
                  </h3>
                  <p className="about-me-timeline-description">
                    I am currently involved in voluntary work, supporting
                    students and children with migration backgrounds. It is a
                    meaningful step in my life, as I help foster integration and
                    learning opportunities for those who need it most. This
                    experience is giving me a deeper connection to the community
                    and shaping my understanding of diverse backgrounds.
                  </p>
                </div>
              </div>

              <div className="about-me-timeline-item">
                <div className="about-me-timeline-card">
                  <div className="about-me-timeline-header">
                    <div className="about-me-timeline-year">2023 - 2025</div>
                    <div className="about-me-timeline-company">
                      Higher Education
                    </div>
                  </div>
                  <h3 className="about-me-timeline-title">
                    Advanced Secondary Education (Fachabitur)
                  </h3>
                  <p className="about-me-timeline-description">
                    I am currently working towards my Fachabitur - a huge step
                    in my life. Finally, I am making progress, finally, I have
                    security, finally, a step towards change.
                  </p>
                </div>
              </div>

              <div className="about-me-timeline-item">
                <div className="about-me-timeline-card">
                  <div className="about-me-timeline-header">
                    <div className="about-me-timeline-year">
                      02.2019 - 08.2023
                    </div>
                    <div className="about-me-timeline-company">
                      Higher Education
                    </div>
                  </div>
                  <h3 className="about-me-timeline-title">
                    Secondary School Certificate (FORQ)
                  </h3>
                  <p className="about-me-timeline-description">
                    I spent many years working towards this due to life
                    circumstances. But hey, if I made it, then you certainly can
                    too. Just don&#39;t give up—trust me!
                  </p>
                </div>
              </div>

              <div className="about-me-timeline-item">
                <div className="about-me-timeline-card">
                  <div className="about-me-timeline-header">
                    <div className="about-me-timeline-year">
                      08.2018 - 02.2019
                    </div>
                    <div className="about-me-timeline-company">
                      Higher Education
                    </div>
                  </div>
                  <h3 className="about-me-timeline-title">
                    Extended General School Certificate
                  </h3>
                  <p className="about-me-timeline-description">
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
