export interface Exam {
  id: string;
  examType: 'Fundoscopia' | 'Campo Visual' | 'Biometria' | 'Acuidade Visual';
  date: string;
  time: string;
}
