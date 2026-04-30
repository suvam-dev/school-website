import AnimateOnScroll from '@/components/common/AnimateOnScroll';
import SectionIntro from '@/components/common/SectionIntro';
import { FACULTY } from '@/data/schoolData';

export default function FacultySection() {
  return (
    <section className="py-20 lg:py-24 px-[5%] lg:px-[7%] bg-background">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
        <div>
          <SectionIntro
            label="Our Faculty"
            title={['Dedicated Educators,', 'Exceptional Mentors']}
            titleClassName="text-indigo-deep"
          />
        </div>
        <p className="text-base text-muted-foreground leading-relaxed max-w-[360px]">
          Our faculty brings decades of teaching experience, academic excellence, and genuine care for every child's success.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {FACULTY.map((member, i) => (
          <AnimateOnScroll key={i} delay={i * 100}>
            <div className="bg-[rgba(255,255,255,0.7)] backdrop-blur-2xl border border-white/30 shadow-md rounded-lg overflow-hidden transition-all duration-250 hover:shadow-xl hover:-translate-y-1 cursor-default">
              <div className="h-44 flex items-center justify-center relative overflow-hidden" style={{ background: member.photoBg }}>
                <div className="w-[70px] h-[70px] rounded-full bg-white/15 flex items-center justify-center font-heading text-2xl text-white font-bold border-2 border-white/25">
                  {member.initials}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-[15px] text-indigo-deep mb-1">{member.name}</h3>
                <p className="text-[12px] text-gold tracking-wide mb-2 font-semibold">{member.role}</p>
                <p className="text-[12.5px] text-muted-foreground leading-relaxed">{member.qual}</p>
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}
