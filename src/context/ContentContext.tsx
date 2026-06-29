import {createContext, ReactNode, useContext, useEffect, useState,} from "react";
import {
    Client,
    contentManager,
    Feature,
    Hero,
    Machine,
    Project,
    Service,
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
    addMachine: (machine: Omit<Machine, "id">) => Promise<Machine[]>;
    updateMachine: (id: string, machine: Partial<Machine>) => Promise<Machine[]>;
    deleteMachine: (id: string) => Promise<Machine[]>;
    addProject: (project: Omit<Project, "id">) => Promise<Project[]>;
    updateProject: (id: string, project: Partial<Project>) => Promise<Project[]>;
    deleteProject: (id: string) => Promise<Project[]>;
    addClient: (client: Omit<Client, "id">) => Promise<Client[]>;
    updateClient: (id: string, client: Partial<Client>) => Promise<Client[]>;
    deleteClient: (id: string) => Promise<Client[]>;
    isLoading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);
const INITIAL_LOAD_TIMEOUT_MS = 3000;

async function withFallback<T>(promise: Promise<T>, fallback: T): Promise<T> {
    try {
        return await Promise.race([
            promise,
            new Promise<T>((resolve) =>
                setTimeout(() => resolve(fallback), INITIAL_LOAD_TIMEOUT_MS)
            ),
        ]);
    } catch {
        return fallback;
    }
}

export function ContentProvider({children}: { children: ReactNode }) {
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
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setIsLoading(true);
                const [
                    heroData,
                    clientsData,
                    servicesData,
                    machinesData,
                    projectsData,
                    featuresData,
                ] = await Promise.all([
                    withFallback(contentManager.getHero(), hero),
                    withFallback(contentManager.getClients(), clients),
                    withFallback(contentManager.getServices(), services),
                    withFallback(contentManager.getMachines(), machines),
                    withFallback(contentManager.getProjects(), projects),
                    withFallback(contentManager.getFeatures(), features),
                ]);

                setHero(heroData);
                setClients(clientsData);
                setServices(servicesData);
                setMachines(machinesData);
                setProjects(projectsData);
                setFeatures(featuresData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllData();
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
        return data;
    };

    const updateMachine = async (id: string, machine: Partial<Machine>) => {
        const updatedMachine = await contentManager.updateMachine(id, machine);
        if (updatedMachine) {
            setMachines([...updatedMachine]);
        }
        return updatedMachine;
    };

    const deleteMachine = async (id: string) => {
        const data = await contentManager.deleteMachine(id);
        setMachines([...data]);
        return data;
    };

    const addProject = async (project: Omit<Project, "id">) => {
        const data = await contentManager.addProject(project);
        setProjects([...data]);
        return data;
    };

    const updateProject = async (id: string, project: Partial<Project>) => {
        const updatedProject = await contentManager.updateProject(id, project);
        if (updatedProject) {
            setProjects([...updatedProject]);
        }
        return updatedProject;
    };

    const deleteProject = async (id: string) => {
        const data = await contentManager.deleteProject(id);
        setProjects([...data]);
        return data;
    };

    const addClient = async (client: Omit<Client, "id">) => {
        const data = await contentManager.addClient(client);
        setClients([...data]);
        return data;
    };

    const updateClient = async (id: string, client: Partial<Client>) => {
        const updatedClient = await contentManager.updateClient(id, client);
        if (updatedClient) {
            setClients({...updatedClient});
        }
        return updatedClient;
    };

    const deleteClient = async (id: string) => {
        const data = await contentManager.deleteClient(id);
        setClients([...data]);
        return data;
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
                isLoading,
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
