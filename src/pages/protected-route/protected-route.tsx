import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '@store';
import { Preloader } from '@ui';
import { getIsAuthCheckedSelector, getIsAuthSelector } from '@selectors';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: TProtectedRouteProps) => {
  const isAuthChecked = useSelector(getIsAuthCheckedSelector);
  const isAuth = useSelector(getIsAuthSelector);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuth) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  return children;
};
