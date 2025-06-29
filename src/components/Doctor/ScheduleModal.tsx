import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScheduleEntry } from './DoctorScheduleTable';

interface Props {
  initialEntry?: ScheduleEntry | null;
  onSubmit: (entry: ScheduleEntry) => void;
  onClose: () => void;
}

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const ScheduleModal: React.FC<Props> = ({ initialEntry, onSubmit, onClose }) => {
  const { t } = useTranslation();
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    if (initialEntry) {
      setDayOfWeek(initialEntry.dayOfWeek);
      setStartTime(initialEntry.startTime ? initialEntry.startTime.slice(0, 5) : '');
      setEndTime(initialEntry.endTime ? initialEntry.endTime.slice(0, 5) : '');
    } else {
      setDayOfWeek('');
      setStartTime('');
      setEndTime('');
    }
  }, [initialEntry]);

  const handleSubmit = () => {
    if (!dayOfWeek) return;
    const entry: ScheduleEntry = {
      id: initialEntry?.id,
      dayOfWeek,
      startTime,
      endTime,
      isHoliday: initialEntry?.isHoliday,
    };
    onSubmit(entry);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          {initialEntry ? t('editSchedule') : t('addSchedule')}
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">{t('day')}</label>
          <select
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">{t('select')}</option>
            {weekdays.map((day) => (
              <option key={day} value={day.toUpperCase()}>
                {day}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">{t('startTime')}</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">{t('endTime')}</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            {t('cancel')}
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            {initialEntry ? t('update') : t('add')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;
