'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { UserProps } from '@app-types/user';

type ProtectedRouteContainerProps = {
  children: React.ReactNode;
  user: UserProps;
};

export default function ProtectedRouteContainer({
  children,
  user,
}: ProtectedRouteContainerProps) {
  const router = useRouter();

  useEffect(() => {
    if (!Object.keys(user).length) router.push('/auth/login');
  }, [user, router]);

  return <>{children}</>;
}
