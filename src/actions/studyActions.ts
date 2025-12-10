'use server'

import connectMongoDB from '@/libs/mongodb'
import Study from '@/models/Study'
import { revalidatePath } from 'next/cache'

// MongoDB Document를 일반 객체로 변환
function convertDocToObj(doc: any) {
  const obj = doc.toObject()
  return {
    _id: obj._id.toString(),
    title: obj.title,
    description: obj.description,
    maxMembers: obj.maxMembers,
    currentMembers: obj.currentMembers,
    createdAt: obj.createdAt.toISOString(),
    updatedAt: obj.updatedAt.toISOString(),
  }
}

// 1. 스터디 생성: Create (POST)
export async function createStudy(title: string, description: string, maxMembers: number = 10) {
  try {
    await connectMongoDB()
    const doc = await Study.create({ title, description, maxMembers })
    revalidatePath('/study')
    return { success: true, study: convertDocToObj(doc) }
  } catch (error) {
    throw new Error(`스터디 생성에 실패했습니다: ${error}`)
  }
}

// 2. 스터디 수정: Update (PUT)
export async function updateStudy(id: string, title: string, description: string, maxMembers: number) {
  try {
    await connectMongoDB()
    const doc = await Study.findByIdAndUpdate(
      id,
      { title, description, maxMembers },
      { new: true }
    )
    if (!doc) throw new Error('스터디를 찾을 수 없습니다')
    revalidatePath('/study')
    return { success: true, study: convertDocToObj(doc) }
  } catch (error) {
    throw new Error(`스터디 수정에 실패했습니다: ${error}`)
  }
}

// 3. 단일 스터디 조회 (GET)
export async function getStudy(id: string) {
  try {
    await connectMongoDB()
    const doc = await Study.findById(id)
    if (!doc) throw new Error('스터디를 찾을 수 없습니다')
    return { success: true, study: convertDocToObj(doc) }
  } catch (error) {
    throw new Error(`스터디 조회에 실패했습니다: ${error}`)
  }
}

// 4. 모든 스터디 조회 (GET)
export async function getAllStudies() {
  try {
    await connectMongoDB()
    const docs = await Study.find({}).sort({ createdAt: -1 })
    const studies = docs.map((doc) => convertDocToObj(doc))
    return { success: true, studies }
  } catch (error) {
    throw new Error(`스터디 목록 조회에 실패했습니다: ${error}`)
  }
}

// 5. 스터디 삭제: DELETE
export async function deleteStudy(id: string) {
  try {
    await connectMongoDB()
    const doc = await Study.findByIdAndDelete(id)
    if (!doc) throw new Error('스터디를 찾을 수 없습니다')
    revalidatePath('/study')
    return { success: true }
  } catch (error) {
    throw new Error(`스터디 삭제에 실패했습니다: ${error}`)
  }
}

// 6. 스터디 참여: 참여자 수 증가
export async function joinStudy(id: string) {
  try {
    await connectMongoDB()
    const doc = await Study.findById(id)
    if (!doc) throw new Error('스터디를 찾을 수 없습니다')
    if (doc.currentMembers >= doc.maxMembers) {
      throw new Error('스터디 인원이 가득 찼습니다')
    }
    doc.currentMembers += 1
    await doc.save()
    revalidatePath('/study')
    return { success: true, study: convertDocToObj(doc) }
  } catch (error) {
    throw new Error(`스터디 참여에 실패했습니다: ${error}`)
  }
}

