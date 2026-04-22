import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <div className="relative max-w-5xl mx-auto px-6 py-24">
      <div className="absolute top-0 left-6 text-teal-500/20">
        <Quote size={80} />
      </div>
      
      <div className="relative min-h-[300px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <p className="font-display text-2xl md:text-4xl leading-tight mb-8">
              "{TESTIMONIALS[current].quote}"
            </p>
            <div>
              <div className="font-bold text-white text-lg">{TESTIMONIALS[current].author}</div>
              <div className="text-teal-400">{TESTIMONIALS[current].role}, {TESTIMONIALS[current].company}</div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-4 mt-8">
        <button onClick={prev} className="p-3 border border-white/10 rounded-full hover:bg-teal-400 hover:text-black hover:border-teal-400 transition-all">
          <ChevronLeft size={20} />
        </button>
        <button onClick={next} className="p-3 border border-white/10 rounded-full hover:bg-teal-400 hover:text-black hover:border-teal-400 transition-all">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Testimonials;