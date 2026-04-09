import React, {useState} from "react";
import {Edit2, Plus, Save, Trash2, X} from "lucide-react";
import {useContent} from "../../../context/ContentContext";
import type {Machine} from "../../../utils/contentManager";
import ImageUpload from "../../common/ImageUpload";
import {arrayMove, SortableContext, useSortable, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {closestCenter, DndContext, DragEndEvent} from "@dnd-kit/core";

export default function MachinesEditor() {
    const {machines, addMachine, updateMachine, deleteMachine} = useContent();
    const [recentMachines, setRecentMachines] = useState<Machine[]>(machines);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editedContent, setEditedContent] = useState<Machine | null>(null);

    const handleEdit = (machine: Machine) => {
        setEditingId(machine.id);
        setEditedContent(machine);
    };

    const handleSave = async () => {
        if (editedContent) {
            const data = await updateMachine(editedContent.id, editedContent);
            setRecentMachines(data);
            setEditingId(null);
            setEditedContent(null);
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditedContent(null);
    };

    const handleAdd = async () => {
        const newMachine = {
            name: "New Machine",
            type: "CNC Machine",
            description: "Machine description",
            image:
                "https://images.unsplash.com/photo-1565962768804-b667f1d18a55?auto=format&fit=crop&q=80",
            workspace: '40" x 20" x 25"',
            speed: "12,000 RPM",
            accuracy: '±0.0002"',
            materials: "Metals, Plastics",
            range: machines[machines.length - 1].range + 1
        };
        const data = await addMachine(newMachine);
        setRecentMachines(data);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this machine?")) {
            const data = await deleteMachine(id);
            setRecentMachines(data);
        }
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const {active, over} = event;
        if (active.id !== over?.id) {
            const oldIndex = recentMachines.findIndex((item) => item.id === active.id);
            const newIndex = recentMachines.findIndex((item) => item.id === over?.id);

            const updatedItems = [...recentMachines]; // Create a new array
            updatedItems[oldIndex] = {...updatedItems[oldIndex], range: recentMachines[newIndex].range};
            updatedItems[newIndex] = {...updatedItems[newIndex], range: recentMachines[oldIndex].range};

            setRecentMachines(arrayMove(updatedItems, oldIndex, newIndex));

            updateMachine(
                updatedItems[oldIndex].id,
                updatedItems[oldIndex]
            );
            updateMachine(
                updatedItems[newIndex].id,
                updatedItems[newIndex]
            );

        }
    };

    const MachineCard: React.FC<{ id: string, machine: Machine }> = ({id, machine}) => {
        const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id});

        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
        };
        return (<div
            key={machine.id}
            className="m-2 rounded-lg overflow-hidden bg-gray-50 dark:bg-dark-800"
            ref={setNodeRef} style={style}

        >
            {editingId === machine.id ? (
                <div className="p-4 space-y-4"
                >
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
                                setEditedContent({...editedContent!, image: url})
                            }
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Workspace
                            </label>
                            <input
                                type="text"
                                value={editedContent?.workspace}
                                onChange={(e) =>
                                    setEditedContent({
                                        ...editedContent!,
                                        workspace: e.target.value,
                                    })
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Speed
                            </label>
                            <input
                                type="text"
                                value={editedContent?.speed}
                                onChange={(e) =>
                                    setEditedContent({
                                        ...editedContent!,
                                        speed: e.target.value,
                                    })
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Accuracy
                            </label>
                            <input
                                type="text"
                                value={editedContent?.accuracy}
                                onChange={(e) =>
                                    setEditedContent({
                                        ...editedContent!,
                                        accuracy: e.target.value,
                                    })
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Materials
                            </label>
                            <input
                                type="text"
                                value={editedContent?.materials}
                                onChange={(e) =>
                                    setEditedContent({
                                        ...editedContent!,
                                        materials: e.target.value,
                                    })
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
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
                    <div {...attributes} {...listeners} className="aspect-w-16 cursor-grab  aspect-h-9 relative">
                        <img
                            src={machine.image}
                            alt={machine.name}
                            className="w-full h-48 object-contain"
                        />
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                    {machine.name}
                                </h3>
                                <p className="text-sm text-primary-500">{machine.type}</p>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    {machine.description}
                                </p>
                                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Workspace: {machine.workspace}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Speed: {machine.speed}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Accuracy: {machine.accuracy}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Materials: {machine.materials}
                                    </p>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEdit(machine)}
                                    className="text-primary-600  hover:text-primary-700 dark:text-primary-400"
                                >
                                    <Edit2 className="h-5 w-5"/>
                                </button>
                                <button
                                    onClick={() => handleDelete(machine.id)}
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <Trash2 className="h-5 w-5"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>)
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    Machines
                </h2>
                <button
                    onClick={handleAdd}
                    className="flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400"
                >
                    <Plus className="h-5 w-5 mr-1"/>
                    Add Machine
                </button>
            </div>

            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={recentMachines.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                    <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px"}}>
                        {/*<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">*/}
                        {recentMachines.map((machine) => (
                            <MachineCard key={machine.id} id={machine.id} machine={machine}></MachineCard>
                        ))}
                        {/*</div>*/}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
}
