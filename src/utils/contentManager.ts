import servicesData from '../data/services.json';
import machinesData from '../data/machines.json';
import projectsData from '../data/projects.json';
import clientsData from '../data/clients.json';
import trackingProejctsData from '../data/tracking.json';
import heroData from '../data/hero.json';
import featuresData from '../data/features.json';
import { supabase } from './supabase';

export enum ProjectStatusEnum {
  QUEUED = 'queued',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
}

export interface ProjectStage {
  projectid: string;
  name: string,
  date?: string
}

export interface ProjectStatus {
  id: string;
  projectid: string;
  vat: string;
  name: string;
  status: string;
  stage: string;
  startdate: string;
  estimatedcompletion: string;
  progress: number;
  // stages: ProjectStage[]
}

export interface Hero {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  banner?: string;
}

export interface Feature {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Machine {
  id: string;
  name: string;
  type: string;
  image: string;
  workspace: string;
  speed: string;
  accuracy: string;
  materials: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  description: string;
  image: string;
  category: string;
  completion: string;
}

export interface Client {
  id: string;
  name: string;
  logo: string;
  industry: string;
  type: string;
  testimonial: string;
  author: string;
  role: string;
  range: number;
}

class ContentManager {
  private hero: Hero = heroData.hero;
  private features: Feature[] = featuresData.features;
  private services: Service[] = servicesData.services;
  private machines: Machine[] = machinesData.machines;
  private projects: Project[] = projectsData.projects;
  private clients: Client[] = clientsData.clients;
  private projectStatus: ProjectStatus[] = trackingProejctsData.projects;

  // Hero
  async getHero(): Promise<Hero> {
    const { data, error } = await supabase
      .from('hero')
      .select('*')
      .limit(1);
    if (error) {
      console.error('Error hero services:', error);
    } else if (data) {
      this.hero = data[0] as Hero;
    }
    return this.hero;
  }

  async updateHero(hero: Hero): Promise<Hero> {
    const { error } = await supabase
      .from('hero')
      .update(hero)
      .eq('id', hero.id);
    if (error) {
      console.error('Error updating client:', error);
    }
    this.hero = hero;
    return this.hero;
  }

  // Features
  async getFeatures(): Promise<Feature[]> {
    const { data, error } = await supabase
      .from('features')
      .select('*'); // Fetch all columns
    if (error) {
      console.error('Error fetching services:', error);
    } else {
      this.features = data as Feature[];
    }
    return this.features;
  }

  async addFeature(feature: Omit<Feature, 'id'>): Promise<Feature[]> {
    const { data, error } = await supabase
      .from('features')
      .insert(feature).select();
    if (error) {
      console.error('Error adding service:', error);
    } else {
      this.features.push(data[0]);
    }
    return this.features;
  }

  async updateFeature(id: string, feature: Partial<Feature>): Promise<Feature | null> {
    const { error } = await supabase
      .from('features')
      .update(feature)
      .eq('id', id);
    if (error) {
      console.error('Error updating client:', error);
    }
    const index = this.features.findIndex(f => f.id === id);
    if (index === -1) return null;

    this.features[index] = { ...this.features[index], ...feature };
    return this.features[index];
  }

  async deleteFeature(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('features')
      .delete()
      .eq('id', id); // Match the specific service by ID

    if (error) {
      console.error('Error deleting feature:', error);
    }
    const index = this.features.findIndex(f => f.id === id);
    if (index === -1) return false;
    this.features.splice(index, 1);
    return true;
  }

  // Services
  async getServices(): Promise<Service[]> {
    const { data, error } = await supabase
      .from('services')
      .select('*');
    if (error) {
      console.error('Error fetching services:', error);
    } else {
      this.services = data as Service[];
    }
    return this.services;
  }

  async addService(service: Omit<Service, 'id'>): Promise<Service[]> {
    const { data, error } = await supabase
      .from('services')
      .insert(service).select();
    if (error) {
      console.error('Error adding service:', error);
    } else {
      this.services.push(data[0]);
    }
    return this.services;
  }

  async updateService(id: string, service: Partial<Service>): Promise<Service | null> {
    const { error } = await supabase
      .from('services')
      .update(service)
      .eq('id', id);
    if (error) {
      console.error('Error updating client:', error);
    }
    const index = this.services.findIndex(s => s.id === id);
    if (index === -1) return null;

    this.services[index] = { ...this.services[index], ...service };
    return this.services[index];
  }

  async deleteService(id: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('services')
      .delete()
      .eq('id', id); // Match the specific service by ID

    if (error) {
      console.error('Error deleting service:', error);
    } else {
      console.log('Service deleted:', data);
    }
    const index = this.services.findIndex(s => s.id === id);
    if (index === -1) return false;

    this.services.splice(index, 1);
    return true;
  }

  // Machines
  async getMachines(): Promise<Machine[]> {
    const { data, error } = await supabase
      .from('machines')
      .select('*'); // Fetch all columns

    if (error) {
      console.error('Error fetching services:', error);
    } else {
      this.machines = data as Machine[]; // Return typed data
    }
    return this.machines;
  }

  async addMachine(machine: Omit<Machine, 'id'>): Promise<Machine[]> {
    const { data, error } = await supabase
      .from('machines')
      .insert(machine).select();
    if (error) {
      console.error('Error adding service:', error);
    } else {
      this.machines.push(data[0]);
    }
    return this.machines;
  }

