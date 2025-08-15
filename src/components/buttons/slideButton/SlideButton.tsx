'use client';

import React from 'react';
import './SlideButton.css';

interface SlideButtonProps {
    text?: string;
    onClick?: () => void;
    className?: string;
}

const SlideButton = ({
    text = 'Reserve',
    onClick,
    className = ''
}: SlideButtonProps) => {
    return (
        <button 
            className={`slide-button relative flex items-center justify-center h-9 w-fit px-6 bg-white shadow border-0 rounded-sm overflow-hidden cursor-pointer outline-none pointer-events-auto
                after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-full after:bg-black ${className}`}
            onClick={onClick}
        >
            <span 
                className="slide-button-span inline-block text-sm overflow-hidden relative text-black
                    after:content-[attr(data-text)] after:w-full after:h-full after:inline-block after:absolute 
                    after:left-1/2 after:bottom-0 after:z-[1] after:text-white"
                data-text={text}
            >
                {text}
            </span>
        </button>
    );
};

SlideButton.displayName = 'SlideButton';

export default React.memo(SlideButton);