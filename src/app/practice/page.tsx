'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createGuestbookEntry, getAllGuestbookEntries, updateGuestbookEntry, deleteGuestbookEntry } from '@/actions/guestbookActions'

export default function PracticePage() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [clickedCard, setClickedCard] = useState<string | null>(null)
  const [guestbookEntries, setGuestbookEntries] = useState<any[]>([])
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editContent, setEditContent] = useState('')

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      const sections = ['clerk-auth', 'mongodb-crud', 'shopping-mall', 'study-recruitment']
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

  useEffect(() => {
    const loadEntries = async () => {
      setLoading(true)
      try {
        const { entries } = await getAllGuestbookEntries()
        setGuestbookEntries(entries)
      } catch (error) {
        console.error('방명록 로드 실패:', error)
      } finally {
        setLoading(false)
      }
    }
    loadEntries()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !content.trim()) return

    setSubmitting(true)
    try {
      await createGuestbookEntry(name.trim(), content.trim())
      setName('')
      setContent('')
      const { entries } = await getAllGuestbookEntries()
      setGuestbookEntries(entries)
    } catch (error) {
      console.error('방명록 작성 실패:', error)
      alert('방명록 작성에 실패했습니다')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (entry: any) => {
    setEditingId(entry._id)
    setEditName(entry.name)
    setEditContent(entry.content)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditName('')
    setEditContent('')
  }

  const handleUpdate = async (id: string) => {
    if (!editName.trim() || !editContent.trim()) return

    setSubmitting(true)
    try {
      await updateGuestbookEntry(id, editName.trim(), editContent.trim())
      const { entries } = await getAllGuestbookEntries()
      setGuestbookEntries(entries)
      setEditingId(null)
      setEditName('')
      setEditContent('')
    } catch (error) {
      console.error('방명록 수정 실패:', error)
      alert('수정에 실패했습니다')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return
    
    try {
      await deleteGuestbookEntry(id)
      const { entries } = await getAllGuestbookEntries()
      setGuestbookEntries(entries)
    } catch (error) {
      console.error('방명록 삭제 실패:', error)
      alert('삭제에 실패했습니다')
    }
  }

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
    { id: 'clerk-auth', label: 'Clerk Auth' },
    { id: 'mongodb-crud', label: 'MongoDB CRUD' },
    { id: 'shopping-mall', label: 'Shopping Mall' },
    { id: 'study-recruitment', label: 'Study Recruitment' }
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
            Practice
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.5)'
          }}>
            My practice
          </p>
        </div>

        {/* Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem',
          alignItems: 'stretch'
        }}>
        {/* Clerk Authentication Demo */}
        <section id="clerk-auth" style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          height: '100%',
          display: 'flex'
        }}>
          <div 
            onClick={() => {
              setClickedCard('clerk-auth')
              scrollToSection('clerk-auth')
            }}
            style={{
              padding: '2rem',
              background: clickedCard === 'clerk-auth' 
                ? 'rgba(99, 102, 241, 0.1)' 
                : 'rgba(255, 255, 255, 0.02)',
              border: clickedCard === 'clerk-auth'
                ? '2px solid rgba(99, 102, 241, 0.6)'
                : '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              transition: 'all 0.3s',
              cursor: 'pointer',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              transform: clickedCard === 'clerk-auth' ? 'scale(1.02)' : 'scale(1)',
              boxShadow: clickedCard === 'clerk-auth'
                ? '0 8px 24px rgba(99, 102, 241, 0.3)'
                : 'none'
            }}
            onMouseEnter={(e) => {
              if (clickedCard !== 'clerk-auth') {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
              }
            }}
            onMouseLeave={(e) => {
              if (clickedCard !== 'clerk-auth') {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'
              }
            }}>
            {/* Image */}
            <div style={{
              width: '100%',
              aspectRatio: '16/9',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: '#ffffff'
            }}>
              <img 
                src="/clerkapp.png" 
                alt="Clerk Authentication Demo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>

            <div>
              <div style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                background: 'rgba(99, 102, 241, 0.2)',
                border: '1px solid rgba(99, 102, 241, 0.4)',
                borderRadius: '8px',
                fontSize: '0.813rem',
                fontWeight: '600',
                color: '#a5b4fc',
                marginBottom: '1rem'
              }}>
                User Management
              </div>
              
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '1rem'
              }}>
                Clerk Auth Demo
              </h2>
              
              <p style={{
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: '1.6',
                marginBottom: '1.5rem',
                flex: 1
              }}>
                Clerk를 활용한 사용자 인증 시스템 구현. React와 Next.js에 최적화된 사용자 관리 UI 및 API를 통합했습니다.
              </p>
              
              <a 
                href="https://web-server-nine-lemon.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(99, 102, 241, 0.1)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  borderRadius: '8px',
                  color: '#a5b4fc',
                  textDecoration: 'none',
                  fontSize: '0.938rem',
                  fontWeight: '600',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(99, 102, 241, 0.2)'
                  e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)'
                  e.currentTarget.style.color = '#ffffff'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)'
                  e.currentTarget.style.color = '#a5b4fc'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                View Demo
              </a>
            </div>
          </div>
        </section>

        {/* MongoDB CRUD Demo */}
        <section id="mongodb-crud" style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
          height: '100%',
          display: 'flex'
        }}>
          <div 
            onClick={() => {
              setClickedCard('mongodb-crud')
              scrollToSection('mongodb-crud')
            }}
            style={{
              padding: '2rem',
              background: clickedCard === 'mongodb-crud' 
                ? 'rgba(16, 185, 129, 0.1)' 
                : 'rgba(255, 255, 255, 0.02)',
              border: clickedCard === 'mongodb-crud'
                ? '2px solid rgba(16, 185, 129, 0.6)'
                : '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              transition: 'all 0.3s',
              cursor: 'pointer',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              transform: clickedCard === 'mongodb-crud' ? 'scale(1.02)' : 'scale(1)',
              boxShadow: clickedCard === 'mongodb-crud'
                ? '0 8px 24px rgba(16, 185, 129, 0.3)'
                : 'none'
            }}
            onMouseEnter={(e) => {
              if (clickedCard !== 'mongodb-crud') {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
              }
            }}
            onMouseLeave={(e) => {
              if (clickedCard !== 'mongodb-crud') {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'
              }
            }}>
            {/* Image */}
            <div style={{
              width: '100%',
              aspectRatio: '16/9',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: '#1a1a1f'
            }}>
              <img 
                src="/mongo-crud.png" 
                alt="MongoDB CRUD Demo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>

            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  display: 'inline-block',
                  padding: '0.5rem 1rem',
                  background: 'rgba(16, 185, 129, 0.2)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  borderRadius: '8px',
                  fontSize: '0.813rem',
                  fontWeight: '600',
                  color: '#10b981'
                }}>
                  Database
                </div>
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
              
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '1rem'
              }}>
                MongoDB CRUD
              </h2>
              
              <p style={{
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: '1.6',
                marginBottom: '1.5rem',
                flex: 1
              }}>
                MongoDB를 활용한 CRUD 애플리케이션. Google 및 Github 소셜 로그인을 지원하며, 글을 작성 기능을 구현했습니다.
              </p>
              
              <a 
                href="https://mongo-crud-phi.vercel.app/" 
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
                  e.currentTarget.style.color = '#ffffff'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)'
                  e.currentTarget.style.color = '#10b981'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                View Demo
              </a>
            </div>
          </div>
        </section>

        {/* Shopping Mall */}
        <section id="shopping-mall" style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s',
          height: '100%',
          display: 'flex'
        }}>
          <div 
            onClick={() => {
              setClickedCard('shopping-mall')
              scrollToSection('shopping-mall')
            }}
            style={{
              padding: '2rem',
              background: clickedCard === 'shopping-mall' 
                ? 'rgba(168, 85, 247, 0.1)' 
                : 'rgba(255, 255, 255, 0.02)',
              border: clickedCard === 'shopping-mall'
                ? '2px solid rgba(168, 85, 247, 0.6)'
                : '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              transition: 'all 0.3s',
              cursor: 'pointer',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              transform: clickedCard === 'shopping-mall' ? 'scale(1.02)' : 'scale(1)',
              boxShadow: clickedCard === 'shopping-mall'
                ? '0 8px 24px rgba(168, 85, 247, 0.3)'
                : 'none'
            }}
            onMouseEnter={(e) => {
              if (clickedCard !== 'shopping-mall') {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
              }
            }}
            onMouseLeave={(e) => {
              if (clickedCard !== 'shopping-mall') {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'
              }
            }}>
            {/* Image */}
            <div style={{
              width: '100%',
              aspectRatio: '16/9',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: '#1a1a1f'
            }}>
              <img 
                src="/daiso-shopping.png" 
                alt="Daiso Shopping Mall"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>

            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  display: 'inline-block',
                  padding: '0.5rem 1rem',
                  background: 'rgba(168, 85, 247, 0.2)',
                  border: '1px solid rgba(168, 85, 247, 0.4)',
                  borderRadius: '8px',
                  fontSize: '0.813rem',
                  fontWeight: '600',
                  color: '#a855f7'
                }}>
                  E-commerce
                </div>
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
              
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '1rem'
              }}>
                Daiso Shopping Mall
              </h2>
              
              <p style={{
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: '1.6',
                marginBottom: '1.5rem',
                flex: 1
              }}>
                온라인 쇼핑몰 플랫폼. 상품 관리, 장바구니, 주문 처리 등 전자상거래 핵심 기능을 구현한 웹 애플리케이션입니다.
              </p>
              
              <a 
                href="https://daiso-shopping-five.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(168, 85, 247, 0.1)',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  borderRadius: '8px',
                  color: '#a855f7',
                  textDecoration: 'none',
                  fontSize: '0.938rem',
                  fontWeight: '600',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(168, 85, 247, 0.2)'
                  e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)'
                  e.currentTarget.style.color = '#ffffff'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(168, 85, 247, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.3)'
                  e.currentTarget.style.color = '#a855f7'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                View Demo
              </a>
            </div>
          </div>
        </section>
        </div>

        {/* Study Recruitment */}
        <section id="study-recruitment" style={{
          marginTop: '4rem',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.8s'
        }}>
          <div style={{
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            transition: 'all 0.3s',
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  display: 'inline-block',
                  padding: '0.5rem 1rem',
                  background: 'rgba(251, 146, 60, 0.2)',
                  border: '1px solid rgba(251, 146, 60, 0.4)',
                  borderRadius: '8px',
                  fontSize: '0.813rem',
                  fontWeight: '600',
                  color: '#fb923c'
                }}>
                  Community
                </div>
              </div>
              
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '1rem'
              }}>
                공부 스터디 인원 모집
              </h2>
              
              <p style={{
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>
                저는 WEB과 관련한 스터디 모임을 모집하고 있습니다. 관심있으신 분은 글로 남겨주시길 바랍니다.
              </p>
              
              <p style={{
                fontSize: '0.938rem',
                color: 'rgba(251, 146, 60, 0.8)',
                marginBottom: '2rem',
                fontWeight: '600'
              }}>
                아래에 인적사항 및 하고싶은 스터디를 남겨주세요.
              </p>

              {/* 방명록 목록 */}
              <div style={{
                maxHeight: '300px',
                overflowY: 'auto',
                marginBottom: '2rem',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                {loading ? (
                  <div style={{
                    textAlign: 'center',
                    color: 'rgba(255, 255, 255, 0.5)',
                    padding: '2rem'
                  }}>
                    로딩 중...
                  </div>
                ) : guestbookEntries.length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    color: 'rgba(255, 255, 255, 0.5)',
                    padding: '2rem'
                  }}>
                    아직 글이 없습니다.
                  </div>
                ) : (
                  guestbookEntries.map((entry) => (
                    <div
                      key={entry._id}
                      style={{
                        padding: '1rem',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        marginBottom: '0.5rem'
                      }}
                    >
                      {editingId === entry._id ? (
                        // 수정 모드
                        <div>
                          <div style={{ marginBottom: '1rem' }}>
                            <input
                              type="text"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              placeholder="이름을 입력하세요"
                              style={{
                                width: '100%',
                                padding: '0.5rem 0.75rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '6px',
                                color: '#ffffff',
                                fontSize: '0.938rem',
                                marginBottom: '0.5rem'
                              }}
                            />
                            <textarea
                              value={editContent}
                              onChange={(e) => setEditContent(e.target.value)}
                              placeholder="하고싶은 스터디를 입력하세요"
                              rows={3}
                              style={{
                                width: '100%',
                                padding: '0.5rem 0.75rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '6px',
                                color: '#ffffff',
                                fontSize: '0.938rem',
                                resize: 'vertical'
                              }}
                            />
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                              onClick={() => handleUpdate(entry._id)}
                              disabled={submitting}
                              style={{
                                padding: '0.5rem 1rem',
                                background: submitting ? 'rgba(251, 146, 60, 0.5)' : 'rgba(251, 146, 60, 0.8)',
                                border: 'none',
                                borderRadius: '6px',
                                color: '#ffffff',
                                fontSize: '0.813rem',
                                fontWeight: '600',
                                cursor: submitting ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s'
                              }}
                            >
                              {submitting ? '수정 중...' : '저장'}
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              disabled={submitting}
                              style={{
                                padding: '0.5rem 1rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '6px',
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontSize: '0.813rem',
                                fontWeight: '600',
                                cursor: submitting ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s'
                              }}
                            >
                              취소
                            </button>
                          </div>
                        </div>
                      ) : (
                        // 일반 모드
                        <div>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '0.5rem'
                          }}>
                            <div style={{ flex: 1 }}>
                              <div style={{
                                display: 'flex',
                                gap: '1rem',
                                marginBottom: '0.5rem'
                              }}>
                                <span style={{
                                  fontWeight: '600',
                                  color: 'rgba(255, 255, 255, 0.9)'
                                }}>
                                  {entry.name}
                                </span>
                                <span style={{
                                  fontSize: '0.813rem',
                                  color: 'rgba(255, 255, 255, 0.5)'
                                }}>
                                  {new Date(entry.createdAt).toLocaleString('ko-KR', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                              </div>
                              <p style={{
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontSize: '0.938rem',
                                lineHeight: '1.6',
                                margin: 0
                              }}>
                                {entry.content}
                              </p>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <button
                                onClick={() => handleEdit(entry)}
                                style={{
                                  padding: '0.25rem 0.75rem',
                                  background: 'rgba(99, 102, 241, 0.1)',
                                  border: '1px solid rgba(99, 102, 241, 0.3)',
                                  borderRadius: '6px',
                                  color: '#a5b4fc',
                                  fontSize: '0.75rem',
                                  cursor: 'pointer',
                                  transition: 'all 0.3s'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = 'rgba(99, 102, 241, 0.2)'
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)'
                                }}
                              >
                                수정
                              </button>
                              <button
                                onClick={() => handleDelete(entry._id)}
                                style={{
                                  padding: '0.25rem 0.75rem',
                                  background: 'rgba(239, 68, 68, 0.1)',
                                  border: '1px solid rgba(239, 68, 68, 0.3)',
                                  borderRadius: '6px',
                                  color: '#ef4444',
                                  fontSize: '0.75rem',
                                  cursor: 'pointer',
                                  transition: 'all 0.3s'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'
                                }}
                              >
                                삭제
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* 방명록 작성 폼 */}
              <form onSubmit={handleSubmit} style={{
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.938rem',
                    fontWeight: '600',
                    color: 'rgba(255, 255, 255, 0.9)'
                  }}>
                    이름
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="이름을 입력하세요"
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.938rem',
                    fontWeight: '600',
                    color: 'rgba(255, 255, 255, 0.9)'
                  }}>
                    내용
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="하고싶은 스터디를 입력하세요"
                    required
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '1rem',
                      resize: 'vertical'
                    }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1.5rem',
                    background: submitting ? 'rgba(251, 146, 60, 0.5)' : 'rgba(251, 146, 60, 0.8)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  {submitting ? '작성 중...' : '작성하기'}
                </button>
              </form>
            </div>
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
