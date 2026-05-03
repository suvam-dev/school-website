import { Cross, BookOpen, Handshake, Sparkles } from 'lucide-react';
import AnimateOnScroll from '@/components/common/AnimateOnScroll';
import SectionIntro from '@/components/common/SectionIntro';
import { ABOUT, SCHOOL } from '@/data/schoolData';

const ICON_MAP = {
  '✝': Cross,
  '📚': BookOpen,
  '🤝': Handshake,
  '🌟': Sparkles,
};

export default function AboutSection() {
  return (
    <section className="py-20 lg:py-24 px-[5%] lg:px-[7%] bg-lavender">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        {/* Content */}
        <div>
          <SectionIntro
            label="About Us"
            title={ABOUT.title}
            description={ABOUT.description}
            titleClassName="text-indigo-deep"
            descriptionClassName="max-w-[580px] text-muted-foreground mb-10"
          />

          {/* Value cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ABOUT.values.map((val, i) => {
              const IconComponent = ICON_MAP[val.icon];
              return (
                <AnimateOnScroll key={i} delay={i * 100}>
                  <div className="bg-[rgba(255,255,255,0.7)] backdrop-blur-2xl border border-white/30 shadow-md rounded-lg p-5 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 cursor-default">
                    <div className="mb-3">
                      {IconComponent ? (
                        <IconComponent className="w-6 h-6 text-gold" />
                      ) : (
                        <span className="text-2xl">{val.icon}</span>
                      )}
                    </div>
                    <h3 className="font-heading text-[15px] text-indigo-deep font-semibold mb-1.5">{val.name}</h3>
                    <p className="text-[13px] text-muted-foreground leading-relaxed">{val.desc}</p>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>

        {/* Visual */}
        <div className="relative grid grid-cols-2 gap-3.5">
          {/* Badge */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gold text-indigo-deep font-heading text-[13px] font-bold px-5 py-2.5 rounded-md whitespace-nowrap z-10 text-center shadow-lg">
            Est. {SCHOOL.founded}
            <span className="block text-[11px] font-normal font-sans">{SCHOOL.foundedBy}</span>
          </div>

          {ABOUT.images.map((img, i) => (
            <div
              key={i}
              className={`rounded-lg overflow-hidden aspect-[3/4] relative flex items-end p-5 ${i === 0 ? 'mt-10' : ''}`}
              style={{ background: img.bg }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-10 text-white">
                {img.icon}
              </div>
              <span className="text-xs tracking-widest uppercase text-white/65 relative z-[2]">
                {img.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
