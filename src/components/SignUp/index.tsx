/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '../../config/Validations/initialize';
import { FormData, Geolocation } from '../../config/Types/initialize';
import GetProvinces from '../../api/GetPMCB';

export default function SignUp() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
  });

  const provinces = GetProvinces();
  const provinceRegister = register('province');

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="first_name">First Name</label>
      <input {...register('first_name')} />
      {errors.first_name?.message && <span>{errors.first_name?.message}</span>}

      <label htmlFor="last_name">Last Name</label>
      <input {...register('last_name')} />
      {errors.last_name?.message && <span>{errors.last_name?.message}</span>}

      <label htmlFor="province">Province</label>
      <select
        defaultValue="DEFAULT"
        {...provinceRegister}
        onChange={(e) => {
          provinceRegister.onChange(e);
          // ? Create a function that fetches cities located to the selected province
        }}
      >
        <option value="DEFAULT" disabled>
          Select Province
        </option>
        {provinces &&
          provinces.map((province: Geolocation) => {
            return (
              <option key={province.name} value={province.code}>
                {province.name}
              </option>
            );
          })}
      </select>
      {errors.province?.message && <span>{errors.province?.message}</span>}

      <label htmlFor="city">City</label>
      <input {...register('city')} />
      {errors.city?.message && <span>{errors.city?.message}</span>}

      <label htmlFor="barangay">Barangay</label>
      <input {...register('barangay')} />
      {errors.barangay?.message && <span>{errors.barangay?.message}</span>}

      <label htmlFor="address">address</label>
      <input {...register('address')} />
      {errors.address?.message && <span>{errors.address?.message}</span>}

      <label htmlFor="phone">phone</label>
      <input {...register('phone')} />
      {errors.phone?.message && <span>{errors.phone?.message}</span>}

      <label htmlFor="email">Email</label>
      <input {...register('email')} />
      {errors.email?.message && <span>{errors.email?.message}</span>}

      <label htmlFor="password">Password</label>
      <input type="password" {...register('password')} />
      {errors.password?.message && <span>{errors.password?.message}</span>}

      <label htmlFor="password">Confirm Password</label>
      <input type="password" {...register('passwordConfirmation')} />
      {errors.passwordConfirmation?.message && (
        <span>{errors.passwordConfirmation?.message}</span>
      )}

      <button type="submit">SetValue</button>
    </form>
  );
}
