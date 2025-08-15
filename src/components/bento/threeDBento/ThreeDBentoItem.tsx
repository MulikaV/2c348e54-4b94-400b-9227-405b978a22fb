'use client'

import React, { forwardRef, useMemo } from 'react'
import Image from 'next/image'
import { BentoItem, TRANSFORM_VALUES, CONTAINER_STYLES } from './constants'

interface ThreeDBentoItemProps {
    item: BentoItem
    index: number
}

const ThreeDBentoItem = forwardRef<HTMLDivElement, ThreeDBentoItemProps>(
    ({ item }, ref) => {
        const transformStyle = useMemo((): React.CSSProperties => {
            const styleMap: Record<string, React.CSSProperties> = {
                left: { transform: TRANSFORM_VALUES.left },
                right: { transform: TRANSFORM_VALUES.right },
                center: CONTAINER_STYLES
            }
            return styleMap[item.position] || {}
        }, [item.position])

        return (
            <div
                ref={ref}
                className="relative w-full h-fit p-[calc(var(--width-10)/2)] md:p-[calc(var(--width-10)/4)] rounded bg-white shadow flex flex-col gap-6"
                style={transformStyle}
            >
                <Image 
                    src={item.image} 
                    height={1000} 
                    width={1000} 
                    alt={item.titleEN} 
                    className="w-full h-auto rounded" 
                />
                <div className="flex flex-col gap-2">
                    <h3 className="text-2xl md:text-3xl leading-[110%]">{item.titleEN}</h3>
                    <p className="text-sm leading-[120%]">{item.descriptionEN}</p>
                </div>
            </div>
        )
    }
)

ThreeDBentoItem.displayName = 'ThreeDBentoItem'

export default React.memo(ThreeDBentoItem)