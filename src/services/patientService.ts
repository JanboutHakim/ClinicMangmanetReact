import api from './api';
import { API_ENDPOINTS } from '../constants/apiConfig';

export const getPatientById = async (id: number | string, token: string) => {
  const res = await api.get(API_ENDPOINTS.patient(id), {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
