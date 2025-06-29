import React from 'react';
import { SectionCard } from './SectionCard';
import { PatientHeader } from './PatientHeader';
import FileListCard from "./FileListCard";

const PatientProfilePage: React.FC = () => (
    <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <PatientHeader />

        <div className="flex flex-col lg:flex-row gap-6 min-h-[600px]">
            {/* Left Column */}
            <div className="w-full lg:w-2/3 flex flex-col gap-6">
                <div className="flex flex-col md:flex-row gap-6">
                    <SectionCard className="min-h-[220px]">
                        <div className="text-center md:text-left">
                            <img
                                src="/assets/pic.jpg"
                                alt="Patient Photo"
                                className="w-24 h-24 rounded-full mx-auto md:mx-0 mb-4"
                            />
                            <h2 className="text-lg font-semibold">Kate Prokopchuk</h2>
                            <p className="text-sm text-gray-600 mt-2">+38 (083) 23 45 678</p>
                            <p className="text-sm text-gray-600">katepro@gmail.com</p>
                        </div>
                    </SectionCard>

                    <SectionCard title="General Information" className="min-h-[220px]">
                        <div className="text-sm space-y-1">
                            <p><strong>Date of Birth:</strong> 23.07.1994</p>
                            <p><strong>Address:</strong> Lviv, Chornovola street, 67</p>
                            <p><strong>Registration Date:</strong> Thursday, May 25</p>
                        </div>
                    </SectionCard>
                </div>

                <SectionCard>
                    <div className="flex border-b mb-4 text-sm font-medium text-gray-500">
                        <button className="border-b-2 border-blue-500 text-blue-600 px-4 py-2">Future visits (2)</button>
                        <button className="px-4 py-2 hover:text-blue-600">Past visits (15)</button>
                        <button className="px-4 py-2 hover:text-blue-600">Planned treatments</button>
                    </div>

                    <div className="space-y-4 flex-1 overflow-y-auto">
                        {[{
                            time: "11:00-12:30",
                            date: "26 Jun 2023",
                            service: "Treatment and cleaning of canals",
                            doctor: "Oksana Ma...",
                        }, {
                            time: "11:00-12:30",
                            date: "27 Jul 2023",
                            service: "Teeth whitening",
                            doctor: "Max Och...",
                        }].map((visit, idx) => (
                            <div key={idx} className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-blue-50">
                                <div className="mb-2 sm:mb-0">
                                    <p className="text-xs text-gray-500">{visit.time}</p>
                                    <p className="text-lg font-semibold text-textDark">{visit.date}</p>
                                </div>
                                <div className="flex-1 sm:mx-4">
                                    <p className="text-sm text-gray-600"><strong>Service:</strong> {visit.service}</p>
                                    <p className="text-sm text-gray-600"><strong>Doctor:</strong> {visit.doctor}</p>
                                </div>
                                <span className="inline-block text-xs font-semibold text-green-700 bg-green-100 rounded-full px-3 py-1 mt-2 sm:mt-0">Scheduled</span>
                            </div>
                        ))}
                    </div>
                </SectionCard>
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-1/3 flex flex-col gap-6">
                <SectionCard title="Anamnesis">
                    <div className="text-sm space-y-1">
                        <p><strong>Allergies:</strong> Nuts, pollen</p>
                        <p><strong>Chronic diseases:</strong> Asthma</p>
                        <p><strong>Blood type:</strong> H</p>
                        <p><strong>Past illnesses:</strong> Corona virus</p>
                    </div>
                </SectionCard>

                <FileListCard
                    header="Files"
                    files={[
                        { name: "Check Up Result.pdf", size: "123kb", url: "#" },
                        { name: "Medical Prescriptions.pdf", size: "123kb", url: "#" },
                        { name: "Check Up Result.pdf", size: "123kb", url: "#" },
                    ]}
                />

                <FileListCard
                    header="Notes"
                    files={[
                        { name: "Note 31.06.23.pdf", size: "123kb", url: "#" },
                        { name: "Note 23.06.23.pdf", size: "123kb", url: "#" },
                    ]}
                />
            </div>
        </div>
    </main>
);

export default PatientProfilePage;
