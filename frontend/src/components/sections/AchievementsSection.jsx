import { Trophy, Award, GraduationCap, Star } from 'lucide-react';
import AnimateOnScroll from '@/components/common/AnimateOnScroll';

const ACHIEVEMENTS = [
  {
    category: 'Board Toppers',
    title: '100% Academic Excellence',
    desc: 'Our senior secondary students secured excellent results with multiple state-wide board exam toppers this year.',
    icon: GraduationCap,
    label: '98.8% Highest Score'
  },
  {
    category: 'Sports & Arts',
    title: 'Extra-Curricular Champions',
    desc: 'Our teams took home gold trophies at the state-level inter-school football championship and youth music competitions.',
    icon: Trophy,
    label: 'Gold Medals'
  },
  {
    category: 'Distinguished Alumni',
    title: 'Making Us Proud Globally',
    desc: 'Former students have successfully joined top-tier global research institutes, universities, and administrative services.',
    icon: Award,
    label: 'Global Network'
  }
];

export default function AchievementsSection() {
  return (
    <section className="py-20 lg:py-24 px-[5%] lg:px-[7%] bg-indigo-deep relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-[2px] text-gold uppercase">Celebrating Success</span>
          <h2 className="font-heading text-3xl md:text-4xl text-white font-bold mt-2 mb-4">
            Student Achievements & Alumni Pride
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-sm leading-relaxed">
            Honouring academic stars, sports champions, and high-achieving alumni who define our 70-year legacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ACHIEVEMENTS.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <AnimateOnScroll key={index} delay={index * 150}>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-gold/30 rounded-3xl p-6 md:p-8 flex flex-col justify-between h-full shadow-lg hover:-translate-y-1 transition duration-300">
                  <div>
                    <div className="w-12 h-12 bg-gold/10 text-gold rounded-2xl flex items-center justify-center shrink-0 border border-gold/20 mb-6">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <span className="text-xs font-bold tracking-wider text-gold uppercase">{item.category}</span>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-300 bg-emerald-950/60 border border-emerald-800/30 px-2.5 py-0.5 rounded-full">
                        {item.label}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg md:text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-white/50 text-xs md:text-sm leading-relaxed mb-6">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center gap-2">
                    <Star className="w-4 h-4 text-gold fill-gold" />
                    <span className="text-[11px] font-bold tracking-wider text-white/40 uppercase">Holy Cross Excellence</span>
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
