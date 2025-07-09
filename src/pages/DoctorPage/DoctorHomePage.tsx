import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import DoctorNavbar from '../../components/Doctor/DoctorNavbar';

import { useAuth } from '../../contexts/ContextsAuth';
import AppointmentTable, { Appointment } from '../../components/Doctor/DoctorAppointments';
import AppointmentFilterBar from "../../components/Doctor/AppointmentFilterBar";
import DoctorPatientTable, {Patient} from "../../components/Doctor/DoctorPatientTable";
import {confirmAppointment, getAppointmentsByDoctor} from "../../services/appointmentService";
import {API_ENDPOINTS} from "../../constants/apiConfig";
import api from "../../services/api";
import DoctorSidebar from "../../components/Doctor/DoctorSidebar";
import DoctorScheduleTable, {ScheduleEntry} from "../../components/Doctor/DoctorScheduleTable";
import ScheduleModal from "../../components/Doctor/ScheduleModal";
import DoctorServicesTable, { ServiceEntry } from "../../components/Doctor/DoctorServicesTable";
import ServiceModal from "../../components/Doctor/ServiceModal";
import {
    handleAddSchedules,
    updateSchedule,
    deleteSchedule,
    handleAddHoliday as addHolidayApi,
    updateHoliday,
    deleteHoliday,
    getServiceOptions,
    getDoctorServices,
    addDoctorService,
    updateDoctorService,
    deleteDoctorService,
} from "../../services/doctorService";
import DoctorHolidayTable, {HolidayEntry} from "../../components/Doctor/DoctorHolidayTable";
import HolidayModal from "../../components/Doctor/HolidayModal";
import Button from "../../components/Button";
import {useTheme} from "../../contexts/ThemeContext";
import {getColors} from "../../constants/theme";

