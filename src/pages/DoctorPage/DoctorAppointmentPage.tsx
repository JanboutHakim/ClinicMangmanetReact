import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import DoctorNavbar from '../../components/Doctor/DoctorNavbar';
import DoctorSidebar from '../../components/Doctor/DoctorSidebar';
import { PatientHeader } from '../../components/Doctor/PatientHeader';
import { SectionCard } from '../../components/Doctor/SectionCard';
import { useAuth } from '../../contexts/ContextsAuth';
import { getPatientById } from '../../services/patientService';
import { getPatientDrugs } from '../../services/drugService';
import { PatientInfo, DrugInfo, AppointmentInfo } from '../../components/Doctor/PatientProfilePage';

interface LocationState { appointment: AppointmentInfo; }

const DoctorAppointmentPage: React.FC = () => {
  const { state } = useLocation() as { state?: LocationState };
  const appointment = state?.appointment;
  const { accessToken } = useAuth();
  const [patient, setPatient] = useState<PatientInfo | null>(null);
  const [drugs, setDrugs] = useState<DrugInfo[]>([]);
  const [section, setSection] = useState('appointments');

  useEffect(() => {
    if (!appointment || !accessToken) return;
    getPatientById(appointment.patientId, accessToken)
      .then(setPatient)
      .catch((err) => console.error('Patient fetch error', err));
    getPatientDrugs(appointment.patientId, accessToken)
      .then(setDrugs)
      .catch((err) => console.error('Drug fetch error', err));
  }, [appointment, accessToken]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <div className="w-full h-16">
        <DoctorNavbar selected={section} onSelect={setSection} />
      </div>
      <div className="flex flex-1">
        <DoctorSidebar selected={section} onSelect={setSection} />
        <main className="flex-1 p-6 bg-gray-50">
          <PatientHeader title="Appointment Page" onAddAppointment={() => {}} />
          {appointment && patient ? (
            <SectionCard>
              <div className="space-y-2 text-sm">
                <p><strong>Patient:</strong> {patient.name}</p>
                <p><strong>Date:</strong> {dayjs(appointment.startTime).format('YYYY-MM-DD')}</p>
                <p><strong>Time:</strong> {dayjs(appointment.startTime).format('HH:mm')}</p>
                <p><strong>Status:</strong> {appointment.status}</p>
              </div>
            </SectionCard>
          ) : (
            <p>Loading...</p>
          )}
          <SectionCard title="Drugs">
            {drugs.length === 0 ? (
              <p className="text-sm text-gray-500">No medications found.</p>
            ) : (
              <ul className="text-sm space-y-1">
                {drugs.map((d) => (
                  <li key={d.id} className="flex justify-between">
                    <span>{d.drugName}</span>
                    <span className="text-gray-500">{d.frequency}/day</span>
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>
        </main>
      </div>
    </div>
  );
};

export default DoctorAppointmentPage;
