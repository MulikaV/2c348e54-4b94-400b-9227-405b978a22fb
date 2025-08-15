import React, { useState, useCallback, memo } from "react";
import SharedAccordion from "./SharedAccordion";
import Image from "next/image";

interface AccordionItem {
    title: string;
    content: string;
}

interface ImageAccordionProps {
    items: AccordionItem[];
    imageSrc: string;
    imageAlt?: string;
    title?: string;
}

const ImageAccordion = memo(function ImageAccordion({ items, imageSrc, imageAlt = "", title = "Frequently asked questions" }: ImageAccordionProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleToggle = useCallback((index: number) => {
        setActiveIndex(prevActiveIndex => prevActiveIndex === index ? null : index);
    }, []);

    return (
        <div className="w-full px-[var(--width-10)] flex flex-col gap-4">
            <h2 className="text-6xl font-semibold text-center mb-4" >{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:auto-rows-fr" >
                <div className="overflow-hidden col-span-1 md:col-span-2 bg-white shadow rounded relative h-80 md:h-auto" >
                    <Image src={imageSrc} width={1000} height={1000} alt={imageAlt} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="col-span-1 md:col-span-3 flex flex-col gap-4" >
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
            </div>
        </div>
    );
});

export default ImageAccordion;