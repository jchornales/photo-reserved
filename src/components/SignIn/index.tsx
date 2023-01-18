/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { signInUser } from '../../config/Firebase/authentication';
import { SignInForm } from '../../config/Types/initialize';
import { userSignInSchema } from '../../config/Validations/initialize';

export default function SignIn() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: yupResolver(userSignInSchema),
  });

  const onSubmit = handleSubmit((data: SignInForm) => {
    if (userSignInSchema.isValidSync(data)) {
      signInUser(data);
    }
  });
  return (
    <form onSubmit={onSubmit}>
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
