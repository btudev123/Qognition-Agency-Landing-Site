import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/trust';

const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <div className="relative max-w-5xl mx-auto px-6 py-24">
      <div className="absolute top-0 left-6 text-teal-500/20">
        <Quote size={80} />
      </div>
      
      <div className="relative min-h-[300px] flex items-center" aria-live="polite">
        <div key={current} className="w-full">
          <p className="font-display text-2xl md:text-4xl leading-tight mb-8">
            "{TESTIMONIALS[current].quote}"
          </p>
          <div>
            <div className="font-bold text-white text-lg">{TESTIMONIALS[current].author}</div>
            <div className="text-teal-400">{TESTIMONIALS[current].role}, {TESTIMONIALS[current].company}</div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          type="button"
          onClick={prev}
          aria-label="Show previous testimonial"
          className="p-3 border border-white/10 rounded-full hover:bg-teal-400 hover:text-black hover:border-teal-400 transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Show next testimonial"
          className="p-3 border border-white/10 rounded-full hover:bg-teal-400 hover:text-black hover:border-teal-400 transition-all"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
