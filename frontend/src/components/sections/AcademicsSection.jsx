import { Badge } from '@/components/ui/badge';
import AnimateOnScroll from '@/components/common/AnimateOnScroll';
import SectionIntro from '@/components/common/SectionIntro';
import { ACADEMICS } from '@/data/schoolData';

const CLASS_COLORS = {
  nursery: 'bg-orange-50 text-orange-800 border-orange-300',
  primary: 'bg-green-50 text-green-800 border-green-300',
  middle:  'bg-blue-50 text-blue-800 border-blue-300',
  senior:  'bg-purple-50 text-purple-800 border-purple-300',
  higher:  'bg-pink-50 text-pink-800 border-pink-300',
};

const STREAM_ACCENT = {
  primary:   'border-t-indigo',
  secondary: 'border-t-gold',
  teal:      'border-t-emerald-600',
};

export default function AcademicsSection() {
  return (
    <section className="py-20 lg:py-24 px-[5%] lg:px-[7%] bg-background">
      {/* Top area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
        <div>
          <SectionIntro
            label="Academics"
            title={ACADEMICS.title}
            description={ACADEMICS.description}
            titleClassName="text-indigo-deep"
            descriptionClassName="max-w-[580px] text-muted-foreground mb-8"
          />

          {/* Class badges */}
          <div className="flex flex-wrap gap-2.5">
            {ACADEMICS.classes.map((cls) => (
              <span
                key={cls.name}
                className={`px-4 py-2 rounded-md text-[12.5px] font-semibold border ${CLASS_COLORS[cls.type]}`}
              >
                {cls.name}
              </span>
            ))}
          </div>
        </div>

        {/* Results card */}
        <div className="bg-[rgba(255,255,255,0.7)] backdrop-blur-2xl border border-white/30 shadow-md rounded-xl p-8">
          <div className="text-[11px] tracking-[2px] uppercase text-gold font-semibold mb-4">
            Board & Results
          </div>
          <div className="grid grid-cols-2 gap-4">
            {ACADEMICS.results.map((r) => (
              <div key={r.label} className="bg-white rounded-lg p-5 text-center border border-border">
                <div className="font-heading text-3xl text-indigo-deep font-bold">{r.value}</div>
                <div className="text-[11px] text-muted-foreground mt-1 tracking-wider uppercase">{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Streams */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {ACADEMICS.streams.map((stream, i) => (
          <AnimateOnScroll key={i} delay={i * 120}>
            <div className={`bg-[rgba(255,255,255,0.7)] backdrop-blur-2xl border border-white/30 shadow-md rounded-lg p-7 border-t-[3px] ${STREAM_ACCENT[stream.accent]} transition-all duration-250 hover:shadow-xl hover:-translate-y-1 cursor-default h-full`}>
              <div className="text-3xl mb-4">{stream.icon}</div>
              <h3 className="font-heading text-[17px] text-indigo-deep mb-2">{stream.name}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">{stream.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {stream.subjects.map((subj) => (
                  <Badge key={subj} variant="secondary" className="bg-lavender text-indigo-deep border border-border text-[11px] font-medium">
                    {subj}
                  </Badge>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}
