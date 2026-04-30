import SubHero from '@/components/layout/SubHero';

export default function PageRenderer({ hero, sections }) {
  return (
    <>
      {hero ? <SubHero {...hero} /> : null}
      {sections.map((Section, index) => (
        <Section key={Section.name || index} />
      ))}
    </>
  );
}
