import React, { useState, useCallback, memo } from "react";
import SharedAccordion from "./SharedAccordion";

interface AccordionItem {
    title: string;
    content: string;
}

interface RegularAccordionProps {
    items: AccordionItem[];
    title?: string;
}

const RegularAccordion = memo(function RegularAccordion({ items, title = "Frequently asked questions" }: RegularAccordionProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleToggle = useCallback((index: number) => {
        setActiveIndex(prevActiveIndex => prevActiveIndex === index ? null : index);
    }, []);

    return (
        <div className="w-full px-[var(--width-10)] flex flex-col gap-4">
            <h2 className="text-6xl font-semibold text-center mb-4" >{title}</h2>
            {items.map((item, index) => (
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
    );
});

export default RegularAccordion;