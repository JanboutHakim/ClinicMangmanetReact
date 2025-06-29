import React, { useState } from 'react';
import dayjs from 'dayjs';
import {useTranslation} from "react-i18next";

export interface HolidayEntry {
    id?: number;
    startTime?: string;
    endTime?: string;
}

interface Props {
    data: HolidayEntry[];
    onAddHoliday: (entry: HolidayEntry) => void;
    onDelete: (id: number) => void;
    onUpdate: (entry: HolidayEntry) => void;
}

const formatTime = (time?: string) => {
    return time ? dayjs(`1970-01-01T${time}`).format('hh:mm A') : '';
};

const DoctorScheduleTable: React.FC<Props> = ({ data, onAddHoliday, onDelete, onUpdate }) => {
    const [editEntry, setEditEntry] = useState<HolidayEntry | null>(null);
    const [dayOfWeek, setDayOfWeek] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const {t} =useTranslation();

    const handleSubmit = () => {
        if (!dayOfWeek) return;
        const entry: HolidayEntry = { id: editEntry?.id, startTime, endTime };
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

    const openEdit = (entry: HolidayEntry) => {
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




        </div>
    );
};

export default DoctorScheduleTable;
