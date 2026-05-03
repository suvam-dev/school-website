import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY } from '@/data/schoolData';
import { supabase } from '@/lib/supabase';

export default function CarouselSection() {
  const [carouselItems, setCarouselItems] = useState(GALLERY);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );

  const fetchCarouselImages = async () => {
    try {
      const { data, error } = await supabase
        .from('carousel_images')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      if (data && data.length > 0) {
        setCarouselItems(data);
      } else {
        setCarouselItems(GALLERY);
      }
    } catch (err) {
      console.warn('Could not fetch carousel images, falling back to static GALLERY:', err);
      setCarouselItems(GALLERY);
    }
  };

  useEffect(() => {
    fetchCarouselImages();
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="relative w-full overflow-hidden bg-indigo-deep py-16 md:py-28">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-5 md:px-[6%]">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 md:mb-16 gap-6">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-px bg-gold" />
              <span className="text-xs tracking-[2.5px] uppercase text-gold-light font-medium">
                Campus Tour
              </span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-[56px] text-white font-bold leading-tight">
              Discover Our Spaces
            </h2>
          </div>

          <div className="hidden md:flex gap-4">
            <button
              onClick={scrollPrev}
              className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-indigo-deep transition-all duration-300 hover:scale-105 active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" strokeWidth={1.5} />
            </button>
            <button
              onClick={scrollNext}
              className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-indigo-deep transition-all duration-300 hover:scale-105 active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex touch-pan-y -ml-4 md:-ml-8">
            {carouselItems.map((item, index) => (
              <div
                className="embla__slide flex-[0_0_90%] sm:flex-[0_0_80%] lg:flex-[0_0_65%] min-w-0 pl-4 md:pl-8"
                key={index}
              >
                <div className="relative rounded-2xl md:rounded-[32px] overflow-hidden aspect-[4/3] md:aspect-[16/9] group shadow-2xl border border-white/5">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500 z-10" />
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-20 opacity-90" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-30 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 drop-shadow-md">
                      {item.alt}
                    </h3>
                    {item.caption && (
                      <p className="text-white/85 text-sm md:text-base lg:text-lg max-w-xl leading-relaxed drop-shadow">
                        {item.caption}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden justify-center gap-4 mt-10">
          <button
            onClick={scrollPrev}
            className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-indigo-deep transition-colors active:scale-95"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-indigo-deep transition-colors active:scale-95"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
