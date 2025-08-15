import React, { useState, useCallback, memo } from "react";
import SharedAccordion from "./SharedAccordion";

interface AccordionItem {
    title: string;
    content: string;
}

interface PlainAccordionProps {
    items: AccordionItem[];
    title?: string;
}

const PlainAccordion = memo(function PlainAccordion({ items, title = "Frequently asked questions" }: PlainAccordionProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleToggle = useCallback((index: number) => {
        setActiveIndex(prevActiveIndex => prevActiveIndex === index ? null : index);
    }, []);

    return (
        <div className="w-full px-[var(--width-10)] flex flex-col gap-2">
            <h2 className="text-6xl font-semibold text-center mb-4" >{title}</h2>
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <SharedAccordion
                        index={index}
                        title={item.title}
                        content={item.content}
                        isActive={activeIndex === index}
                        onToggle={handleToggle}
                        className="!bg-transparent !shadow-none"
                        titleClassName=""
                        iconContainerClassName=""
                        iconClassName=""
                        contentClassName=""
                    />
                    {index < items.length - 1 && (
                        <div className="w-full h-px bg-black/10" />
                    )}
                </React.Fragment>
            ))}
            <div className="w-full h-px bg-black/10" />
        </div>
    );
});

export default PlainAccordion;