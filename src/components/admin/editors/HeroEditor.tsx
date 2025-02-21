import { useState } from "react";
import { Save, X } from "lucide-react";
import { useContent } from "../../../context/ContentContext";
import { Hero } from "../../../utils/contentManager";
import ImageUpload from "../../common/ImageUpload";

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
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Hero Section
        </h2>
        {!isEditing ? (
          <button
            onClick={() => handleEdit(hero)}
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            Edit Content
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="text-green-600 hover:text-green-700"
            >
              <Save className="h-5 w-5" />
            </button>
            <button
              onClick={handleCancel}
              className="text-red-600 hover:text-red-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {isEditing ? (
          <>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Title
              </label>
              <input
                type="text"
                value={editedContent.title}
                onChange={(e) =>
                  setEditedContent({ ...editedContent, title: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Subtitle
              </label>
              <input
                type="text"
                value={editedContent.subtitle}
                onChange={(e) =>
                  setEditedContent({
                    ...editedContent,
                    subtitle: e.target.value,
                  })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Banner
              </label>
              <ImageUpload
                currentImageUrl={editedContent?.banner || ""}
                onImageUrlChange={(url) =>
                  setEditedContent({ ...editedContent!, banner: url })
                }
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Description
              </label>
              <textarea
                value={editedContent.description}
                onChange={(e) =>
                  setEditedContent({
                    ...editedContent,
                    description: e.target.value,
                  })
                }
                rows={3}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </>
        ) : (
          <div className="space-y-2">
            <div className="aspect-w-16 aspect-h-9 relative">
              <img
                src={hero.banner}
                alt={hero.title}
                className="w-full h-48 object-contain"
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Title: {hero.title}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Subtitle: {hero.subtitle}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Description: {hero.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