const DoctorDashboard: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [section, setSection] = useState('appointments');
    const { user, accessToken,refreshToken } = useAuth();
    console.log(refreshToken)
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [todayAppointments,setTodayAppointments] = useState<Appointment[]>([]);
    const [patients,setPatients] = useState<Patient[]>([]);
    const [schedules,setSchedules] = useState<ScheduleEntry[]>([]);
    const [holiday,setHoliday] = useState<HolidayEntry[]>([]);
    const [servicesList, setServicesList] = useState<ServiceEntry[]>([]);
    const [serviceOptions, setServiceOptions] = useState<string[]>([]);
    const [statusFilter, setStatusFilter] = useState('');
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [cancelReason, setCancelReason] = useState('');
    const [selectedApptId, setSelectedApptId] = useState<number | null>(null);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [showHolidayModal, setshowHolidayModal] = useState(false);
    const [editEntry, setEditEntry] = useState<ScheduleEntry | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showServiceModal, setShowServiceModal] = useState(false);
    const [editService, setEditService] = useState<ServiceEntry | null>(null);
    const {mode} = useTheme();
    const COLORS = getColors(mode);


    useEffect(() => {
        if (!user) return;
        getAppointmentsByDoctor(user.id, accessToken!)
            .then(setAppointments)
            .catch((err) => console.error('Appointments fetch error:', err));
    }, [user, accessToken]);

    useEffect(() => {
        if (!user) return;
        api
            .get(API_ENDPOINTS.todayAppointmentsByDoctor(user.id), {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((res) => setTodayAppointments(res.data))
            .catch((err) => console.error('Today visits fetch error:', err));
    }, [user, accessToken]);

    useEffect(() => {
        if (!user) return;
        api
            .get(API_ENDPOINTS.doctorPatients(user.id), {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((res) => setPatients(res.data))
            .catch((err) => console.error('Today visits fetch error:', err));
    }, [user, accessToken]);

    useEffect(() => {
        if (!user) return;
        api
            .get(API_ENDPOINTS.doctorSchedules(user.id), {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((res) => setSchedules(res.data))
            .catch((err) => console.error('Schedule fetch error:', err));
    }, [user, accessToken]);
    useEffect(() => {
        if (!user) return;
        api
            .get(API_ENDPOINTS.holidaySchedule(user.id), {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((res) => setHoliday(res.data))
            .catch((err) => console.error('Holiday fetch error:', err));
    }, [user, accessToken]);

    useEffect(() => {
        if (!user) return;
        getServiceOptions(accessToken)
            .then(setServiceOptions)
            .catch((err) => console.error('Service options fetch error:', err));
        getDoctorServices(user.id, accessToken)
            .then(setServicesList)
            .catch((err) => console.error('Doctor services fetch error:', err));
    }, [user, accessToken]);

    const handleAddSchedule = async (newSchedule: ScheduleEntry) => {
        if (!user || !accessToken) return;

        const formattedSchedule: ScheduleEntry = {
            ...newSchedule,
            startTime: newSchedule.startTime ? `${newSchedule.startTime}:00` : undefined,
            endTime: newSchedule.endTime ? `${newSchedule.endTime}:00` : undefined,
        };

        try {
            await handleAddSchedules(user.id, formattedSchedule, accessToken);
            setSchedules((prev) => [...prev, formattedSchedule]);
        } catch (err) {
            console.error("❌ Failed to add schedule:", err);
        }
    };

    const handleUpdateSchedule = async (updated: ScheduleEntry) => {
        if (!user || !accessToken || !updated.id) return;

        const formatted: ScheduleEntry = {
            ...updated,
            startTime: updated.startTime ? `${updated.startTime}:00` : undefined,
            endTime: updated.endTime ? `${updated.endTime}:00` : undefined,
        };

        try {
            await updateSchedule(user.id, updated.id, formatted, accessToken);
            setSchedules((prev) => prev.map((s) => (s.id === updated.id ? { ...s, ...formatted } : s)));
        } catch (err) {
            console.error('❌ Failed to update schedule:', err);
        }
    };

    const handleDeleteSchedule = async (scheduleId: number) => {
        if (!user || !accessToken) return;
        try {
            await deleteSchedule(user.id, scheduleId, accessToken);
            setSchedules((prev) => prev.filter((s) => s.id !== scheduleId));
        } catch (err) {
            console.error('❌ Failed to delete schedule:', err);
        }
    };

    const handleAddHoliday = async (entry: HolidayEntry) => {
        if (!user || !accessToken) return;
        const formattedSchedule: HolidayEntry = {
            ...entry,
            startTime: entry.startTime ? `${entry.startTime}:00` : undefined,
            endTime: entry.endTime ? `${entry.endTime}:00` : undefined,
        };
        try {
            await addHolidayApi(user.id, formattedSchedule, accessToken);
            setHoliday((prev) => [...prev, entry]);
        } catch (err) {
            console.error('❌ Failed to add holiday:', err);
        }
    };

    const handleUpdateHoliday = async (entry: HolidayEntry) => {
        if (!user || !accessToken || !entry.id) return;
        const formattedSchedule: HolidayEntry = {
            ...entry,
            startTime: entry.startTime ? `${entry.startTime}:00` : undefined,
            endTime: entry.endTime ? `${entry.endTime}:00` : undefined,
        };
        try {
            await updateHoliday(user.id, entry.id, formattedSchedule, accessToken);
            setHoliday((prev) => prev.map((h) => (h.id === entry.id ? { ...h, ...entry } : h)));
        } catch (err) {
            console.error('❌ Failed to update holiday:', err);
        }
    };

    const handleDeleteHoliday = async (holidayId: number) => {
        if (!user || !accessToken) return;
        try {
            await deleteHoliday(user.id, holidayId, accessToken);
            setHoliday((prev) => prev.filter((h) => h.id !== holidayId));
        } catch (err) {
            console.error('❌ Failed to delete holiday:', err);
        }
    };

    const openAddService = () => {
        setEditService(null);
        setShowServiceModal(true);
    };

    const openEditService = (entry: ServiceEntry) => {
        setEditService(entry);
        setShowServiceModal(true);
    };

    const handleServiceSubmit = async (entry: ServiceEntry) => {
        if (!user || !accessToken) return;
        if (editService && editService.id) {
            try {
                await updateDoctorService(user.id, { ...entry, id: editService.id, doctorId: user.id }, accessToken);
                setServicesList((prev) => prev.map((s) => (s.id === editService.id ? { ...s, services: entry.services } : s)));
            } catch (err) {
                console.error('❌ Failed to update service:', err);
            }
        } else {
            try {
                await addDoctorService(user.id, { ...entry, doctorId: user.id }, accessToken);
                setServicesList((prev) => [...prev, { ...entry, doctorId: user.id }]);
            } catch (err) {
                console.error('❌ Failed to add service:', err);
            }
        }
    };

    const handleDeleteService = async (serviceId: number) => {
        if (!user || !accessToken) return;
        try {
            await deleteDoctorService(user.id, serviceId, accessToken);
            setServicesList((prev) => prev.filter((s) => s.id !== serviceId));
        } catch (err) {
            console.error('❌ Failed to delete service:', err);
        }
    };

    const openAddSchedule = () => {
        setEditEntry(holiday ? { dayOfWeek: '', isHoliday: true } as ScheduleEntry : null);
        setShowScheduleModal(true);
    };

    const openEditSchedule = (entry: ScheduleEntry) => {
        setEditEntry(entry);
        setShowScheduleModal(true);
    };

    const handleScheduleSubmit = (entry: ScheduleEntry) => {
        if (editEntry && editEntry.id) {
            handleUpdateSchedule({ ...entry, id: editEntry.id });
        } else {
            handleAddSchedule({ ...entry, isHoliday: editEntry?.isHoliday });
        }
    };

    const handleConformation = async (appointmentId: number) => {
        if (!user || !accessToken) return;
        try {
            const updated = await confirmAppointment(user.id, appointmentId, accessToken!);
            setAppointments((prev) =>
                prev.map((appt) => (appt.id === updated.id ? updated : appt))
            );
        } catch (error) {
            console.error('❌ Failed to confirm:', error);
        }
    };

    const handleCancelClick = (appointmentId: number) => {
        setSelectedApptId(appointmentId);
        setCancelReason('');
        setShowCancelModal(true);
    };

    const handleConfirmCancel = async () => {
        if (!user || !accessToken || !selectedApptId || !cancelReason.trim()) return;

        try {
            const response = await api.put(
                `/appointments/${user.id}/${selectedApptId}/cancel-by-doctor`,
                { name: cancelReason },
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );

            const updated = response.data;
            setAppointments((prev) =>
                prev.map((appt) => (appt.id === updated.id ? updated : appt))
            );
            setShowCancelModal(false);
        } catch (error) {
            console.error('❌ Cancel failed:', error);
        }
    };

    const handleCheckIn = (appointmentId: number) => {
        setAppointments((prev) =>
            prev.map((a) => (a.id === appointmentId ? { ...a, status: 'CHECKED_IN' } : a))
        );
    };

    const handleNoShow = (appointmentId: number) => {
        setAppointments((prev) =>
            prev.map((a) => (a.id === appointmentId ? { ...a, status: 'NO_SHOW' } : a))
        );
    };

    const handleFilterChange = async (filters: {
        q: string;
        statuses: string[];
        start?: string;
        end?: string;
    }) => {
        if (!user || !accessToken) return;

        const params = new URLSearchParams();
        params.append('q', filters.q || '');
        filters.statuses.forEach((s) => params.append('statuses', s));
        if (filters.start) params.append('start', filters.start);
        if (filters.end) params.append('end', filters.end);

        try {
            const res = await api.get(`/appointments/${user.id}/search?${params.toString()}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setAppointments(res.data);
        } catch (err) {
            console.error('❌ Filtered fetch error:', err);
        }
    };

    const openAdd = () => {
        setEditEntry(null);
        setShowModal(true);
    };


    const renderSection = () => {
        switch (section) {
            case 'appointments':
                return (
                    <>
                        <h1 className="text-2xl font-bold mb-4">{t('appointments')}</h1>
                        <AppointmentFilterBar  onFilterChange={handleFilterChange} />
                        <AppointmentTable data={appointments}
                                          onConfirm={handleConformation}
                                          onCancel={handleCancelClick}
                                          onCheckIn={handleCheckIn}
                                          onNoShow={handleNoShow}
                                          onRowClick={(a) => navigate(`/doctor-home/appointment/${a.id}`, { state: { appointment: a } })}
                        />
                    </>
                );
            case 'patients':
                return (<>
                    <h1 className="text-2xl font-bold">{t('patients')}</h1>
                    <AppointmentFilterBar  onFilterChange={handleFilterChange} />
                    <DoctorPatientTable data={patients}/>
                </>);
            case 'today':
                return (
                    <>
                        <h1 className="text-2xl font-bold mb-4">{t('appointments')}</h1>
                        <AppointmentFilterBar  onFilterChange={handleFilterChange} />
                        <AppointmentTable data={todayAppointments}
                                          onConfirm={handleConformation}
                                          onCancel={handleCancelClick}
                                          onCheckIn={handleCheckIn}
                                          onNoShow={handleNoShow}
                                          onRowClick={(a) => navigate(`/doctor-home/appointment/${a.id}`, { state: { appointment: a } })}
                        />
                    </>
                );
            case 'services':
                return (
                    <>
                        <h1 className="text-2xl font-bold mb-4">{t('servicesTab')}</h1>
                        <DoctorServicesTable
                            data={servicesList}
                            onEdit={openEditService}
                            onDelete={handleDeleteService}
                        />
                        <div className="p-12"></div>
                        <div className="fixed bottom-6 ltr:right-6 rtl:left-6 z-50">
                            <Button color="blue" onClick={openAddService}>
                                {t('addService')}
                            </Button>
                        </div>

                        {showServiceModal && (
                            <ServiceModal
                                options={serviceOptions}
                                initialEntry={editService ?? undefined}
                                onSubmit={handleServiceSubmit}
                                onClose={() => setShowServiceModal(false)}
                            />
                        )}
                    </>
                );
            case 'schedules'  :
                return (<>
                    <h1 className="text-2xl font-bold mb-4">{t('schedules')}</h1>
                    <DoctorScheduleTable
                        data={schedules}
                        onEdit={openEditSchedule}
                        onDelete={handleDeleteSchedule}
                    />
                    <h1 className="text-2xl font-bold mb-4 pt-6">{t('holidays')}</h1>
                    <DoctorHolidayTable
                        data={holiday}
                        onAddHoliday={handleAddHoliday}
                        onUpdate={handleUpdateHoliday}
                        onDelete={handleDeleteHoliday}
                    />
                    <div className="p-12"></div>
                    <div className="fixed bottom-6 ltr:right-6 rtl:left-6 z-50 flex gap-4">
                        <Button color="red" onClick={openAdd}>
                            {t('AddHoliday')}
                        </Button>

                        <Button color="blue" onClick={openAddSchedule}>
                            {t('AddSchedule')}
                        </Button>
                    </div>



                    {showModal && (
                        <HolidayModal
                            initialEntry={editEntry ?? undefined}
                            onSubmit={handleAddHoliday}
                            onClose={() => setShowModal(false)}
                        />
                    )}

                    {showScheduleModal && (
                        <ScheduleModal
                            initialEntry={editEntry ?? undefined}
                            onSubmit={handleScheduleSubmit}
                            onClose={() => setShowScheduleModal(false)}
                        />
                    )}

                </>);
            default:
                return <h1 className="text-2xl font-bold">{t('overview')}</h1>;
        }
    };

    return (<>
        <div className="min-h-screen flex flex-col bg-gray-50 font-sans"
        style={{backgroundColor:COLORS.background}}>
            {/* Top Navbar */}
            <div className="w-full h-16">
                <DoctorNavbar selected={section} onSelect={setSection} />
            </div>

            {/* Sidebar + Content below navbar */}
            <div className="flex flex-1" > {/* 4rem = 64px = h-16 */}
                <DoctorSidebar selected={section} onSelect={setSection} />
                <main className="flex-1 p-6">{renderSection()}</main>
            </div>
        </div>
    {showCancelModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">{t('cancelAppointment')}</h2>
                <textarea
                    placeholder={t('enterReason')}
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded mb-4"
                    rows={4}
                />
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => setShowCancelModal(false)}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        {t('close')}
                    </button>
                    <button
                        onClick={handleConfirmCancel}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        {t('confirm')}
                    </button>
                </div>
            </div>
        </div>
    )}

</>
);
};

export default DoctorDashboard;
