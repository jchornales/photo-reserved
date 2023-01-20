/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SignInForm } from '../../config/Types/initialize';
import { userSignInSchema } from '../../config/Validations/initialize';
import { signInUser } from '../../config/Firebase/authentication';

export default function SignIn() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(userSignInSchema),
  });

  const onSubmit: SubmitHandler<SignInForm> = (data) => signInUser(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email</label>
      <input {...register('email')} />
      <p>{errors.email?.message}</p>

      <label htmlFor="password">Password</label>
      <input type="password" {...register('password')} />
      <p>{errors.password?.message}</p>
      <button type="submit">Sign In</button>
    </form>
  );
}
