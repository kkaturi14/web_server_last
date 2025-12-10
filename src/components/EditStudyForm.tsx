'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateStudy } from '@/actions/studyActions'

interface EditStudyFormProps {
  id: string
  initialTitle: string
  initialDescription: string
  initialMaxMembers: number
}

export default function EditStudyForm({
  id,
  initialTitle,
  initialDescription,
  initialMaxMembers,
}: EditStudyFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(initialTitle)
  const [description, setDescription] = useState(initialDescription)
  const [maxMembers, setMaxMembers] = useState(initialMaxMembers)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await updateStudy(id, title, description, maxMembers)
      router.push('/study')
      router.refresh()
    } catch (err: any) {
      setError(err.message || '스터디 수정에 실패했습니다')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{
      padding: '2rem',
      background: 'rgba(255, 255, 255, 0.04)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      borderRadius: '16px'
    }}>
      {error && (
        <div style={{
          padding: '1rem',
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '8px',
          color: '#ef4444',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontSize: '0.938rem',
          fontWeight: '600',
          color: 'rgba(255, 255, 255, 0.9)'
        }}>
          제목
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontSize: '0.938rem',
          fontWeight: '600',
          color: 'rgba(255, 255, 255, 0.9)'
        }}>
          설명
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={5}
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

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontSize: '0.938rem',
          fontWeight: '600',
          color: 'rgba(255, 255, 255, 0.9)'
        }}>
          최대 인원
        </label>
        <input
          type="number"
          value={maxMembers}
          onChange={(e) => setMaxMembers(Number(e.target.value))}
          min={1}
          max={50}
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

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.75rem 2rem',
            background: loading ? 'rgba(99, 102, 241, 0.5)' : 'rgba(99, 102, 241, 0.8)',
            border: 'none',
            borderRadius: '8px',
            color: '#ffffff',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s'
          }}
        >
          {loading ? '수정 중...' : '스터디 수정'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/study')}
          style={{
            padding: '0.75rem 2rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        >
          취소
        </button>
      </div>
    </form>
  )
}

