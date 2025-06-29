import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/ContextsAuth';
import PatientProfilePage, { PatientInfo } from '../../components/Doctor/PatientProfilePage';
import { getPatientById } from '../../services/patientService';
import { getPatientDrugs } from '../../services/drugService';
import DoctorNavbar from '../../components/Doctor/DoctorNavbar';
import DoctorSidebar from '../../components/Doctor/DoctorSidebar';

const DoctorPatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user,accessToken } = useAuth();
  const [patient, setPatient] = useState<PatientInfo | null>(null);
  const [drugs, setDrugs] = useState<any[]>([]);
  const [section, setSection] = useState('patients');

  useEffect(() => {
    if (!id || !accessToken ||!user) return;
    getPatientById(user.id,id, accessToken)
      .then(setPatient)
      .catch((err) => console.error('Failed to load patient', err));
    getPatientDrugs(id, accessToken)
      .then(setDrugs)
      .catch((err) => console.error('Failed to load drugs', err));
  }, [id, accessToken]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <div className="w-full h-16">
        <DoctorNavbar selected={section} onSelect={setSection} />
      </div>
      <div className="flex flex-1">
        <DoctorSidebar selected={section} onSelect={setSection} />
        <PatientProfilePage patient={patient} drugs={drugs} />
      </div>
    </div>
  );
};

export default DoctorPatientPage;
