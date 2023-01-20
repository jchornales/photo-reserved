/* eslint-disable import/prefer-default-export */
import { z } from 'zod';

export const userSchema = z
  .object({
    first_name: z.string().min(1, 'First Name is required'),
    last_name: z.string().min(1, 'Last Name is required'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email({ message: 'Invalid email address' }),
    province: z.string(),
    city: z.string(),
    barangay: z.string(),
    address: z.string(),
    phone: z.string(),
    password: z
      .string()
      .min(6, { message: 'Password Must be more than 6 character' }),
    passwordConfirmation: z
      .string()
      .min(6, { message: 'Password Must be more than 6 character' }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Password don't match",
    path: ['passwordConfirmation'],
  });

export const userSignInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password Must be more than 6 character' }),
});
