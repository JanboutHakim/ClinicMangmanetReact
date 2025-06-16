export const BASE_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
  doctors: '/doctors',
  doctorAppointments: (id: number | string) => `/doctors/${id}/appointments`,
  doctor: (id: number | string) => `/doctors/${id}`,
  availableSlots: (id: number | string) => `/appointments/doctor/${id}/available-slots`,
  patientAppointments: (
    id: number | string,
    patientId: number | string,
  ) => `/appointments/${id}/patient/${patientId}/appointments`,
};
