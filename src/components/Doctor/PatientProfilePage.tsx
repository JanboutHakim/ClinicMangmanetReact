import React from 'react';
import dayjs from 'dayjs';
import { SectionCard } from './SectionCard';
import { PatientHeader } from './PatientHeader';
import FileListCard from './FileListCard';
import colors from "tailwindcss/colors";
import {getColors} from "../../constants/theme";
import {useTheme} from "../../contexts/ThemeContext";

export interface AppointmentInfo {
  id: number;
  patientId: number;
  doctorId: number;
  startTime: string;
  endTime: string;
  reason: string | null;
  notes: string;
  status: string;
}

export interface PatientInfo {
  patientId: number;
  address: string | null;
  bloodType: string | null;
  weight: number;
  name: string;
  phoneNumber: string;
  dob: string | null;
  gender: string;
  appointments: AppointmentInfo[];
  imageUrl: string | null;
  drugs?: DrugInfo[];
}

export interface DrugInfo {
  id: number;
  drugName: string;
  frequency: number;
  dosage?: string | null;
}

interface Props {
  patient: PatientInfo | null;
  drugs?: DrugInfo[];
}

const PatientProfilePage: React.FC<Props> = ({ patient, drugs }) => {
  const {mode} = useTheme();
  const COLORS = getColors(mode);
  if (!patient) {
    return <main className="p-6">Loading...</main>;
  }

  const drugList = drugs ?? patient.drugs ?? [];

  return (
    <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
      <PatientHeader />
      <div className="flex flex-col lg:flex-row gap-6 min-h-[600px]">
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-6">
            <SectionCard className="min-h-[220px]">
              <div className="text-center md:text-left">
                {patient?.imageUrl ?(
                    <img
                    src={patient.imageUrl }
                    alt="Patient Photo"
                    className="w-24 h-24 rounded-full mx-auto md:mx-0 mb-4"/>
                ):(
              <div className="w-24 h-24 rounded-full bg-white text-blue-700 flex items-center justify-center font-bold border-2  text-2xl"
                style={{borderColor : COLORS.primary}}>
                {patient?.name.charAt(0).toUpperCase()}
              </div>
              )}
                <h2 className="text-lg font-semibold">{patient.name}</h2>
                <p className="text-sm text-gray-600 mt-2">{patient.phoneNumber}</p>
              </div>
            </SectionCard>
            <SectionCard title="General Information" className="min-h-[220px]">
              <div className="text-sm space-y-1">
                <p>
                  <strong>Date of Birth:</strong>{' '}
                  {patient.dob ? dayjs(patient.dob).format('DD.MM.YYYY') : 'N/A'}
                </p>
                <p>
                  <strong>Address:</strong> {patient.address || 'N/A'}
                </p>
              </div>
            </SectionCard>
          </div>
          <SectionCard>
            <div className="flex border-b mb-4 text-sm font-medium text-gray-500">
              <button className="border-b-2 border-blue-500 text-blue-600 px-4 py-2">
                Future visits ({patient.appointments.length})
              </button>
            </div>
            <div className="space-y-4 flex-1 overflow-y-auto">
              {patient.appointments.map((visit) => (
                <div
                  key={visit.id}
                  className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-blue-50"
                >
                  <div className="mb-2 sm:mb-0">
                    <p className="text-xs text-gray-500">
                      {dayjs(visit.startTime).format('HH:mm')}-
                      {dayjs(visit.endTime).format('HH:mm')}
                    </p>
                    <p className="text-lg font-semibold text-textDark">
                      {dayjs(visit.startTime).format('DD MMM YYYY')}
                    </p>
                  </div>
                  <div className="flex-1 sm:mx-4">
                    <p className="text-sm text-gray-600">
                      <strong>Service:</strong> {visit.reason || 'N/A'}
                    </p>
                  </div>
                  <span className="inline-block text-xs font-semibold text-green-700 bg-green-100 rounded-full px-3 py-1 mt-2 sm:mt-0">
                    {visit.status}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <SectionCard title="Anamnesis">
            <div className="text-sm space-y-1">
              <p>
                <strong>Blood type:</strong> {patient.bloodType || 'N/A'}
              </p>
              <p>
                <strong>Weight:</strong> {patient.weight || 'N/A'}
              </p>
            </div>
          </SectionCard>
          <SectionCard title="Drugs" actions={<button className="text-sm px-2 py-1 rounded bg-blue-600 text-white">+ Add Drug</button>}>
            {drugList.length === 0 ? (
                <p className="text-sm text-gray-500">No medications found.</p>
            ) : (
                <ul className="text-sm space-y-1">
                  {drugList.map((d) => (
                      <li key={d.id} className="flex justify-between">
                        <span>{d.drugName}</span>
                        <span className="text-gray-500">{d.frequency}/day</span>
                      </li>
                  ))}
                </ul>
            )}
          </SectionCard>
          <FileListCard header="Files" files={[]} actions={<button className="text-sm px-2 py-1 rounded bg-blue-600 text-white">+ Add File</button>} />

        </div>
      </div>
    </main>
  );
};

export default PatientProfilePage;
