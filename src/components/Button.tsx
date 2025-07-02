type ButtonProps = {
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    color?: 'blue' | 'red';
};

const Button: React.FC<ButtonProps> = ({
                                           children = 'Click Me',
                                           className = '',
                                           onClick,
                                           type = 'button',
                                           color = 'blue',
                                       }) => {
    const colorClasses =
        color === 'red'
            ? 'bg-red-600 hover:bg-red-700'
            : 'bg-blue-600 hover:bg-blue-700';

    return (
        <button
            type={type}
            className={`text-white px-6 py-2 rounded-md ${colorClasses} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
