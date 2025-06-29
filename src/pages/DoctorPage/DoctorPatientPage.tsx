import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/ContextsAuth';
import PatientProfilePage, { PatientInfo } from '../../components/Doctor/PatientProfilePage';
import { getPatientById } from '../../services/patientService';
import DoctorNavbar from '../../components/Doctor/DoctorNavbar';
import DoctorSidebar from '../../components/Doctor/DoctorSidebar';

const DoctorPatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user,accessToken } = useAuth();
  const [patient, setPatient] = useState<PatientInfo | null>(null);
  const [section, setSection] = useState('patients');

  useEffect(() => {
    if (!id || !accessToken || !user) return;
    getPatientById(user.id, id, accessToken)
      .then((data) => {
        setPatient(data);
      })
      .catch((err) => console.error('Failed to load patient', err));
  }, [id, accessToken]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <div className="w-full h-16">
        <DoctorNavbar selected={section} onSelect={setSection} />
      </div>
      <div className="flex flex-1">
        <PatientProfilePage patient={patient} />
      </div>
    </div>
  );
};

export default DoctorPatientPage;
