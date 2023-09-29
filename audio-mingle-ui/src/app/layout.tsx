import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

import AppContextStore from '@store/AppContextStore';
import { UserProps } from '@app-types/user';
import { getCurrentUser } from '@services/auth';

const roboto = Roboto({ subsets: [], weight: ['400', '500', '700'] });

export const metadata: Metadata = {
  title: 'AudioMingle - Your Ultimate Audio Streaming Experience',
  description:
    'AudioMingle is the premier audio streaming platform for music enthusiasts, offering a wide range of features and a vast library of songs. Discover, listen, and share your favorite tunes today.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentUser();

  const pathname = headers().get('x-url') || '';

  if (Object.keys(session || {}).length === 0 && !pathname.includes('auth')) {
    redirect('/auth/login');
  } else if (
    Object.keys(session || {}).length > 0 &&
    pathname.includes('auth')
  ) {
    redirect('/');
  }

  return (
    <html lang="en">
      <body className={roboto.className}>
        <AppContextStore
          session={{
            user: session as UserProps,
          }}
        >
          {children}
        </AppContextStore>
      </body>
    </html>
  );
}
