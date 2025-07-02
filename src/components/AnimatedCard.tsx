import React, { ReactNode } from 'react';
import { getColors } from '../constants/theme';
import {useTheme} from "../contexts/ThemeContext";

interface AnimatedCardProps {
    children: ReactNode;
    className?: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, className = '' }) => {
    const {mode} = useTheme();
    const COLORS = getColors(mode);
    return (
        <div
            className={` h-60 group relative p-4 rounded-xl shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-xl ${className}`}
            style={{ backgroundColor: 'white' }} // optional, or use a prop
        >
            {/* Bottom line animation with custom color */}
            <div
                className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: COLORS.primary }}
            ></div>
            {children}
        </div>
    );
};

export default AnimatedCard;
