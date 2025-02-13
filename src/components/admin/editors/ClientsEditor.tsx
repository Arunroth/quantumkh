import React, {useState} from "react";
import {Edit2, Plus, Save, Trash2, X} from "lucide-react";
import {useContent} from "../../../context/ContentContext";
import {type Client} from "../../../utils/contentManager";
import ImageUpload from "../../common/ImageUpload";
import {closestCenter, DndContext, DragEndEvent} from "@dnd-kit/core";
import {arrayMove, SortableContext, useSortable, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

export default function ClientsEditor() {
    const {clients, addClient, updateClient, deleteClient} = useContent();
    const [recentClients, setRecentClients] = useState<Client[]>(clients);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editedContent, setEditedContent] = useState<Client | null>(null);

    const handleEdit = (client: Client) => {
        setEditingId(client.id);
        setEditedContent(client);
    };

    const handleSave = async () => {
        if (editedContent) {
            const updatedClients = await updateClient(
                editedContent.id,
                editedContent
            );
            setRecentClients(updatedClients);
            setEditingId(null);
            setEditedContent(null);
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditedContent(null);
    };

    const handleAdd = async () => {
        const newClient = {
            name: "New Client",
            logo: "https://images.unsplash.com/photo-1565962768804-b667f1d18a55?auto=format&fit=crop&q=80",
            industry: "Manufacturing",
            type: "Enterprise",
            testimonial: "",
            author: "admin",
            role: "",
            range: clients[clients.length - 1].range + 1
        };
        const newClients = await addClient(newClient);
        setRecentClients(newClients);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this client?")) {
            const deletedItems = await deleteClient(id);
            setRecentClients(deletedItems);
        }
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const {active, over} = event;
        if (active.id !== over?.id) {
            const oldIndex = recentClients.findIndex((item) => item.id === active.id);
            const newIndex = recentClients.findIndex((item) => item.id === over?.id);

            const updatedClients = [...recentClients]; // Create a new array
            updatedClients[oldIndex] = {...updatedClients[oldIndex], range: recentClients[newIndex].range};
            updatedClients[newIndex] = {...updatedClients[newIndex], range: recentClients[oldIndex].range};

            setRecentClients(arrayMove(updatedClients, oldIndex, newIndex));

            await updateClient(
                updatedClients[oldIndex].id,
                updatedClients[oldIndex]
            );
            await updateClient(
                updatedClients[newIndex].id,
                updatedClients[newIndex]
            );

        }
    };

    const ClientCard: React.FC<{ id: string; client: Client }> = ({id, client}) => {
        const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id});

        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
            padding: "16px",
            margin: "8px",
            backgroundColor: "#fdfdfc",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        };
        return (
            <div
                key={client.id}
                className="border dark:border-gray-700 rounded-lg overflow-hidden"
                ref={setNodeRef} style={style}
            >
                {editingId === client.id ? (
                    <div className="p-4 space-y-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Rank order
                            </label>
                            <input
                                type="number"
                                value={editedContent?.range}
                                onChange={(e) =>
                                    setEditedContent({
                                        ...editedContent!,
                                        range: e.target.value
                                            ? parseInt(e.target.value, 10)
                                            : 0,
                                    })
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
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
                                Logo Image
                            </label>
                            <ImageUpload
                                currentImageUrl={editedContent?.logo || ""}
                                onImageUrlChange={(url) =>
                                    setEditedContent({...editedContent!, logo: url})
                                }
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Industry
                            </label>
                            <input
                                type="text"
                                value={editedContent?.industry}
                                onChange={(e) =>
                                    setEditedContent({
                                        ...editedContent!,
                                        industry: e.target.value,
                                    })
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Type
                            </label>
                            <input
                                type="text"
                                value={editedContent?.type}
                                onChange={(e) =>
                                    setEditedContent({
                                        ...editedContent!,
                                        type: e.target.value,
                                    })
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Testimonial
                            </label>
                            <textarea
                                value={editedContent?.testimonial}
                                onChange={(e) =>
                                    setEditedContent({
                                        ...editedContent!,
                                        testimonial: e.target.value,
                                    })
                                }
                                rows={3}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Author
                            </label>
                            <input
                                type="text"
                                value={editedContent?.author}
                                onChange={(e) =>
                                    setEditedContent({
                                        ...editedContent!,
                                        author: e.target.value,
                                    })
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Role
                            </label>
                            <input
                                type="text"
                                value={editedContent?.role}
                                onChange={(e) =>
                                    setEditedContent({
                                        ...editedContent!,
                                        role: e.target.value,
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
                        <div className="p-4">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div {...attributes} {...listeners}
                                         className="h-24 cursor-grab  flex items-center justify-center mb-4">
                                        <img
                                            src={client.logo}
                                            alt={client.name}
                                            className="max-h-full object-contain"
                                        />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white text-center">
                                        {client.name}
                                    </h3>
                                    <div className="mt-2 text-center">
                        <span className="text-sm text-primary-500">
                          {client.industry}
                        </span>
                                        <span className="mx-2 text-gray-300">|</span>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {client.type}
                        </span>
                                    </div>
                                    {client.testimonial && (
                                        <blockquote className="mt-4 text-sm text-gray-600 dark:text-gray-400 italic">
                                            "{client.testimonial}"
                                            {client.author && (
                                                <footer className="mt-2 text-sm">
                                                    <strong>{client.author}</strong>
                                                    {client.role && (
                                                        <span className="text-gray-500">
                                  {" "}
                                                            - {client.role}
                                </span>
                                                    )}
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
                                        <Edit2 className="h-5 w-5"/>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(client.id)}
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
                    Clients
                </h2>
                <button
                    onClick={handleAdd}
                    className="flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400"
                >
                    <Plus className="h-5 w-5 mr-1"/>
                    Add Client
                </button>
            </div>

            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={recentClients.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                    <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px"}}>
                        {recentClients.map((client: Client) => (
                            <ClientCard key={client.id} id={client.id} client={client}></ClientCard>
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
}
