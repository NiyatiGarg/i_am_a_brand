import type { Metadata } from 'next';
import { Card } from '@/components/Card';

export const metadata: Metadata = {
  title: 'Fitness | Personal Brand Website',
  description: 'My fitness journey, workout routines, and wellness tips',
};

const quotes = [
  'The only bad workout is the one that didn\'t happen.',
  'Strength doesn\'t come from what you can do. It comes from overcoming the things you once thought you couldn\'t.',
  'Take care of your body. It\'s the only place you have to live.',
  'Fitness is not about being better than someone else. It\'s about being better than you used to be.',
];

const routines = [
  {
    title: 'Upper Body Strength',
    exercises: ['Bench Press', 'Pull-ups', 'Shoulder Press', 'Rows', 'Bicep Curls'],
  },
  {
    title: 'Lower Body Power',
    exercises: ['Squats', 'Deadlifts', 'Lunges', 'Leg Press', 'Calf Raises'],
  },
  {
    title: 'Full Body HIIT',
    exercises: ['Burpees', 'Mountain Climbers', 'Jump Squats', 'Push-ups', 'Plank'],
  },
];

export default function FitnessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-12 text-center">Fitness & Wellness</h1>

        {/* Motivational Quotes */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Motivational Quotes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {quotes.map((quote, index) => (
              <Card key={index}>
                <p className="text-lg italic text-gray-700">"{quote}"</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Image Gallery */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-square bg-gray-200 rounded-lg overflow-hidden"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400">Fitness Photo {i}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Workout Routines */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Workout Routines</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {routines.map((routine, index) => (
              <Card key={index}>
                <h3 className="text-xl font-bold mb-4">{routine.title}</h3>
                <ul className="space-y-2">
                  {routine.exercises.map((exercise, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-primary-600">•</span>
                      <span>{exercise}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        {/* Instagram Embed Placeholder */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-center">Follow My Journey</h2>
          <Card className="max-w-2xl mx-auto">
            <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Instagram Embed Placeholder</p>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}

