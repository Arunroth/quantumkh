import { useEffect, useState } from 'react';
import { Save, X } from 'lucide-react';
import { useContent } from '../../../context/ContentContext';
import { Hero } from '../../../utils/contentManager';

export default function HeroEditor() {
  const { hero, updateHero } = useContent();
  const [editedContent, setEditedContent] = useState(hero);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    if (editedContent) {
      updateHero(editedContent);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedContent(hero);
    setIsEditing(false);
  };

  const handleEdit = (hero: Hero) => {
    setEditedContent(hero);
    setIsEditing(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Hero Section</h2>
        {!isEditing ? (
          <button
          onClick={() => handleEdit(hero)}
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            Edit Content
          </button>
        ) : (
          <div className="flex space-x-2">
            <button onClick={handleSave} className="text-green-600 hover:text-green-700">
              <Save className="h-5 w-5" />
            </button>
            <button onClick={handleCancel} className="text-red-600 hover:text-red-700">
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {isEditing ? (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
              <input
                type="text"
                value={editedContent.title}
                onChange={(e) => setEditedContent({ ...editedContent, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subtitle</label>
              <input
                type="text"
                value={editedContent.subtitle}
                onChange={(e) => setEditedContent({ ...editedContent, subtitle: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Banner</label>
              <input
                type="text"
                value={editedContent.banner}
                onChange={(e) => setEditedContent({ ...editedContent, banner: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <textarea
                value={editedContent.description}
                onChange={(e) => setEditedContent({ ...editedContent, description: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
          </>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Title: {hero.title}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Subtitle: {hero.subtitle}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Banner URL: {hero.banner}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Description: {hero.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}