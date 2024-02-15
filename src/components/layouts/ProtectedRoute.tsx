import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

export interface IProtectedRouteProps {
  children?: ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute(props: IProtectedRouteProps) {
  const to = props.redirectTo ? props.redirectTo : '/';
  const user = useAuthContext();

  if (!user.user) {
    return <Navigate to={to} />;
  }

  return props.children ? props.children : <Outlet />;
}
