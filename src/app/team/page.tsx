'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function TeamPage() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      const sections = ['team-project', 'team-members']
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
    { id: 'team-project', label: 'Team Project' },
    { id: 'team-members', label: 'Team Members' }
  ]

  const teamMembers = [
    { name: '곽민경', role: 'PA', task: 'DB 연동', image: '/profile.jpg', portfolioLink: 'https://web-server-last-portfolio.vercel.app', githubLink: 'https://github.com/kkaturi14' },
    { name: '박혜수', role: 'PA', task: '지역별 게시판 구축', image: '/pandyo.png', portfolioLink: 'https://web-server-class-project-03.vercel.app', githubLink: 'https://github.com/Pandyo' },
    { name: '심재훈', role: 'PA', task: '메인화면 제작', image: '/sim.png', portfolioLink: 'https://portfolio-v1-khaki-psi.vercel.app', githubLink: 'https://github.com/J4EH00N' },
    { name: '정윤서', role: 'PA', task: 'Map API 연동', image: '/puppy.jpg', portfolioLink: 'https://wsvbp2.vercel.app', githubLink: 'https://github.com/oesp91' },
    { name: '정재성', role: 'PM', task: '지역별 게시판 구축', image: '/duck.jpg', portfolioLink: 'https://jbu-2025-2-personal.vercel.app', githubLink: 'https://github.com/Interludeal' }
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
            Team
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.5)'
          }}>
            Meet our amazing team members
          </p>
        </div>

        {/* Team Project Section */}
        <section id="team-project" style={{
          marginBottom: '6rem',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              paddingBottom: '1rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              flex: 1
            }}>
              Team Project
            </h2>
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

          <div style={{
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'
          }}>
            {/* Image */}
            <div style={{
              width: '100%',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: '#1a1a1f'
            }}>
              <img 
                src="/동네ON 메인화면.png" 
                alt="동네 ON - 지역 기반 소통 플랫폼"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block'
                }}
              />
            </div>

            <div>
              <div style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                background: 'rgba(16, 185, 129, 0.2)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                borderRadius: '8px',
                fontSize: '0.813rem',
                fontWeight: '600',
                color: '#10b981',
                marginBottom: '1rem'
              }}>
                Community Platform
              </div>
              
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '1rem'
              }}>
                동네 ON : 지역 기반 소통 플랫폼
              </h3>
              
              <p style={{
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>
                이웃과 연결되는 새로운 일상. 지역 기반 커뮤니티 플랫폼 '동네 ON'을 통해 실제 이웃들과 진솔한 이야기를 나누고, 
                지도 기반 지역 선택, 질문 & 답변 게시판, 포인트 시스템, 월별 랭킹 이벤트 등 다양한 기능을 구현했습니다.
              </p>
              
              <a 
                href="https://neighborhood-on-cu5h.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '8px',
                  color: '#10b981',
                  textDecoration: 'none',
                  fontSize: '0.938rem',
                  fontWeight: '600',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'
                  e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.5)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                View Project
              </a>
            </div>
          </div>
        </section>

        {/* Team Members Section */}
        <section id="team-members" style={{
          marginBottom: '4rem',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '3rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            Team Members
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem'
          }}>
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                style={{
                  padding: '2rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  textAlign: 'center',
                  transition: 'all 0.3s',
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: `${0.6 + index * 0.1}s`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  margin: '0 auto 1.5rem',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  background: '#ffffff'
                }}>
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem'
                }}>
                  {member.name}
                </h3>
                
                <div style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.5)',
                  marginBottom: '0.75rem'
                }}>
                  {member.role}
                </div>
                
                <div style={{
                  fontSize: '0.813rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '1.5rem',
                  lineHeight: '1.4'
                }}>
                  {member.task}
                </div>
                
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  <a
                    href={member.portfolioLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '0.75rem 1rem',
                      background: 'rgba(99, 102, 241, 0.1)',
                      border: '1px solid rgba(99, 102, 241, 0.3)',
                      borderRadius: '8px',
                      color: '#a5b4fc',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      textAlign: 'center',
                      textDecoration: 'none',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(99, 102, 241, 0.2)'
                      e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)'
                      e.currentTarget.style.color = '#ffffff'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)'
                      e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)'
                      e.currentTarget.style.color = '#a5b4fc'
                    }}
                  >
                    Portfolio
                  </a>
                  <a
                    href={member.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '0.75rem 1rem',
                      background: 'rgba(139, 92, 246, 0.1)',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      borderRadius: '8px',
                      color: '#c4b5fd',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      textAlign: 'center',
                      textDecoration: 'none',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)'
                      e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)'
                      e.currentTarget.style.color = '#ffffff'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)'
                      e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)'
                      e.currentTarget.style.color = '#c4b5fd'
                    }}
                  >
                    GitHub
                  </a>
                </div>
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
