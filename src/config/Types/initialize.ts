import React from 'react';
import { z } from 'zod';
import { userSchema, userSignInSchema } from '../Validations/initialize';

export type BaseLayout = {
  children?: React.ReactNode;
};

export type Customer = {
  first_name: string;
  address: string;
  last_name: string;
  phone: string;
};

export type FormData = z.infer<typeof userSchema>;

export type SignInForm = z.infer<typeof userSignInSchema>;

export type Province = {
  code: string;
  name: string;
};

export type City = {
  code: string;
  name: string;
  provinceCode: string;
  type: string;
};

export type Barangay = {
  code: string;
  name: string;
  cityCode: string;
  municipalityCode: string;
};

export type ProvinceForm = {
  value: string;
  label: string;
};

export type CityForm = {
  value: string;
  label: string;
  code: string;
  type: string;
};

export type BarangayForm = {
  value: string;
  label: string;
};
