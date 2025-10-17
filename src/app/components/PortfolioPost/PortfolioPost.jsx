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
import PortfolioPostSkeleton from './PortfolioPostSkeleton/PortfolioPostSkeleton';

import styles from './PortfolioPost.module.scss';

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
        
        const response = await fetch('/data/PortfolioData.json');
        const data = await response.json();
        const projectData = data.find(p => p.slug === slug);
        
        if (projectData) {
          const postData = projectData.postData;
          
          const transformedProject = {
            slug: projectData.slug,
            title: projectData.title,
            subtitle: postData.abovetitle || 'Modern Web Development Project',
            description: postData.projectTexts?.description || '',
            category: projectData.category,
            tags: projectData.tags || [],
            client: postData.projectDetails?.client || 'Personal Project',
            year: postData.projectDetails?.date?.split('.')[2] || '2024',
            duration: postData.projectDetails?.duration || '3 Monate',
            role: postData.projectDetails?.role || 'Full-Stack Developer & Designer',
            status: postData.projectDetails?.status || 'Live',
            
            // Links
            liveUrl: postData.projectDetails?.demoUrl,
            githubUrl: postData.projectDetails?.githubUrl,
            
            // Media
            backgroundImage: postData.backgroundImage,
            images: postData.galleryImages ? postData.galleryImages.map((img, index) => ({
              url: `/assets/images/portfolio/${img}`,
              caption: `Project Screenshot ${index + 1}`
            })) : [],
            
            videos: postData.videos || [],

            // Content sections
            sections: [
              {
                id: 'overview',
                title: 'Projektübersicht',
                content: `
                  <p>${postData.projectTexts?.heroParagraph || ''}</p>
                  <p>${postData.projectTexts?.description || ''}</p>
                `
              },
              {
                id: 'challenge',
                title: 'Herausforderung',
                content: `
                  <p>${postData.projectDetails?.challenges || 'Die größte Herausforderung bestand darin, eine Balance zwischen visueller Attraktivität und Performance zu finden.'}</p>
                `
              },
              {
                id: 'solution',
                title: 'Lösung',
                content: `
                  <p>Durch den Einsatz modernster Technologien konnte eine hochperformante Website realisiert werden:</p>
                  <h3>Technischer Stack:</h3>
                  <ul>
                    <li><strong>Technologien:</strong> ${postData.projectDetails?.techStack || 'React, Next.js, CSS3'}</li>
                    <li><strong>Inspiration:</strong> ${postData.projectDetails?.inspiration || 'Behance, Dribbble'}</li>
                  </ul>
                `
              },
              {
                id: 'results',
                title: 'Ergebnisse & Learnings',
                content: `
                  <p>${postData.projectDetails?.learnings || postData.projectDetails?.solutions || 'Das Projekt übertraf alle gesetzten Ziele und erhielt positive Resonanz.'}</p>
                `
              }
            ],

            // Technical details
            techStack: postData.projectDetails?.techStack ? 
              postData.projectDetails.techStack.split(', ').map(tech => ({
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
          
          // Load related projects - use same category as current project
          const currentProjectCategory = projectData.category;
          
          // Helper function to shuffle array
          const shuffleArray = (array) => {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
          };
          
          // Get projects from same category (excluding current project)
          const sameCategoryProjects = data
            .filter(p => p.slug !== slug && p.category === currentProjectCategory);
          
          // Shuffle and take up to 3 projects
          const shuffledSameCategory = shuffleArray(sameCategoryProjects);
          const related = shuffledSameCategory
            .slice(0, 3)
            .map(p => ({
              slug: p.slug,
              title: p.title,
              image: p.gridData.imgSrc,
              category: p.category,
              tags: p.tags || []
            }));
          
          // If not enough projects in same category, fill with other projects
          if (related.length < 3) {
            const otherProjects = data
              .filter(p => p.slug !== slug && p.category !== currentProjectCategory);
            
            const shuffledOtherProjects = shuffleArray(otherProjects);
            const additionalProjects = shuffledOtherProjects
              .slice(0, 3 - related.length)
              .map(p => ({
                slug: p.slug,
                title: p.title,
                image: p.gridData.imgSrc,
                category: p.category,
                tags: p.tags || []
              }));
            
            related.push(...additionalProjects);
          }
          
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
    return <PortfolioPostSkeleton />;
  }

  if (!project) {
    return (
      <div className={styles.notFound}>
        <h1>Projekt nicht gefunden</h1>
        <p>Das angeforderte Projekt konnte nicht geladen werden.</p>
      </div>
    );
  }

  return (
    <div className={styles.detail}>
      <div className={styles.wrapper}>
        {/* Hero Section */}
        <ProjectHero 
          project={project}
        />

        {/* Main Content */}
        <main className={styles.main}>
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
