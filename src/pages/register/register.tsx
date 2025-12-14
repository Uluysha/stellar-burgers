import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '@store';
import { getIsAuthSelector, getRegisterErrorSelector } from '@selectors';
import { registerUser } from '@thunks';
import { useForm } from '@hooks';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(getIsAuthSelector);
  const error = useSelector(getRegisterErrorSelector);

  const { values, handleChange } = useForm({
    userName: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (isAuth) {
      navigate('/profile', { replace: true });
    }
  }, [isAuth, navigate]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!values.userName || !values.email || !values.password) {
      return;
    }

    dispatch(
      registerUser({
        name: values.userName,
        email: values.email,
        password: values.password
      })
    );
  };

  if (isAuth) {
    return <Navigate to='/' replace />;
  }

  return (
    <RegisterUI
      errorText={error || undefined}
      email={values.email}
      userName={values.userName}
      password={values.password}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
