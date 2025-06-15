import React from 'react';

type LabeledInputProps = {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
    placeholder?: string;
    type?: string;
    inputClassName?: string;
    className?: string;
};

const LabeledInput: React.FC<LabeledInputProps> = ({
                                                       label,
                                                       name,
                                                       value,
                                                       onChange,
                                                       onFocus,
                                                       placeholder,
                                                       type = 'text',
                                                       inputClassName = '',
                                                       className = '',
                                                   }) => (
    <div className={`flex flex-col ${className}`}>
        <label htmlFor={name} className="text-sm font-medium mb-1">
            {label}
        </label>
        <input
            id={name}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            placeholder={placeholder}
            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClassName}`}
        />
    </div>
);

export default LabeledInput;
