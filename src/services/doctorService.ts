import api from './api';
import { API_ENDPOINTS } from '../constants/apiConfig';

export const getDoctors = async (search?: string, specialty?: string, token?: string) => {
  const params = new URLSearchParams();
  if (search) params.append('q', search);
  if (specialty) params.append('specialty', specialty);
  const endpoint = search || specialty ? `${API_ENDPOINTS.doctors}/search?${params.toString()}` : API_ENDPOINTS.doctors;
  const res = await api.get(endpoint, token ? { headers: { Authorization: `Bearer ${token}` } } : undefined);
  return res.data;
};

export const getDoctor = async (id: number | string, token?: string) => {
  const res = await api.get(API_ENDPOINTS.doctor(id), token ? { headers: { Authorization: `Bearer ${token}` } } : undefined);
  return res.data;
};

export const getDoctorAppointments = async (id: number | string, token: string) => {
  const res = await api.get(API_ENDPOINTS.doctorAppointments(id), { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};

export const getAvailableSlots = async (id: number | string, token?: string) => {
  const res = await api.get(API_ENDPOINTS.availableSlots(id), token ? { headers: { Authorization: `Bearer ${token}` } } : undefined);
  return res.data;
};
