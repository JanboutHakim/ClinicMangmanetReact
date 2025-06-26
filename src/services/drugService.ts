import api from './api';
import { API_ENDPOINTS } from '../constants/apiConfig';

export const getDrugs = async (search?: string) => {
  const endpoint = search ? `${API_ENDPOINTS.drugs}/search?q=${encodeURIComponent(search)}` : API_ENDPOINTS.drugs;
  const res = await api.get(endpoint);
  return res.data;
};

export const addDrugToPatient = async (patientId: number | string, payload: { drugId?: number; drugName?: string; frequency: number; startDate?: string | null; endDate?: string | null; dosage?: string | null; }, token: string) => {
  const res = await api.post(`${API_ENDPOINTS.patients}/${patientId}/drugs`, payload, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};

export const getPatientDrugs = async (patientId: number | string, token: string) => {
  const res = await api.get(`${API_ENDPOINTS.patients}/${patientId}/drugs`, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};