  async updateMachine(id: string, machine: Partial<Machine>): Promise<Machine | null> {
    const { error } = await supabase
      .from('machines')
      .update(machine)
      .eq('id', id);
    if (error) {
      console.error('Error updating machine:', error);
    }
    const index = this.machines.findIndex(m => m.id === id);
    if (index === -1) return null;

    this.machines[index] = { ...this.machines[index], ...machine };
    return this.machines[index];
  }

  async deleteMachine(id: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('machines')
      .delete()
      .eq('id', id); // Match the specific service by ID

    if (error) {
      console.error('Error deleting service:', error);
    } else {
      console.log('Service deleted:', data);
    }
    const index = this.machines.findIndex(m => m.id === id);
    if (index === -1) return false;

    this.machines.splice(index, 1);
    return true;
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*'); // Fetch all columns

    if (error) {
      console.error('Error fetching projects:', error);
    } else {
      this.projects = data as Project[]; // Return typed data
    }
    return this.projects;
  }

  async addProject(project: Omit<Project, 'id'>): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .insert(project).select();
    if (error) {
      console.error('Error adding projects:', error);
    } else {
      this.projects.push(data[0]);
    }
    return this.projects;
  }

  async updateProject(id: string, project: Partial<Project>): Promise<Project | null> {
    const { error } = await supabase
      .from('projects')
      .update(project)
      .eq('id', id);
    if (error) {
      console.error('Error updating project:', error);
    }
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) return null;

    this.projects[index] = { ...this.projects[index], ...project };
    return this.projects[index];
  }

  async deleteProject(id: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id); // Match the specific service by ID

    if (error) {
      console.error('Error deleting project:', error);
    } else {
      console.log('project deleted:', data);
    }
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) return false;

    this.projects.splice(index, 1);
    return true;
  }

  // Clients
  async getClients(): Promise<Client[]> {
    const { data, error } = await supabase
      .from('clients')
      .select('*').order('range', { ascending: true });

    if (error) {
      console.error('Error fetching clients:', error);
    } else {
      this.clients = data || [];
    }
    return this.clients;
  }

  async addClient(client: Omit<Client, 'id'>): Promise<Client[]> {
    const { data, error } = await supabase
      .from('clients')
      .insert(client).select();
    if (error) {
      console.error('Error adding client:', error);
    } else {
      this.clients.push(data[0]);
    }
    return this.clients.sort((a, b) => a.range - b.range);
  }

  async updateClient(id: string, client: Partial<Client>): Promise<Client[]> {
    const { error } = await supabase
      .from('clients')
      .update(client)
      .eq('id', id);

    if (error) {
      console.error('Error updating client:', error);
    }
    const index = this.clients.findIndex(c => c.id === id);
    if (index != -1) {
      this.clients[index] = { ...this.clients[index], ...client };
    }
    return this.clients.sort((a, b) => a.range - b.range);;
  }

  async deleteClient(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting client:', error);
    }
    const index = this.clients.findIndex(c => c.id === id);
    if (index === -1) return false;

    this.clients.splice(index, 1);
    return true;
  }

  async getProjectStatus(): Promise<ProjectStatus[]> {
    const { data, error } = await supabase
      .from('project_status')
      .select('*')

    if (error) {
      console.error('Error fetching project status by ID:', error);
      return [];
    }
    this.projectStatus = data as ProjectStatus[];

    return this.projectStatus;
  }

  async getProjectStatusById(ids: string): Promise<ProjectStatus[]> {
    const req = ids.split(',');
    if (req.length != 2) {
      return [];
    }
    const { data, error } = await supabase
      .from('project_status')
      .select('*')
      .eq('projectid', req[0].trim())
      .eq('vat', req[1].trim());

    if (error) {
      console.error('Error fetching project status by ID:', error);
      return [];
    }
    this.projectStatus = data as ProjectStatus[];

    return this.projectStatus;
  }

  async addProjectStatus(projectStatus: Omit<ProjectStatus, "id" | "projectid">): Promise<ProjectStatus[]> {
    const newData = { ...projectStatus, projectid: `PJR${Math.floor(1000 + Math.random() * 9000)}` };
    const { data, error } = await supabase
      .from('project_status')
      .insert([newData]).select();

    if (error) {
      console.error('Error creating project status:', error);
    } else {
      this.projectStatus.push(data[0]); // Add the new project status to the list
    }
    console.log('Project status:', this.projectStatus);
    return this.projectStatus; // Return the created project status
  }


  async updateProjectStatus(id: string, updatedStatus: ProjectStatus): Promise<ProjectStatus | null> {
    updatedStatus = {
      ...updatedStatus,
      vat: updatedStatus.vat ? updatedStatus.vat.toUpperCase() : "",
      projectid: updatedStatus.projectid ? updatedStatus.projectid.toUpperCase() : "",
    }
    const { error } = await supabase
      .from('project_status')
      .update(updatedStatus)
      .eq('id', id);

    if (error) {
      console.error('Error updating project status:', error);
      return null;
    }
    const index = this.projectStatus.findIndex(p => p.id === id);
    if (index === -1) return null;

    this.projectStatus[index] = { ...this.projectStatus[index], ...updatedStatus };
    return this.projectStatus[index];
  }

  async deleteProjectStatus(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('project_status')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting project tracking:', error);
    }
    const index = this.projectStatus.findIndex(p => p.id === id);
    if (index === -1) return false;

    this.projectStatus.splice(index, 1);
    return true;
  }
}

export const contentManager = new ContentManager();