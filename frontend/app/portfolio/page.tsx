import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import Link from "next/link";
import Image from "next/image";

import dermaquest from "./dermaquest.png";
import chatbotN from "./chatbotN.png";
import moviedb from "./moviedb.png";
import whiteboard from "./whiteboard.png";

export const metadata: Metadata = {
  title: "Portfolio | Personal Brand Website",
  description: "View my projects and work as a Frontend Developer",
};

const projects = [
  {
    id: 1,
    title: "DermaQuest: Skincare Website",
    description:
      "A smart skincare educational platform that blends technology with personal expertise. Using AI, it provides customized skincare and ingredient suggestions, along with a skin-type quiz and educational blogs. Every article on the website is written by me — well-researched, experience-based, and simplified for everyday users. Built with modern web technologies, this project reflects my passion for skincare, wellness, and intuitive digital experiences.",
    techStack: [
      "React.js",
      "Bootstrap + Vanilla CSS",
      "AI Integration using Gemini free API",
      "Firebase Hosting and Authentication",
    ],
    githubUrl: "https://github.com/NiyatiGarg/DermaQuest",
    liveUrl: "https://dermaquest.web.app/",
    isHighlighted: true,
    featurephoto: dermaquest,
  },
  {
    id: 2,
    title: " MovieDb",
    description:
      "A responsive and feature-rich movie browser app built using React.js and the TMDB API. This project was developed as part of an interview selection round to demonstrate my proficiency in React, state management using Redux, and API integration. Explore popular, top-rated, and upcoming movies, perform searches, and view detailed movie information — all in one clean, user-friendly interface.",
    techStack: [
      "React js",
      "Redux",
      "Bootstrap",
      "React Router",
      "TMDB API for Movie Data Fetching",
      "react-icons",
    ],
    githubUrl: "https://github.com/NiyatiGarg/MovieDb",
    liveUrl: "",
    isHighlighted: false,
    featurephoto: moviedb,
  },
  {
    id: 3,
    title: "Chatbot N",
    description:
      "An AI Chatbot clone, a fully-frontend project built with React, powered by the Gemini API for advanced language processing, and integrated with Firebase Authentication for secure user experience, offering a seamless and intelligent conversational experience.",
    techStack: [
      "React JS", "Vite", "Bootstrap 5", "Firebase Authentication", "Gemini API",
    ],
    githubUrl: "https://github.com/NiyatiGarg/Chatbot-N",
    liveUrl: "",
    isHighlighted: false,
    featurephoto: chatbotN,
  },
  {
    id: 4,
    title: "Real Time WhiteBoard",
    description:
      "Creating a real-time collaborative whiteboard web application using React that allows users to upload images and receive real-time predictions from a pre-trained machine learning model. The application is capable of classifying the uploaded images into multiple categories.",
    techStack: [
      "React JS", "Bootstrap 5 & Vanilla CSS", "react-konva for drawing", "Keycloak for authentication", 'Firebase real-time DB for storage',
    ],
    githubUrl: "https://github.com/NiyatiGarg/Real-time-react-application",
    liveUrl: "",
    isHighlighted: false,
    featurephoto: whiteboard,
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
              className={`${
                project.isHighlighted ? "ring-2 ring-primary-500" : ""
              }`}
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Screenshot Placeholder */}
                <div className="md:w-1/3">
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <Image src={project.featurephoto} alt="DermaQuest" />
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
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {project.description}
                  </p>

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
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="primary">Live Demo</Button>
                      </Link>
                    )}
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
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
