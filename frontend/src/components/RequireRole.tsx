import { useAuth } from '@/context/AuthContext';
import type { Role } from '@/types/User.type';

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
