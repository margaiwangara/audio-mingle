import { UserProps } from '@app-types/user';

export type AppContextSessionProps = {
  user?: UserProps;
};

export type UserProviderProps = {
  children: React.ReactNode;
  session: AppContextSessionProps;
};

export type UserActionProps = {
  type: 'ADD_CURRENT_USER';
  payload: UserProps;
};

export type UserContextProps = {
  user: UserProps | {};
  setUser: (user: UserProps | {}) => void;
};
