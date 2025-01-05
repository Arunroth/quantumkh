import { useState } from 'react';
import { Edit2, Save, X, Plus, Trash2 } from 'lucide-react';
import { useContent } from '../../../context/ContentContext';
import type { Feature } from '../../../utils/contentManager';

export default function FeaturesEditor() {
  const { features, addFeature, updateFeature, deleteFeature } = useContent();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<Feature | null>(null);

  const handleEdit = (feature: Feature) => {
    setEditingId(feature.id);
    setEditedContent(feature);
  };

  const handleSave = () => {
    if (editedContent) {
      updateFeature(editedContent.id, editedContent);
      setEditingId(null);
      setEditedContent(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedContent(null);
  };

  const handleAdd = () => {
    const newFeature = {
      name: 'New Feature',
      description: 'Feature description',
      icon: 'Settings'
    };
    addFeature(newFeature);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this feature?')) {
      deleteFeature(id);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Features</h2>
        <button
          onClick={handleAdd}
          className="flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400"
        >
          <Plus className="h-5 w-5 mr-1" />
          Add Feature
        </button>
      </div>

      <div className="space-y-6">
        {features.map((feature) => (
          <div key={feature.id} className="border dark:border-gray-700 rounded-lg p-4">
            {editingId === feature.id ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                  <input
                    type="text"
                    value={editedContent?.name}
                    onChange={(e) => setEditedContent({ ...editedContent!, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                  <textarea
                    value={editedContent?.description}
                    onChange={(e) => setEditedContent({ ...editedContent!, description: e.target.value })}
                    rows={2}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Icon</label>
                  <select
                    value={editedContent?.icon}
                    onChange={(e) => setEditedContent({ ...editedContent!, icon: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="Settings">Settings</option>
                    <option value="Clock">Clock</option>
                    <option value="Shield">Shield</option>
                    <option value="Zap">Zap</option>
                  </select>
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
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">{feature.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Icon: {feature.icon}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(feature)}
                    className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(feature.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}