import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Qognition Agency | Future-Ready Digital Marketing Solutions',
  description: 'Premier digital marketing agency offering SEO, PPC, social media marketing, web development, and AI-powered solutions. Partner with industry experts in London, New York, Dubai, and Mumbai.',
  alternates: {
    canonical: 'https://qognitionagency.com/'
  }
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center relative overflow-hidden">
        <div className="px-6 md:px-12 max-w-8xl mx-auto w-full relative z-10 pt-32 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 md:mb-10">
                <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></div>
                <span className="uppercase tracking-widest text-[10px] md:text-[11px] font-bold text-white">Global Growth Partner</span>
              </div>
              
              <h1 className="font-display text-5xl md:text-8xl lg:text-[100px] font-medium leading-[0.95] md:leading-[0.9] tracking-tight text-white mb-8 md:mb-10">
                <div>Accelerating</div>
                <div className="text-gray-500 font-light italic font-serif">digital</div>
                <div>performance.</div>
              </h1>

              <p className="text-lg md:text-2xl text-gray-300 leading-relaxed font-light mb-10 md:mb-12 max-w-2xl">
                We act as your strategic growth engine. Combining technical SEO, creative firepower, and performance marketing to dominate your category.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <Link href="/work">
                  <button className="px-8 py-4 rounded-full bg-teal-400 text-black font-display font-medium text-sm uppercase tracking-wider hover:bg-white transition-colors w-full sm:w-auto min-w-[180px]">
                    Start Work
                  </button>
                </Link>
                <a href="https://calendly.com/qognition-agency/15min" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-4 px-8 py-4 rounded-full border border-white/20 hover:border-white transition-all w-full sm:w-auto">
                  <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </div>
                  <span className="text-sm font-bold uppercase tracking-wider">Showreel</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-8xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-display font-medium mb-12">Our Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'SEO Services', desc: 'Technical SEO, on-page optimization, and content strategy to boost rankings.' },
              { title: 'PPC Advertising', desc: 'Google Ads, Meta Ads, and paid social campaigns that drive conversions.' },
              { title: 'Social Media', desc: 'Content creation, community management, and influencer partnerships.' },
              { title: 'Web Development', desc: 'Modern websites, e-commerce, and custom web applications.' },
              { title: 'AI Integration', desc: 'Machine learning, automation, and intelligent chatbots.' },
              { title: 'Content Marketing', desc: 'Strategic content that engages audiences and drives growth.' }
            ].map((service, i) => (
              <div key={i} className="p-8 border border-white/10 rounded-lg hover:border-teal-400/30 transition-colors">
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-400">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-r from-teal-900/20 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-display font-medium mb-6">Ready to grow?</h2>
          <p className="text-xl text-gray-300 mb-10">Let&apos;s discuss your digital marketing strategy.</p>
          <Link href="/contact">
            <button className="px-10 py-5 rounded-full bg-teal-400 text-black font-display font-medium text-sm uppercase tracking-wider hover:bg-white transition-colors">
              Get in Touch
            </button>
          </Link>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/919217129349"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BD5A] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.498 14.382C17.256 14.258 16.832 14.058 15.974 13.858C15.916 13.848 15.858 13.838 15.79 13.838C15.336 13.838 14.842 14.258 14.842 14.258L14.842 14.248L14.532 14.488C14.532 14.488 14.312 14.708 14.072 14.708L13.652 14.988C13.652 14.988 13.552 15.048 13.472 15.048C13.392 15.048 13.292 14.988 13.292 14.988C11.172 14.198 10.012 12.768 10.012 12.768C10.012 12.768 10.002 12.748 9.992 12.728L9.982 12.718C9.982 12.718 9.602 12.328 9.602 11.928C9.602 11.928 9.542 11.768 9.662 11.648L9.932 11.378C9.932 11.378 10.212 10.958 10.772 10.958L10.952 10.698C10.952 10.698 11.012 10.568 11.142 10.438C11.142 10.438 11.252 10.328 11.372 10.328L11.432 10.308C11.432 10.308 11.572 10.258 11.712 10.258C11.852 10.258 12.002 10.318 12.002 10.318L12.002 10.298C12.002 10.298 12.322 10.468 13.242 11.388C14.162 12.308 15.552 13.698 15.552 13.698L15.472 13.818C15.472 13.818 16.092 14.508 16.972 14.508C17.852 14.508 18.292 14.128 18.292 14.128L18.212 14.248C18.212 14.248 18.732 14.768 19.332 14.768L19.212 14.628C19.042 14.458 18.722 14.358 18.722 14.358C18.722 14.358 18.522 14.268 18.492 14.428L18.112 15.768C18.112 15.768 17.902 16.438 16.962 16.438L16.502 16.568C16.502 16.568 16.392 16.628 16.302 16.628C16.212 16.628 16.112 16.568 16.112 16.568C16.112 16.568 15.812 16.368 15.812 16.008C15.812 16.008 15.812 15.848 16.112 15.848L16.292 15.618C16.292 15.618 17.762 14.778 17.762 14.778C17.762 14.778 17.672 14.738 17.498 14.382ZM12.002 22C6.852 22 2.502 17.65 2.502 12.5C2.502 7.35 6.852 2 12.002 2C17.152 2 21.502 7.35 21.502 12.5C21.502 17.65 17.152 22 12.002 22ZM12.002 3.5C7.532 3.5 3.852 7.18 3.852 11.65C3.852 14.77 5.822 17.53 8.662 18.83L7.552 22L11.052 20.17C11.442 20.37 11.852 20.5 12.272 20.5C12.702 20.5 13.132 20.36 13.532 20.17L17.832 22L20.172 18.5C20.262 18.37 20.342 18.23 20.412 18.09C21.552 15.97 21.552 13.13 20.412 11.01C19.272 8.89 16.432 8.89 15.292 11.01L15.272 11.04C14.132 13.16 11.292 13.16 10.152 11.04C9.012 8.92 6.172 8.92 5.032 11.04L5.022 11.01C3.882 13.13 3.882 15.97 5.022 18.09L5.032 18.08C6.172 20.2 9.012 20.2 10.152 18.08L10.162 18.07C11.302 15.95 14.142 15.95 15.282 18.07L15.292 18.08C15.572 17.55 16.722 16.28 16.722 16.28C17.342 15.52 17.702 14.53 17.702 13.48C17.702 12.43 17.342 11.44 16.722 10.68L16.382 10.27C16.122 9.95 15.762 9.71 15.352 9.58L15.292 9.56C15.112 9.51 14.922 9.5 14.732 9.5C14.542 9.5 14.352 9.51 14.172 9.56L13.872 9.68C13.872 9.68 12.002 10.76 12.002 10.76L11.682 9.94C11.402 9.47 10.832 9.25 10.282 9.25L9.692 9.69C9.442 9.84 9.242 10.06 9.022 10.28L8.782 10.52C8.782 10.52 7.592 11.63 7.592 11.63L8.752 12.79C8.752 12.79 9.602 13.64 9.602 13.64L9.862 14.47C9.862 14.47 10.002 15.22 9.582 15.64C8.402 16.82 7.782 17.32 7.782 17.32L7.292 17.81C7.292 17.81 6.662 18.44 6.092 18.44L5.772 18.68C5.772 18.68 5.272 19.18 4.582 18.49C2.672 16.58 2.672 13.68 2.672 13.68L2.502 12.5L2.662 11.31C2.662 11.31 2.662 8.41 4.572 6.5L4.852 6.22L4.282 5.65C4.282 5.65 3.652 5.02 3.652 4.33L3.902 3.51C4.602 2.82 5.602 2.82 6.292 3.51L6.582 3.8C6.582 3.8 7.682 4.9 7.682 4.9L8.242 5.46C8.242 5.46 8.782 5.92 9.502 5.92L10.322 6.17C10.322 6.17 11.072 6.31 11.802 5.89L12.622 6.24C12.622 6.24 13.362 5.89 14.112 5.89C14.862 5.89 15.602 6.24 15.602 6.24L16.422 6.59C16.422 6.59 17.262 6.93 17.812 5.89L18.202 5.23C18.202 5.23 19.002 4.06 20.662 4.06C22.322 4.06 22.322 5.89 22.322 5.89L22.102 7.55C20.442 7.55 17.582 7.55 15.722 9.41L15.542 9.59C13.682 11.45 13.682 14.31 13.682 14.31C13.682 14.31 14.922 14.918 16.592 14.918C18.262 14.918 19.502 14.31 19.502 14.31L19.322 14.488C19.322 14.488 20.762 16.128 20.762 17.948C20.762 19.768 19.402 21.128 17.582 21.128C15.762 21.128 14.182 20.488 12.742 19.048L12.562 18.868C10.942 17.248 10.942 14.378 10.942 14.378C10.942 14.378 12.002 13.318 12.002 13.318L11.742 12.758C11.742 12.758 11.742 12.508 11.742 12.248C11.742 11.988 11.632 11.798 11.632 11.798L11.462 11.368C11.462 11.368 11.352 11.128 11.352 10.858C11.352 10.588 11.532 10.228 11.532 10.228L11.732 9.688C11.732 9.688 12.002 9.5 12.002 9.5L12.002 3.5Z" fill="currentColor"/>
        </svg>
        <span className="absolute right-0 top-0 w-3 h-3 bg-[#20BD5A] rounded-full border-2 border-black animate-pulse"></span>
      </a>
    </main>
  );
}
