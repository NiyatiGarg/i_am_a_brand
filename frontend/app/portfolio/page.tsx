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
  title: "Portfolio | Niyati Garg",
  description: "View my projects and work as a Frontend Developer",
};

const projects = [
  {
    id: 1,
    title: "DermaQuest: Skincare Website",
    description:
      "A smart skincare educational platform that uses AI, ingredient analysis, a skin quiz, and blogs — all written by me. It blends beauty, wellness, and intuitive UX.",
    techStack: [
      "React.js",
      "CSS + Bootstrap",
      "Gemini API",
      "Firebase Hosting",
    ],
    githubUrl: "https://github.com/NiyatiGarg/DermaQuest",
    liveUrl: "https://dermaquest.web.app/",
    isHighlighted: true,
    featurephoto: dermaquest,
  },
  {
    id: 2,
    title: "MovieDb",
    description:
      "A modern movie exploration platform powered by TMDB API. Built during a corporate interview process to show React + Redux + API integration strength.",
    techStack: ["React JS", "Redux", "React Router", "Bootstrap", "TMDB API"],
    githubUrl: "https://github.com/NiyatiGarg/MovieDb",
    featurephoto: moviedb,
  },
  {
    id: 3,
    title: "Chatbot N",
    description:
      "An AI chatbot built with React & Gemini API, featuring clean UI and Firebase Authentication. Fully frontend-based intelligent conversation system.",
    techStack: [
      "React JS",
      "Vite",
      "Bootstrap 5",
      "Firebase Auth",
      "Gemini API",
    ],
    githubUrl: "https://github.com/NiyatiGarg/Chatbot-N",
    featurephoto: chatbotN,
  },
  {
    id: 4,
    title: "Real-Time Whiteboard",
    description:
      "A multi-user collaborative whiteboard using React + Firebase. Supports drawing, real-time updates, image upload, and ML model predictions.",
    techStack: [
      "React JS",
      "react-konva",
      "Firebase Realtime DB",
      "Keycloak Auth",
      "CSS",
    ],
    githubUrl: "https://github.com/NiyatiGarg/Real-time-react-application",
    featurephoto: whiteboard,
  },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 pt-14">

        {/* PAGE TITLE */}
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12">
          Portfolio
        </h1>

        {/* GRID */}
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <Card
              key={project.id}
              className={`
                rounded-xl border border-gray-200 bg-white 
                transition-all duration-300 
                hover:shadow-lg hover:-translate-y-1
                ${project.isHighlighted ? "border-primary-400 shadow-md" : ""}
              `}
            >
              <div className="flex flex-col md:flex-row gap-5 p-5">

                {/* IMAGE */}
                <div className="md:w-1/3">
                  <div className="w-full h-40 md:h-32 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={project.featurephoto}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>

                {/* CONTENT */}
                <div className="md:w-2/3">
                  {project.isHighlighted && (
                    <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-xs font-semibold mb-2 inline-block">
                      ⭐ Featured Project
                    </span>
                  )}

                  <h2 className="text-xl font-semibold mb-2">{project.title}</h2>

                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    {project.description}
                  </p>

                  {/* TECH STACK */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* BUTTONS */}
                  <div className="flex gap-3">
                    {project.liveUrl && (
                      <Link href={project.liveUrl} target="_blank">
                        <Button className="text-sm px-4 py-2">Live Demo</Button>
                      </Link>
                    )}
                    <Link href={project.githubUrl} target="_blank">
                      <Button variant="outline" className="text-sm px-4 py-2">
                        GitHub
                      </Button>
                    </Link>
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
