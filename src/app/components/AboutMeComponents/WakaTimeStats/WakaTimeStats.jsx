'use client';

import React, { useState, useEffect } from 'react';
import { Clock, TrendingUp, Code, Monitor, Terminal } from 'lucide-react';
import styles from './WakaTimeStats.module.scss';

const WakaTimeStats = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWakaTimeData = async () => {
      try {
        const response = await fetch('/api/wakatime');
        if (!response.ok) {
          throw new Error('Failed to fetch WakaTime data');
        }
        const wakaData = await response.json();
        setData(wakaData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWakaTimeData();
  }, []);

  const formatTime = (seconds) => {
    if (!seconds) return '0h 0m';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };


  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.title}>Coding Statistics</h2>
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading coding stats...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.title}>Coding Statistics</h2>
          <div className={styles.error}>
            <p>Unable to load coding statistics</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Coding Statistics</h2>
        <p className={styles.subtitle}>My coding activity tracked by WakaTime</p>


        <div className={styles.statsGrid}>
          {/* Total Time */}
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <h3 className={styles.statTitle}>Total Coding Time</h3>
              <p className={styles.statValue}>
                {formatTime(data.allTime.totalTime)}
              </p>
            </div>
          </div>

          {/* Daily Average */}
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <h3 className={styles.statTitle}>Daily Average</h3>
              <p className={styles.statValue}>
                {formatTime(data.allTime.dailyAverage)}
              </p>
            </div>
          </div>

          {/* Last 7 Days */}
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <h3 className={styles.statTitle}>Last 7 Days</h3>
              <p className={styles.statValue}>
                {formatTime(data.last7Days.totalTime)}
              </p>
            </div>
          </div>

          {/* Best Day */}
          {data.allTime.bestDay && (
            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <h3 className={styles.statTitle}>Best Day</h3>
                <p className={styles.statValue}>
                  {formatTime(data.allTime.bestDay.total_seconds)}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Top Languages - Eigenständiger Bereich */}
        <div className={styles.languagesSection}>
          <h3 className={styles.sectionTitle}>
            <Code className={styles.sectionIcon} />
            Top Programming Languages
          </h3>
          <div className={styles.languagesGrid}>
            {data.allTime.languages
              .filter(lang => lang.total_seconds >= 1800) // Nur Languages mit mindestens 30 Minuten
              .map((lang, index) => (
                <div key={index} className={styles.languageCard}>
                  <div className={styles.languageHeader}>
                    <span className={styles.languageName}>{lang.name}</span>
                    <span className={styles.languageTime}>
                      {formatTime(lang.total_seconds)}
                    </span>
                  </div>
                  <div className={styles.languageBar}>
                    <div 
                      className={styles.languageBarFill}
                      style={{ width: `${Math.min(100, (lang.percent * 100))}%` }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className={styles.detailsGrid}>

          {/* Top Editors */}
          <div className={styles.detailCard}>
            <h3 className={styles.detailTitle}>
              <Monitor className={styles.detailIcon} />
              Top Editors
            </h3>
            <div className={styles.detailList}>
              {data.allTime.editors.map((editor, index) => (
                <div key={index} className={styles.detailItem}>
                  <div className={styles.detailHeader}>
                    <span className={styles.detailName}>{editor.name}</span>
                    <span className={styles.detailTime}>
                      {formatTime(editor.total_seconds)}
                    </span>
                  </div>
                  <div className={styles.detailBar}>
                    <div 
                      className={styles.detailBarFill}
                      style={{ width: `${Math.min(100, (editor.percent * 100))}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Operating Systems */}
          <div className={styles.detailCard}>
            <h3 className={styles.detailTitle}>
              <Terminal className={styles.detailIcon} />
              Operating Systems
            </h3>
            <div className={styles.detailList}>
              {data.allTime.operatingSystems.map((os, index) => (
                <div key={index} className={styles.detailItem}>
                  <div className={styles.detailHeader}>
                    <span className={styles.detailName}>{os.name}</span>
                    <span className={styles.detailTime}>
                      {formatTime(os.total_seconds)}
                    </span>
                  </div>
                  <div className={styles.detailBar}>
                    <div 
                      className={styles.detailBarFill}
                      style={{ width: `${Math.min(100, (os.percent * 100))}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          {data.allTime.projects && data.allTime.projects.length > 0 && (
            <div className={styles.detailCard}>
              <h3 className={styles.detailTitle}>
                <Code className={styles.detailIcon} />
                Top Projects
              </h3>
              <div className={styles.detailList}>
                {data.allTime.projects.slice(0, 5).map((project, index) => (
                  <div key={index} className={styles.detailItem}>
                    <div className={styles.detailHeader}>
                      <span className={styles.detailName}>{project.name}</span>
                      <span className={styles.detailTime}>
                        {formatTime(project.total_seconds)}
                      </span>
                    </div>
                    <div className={styles.detailBar}>
                      <div 
                        className={styles.detailBarFill}
                        style={{ width: `${Math.min(100, (project.percent * 100))}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Categories */}
          {data.allTime.categories && data.allTime.categories.length > 0 && (
            <div className={styles.detailCard}>
              <h3 className={styles.detailTitle}>
                <Monitor className={styles.detailIcon} />
                Categories
              </h3>
              <div className={styles.detailList}>
                {data.allTime.categories.slice(0, 5).map((category, index) => (
                  <div key={index} className={styles.detailItem}>
                    <div className={styles.detailHeader}>
                      <span className={styles.detailName}>{category.name}</span>
                      <span className={styles.detailTime}>
                        {formatTime(category.total_seconds)}
                      </span>
                    </div>
                    <div className={styles.detailBar}>
                      <div 
                        className={styles.detailBarFill}
                        style={{ width: `${Math.min(100, (category.percent * 100))}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dependencies */}
          {data.allTime.dependencies && data.allTime.dependencies.length > 0 && (
            <div className={styles.detailCard}>
              <h3 className={styles.detailTitle}>
                <Terminal className={styles.detailIcon} />
                Dependencies
              </h3>
              <div className={styles.detailList}>
                {data.allTime.dependencies.slice(0, 5).map((dep, index) => (
                  <div key={index} className={styles.detailItem}>
                    <div className={styles.detailHeader}>
                      <span className={styles.detailName}>{dep.name}</span>
                      <span className={styles.detailTime}>
                        {formatTime(dep.total_seconds)}
                      </span>
                    </div>
                    <div className={styles.detailBar}>
                      <div 
                        className={styles.detailBarFill}
                        style={{ width: `${Math.min(100, (dep.percent * 100))}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Last 7 Days Chart */}
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Last 7 Days Activity</h3>
          <div className={styles.chart}>
            {data.last7Days.dailyData.map((day, index) => (
              <div key={index} className={styles.chartBar}>
                <div 
                  className={styles.chartBarFill}
                  style={{ 
                    height: `${Math.max(5, (day.totalSeconds / 3600) * 2)}px` 
                  }}
                ></div>
                <span className={styles.chartLabel}>
                  {new Date(day.date).toLocaleDateString('de-DE', { 
                    weekday: 'short' 
                  })}
                </span>
                <span className={styles.chartValue}>
                  {formatTime(day.totalSeconds)}
                </span>
              </div>
            ))}
          </div>
        </div>



      </div>
    </section>
  );
};

export default WakaTimeStats;
