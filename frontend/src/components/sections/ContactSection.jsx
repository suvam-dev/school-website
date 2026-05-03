import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SectionIntro from '@/components/common/SectionIntro';
import { CONTACT } from '@/data/schoolData';
import { supabase } from '@/lib/supabase';

const Facebook = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const Instagram = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>;
const Youtube = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>;
const Twitter = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>;

const SOCIAL_ICONS = {
  Facebook,
  Instagram,
  YouTube: Youtube,
  Twitter,
};

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !message) return;

    try {
      const { error } = await supabase
        .from('inquiries')
        .insert([{ name, phone, subject, message }]);

      if (!error) {
        setSent(true);
        setName('');
        setPhone('');
        setSubject('General');
        setMessage('');
        setTimeout(() => setSent(false), 3000);
      }
    } catch (err) {
      console.error('Failed to submit message to the backend.', err);
    }
  };

  return (
    <section className="py-20 lg:py-24 px-[5%] lg:px-[7%] bg-indigo-deep">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-20 items-start">
        {/* Left — Info */}
        <div>
          <SectionIntro
            label="Contact Us"
            title={["We'd Love to", 'Hear from You']}
            description="Visit us, call us, or write to us. Our admissions office is open Monday-Saturday, 9:00 AM to 4:00 PM."
            titleClassName="text-white"
            descriptionClassName="max-w-[420px] text-white/50 mb-10"
          />

          <div className="space-y-8">
            <ContactBlock icon={MapPin} label="Address" lines={CONTACT.address} />
            <ContactBlock icon={Phone} label="Phone" lines={CONTACT.phone} />
            <ContactBlock icon={Mail} label="Email" lines={CONTACT.email} />
            <ContactBlock icon={Clock} label="School Timing" lines={CONTACT.timing} />
          </div>

          {/* Social */}
          <div className="flex gap-3.5 mt-10">
            {CONTACT.social.map((s) => {
              const Icon = SOCIAL_ICONS[s.label] || Facebook;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  title={s.label}
                  className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white/45 hover:border-gold hover:text-gold transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Right — Map + Quick form */}
        <div className="space-y-4">
          {/* Map placeholder */}
          <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
            <div className="h-60 border-b border-white/[0.08]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14674.153920677114!2d88.27137357457782!3d23.15061614742512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f8f26b5c3e7bdf%3A0x64cf27e4e13e8b0b!2sPandua%2C%20West%20Bengal%20712146!5e0!3m2!1sen!2sin!4v1704200000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location - Pandua, West Bengal"
              ></iframe>
            </div>
            <div className="grid grid-cols-2 gap-5 p-6">
              {Object.values(CONTACT.map).map((item, i) => (
                <div key={i}>
                  <div className="text-[11px] tracking-widest uppercase text-white/30 mb-1">{item.label}</div>
                  <div className="text-[13.5px] text-white/65 leading-relaxed whitespace-pre-line">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick form */}
          <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl border border-white/10 rounded-xl p-7">
            <h3 className="font-heading text-base text-white mb-5">Send a Quick Message</h3>
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="text-[12px] tracking-wider uppercase text-white/45">Name</label>
                  <Input 
                    placeholder="Your name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white/[0.07] border-white/15 text-white placeholder:text-white/30 focus:border-gold-light" 
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[12px] tracking-wider uppercase text-white/45">Phone</label>
                  <Input 
                    placeholder="+91 XXXXX" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-white/[0.07] border-white/15 text-white placeholder:text-white/30 focus:border-gold-light" 
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[12px] tracking-wider uppercase text-white/45">Direct Your Message To</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-white/[0.07] border border-white/15 text-white/80 rounded-lg h-10 px-3 text-sm focus:outline-none focus:border-gold-light transition duration-200"
                  required
                >
                  <option value="General" className="bg-indigo-deep text-white">General Information</option>
                  <option value="Admissions" className="bg-indigo-deep text-white">Admissions & Enrolment</option>
                  <option value="Academics" className="bg-indigo-deep text-white">Academics & Curriculum</option>
                  <option value="Direct to Principal" className="bg-indigo-deep text-white">Direct to Principal</option>
                  <option value="Parents Complaint / Grievance" className="bg-indigo-deep text-white">Parents Complaint / Grievance</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[12px] tracking-wider uppercase text-white/45">Message</label>
                <Input 
                  placeholder="How can we help you?" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-white/[0.07] border-white/15 text-white placeholder:text-white/30 focus:border-gold-light" 
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-gold hover:bg-gold-light text-indigo-deep font-bold">
                {sent ? '✓ Message Sent!' : 'Send Message →'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactBlock({ icon: Icon, label, lines }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-3.5 h-3.5 text-gold-light" />
        <span className="text-[10px] tracking-[2px] uppercase text-gold-light">{label}</span>
      </div>
      <div className="text-[15px] text-white/75 leading-relaxed">
        {lines.map((line, i) => (
          <span key={i}>{line}<br /></span>
        ))}
      </div>
    </div>
  );
}
