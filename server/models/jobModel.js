import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Название вакансии обязательно']
  },
  department: {
    type: String,
    required: [true, 'Название факультета/отдела обязательно']
  },
  type: {
    type: String,
    required: [true, 'Тип работы обязателен'],
    enum: ['Стажировка', 'Частичная занятость', 'Полная занятость']
  },
  description: {
    type: String,
    required: [true, 'Описание обязательно']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Job = mongoose.model('Job', jobSchema);

export default Job; 