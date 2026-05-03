import AnimateOnScroll from '@/components/common/AnimateOnScroll';
import SectionIntro from '@/components/common/SectionIntro';
import { TESTIMONIALS } from '@/data/schoolData';

export default function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-24 px-[5%] lg:px-[7%] bg-cream-2">
      <div className="text-center mb-12">
        <SectionIntro
          label="Alumni Speak"
          title={['Voices from Our', 'School Family']}
          center
          titleClassName="text-indigo-deep"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {TESTIMONIALS.map((test, i) => (
          <AnimateOnScroll key={i} delay={i * 120}>
            <div className="bg-[rgba(255,255,255,0.7)] backdrop-blur-2xl border border-white/30 shadow-md rounded-lg p-8 relative cursor-default h-full">
              {/* Decorative quote */}
              <span className="font-heading text-7xl text-indigo-pale absolute -top-2.5 left-5 leading-none pointer-events-none select-none">
                &ldquo;
              </span>
              <p className="text-[14.5px] text-muted-foreground leading-relaxed mb-6 pt-3 relative z-[1]">
                {test.text}
              </p>
              <div className="flex items-center gap-3.5">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-heading text-base text-white"
                  style={{ background: test.avatarBg }}
                >
                  {test.name.split(' ').map(w => w[0]).join('')}
                </div>
                <div>
                  <div className="font-heading text-sm text-indigo-deep">{test.name}</div>
                  <div className="text-[12px] text-muted-foreground mt-0.5">{test.batch}</div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}
