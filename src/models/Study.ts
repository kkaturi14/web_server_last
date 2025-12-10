import mongoose, { Schema, models, model } from 'mongoose'

const StudySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, '제목을 입력해주세요'],
    },
    description: {
      type: String,
      required: [true, '설명을 입력해주세요'],
    },
    maxMembers: {
      type: Number,
      default: 10,
    },
    currentMembers: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Study = models.Study || model('Study', StudySchema)

export default Study

