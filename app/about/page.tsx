import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Qognition Agency',
  description: 'Learn about Qognition Agency. Our team, mission, and approach to digital marketing.',
  alternates: {
    canonical: 'https://qognitionagency.com/about'
  }
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-8xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-display font-medium mb-8">About Qognition</h1>
        <p className="text-xl text-gray-300 max-w-3xl mb-16">
          We are a premier digital marketing agency combining technical SEO, creative firepower, and performance marketing to help brands dominate their categories.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-teal-400">Our Mission</h2>
            <p className="text-gray-300">
              To engineer the digital infrastructure of the future, enabling ambitious brands to dominate their categories through AI, speed, and aesthetic precision.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-teal-400">Our Vision</h2>
            <p className="text-gray-300">
              A world where marketing is autonomous, beautiful, and hyper-personalized.
            </p>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-display font-medium mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Radical Transparency', desc: 'No black boxes. We share our code, our data, and our logic.' },
              { title: 'Speed as a Habit', desc: 'We move faster than the market. Velocity is our primary currency.' },
              { title: 'Aesthetic Integrity', desc: 'Performance without beauty is spam. We refuse to ship ugly code.' },
              { title: 'Data Sovereignty', desc: 'Your data is your asset. We build systems that you own and control.' }
            ].map((value, i) => (
              <div key={i} className="p-6 border border-white/10 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-teal-400">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-display font-medium mb-8">Our Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Full-Time Experts', value: '120+' },
              { label: 'Revenue Generated', value: '$500M+' },
              { label: 'Global Hubs', value: '12' },
              { label: 'Client Retention', value: '94%' }
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 border border-white/10 rounded-lg">
                <div className="text-4xl font-display font-bold text-teal-400 mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
