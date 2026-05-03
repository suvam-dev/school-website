import { Link } from 'react-router-dom';
import { Cross } from 'lucide-react';
import { SCHOOL, FOOTER } from '@/data/schoolData';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white/50 pt-16 pb-9 px-[7%]">
      {/* Top columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
        {/* Brand column */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-indigo-deep border border-white/10 flex items-center justify-center">
              <Cross className="w-4 h-4 text-gold-light" />
            </div>
            <span className="font-heading text-sm text-white/80 font-semibold leading-tight">
              {SCHOOL.name}<br />
              {SCHOOL.location}
            </span>
          </div>
          <p className="text-[13px] leading-relaxed">{FOOTER.about}</p>
          <p className="text-xs text-gold mt-3.5">{SCHOOL.affiliation}</p>
        </div>

        {/* Link columns */}
        {FOOTER.columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs tracking-widest uppercase text-white/60 mb-5 font-semibold">
              {col.title}
            </h4>
            <ul className="flex flex-col gap-3 list-none">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-[13.5px] text-white/40 no-underline transition-colors hover:text-gold-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.07] pt-7 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-xs">
          © {new Date().getFullYear()} {SCHOOL.name}, {SCHOOL.location}. All rights reserved.
        </p>
        <div className="flex gap-6">
          {FOOTER.bottomLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-xs text-white/35 no-underline hover:text-gold-light transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/admin"
            className="text-xs text-white/35 font-medium no-underline hover:text-emerald-400 transition-colors"
          >
            Admin Portal
          </Link>
        </div>
      </div>
    </footer>
  );
}

