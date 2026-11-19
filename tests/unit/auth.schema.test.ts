import { describe, it, expect } from 'vitest';
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '@/schemas/auth.schema';

describe('Authentication Validation Schemas', () => {
  describe('loginSchema', () => {
    it('validates correct email and password', () => {
      const valid = loginSchema.safeParse({
        email: 'admin@tatis.edu',
        password: 'Password123!',
      });
      expect(valid.success).toBe(true);
    });

    it('rejects invalid email', () => {
      const invalid = loginSchema.safeParse({
        email: 'invalid-email',
        password: 'Password123!',
      });
      expect(invalid.success).toBe(false);
    });

    it('rejects short passwords', () => {
      const invalid = loginSchema.safeParse({
        email: 'admin@tatis.edu',
        password: '123',
      });
      expect(invalid.success).toBe(false);
    });
  });

  describe('registerSchema', () => {
    it('validates a complete registration payload with matching passwords', () => {
      const valid = registerSchema.safeParse({
        fullName: 'Dr. Robert Evans',
        email: 'robert@tatis.edu',
        password: 'SecurePassword1',
        confirmPassword: 'SecurePassword1',
      });
      expect(valid.success).toBe(true);
    });

    it('fails when passwords do not match', () => {
      const invalid = registerSchema.safeParse({
        fullName: 'Dr. Robert Evans',
        email: 'robert@tatis.edu',
        password: 'SecurePassword1',
        confirmPassword: 'DifferentPassword1',
      });
      expect(invalid.success).toBe(false);
    });
  });

  describe('forgotPasswordSchema & resetPasswordSchema', () => {
    it('validates email for reset request', () => {
      const valid = forgotPasswordSchema.safeParse({
        email: 'user@example.com',
      });
      expect(valid.success).toBe(true);
    });

    it('validates password reset match', () => {
      const valid = resetPasswordSchema.safeParse({
        password: 'NewStrongPassword1',
        confirmPassword: 'NewStrongPassword1',
      });
      expect(valid.success).toBe(true);
    });
  });
});
