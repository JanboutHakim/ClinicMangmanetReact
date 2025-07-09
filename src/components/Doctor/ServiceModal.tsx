import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ServiceEntry } from './DoctorServicesTable';

interface Props {
  options: string[];
  initialEntry?: ServiceEntry | null;
  onSubmit: (entry: ServiceEntry) => void;
  onClose: () => void;
}

const ServiceModal: React.FC<Props> = ({ options, initialEntry, onSubmit, onClose }) => {
  const { t } = useTranslation();
  const [service, setService] = useState('');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (initialEntry) {
      setService(initialEntry.service);
      setPrice(initialEntry.price);
    } else if (options.length > 0) {
      setService(options[0]);
    }
  }, [initialEntry, options]);

  const handleSubmit = () => {
    if (!service) return;
    const entry: ServiceEntry = {
      doctorId: initialEntry?.doctorId ?? 0,
      id: initialEntry?.id ?? 0,
      service,
      price,
    };
    onSubmit(entry);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          {initialEntry ? t('editService') : t('addService')}
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">{t('service')}</label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">{t('price')}</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
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

export default ServiceModal;
