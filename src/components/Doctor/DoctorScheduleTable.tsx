import React, { useState } from 'react';
import dayjs from 'dayjs';
import {useTranslation} from "react-i18next";

export interface ScheduleEntry {
    id?: number;
    dayOfWeek: string;
    startTime?: string;
    endTime?: string;
    isHoliday?: boolean;
}

interface Props {
    data: ScheduleEntry[];
    onAddHoliday: (entry: ScheduleEntry) => void;
    onDelete: (id: number) => void;
    onUpdate: (entry: ScheduleEntry) => void;
}

const formatTime = (time?: string) => {
    return time ? dayjs(`1970-01-01T${time}`).format('hh:mm A') : '';
};

const DoctorScheduleTable: React.FC<Props> = ({ data, onAddHoliday, onDelete, onUpdate }) => {
    const [showModal, setShowModal] = useState(false);
    const [editEntry, setEditEntry] = useState<ScheduleEntry | null>(null);
    const [dayOfWeek, setDayOfWeek] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const {t} =useTranslation();

    const handleSubmit = () => {
        if (!dayOfWeek) return;
        const entry: ScheduleEntry = { id: editEntry?.id, dayOfWeek, startTime, endTime };
        if (editEntry) {
            onUpdate(entry);
        } else {
            onAddHoliday(entry);
        }
        setShowModal(false);
        setDayOfWeek('');
        setStartTime('');
        setEndTime('');
        setEditEntry(null);
    };

    const openEdit = (entry: ScheduleEntry) => {
        setEditEntry(entry);
        setDayOfWeek(entry.dayOfWeek);
        setStartTime(entry.startTime ? entry.startTime.slice(0,5) : '');
        setEndTime(entry.endTime ? entry.endTime.slice(0,5) : '');
        setShowModal(true);
    };

    return (
        <div className="space-y-6">
            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full text-sm text-left text-textDark">
                    <thead className="bg-tableHeader text-gray-600 uppercase text-xs">
                    <tr>
                        <th className="px-6 py-3">Day</th>
                        <th className="px-6 py-3">Start Time</th>
                        <th className="px-6 py-3">End Time</th>
                        <th className="px-6 py-3">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                    {data.map((entry) => (
                        <tr key={entry.id ?? entry.dayOfWeek} className="hover:bg-tableHover">
                            <td className="px-6 py-4 font-medium">{entry.dayOfWeek}</td>
                            {entry.isHoliday ? (
                                <>
                                    <td className="px-6 py-4 text-gray-400 italic" colSpan={2}>
                                        Holiday
                                    </td>
                                    <td className="px-6 py-4"></td>
                                </>
                            ) : (
                                <>
                                    <td className="px-6 py-4">{formatTime(entry.startTime)}</td>
                                    <td className="px-6 py-4">{formatTime(entry.endTime)}</td>
                                    <td className="px-6 py-4 space-x-2">
                                        <button
                                            onClick={() => openEdit(entry)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            {t('edit')}
                                        </button>
                                        {entry.id !== undefined && (
                                            <button
                                                onClick={() => onDelete(entry.id!)}
                                                className="text-red-600 hover:underline"
                                            >
                                                {t('delete')}
                                            </button>
                                        )}
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow text-sm"
                        onClick={() => setShowModal(true)}
                >
                    {t("AddSchedule")}
                </button>
                <button
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded shadow text-sm">
                    {t("AddHoliday")}
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                        <h2 className="text-lg font-semibold mb-4">
                            {editEntry ? t('editSchedule') : t('addSchedule')}
                        </h2>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">{t('day')}</label>
                            <select
                                value={dayOfWeek}
                                onChange={(e) => setDayOfWeek(e.target.value)}
                                className="w-full border px-3 py-2 rounded"
                            >
                                <option value="">{t("select")}</option>
                                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(
                                    (day) => (
                                        <option key={day} value={day.toUpperCase()}>
                                            {day}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">{t("startTime")}</label>
                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">{t("endTime")}</label>
                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                {t("cancel")}
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                {editEntry ? t('update') : t('add')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorScheduleTable;
