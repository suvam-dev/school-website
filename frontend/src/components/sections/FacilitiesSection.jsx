import { FlaskConical, Monitor, BookOpen, Waves, Palette, Music, Trophy, Theater, Church } from 'lucide-react';
import AnimateOnScroll from '@/components/common/AnimateOnScroll';
import SectionIntro from '@/components/common/SectionIntro';
import { FACILITIES } from '@/data/schoolData';

const ICON_MAP = {
  '🔬': FlaskConical,
  '💻': Monitor,
  '📚': BookOpen,
  '🏊': Waves,
  '🎨': Palette,
  '🎵': Music,
  '🏟': Trophy,
  '🎭': Theater,
  '⛪': Church,
};

export default function FacilitiesSection() {
  return (
    <section className="relative py-20 lg:py-32 px-[5%] lg:px-[7%] bg-cream overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-pale/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-pale/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10">
        <SectionIntro
          label="Facilities"
          title={['World-Class Facilities', 'Supporting Every Talent']}
          titleClassName="text-4xl sm:text-5xl lg:text-[56px] text-indigo-deep mb-16 max-w-3xl"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {FACILITIES.map((fac, i) => {
            const Icon = ICON_MAP[fac.icon] || BookOpen;
            return (
              <AnimateOnScroll key={i} delay={i * 50}>
                <div className="group bg-white/60 backdrop-blur-xl border border-white/40 shadow-sm rounded-2xl p-8 flex flex-col gap-6 transition-all duration-500 hover:bg-white/80 hover:shadow-xl hover:shadow-indigo-deep/5 hover:-translate-y-1 cursor-default h-full">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold-pale to-gold/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-indigo-deep mb-3 font-bold group-hover:text-indigo transition-colors">{fac.name}</h3>
                    <p className="text-[14px] text-muted-foreground leading-relaxed font-medium">{fac.desc}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
