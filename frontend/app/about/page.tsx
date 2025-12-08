'use client';

import type { Metadata } from "next";
import Image from "next/image";
import { useState } from "react";

import featurePic from "./NiyatiGarg.jpeg";
import bikeride from "./bikeride.jpeg";
import work from "./work.jpeg";
import gym from "./gym.jpeg";
import foodie from "./foodie.jpeg";
import cake from "./cake.jpeg";
import fitness from "./fitness.jpeg";
import bike2 from "./bike2.jpeg";

const gallery=[bikeride, work, fitness, foodie, cake, gym, bike2 ];

export default function AboutPage() {
  const [expandedSections, setExpandedSections] = useState({
    creative: false,
    fitness: false,
    blogging: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left: Main content */}
          <main className="lg:col-span-2">
            <header className="mb-8">
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
                About Me
              </h1>
              <p className="text-gray-600 max-w-3xl">
                Frontend Developer · Creative Maker · Fitness Enthusiast — I
                build delightful web experiences, write about what I care about,
                and move through life with music and motion.
              </p>
            </header>

            <section className="bg-white shadow-sm rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-3">Biography</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to my personal brand website! I'm a passionate Frontend
                Developer who loves creating beautiful and functional web
                experiences. Beyond coding, I'm someone who lives a very full,
                expressive life — fitness, wellness, dance, music, and even
                biking are all a big part of who I am. I'm not perfect, but I do
                a little bit of everything — a true one-man army kind of person.
                I believe in staying active, learning continuously, and
                expressing creativity in every form I can. This website reflects
                my journey, my work, and the many things that make me me.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This website is a reflection of my journey, showcasing my work,
                thoughts, and creative pursuits. I believe in continuous
                learning, staying active, and expressing creativity in all
                forms.
              </p>
            </section>

            <section className="bg-white shadow-sm rounded-lg p-6 mb-6">
              <h2 className="text-3xl font-bold mb-4">Profession</h2>
              <h3 className="text-2xl font-semibold mb-3 text-primary-600">
                Frontend Developer
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                As a Frontend Developer, I specialize in building modern,
                responsive web applications using cutting-edge technologies
                like React, Next.js, and Bootstrap. I'm passionate about
                creating user-friendly interfaces that are both beautiful and
                functional.
              </p>
              <p className="text-gray-700 leading-relaxed">
                My expertise includes:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-2 text-gray-700">
                <li>React & Next.js development</li>
                <li>TypeScript & modern JavaScript</li>
                <li>SCSS, Bootstrap, Tailwind CSS & responsive design</li>
                <li>
                  State management (Context API, Redux basics) & API
                  integration
                </li>
                <li>Firebase Authentication & Realtime Database</li>
                <li>Performance optimization & best practices</li>
                <li>
                  Prompt Engineering — crafting effective prompts for
                  AI-driven workflows and automation
                </li>
              </ul>
            </section>

            <section className="bg-white shadow-sm rounded-lg p-6 mb-6">
              <h2 className="text-3xl font-bold mb-4">Creative Identity</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-3 text-primary-600">
                    Dance, Singing & Bike Riding
                  </h3>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      expandedSections.creative ? "max-h-full" : "max-h-32"
                    }`}
                  >
                    <p className="text-gray-700 leading-relaxed">
                      Dance and music have always been integral parts of my
                      life. I express myself through movement and song, finding
                      joy and freedom in creative expression. Whether I'm
                      choreographing routines, singing covers, or working
                      closely with music to create something new, these art
                      forms help me connect with myself and others on a deeper
                      level.
                      <br /> <br />
                      I even code while listening to music — it keeps me
                      focused, inspired, and in my flow. And when I need a
                      different kind of freedom, I hop on my bike. Riding gives
                      me clarity, peace, and a sense of adventure that balances
                      both my creative and technical sides.
                      <br /> <br />
                      No matter if I'm happy or sad, I can dance, sing, or ride
                      even on my lowest "cry day." It's my way of healing,
                      celebrating, and staying true to who I am.
                    </p>
                  </div>
                  <button
                    onClick={() => toggleSection("creative")}
                    className="mt-4 text-primary-600 hover:text-primary-700 font-semibold text-sm bg-transparent border-none cursor-pointer "
                  >
                    {expandedSections.creative ? "Read Less" : "Read More"}
                  </button>
                </div>
              </div>
            </section>

            <section className="bg-white shadow-sm rounded-lg p-6 mb-6">
              <h2 className="text-3xl font-bold mb-4">
                Fitness & Wellness Philosophy
              </h2>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedSections.fitness ? "max-h-full" : "max-h-32"
                }`}
              >
                <p className="text-gray-700 leading-relaxed mb-4">
                  Fitness isn't just about physical health for me — it's a
                  lifestyle. I believe in maintaining a balanced, holistic
                  approach to wellness that includes regular exercise, proper
                  nutrition, mental clarity, and consistent self-care. My fitness
                  journey has taught me discipline, perseverance, and the
                  importance of taking care of both my body and mind.
                  <br /> <br />
                  I enjoy various forms of movement, including strength training,
                  cardio, yoga, and dance-based workouts. Staying active keeps me
                  focused, energized, and ready to take on challenges both inside
                  and outside the gym.
                  <br /> <br />
                  Along with workouts, I strongly believe in natural habits that
                  enhance overall well-being — from herbal teas and clean eating
                  to mindful breathing practices. Just a few days ago, I had
                  congestion and throat discomfort, and instead of medication, I
                  turned to Bhramari Pranayama. I've read a lot about it,
                  especially its scientific side: the humming vibration stimulates
                  the vagus nerve, calms the nervous system, and increases nitric
                  oxide production, which helps open nasal passages and relieve
                  sinus pressure.
                  <br /> <br />I believed in its power, practiced it, and cured
                  myself naturally. Moments like these remind me how aligned I am
                  with my body — and honestly, I feel like my brain works more
                  sharply and creatively than most people because of these
                  practices.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  I enjoy various forms of exercise including strength training,
                  cardio, yoga, and dance-based workouts. Staying active helps me
                  stay focused, energized, and ready to tackle challenges both in
                  and out of the gym.
                </p>
              </div>
              <button
                onClick={() => toggleSection("fitness")}
                className="mt-4 text-primary-600 hover:text-primary-700 font-semibold text-sm bg-transparent border-none cursor-pointer"
              >
                {expandedSections.fitness ? "Read Less" : "Read More"}
              </button>
            </section>

            <section className="bg-white shadow-sm rounded-lg p-6 mb-6">
              <h2 className="text-3xl font-bold mb-4">
                Blogging & Skincare Website Journey
              </h2>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedSections.blogging ? "max-h-full" : "max-h-32"
                }`}
              >
                <p className="text-gray-700 leading-relaxed mb-4">
                  I've been into content writing since my college days, and over
                  time it naturally grew into a passion. I write whenever
                  something interests me — whether it's skincare, lifestyle,
                  fitness, food, or tech. My strong curiosity for skincare and
                  wellness even led me to build my own Skincare AI Website, a
                  space where I share well-researched insights and useful
                  information. Now, this website brings all my blogs together in
                  one place — organized, personal, and truly mine.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  One of my notable projects is the Skincare AI Website - a
                  platform that combines my technical skills with my interest in
                  skincare and wellness. This project showcases how technology can
                  be used to provide personalized recommendations and valuable
                  information to users.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Blogging has allowed me to explore topics ranging from web
                  development to fitness, lifestyle, and personal growth. It's a
                  space where I can be authentic, share my learnings, and
                  hopefully inspire others on their own journeys.
                </p>
              </div>
              <button
                onClick={() => toggleSection("blogging")}
                className="mt-4 text-primary-600 hover:text-primary-700 font-semibold text-sm bg-transparent border-none cursor-pointer"
              >
                {expandedSections.blogging ? "Read Less" : "Read More"}
              </button>
            </section>
          </main>

          {/* Right: Profile card */}
          <aside className="space-y-6">
            <div className="sticky top-24">
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <Image
                  src={featurePic}
                  alt={"Profile"}
                  className="rounded-full mx-auto object-cover mb-4"
                  style={{height: 340, width: 340}}
                />
                <h4 className="text-lg font-semibold">
                  Hi — I'm a Frontend Developer
                </h4>
                <p className="text-gray-600 text-sm mt-2">
                  I build interfaces, write, and move to music.
                </p>
                <div className="mt-4 flex justify-center gap-3">
                  <a
                    href="/contact"
                    className="px-3 py-2 bg-primary-600 text-white rounded-md text-sm"
                  >
                    Contact
                  </a>
                  <a
                    href="/portfolio"
                    className="px-3 py-2 border border-gray-200 rounded-md text-sm"
                  >
                    Portfolio
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-4 mt-6">
                <h5 className="text-sm font-semibold mb-2">Skills</h5>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "Next.js",
                    "TypeScript",
                    "Tailwind",
                    "Accessibility",
                    "API",
                  ].map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2 py-1 bg-gray-100 rounded"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-4 mt-6">
                <h5 className="text-sm font-semibold mb-3">Gallery</h5>
                <div className="grid grid-cols-2 gap-2">
                  {gallery.map((img, index) => (
                    <div key={index} className="rounded-lg overflow-hidden">
                      <Image
                        src={img}
                        alt={'img'}
                        className="w-full h-54 object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
