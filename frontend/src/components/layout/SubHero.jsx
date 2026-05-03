import { SCHOOL } from '@/data/schoolData';

/**
 * Premium SubHero component for internal pages.
 * @param {string} title - Page title
 * @param {string} subtitle - Optional subtitle
 * @param {string} image - Background image URL
 */
export default function SubHero({ title, subtitle, image }) {
  return (
    <section className="relative h-[40vh] md:h-[50vh] min-h-[300px] flex items-center overflow-hidden bg-indigo-deep">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover opacity-40 scale-105 animate-in fade-in zoom-in-110 duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep via-indigo-deep/40 to-transparent" />
      </div>

      <div className="relative z-10 px-[5%] lg:px-[7%] w-full">
        <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-px bg-gold" />
            <span className="text-[11px] tracking-[2.5px] uppercase text-gold-light font-medium">
              {SCHOOL.shortName} · Excellence
            </span>
          </div>
          
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-4">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      
      {/* Bottom border decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
    </section>
  );
}
