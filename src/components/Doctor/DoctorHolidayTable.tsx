import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import HolidayModal from './HolidayModal';

export interface HolidayEntry {
  id?: number;
  startTime?: string;
  endTime?: string;
}

interface Props {
  data: HolidayEntry[];
  onAddHoliday: (entry: HolidayEntry) => void;
  onUpdate: (entry: HolidayEntry) => void;
  onDelete: (id: number) => void;
}

const formatDateTime = (value?: string) =>
  value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '';

const DoctorHolidayTable: React.FC<Props> = ({ data, onAddHoliday, onUpdate, onDelete }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [editEntry, setEditEntry] = useState<HolidayEntry | null>(null);

  const openAdd = () => {
    setEditEntry(null);
    setShowModal(true);
  };

  const openEdit = (entry: HolidayEntry) => {
    setEditEntry(entry);
    setShowModal(true);
  };

  const handleSubmit = (entry: HolidayEntry) => {
    if (editEntry && editEntry.id) {
      onUpdate({ ...entry, id: editEntry.id });
    } else {
      onAddHoliday(entry);
    }
  };

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm text-left text-textDark">
          <thead className="bg-tableHeader text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">{t('startTime')}</th>
              <th className="px-6 py-3">{t('endTime')}</th>
              <th className="px-6 py-3">{t('actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((entry) => (
              <tr key={entry.id} className="hover:bg-tableHover">
                <td className="px-6 py-4 font-medium">{formatDateTime(entry.startTime)}</td>
                <td className="px-6 py-4">{formatDateTime(entry.endTime)}</td>
                <td className="px-6 py-4 space-x-2">
                  <button onClick={() => openEdit(entry)} className="text-blue-600 hover:underline">
                    {t('edit')}
                  </button>
                  {entry.id !== undefined && (
                    <button onClick={() => onDelete(entry.id!)} className="text-red-600 hover:underline">
                      {t('delete')}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded shadow text-sm" onClick={openAdd}>
          {t('AddHoliday')}
        </button>
      </div>
      {showModal && (
        <HolidayModal
          initialEntry={editEntry ?? undefined}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default DoctorHolidayTable;
