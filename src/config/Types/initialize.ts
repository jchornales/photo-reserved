import React from 'react';

export type BaseLayout = {
  children?: React.ReactNode;
};

export type Customer = {
  first_name: string;
  address: string;
  last_name: string;
  phone: string;
};

export type FormData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  address: string;
  phone: string;
  province: string;
  city: string;
  barangay: string;
};

export type SignInForm = {
  email: string;
  password: string;
};

export type Geolocation = {
  code: string;
  name: string;
};
