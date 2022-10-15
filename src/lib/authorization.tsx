import * as React from 'react';
import { useAuth } from '../app/modules/auth';

export const useAuthorization = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    throw Error('User does not exist!');
  }

  const can = React.useCallback(
    ({ allowedPermissions }: { allowedPermissions: string[] }) => {

      if (allowedPermissions && allowedPermissions.length > 0) {
        const allowed = currentUser?.role?.permissions.some(
            (permission) => allowedPermissions.indexOf(permission.slug) >= 0
        )

        return !!allowed
      }

      return true;
    },
    []
  );

  return { can, role: currentUser?.role?.name };
};

type AuthorizationProps = {
  forbiddenFallback?: React.ReactNode;
  children: React.ReactNode;
} & {
      allowedPermissions: string[];
};

export const AuthorizationFallback = () => (<div>Dont Have Permission to Access this Resource.</div>)

export const Authorization = ({
  allowedPermissions,
  forbiddenFallback = null,
  children,
}: AuthorizationProps) => {
  const { can } = useAuthorization();

  let canAccess = false;

  if (allowedPermissions) {
    canAccess = can({ allowedPermissions });
  }

  return <>{canAccess ? children : forbiddenFallback}</>;
};