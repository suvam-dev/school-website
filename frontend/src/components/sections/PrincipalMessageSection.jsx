import AnimateOnScroll from '@/components/common/AnimateOnScroll';
import SectionIntro from '@/components/common/SectionIntro';

export default function PrincipalMessageSection() {
  return (
    <section className="py-20 lg:py-24 px-[5%] lg:px-[7%] bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50/50 rounded-full blur-3xl -z-10" />

      <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Principal Image with a premium visual frame */}
        <div className="lg:col-span-5 relative group flex justify-center">
          <AnimateOnScroll>
            <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border border-indigo-deep/5 bg-indigo-deep/5 p-2">
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/30 via-transparent to-transparent z-10 rounded-[30px]" />
              <img
                src="/images/principal.png"
                alt="Br. Raphael D'Souza"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1544168190-79c17527004f?auto=format&fit=crop&q=80&w=600";
                }}
                className="w-full h-full object-cover rounded-[30px] transition-transform duration-700 group-hover:scale-105"
              />
              {/* Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-xl z-20">
                <p className="text-indigo-deep text-base font-extrabold tracking-tight">Br. Raphael D'Souza</p>
                <p className="text-gold text-xs font-bold uppercase tracking-wider mt-0.5">Principal · Holy Cross School</p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Message Content */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <AnimateOnScroll>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-gold" />
              <span className="text-xs tracking-[2px] uppercase text-gold-light font-bold">Word from the Principal</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-[44px] text-indigo-deep font-bold leading-tight mb-6">
              Nurturing Values, Shaping Futures
            </h2>
            <div className="space-y-4 text-muted-foreground text-sm md:text-base leading-relaxed max-w-[620px]">
              <p className="font-serif italic text-indigo-deep/80 text-lg mb-4">
                "Education is not merely about accumulating knowledge; it is about building the foundation of moral character and compassionate leadership."
              </p>
              <p>
                At Holy Cross School, we take pride in our 70-year-old legacy of educational excellence. Our primary mission is to guide our students toward becoming morally upright, intellectually sound, and socially responsible citizens who will positively shape the world.
              </p>
              <p>
                We welcome parents to join us on this rewarding journey of holistic development, character formation, and mutual discovery. Together, let us empower the young minds of tomorrow.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center font-serif font-bold text-lg border border-gold/20">
                ✝
              </div>
              <div>
                <p className="text-xs font-bold text-indigo-deep uppercase tracking-wider">With blessings and prayers,</p>
                <p className="text-sm font-heading font-bold text-neutral-800 mt-0.5">Br. Raphael D'Souza, Principal</p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
