import React from 'react';
import { useTranslation } from 'react-i18next';

export interface ServiceEntry {
  doctorId: number;
  id: number;
  service: string;
  price: number;
}

interface Props {
  data: ServiceEntry[];
  onEdit: (entry: ServiceEntry) => void;
  onDelete: (id: number) => void;
}

const DoctorServicesTable: React.FC<Props> = ({ data, onEdit, onDelete }) => {
  const { t } = useTranslation();

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full text-sm text-textDark">
        <thead className="bg-tableHeader text-gray-600 uppercase text-xs">
          <tr className="ltr:text-left rtl:text-right">
            <th className="px-6 py-3">#</th>
            <th className="px-6 py-3">{t('service')}</th>
            <th className="px-6 py-3">{t('price')}</th>
            <th className="px-6 py-3">{t('actions')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((entry, idx) => (
            <tr key={entry.id} className="hover:bg-tableHover ltr:text-left rtl:text-right">
              <td className="px-6 py-4 font-medium">{idx + 1}</td>
              <td className="px-6 py-4 ">{entry.service}</td>
              <td className="px-6 py-4 ">{entry.price}</td>
              <td className="px-6 py-4 flex gap-2 rtl:space-x-reverse">
                <button onClick={() => onEdit(entry)} className="text-blue-600 hover:underline">
                  {t('edit')}
                </button>
                <button onClick={() => onDelete(entry.id)} className="text-red-600 hover:underline">
                  {t('delete')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorServicesTable;
