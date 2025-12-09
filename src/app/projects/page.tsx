'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ProjectsPage() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      const sections = ['cloud-projects', 'web-projects']
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + window.scrollY
          if (elementTop <= scrollPosition) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const navItems = [
    { id: 'cloud-projects', label: 'Cloud Projects' },
    { id: 'web-projects', label: 'Web Projects' }
  ]

  const cloudProjects = [
    {
      title: 'DevOps CI/CD 파이프라인 구축',
      category: 'Security Focused',
      description: '보안을 최우선으로 고려한 CI/CD 파이프라인을 구축하여, 안전한 소프트웨어 배포 프로세스를 구현했습니다.',
      color: '#6366f1'
    },
    {
      title: 'IaC 자동화 및 Drift 관리',
      category: 'Infrastructure as Code',
      description: '인프라를 코드로 관리하고, 실제 인프라와 코드 간의 차이(Drift)를 자동으로 감지하고 관리하는 시스템을 구축했습니다.',
      color: '#22c55e'
    }
  ]

  const webProjects = [
    {
      title: 'Pentesting Playground',
      category: 'Security Training',
      description: '모의해킹 실습을 위한 웹사이트를 제작하여, 다양한 보안 취약점을 학습하고 실습할 수 있는 환경을 구축했습니다.',
      color: '#ef4444',
      isNew: false
    },
    {
      title: '2025 JBU-CTF WEB 문제 출제',
      category: 'CTF Challenge',
      description: '2025년 중부대학교 CTF 대회에서 웹 분야 문제를 출제했습니다.',
      color: '#a855f7',
      isNew: false
    },
    {
      title: '웹 취약점을 통한 쉘 획득 및 분석',
      category: 'Web Security',
      description: '패킷분석 및 공격대응 과목에서 진행한 프로젝트. 웹 취약점을 통한 쉘 획득 과정을 실습하고, 커뮤니티 게시판 시스템을 구축하여 파일 업로드 취약점 및 다양한 웹 공격 기법을 분석했습니다.',
      link: 'https://packet-web-project.vercel.app/',
      color: '#f97316',
      isNew: true
    }
  ]

  return (
    <div style={{ 
      minHeight: '100vh',
      background: '#0a0a0a',
      color: '#ffffff',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Subtle gradient background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.08) 0%, transparent 50%)',
        pointerEvents: 'none',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 1s ease-out'
      }} />

      {/* Animated grid */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
        backgroundSize: '100px 100px',
        opacity: 0.5,
        pointerEvents: 'none'
      }} />

      {/* Side Navigation */}
      <div style={{
        position: 'fixed',
        right: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 10,
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.8s ease-out 0.5s'
      }}>
        <div style={{
          padding: '1.5rem',
          background: 'rgba(10, 10, 10, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          minWidth: '180px'
        }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              style={{
                padding: '0.75rem 1rem',
                background: activeSection === item.id 
                  ? 'rgba(99, 102, 241, 0.2)' 
                  : 'transparent',
                border: 'none',
                borderRadius: '8px',
                color: activeSection === item.id 
                  ? '#a5b4fc' 
                  : 'rgba(255, 255, 255, 0.6)',
                fontSize: '0.875rem',
                fontWeight: activeSection === item.id ? '600' : '500',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.3s',
                fontFamily: 'inherit'
              }}
              onMouseEnter={(e) => {
                if (activeSection !== item.id) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== item.id) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'
                }
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '8rem 2rem 4rem',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{
          marginBottom: '6rem',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '700',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
            background: 'linear-gradient(to bottom, #ffffff 30%, rgba(255, 255, 255, 0.5) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Projects
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.5)'
          }}>
            My projects
          </p>
        </div>

        {/* Cloud Projects */}
        <section id="cloud-projects" style={{
          marginBottom: '6rem',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '2rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            Cloud Projects
          </h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            {cloudProjects.map((project, index) => (
              <div key={index} style={{
                padding: '2rem',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                transition: 'all 0.3s',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: `radial-gradient(circle at 0% 0%, ${project.color}10 0%, transparent 50%)`,
                  pointerEvents: 'none'
                }} />
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    background: `${project.color}20`,
                    border: `1px solid ${project.color}40`,
                    borderRadius: '8px',
                    fontSize: '0.813rem',
                    fontWeight: '600',
                    color: project.color,
                    marginBottom: '1rem'
                  }}>
                    {project.category}
                  </div>
                  
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    marginBottom: '1rem'
                  }}>
                    {project.title}
                  </h3>
                  
                  <p style={{
                    fontSize: '1rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                    lineHeight: '1.6'
                  }}>
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Web Projects */}
        <section id="web-projects" style={{
          marginBottom: '4rem',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '2rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            Web Projects
          </h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            {webProjects.map((project, index) => (
              <div key={index} style={{
                position: 'relative'
              }}>
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'block',
                      padding: '2rem',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '16px',
                      textDecoration: 'none',
                      transition: 'all 0.3s',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    {project.isNew && (
                      <div style={{
                        position: 'absolute',
                        top: '1.5rem',
                        right: '1.5rem',
                        padding: '0.375rem 0.75rem',
                        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                        borderRadius: '100px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: '#ffffff',
                        letterSpacing: '0.05em',
                        boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
                      }}>
                        NEW
                      </div>
                    )}
                    
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: `radial-gradient(circle at 0% 0%, ${project.color}10 0%, transparent 50%)`,
                      pointerEvents: 'none'
                    }} />
                    
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{
                        display: 'inline-block',
                        padding: '0.5rem 1rem',
                        background: `${project.color}20`,
                        border: `1px solid ${project.color}40`,
                        borderRadius: '8px',
                        fontSize: '0.813rem',
                        fontWeight: '600',
                        color: project.color,
                        marginBottom: '1rem'
                      }}>
                        {project.category}
                      </div>
                      
                      <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        marginBottom: '1rem',
                        color: '#ffffff'
                      }}>
                        {project.title}
                      </h3>
                      
                      <p style={{
                        fontSize: '1rem',
                        color: 'rgba(255, 255, 255, 0.6)',
                        lineHeight: '1.6'
                      }}>
                        {project.description}
                      </p>
                    </div>
                  </a>
                ) : (
                  <div style={{
                    padding: '2rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '16px',
                    transition: 'all 0.3s',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: `radial-gradient(circle at 0% 0%, ${project.color}10 0%, transparent 50%)`,
                      pointerEvents: 'none'
                    }} />
                    
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{
                        display: 'inline-block',
                        padding: '0.5rem 1rem',
                        background: `${project.color}20`,
                        border: `1px solid ${project.color}40`,
                        borderRadius: '8px',
                        fontSize: '0.813rem',
                        fontWeight: '600',
                        color: project.color,
                        marginBottom: '1rem'
                      }}>
                        {project.category}
                      </div>
                      
                      <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        marginBottom: '1rem'
                      }}>
                        {project.title}
                      </h3>
                      
                      <p style={{
                        fontSize: '1rem',
                        color: 'rgba(255, 255, 255, 0.6)',
                        lineHeight: '1.6'
                      }}>
                        {project.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Back Button */}
        <Link href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '1rem 2rem',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          color: 'rgba(255, 255, 255, 0.7)',
          textDecoration: 'none',
          fontSize: '1rem',
          fontWeight: '600',
          transition: 'all 0.3s',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(30px)',
          transitionDelay: '0.6s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
          e.currentTarget.style.color = '#ffffff'
          e.currentTarget.style.transform = 'translateX(-4px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'
          e.currentTarget.style.transform = 'translateX(0)'
        }}>
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
