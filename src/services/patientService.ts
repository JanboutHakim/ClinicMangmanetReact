import api from './api';
import { API_ENDPOINTS } from '../constants/apiConfig';

export const getPatientById = async (id: number | string,patientId: number | string, token: string) => {
  const res = await api.get(API_ENDPOINTS.patient(id,patientId), {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
