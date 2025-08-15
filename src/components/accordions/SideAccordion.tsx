import React, { useState, useCallback, memo } from "react";
import SharedAccordion from "./SharedAccordion";

interface AccordionItem {
    title: string;
    content: string;
}

interface SideAccordionProps {
    items: AccordionItem[];
    title?: string;
    description?: string;
}

const SideAccordion = memo(function SideAccordion({ items, title = "Frequently asked questions", description = "Don't see the answer you're looking for? Get in touch." }: SideAccordionProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleToggle = useCallback((index: number) => {
        setActiveIndex(prevActiveIndex => prevActiveIndex === index ? null : index);
    }, []);

    return (
        <div className="w-full px-[var(--width-10)] flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 2xl:gap-0 md:auto-rows-fr" >
                <div className="overflow-hidden col-span-1 md:col-span-2 flex flex-col gap-4 md:h-auto text-center md:text-left" >
                    <h2 className="text-6xl font-semibold max-w-full md:max-w-[90%] 2xl:max-w-[70%]" >{title}</h2>
                    <p className="text-base max-w-full md:max-w-[90%] 2xl:max-w-[70%] leading-[120%]" >{description}</p>
                </div>
                <div className="col-span-1 md:col-span-3 flex flex-col gap-2" >
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
            </div>
        </div>
    );
});

export default SideAccordion;