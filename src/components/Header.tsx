'use client'

import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      background: 'rgba(10, 10, 10, 0.8)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '1.5rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <Link href="/" style={{
          fontSize: '1.25rem',
          fontWeight: '700',
          color: '#ffffff',
          textDecoration: 'none',
          letterSpacing: '-0.02em',
          transition: 'opacity 0.3s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
          Portfolio
        </Link>

        {/* Navigation Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link href="/profile" style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.938rem',
            fontWeight: '500',
            textDecoration: 'none',
            transition: 'all 0.3s',
            padding: '0.5rem 0'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#ffffff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'
          }}>
            Profile
          </Link>
          <Link href="/projects" style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.938rem',
            fontWeight: '500',
            textDecoration: 'none',
            transition: 'all 0.3s',
            padding: '0.5rem 0'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#ffffff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'
          }}>
            Projects
          </Link>
          <Link href="/team" style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.938rem',
            fontWeight: '500',
            textDecoration: 'none',
            transition: 'all 0.3s',
            padding: '0.5rem 0'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#ffffff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'
          }}>
            Team
          </Link>
          <Link href="/practice" style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.938rem',
            fontWeight: '500',
            textDecoration: 'none',
            transition: 'all 0.3s',
            padding: '0.5rem 0'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#ffffff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'
          }}>
            Practice
          </Link>
          <Link href="/github" style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.938rem',
            fontWeight: '500',
            textDecoration: 'none',
            transition: 'all 0.3s',
            padding: '0.5rem 0'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#ffffff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'
          }}>
            GitHub
          </Link>
        </div>
      </div>
    </nav>
  )
}
