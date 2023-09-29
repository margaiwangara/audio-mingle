import Link from 'next/link';
import { Metadata } from 'next';

import { AuthForm } from '@components/ui';
import { AppLogo } from '@components/app-logo';

export const metadata: Metadata = {
  title: 'Login - Your Ultimate Audio Streaming Experience',
};

export default function Login() {
  return (
    <section className="pt-lg-7 pt-5 container">
      <section className="row justify-content-center">
        <div className="col-lg-5">
          <div className="card bg-secondary shadow border-0">
            <div className="card-header bg-white">
              <AppLogo />
            </div>
            <div className="card-body px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Sign in</small>
              </div>
              <AuthForm page="login" btnText="Log In" />
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between mt-3">
            <Link href="/auth/login" className="text-light">
              <small>Forgot Password?</small>
            </Link>
            <Link href="/auth/register" className="text-light">
              <small>Create account</small>
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}
