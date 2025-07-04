import React from 'react';
import dayjs from 'dayjs';
import { useTranslation } from "react-i18next";

export interface ScheduleEntry {
    id?: number;
    dayOfWeek: string;
    startTime?: string;
    endTime?: string;
    isHoliday?: boolean;
}

interface Props {
    data: ScheduleEntry[];
    onEdit: (entry: ScheduleEntry) => void;
    onDelete: (id: number) => void;
}

const formatTime = (time?: string) => {
    return time ? dayjs(`1970-01-01T${time}`).format('hh:mm A') : '';
};

const DoctorScheduleTable: React.FC<Props> = ({ data, onEdit, onDelete }) => {
    const { t } = useTranslation();

    const openEdit = (entry: ScheduleEntry) => {
        onEdit(entry);
    };

    return (
        <div className="space-y-6">
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full text-sm text-textDark">
                    <thead className="bg-tableHeader text-gray-600 uppercase text-xs">
                    <tr className="ltr:text-left rtl:text-right">
                        <th className="px-6 py-3">{t('day')}</th>
                        <th className="px-6 py-3">{t('startTime')}</th>
                        <th className="px-6 py-3">{t('endTime')}</th>
                        <th className="px-6 py-3">{t('actions')}</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                    {data.map((entry) => (
                        <tr key={entry.id ?? entry.dayOfWeek} className="hover:bg-tableHover ltr:text-left rtl:text-right">
                            <td className="px-6 py-4 font-medium">{entry.dayOfWeek}</td>
                            {entry.isHoliday ? (
                                <>
                                    <td className="px-6 py-4 text-gray-400 italic" colSpan={2}>
                                        {t('holiday')}
                                    </td>
                                    <td className="px-6 py-4"></td>
                                </>
                            ) : (
                                <>
                                    <td className="px-6 py-4">{formatTime(entry.startTime)}</td>
                                    <td className="px-6 py-4">{formatTime(entry.endTime)}</td>
                                    <td className="px-6 py-4 flex gap-2 rtl:space-x-reverse">
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
