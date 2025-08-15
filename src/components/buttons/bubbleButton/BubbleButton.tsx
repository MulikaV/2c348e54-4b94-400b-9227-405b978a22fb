'use client';

import React from 'react';
import { ArrowDownRight } from 'lucide-react';
import './BubbleButton.css';

interface BubbleButtonProps {
    text?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    disabled?: boolean;
    ariaLabel?: string;
    type?: 'button' | 'submit' | 'reset';
}

const BubbleButton = ({
    text = 'Contact Us',
    onClick,
    className = '',
    disabled = false,
    ariaLabel,
    type = 'button'
}: BubbleButtonProps) => {
    const arrowClasses = "flex justify-center items-center h-9 aspect-square text-black bg-white rounded-full shadow";
    const arrowIconClasses = "h-[35%] w-auto aspect-square object-contain transition-transform duration-[735ms] group-hover:rotate-[-45deg]";

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel || text}
            className={`group bubble-button flex justify-center items-center rounded-full relative cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        >
            <div className={`bubble-button-arrow ${arrowClasses} relative transition-transform duration-[735ms]`}>
                <ArrowDownRight strokeWidth={1.5} className={arrowIconClasses} />
            </div>
            <div className="bubble-button-content flex justify-center items-center h-9 px-4 text-white bg-black shadow rounded-full relative transition-transform duration-[735ms]">
                <span className="text-sm">{text}</span>
            </div>
            <div className={`bubble-button-arrow-duplicate ${arrowClasses} absolute right-0 z-20 transition-transform duration-[735ms]`}>
                <ArrowDownRight strokeWidth={1.5} className={arrowIconClasses} />
            </div>
        </button>
    );
};

BubbleButton.displayName = 'BubbleButton';

export default React.memo(BubbleButton);