import type { Metadata } from 'next';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Portfolio | Personal Brand Website',
  description: 'View my projects and work as a Frontend Developer',
};

const projects = [
  {
    id: 1,
    title: 'Skincare AI Website',
    description:
      'An intelligent skincare recommendation platform that uses AI to provide personalized skincare advice. Built with modern web technologies and featuring a beautiful, user-friendly interface.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'AI Integration'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://skincare-ai.com',
    isHighlighted: true,
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    description:
      'A full-featured e-commerce platform with shopping cart, payment integration, and admin dashboard. Responsive design with excellent user experience.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    isHighlighted: false,
  },
  {
    id: 3,
    title: 'Task Management App',
    description:
      'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    techStack: ['React', 'Firebase', 'TypeScript', 'Material-UI'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    isHighlighted: false,
  },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-12 text-center">Portfolio</h1>

        <div className="max-w-6xl mx-auto space-y-8">
          {projects.map((project) => (
            <Card
              key={project.id}
              className={`${project.isHighlighted ? 'ring-2 ring-primary-500' : ''}`}
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Screenshot Placeholder */}
                <div className="md:w-1/3">
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">Screenshot</span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="md:w-2/3">
                  {project.isHighlighted && (
                    <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-2">
                      Featured Project
                    </span>
                  )}
                  <h2 className="text-2xl font-bold mb-3">{project.title}</h2>
                  <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    {project.liveUrl && (
                      <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="primary">Live Demo</Button>
                      </Link>
                    )}
                    {project.githubUrl && (
                      <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline">GitHub</Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

