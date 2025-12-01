// src/types/learning.ts
export interface LearningMaterial {
  id: string;
  user_type: string;
  language: string | null;
  title: string;
  description: string;
  content: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  order: number;
  created_at: string;
}
