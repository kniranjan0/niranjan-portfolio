import React, { useState } from 'react'
import Fairworx from '../../assets/Fairworx.png'
import DYP from '../../assets/DYP.png'
import IDI from '../../assets/IDI_home.png'
import chatMenu from '../../assets/chat_menu.jpg'
import chatMessage from '../../assets/chat_message.jpg'

const projectData = [
  {
    id: 1,
    image: Fairworx,
    title: "Fairworx",
    description: "The Fair Worx Index™ (FWI) is an interactive assessment tool that helps organizations measure workplace fairness through surveys, questionnaires, and data analysis, evaluating over 350 metrics across leadership, policies, employee wellness, professional development, and race and gender equity.",
    alt: "The Real Feel Social Media App",
    category: "Web App",
    technologies: ["Next.js", "Tailwind", "TanStack", "Node.js", "Mapbox"],
    liveUrl: "https://dev.myfairworx.com/user/login",
    githubUrl: "private",
    isPrivate: true,
    type: "web",
  },
  {
    id: 2,
    image: IDI,
    title: "Intercultural Development Inventory: IDI, LLC",
    description: "The Intercultural Development Inventory (IDI) is a leading, globally validated assessment that helps schools and organizations build cultural competence through customized tools and services that support intercultural understanding and conflict resolution.",
    alt: "Translator",
    category: "Web App",
    technologies: ["React", "TypeScript", "i18n", "Redux", "Material UI"],
    liveUrl: "https://idiinventory.com/",
    githubUrl: "private",
    isPrivate: true,
    requiresVPN: false,
    type: "web",
  },
  {
    id: 3,
    image: DYP,
    title: "DYP",
    description: "A healthcare web platform built with React, TypeScript, MobX, and Material UI, delivering an intuitive and efficient user experience. Optimized performance for large-scale healthcare data and led a development team to ensure scalability, maintainability, and alignment with long-term business goals.",
    alt: "DYP",
    category: "Web App",
    technologies: ["React", "TypeScript", "Mobx", "Material UI", "Scss"],
    liveUrl: "https://dyp2-sb-dev01.hhstechgroup.com/",
    githubUrl: "private",
    isPrivate: true,
    requiresVPN: true,
    type: "web",
  },
  {
    id: 4,
    images: [chatMenu, chatMessage],
    title: "Gossip",
    description: "A real-time mobile chat application enabling users to message and interact seamlessly with friends. Built with React Native and Gluestack for a smooth, responsive UI, powered by Node.js, MongoDB, and Socket.IO for efficient real-time communication and scalable backend performance.",
    alt: "Gossip Mobile Chat App",
    category: "Mobile App",
    technologies: ["React Native", "Gluestack", "Node.js", "MongoDB", "Socket.IO"],
    liveUrl: "#",
    githubUrl: "https://github.com/kniranjan0/gossip",
    isPrivate: false,
    type: "mobile",
  },
];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All')
  const [currentImageIndex, setCurrentImageIndex] = useState({})

  const categories = ['All', ...new Set(projectData.map(project => project.category))]
  const filteredProjects = activeFilter === 'All'
    ? projectData
    : projectData.filter(project => project.category === activeFilter)

  const handleImageNav = (projectId, direction, totalImages) => {
    setCurrentImageIndex(prev => {
      const current = prev[projectId] || 0
      const newIndex = direction === 'next' 
        ? (current + 1) % totalImages 
        : (current - 1 + totalImages) % totalImages
      return { ...prev, [projectId]: newIndex }
    })
  }

  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -6
    const rotateY = ((x - centerX) / centerX) * 6
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg)'
  }

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header">
          <h2 className="sub-title">Featured Projects</h2>
          <p className="section-description">
            A showcase of my recent work, featuring modern web applications and mobile solutions built with cutting-edge technologies.
          </p>
        </div>

        <div className="project-filters">
          {categories?.map((category) => (
            <button
              key={category}
              className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="work-list interactive-grid">
          {filteredProjects?.map((project) => (
            <article
              key={project.id}
              className={`work tilt project-card ${project.type}`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className={`project-image-container ${project.type}`}>
                {project.images ? (
                  <>
                    <img 
                      src={project.images[currentImageIndex[project.id] || 0]} 
                      alt={`${project.alt} - Screenshot ${(currentImageIndex[project.id] || 0) + 1}`} 
                      className="project-image"
                    />
                    <div className="image-carousel-controls">
                      <button 
                        className="carousel-btn prev" 
                        onClick={(e) => {
                          e.preventDefault()
                          handleImageNav(project.id, 'prev', project.images.length)
                        }}
                        aria-label="Previous image"
                      >
                        <i className="fas fa-chevron-left"></i>
                      </button>
                      <div className="carousel-indicators">
                        {project.images.map((_, index) => (
                          <span 
                            key={index} 
                            className={`indicator ${(currentImageIndex[project.id] || 0) === index ? 'active' : ''}`}
                            onClick={(e) => {
                              e.preventDefault()
                              setCurrentImageIndex(prev => ({ ...prev, [project.id]: index }))
                            }}
                          ></span>
                        ))}
                      </div>
                      <button 
                        className="carousel-btn next" 
                        onClick={(e) => {
                          e.preventDefault()
                          handleImageNav(project.id, 'next', project.images.length)
                        }}
                        aria-label="Next image"
                      >
                        <i className="fas fa-chevron-right"></i>
                      </button>
                    </div>
                  </>
                ) : (
                  <img src={project?.image} alt={project.alt} className="project-image" />
                )}
                <div className={`project-overlay ${project.type}`}>
                  <div className="project-category">{project.category}</div>

                  <div className="project-links">
                    <a
                      href={project.liveUrl}
                      className="project-link live-link"
                      aria-label={`View live demo of ${project.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-external-link-alt"></i>
                      <span>{project.requiresVPN ? 'Live Demo (VPN)' : 'Live Demo'}</span>
                    </a>
                    {project.isPrivate ? (
                      <div className="project-link private-link" title="Access restricted due to client confidentiality.">
                        <i className="fas fa-lock"></i>
                        <span>Code</span>
                        <div className="tooltip">
                          <i className="fas fa-info-circle"></i>
                          <span className="tooltip-text">Access restricted due to confidentiality.</span>
                        </div>
                      </div>
                    ) : (
                      <a
                        href={project.githubUrl}
                        className="project-link github-link"
                        aria-label={`View source code of ${project.title}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-github"></i>
                        <span>Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>

              </div>
            </article>
          ))}
        </div>

        {/* <div className="projects-cta">
          <a href="#" className="btn primary-btn">
            <span>View All Projects</span>
            <i className="fas fa-arrow-right"></i>
          </a>
        </div> */}
      </div>
    </section>
  )
}

export default Projects;
