'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { joinStudy } from '@/actions/studyActions'

interface JoinButtonProps {
  studyId: string
  currentMembers: number
  maxMembers: number
}

export default function JoinButton({ studyId, currentMembers, maxMembers }: JoinButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const isFull = currentMembers >= maxMembers

  const handleJoin = async () => {
    if (isFull) {
      alert('스터디 인원이 가득 찼습니다')
      return
    }

    setLoading(true)
    try {
      await joinStudy(studyId)
      router.refresh()
    } catch (error: any) {
      alert(error.message || '참여에 실패했습니다')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleJoin}
      disabled={loading || isFull}
      style={{
        padding: '0.5rem 1.5rem',
        background: isFull 
          ? 'rgba(107, 114, 128, 0.1)' 
          : loading 
            ? 'rgba(16, 185, 129, 0.5)' 
            : 'rgba(16, 185, 129, 0.1)',
        border: `1px solid ${isFull ? 'rgba(107, 114, 128, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
        borderRadius: '8px',
        color: isFull ? 'rgba(255, 255, 255, 0.5)' : '#10b981',
        fontSize: '0.938rem',
        fontWeight: '600',
        cursor: (loading || isFull) ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s'
      }}
    >
      {loading ? '참여 중...' : isFull ? '인원 마감' : '참여하기'}
    </button>
  )
}

