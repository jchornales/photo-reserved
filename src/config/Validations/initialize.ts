/* eslint-disable import/prefer-default-export */
import { z } from 'zod';

export const userSignUpSchema = z
  .object({
    first_name: z.string().min(1, 'First Name is required'),
    last_name: z.string().min(1, 'Last Name is required'),
    email: z.string().email({ message: 'Invalid Email address' }),
    province: z.string().min(1, 'Province is required'),
    city: z.string().min(1, 'City is required'),
    barangay: z.string().min(1, 'Barangay is required'),
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
  password: z.string().min(6, { message: 'Password must matched' }),
});

export const photographerPackageSchema = z.object({
  title: z.string().min(1, { message: 'Package Label is required' }),
  occasion: z.string().min(1, { message: 'Occasion is required' }),
  rate: z.number().min(1, { message: 'Rate is required' }),
});
