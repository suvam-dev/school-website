import AnimateOnScroll from '@/components/common/AnimateOnScroll';
import SectionIntro from '@/components/common/SectionIntro';
import { CAMPUS } from '@/data/schoolData';

export default function CampusSection() {
  return (
    <section className="py-20 lg:py-24 px-[5%] lg:px-[7%] bg-cream-2">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-12">
        <div>
          <SectionIntro
            label="Campus Life"
            title={CAMPUS.title}
            titleClassName="text-indigo-deep"
          />
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">{CAMPUS.description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CAMPUS.cards.map((card, i) => (
          <AnimateOnScroll key={i} delay={i * 100}>
            <div
              className={`group rounded-2xl overflow-hidden relative aspect-[3/4] cursor-default transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-deep/20 ${i % 2 === 1 ? 'sm:mt-8' : ''}`}
            >
              {/* Image Background */}
              <div className="absolute inset-0">
                <img 
                  src={card.image} 
                  alt={card.cat} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep via-indigo-deep/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              </div>

              {/* Icon Overlay (Subtle) */}
              <div className="absolute top-6 right-6 text-4xl opacity-20 text-white group-hover:opacity-40 transition-opacity">
                {card.icon}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 transform transition-transform duration-500 group-hover:-translate-y-2">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-px bg-gold group-hover:w-10 transition-all" />
                  <div className="text-[10px] tracking-[2px] uppercase text-gold-light font-medium">{card.cat}</div>
                </div>
                <div className="font-heading text-xl md:text-2xl text-white whitespace-pre-line leading-tight">
                  {card.name}
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}
