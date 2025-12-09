import type { Metadata } from 'next';
import Image from 'next/image';
import { Card } from '@/components/Card';
import { IoIosFitness } from "react-icons/io";
import { FaMedal } from "react-icons/fa";
import { FaFire } from "react-icons/fa";
import { GrYoga } from "react-icons/gr";
import { RiLoopLeftFill } from "react-icons/ri";

import fitness1 from './fitness1.jpeg';
import fitness2 from './fitness2.jpeg';
import fitness3 from './fitness3.jpeg';
import fitness4 from './fitness4.jpeg';  
import fitness5 from './fitness5.jpeg';
import fitness6 from './fitness6.jpeg';
import fitness7 from './fitness7.jpeg';
import fitness8 from './fitness8.jpeg';

export const metadata: Metadata = {
  title: 'Fitness | Niyati Garg',
  description: 'My fitness journey, workout routines, and wellness tips',
};

const gallery = [
  fitness1, fitness2, fitness3, fitness4,
  fitness5, fitness6, fitness7, fitness8
];

const quotes = [
  "The only bad workout is the one that didn’t happen.",
  "Strength doesn’t come from what you can do. It comes from overcoming what you once thought you couldn’t.",
  "Take care of your body. It’s the only place you have to live.",
  "Fitness is not about being better than someone else — it’s about being better than you used to be."
];

const milestones = [
  { label: "5 Years of Consistency", icon: <IoIosFitness /> },
  { label: "Half Marathon Finisher", icon: <FaMedal /> },
  { label: "Monkey Bar + HIIT Lover", icon: <FaFire /> },
  { label: "Strength + Flexibility Balanced", icon: <GrYoga /> },
  { label: "Daily Mobility Routine Practitioner", icon: <RiLoopLeftFill /> },
];

export default function FitnessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        
        <h1 className="text-4xl font-bold mb-12 text-center">
          Fitness & Wellness
        </h1>

        {/* Motivational Quotes */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {quotes.map((quote, index) => (
              <Card key={index}>
                <p className="text-lg italic text-gray-700">"{quote}"</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {gallery.map((img, i) => (
              <div
                key={i}
                className="aspect-square bg-gray-200 rounded-lg overflow-hidden"
              >
                <Image 
                  src={img} 
                  alt="fitness img" 
                  className="object-cover w-full h-full" 
                />
              </div>
            ))}
          </div>
        </section>

        {/* My Fitness Journey */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">
            My Fitness Journey
          </h2>

          <Card className="max-w-4xl mx-auto p-6">
            <p className="text-gray-700 leading-relaxed">
              Fitness for me is not just a routine — it’s a mindset, a lifestyle, and a 
              form of self-respect. I started training to feel better, not just to look 
              better, and somewhere along the way, fitness became my therapy. Whether 
              it’s strength training, monkey bars, HIIT, mobility work, or cycling — 
              movement keeps me grounded.
              <br /><br />
              I love pushing my limits, learning new forms, and staying connected to my 
              body. Fitness has shaped my discipline, confidence, and emotional balance. 
              It’s the one place where effort never lies — you get exactly what you give.
            </p>
          </Card>
        </section>

        {/* Wellness Philosophy */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Wellness Philosophy
          </h2>

          <Card className="max-w-4xl mx-auto p-6">
            <p className="text-gray-700 leading-relaxed">
              Wellness is much more than lifting weights. It’s sleep, nutrition, 
              hydration, sunlight, breathwork, mobility, and mental clarity. I believe 
              in a holistic approach — balancing physical strength with emotional 
              well-being.
              <br /><br />
              From yoga-inspired breathing to strength training and outdoor activities, 
              I try to keep a mix that supports long-term health, not just short-term 
              results. My goal isn’t perfection — it’s consistency, awareness, and joy 
              in movement.
            </p>
          </Card>
        </section>

        {/* Fitness Milestones */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">My Milestones</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {milestones.map((m, i) => (
              <Card 
                key={i} 
                className="text-center py-6 flex flex-col items-center justify-center"
              >
                <span className="text-4xl mb-3">{m.icon}</span>
                <p className="font-semibold text-gray-700">{m.label}</p>
              </Card>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
