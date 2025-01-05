import { useState } from 'react';
import { Edit2, Save, X, Plus, Trash2 } from 'lucide-react';
import { useContent } from '../../../context/ContentContext';
import type { Project } from '../../../utils/contentManager';
import ImageUpload from '../../common/ImageUpload';

export default function ProjectsEditor() {
  const { projects, addProject, updateProject, deleteProject } = useContent();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<Project | null>(null);

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setEditedContent(project);
  };

  const handleSave = () => {
    if (editedContent) {
      updateProject(editedContent.id, editedContent);
      setEditingId(null);
      setEditedContent(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedContent(null);
  };

  const handleAdd = () => {
    const newProject = {
      title: 'New Project',
      client: 'Client Name',
      description: 'Project description',
      image: 'https://images.unsplash.com/photo-1565962768804-b667f1d18a55?auto=format&fit=crop&q=80',
      category: 'Manufacturing',
      completion: new Date().getFullYear().toString()
    };
    addProject(newProject);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Projects</h2>
        <button
          onClick={handleAdd}
          className="flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400"
        >
          <Plus className="h-5 w-5 mr-1" />
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <div key={project.id} className="border dark:border-gray-700 rounded-lg overflow-hidden">
            {editingId === project.id ? (
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                  <input
                    type="text"
                    value={editedContent?.title}
                    onChange={(e) => setEditedContent({ ...editedContent!, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Client</label>
                  <input
                    type="text"
                    value={editedContent?.client}
                    onChange={(e) => setEditedContent({ ...editedContent!, client: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                  <textarea
                    value={editedContent?.description}
                    onChange={(e) => setEditedContent({ ...editedContent!, description: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image</label>
                  <ImageUpload
                    currentImageUrl={editedContent?.image || ''}
                    onImageUrlChange={(url) => setEditedContent({ ...editedContent!, image: url })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                  <input
                    type="text"
                    value={editedContent?.category}
                    onChange={(e) => setEditedContent({ ...editedContent!, category: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Completion Year</label>
                  <input
                    type="text"
                    value={editedContent?.completion}
                    onChange={(e) => setEditedContent({ ...editedContent!, completion: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button onClick={handleSave} className="text-green-600 hover:text-green-700">
                    <Save className="h-5 w-5" />
                  </button>
                  <button onClick={handleCancel} className="text-red-600 hover:text-red-700">
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{project.title}</h3>
                      <p className="text-sm text-primary-500">{project.client}</p>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{project.description}</p>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-400">
                          {project.category}
                        </span>
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                          Completed: {project.completion}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}