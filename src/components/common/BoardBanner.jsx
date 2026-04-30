import { BOARD_ITEMS } from '@/data/schoolData';
import { Separator } from '@/components/ui/separator';

export default function BoardBanner() {
  return (
    <div className="mt-18 bg-gold-pale/70 backdrop-blur-lg border-y border-gold/15 py-4 px-[5%]
      flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
      {BOARD_ITEMS.map((item, i) => (
        <div key={i} className="contents">
          {i > 0 && (
            <Separator orientation="vertical" className="h-6 bg-gold/20 hidden sm:block" />
          )}
          <div className="flex items-center gap-2.5">
            <span className="text-lg">{item.icon}</span>
            <span className="text-[12px] sm:text-[13px] text-indigo-deep font-semibold tracking-wide">
              {item.text}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
