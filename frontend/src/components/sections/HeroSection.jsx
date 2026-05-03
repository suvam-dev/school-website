import { Link } from 'react-router-dom';
import { Cross } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SCHOOL, HERO } from '@/data/schoolData';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-indigo-deep overflow-hidden">
      {/* Geometric background */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/2 opacity-[0.04] pointer-events-none z-[1]"
        style={{
          background: 'repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(255,255,255,0.3) 60px, rgba(255,255,255,0.3) 61px)',
        }}
      />
      <div className="absolute top-1/2 right-[48%] -translate-y-1/2 opacity-[0.06] z-[1] pointer-events-none select-none">
        <Cross className="w-64 h-64 text-white" strokeWidth={0.5} />
      </div>

      <div className="relative z-[2] grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left content */}
        <div className="flex flex-col justify-center px-[6%] lg:px-[7%] py-20 lg:py-24">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-7">
            <div className="w-10 h-px bg-gold" />
            <span className="text-[11px] tracking-[2.5px] uppercase text-gold-light font-medium">
              {SCHOOL.eyebrow}
            </span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-[62px] text-white font-bold leading-[1.12] mb-5">
            {HERO.heading.line1}<br />
            <em className="text-gold-light italic">{HERO.heading.emphasis}</em> {HERO.heading.line2}
          </h1>

          <p className="text-[13px] tracking-[2px] uppercase text-white/40 mb-7">
            {SCHOOL.motto}
          </p>

          <p className="text-base text-white/65 leading-relaxed max-w-[440px] mb-12">
            {HERO.description}
          </p>

          <div className="flex gap-4 flex-wrap">
            <Link to="/admissions">
              <Button className="bg-gold hover:bg-gold-light text-indigo-deep font-semibold px-7 py-3.5 text-[13.5px] rounded-md">
                {HERO.cta.primary}
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" className="border-white/25 text-white hover:border-gold-light hover:text-gold-light bg-transparent px-7 py-3.5 text-[13.5px] rounded-md">
                {HERO.cta.secondary}
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 flex gap-10 pt-10 border-t border-white/10 flex-wrap">
            {HERO.stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-heading text-3xl sm:text-[34px] text-white font-bold">{stat.number}</div>
                <div className="text-[12px] text-white/40 tracking-wider uppercase mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right cards */}
        <div className="flex flex-col justify-end px-[6%] lg:px-[5%] pb-20 lg:pb-24 gap-4 z-[2]">
          {HERO.cards.map((card, i) => (
            <div
              key={i}
              className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl border border-white/10 rounded-lg px-7 py-6 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${200 + i * 150}ms`, animationFillMode: 'both' }}
            >
              <div className="text-[10px] tracking-[2px] uppercase text-gold-light mb-2">{card.label}</div>
              <div className="font-heading text-xl text-white">{card.value}</div>
              <div className="text-[12.5px] text-white/40 mt-1">{card.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
