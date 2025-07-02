export const BASE_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
  doctors: '/doctors',
  patients: '/patients',
  drugs:'/drugs',
  appointments: '/appointments',
  doctorAppointments: (id: number | string) => `/doctors/${id}/appointments`,
  doctor: (id: number | string) => `/appointments/doctor-information/${id}`,
  availableSlots: (id: number | string) => `/appointments/doctor/${id}/available-slots`,
  patientAppointments: (
    id: number | string,
    patientId: number | string,
  ) => `/appointments/${id}/patient/${patientId}/appointments`,
  bookAppointment: (userId: number | string) => `/appointments/${userId}`,
  appointmentsByDoctor: (id: number | string) => `/appointments/doctor/${id}`,
  appointmentByPatient: (id: number | string) => `/appointments/patient/${id}`,
  todayAppointmentsByDoctor: (id: number | string) => `/appointments/doctor/${id}/today-visits`,
  doctorPatients: (id: number | string) => `/appointments/doctor/${id}/patients`,
  doctorSchedules: (id: number | string) => `/doctors/${id}/schedules`,
  doctorHoliday:(id: number | string) => `/doctors/${id}/holiday-schedules`,
  patient: (id:number | string,patientId:number |String) => `/appointments/doctor/${id}/patients/${patientId}`,
  holidaySchedule: (id: number | string) => `/doctors/${id}/holiday-schedules`,
};
