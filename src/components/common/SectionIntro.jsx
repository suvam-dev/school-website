import { Fragment } from 'react';
import SectionLabel from '@/components/common/SectionLabel';
import { cn } from '@/lib/utils';

/**
 * Shared section heading block used across landing-page sections.
 * Keeps label/title/description styling consistent in one place.
 */
export default function SectionIntro({
  label,
  title,
  description,
  center = false,
  className,
  titleClassName,
  descriptionClassName,
}) {
  const titleLines = Array.isArray(title)
    ? title
    : [title?.line1, title?.line2].filter(Boolean);

  return (
    <div className={cn(center && 'text-center', className)}>
      <SectionLabel label={label} center={center} />
      <h2
        className={cn(
          'font-heading text-3xl sm:text-4xl lg:text-[42px] leading-tight',
          center && 'mx-auto',
          titleClassName
        )}
      >
        {titleLines.map((line, index) => (
          <Fragment key={`${line}-${index}`}>
            {index > 0 && <br />}
            {line}
          </Fragment>
        ))}
      </h2>
      {description ? (
        <p
          className={cn(
            'mt-5 text-base leading-relaxed',
            center && 'mx-auto',
            descriptionClassName
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
