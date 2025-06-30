/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

interface Project {
  id: number;
  title: string;
  description: string;
  creator: string;
  image: string;
  stageColor: string;
  category: string;
  roles: string[];
  website: string | null;
  teamSize: number;
  team_members: string[];
  stage: 'brainstorming' | 'development' | 'launch';
  created_at: string;
  updated_at: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition bg-white dark:bg-gray-800">
      <img
        src={project.image || '/placeholder-image.jpg'}
        alt={project.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">{project.description}</p>
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        <span>Stage: {project.stage}</span> | <span>Category: {project.category}</span>
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        Team Size: {project.teamSize} | Roles: {project.roles.join(', ') || 'None'}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
        Creator: {project.creator}
      </div>
      {project.website && (
        <a
          href={project.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Visit Website
        </a>
      )}
      <Link
        href={`/projects/${project.id}`}
        className="block mt-4 text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        View Details
      </Link>
    </div>
  );
}