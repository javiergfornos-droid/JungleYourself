// ===============================================
// JUNGLE YOURSELF - ACCORDION COMPONENT
// Expandable FAQ/Q&A sections
// ===============================================

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  id?: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export default function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="divide-y divide-sand border border-sand rounded-xl overflow-hidden">
      {items.map((item, index) => (
        <div key={item.id || index} className="bg-warm-white">
          <button
            onClick={() => toggleItem(index)}
            className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-cream/50 transition-colors"
            aria-expanded={openItems.has(index)}
          >
            <span className="font-medium text-charcoal pr-4">{item.question}</span>
            <ChevronDown 
              className={`w-5 h-5 text-moss flex-shrink-0 transition-transform duration-300 ${
                openItems.has(index) ? 'rotate-180' : ''
              }`}
            />
          </button>
          
          <div 
            className={`overflow-hidden transition-all duration-300 ${
              openItems.has(index) ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="p-4 md:p-5 pt-0 text-charcoal/80 leading-relaxed">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
