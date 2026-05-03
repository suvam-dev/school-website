import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import SectionIntro from '@/components/common/SectionIntro';
import { EVENTS, NOTICES } from '@/data/schoolData';
import { supabase } from '@/lib/supabase';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

export default function EventsSection() {
  const [liveNotices, setLiveNotices] = useState([]);
  const [liveEvents, setLiveEvents] = useState([]);
  const [showAllNotices, setShowAllNotices] = useState(false);

  useEffect(() => {
    async function fetchData() {
      // 1. Fetch Notices
      try {
        const { data, error } = await supabase
          .from('notices')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const mapped = data.map(notif => ({
            text: notif.message || notif.text,
            title: notif.title,
            date: notif.created_at ? new Date(notif.created_at).toLocaleDateString() : ''
          }));
          setLiveNotices(mapped);
        } else {
          setLiveNotices(NOTICES);
        }
      } catch (err) {
        console.error('Error fetching live notices:', err);
        setLiveNotices(NOTICES);
      }

      // 2. Fetch Events
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          setLiveEvents(data);
        } else {
          setLiveEvents(EVENTS);
        }
      } catch (err) {
        console.error('Error fetching live events:', err);
        setLiveEvents(EVENTS);
      }
    }

    fetchData();
  }, []);

  const displayedNotices = showAllNotices ? liveNotices : liveNotices.slice(0, 3);

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
          {liveEvents.map((evt, i) => (
            <div key={i} className={`flex gap-5 py-6 items-start ${i > 0 ? 'border-t border-border' : ''}`}>
              <div className="bg-indigo-deep text-white rounded-md px-3.5 py-2.5 text-center shrink-0 min-w-[56px]">
                <div className="font-heading text-2xl font-bold leading-none">{evt.day}</div>
                <div className="text-[10px] tracking-widest uppercase text-gold-light mt-1">{evt.month}</div>
              </div>
              {evt.image_url && (
                <img src={evt.image_url} alt="Event" className="w-16 h-16 object-cover rounded-md border border-border shrink-0" />
              )}
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
        <div className="bg-indigo-deep rounded-xl p-8 text-white flex flex-col h-fit">
          <h3 className="font-heading text-xl text-white mb-6 pb-4 border-b border-white/10">
            📋 Notice Board
          </h3>
          <div className="space-y-5 flex-1">
            {displayedNotices.map((notice, i) => (
              <div key={i} className="flex gap-3.5">
                <div className="w-2 h-2 rounded-full bg-gold shrink-0 mt-1.5" />
                <div>
                  {notice.title && (
                    <p className="text-[14px] font-bold text-gold-light mb-0.5 leading-tight">
                      {notice.title}
                    </p>
                  )}
                  <p className="text-[13px] text-white/70 leading-relaxed">{notice.text || notice.message}</p>
                  <p className="text-[11px] text-white/30 mt-1">{notice.date}</p>
                </div>
              </div>
            ))}
          </div>

          {liveNotices.length > 3 && (
            <button
              onClick={() => setShowAllNotices(prev => !prev)}
              className="flex items-center gap-2 mt-6 pt-4 border-t border-white/[0.08] text-[13px] text-gold-light font-bold no-underline hover:text-gold transition-colors bg-transparent border-0 cursor-pointer self-start select-none"
            >
              {showAllNotices ? (
                <>See Less <ChevronUp className="w-4 h-4" /></>
              ) : (
                <>See More ({liveNotices.length - 3} more) <ChevronDown className="w-4 h-4" /></>
              )}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}





