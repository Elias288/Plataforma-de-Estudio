import { useAuth, type Role } from '@/context/AuthContext';

type Props = {
  allowedRoles: Role[];
  fallback?: React.ReactNode;
  children: React.ReactNode;
};
const RequireRole = ({ allowedRoles, children, fallback }: Props) => {
  const { user } = useAuth();

  if (user && allowedRoles.includes(user.role)) {
    return <>{children}</>;
  }

  if (fallback) return <>{fallback}</>;

  return null;
};

export default RequireRole;
