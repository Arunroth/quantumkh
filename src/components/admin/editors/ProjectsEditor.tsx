import React, {useState} from "react";
import {Edit2, Plus, Save, Trash2, X} from "lucide-react";
import {useContent} from "../../../context/ContentContext";
import type {Project} from "../../../utils/contentManager";
import ImageUpload from "../../common/ImageUpload";
import {arrayMove, SortableContext, useSortable, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {closestCenter, DndContext, DragEndEvent} from "@dnd-kit/core";

export default function ProjectsEditor() {
    const {projects, addProject, updateProject, deleteProject} = useContent();
    const [recentProjects, setRecentProject] = useState(projects);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editedContent, setEditedContent] = useState<Project | null>(null);

    const handleEdit = (project: Project) => {
        setEditingId(project.id);
        setEditedContent(project);
    };

    const handleSave = async () => {
        if (editedContent) {
            const data = await updateProject(editedContent.id, editedContent);
            setRecentProject(data);
            setEditingId(null);
            setEditedContent(null);
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditedContent(null);
    };

    const handleAdd = async () => {
        const newProject = {
            title: "New Project",
            client: "Client Name",
            description: "Project description",
            image:
                "https://images.unsplash.com/photo-1565962768804-b667f1d18a55?auto=format&fit=crop&q=80",
            category: "Manufacturing",
            completion: new Date().getFullYear().toString(),
            range: projects[projects.length - 1].range + 1
        };
        const data = await addProject(newProject);
        setRecentProject(data);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            const data = await deleteProject(id);
            setRecentProject(data);
        }
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const {active, over} = event;
        if (active.id !== over?.id) {
            const oldIndex = recentProjects.findIndex((item) => item.id === active.id);
            const newIndex = recentProjects.findIndex((item) => item.id === over?.id);

            const updatedItems = [...recentProjects]; // Create a new array
            updatedItems[oldIndex] = {...updatedItems[oldIndex], range: recentProjects[newIndex].range};
            updatedItems[newIndex] = {...updatedItems[newIndex], range: recentProjects[oldIndex].range};

            setRecentProject(arrayMove(updatedItems, oldIndex, newIndex));

            updateProject(
                updatedItems[oldIndex].id,
                updatedItems[oldIndex]
            );
            updateProject(
                updatedItems[newIndex].id,
                updatedItems[newIndex]
            );

        }
    };
    const ProjectCard: React.FC<{ id: string, project: Project }> = ({id, project}) => {
        const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id});

        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
        };
        return (
            <div
                key={project.id}
                className="m-2 rounded-lg overflow-hidden bg-gray-50 dark:bg-dark-800"
                ref={setNodeRef} style={style}
            >
                {editingId === project.id ? (
                    <div className="p-4 space-y-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Title
                            </label>
                            <input
                                type="text"
                                value={editedContent?.title}
                                onChange={(e) =>
                                    setEditedContent({
                                        ...editedContent!,
                                        title: e.target.value,
                                    })
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Client
                            </label>
                            <input
                                type="text"
                                value={editedContent?.client}
                                onChange={(e) =>
                                    setEditedContent({
                                        ...editedContent!,
                                        client: e.target.value,
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
                                rows={3}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mb-2">
                                Image
                            </label>
                            <ImageUpload
                                currentImageUrl={editedContent?.image || ""}
                                onImageUrlChange={(url) =>
                                    setEditedContent({...editedContent!, image: url})
                                }
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Category
                            </label>
                            <input
                                type="text"
                                value={editedContent?.category}
                                onChange={(e) =>
                                    setEditedContent({
                                        ...editedContent!,
                                        category: e.target.value,
                                    })
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Completion Year
                            </label>
                            <input
                                type="text"
                                value={editedContent?.completion}
                                onChange={(e) =>
                                    setEditedContent({
                                        ...editedContent!,
                                        completion: e.target.value,
                                    })
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={handleSave}
                                className="text-green-600 hover:text-green-700"
                            >
                                <Save className="h-5 w-5"/>
                            </button>
                            <button
                                onClick={handleCancel}
                                className="text-red-600 hover:text-red-700"
                            >
                                <X className="h-5 w-5"/>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div {...attributes} {...listeners} className="aspect-w-16 aspect-h-9 relative">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-48 object-contain"
                            />
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{project.title}</h3>
                                    <p className="text-sm text-primary-500">{project.client}</p>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{project.description}</p>
                                    <div className="mt-2">
                        <span
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-400">
                          {project.category}
                        </span>
                                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                          Completed: {project.completion}
                        </span>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(project)}
                                        className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
                                    >
                                        <Edit2 className="h-5 w-5"/>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <Trash2 className="h-5 w-5"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    Projects
                </h2>
                <button
                    onClick={handleAdd}
                    className="flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400"
                >
                    <Plus className="h-5 w-5 mr-1"/>
                    Add Project
                </button>
            </div>

            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={recentProjects.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                    <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px"}}>
                        {recentProjects.map((project) => (
                            <ProjectCard key={project.id} id={project.id} project={project}></ProjectCard>
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
}
