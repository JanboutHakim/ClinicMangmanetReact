import React from 'react';

type File = {
    name: string;
    size: string;
    url: string;
};

type Props = {
    header: string;
    files: File[];
    actions?: React.ReactNode;
};

const FileListCard: React.FC<Props> = ({ header, files, actions }) => {
    return (
        <div className="bg-white rounded-xl shadow p-6 flex-1 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">{header}</h3>
                {actions || (
                    <button
                        className="w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-200 text-xs"
                        title="Download All"
                    >
                        ↓
                    </button>
                )}
            </div>
            <ul className="space-y-3 text-sm">
                {files.map((file, idx) => (
                    <li
                        key={idx}
                        className={`flex justify-between items-center ${idx !== files.length - 1 ? 'border-b pb-2' : ''}`}
                    >
                        <a
                            href={file.url}
                            className="text-gray-700 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {file.name}
                        </a>
                        <span className="text-xs text-gray-500">{file.size}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileListCard;
