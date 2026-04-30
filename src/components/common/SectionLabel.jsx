/**
 * Reusable section label: thin gold line + uppercase label text.
 * @param {{ label: string, center?: boolean }} props
 */
export default function SectionLabel({ label, center = false }) {
  return (
    <div className={`flex items-center gap-3 mb-4 ${center ? 'justify-center' : ''}`}>
      <div className="w-8 h-[1.5px] bg-gold" />
      <span className="text-[11px] tracking-[2.5px] uppercase text-gold font-semibold">
        {label}
      </span>
      {center && <div className="w-8 h-[1.5px] bg-gold" />}
    </div>
  );
}
