import { useState } from 'react';
import { Edit2, Save, X, Plus, Trash2 } from 'lucide-react';
import { useContent } from '../../../context/ContentContext';
import type { Client } from '../../../utils/contentManager';

export default function ClientsEditor() {
  const { clients, addClient, updateClient, deleteClient } = useContent();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<Client | null>(null);

  const handleEdit = (client: Client) => {
    setEditingId(client.id);
    setEditedContent(client);
  };

  const handleSave = () => {
    if (editedContent) {
      updateClient(editedContent.id, editedContent);
      setEditingId(null);
      setEditedContent(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedContent(null);
  };

  const handleAdd = () => {
    const newClient = {
      name: 'New Client',
      logo: 'https://images.unsplash.com/photo-1565962768804-b667f1d18a55?auto=format&fit=crop&q=80',
      industry: 'Manufacturing',
      type: 'Enterprise',
      testimonial: '',
      author: 'admin',
      role: ''
    };
    addClient(newClient);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      deleteClient(id);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Clients</h2>
        <button
          onClick={handleAdd}
          className="flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400"
        >
          <Plus className="h-5 w-5 mr-1" />
          Add Client
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clients.map((client) => (
          <div key={client.id} className="border dark:border-gray-700 rounded-lg overflow-hidden">
            {editingId === client.id ? (
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Logo URL</label>
                  <input
                    type="text"
                    value={editedContent?.logo}
                    onChange={(e) => setEditedContent({ ...editedContent!, logo: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Industry</label>
                  <input
                    type="text"
                    value={editedContent?.industry}
                    onChange={(e) => setEditedContent({ ...editedContent!, industry: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                  <input
                    type="text"
                    value={editedContent?.type}
                    onChange={(e) => setEditedContent({ ...editedContent!, type: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Testimonial</label>
                  <textarea
                    value={editedContent?.testimonial}
                    onChange={(e) => setEditedContent({ ...editedContent!, testimonial: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Author</label>
                  <input
                    type="text"
                    value={editedContent?.author}
                    onChange={(e) => setEditedContent({ ...editedContent!, author: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                  <input
                    type="text"
                    value={editedContent?.role}
                    onChange={(e) => setEditedContent({ ...editedContent!, role: e.target.value })}
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
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="h-24 flex items-center justify-center mb-4">
                        <img
                          src={client.logo}
                          alt={client.name}
                          className="max-h-full object-contain"
                        />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white text-center">{client.name}</h3>
                      <div className="mt-2 text-center">
                        <span className="text-sm text-primary-500">{client.industry}</span>
                        <span className="mx-2 text-gray-300">|</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{client.type}</span>
                      </div>
                      {client.testimonial && (
                        <blockquote className="mt-4 text-sm text-gray-600 dark:text-gray-400 italic">
                          "{client.testimonial}"
                          {client.author && (
                            <footer className="mt-2 text-sm">
                              <strong>{client.author}</strong>
                              {client.role && <span className="text-gray-500"> - {client.role}</span>}
                            </footer>
                          )}
                        </blockquote>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(client)}
                        className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(client.id)}
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