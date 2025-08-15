'use client'

import "./infoRevealBento.css"
import React, { useRef, useCallback } from "react"
import InfoRevealBentoItem from "./InfoRevealBentoItem"
import { useDynamicDimensions } from "./useDynamicDimensions"
import { Carousel } from "@/components/carousels/Carousel"

export interface InfoRevealBentoItem {
    id: string
    title: string
    description: string
    imageSrc: string
}

interface InfoRevealBentoProps {
    items: InfoRevealBentoItem[]
    enableHoverAnimation?: boolean
    showImages?: boolean
}

export const InfoRevealBento = React.memo(({ items, enableHoverAnimation = true, showImages = true }: InfoRevealBentoProps) => {
    const infoRevealBentoRefs = useRef<(HTMLDivElement | null)[]>([])
    const mobileInfoRevealBentoRefs = useRef<(HTMLDivElement | null)[]>([])

    const setRef = useCallback((refs: React.RefObject<(HTMLDivElement | null)[]>, index: number) => (el: HTMLDivElement | null) => {
        if (refs.current) {
            refs.current[index] = el
        }
    }, [])

    useDynamicDimensions([infoRevealBentoRefs, mobileInfoRevealBentoRefs], {
        titleSelector: '.info-reveal-bento-title-row .info-reveal-title',
        descriptionSelector: '.info-reveal-bento-description-wrapper .info-reveal-description'
    })

    const getGridClassName = () => {
        const itemCount = items.length
        if (itemCount === 1) return 'info-reveal-bento-container-1'
        if (itemCount === 2) return 'info-reveal-bento-container-2'
        if (itemCount === 3) return 'info-reveal-bento-container-3'
        if (itemCount === 4) return 'info-reveal-bento-container-4'
        if (itemCount >= 5) return 'info-reveal-bento-container-repeating'
        return 'info-reveal-bento-container'
    }

    return (
        <section className="h-fit px-0 md:px-[var(--width-10)]">
            <div className="p-0">
                <div className={`${getGridClassName()} gap-6 hidden md:grid`}>
                    {items.map((item, index) => (
                        <InfoRevealBentoItem
                            key={item.id}
                            ref={setRef(infoRevealBentoRefs, index)}
                            item={item}
                            index={index}
                            isMobile={false}
                            enableHoverAnimation={enableHoverAnimation}
                            showImages={showImages}
                            totalItems={items.length}
                        />
                    ))}
                </div>
                <div className="w-full flex flex-col gap-6 md:hidden">
                    <Carousel>
                        {items.map((item, index) => (
                            <InfoRevealBentoItem
                                key={item.id}
                                ref={setRef(mobileInfoRevealBentoRefs, index)}
                                item={item}
                                index={index}
                                isMobile={true}
                                enableHoverAnimation={enableHoverAnimation}
                                showImages={showImages}
                                totalItems={items.length}
                            />
                        ))}
                    </Carousel>
                </div>
            </div>
        </section>
    )
})

InfoRevealBento.displayName = 'InfoRevealBento'

export default InfoRevealBento