import api from './api';
import { API_ENDPOINTS } from '../constants/apiConfig';

export const getAppointmentsByPatient = async (id: number | string, token: string) => {
  const res = await api.get(API_ENDPOINTS.appointmentByPatient(id), { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};

export const getAppointmentsByDoctor = async (id: number | string, token: string) => {
  const res = await api.get(API_ENDPOINTS.appointmentsByDoctor(id), { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};

export interface BookAppointmentPayload {
  patientId: number | string;
  doctorId: number | string;
  startTime: string;
  reason: string;
  notes?: string | null;
  cancellationReason?: string | null;
}

export const bookAppointment = async (userId: number | string, payload: BookAppointmentPayload, token: string) => {
  const res = await api.post(API_ENDPOINTS.bookAppointment(userId), payload, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};

export const cancelAppointment = async (userId: number | string, appointmentId: number | string, name: string, token: string) => {
  const res = await api.put(`/appointments/${userId}/${appointmentId}/cancel-by-patient`, { name }, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};

export const confirmAppointment = async (doctorId: number | string, appointmentId: number | string, token: string) => {
  const res = await api.put(`/appointments/${doctorId}/confirm/${appointmentId}`, null, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};

export const rescheduleAppointment = async (
  userId: number | string,
  appointmentId: number | string,
  payload: BookAppointmentPayload,
  token: string
) => {
  const res = await api.put(`/appointments/${userId}/reschedule/${appointmentId}`, payload, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};
