/* eslint-disable import/prefer-default-export */
import * as yup from 'yup';

export const userSchema = yup.object().shape({
  first_name: yup.string().required('First Name is Required'),
  last_name: yup.string().required('Last Name is Required'),
  email: yup.string().email().required('Email is Required'),
  address: yup.string(),
  phone: yup.string(),
  password: yup.string().required().min(6),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});
