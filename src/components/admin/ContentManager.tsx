import { useState } from 'react';
import { Edit2, Save, X, Plus, Trash2 } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import HeroEditor from './editors/HeroEditor';
import FeaturesEditor from './editors/FeaturesEditor';
import ServicesEditor from './editors/ServicesEditor';
import MachinesEditor from './editors/MachinesEditor';
import ProjectsEditor from './editors/ProjectsEditor';
import ClientsEditor from './editors/ClientsEditor';

type EditorSection = 'hero' | 'features' | 'services' | 'machines' | 'projects' | 'clients';

export default function ContentManager() {
  const [activeSection, setActiveSection] = useState<EditorSection>('hero');

  const sections = [
    { id: 'hero', name: 'Hero Section' },
    { id: 'features', name: 'Features' },
    { id: 'services', name: 'Services' },
    { id: 'machines', name: 'Machines' },
    { id: 'projects', name: 'Projects' },
    { id: 'clients', name: 'Clients' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Content Management</h1>
      </div>

      <div className="flex space-x-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id as EditorSection)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeSection === section.id
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-700'
            }`}
          >
            {section.name}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-dark-900 shadow rounded-lg overflow-hidden">
        {activeSection === 'hero' && <HeroEditor />}
        {activeSection === 'features' && <FeaturesEditor />}
        {activeSection === 'services' && <ServicesEditor />}
        {activeSection === 'machines' && <MachinesEditor />}
        {activeSection === 'projects' && <ProjectsEditor />}
        {activeSection === 'clients' && <ClientsEditor />}
      </div>
    </div>
  );
}