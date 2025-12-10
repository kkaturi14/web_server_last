import mongoose, { Schema, models, model } from 'mongoose'

const GuestbookSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, '이름을 입력해주세요'],
    },
    content: {
      type: String,
      required: [true, '내용을 입력해주세요'],
    },
  },
  {
    timestamps: true,
  }
)

const Guestbook = models.Guestbook || model('Guestbook', GuestbookSchema)

export default Guestbook

