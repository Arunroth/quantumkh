import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  contentManager,
  Service,
  Machine,
  Project,
  Client,
  Hero,
  Feature,
  ProjectStatus,
  ProjectStage,
} from "../utils/contentManager";

interface ContentContextType {
  hero: Hero;
  updateHero: (hero: Hero) => void;
  features: Feature[];
  addFeature: (feature: Omit<Feature, "id">) => void;
  updateFeature: (id: string, feature: Partial<Feature>) => void;
  deleteFeature: (id: string) => void;
  services: Service[];
  machines: Machine[];
  projects: Project[];
  clients: Client[];
  addService: (service: Omit<Service, "id">) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  addMachine: (machine: Omit<Machine, "id">) => void;
  updateMachine: (id: string, machine: Partial<Machine>) => void;
  deleteMachine: (id: string) => void;
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addClient: (client: Omit<Client, "id">) => Promise<Client[]>;
  updateClient: (id: string, client: Partial<Client>) => Promise<Client[]>;
  deleteClient: (id: string) => void;
  searchProjectStatus: (ids: string) => Promise<ProjectStatus[]>;
  projectStatus: ProjectStatus[];
  addProjectStatus: (
    projectStatus: Omit<ProjectStatus, "id" | "projectid">
  ) => void;
  updateProjectStatus: (
    id: string,
    updatedStatus: ProjectStatus,
    stages: ProjectStage[]
  ) => Promise<ProjectStatus[]>;
  deleteProjectStatus: (id: string) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [hero, setHero] = useState<Hero>({
    title: "",
    description: "",
    subtitle: "",
  });
  const [features, setFeatures] = useState<Feature[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [projectStatus, setProjectStatus] = useState<ProjectStatus[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setHero(await contentManager.getHero());
        setClients(await contentManager.getClients());
        setServices(await contentManager.getServices());
        setMachines(await contentManager.getMachines());
        setProjects(await contentManager.getProjects());
        setFeatures(await contentManager.getFeatures());
        setProjectStatus(await contentManager.getProjectStatus());
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  const updateHero = async (newHero: Hero) => {
    const updatedHero = await contentManager.updateHero(newHero);
    setHero(updatedHero);
  };

  const addFeature = async (feature: Omit<Feature, "id">) => {
    const data = await contentManager.addFeature(feature);
    setFeatures([...data]);
  };

  const updateFeature = async (id: string, feature: Partial<Feature>) => {
    const updatedFeature = await contentManager.updateFeature(id, feature);
    if (updatedFeature) {
      setFeatures(features.map((f) => (f.id === id ? updatedFeature : f)));
    }
  };

  const deleteFeature = async (id: string) => {
    if (await contentManager.deleteFeature(id)) {
      setFeatures(features.filter((f) => f.id !== id));
    }
  };

  const addService = async (service: Omit<Service, "id">) => {
    const data = await contentManager.addService(service);
    setServices([...data]);
  };

  const updateService = async (id: string, service: Partial<Service>) => {
    const updatedService = await contentManager.updateService(id, service);
    if (updatedService) {
      setServices(services.map((s) => (s.id === id ? updatedService : s)));
    }
  };

  const deleteService = async (id: string) => {
    if (await contentManager.deleteService(id)) {
      setServices(services.filter((s) => s.id !== id));
    }
  };

  const addMachine = async (machine: Omit<Machine, "id">) => {
    const data = await contentManager.addMachine(machine);
    setMachines([...data]);
  };

  const updateMachine = async (id: string, machine: Partial<Machine>) => {
    const updatedMachine = await contentManager.updateMachine(id, machine);
    if (updatedMachine) {
      setMachines(machines.map((m) => (m.id === id ? updatedMachine : m)));
    }
  };

  const deleteMachine = async (id: string) => {
    if (await contentManager.deleteMachine(id)) {
      setMachines(machines.filter((m) => m.id !== id));
    }
  };

  const addProject = async (project: Omit<Project, "id">) => {
    const data = await contentManager.addProject(project);
    setProjects([...data]);
  };

  const updateProject = async (id: string, project: Partial<Project>) => {
    const updatedProject = await contentManager.updateProject(id, project);
    if (updatedProject) {
      setProjects(projects.map((p) => (p.id === id ? updatedProject : p)));
    }
  };

  const deleteProject = async (id: string) => {
    if (await contentManager.deleteProject(id)) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  const addClient = async (client: Omit<Client, "id">) => {
    const data = await contentManager.addClient(client);
    if (data) {
      setClients([...data]);
    }
    return data;
  };

  const updateClient = async (id: string, client: Partial<Client>) => {
    const updatedClient = await contentManager.updateClient(id, client);
    if (updatedClient) {
      setClients({ ...updatedClient });
    }
    return updatedClient;
  };

  const deleteClient = async (id: string) => {
    if (await contentManager.deleteClient(id)) {
      setClients(clients.filter((c) => c.id !== id));
    }
  };

  const searchProjectStatus = async (ids: string) => {
    return await contentManager.getProjectStatusById(ids);
  };

  const addProjectStatus = async (
    projectStatus: Omit<ProjectStatus, "id" | "projectid">
  ) => {
    const data = await contentManager.addProjectStatus(projectStatus);
    setProjectStatus([...data]);
  };

  const updateProjectStatus = async (
    id: string,
    updatedStatus: ProjectStatus,
    stages: ProjectStage[]
  ) => {
    const data = await contentManager.updateProjectStatus(id, updatedStatus, stages);
    if (data) {
      setProjectStatus(projectStatus.map((p) => (p.id === id ? data : p)));
    }
    return projectStatus;
  };

  const deleteProjectStatus = async (id: string) => {
    if (await contentManager.deleteProjectStatus(id)) {
      setProjectStatus(projectStatus.filter((p) => p.id !== id));
    }
  };

  return (
    <ContentContext.Provider
      value={{
        hero,
        updateHero,
        features,
        addFeature,
        updateFeature,
        deleteFeature,
        services,
        machines,
        projects,
        clients,
        addService,
        updateService,
        deleteService,
        addMachine,
        updateMachine,
        deleteMachine,
        addProject,
        updateProject,
        deleteProject,
        addClient,
        updateClient,
        deleteClient,
        projectStatus,
        searchProjectStatus,
        addProjectStatus,
        updateProjectStatus,
        deleteProjectStatus,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
}
