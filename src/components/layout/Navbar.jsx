import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Cross } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { SCHOOL, NAV_LINKS } from '@/data/schoolData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 h-18 flex items-center justify-between px-[5%] transition-shadow duration-300
        ${scrolled ? 'bg-light-100/95 backdrop-blur-lg border-b border-white/20 shadow-lg' : 'bg-light-100/20 backdrop-blur-md shadow-lg'}`}
    >
      {/* Brand */}
      <Link to="/" className="flex items-center gap-3.5 no-underline">
        <div className="w-11 h-11 bg-indigo-deep rounded-full flex items-center justify-center shrink-0">
          <Cross className="w-5 h-5 text-gold-light" />
        </div>
        <div className="leading-tight">
          <span className="font-heading text-[15px] font-bold text-indigo-deep block">
            {SCHOOL.name}
          </span>
          <span className="text-[10px] text-gold tracking-[1.5px] uppercase">
            {SCHOOL.tagline}
          </span>
        </div>
      </Link>

      {/* Desktop links */}
      <ul className="hidden lg:flex items-center gap-8 list-none">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              to={link.href}
              className={`text-[13.5px]  font-semibold tracking-wide transition-colors no-underline
                ${location.pathname === link.href ? 'text-gold underline underline-offset-4 transition-underline hover:text-gold' : 'text-muted-foreground hover:text-gold hover:underline hover:underline-offset-4 hover:transition-underline hover:transition-colors'}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop CTA */}
      <Link to="/admissions" className="hidden lg:block">
        <Button className="bg-gradient-to-tl from-red-500 to-blue-600 shadow-lg hover:bg-gray-500 hover:text-white text-black backdrop-blur-md text-sm font-normal font-semibold px-6 py-5 transition-colors rounded-md">
          Apply Now →
        </Button>
      </Link>

      {/* Mobile menu */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-72 bg-white/90 backdrop-blur-2xl">
          <SheetTitle className="font-heading  font-bold text-lg text-indigo-deep mb-6 mt-4 px-5">
            {SCHOOL.shortName}
          </SheetTitle>
          <nav className="flex flex-col gap-4 items-center justify-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setOpen(false)}
                className={`text-sm font-medium py-2 transition-colors no-underline
                  ${location.pathname === link.href ? 'text-indigo' : 'text-muted-foreground hover:text-indigo-deep'}`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/admissions" onClick={() => setOpen(false)}>
              <Button className="w-full mt-4 bg-indigo-deep hover:bg-indigo text-white">
                Apply Now →
              </Button>
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
