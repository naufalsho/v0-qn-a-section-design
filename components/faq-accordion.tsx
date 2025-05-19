"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FaqItem {
  question: string
  answer: string
}

interface FaqAccordionProps {
  items: FaqItem[]
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const handleToggle = (value: string) => {
    setExpandedItems((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  return (
    <Accordion type="multiple" value={expandedItems} className="space-y-2">
      {items.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg overflow-hidden bg-card">
          <AccordionTrigger
            onClick={() => handleToggle(`item-${index}`)}
            className="px-4 py-3 hover:no-underline hover:bg-muted/50 data-[state=open]:bg-muted/50"
          >
            <span className="text-left font-medium">{item.question}</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-1 text-muted-foreground">{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
