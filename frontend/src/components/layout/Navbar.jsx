import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Cross } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { SCHOOL, NAV_LINKS } from '@/data/schoolData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 h-20 flex items-center justify-between px-[5%] transition-all duration-500
        ${scrolled ? 'bg-indigo-deep/95 backdrop-blur-xl border-b border-indigo-deep/10 shadow-xl' : 'bg-transparent'}`}
    >
      {/* 1. BRAND / LOGO (Left) */}
      <Link to="/" className="flex items-center gap-3.5 no-underline group">
        <div className="w-12 h-12 bg-indigo-deep border border-white/20 rounded-full flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-all duration-300">
          <Cross className="w-5 h-5 text-gold-light" />
        </div>
        <div className="leading-tight">
          <span className={`font-heading text-base md:text-lg font-black block tracking-tight transition duration-300 ${scrolled ? 'text-white' : 'text-indigo-deep'}`}>
            {SCHOOL.name}
          </span>
          <span className={`text-[10px] tracking-[2px] font-bold uppercase transition duration-300 ${scrolled ? 'text-gold-light' : 'text-gold'}`}>
            {SCHOOL.tagline}
          </span>
        </div>
      </Link>

      {/* 2. DESKTOP CENTER NAVIGATION PILL ("Liquid Glass" effect) */}
      <div className="hidden lg:flex items-center bg-white/25 backdrop-blur-2xl border border-white/35 px-8 py-2.5 rounded-full shadow-lg gap-8 list-none transition duration-300 hover:bg-white/35 hover:border-white/45">
        {NAV_LINKS.map((link) => {
          const isActive = location.pathname === link.href;
          return (
            <Link
              key={link.href}
              to={link.href}
              className={`text-[13.5px] font-bold tracking-wide transition duration-300 no-underline px-3 py-1 rounded-full flex items-center justify-center
                ${isActive 
                  ? 'text-indigo-deep bg-white/50 font-black shadow-sm' 
                  : 'text-indigo-deep/75 hover:text-indigo-deep hover:bg-white/20'
                }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* 3. DESKTOP CTA BUTTON ("Gradient icon" style) */}
      <Link to="/admissions" className="hidden lg:block">
        <Button className="bg-gradient-to-r from-indigo-deep via-indigo-900 to-indigo-deep border border-indigo-deep/10 hover:from-indigo-deep hover:to-indigo-deep font-extrabold text-white text-xs uppercase tracking-wider px-6 py-5 h-11 rounded-full shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 transform hover:-translate-y-0.5 select-none">
          Apply Now →
        </Button>
      </Link>

      {/* 4. MOBILE MENU & SHEET TRIGGER (Hamburger icon on Right) */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="lg:hidden select-none">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 active:bg-white/15 cursor-pointer rounded-full p-2">
            {open ? (
              <X className={`w-6 h-6 ${scrolled ? 'text-white' : 'text-indigo-deep'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${scrolled ? 'text-white' : 'text-indigo-deep'}`} />
            )}
          </Button>
        </SheetTrigger>

        {/* 5. MOBILE EXPANDED NAVIGATION ("Liquid Glass (Grayish)" effect) */}
        <SheetContent side="right" className="w-80 bg-slate-100/90 backdrop-blur-2xl border-l border-white/30 p-6 flex flex-col justify-between shadow-2xl">
          <div className="flex flex-col h-full justify-between">
            <div>
              <SheetTitle className="font-heading font-black text-xl text-indigo-deep mt-4 tracking-tight px-1 flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-deep text-gold rounded-full flex items-center justify-center font-bold text-xs">✝</div>
                <span>{SCHOOL.shortName}</span>
              </SheetTitle>
              <p className="text-xs text-muted-foreground mt-1 mb-8 px-1">Where tradition meets modern learning</p>
              
              {/* Vertical Menu Container with Liquid Glass (Grayish) */}
              <nav className="bg-slate-900/5 backdrop-blur-lg border border-slate-900/10 p-5 rounded-3xl flex flex-col gap-1.5 shadow-xl">
                {NAV_LINKS.map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setOpen(false)}
                      className={`text-sm font-bold tracking-normal px-5 py-3 rounded-xl transition duration-300 no-underline flex items-center justify-between
                        ${isActive 
                          ? 'bg-indigo-deep text-white font-extrabold shadow-md transform translate-x-1' 
                          : 'text-indigo-deep hover:bg-slate-900/10 hover:text-indigo-deep'
                        }`}
                    >
                      <span>{link.label}</span>
                      {isActive && <span className="text-gold">●</span>}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <Link to="/admissions" onClick={() => setOpen(false)} className="no-underline select-none">
              <Button className="w-full mt-6 bg-indigo-deep hover:bg-indigo text-white font-bold h-12 rounded-xl text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2">
                Apply Now <span className="text-gold-light font-black text-sm">→</span>
              </Button>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
