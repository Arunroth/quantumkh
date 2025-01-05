import { useState } from 'react';
import { Edit2, Save, X, Plus, Trash2 } from 'lucide-react';
import { useContent } from '../../../context/ContentContext';
import type { Service } from '../../../utils/contentManager';

export default function ServicesEditor() {
  const { services, addService, updateService, deleteService } = useContent();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<Service | null>(null);

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setEditedContent(service);
  };

  const handleSave = () => {
    if (editedContent) {
      updateService(editedContent.id, editedContent);
      setEditingId(null);
      setEditedContent(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedContent(null);
  };

  const handleAdd = () => {
    const newService = {
      name: 'New Service',
      description: 'Service description',
      image: 'https://images.unsplash.com/photo-1565962768804-b667f1d18a55?auto=format&fit=crop&q=80'
    };
    addService(newService);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      deleteService(id);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Services</h2>
        <button
          onClick={handleAdd}
          className="flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400"
        >
          <Plus className="h-5 w-5 mr-1" />
          Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {services.map((service) => (
          <div key={service.id} className="border dark:border-gray-700 rounded-lg overflow-hidden">
            {editingId === service.id ? (
              <div className="p-4 space-y-4">
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
                  <input
                    type="text"
                    value={editedContent?.image}
                    onChange={(e) => setEditedContent({ ...editedContent!, image: e.target.value })}
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
                    src={service.image}
                    alt={service.name}
                    className="w-full h-48 object-contain"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{service.name}</h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{service.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(service)}
                        className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
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