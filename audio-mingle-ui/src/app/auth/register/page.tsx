import Link from 'next/link';
import { Metadata } from 'next';

import { AuthForm } from '@components/ui';
import { AppLogo } from '@components/app-logo';

export const metadata: Metadata = {
  title: 'Register - Your Ultimate Audio Streaming Experience',
};

export default function Register() {
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
                <small>Register</small>
              </div>
              <AuthForm page="register" btnText="Register" />
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-end mt-3">
            <Link href="/auth/login" className="text-light">
              <small>Already a member? </small>
              <small className="text-secondary">Log in</small>
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}
