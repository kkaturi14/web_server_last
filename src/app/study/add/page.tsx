import AddStudyForm from '@/components/AddStudyForm'

export default function AddStudy() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      color: '#ffffff',
      padding: '4rem 2rem'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: '700',
          marginBottom: '2rem'
        }}>
          새 스터디 추가
        </h1>
        <AddStudyForm />
      </div>
    </div>
  )
}

