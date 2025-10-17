'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Github, Linkedin, Dribbble, Mail } from 'lucide-react';
import styles from './Dashboard.module.scss';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'projects':
        return (
          <div className={styles.contentArea}>
            <div className={styles.topRow}>
              <div className={styles.card}>
                <div className={styles.cardContent}>
                  <h3>Active Projects</h3>
                  <p className={styles.value}>5</p>
                  <p className={styles.change}>+2 this month</p>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.cardContent}>
                  <h3>Completed Projects</h3>
                  <p className={styles.value}>23</p>
                  <p className={styles.change}>+5 this quarter</p>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.cardContent}>
                  <h3>In Progress</h3>
                  <p className={styles.value}>3</p>
                  <p className={styles.change}>2 due this week</p>
                </div>
              </div>
            </div>
            <div className={styles.masonryGrid}>
              <div className={styles.masonryContainer}>
                <div className={styles.masonryCard}>
                  <h4>Portfolio Website</h4>
                  <p className={styles.masonryValue}>85%</p>
                  <p className={styles.masonryChange}>Due in 3 days</p>
                </div>
              </div>
              <div className={styles.masonryContainer}>
                <div className={styles.masonryCard}>
                  <h4>E-commerce App</h4>
                  <p className={styles.masonryValue}>60%</p>
                  <p className={styles.masonryChange}>Due next week</p>
                </div>
              </div>
              <div className={styles.masonryContainer}>
                <div className={styles.masonryCard}>
                  <h4>Mobile App</h4>
                  <p className={styles.masonryValue}>30%</p>
                  <p className={styles.masonryChange}>Due in 2 weeks</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'code-stats':
        return (
          <div className={styles.contentArea}>
            <div className={styles.topRow}>
              <div className={styles.card}>
                <div className={styles.cardContent}>
                  <h3>This Week</h3>
                  <p className={styles.value}>42h</p>
                  <p className={styles.change}>+8h vs last week</p>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.cardContent}>
                  <h3>Languages</h3>
                  <p className={styles.value}>8</p>
                  <p className={styles.change}>Most used: JavaScript</p>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.cardContent}>
                  <h3>Editors</h3>
                  <p className={styles.value}>2</p>
                  <p className={styles.change}>VS Code, Vim</p>
                </div>
              </div>
            </div>
            <div className={styles.masonryGrid}>
              <div className={styles.masonryContainer}>
                <div className={styles.masonryCard}>
                  <h4>Top Languages</h4>
                  <div className={styles.varianceItem}>
                    <p>JavaScript: 35%</p>
                    <p>TypeScript: 25%</p>
                    <p>Python: 20%</p>
                    <p>Other: 20%</p>
                    <div className={styles.progressBar}>
                      <div className={styles.progressFill} style={{ width: '35%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.masonryContainer}>
                <div className={styles.masonryCard}>
                  <h4>Daily Activity</h4>
                  <div className={styles.milestones}>
                    <p>This Week</p>
                    <div className={styles.progressBar}>
                      <div className={styles.progressFill} style={{ width: '80%' }}></div>
                    </div>
                    <div className={styles.tasks}>
                      <div className={styles.task}>
                        <p>Monday: 8h 30m</p>
                        <span className={styles.taskTag}>High</span>
                      </div>
                      <div className={styles.task}>
                        <p>Tuesday: 6h 15m</p>
                        <span className={styles.taskTag}>Medium</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className={styles.contentArea}>
            <div className={styles.topRow}>
              <div className={styles.card}>
                <div className={styles.cardContent}>
                  <h3>Profile Views</h3>
                  <p className={styles.value}>1,234</p>
                  <p className={styles.change}>+15% this month</p>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.cardContent}>
                  <h3>Repository Stars</h3>
                  <p className={styles.value}>89</p>
                  <p className={styles.change}>+12 this week</p>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.cardContent}>
                  <h3>Followers</h3>
                  <p className={styles.value}>156</p>
                  <p className={styles.change}>+8 this month</p>
                </div>
              </div>
            </div>
            <div className={styles.masonryGrid}>
              <div className={styles.masonryContainer}>
                <div className={styles.masonryCard}>
                  <h4>Account Settings</h4>
                  <div className={styles.varianceItem}>
                    <p>Email: gylan@example.com</p>
                    <p>Location: Germany</p>
                    <p>Timezone: UTC+1</p>
                    <p>Theme: Dark Mode</p>
                  </div>
                </div>
              </div>
              <div className={styles.masonryContainer}>
                <div className={styles.masonryCard}>
                  <h4>Notifications</h4>
                  <div className={styles.milestones}>
                    <p>Settings</p>
                    <div className={styles.tasks}>
                      <div className={styles.task}>
                        <p>Email Notifications</p>
                        <span className={styles.taskTag}>On</span>
                      </div>
                      <div className={styles.task}>
                        <p>Push Notifications</p>
                        <span className={styles.taskTag}>Off</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default: // overview
        return (
          <div className={styles.contentArea}>
            {/* Top Row - 3 Cards */}
            <div className={styles.topRow}>
              <div className={styles.card}>
                <div className={styles.cardContent}>
                  <h3>Total Commits</h3>
                  <p className={styles.value}>1,284</p>
                  <p className={styles.change}>+30% vs last month</p>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.cardContent}>
                  <h3>Lines of Code</h3>
                  <p className={styles.value}>42,215</p>
                  <p className={styles.change}>+30% this month</p>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.cardContent}>
                  <h3>Today&apos;s Commits</h3>
                  <p className={styles.value}>12</p>
                  <p className={styles.change}>+30% since yesterday</p>
                </div>
              </div>
            </div>

            {/* Masonry Grid - 5 Containers */}
            <div className={styles.masonryGrid}>
              <div className={styles.masonryContainer}>
                <div className={styles.masonryCard}>
                  <h4>Pending Pull Requests</h4>
                  <p className={styles.masonryValue}>8</p>
                  <p className={styles.masonryChange}>+30% from last week</p>
                </div>
              </div>
              
              <div className={styles.masonryContainer}>
                <div className={styles.masonryCard}>
                  <h4>Issues to Review</h4>
                  <p className={styles.masonryValue}>15</p>
                  <p className={styles.masonryChange}>+30% from previous week</p>
                </div>
              </div>
              
              <div className={styles.masonryContainer}>
                <div className={styles.masonryCard}>
                  <h4>Bugs on Hold</h4>
                  <p className={styles.masonryValue}>3</p>
                  <p className={styles.masonryChange}>+30% from previous month</p>
                </div>
              </div>
              
              <div className={styles.masonryContainer}>
                <div className={styles.masonryCard}>
                  <h4>Project Progress</h4>
                  <div className={styles.varianceItem}>
                    <p>Portfolio Website</p>
                    <p>Target: 100% Complete</p>
                    <p>Current: 85% Complete</p>
                    <p>Remaining: 15%</p>
                    <div className={styles.progressBar}>
                      <div className={styles.progressFill} style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={styles.masonryContainer}>
                <div className={styles.masonryCard}>
                  <h4>Active Tasks</h4>
                  <div className={styles.milestones}>
                    <p>Development Milestones</p>
                    <div className={styles.progressBar}>
                      <div className={styles.progressFill} style={{ width: '75%' }}></div>
                    </div>
                    <div className={styles.tasks}>
                      <div className={styles.task}>
                        <p>Implement Dark Mode</p>
                        <span className={styles.taskTag}>Frontend</span>
                      </div>
                      <div className={styles.task}>
                        <p>API Integration</p>
                        <span className={styles.taskTag}>Backend</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  const renderRightSidebar = () => {
    switch (activeTab) {
      case 'projects':
        return (
          <div className={styles.userInfoArea}>
            <div className={styles.imageWrapper}>
              <Image
                src="/assets/images/about/aboutme.jpg"
                alt="Profile"
                className={styles.profileImage}
                width={400}
                height={300}
              />
              <div className={styles.imageOverlay}></div>
              
              <div className={styles.socialLinks}>
                <div className={styles.socials}>
                  <a href="https://github.com/GylanSalih/" target="_blank" rel="noopener noreferrer">
                    <Github className={styles.icon} />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className={styles.icon} />
                  </a>
                  <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer">
                    <Dribbble className={styles.icon} />
                  </a>
                  <a href="mailto:hello@portfolio.com">
                    <Mail className={styles.icon} />
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.aboutMeCard}>
              <h3 className={styles.aboutMeSectionTitle}>Project Skills</h3>
              <div className={styles.aboutMeDetails}>
                <div className={styles.aboutMeDetailItem}>
                  <span className={styles.aboutMeLabel}>Frontend</span>
                  <span className={styles.aboutMeContent}>React, Next.js, TypeScript, Tailwind CSS</span>
                </div>
                <div className={styles.aboutMeDetailItem}>
                  <span className={styles.aboutMeLabel}>Backend</span>
                  <span className={styles.aboutMeContent}>Node.js, Express, MongoDB, PostgreSQL</span>
                </div>
                <div className={styles.aboutMeDetailItem}>
                  <span className={styles.aboutMeLabel}>Tools</span>
                  <span className={styles.aboutMeContent}>Git, Docker, Vercel, AWS</span>
                </div>
              </div>
            </div>

            <div className={styles.openSourceCard}>
              <h5 className={styles.openSourceTitle}>Recent Projects</h5>
              <h6 className={styles.openSourceSubtitle}>Portfolio & E-commerce</h6>
              <p className={styles.openSourceText}>
                Currently working on a modern portfolio website with Next.js and an e-commerce platform with React. Both projects showcase modern web development practices and responsive design.
              </p>
            </div>
          </div>
        );
      case 'code-stats':
        return (
          <div className={styles.userInfoArea}>
            <div className={styles.imageWrapper}>
              <Image
                src="/assets/images/about/aboutme.jpg"
                alt="Profile"
                className={styles.profileImage}
                width={400}
                height={300}
              />
              <div className={styles.imageOverlay}></div>
              
              <div className={styles.socialLinks}>
                <div className={styles.socials}>
                  <a href="https://github.com/GylanSalih/" target="_blank" rel="noopener noreferrer">
                    <Github className={styles.icon} />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className={styles.icon} />
                  </a>
                  <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer">
                    <Dribbble className={styles.icon} />
                  </a>
                  <a href="mailto:hello@portfolio.com">
                    <Mail className={styles.icon} />
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.aboutMeCard}>
              <h3 className={styles.aboutMeSectionTitle}>Coding Stats</h3>
              <div className={styles.aboutMeDetails}>
                <div className={styles.aboutMeDetailItem}>
                  <span className={styles.aboutMeLabel}>This Week</span>
                  <span className={styles.aboutMeContent}>42 hours of coding</span>
                </div>
                <div className={styles.aboutMeDetailItem}>
                  <span className={styles.aboutMeLabel}>Top Language</span>
                  <span className={styles.aboutMeContent}>JavaScript (35%)</span>
                </div>
                <div className={styles.aboutMeDetailItem}>
                  <span className={styles.aboutMeLabel}>Editor</span>
                  <span className={styles.aboutMeContent}>VS Code</span>
                </div>
              </div>
            </div>

            <div className={styles.openSourceCard}>
              <h5 className={styles.openSourceTitle}>WakaTime</h5>
              <h6 className={styles.openSourceSubtitle}>Coding Activity Tracker</h6>
              <p className={styles.openSourceText}>
                Using WakaTime to track coding activity and productivity. Currently averaging 6+ hours per day of focused coding time across multiple projects.
              </p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className={styles.userInfoArea}>
            <div className={styles.imageWrapper}>
              <Image
                src="/assets/images/about/aboutme.jpg"
                alt="Profile"
                className={styles.profileImage}
                width={400}
                height={300}
              />
              <div className={styles.imageOverlay}></div>
              
              <div className={styles.socialLinks}>
                <div className={styles.socials}>
                  <a href="https://github.com/GylanSalih/" target="_blank" rel="noopener noreferrer">
                    <Github className={styles.icon} />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className={styles.icon} />
                  </a>
                  <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer">
                    <Dribbble className={styles.icon} />
                  </a>
                  <a href="mailto:hello@portfolio.com">
                    <Mail className={styles.icon} />
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.aboutMeCard}>
              <h3 className={styles.aboutMeSectionTitle}>Account Settings</h3>
              <div className={styles.aboutMeDetails}>
                <div className={styles.aboutMeDetailItem}>
                  <span className={styles.aboutMeLabel}>Email</span>
                  <span className={styles.aboutMeContent}>gylan@example.com</span>
                </div>
                <div className={styles.aboutMeDetailItem}>
                  <span className={styles.aboutMeLabel}>Location</span>
                  <span className={styles.aboutMeContent}>Germany</span>
                </div>
                <div className={styles.aboutMeDetailItem}>
                  <span className={styles.aboutMeLabel}>Theme</span>
                  <span className={styles.aboutMeContent}>Dark Mode</span>
                </div>
              </div>
            </div>

            <div className={styles.openSourceCard}>
              <h5 className={styles.openSourceTitle}>Preferences</h5>
              <h6 className={styles.openSourceSubtitle}>Dashboard Settings</h6>
              <p className={styles.openSourceText}>
                Customize your dashboard experience with personalized settings, notification preferences, and display options to match your workflow.
              </p>
            </div>
          </div>
        );
      default: // overview
        return (
          <div className={styles.userInfoArea}>
            <div className={styles.imageWrapper}>
              <Image
                src="/assets/images/about/aboutme.jpg"
                alt="Profile"
                className={styles.profileImage}
                width={400}
                height={300}
              />
              <div className={styles.imageOverlay}></div>
              
              <div className={styles.socialLinks}>
                <div className={styles.socials}>
                  <a href="https://github.com/GylanSalih/" target="_blank" rel="noopener noreferrer">
                    <Github className={styles.icon} />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className={styles.icon} />
                  </a>
                  <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer">
                    <Dribbble className={styles.icon} />
                  </a>
                  <a href="mailto:hello@portfolio.com">
                    <Mail className={styles.icon} />
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.aboutMeCard}>
              <h3 className={styles.aboutMeSectionTitle}>About Me</h3>
              <div className={styles.aboutMeDetails}>
                <div className={styles.aboutMeDetailItem}>
                  <span className={styles.aboutMeLabel}>Name</span>
                  <span className={styles.aboutMeContent}>Gylan Salih</span>
                </div>
                <div className={styles.aboutMeDetailItem}>
                  <span className={styles.aboutMeLabel}>Profession</span>
                  <span className={styles.aboutMeContent}>Student & Freelancer</span>
                </div>
                <div className={styles.aboutMeDetailItem}>
                  <span className={styles.aboutMeLabel}>Hobbies</span>
                  <span className={styles.aboutMeContent}>Collecting retro games, playing Yu-Gi-Oh, watching anime, and reading manga.</span>
                </div>
                <div className={styles.aboutMeDetailItem}>
                  <span className={styles.aboutMeLabel}>Favorite Language</span>
                  <span className={styles.aboutMeContent}>Next.js</span>
                </div>
                <div className={styles.aboutMeDetailItem}>
                  <span className={styles.aboutMeLabel}>Interests</span>
                  <span className={styles.aboutMeContent}>Coding successful things :D Maybe coming in the future, I hope.</span>
                </div>
              </div>
            </div>

            <div className={styles.openSourceCard}>
              <h5 className={styles.openSourceTitle}>Open Source</h5>
              <h6 className={styles.openSourceSubtitle}>Contributions to the Open Source Community</h6>
              <p className={styles.openSourceText}>
                100+ stars on GitHub, daily updates, and improved posts and repositories - completely free for the community. Glad to assist newbie developers, designers, and creators in achieving better workflow.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <main className={styles.dashboard}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Developer Dashboard</h1>
        </div>

        {/* Main Content Area */}
        <div className={styles.mainContent}>
          {/* Left Sidebar with Tabs */}
          <div className={styles.leftSidebar}>
            <div className={styles.sidebarActions}>
              <button 
                className={`${styles.sidebarActionButton} ${activeTab === 'overview' ? styles.active : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`${styles.sidebarActionButton} ${activeTab === 'projects' ? styles.active : ''}`}
                onClick={() => setActiveTab('projects')}
              >
                Projects
              </button>
              <button 
                className={`${styles.sidebarActionButton} ${activeTab === 'code-stats' ? styles.active : ''}`}
                onClick={() => setActiveTab('code-stats')}
              >
                Code Stats
              </button>
              <button 
                className={`${styles.sidebarActionButton} ${activeTab === 'settings' ? styles.active : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                Settings
              </button>
            </div>

            <div className={styles.sidebarDetailsCard}>
              <h4>Development Status</h4>
              <div className={styles.sidebarDetailItem}>
                <span>Current View:</span>
                <span>Overview</span>
              </div>
              <div className={styles.sidebarDetailItem}>
                <span>Last Commit:</span>
                <span>2 min ago</span>
              </div>
              <div className={styles.sidebarDetailItem}>
                <span>Data Source:</span>
                <span>GitHub API</span>
              </div>
              <div className={styles.sidebarDetailItem}>
                <span>Status:</span>
                <span>Coding</span>
              </div>
              
            </div>
          </div>

          {/* Center Content - Dynamic */}
          {renderContent()}

          {/* Right Sidebar - Dynamic */}
          {renderRightSidebar()}
        </div>
      </div>
    </main>
  );
}
