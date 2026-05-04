import AboutSection from '@/components/sections/AboutSection';
import AcademicsSection from '@/components/sections/AcademicsSection';
import AdmissionsSection from '@/components/sections/AdmissionsSection';
import CampusSection from '@/components/sections/CampusSection';
import CarouselSection from '@/components/sections/CarouselSection';
import ContactSection from '@/components/sections/ContactSection';
import EventsSection from '@/components/sections/EventsSection';
import FacilitiesSection from '@/components/sections/FacilitiesSection';
import FacultySection from '@/components/sections/FacultySection';
import HeroSection from '@/components/sections/HeroSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import PrincipalMessageSection from '@/components/sections/PrincipalMessageSection';
import DownloadsSection from '@/components/sections/DownloadsSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import FaqSection from '@/components/sections/FaqSection';
import { SCHOOL } from '@/data/schoolData';

const schoolName = SCHOOL.name.trim();

export const PAGE_DEFINITIONS = [
  {
    index: true,
    sections: [
      HeroSection,
      CarouselSection,
      PrincipalMessageSection,
      AboutSection,
      AcademicsSection,
      AchievementsSection,
      TestimonialsSection,
    ],
  },
  {
    path: 'about',
    sections: [PrincipalMessageSection, AboutSection, FacultySection, AchievementsSection, TestimonialsSection],
  },
  {
    path: 'academics',
    sections: [AcademicsSection, FacilitiesSection, DownloadsSection],
  },
  {
    path: 'admissions',
    sections: [AdmissionsSection, FaqSection],
  },
  {
    path: 'campus',
    hero: {
      title: 'Our Campus',
      subtitle: `Explore the vibrant life and world-class facilities at ${schoolName} — where tradition meets modern excellence.`,
      image: '/images/campus_hero.png',
    },
    sections: [CampusSection, FacilitiesSection, AchievementsSection],
  },
  {
    path: 'events',
    sections: [EventsSection],
  },
  {
    path: 'contact',
    sections: [FaqSection, ContactSection],
  },
];
