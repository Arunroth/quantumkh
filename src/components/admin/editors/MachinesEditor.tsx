import { useState } from 'react';
import { Edit2, Save, X, Plus, Trash2 } from 'lucide-react';
import { useContent } from '../../../context/ContentContext';
import type { Machine } from '../../../utils/contentManager';

export default function MachinesEditor() {
  const { machines, addMachine, updateMachine, deleteMachine } = useContent();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<Machine | null>(null);

  const handleEdit = (machine: Machine) => {
    setEditingId(machine.id);
    setEditedContent(machine);
  };

  const handleSave = () => {
    if (editedContent) {
      updateMachine(editedContent.id, editedContent);
      setEditingId(null);
      setEditedContent(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedContent(null);
  };

  const handleAdd = () => {
    const newMachine = {
      name: 'New Machine',
      type: 'CNC Machine',
      description: 'Machine description',
      image: 'https://images.unsplash.com/photo-1565962768804-b667f1d18a55?auto=format&fit=crop&q=80',
      workspace: '40" x 20" x 25"',
      speed: '12,000 RPM',
      accuracy: '±0.0002"',
      materials: 'Metals, Plastics'

    };
    addMachine(newMachine);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this machine?')) {
      deleteMachine(id);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Machines</h2>
        <button
          onClick={handleAdd}
          className="flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400"
        >
          <Plus className="h-5 w-5 mr-1" />
          Add Machine
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {machines.map((machine) => (
          <div key={machine.id} className="border dark:border-gray-700 rounded-lg overflow-hidden">
            {editingId === machine.id ? (
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                  <input
                    type="text"
                    value={editedContent?.type}
                    onChange={(e) => setEditedContent({ ...editedContent!, type: e.target.value })}
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Workspace</label>
                    <input
                      type="text"
                      value={editedContent?.workspace}
                      onChange={(e) => setEditedContent({
                        ...editedContent!,
                        workspace: e.target.value
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Speed</label>
                    <input
                      type="text"
                      value={editedContent?.speed}
                      onChange={(e) => setEditedContent({
                        ...editedContent!, speed: e.target.value
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Accuracy</label>
                    <input
                      type="text"
                      value={editedContent?.accuracy}
                      onChange={(e) => setEditedContent({
                        ...editedContent!, accuracy: e.target.value
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Materials</label>
                    <input
                      type="text"
                      value={editedContent?.materials}
                      onChange={(e) => setEditedContent({
                        ...editedContent!, materials: e.target.value
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
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
                    src={machine.image}
                    alt={machine.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{machine.name}</h3>
                      <p className="text-sm text-primary-500">{machine.type}</p>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{machine.description}</p>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                        <p className="text-gray-600 dark:text-gray-400">Workspace: {machine.workspace}</p>
                        <p className="text-gray-600 dark:text-gray-400">Speed: {machine.speed}</p>
                        <p className="text-gray-600 dark:text-gray-400">Accuracy: {machine.accuracy}</p>
                        <p className="text-gray-600 dark:text-gray-400">Materials: {machine.materials}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(machine)}
                        className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(machine.id)}
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