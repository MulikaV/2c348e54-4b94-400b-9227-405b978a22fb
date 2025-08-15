'use client'

import { memo, useMemo } from 'react'
import GlowingItem, { type GlowingItemData } from './GlowingItem'
import { ITEMS_PER_ROW } from './constants'

export type { GlowingItemData as GlowingItem }

interface GlowingBentoProps {
  items: GlowingItemData[]
  className?: string
}

function GlowingBento({ items, className = '' }: GlowingBentoProps) {
  const rows = useMemo(() => {
    const rowCount = Math.ceil(items.length / ITEMS_PER_ROW)
    return Array.from({ length: rowCount }).map((_, rowIndex) => {
      const startIdx = rowIndex * ITEMS_PER_ROW
      return items.slice(startIdx, startIdx + ITEMS_PER_ROW)
    })
  }, [items])

  return (
    <section className={`w-full px-[var(--width-10)] space-y-6 ${className}`}>
      {rows.map((rowItems, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rowItems.map((item, itemIndex) => (
            <GlowingItem 
              key={`${rowIndex}-${itemIndex}`}
              item={item} 
              rowIndex={rowIndex} 
              itemIndex={itemIndex} 
            />
          ))}
        </div>
      ))}
    </section>
  )
}

GlowingBento.displayName = 'GlowingBento'

export default memo(GlowingBento)