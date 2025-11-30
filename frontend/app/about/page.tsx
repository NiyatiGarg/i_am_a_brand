import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me | Personal Brand Website',
  description: 'Learn more about my journey as a Frontend Developer, Fitness enthusiast, and Dance & Music creator',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-12 text-center">About Me</h1>

          {/* Biography Section */}
          <section className="card mb-8">
            <h2 className="text-3xl font-bold mb-4">Biography</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to my personal brand website! I'm a passionate Frontend Developer with a love for
              creating beautiful, functional web experiences. Beyond coding, I'm deeply involved in fitness,
              wellness, dance, and music - all of which shape who I am as a person and professional.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This website is a reflection of my journey, showcasing my work, thoughts, and creative pursuits.
              I believe in continuous learning, staying active, and expressing creativity in all forms.
            </p>
          </section>

          {/* Profession Section */}
          <section className="card mb-8">
            <h2 className="text-3xl font-bold mb-4">Profession</h2>
            <h3 className="text-2xl font-semibold mb-3 text-primary-600">Frontend Developer</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              As a Frontend Developer, I specialize in building modern, responsive web applications using
              cutting-edge technologies like React, Next.js, and TypeScript. I'm passionate about creating
              user-friendly interfaces that are both beautiful and functional.
            </p>
            <p className="text-gray-700 leading-relaxed">
              My expertise includes:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2 text-gray-700">
              <li>React & Next.js development</li>
              <li>TypeScript & modern JavaScript</li>
              <li>Tailwind CSS & responsive design</li>
              <li>State management & API integration</li>
              <li>Performance optimization</li>
            </ul>
          </section>

          {/* Creative Identity Section */}
          <section className="card mb-8">
            <h2 className="text-3xl font-bold mb-4">Creative Identity</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-3 text-primary-600">Dance & Singing</h3>
                <p className="text-gray-700 leading-relaxed">
                  Dance and music have always been integral parts of my life. I express myself through
                  movement and song, finding joy and freedom in creative expression. Whether it's choreographing
                  routines or singing covers, these art forms allow me to connect with myself and others on a
                  deeper level.
                </p>
              </div>
            </div>
          </section>

          {/* Fitness & Wellness Section */}
          <section className="card mb-8">
            <h2 className="text-3xl font-bold mb-4">Fitness & Wellness</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Fitness is not just about physical health for me - it's a lifestyle. I believe in maintaining a
              balanced approach to wellness that includes regular exercise, proper nutrition, and mental
              well-being. My fitness journey has taught me discipline, perseverance, and the importance of
              taking care of my body and mind.
            </p>
            <p className="text-gray-700 leading-relaxed">
              I enjoy various forms of exercise including strength training, cardio, yoga, and dance-based
              workouts. Staying active helps me stay focused, energized, and ready to tackle challenges both in
              and out of the gym.
            </p>
          </section>

          {/* Blogging Journey Section */}
          <section className="card mb-8">
            <h2 className="text-3xl font-bold mb-4">Blogging & Skincare Website Journey</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              I've always been passionate about sharing knowledge and experiences. Through blogging, I've
              found a platform to document my journey, share insights, and connect with like-minded
              individuals.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              One of my notable projects is the Skincare AI Website - a platform that combines my technical
              skills with my interest in skincare and wellness. This project showcases how technology can be
              used to provide personalized recommendations and valuable information to users.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Blogging has allowed me to explore topics ranging from web development to fitness, lifestyle, and
              personal growth. It's a space where I can be authentic, share my learnings, and hopefully
              inspire others on their own journeys.
            </p>
          </section>

          {/* Photo Gallery Placeholder */}
          <section className="card">
            <h2 className="text-3xl font-bold mb-4">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center"
                >
                  <span className="text-gray-400">Photo {i}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

