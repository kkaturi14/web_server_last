'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      const sections = ['information', 'certifications', 'security-activities', 'tech-stack']
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
    { id: 'information', label: 'Information' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'security-activities', label: 'Security Activities' },
    { id: 'tech-stack', label: 'Tech Stack' }
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
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
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
            Profile
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.5)'
          }}>
            About me
          </p>
        </div>

        {/* Main Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '4rem',
          marginBottom: '6rem',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
        }}>
          {/* Profile Image & Name */}
          <div>
            <div style={{
              width: '200px',
              height: '250px',
              borderRadius: '16px',
              overflow: 'hidden',
              marginBottom: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: '#ffffff'
            }}>
              <img 
                src="/profile.jpg" 
                alt="Profile" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover'
                }}
              />
            </div>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              marginBottom: '0.5rem'
            }}>
              곽민경
            </h2>
            <p style={{
              fontSize: '1rem',
              color: 'rgba(255, 255, 255, 0.5)'
            }}>
              중부대학교 정보보호학전공
            </p>
          </div>

          {/* Info */}
          <div id="information">
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '2rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              Information
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '2rem'
            }}>
              {[
                { label: '나이', value: '21살' },
                { label: '학번', value: '92410653' },
                { label: '전공', value: '정보보호학전공' },
                { label: '관심분야', value: 'WEB' },
                { label: '거주지', value: '경기도 광주' },
                { label: 'MBTI', value: 'ISFP/ISTP' }
              ].map((item, index) => (
                <div key={index} style={{
                  padding: '1.5rem',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'
                }}>
                  <div style={{
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.5)',
                    marginBottom: '0.5rem'
                  }}>
                    {item.label}
                  </div>
                  <div style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: '#ffffff'
                  }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '2rem',
              padding: '1.5rem',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '12px'
            }}>
              <div style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.5)',
                marginBottom: '0.5rem'
              }}>
                GitHub
              </div>
              <a 
                href="https://github.com/kkaturi14" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#6366f1',
                  textDecoration: 'none',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#818cf8'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#6366f1'}
              >
                github.com/kkaturi14
              </a>
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div id="certifications" style={{
          marginBottom: '6rem',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s'
        }}>
          <h3 style={{
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '2rem'
          }}>
            Certifications
          </h3>
          
          <div style={{
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            position: 'relative',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '2rem',
              flexWrap: 'wrap'
            }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.5rem',
                  flexWrap: 'wrap'
                }}>
                  <h4 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    margin: 0
                  }}>
                    네트워크관리사 2급
                  </h4>
                  {/* NEW Badge */}
                  <div style={{
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
                </div>
                <p style={{
                  fontSize: '1rem',
                  color: 'rgba(255, 255, 255, 0.6)'
                }}>
                  한국정보통신자격협회
                </p>
              </div>
              <div style={{
                padding: '0.75rem 1.5rem',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '100px',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#10b981'
              }}>
                2025.12.09
              </div>
            </div>
          </div>
        </div>

        {/* Security Activities */}
        <div id="security-activities" style={{
          marginBottom: '6rem',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s'
        }}>
          <h3 style={{
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '2rem'
          }}>
            Security Activities
          </h3>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {[
              '정보보안 동아리 SCP 활동 (2024.09~)',
              '화이트햇 스쿨 3기 수료 (2025.03~09)'
            ].map((activity, index) => (
              <div key={index} style={{
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.8)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.transform = 'translateX(4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'
                e.currentTarget.style.transform = 'translateX(0)'
              }}>
                {activity}
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div id="tech-stack" style={{
          marginBottom: '4rem',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.8s'
        }}>
          <h3 style={{
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '2rem'
          }}>
            Tech Stack
          </h3>
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            {['AWS', 'Python', 'PHP', 'MySQL', 'MongoDB', 'Docker', 'JSP'].map((tech, index) => (
              <div key={tech} style={{
                padding: '1rem 2rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                color: 'rgba(255, 255, 255, 0.8)',
                transition: 'all 0.3s',
                cursor: 'default'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                e.currentTarget.style.color = '#ffffff'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}>
                {tech}
              </div>
            ))}
          </div>
        </div>

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
          transitionDelay: '1s'
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
