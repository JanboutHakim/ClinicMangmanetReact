import AppointmentBookingPage from '../pages/AppointmentBookingPage';
import allAppointments from '../data/appointments.json'; // or from API

export default function App() {
    return <AppointmentBookingPage allAppointments={allAppointments} />;
}
