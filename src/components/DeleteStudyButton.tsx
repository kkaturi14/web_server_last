'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { deleteStudy } from '@/actions/studyActions'

interface DeleteButtonProps {
  studyId: string
}

export default function DeleteButton({ studyId }: DeleteButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm('정말 이 스터디를 삭제하시겠습니까?')) {
      return
    }

    setLoading(true)
    try {
      await deleteStudy(studyId)
      router.refresh()
    } catch (error) {
      alert('삭제에 실패했습니다')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      style={{
        padding: '0.5rem 1.5rem',
        background: loading ? 'rgba(239, 68, 68, 0.5)' : 'rgba(239, 68, 68, 0.1)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        borderRadius: '8px',
        color: '#ef4444',
        fontSize: '0.938rem',
        fontWeight: '600',
        cursor: loading ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s'
      }}
    >
      {loading ? '삭제 중...' : '삭제'}
    </button>
  )
}

