'use client';

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

const gallery = [bikeride, work, fitness, foodie, cake, gym, bike2];

export default function AboutPage() {
  const [expandedSections, setExpandedSections] = useState({
    creative: false,
    fitness: false,
    blogging: false,
  });

  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const toggleSection = (key: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const openPreview = (index: number) => {
    setPreviewIndex(index);
  };

  const closePreview = () => setPreviewIndex(null);

  const nextImage = () => {
    if (previewIndex !== null) {
      setPreviewIndex((previewIndex + 1) % gallery.length);
    }
  };

  const prevImage = () => {
    if (previewIndex !== null) {
      setPreviewIndex((previewIndex - 1 + gallery.length) % gallery.length);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 pb-16">
      <div className="container mx-auto px-6 py-16">

        {/* ------------------- MOBILE DP ALWAYS VISIBLE ------------------- */}
        <div className="lg:hidden flex flex-col items-center text-center mb-12">
          <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg">
            <Image
              src={featurePic}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>

          <h2 className="text-2xl font-bold mt-4">Hi — I'm Niyati</h2>
          <p className="text-gray-600 text-sm mt-2 max-w-sm">
            Frontend Developer • Creator • Fitness Enthusiast  
            I build interfaces, write, train, dance, and live life deeply.
          </p>
        </div>

        {/* ------------------- MAIN GRID ------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

          {/* MAIN CONTENT */}
          <main className="lg:col-span-2">

            {/* HEADER */}
            <header className="mb-8">
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">About Me</h1>
              <p className="text-gray-600 max-w-3xl">
                Frontend Developer · Creative Maker · Fitness Enthusiast —  
                I build delightful web experiences, write about what I care about,  
                and move through life with music and motion.
              </p>
            </header>

            {/* BIOGRAPHY */}
            <section className="bg-white shadow-sm rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-3">Biography</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to my personal brand website! I'm a passionate Frontend Developer
                who loves creating beautiful and functional digital experiences. Beyond
                coding, I live a very expressive life — fitness, dance, music, biking,
                writing, and constantly learning.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This site reflects my journey — my work, my passions, my thoughts, and
                the colorful pieces that make up who I am.
              </p>
            </section>

            {/* PROFESSION */}
            <section className="bg-white shadow-sm rounded-lg p-6 mb-6">
              <h2 className="text-3xl font-bold mb-4">Profession</h2>
              <h3 className="text-2xl font-semibold mb-3 text-primary-600">Frontend Developer</h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                I specialize in building modern, high-performance web apps with React,
                Next.js, TypeScript, Bootstrap, Tailwind & Firebase.
              </p>

              <ul className="list-disc list-inside mt-2 space-y-2 text-gray-700">
                <li>React & Next.js development</li>
                <li>TypeScript & modern JavaScript</li>
                <li>Tailwind, SCSS & responsive UI</li>
                <li>Context API, Redux Basics</li>
                <li>Firebase Authentication & Realtime DB</li>
                <li>Performance optimization</li>
                <li>Prompt Engineering for AI workflows</li>
              </ul>
            </section>

            {/* CREATIVE IDENTITY */}
            <section className="bg-white shadow-sm rounded-lg p-6 mb-6">
              <h2 className="text-3xl font-bold mb-4">Creative Identity</h2>

              <h3 className="text-2xl font-semibold mb-3 text-primary-600">Dance, Singing & Bike Riding</h3>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedSections.creative ? "max-h-full" : "max-h-32"
                }`}
              >
                <p className="text-gray-700 leading-relaxed">
                  Dance and music have always been my escape. They help me express emotions,
                  celebrate joy, handle sadness, and stay in flow. I even code while listening
                  to music — it keeps me inspired and sharp.
                  <br /><br />
                  Bike riding gives me clarity and a sense of freedom. No matter my mood —
                  dance, music, and biking remain my emotional anchors.
                </p>
              </div>

              <button
                onClick={() => toggleSection("creative")}
                className="mt-4 text-primary-600 font-semibold text-sm"
              >
                {expandedSections.creative ? "Read Less" : "Read More"}
              </button>
            </section>

            {/* FITNESS PHILOSOPHY */}
            <section className="bg-white shadow-sm rounded-lg p-6 mb-6">
              <h2 className="text-3xl font-bold mb-4">Fitness & Wellness Philosophy</h2>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedSections.fitness ? "max-h-full" : "max-h-32"
                }`}
              >
                <p className="text-gray-700 leading-relaxed mb-4">
                  Fitness isn’t just about working out — it’s a lifestyle. I train, breathe,
                  heal, and grow through movement. Strength training, yoga, mindful breathing
                  (like Bhramari Pranayama), and clean habits keep me mentally sharp and
                  emotionally grounded.
                </p>
              </div>

              <button
                onClick={() => toggleSection("fitness")}
                className="mt-4 text-primary-600 font-semibold text-sm"
              >
                {expandedSections.fitness ? "Read Less" : "Read More"}
              </button>
            </section>

            {/* BLOGGING SECTION */}
            <section className="bg-white shadow-sm rounded-lg p-6 mb-6">
              <h2 className="text-3xl font-bold mb-4">Blogging & Skincare Website Journey</h2>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedSections.blogging ? "max-h-full" : "max-h-32"
                }`}
              >
                <p className="text-gray-700 leading-relaxed mb-4">
                  I’ve been writing since college — skincare, lifestyle, fitness, food,
                  tech, and everything I learn. My curiosity for skincare inspired me to
                  build a Skincare AI Website that combines my tech skills with research.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  It's one of my favorite projects — helping people understand ingredients,
                  routines, and science-backed choices.
                </p>

                <p className="text-gray-700 leading-relaxed">
                  Blogging lets me express myself freely — it’s my voice, my story, and
                  my space to inspire.
                </p>
              </div>

              <button
                onClick={() => toggleSection("blogging")}
                className="mt-4 text-primary-600 font-semibold text-sm"
              >
                {expandedSections.blogging ? "Read Less" : "Read More"}
              </button>
            </section>

            {/* MOBILE GALLERY */}
            <section className="lg:hidden bg-white rounded-lg shadow p-5 mt-10">
              <h5 className="text-lg font-semibold mb-3">Gallery</h5>

              <div className="grid grid-cols-2 gap-3">
                {gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => openPreview(index)}
                    className="rounded-lg overflow-hidden"
                  >
                    <Image
                      src={img}
                      alt="img"
                      className="w-full h-40 object-cover hover:scale-105 transition-transform"
                    />
                  </button>
                ))}
              </div>
            </section>
          </main>

          {/* SIDEBAR (DESKTOP ONLY) */}
          <aside className="hidden lg:block space-y-6">
            <div className="sticky top-24">

              {/* Round DP */}
              <div className="w-60 h-60 rounded-full overflow-hidden shadow mx-auto mb-4">
                <Image src={featurePic} alt="Profile" className="object-cover w-full h-full" />
              </div>

              <div className="bg-white rounded-lg shadow p-6 text-center">
                <h4 className="text-lg font-semibold">Hi — I'm a Frontend Developer</h4>
                <p className="text-gray-600 text-sm mt-2">
                  I build interfaces, write, dance, train, and live creatively.
                </p>

                <div className="mt-4 flex justify-center gap-3">
                  <a href="/contact" className="px-3 py-2 bg-primary-600 text-white rounded-md text-sm">Contact</a>
                  <a href="/portfolio" className="px-3 py-2 border border-gray-200 rounded-md text-sm">Portfolio</a>
                </div>
              </div>

              {/* Skills */}
              <div className="bg-white rounded-lg shadow p-4 mt-6">
                <h5 className="text-sm font-semibold mb-2">Skills</h5>
                <div className="flex flex-wrap gap-2">
                  {[
                    "HTML, CSS",
                    "React",
                    "Next.js",
                    "Bootstrap",
                    "TypeScript",
                    "Tailwind",
                    "Firebase",
                    "API Integration",
                    "Vercel & Render",
                  ].map((s) => (
                    <span key={s} className="text-xs px-2 py-1 bg-gray-100 rounded">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Gallery */}
              <div className="bg-white rounded-lg shadow p-4 mt-6">
                <h5 className="text-sm font-semibold mb-3">Gallery</h5>
                <div className="grid grid-cols-2 gap-2">
                  {gallery.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => openPreview(index)}
                      className="rounded-lg overflow-hidden"
                    >
                      <Image
                        src={img}
                        alt="img"
                        className="w-full h-40 object-cover hover:scale-105 transition-transform"
                      />
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </aside>
        </div>
      </div>

      {/* ------------------- INSTAGRAM STYLE PREVIEW MODAL ------------------- */}
      {previewIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-[9999] p-4"
          onClick={closePreview}
        >
          <div
            className="relative max-w-[90%] max-h-[80%] rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={gallery[previewIndex]}
              alt="preview"
              className="object-contain w-full h-full"
            />
          </div>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-6 text-white text-4xl"
          >
            ‹
          </button>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-6 text-white text-4xl"
          >
            ›
          </button>

          {/* Close */}
          <button
            onClick={closePreview}
            className="absolute top-6 right-6 text-white text-3xl"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
