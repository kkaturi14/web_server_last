import Link from 'next/link'
import { getAllStudies, deleteStudy, joinStudy } from '@/actions/studyActions'
import DeleteButton from '@/components/DeleteStudyButton'
import JoinButton from '@/components/JoinStudyButton'

export default async function StudyPage() {
  const { studies } = await getAllStudies()

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      color: '#ffffff',
      padding: '4rem 2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '3rem'
        }}>
          <div>
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '700',
              marginBottom: '0.5rem'
            }}>
              공부 스터디 인원 모집
            </h1>
            <p style={{
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.5)'
            }}>
              함께 공부할 스터디를 찾거나 새로운 스터디를 만들어보세요
            </p>
          </div>
          <Link
            href="/study/add"
            style={{
              padding: '0.75rem 2rem',
              background: 'rgba(99, 102, 241, 0.8)',
              border: 'none',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '1rem',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.3s'
            }}
          >
            + 스터디 만들기
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {studies.map((study) => (
            <div
              key={study._id}
              style={{
                padding: '2rem',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                transition: 'all 0.3s'
              }}
            >
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '1rem'
              }}>
                {study.title}
              </h2>
              <p style={{
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>
                {study.description}
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem',
                padding: '0.75rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px'
              }}>
                <span style={{
                  fontSize: '0.938rem',
                  color: 'rgba(255, 255, 255, 0.7)'
                }}>
                  인원: {study.currentMembers} / {study.maxMembers}
                </span>
              </div>
              <div style={{
                display: 'flex',
                gap: '0.75rem',
                flexWrap: 'wrap'
              }}>
                <Link
                  href={`/study/edit/${study._id}`}
                  style={{
                    padding: '0.5rem 1.5rem',
                    background: 'rgba(99, 102, 241, 0.1)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    borderRadius: '8px',
                    color: '#a5b4fc',
                    fontSize: '0.938rem',
                    fontWeight: '600',
                    textDecoration: 'none',
                    transition: 'all 0.3s'
                  }}
                >
                  수정
                </Link>
                <JoinButton studyId={study._id} currentMembers={study.currentMembers} maxMembers={study.maxMembers} />
                <DeleteButton studyId={study._id} />
              </div>
            </div>
          ))}
        </div>

        {studies.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: 'rgba(255, 255, 255, 0.5)'
          }}>
            <p style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>
              아직 등록된 스터디가 없습니다.
            </p>
            <Link
              href="/study/add"
              style={{
                padding: '0.75rem 2rem',
                background: 'rgba(99, 102, 241, 0.8)',
                border: 'none',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '1rem',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              첫 스터디 만들기
            </Link>
          </div>
        )}

        <div style={{ marginTop: '3rem' }}>
          <Link
            href="/practice"
            style={{
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
              transition: 'all 0.3s'
            }}
          >
            ← Practice로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}

