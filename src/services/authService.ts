import api from './api';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface SignupPayload {
  username: string;
  password: string;
  name: string;
  email: string;
  phoneNumber: string;
  gender: string;
  role: string;
}

export const loginUser = async (payload: LoginPayload) => {
  const res = await api.post('/auth/login', payload, {
    headers: { 'Content-Type': 'application/json' },
  });
  return res.data;
};

export const signupUser = async (payload: SignupPayload) => {
  const res = await api.post('/auth/register', payload, {
    headers: { 'Content-Type': 'application/json' },
  });
  return res.data;
};

export const verifyOtp = async (username: string, otp: string) => {
  const res = await api.post('/auth/verify-otp', { username, otp }, {
    headers: { 'Content-Type': 'application/json' },
  });
  return res.data;
};
