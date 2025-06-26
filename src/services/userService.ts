import api from './api';
import { BASE_URL } from '../constants/apiConfig';

export const uploadProfileImage = async (userId: number | string, file: File, token: string) => {
  const formData = new FormData();
  formData.append('image', file);
  const res = await api.post(`/users/${userId}/addImage`, formData, {
    headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
  });
  return res.data;
};
