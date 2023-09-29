'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { UserProps } from '@app-types/user';

type PublicRouteContainerProps = {
  children: React.ReactNode;
  user: UserProps;
};

export default function PublicRouteContainer({
  children,
  user,
}: PublicRouteContainerProps) {
  const router = useRouter();

  useEffect(() => {
    if (Object.keys(user).length) router.replace('/');
  }, [user, router]);

  return <>{children}</>;
}
