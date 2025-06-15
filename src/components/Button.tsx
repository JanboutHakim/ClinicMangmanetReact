import React from 'react';

type ButtonProps = {
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
};

const Button: React.FC<ButtonProps> = ({
                                           children = 'Click Me',
                                           className = '',
                                           onClick,
                                           type = 'button',
                                       }) => {
    return (
        <button
            type={type}
            className={`text-white px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
