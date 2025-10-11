'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';


// Import components
import ProjectHero from './ProjectHero/ProjectHero';
import ProjectInfo from './ProjectInfo/ProjectInfo';
import ProjectContent from './ProjectContent/ProjectContent';
import ImageGallery from './ImageGallery/ImageGallery';
import VideoGallery from './VideoGallery/VideoGallery';
import TechStack from './TechStack/TechStack';
import Features from './Features/Features';
import RelatedProjects from './RelatedProjects/RelatedProjects';
import ImageModal from './ImageModal/ImageModal';

import styles from './PortfolioPost.module.css';

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fancybox is now initialized in ImageGallery component

  // Load project data from JSON
  useEffect(() => {
    const loadProjectData = async () => {
      try {
        setLoading(true);
        
        const response = await fetch('/data/portfoliopost.json');
        const data = await response.json();
        const projectData = data.find(p => p.slug === slug);
        
        if (projectData) {
          const transformedProject = {
            slug: projectData.slug,
            title: projectData.title,
            subtitle: projectData.abovetitle || 'Modern Web Development Project',
            description: projectData.projectTexts?.description || projectData.description,
            category: projectData.category,
            tags: projectData.projectDetails?.tags ? 
              (typeof projectData.projectDetails.tags === 'string' ? 
                projectData.projectDetails.tags.split(', ') : 
                projectData.projectDetails.tags.split(', ')) : 
              ['React', 'Next.js'],
            client: projectData.projectDetails?.client || 'Personal Project',
            year: projectData.projectDetails?.date?.split('.')[2] || '2024',
            duration: projectData.projectDetails?.duration || '3 Monate',
            role: projectData.projectDetails?.role || 'Full-Stack Developer & Designer',
            status: projectData.projectDetails?.status || 'Live',
            
            // Links
            liveUrl: projectData.projectDetails?.demoUrl,
            githubUrl: projectData.projectDetails?.githubUrl,
            
            // Media
            heroImage: projectData.backgroundImage,
            images: projectData.galleryImages ? projectData.galleryImages.map((img, index) => ({
              url: `/assets/images/portfolio/${img}`,
              caption: `Project Screenshot ${index + 1}`
            })) : [],
            
            videos: projectData.videos || [],

            // Content sections
            sections: [
              {
                id: 'overview',
                title: 'Projektübersicht',
                content: `
                  <p>${projectData.projectTexts?.heroParagraph || projectData.excerpt}</p>
                  <p>${projectData.projectTexts?.description || projectData.description}</p>
                `
              },
              {
                id: 'challenge',
                title: 'Herausforderung',
                content: `
                  <p>${projectData.projectDetails?.challenges || 'Die größte Herausforderung bestand darin, eine Balance zwischen visueller Attraktivität und Performance zu finden.'}</p>
                `
              },
              {
                id: 'solution',
                title: 'Lösung',
                content: `
                  <p>Durch den Einsatz modernster Technologien konnte eine hochperformante Website realisiert werden:</p>
                  <h3>Technischer Stack:</h3>
                  <ul>
                    <li><strong>Technologien:</strong> ${projectData.projectDetails?.techStack || 'React, Next.js, CSS3'}</li>
                    <li><strong>Inspiration:</strong> ${projectData.projectDetails?.inspiration || 'Behance, Dribbble'}</li>
                  </ul>
                `
              },
              {
                id: 'results',
                title: 'Ergebnisse & Learnings',
                content: `
                  <p>${projectData.projectDetails?.learnings || projectData.projectDetails?.solutions || 'Das Projekt übertraf alle gesetzten Ziele und erhielt positive Resonanz.'}</p>
                `
              }
            ],

            // Technical details
            techStack: projectData.projectDetails?.techStack ? 
              projectData.projectDetails.techStack.split(', ').map(tech => ({
                name: tech,
                category: 'Technology'
              })) : [
                { name: 'React', category: 'Frontend Framework' },
                { name: 'Next.js', category: 'Full-Stack Framework' }
              ],

            features: [
              'Responsive Design für alle Geräte',
              'Optimierte Performance und SEO',
              'Moderne UI/UX Patterns',
              'Cross-Browser Kompatibilität'
            ]
          };
          
          setProject(transformedProject);
          
          // Load related projects
          const related = data
            .filter(p => p.slug !== slug)
            .slice(0, 3)
            .map(p => ({
              slug: p.slug,
              title: p.title,
              image: p.backgroundImage,
              category: p.category
            }));
          setRelatedProjects(related);
        }
        
      } catch (error) {
        console.error('Error loading project data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadProjectData();
    }
  }, [slug]);


  // Image navigation
  const nextImage = () => {
    if (project?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }
  };

  const prevImage = () => {
    if (project?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };

  if (loading) {
    return (
      <div className={styles.projectLoading}>
        <div className={styles.loadingSpinner}>
          <div className={styles.spinner}></div>
          <p>Projekt wird geladen...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className={styles.projectNotFound}>
        <h1>Projekt nicht gefunden</h1>
        <p>Das angeforderte Projekt konnte nicht geladen werden.</p>
      </div>
    );
  }

  return (
    <div className={styles.projectDetail}>
      <div className={styles.projectWrapper}>
        {/* Hero Section */}
        <ProjectHero 
          project={project}
        />

        {/* Main Content */}
        <main className={styles.projectMain}>
          {/* Project Info Cards */}
          <ProjectInfo project={project} />

          {/* Content Sections */}
          <ProjectContent sections={project.sections} />

          {/* Image Gallery with Fancybox */}
          <ImageGallery images={project.images} />

          {/* Video Gallery */}
          <VideoGallery videos={project.videos} />

          {/* Tech Stack */}
          <TechStack techStack={project.techStack} />

          {/* Features */}
          <Features features={project.features} />
        </main>

        {/* Related Projects */}
        <RelatedProjects relatedProjects={relatedProjects} />
      </div>

      {/* Image Modal */}
      <ImageModal 
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        currentImage={project.images[currentImageIndex]}
        onPrevImage={prevImage}
        onNextImage={nextImage}
        hasMultipleImages={project.images && project.images.length > 1}
      />
    </div>
  );
};

export default ProjectDetail;
