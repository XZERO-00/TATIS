/**
 * Supabase Storage Buckets Configuration
 * Milestone 1: Architecture and Bucket Definitions
 * (To be provisioned in future milestones for student documents, receipts, etc.)
 */

export const STORAGE_BUCKETS = {
  AVATARS: 'avatars',
  STUDENT_DOCS: 'student-documents',
  RECEIPTS: 'receipts',
  REPORTS: 'reports',
} as const;

export type StorageBucket = (typeof STORAGE_BUCKETS)[keyof typeof STORAGE_BUCKETS];
