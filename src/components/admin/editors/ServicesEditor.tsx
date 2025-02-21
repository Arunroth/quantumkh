import { useState } from "react";
import { Edit2, Save, X, Plus, Trash2 } from "lucide-react";
import { useContent } from "../../../context/ContentContext";
import type { Service } from "../../../utils/contentManager";
import ImageUpload from "../../common/ImageUpload";

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
      name: "New Service",
      description: "Service description",
      image:
        "https://images.unsplash.com/photo-1565962768804-b667f1d18a55?auto=format&fit=crop&q=80",
    };
    addService(newService);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      deleteService(id);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Services
        </h2>
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
          <div
            key={service.id}
            className="border dark:border-gray-700 rounded-lg overflow-hidden"
          >
            {editingId === service.id ? (
              <div className="p-4 space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editedContent?.name}
                    onChange={(e) =>
                      setEditedContent({
                        ...editedContent!,
                        name: e.target.value,
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Description
                  </label>
                  <textarea
                    value={editedContent?.description}
                    onChange={(e) =>
                      setEditedContent({
                        ...editedContent!,
                        description: e.target.value,
                      })
                    }
                    rows={2}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Image
                  </label>
                  <ImageUpload
                    currentImageUrl={editedContent?.image || ""}
                    onImageUrlChange={(url) =>
                      setEditedContent({ ...editedContent!, image: url })
                    }
                  />
                </div>
                <div className="flex justify-end space-x-2">
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
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {service.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {service.description}
                      </p>
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
