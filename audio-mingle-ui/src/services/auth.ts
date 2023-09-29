import { apiRequest } from '@/lib/request';
import { LoginUserProps, RegisterUserProps } from '@app-types/user';
import axios from 'axios';

export async function loginUser(props: LoginUserProps) {
  try {
    const response = await apiRequest('POST', '/api/auth/login', props);

    return response;
  } catch (error) {
    return error;
  }
}

export async function registerUser(props: RegisterUserProps) {
  try {
    await apiRequest('POST', '/api/auth/register', props);

    return {};
  } catch (error) {
    return error;
  }
}

export async function getCurrentUser() {
  try {
    const user = await apiRequest('GET', '/api/auth/current-user');

    return user;
  } catch (error) {
    console.log('Get Current User Error', error);
    return {};
  }
}

export async function logoutUser() {
  try {
    await apiRequest('POST', '/api/auth/logout');
    return {};
  } catch (error) {
    return error;
  }
}
