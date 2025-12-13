import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '@store';
import { getLoginErrorSelector } from '@selectors';
import { loginUser } from '@thunks';
import { useForm } from '@hooks';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const error = useSelector(getLoginErrorSelector);

  const { values, handleChange } = useForm({
    email: '',
    password: ''
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!values.email || !values.password) {
      return;
    }

    dispatch(
      loginUser({
        email: values.email,
        password: values.password
      })
    );
  };

  return (
    <LoginUI
      errorText={error || undefined}
      email={values.email}
      password={values.password}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
