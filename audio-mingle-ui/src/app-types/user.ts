export interface UserProps {
  id: number;
  name: string;
  email: string;
  role: string;
  is_confirmed: boolean;
  created_at: string;
}

export type RegisterUserProps = {
  password: string;
} & Pick<UserProps, 'name' | 'email'>;

export type LoginUserProps = Omit<RegisterUserProps, 'name'>;

export interface LoginResponseProps {
  user: Pick<UserProps, 'id' | 'name' | 'email' | 'role'>;
  access_token: string;
  token_type: string;
}
