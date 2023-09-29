import './auth.css';
import type { Metadata } from 'next';

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
  return <main className="bg-gradient-default am--wrapper">{children}</main>;
}
