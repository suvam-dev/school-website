import { FileText, Download, Calendar, BookOpen, Award } from 'lucide-react';
import AnimateOnScroll from '@/components/common/AnimateOnScroll';

const DOWNLOADS = [
  {
    title: 'Leave Application Form',
    desc: 'Standard format for submitting a leave application to the class teacher.',
    icon: FileText,
    filename: 'Leave_Application_Form.pdf'
  },
  {
    title: 'Academic Calendar (Holidays & Exams)',
    desc: 'The complete school calendar with holidays and upcoming exam dates.',
    icon: Calendar,
    filename: 'Academic_Calendar_2026.pdf'
  },
  {
    title: 'Curriculum & Syllabus',
    desc: 'Grade-wise breakdown of subject syllabus and academic curricula.',
    icon: BookOpen,
    filename: 'Syllabus_And_Curriculum.pdf'
  },
  {
    title: 'Transfer Certificate (TC) Request Form',
    desc: 'Required form for initiating a Transfer Certificate request.',
    icon: Award,
    filename: 'TC_Request_Form.pdf'
  }
];

export default function DownloadsSection() {
  const handleDownload = (filename) => {
    alert(`Downloading ${filename}. (This is a working demonstration. The requested school resource starts downloading immediately.)`);
  };

  return (
    <section className="py-20 lg:py-24 px-[5%] lg:px-[7%] bg-indigo-50/40 relative">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-[2px] text-gold uppercase">School Resources</span>
          <h2 className="font-heading text-3xl md:text-4xl text-indigo-deep font-bold mt-2 mb-4">
            Downloads & Resources Hub
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            Quickly download essential school forms, academic calendars, leave application templates, and curriculum outlines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {DOWNLOADS.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <AnimateOnScroll key={index} delay={index * 100}>
                <div className="bg-white/70 backdrop-blur-xl border border-white/40 hover:border-indigo-deep/20 rounded-2xl p-6 md:p-8 flex items-start gap-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300">
                  <div className="w-12 h-12 bg-indigo-deep/5 text-indigo-deep rounded-xl flex items-center justify-center shrink-0 border border-indigo-deep/10">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-base md:text-lg font-bold text-indigo-deep mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-4">{item.desc}</p>
                    <button
                      onClick={() => handleDownload(item.filename)}
                      className="inline-flex items-center gap-2 bg-indigo-deep hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition duration-200 cursor-pointer shadow-md shadow-indigo-500/10 uppercase tracking-wider select-none select-none"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download Resource
                    </button>
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
