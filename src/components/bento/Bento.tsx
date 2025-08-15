'use client'

import { memo } from 'react'

export interface BentoItem {
  title: string
  description: string
}

interface BentoProps {
  items: BentoItem[]
  className?: string
}

function Bento({ items, className = '' }: BentoProps) {
  const gridConfig = [
    { colSpan: 'col-span-1 md:col-span-3', index: 0 },
    { colSpan: 'col-span-1 md:col-span-2', index: 1 },
    { colSpan: 'col-span-1 md:col-span-2', index: 2 },
    { colSpan: 'col-span-1 md:col-span-3', index: 3 }
  ]

  return (
    <section className={`w-full px-[var(--width-10)] ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {gridConfig.map((config, idx) => {
          const item = items[config.index]
          if (!item) return null
          
          return (
            <div 
              key={idx}
              className={`${config.colSpan} bg-white rounded shadow h-90 flex flex-col p-[calc(var(--width-10)/2)] md:p-[calc(var(--width-10)/4)]`}
            >
              <div className="flex flex-col gap-1 md:gap-3 text-black">
                <h2 className="text-xl md:text-2xl leading-[110%]">{item.title}</h2>
                <p className="text-sm leading-[110%]">{item.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

Bento.displayName = 'Bento'

export default memo(Bento)