import './auth.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import AppContextStore from '@store/AppContextStore';
import { UserProps } from '@app-types/user';
import { getCurrentUser } from '@services/auth';
import { PublicRoute } from '@containers/.';

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

  return (
    <main className="bg-gradient-default am--wrapper">
      <PublicRoute user={session as UserProps}>
        <AppContextStore
          session={{
            user: session as UserProps,
          }}
        >
          {children}
        </AppContextStore>
      </PublicRoute>
    </main>
  );
}
