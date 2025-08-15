'use client';

import { ArrowUpRight } from 'lucide-react';
import React from 'react';

interface ExpandingButtonProps {
    text?: string;
    onClick?: () => void;
    className?: string;
}

const ExpandingButton = ({
    text = 'Button',
    onClick,
    className = ''
}: ExpandingButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`group relative cursor-pointer h-9 bg-white shadow rounded-full px-5 text-sm ${className}`}
            style={{ paddingRight: 'calc(var(--height-9) + var(--vw-0_75))' }}
        >
            <span className="relative z-10 md:transition-colors md:duration-[800ms] md:[transition-timing-function:cubic-bezier(.77,0,.18,1)] md:group-hover:text-white" >
                {text}
            </span>
            <div className="absolute overflow-hidden top-[2px] bottom-[2px] left-[2px] right-[2px] rounded-full flex justify-end" >
                <div className="relative z-10 h-full w-auto aspect-square flex items-center justify-center" >
                    <ArrowUpRight className="h-1/2 w-auto aspect-square text-white" strokeWidth={1} />
                </div>
                <div className="absolute z-0 h-full w-full rounded-full bg-black md:transition-transform md:duration-[900ms] md:[transition-timing-function:cubic-bezier(.77,0,.18,1)] md:-translate-x-[calc(-100%+((var(--height-9)-4px)))] md:group-hover:translate-x-0" ></div>
            </div>
        </button>
    );
};

ExpandingButton.displayName = 'ExpandingButton';

export default React.memo(ExpandingButton);