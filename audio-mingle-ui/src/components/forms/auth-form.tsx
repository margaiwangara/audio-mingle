'use client';
import { IoMail, IoLockClosed } from 'react-icons/io5';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useUserContext } from '@store/ctx';
import { loginUser, registerUser } from '@services/auth';

type AuthFormProps = {
  page?: 'register' | 'login';
  btnText?: string;
};

const INITIAL_VALUES = {
  name: '',
  email: '',
  password: '',
};

export default function AuthForm({
  page = 'register',
  btnText,
}: AuthFormProps) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [hasError, setHasError] = useState(false);

  const { setUser } = useUserContext();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = values;

    setHasError(false);

    // login or register based on path
    let response: Record<string, any> = {};
    if (page === 'register') {
      response = (await registerUser(values)) as Record<string, any>;
    } else if (page === 'login') {
      response = (await loginUser({ email, password })) as Record<string, any>;
    }

    if (response?.type === 'error') {
      setHasError(true);
      return;
    }

    setValues(INITIAL_VALUES);

    router.replace('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  return (
    <form method="POST" role="form" onSubmit={handleSubmit}>
      {hasError && (
        <div className="alert alert-danger fade show">
          {page === 'register'
            ? 'Invalid entry. Please check your entries'
            : 'Invalid credentials'}
        </div>
      )}
      {page === 'register' && (
        <div className="mb-3 form-group">
          <div className="input-group-alternative input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <IoMail />
              </span>
            </div>
            <input
              type="text"
              placeholder="Jane Doe"
              className="form-control"
              name="name"
              value={values.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      )}
      <div className="mb-3 form-group">
        <div className="input-group-alternative input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <IoMail />
            </span>
          </div>
          <input
            type="email"
            placeholder="janedoe@audiomingle.dev"
            className="form-control"
            name="email"
            value={values.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="form-group">
        <div className="input-group-alternative input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <IoLockClosed />
            </span>
          </div>
          <input
            type="password"
            autoComplete="off"
            className="form-control"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            minLength={8}
            required
          />
        </div>
      </div>
      <div className="text-center">
        <button className="my-4 btn btn-primary">{btnText}</button>
      </div>
    </form>
  );
}
