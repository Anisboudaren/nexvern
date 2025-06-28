"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectCard from '../../components/ProjectCard';

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

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    team_members: '',
    stageColor: 'blue',
    category: '',
    roles: '',
    website: '',
    teamSize: 1,
    stage: 'brainstorming' as 'brainstorming' | 'development' | 'launch',
  });
  const [formError, setFormError] = useState<string | null>(null);

  const fetchProjects = async (): Promise<Project[]> => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects/`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch projects');
    }
  };

  const createProject = async (): Promise<void> => {
    try {
      const rolesArray = formData.roles ? formData.roles.split(',').map((role) => role.trim()) : [];
      console.log('Creating project with data:', {
        title: formData.title,
        description: formData.description,
        image: formData.image || null,
        team_members: formData.team_members ? formData.team_members.split(',').map((member) => member.trim()) : [],
        stageColor: formData.stageColor,
        category: formData.category,
        stage: formData.stage,
        roles: rolesArray,
        teamSize: Number(formData.teamSize),
        website: formData.website || null,
      });
      
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects/`,
        {
       "title": formData.title,
        "description": formData.description,
        "category": formData.category,
        "image": formData.image,
        "stageColor": formData.stageColor,
        "roles": rolesArray,
        "website": formData.website ,
        "teamSize": Number(formData.teamSize),
        "team_members": [],
        "stage": formData.stage
          // ...formData,
          // roles: rolesArray,
          // teamSize: Number(formData.teamSize),
          // website: formData.website || null,
        },
        {
          withCredentials: true,
        },
        
      );
      setIsModalOpen(false);
      setFormData({
        title: '',
        description: '',
        image: '',
        stageColor: 'blue',
        team_members: '',
        category: '',
        roles: '',
        website: '',
        teamSize: 1,
        stage: 'brainstorming',
      });
      const data = await fetchProjects();
      setProjects(data);
    } catch (error: any) {
      setFormError(error.response?.data?.detail || 'Failed to create project');
    }
  };

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch projects. Please ensure you are logged in.');
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!formData.title || !formData.description || !formData.category) {
      setFormError('Title, description, and category are required.');
      return;
    }
    createProject();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Projects</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Project
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Create New Project</h2>
            {formError && <p className="text-red-500 mb-4">{formError}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
                  rows={4}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Stage</label>
                <select
                  name="stage"
                  value={formData.stage}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
                >
                  <option value="brainstorming">Brainstorming</option>
                  <option value="development">Development</option>
                  <option value="launch">Launch</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Website URL</label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Roles (comma-separated)</label>
                <input
                  type="text"
                  name="roles"
                  value={formData.roles}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., Developer, Designer"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Team Size</label>
                <input
                  type="number"
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
                  min="1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Stage Color</label>
                <input
                  type="text"
                  name="stageColor"
                  value={formData.stageColor}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., blue"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
    </div>
  );
}