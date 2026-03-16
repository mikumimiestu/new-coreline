// src/types/learning.ts

export interface LearningMaterial {
  id: string;
  user_type: string;
  language: string | null;
  title: string;
  description: string;
  content: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  order: number;
  created_at: string;
  
  // --- TAMBAHAN BARU UNTUK UI DASHBOARD ---
  has_quiz?: boolean;        // Flag untuk memunculkan badge "Ada Kuis"
  has_exercise?: boolean;    // Flag untuk memunculkan badge "Latihan Praktik"
  estimated_time?: number;   // Estimasi waktu baca/belajar (dalam menit)
}