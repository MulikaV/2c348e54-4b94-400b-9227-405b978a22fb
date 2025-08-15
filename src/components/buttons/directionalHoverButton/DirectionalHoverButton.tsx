'use client';

import React, { useRef } from 'react';
import { useDirectionalHover } from './useDirectionalHover';
import './DirectionalHoverButton.css';

interface DirectionalHoverButtonProps {
    text?: string;
    onClick?: () => void;
    className?: string;
}

const DirectionalHoverButton = ({
    text = 'Button',
    onClick,
    className = ''
}: DirectionalHoverButtonProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    
    useDirectionalHover(buttonRef);

    return (
        <button
            ref={buttonRef}
            onClick={onClick}
            className={`directional-hover-button relative flex justify-center items-center h-9 px-5 rounded cursor-pointer no-underline group ${className}`}
        >
            <div className="directional-hover-button-bg absolute inset-0 rounded bg-white shadow" />
            <div className="directional-hover-button-circle-wrap absolute inset-0 rounded overflow-hidden hidden md:block">
                <div className="directional-hover-button-circle pointer-events-none bg-blue rounded-full w-full block absolute top-1/2 left-1/2">
                    <div className="directional-hover-button-circle-inner block pt-[100%]" />
                </div>
            </div>
            <div className="directional-hover-button-text relative z-20 flex items-center text-black md:group-hover:text-white">
                <p className="directional-hover-button-text-p whitespace-nowrap mb-0 text-sm">{text}</p>
            </div>
        </button>
    );
};

DirectionalHoverButton.displayName = 'DirectionalHoverButton';

export default React.memo(DirectionalHoverButton);