'use client';

import React from 'react';
import useMagneticEffect from './useMagneticEffect';

interface MagneticButtonProps {
    text?: string;
    onClick?: () => void;
    className?: string;
    strengthFactor?: number;
}

const MagneticButton = ({
    text = 'Button',
    onClick,
    className = '',
    strengthFactor = 20
}: MagneticButtonProps) => {
    const magneticRef = useMagneticEffect(strengthFactor);

    return (
        <button
            ref={magneticRef as React.RefObject<HTMLButtonElement>}
            onClick={onClick}
            className={`relative cursor-pointer h-9 bg-white shadow rounded px-4 text-sm ${className}`}
        >
            {text}
        </button>
    );
};

MagneticButton.displayName = 'MagneticButton';

export default React.memo(MagneticButton);