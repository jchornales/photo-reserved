/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '../../config/Validations/initialize';
import { FormData } from '../../config/Types/initialize';
import createUser from '../../config/Firebase/authentication';

export default function SignUp() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(userSchema),
  });

  const onSubmit = handleSubmit((data) => {
    if (userSchema.isValidSync(data)) {
      createUser(data);
    }
  });

  // function handleOnSubmit(event: FormEvent) {
  //   event.preventDefault();
  // }
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="first_name">First Name</label>
      <input {...register('first_name')} />
      <p>{errors.first_name?.message}</p>

      <label htmlFor="last_name">Last Name</label>
      <input {...register('last_name')} />
      <p>{errors.last_name?.message}</p>

      <label htmlFor="address">address</label>
      <input {...register('address')} />
      <p>{errors.address?.message}</p>

      <label htmlFor="phone">phone</label>
      <input {...register('phone')} />
      <p>{errors.phone?.message}</p>

      <label htmlFor="email">Email</label>
      <input {...register('email')} />
      <p>{errors.email?.message}</p>

      <label htmlFor="password">Password</label>
      <input type="password" {...register('password')} />
      <p>{errors.password?.message}</p>

      <label htmlFor="password">Confirm Password</label>
      <input type="password" {...register('passwordConfirmation')} />
      <p>{errors.passwordConfirmation?.message}</p>

      <button type="submit">SetValue</button>
    </form>
  );
}
