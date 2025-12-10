'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrollY(window.scrollY)
      
      const sections = ['hero', 'whats-new', 'contact']
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
    { id: 'hero', label: 'Home' },
    { id: 'whats-new', label: "What's New" },
    { id: 'contact', label: 'Contact' }
  ]

  const projects = [
    {
      title: '동네 ON',
      subtitle: 'Team Project',
      description: '지역 커뮤니티를 위한 소셜 플랫폼. 지도 기반 위치 서비스와 실시간 소통 기능을 제공합니다.',
      tags: ['Next.js', 'MongoDB', 'Map API'],
      link: '/team',
      color: '#10b981'
    },
    {
      title: 'MongoDB CRUD',
      subtitle: 'Web Application',
      description: '소셜 로그인을 지원하는 게시판 시스템. Google과 Github 인증을 통한 안전한 사용자 관리.',
      tags: ['React', 'MongoDB', 'OAuth'],
      link: '/practice',
      color: '#3b82f6'
    },
    {
      title: '웹 취약점을 통한 쉘 획득 및 분석',
      subtitle: 'Security Project',
      description: '웹 취약점 분석 및 방어 실습 프로젝트. 실제 공격 시나리오를 통한 보안 학습.',
      tags: ['Security', 'PHP', 'Penetration'],
      link: '/projects',
      color: '#f59e0b'
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
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
        backgroundSize: '100px 100px',
        opacity: 0.5,
        transform: `translateY(${scrollY * 0.5}px)`,
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
        padding: '0 2rem',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Hero Section */}
        <section id="hero" style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          position: 'relative'
        }}>
          <div style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '100px',
              fontSize: '0.875rem',
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '2rem',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)',
                animation: 'pulse 2s ease-in-out infinite'
              }} />
              Web Server Security Programming
            </div>

            <h1 style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: '300',
              lineHeight: '1.1',
              marginBottom: '1.5rem',
              letterSpacing: '0.02em',
              background: 'linear-gradient(to bottom, #ffffff 30%, rgba(255, 255, 255, 0.5) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontStyle: 'italic',
              fontFamily: 'Georgia, "Times New Roman", serif'
            }}>
              곽민경
              <br />
              Portfolio
            </h1>

            <p style={{
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              color: 'rgba(255, 255, 255, 0.6)',
              maxWidth: '600px',
              lineHeight: '1.8',
              marginBottom: '3rem',
              fontWeight: '300',
              fontStyle: 'italic',
              letterSpacing: '0.05em',
              fontFamily: 'Georgia, "Times New Roman", serif'
            }}>
              중부대학교 정보보호학전공
            </p>

            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <Link href="/profile" style={{
                padding: '1rem 2rem',
                background: '#ffffff',
                color: '#0a0a0a',
                borderRadius: '12px',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'inline-block',
                border: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 255, 255, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}>
                Profile
              </Link>
              <Link href="/projects" style={{
                padding: '1rem 2rem',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                borderRadius: '12px',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'inline-block',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}>
                Projects
              </Link>
              <Link href="/team" style={{
                padding: '1rem 2rem',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                borderRadius: '12px',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'inline-block',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}>
                Team
              </Link>
              <Link href="/practice" style={{
                padding: '1rem 2rem',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                borderRadius: '12px',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'inline-block',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}>
                Practice
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: mounted ? 1 : 0,
            transition: 'opacity 2s ease-out 1s',
            animation: 'bounce-slow 2s ease-in-out infinite'
          }}>
            <div style={{
              width: '24px',
              height: '36px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '12px',
              position: 'relative'
            }}>
              <div style={{
                width: '4px',
                height: '8px',
                background: 'rgba(255, 255, 255, 0.5)',
                borderRadius: '2px',
                position: 'absolute',
                top: '6px',
                left: '50%',
                transform: 'translateX(-50%)',
                animation: 'scroll-down 2s ease-in-out infinite'
              }} />
            </div>
          </div>
        </section>

        {/* What's New Section */}
        <section id="whats-new" style={{
          padding: '8rem 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <div style={{
            marginBottom: '3rem',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem'
            }}>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: '700',
                letterSpacing: '-0.02em'
              }}>
                What's New
              </h2>
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
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.5)'
            }}>
              최근 업데이트된 프로젝트와 성과
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              {
                title: '네트워크관리사 2급',
                date: '2025.12.09',
                category: 'Certification',
                link: '/profile'
              },
              {
                title: '동네 ON',
                date: 'Team Project',
                category: 'Community Platform',
                link: '/team'
              },
              {
                title: 'MongoDB CRUD',
                date: 'Practice',
                category: 'Web Application',
                link: '/practice'
              },
              {
                title: 'Daiso Shopping Mall',
                date: 'Practice',
                category: 'E-commerce',
                link: '/practice'
              },
              {
                title: '웹 취약점을 통한 쉘 획득 및 분석',
                date: 'Security',
                category: 'Penetration Test',
                link: '/projects'
              }
            ].map((item, index) => (
              <Link
                key={index}
                href={item.link}
                style={{
                  padding: '2rem',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  textDecoration: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: `${0.6 + index * 0.1}s`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div>
                  <div style={{
                    fontSize: '0.813rem',
                    color: 'rgba(255, 255, 255, 0.5)',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {item.category}
                  </div>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: '#ffffff',
                    marginBottom: '0.5rem'
                  }}>
                    {item.title}
                  </h3>
                  <div style={{
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.4)'
                  }}>
                    {item.date}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          padding: '4rem 0',
          marginTop: '8rem'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '0.5rem',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
            }}>
              Contact
            </div>

            <div style={{
              display: 'flex',
              gap: '2rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s'
            }}>
              <a
                href="https://github.com/kkaturi14"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  textDecoration: 'none',
                  fontSize: '0.938rem',
                  fontWeight: '500',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
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
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>

              <Link
                href="/profile"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  textDecoration: 'none',
                  fontSize: '0.938rem',
                  fontWeight: '500',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
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
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Resume
              </Link>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              marginTop: '2rem',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s'
            }}>
              <div style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.3)'
              }}>
                © 2025 Kwak Minkyung. All rights reserved.
              </div>
              <div style={{
                fontSize: '0.813rem',
                color: 'rgba(255, 255, 255, 0.2)',
                fontStyle: 'italic'
              }}>
                Built with passion & dedication
              </div>
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }

        @keyframes scroll-down {
          0% { opacity: 0; transform: translateX(-50%) translateY(0); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateX(-50%) translateY(12px); }
        }

        a:hover .project-glow {
          opacity: 1 !important;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
