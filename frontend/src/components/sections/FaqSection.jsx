import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import AnimateOnScroll from '@/components/common/AnimateOnScroll';

const FAQS = [
  {
    question: 'What is the age criteria for nursery admission?',
    answer: 'A child should be at least 3 years and 6 months old by the 1st of April of the admission academic year.'
  },
  {
    question: 'Are there school bus transport facilities available?',
    answer: 'Yes, Holy Cross School operates multiple safe and monitored school bus routes across Pandua and surrounding areas.'
  },
  {
    question: 'What is the standard school dress code?',
    answer: 'Students are required to wear the standard school uniform consisting of a white shirt, blue trousers/skirt, tie, and black shoes from Monday to Friday.'
  },
  {
    question: 'What are the main school administrative timing hours?',
    answer: 'The administrative office and principal’s desk are open for inquiries Monday to Saturday, 9:00 AM to 4:00 PM.'
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 lg:py-24 px-[5%] lg:px-[7%] bg-white relative">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-[2px] text-gold uppercase">Common Queries</span>
          <h2 className="font-heading text-3xl md:text-4xl text-indigo-deep font-bold mt-2 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            Get instant clarity on essential school administrative operations, age criteria, bus services, and uniforms.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <AnimateOnScroll key={index} delay={index * 100}>
                <div className={`bg-indigo-50/40 backdrop-blur-xl border rounded-2xl overflow-hidden transition duration-300 ${
                  isOpen ? 'border-indigo-deep/20 shadow-md' : 'border-indigo-deep/5 hover:border-indigo-deep/15'
                }`}>
                  <button
                    onClick={() => toggle(index)}
                    className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-gold shrink-0" />
                      <span className="font-heading text-base md:text-lg font-bold text-indigo-deep">{faq.question}</span>
                    </div>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-indigo-deep shrink-0" /> : <ChevronDown className="w-4 h-4 text-indigo-deep shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-5 md:px-6 pb-5 md:pb-6 text-muted-foreground text-sm leading-relaxed max-w-3xl border-t border-indigo-deep/5 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
