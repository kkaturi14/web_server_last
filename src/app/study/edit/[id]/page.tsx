import { getStudy } from '@/actions/studyActions'
import EditStudyForm from '@/components/EditStudyForm'

export default async function EditStudy({
  params,
}: {
  params: { id: string }
}) {
  const { study } = await getStudy(params.id)

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
          스터디 수정
        </h1>
        <EditStudyForm
          id={study._id}
          initialTitle={study.title}
          initialDescription={study.description}
          initialMaxMembers={study.maxMembers}
        />
      </div>
    </div>
  )
}

