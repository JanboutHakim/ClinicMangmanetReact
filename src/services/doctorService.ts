import api from './api';
import { API_ENDPOINTS } from '../constants/apiConfig';
import {ScheduleEntry} from "../components/Doctor/DoctorScheduleTable";
import {HolidayEntry} from "../components/Doctor/DoctorHolidayTable";

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

export const getDoctorSchedules = async (id: number | string, token?: string) => {
  const res= await api.get(API_ENDPOINTS.doctorSchedules(id), { headers: { Authorization: `Bearer ${token}` } } );
};

export const handleAddSchedules = async (
    id: number | string,
    schedule: ScheduleEntry,
    token?: string
) => {
  await api.post(API_ENDPOINTS.doctorSchedules(id), schedule, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
};

export const updateSchedule = async (
    doctorId: number | string,
    scheduleId: number | string,
    schedule: ScheduleEntry,
    token?: string
) => {
  await api.put(`${API_ENDPOINTS.doctorSchedules(doctorId)}/${scheduleId}`, schedule, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
};

export const deleteSchedule = async (
    doctorId: number | string,
    scheduleId: number | string,
    token?: string
) => {
  await api.delete(`${API_ENDPOINTS.doctorSchedules(doctorId)}/${scheduleId}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
};
export const handleAddHoliday = async (
    id: number | string,
    schedule: HolidayEntry,
    token?: string
) => {
  await api.post(API_ENDPOINTS.holidaySchedule(id), schedule, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
};

export const updateHoliday = async (
    doctorId: number | string,
    scheduleId: number | string,
    schedule: HolidayEntry,
    token?: string
) => {
  await api.put(`${API_ENDPOINTS.holidaySchedule(doctorId)}/${scheduleId}`, schedule, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
};

export const deleteHoliday = async (
    doctorId: number | string,
    holidayId: number | string,
    token?: string
) => {
  await api.delete(`${API_ENDPOINTS.holidaySchedule(doctorId)}/${holidayId}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
};