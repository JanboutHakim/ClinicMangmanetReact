export const BASE_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
  doctors: '/doctors',
  doctorAppointments: (id: number | string) => `/doctors/${id}/appointments`,
};
