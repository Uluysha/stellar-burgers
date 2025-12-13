import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '@store';
import { getIsAuthSelector, getRegisterErrorSelector } from '@selectors';
import { registerUser } from '@thunks';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(getIsAuthSelector);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector(getRegisterErrorSelector);

  useEffect(() => {
    if (isAuth) {
      navigate('/profile', { replace: true });
    }
  }, [isAuth, navigate]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!userName || !email || !password) {
      return;
    }

    console.log('Регистрация пользователя');
    dispatch(
      registerUser({
        name: userName,
        email: email,
        password: password
      })
    );
  };

  if (isAuth) {
    return <Navigate to='/' replace />;
  }

  return (
    <RegisterUI
      errorText={error || undefined}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
