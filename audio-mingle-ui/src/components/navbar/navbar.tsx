'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useUserContext } from '@store/ctx';
import { logoutUser } from '@services/auth';

export default function NavigationBar() {
  const { user } = useUserContext();
  const router = useRouter();

  const onLogout = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    await logoutUser();

    router.replace('/auth/login');
  };

  return (
    <nav className="navbar-dark bg-default navbar navbar-expand-lg">
      <div className="container">
        <Link href="/" className="navbar-brand">
          AudioMingle
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link href="/" className="nav-link">
              Home
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav ml-lg-auto">
          {user ? (
            <li className="nav-item">
              <button
                className="nav-link border-0 bg-transparent"
                style={{ outline: 'none' }}
                onClick={onLogout}
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link href="/auth/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/auth/register" className="nav-link">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
