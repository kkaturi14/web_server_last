'use server'

import connectMongoDB from '@/libs/mongodb'
import Guestbook from '@/models/Guestbook'
import { revalidatePath } from 'next/cache'

// MongoDB Document를 일반 객체로 변환
function convertDocToObj(doc: any) {
  const obj = doc.toObject()
  return {
    _id: obj._id.toString(),
    name: obj.name,
    content: obj.content,
    createdAt: obj.createdAt.toISOString(),
    updatedAt: obj.updatedAt.toISOString(),
  }
}

// 1. 방명록 작성: Create (POST)
export async function createGuestbookEntry(name: string, content: string) {
  try {
    await connectMongoDB()
    const doc = await Guestbook.create({ name, content })
    revalidatePath('/practice')
    return { success: true, entry: convertDocToObj(doc) }
  } catch (error) {
    throw new Error(`방명록 작성에 실패했습니다: ${error}`)
  }
}

// 2. 모든 방명록 조회 (GET)
export async function getAllGuestbookEntries() {
  try {
    await connectMongoDB()
    const docs = await Guestbook.find({}).sort({ createdAt: -1 })
    const entries = docs.map((doc) => convertDocToObj(doc))
    return { success: true, entries }
  } catch (error) {
    throw new Error(`방명록 조회에 실패했습니다: ${error}`)
  }
}

// 3. 방명록 수정: Update (PUT)
export async function updateGuestbookEntry(id: string, name: string, content: string) {
  try {
    await connectMongoDB()
    const doc = await Guestbook.findByIdAndUpdate(
      id,
      { name, content },
      { new: true }
    )
    if (!doc) throw new Error('방명록을 찾을 수 없습니다')
    revalidatePath('/practice')
    return { success: true, entry: convertDocToObj(doc) }
  } catch (error) {
    throw new Error(`방명록 수정에 실패했습니다: ${error}`)
  }
}

// 4. 방명록 삭제: DELETE
export async function deleteGuestbookEntry(id: string) {
  try {
    await connectMongoDB()
    const doc = await Guestbook.findByIdAndDelete(id)
    if (!doc) throw new Error('방명록을 찾을 수 없습니다')
    revalidatePath('/practice')
    return { success: true }
  } catch (error) {
    throw new Error(`방명록 삭제에 실패했습니다: ${error}`)
  }
}

