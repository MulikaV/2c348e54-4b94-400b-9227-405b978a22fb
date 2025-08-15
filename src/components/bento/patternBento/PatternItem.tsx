'use client'

import { memo, useRef } from 'react'
import { LucideIcon } from 'lucide-react'
import { useMotionValue } from 'framer-motion'
import { CardPattern } from '@/components/background/CardPattern'
import { usePatternInteraction } from './usePatternInteraction'

export interface PatternItemData {
  icon: LucideIcon
  title: string
  description: string
}

interface PatternItemProps {
  item: PatternItemData
  rowIndex: number
  itemIndex: number
}

const PatternItem = memo(function PatternItem({ item, rowIndex, itemIndex }: PatternItemProps) {
  const Icon = item.icon
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { state, onMouseMove } = usePatternInteraction(mouseX, mouseY, containerRef)

  return (
    <article
      key={`${rowIndex}-${itemIndex}`}
      className="relative bg-white rounded shadow h-100"
      aria-label={item.title}
    >
      <div className="relative z-10 w-full h-full p-[calc(var(--width-10)/2)] md:p-6 flex flex-col gap-6 justify-between">
        <div 
          ref={containerRef} 
          className={`group/card ${state.isMobile && state.isInView ? 'group/card-active' : ''} relative w-full h-full flex items-center justify-center`} 
          onMouseMove={onMouseMove}
        >
          <div className={`relative z-20 h-15 w-[3.75rem] aspect-square rounded backdrop-blur-sm border border-white/50 transition-all duration-300 flex items-center justify-center ${
            state.isMobile 
              ? (state.isIconActive ? 'bg-white/50 shadow-none' : 'bg-white shadow')
              : 'bg-white shadow group-hover/card:bg-white/50 group-hover/card:shadow-none'
          }`}>
            <Icon className="w-[35%] aspect-square text-black" strokeWidth={1} aria-hidden="true" />
          </div>
          <div className="opacity-25">
            <CardPattern
              mouseX={mouseX}
              mouseY={mouseY}
              randomString={state.randomString}
              isActive={state.isMobile && state.isInView}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 text-black">
          <h2 className="text-2xl md:text-3xl leading-[110%]">{item.title}</h2>
          <p className="text-sm leading-[120%]">{item.description}</p>
        </div>
      </div>
    </article>
  )
})

PatternItem.displayName = 'PatternItem'

export default PatternItem