import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SectionIntro from '@/components/common/SectionIntro';
import { ADMISSIONS } from '@/data/schoolData';

export default function AdmissionsSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-20 lg:py-24 px-[5%] lg:px-[7%] bg-indigo-deep text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
        {/* Left — Steps */}
        <div>
          <SectionIntro
            label="Admissions"
            title={ADMISSIONS.title}
            description={ADMISSIONS.description}
            titleClassName="text-white"
            descriptionClassName="max-w-[500px] text-white/55 mb-9"
          />

          <ol className="list-none space-y-0">
            {ADMISSIONS.steps.map((step, i) => (
              <li key={i} className={`flex gap-5 pb-7 ${i < ADMISSIONS.steps.length - 1 ? 'border-b border-white/[0.08] mb-7' : ''}`}>
                <div className="w-9 h-9 rounded-full bg-gold text-indigo-deep flex items-center justify-center font-bold text-[13px] shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-heading text-[15px] text-white mb-1.5">{step.title}</h3>
                  <p className="text-[13px] text-white/50 leading-relaxed">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* Important dates */}
          <div className="mt-7 p-5 bg-gold/10 border border-gold/20 rounded-lg">
            <div className="text-[11px] tracking-[2px] uppercase text-gold-light mb-2 font-semibold">
              Important Dates 2025–26
            </div>
            <div className="text-[13.5px] text-white/65 leading-8">
              {ADMISSIONS.dates.map((d, i) => (
                <span key={i}>{d}<br /></span>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Form */}
        <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl border border-white/10 rounded-xl p-8 lg:p-10">
          <h3 className="font-heading text-[22px] text-white mb-2">Admission Enquiry</h3>
          <p className="text-[13px] text-white/40 mb-7">
            Fill in your details and we will get in touch with you shortly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[12px] tracking-wider uppercase text-white/45">Parent's Name</label>
                <Input placeholder="Full name" className="bg-white/[0.07] border-white/15 text-white placeholder:text-white/30 focus:border-gold-light" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] tracking-wider uppercase text-white/45">Mobile Number</label>
                <Input placeholder="+91 XXXXX XXXXX" className="bg-white/[0.07] border-white/15 text-white placeholder:text-white/30 focus:border-gold-light" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] tracking-wider uppercase text-white/45">Email Address</label>
              <Input type="email" placeholder="your@email.com" className="bg-white/[0.07] border-white/15 text-white placeholder:text-white/30 focus:border-gold-light" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[12px] tracking-wider uppercase text-white/45">Student's Name</label>
                <Input placeholder="Child's full name" className="bg-white/[0.07] border-white/15 text-white placeholder:text-white/30 focus:border-gold-light" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] tracking-wider uppercase text-white/45">Seeking Admission To</label>
                <Select>
                  <SelectTrigger className="bg-white/[0.07] border-white/15 text-white">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent className="bg-indigo-deep border-white/15">
                    {ADMISSIONS.classOptions.map((opt) => (
                      <SelectItem key={opt} value={opt} className="text-white hover:bg-white/10">{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] tracking-wider uppercase text-white/45">Religion / Community</label>
              <Select>
                <SelectTrigger className="bg-white/[0.07] border-white/15 text-white">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-indigo-deep border-white/15">
                  {ADMISSIONS.communityOptions.map((opt) => (
                    <SelectItem key={opt} value={opt} className="text-white hover:bg-white/10">{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] tracking-wider uppercase text-white/45">Message (optional)</label>
              <Input placeholder="Any specific query or information" className="bg-white/[0.07] border-white/15 text-white placeholder:text-white/30 focus:border-gold-light" />
            </div>

            <Button
              type="submit"
              className="w-full bg-gold hover:bg-gold-light text-indigo-deep font-semibold py-3 mt-2"
            >
              {submitted ? '✓ Enquiry Submitted!' : 'Submit Enquiry →'}
            </Button>

            <p className="text-[11.5px] text-white/25 text-center mt-3">
              Admissions are open to students of all faiths · RTE seats available
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
