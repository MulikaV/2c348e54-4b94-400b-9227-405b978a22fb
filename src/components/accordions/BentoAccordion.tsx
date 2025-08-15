import React, { useState, useCallback, memo } from "react";
import SharedAccordion from "./SharedAccordion";

interface AccordionItem {
    title: string;
    content: string;
}

interface BentoAccordionProps {
    items: AccordionItem[];
    title?: string;
}

const BentoAccordion = memo(function BentoAccordion({ items, title = "Frequently asked questions" }: BentoAccordionProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleToggle = useCallback((index: number) => {
        setActiveIndex(prevActiveIndex => prevActiveIndex === index ? null : index);
    }, []);

    const halfLength = Math.ceil(items.length / 2);
    const firstHalf = items.slice(0, halfLength);
    const secondHalf = items.slice(halfLength);

    return (
        <div className="w-full px-[var(--width-10)] flex flex-col gap-4">
            <h2 className="text-6xl font-semibold text-center mb-4" >{title}</h2>
            <div className="w-full p-4 bg-white/50 shadow rounded" >
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 flex flex-col gap-4">
                        {firstHalf.map((item, index) => (
                            <SharedAccordion
                                key={index}
                                index={index}
                                title={item.title}
                                content={item.content}
                                isActive={activeIndex === index}
                                onToggle={handleToggle}
                                className=""
                                titleClassName=""
                                iconContainerClassName=""
                                iconClassName=""
                                contentClassName=""
                            />
                        ))}
                    </div>
                    {secondHalf.length > 0 && (
                        <div className="flex-1 flex flex-col gap-4">
                            {secondHalf.map((item, index) => {
                                const actualIndex = index + halfLength;
                                return (
                                    <SharedAccordion
                                        key={actualIndex}
                                        index={actualIndex}
                                        title={item.title}
                                        content={item.content}
                                        isActive={activeIndex === actualIndex}
                                        onToggle={handleToggle}
                                        className=""
                                        titleClassName=""
                                        iconContainerClassName=""
                                        iconClassName=""
                                        contentClassName=""
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

export default BentoAccordion;