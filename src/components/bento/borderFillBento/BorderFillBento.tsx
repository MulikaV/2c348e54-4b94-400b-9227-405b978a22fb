'use client'

import { memo, useMemo } from 'react'
import BorderFillItem, { type BorderFillItem as BorderFillItemType } from './BorderFillItem'
import { ITEMS_PER_ROW } from './constants'

export type { BorderFillItem } from './BorderFillItem'

interface BorderFillBentoProps {
  items: BorderFillItemType[]
  className?: string
}

function BorderFillBento({ items, className = '' }: BorderFillBentoProps) {
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
            <BorderFillItem 
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

BorderFillBento.displayName = 'BorderFillBento'

export default memo(BorderFillBento)