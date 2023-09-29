'use client';
import { IoMail, IoLockClosed } from 'react-icons/io5';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useUserContext } from '@store/ctx';
import { loginUser, registerUser, getCurrentUser } from '@services/auth';
import { UserProps } from '@app-types/user';

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

  const { setUser } = useUserContext();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = values;

    try {
      // login or register based on path
      (await page) === 'register'
        ? registerUser(values)
        : loginUser({ email, password });

      setValues(INITIAL_VALUES);

      router.replace('/');
    } catch (error) {
      console.log('error', error);
      setUser({});
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  return (
    <form method="POST" role="form" onSubmit={handleSubmit}>
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
            placeholder="janedoe@audio-mingle.com"
            className="form-control"
            name="email"
            value={values.email}
            onChange={handleChange}
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
          />
        </div>
      </div>
      <div className="text-center">
        <button className="my-4 btn btn-primary">{btnText}</button>
      </div>
    </form>
  );
}
