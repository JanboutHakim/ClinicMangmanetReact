import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/ContextsAuth';
import PatientProfilePage, { PatientInfo } from '../../components/Doctor/PatientProfilePage';
import { getPatientById } from '../../services/patientService';

const DoctorPatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { accessToken } = useAuth();
  const [patient, setPatient] = useState<PatientInfo | null>(null);

  useEffect(() => {
    if (!id || !accessToken) return;
    getPatientById(id, accessToken)
      .then(setPatient)
      .catch((err) => console.error('Failed to load patient', err));
  }, [id, accessToken]);

  return <PatientProfilePage patient={patient} />;
};

export default DoctorPatientPage;
