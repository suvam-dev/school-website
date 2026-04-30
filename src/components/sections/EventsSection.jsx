import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import SectionIntro from '@/components/common/SectionIntro';
import { EVENTS, NOTICES } from '@/data/schoolData';

export default function EventsSection() {
  return (
    <section className="py-20 lg:py-24 px-[5%] lg:px-[7%] bg-lavender">
      <SectionIntro
        label="Events & News"
        title={['School Calendar', '& Notices']}
        titleClassName="text-indigo-deep mb-12"
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16">
        {/* Events list */}
        <div>
          {EVENTS.map((evt, i) => (
            <div key={i} className={`flex gap-5 py-6 items-start ${i > 0 ? 'border-t border-border' : ''}`}>
              <div className="bg-indigo-deep text-white rounded-md px-3.5 py-2.5 text-center shrink-0 min-w-[56px]">
                <div className="font-heading text-2xl font-bold leading-none">{evt.day}</div>
                <div className="text-[10px] tracking-widest uppercase text-gold-light mt-1">{evt.month}</div>
              </div>
              <div>
                <h3 className="font-heading text-base text-indigo-deep mb-1.5">{evt.name}</h3>
                <p className="text-[12.5px] text-muted-foreground mb-2">{evt.meta}</p>
                <Badge variant="secondary" className="bg-gold-pale text-gold border border-gold/20 text-[11px]">
                  {evt.tag}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Notice board */}
        <div className="bg-indigo-deep rounded-xl p-8 text-white flex flex-col">
          <h3 className="font-heading text-xl text-white mb-6 pb-4 border-b border-white/10">
            📋 Notice Board
          </h3>
          <div className="space-y-5 flex-1">
            {NOTICES.map((notice, i) => (
              <div key={i} className="flex gap-3.5">
                <div className="w-2 h-2 rounded-full bg-gold shrink-0 mt-1.5" />
                <div>
                  <p className="text-[13.5px] text-white/70 leading-relaxed">{notice.text}</p>
                  <p className="text-[11px] text-white/30 mt-1">{notice.date}</p>
                </div>
              </div>
            ))}
          </div>
          <a href="#" className="flex items-center gap-2 mt-5 pt-5 border-t border-white/[0.08] text-[13px] text-gold-light font-medium no-underline hover:text-gold transition-colors">
            View all notices <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
