import { useState, useEffect } from "react";
import { Edit2, Save, X, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useContent } from "../../../context/ContentContext";
import {
  contentManager,
  ProjectStage,
  ProjectStatus,
  ProjectStatusEnum,
} from "./../../../utils/contentManager";

const PREDEFINED_STAGES = [
  "Review",
  "Design Confirmation",
  "Material Approval",
  "CNC Drawing",
  "Cutting",
  "Custom Process",
  "Quality Control",
  "Packaging",
  "Out for Delivery",
  "Arrived",
  "Completed",
];

export default function ProjectsEditor() {
  const {
    projectStatus,
    addProjectStatus,
    updateProjectStatus,
    deleteProjectStatus,
  } = useContent();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<ProjectStatus | null>(
    null
  );
  const [stages, setStages] = useState<ProjectStage[]>([]);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  useEffect(() => {
    if (!editedContent) return;
    let newStatus = ProjectStatusEnum.QUEUED;
    if (stages.some(s => s.status === ProjectStatusEnum.IN_PROGRESS)) {
      newStatus = ProjectStatusEnum.IN_PROGRESS;
    }
    if (stages.every(s => s.status === ProjectStatusEnum.COMPLETED)) {
      newStatus = ProjectStatusEnum.COMPLETED;
    }
    if (newStatus !== editedContent.status) {
      setEditedContent(prev => prev ? { ...prev, status: newStatus } : null);
    }
  }, [stages, editedContent?.status]);

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => 
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];

  const initStages = (project: ProjectStatus) => {
    if (project.stages && project.stages.length > 0) {
      setStages(project.stages);
    } else {
      setStages([
        { projectid: project?.id ?? "", name: "", date: formattedDate, status: ProjectStatusEnum.QUEUED },
      ]);
    }
  };

  const addStage = () => {
    setStages([
      ...stages,
      { projectid: editedContent?.id ?? "", name: "", date: formattedDate, status: ProjectStatusEnum.QUEUED },
    ]);
  };

  const removeStage = (index: number) => {
    return async () => {
      if (window.confirm("Are you sure you want to delete this stage?")) {
        let isDelete = true;
        if (stages[index].id) {
          isDelete = await contentManager.deleteStage(stages[index].id);
        }
        if (isDelete) {
          setStages(stages.filter((_, i) => i !== index));
          showToast("Stage deleted successfully!");
        }
      }
    };
  };

  const handleEdit = (project: ProjectStatus) => {
    setEditingId(project.id);
    setEditedContent(project);
    initStages(project);
  };

  const handleSave = async () => {
    if (editedContent) {
      // Validation: Ensure all stages have a selected name
      if (stages.some((stage) => !stage.name || stage.name.trim() === "")) {
        alert("Please select a Stage Name for all stages before saving.");
        return;
      }

      const calculatedProgress = stages.length === 0 ? 0 : Math.round((stages.filter(s => s.status === ProjectStatusEnum.COMPLETED).length / stages.length) * 100);
      const contentToSave = {
        ...editedContent,
        progress: calculatedProgress
      };

      try {
        await updateProjectStatus(contentToSave.id, contentToSave, stages);
        setEditingId(null);
        setEditedContent(null);
        showToast("Tracking project saved successfully!");
      } catch (e) {
        alert(e instanceof Error ? e.message : "Failed to save tracking project stages");
        return; // Don't clear stages if it failed
      }
    }
    setStages([]);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedContent(null);
    setStages([]);
  };

  const handleAdd = async () => {
    const newProject = {
      name: "New Tracking Project",
      status: ProjectStatusEnum.QUEUED,
      stage: "Review",
      startdate: formattedDate,
      estimatedcompletion: formattedDate,
      progress: 0,
      projectid: "",
      vat: "",
      stages: [],
    };
    try {
      await addProjectStatus(newProject);
      showToast("New tracking project added successfully!");
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to add tracking project");
    }
  };

  const handleDelete = (id: string) => {
    if (
      window.confirm("Are you sure you want to delete this tracking project?")
    ) {
      deleteProjectStatus(id);
      showToast("Tracking project deleted successfully!");
    }
  };

  const getFormattedDate = (date?: string) => {
    return date ? date.slice(0, 10) : "";
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Tracking Projects
        </h2>
        <button
          onClick={handleAdd}
          className="flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400"
        >
          <Plus className="h-5 w-5 mr-1" />
          Add Tracking Project
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {projectStatus.map((project) => (
          <div
            key={project.id}
            className="border dark:border-gray-700 rounded-lg overflow-hidden"
          >
            {editingId === project.id ? (
              <div className="p-4 space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Project Name
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
                  <div className="flex space-x-4 mb-2">
                    <div className="w-2/5">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Identify number
                      </label>
                      <input
                        type="text"
                        value={editedContent?.projectid}
                        onChange={(e) =>
                          setEditedContent({
                            ...editedContent!,
                            projectid: e.target.value,
                          })
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                    <div className="w-3/5">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        VAT
                      </label>
                      <input
                        type="text"
                        value={editedContent?.vat}
                        onChange={(e) =>
                          setEditedContent({
                            ...editedContent!,
                            vat: e.target.value,
                          })
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Status
                  </label>
                  <select
                    value={editedContent?.status}
                    onChange={(e) =>
                      setEditedContent({
                        ...editedContent!,
                        status: e.target.value, // Convert to boolean
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value={ProjectStatusEnum.QUEUED}>Queued</option>
                    <option value={ProjectStatusEnum.IN_PROGRESS}>
                      In Progress
                    </option>
                    <option value={ProjectStatusEnum.COMPLETED}>
                      Completed
                    </option>
                  </select>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Processing Percentage
                  </label>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-5">
                    <div
                      className="bg-primary-500 h-5 rounded-full transition-all duration-500 text-xs text-white text-center flex items-center justify-center font-medium"
                      style={{ width: `${stages.length === 0 ? 0 : Math.round((stages.filter(s => s.status === ProjectStatusEnum.COMPLETED).length / stages.length) * 100)}%` }}
                    >
                      {stages.length === 0 ? 0 : Math.round((stages.filter(s => s.status === ProjectStatusEnum.COMPLETED).length / stages.length) * 100)}%
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="inline-flex mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Staging
                    <button
                      onClick={addStage}
                      className="flex items-center ml-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
                    >
                      <Plus className="h-4 w-4 " />
                    </button>
                  </label>

                  {stages &&
                    stages.map((stage, index) => (
                      <div className="flex flex-col space-y-2 mb-4 p-3 border rounded dark:border-gray-700" key={index}>
                        <div className="flex space-x-2">
                          <div className="w-1/2">
                            <input
                              type="text"
                              value={stage?.name || ""}
                              onChange={(e) => {
                                const updatedStages = [...stages];
                                updatedStages[index] = {
                                  ...stage,
                                  name: e.target.value,
                                };
                                setStages(updatedStages);
                              }}
                              list={`stage-options-${index}`}
                              placeholder="Enter or select stage name"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            <datalist id={`stage-options-${index}`}>
                              {PREDEFINED_STAGES.map((predef) => (
                                <option key={predef} value={predef} />
                              ))}
                            </datalist>
                          </div>
                          <div className="w-1/2">
                            <input
                              type="date"
                              value={getFormattedDate(stage?.date)}
                              onChange={(e) => {
                                const updatedStages = [...stages]; // Create a shallow copy of stages
                                updatedStages[index] = {
                                  ...stage,
                                  date: e.target.value,
                                }; // Update the specific stage
                                setStages(updatedStages); // Set the updated stages array
                              }}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                          </div>
                        </div>
                        <div className="flex space-x-2 items-center">
                          <div className="w-flex-1 w-full">
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md p-2">
                              <label className="flex items-center space-x-1 cursor-pointer">
                                <input
                                  type="radio"
                                  name={`status-${index}`}
                                  value={ProjectStatusEnum.QUEUED}
                                  checked={!stage.status || stage.status === ProjectStatusEnum.QUEUED}
                                  onChange={(e) => {
                                    const updatedStages = [...stages];
                                    updatedStages[index] = { ...stage, status: e.target.value };
                                    setStages(updatedStages);
                                  }}
                                  className="text-blue-600 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">Queued</span>
                              </label>
                              <label className="flex items-center space-x-1 cursor-pointer">
                                <input
                                  type="radio"
                                  name={`status-${index}`}
                                  value={ProjectStatusEnum.IN_PROGRESS}
                                  checked={stage.status === ProjectStatusEnum.IN_PROGRESS}
                                  onChange={(e) => {
                                    const updatedStages = [...stages];
                                    updatedStages[index] = { ...stage, status: e.target.value };
                                    setStages(updatedStages);
                                  }}
                                  className="text-blue-600 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">In Progress</span>
                              </label>
                              <label className="flex items-center space-x-1 cursor-pointer">
                                <input
                                  type="radio"
                                  name={`status-${index}`}
                                  value={ProjectStatusEnum.COMPLETED}
                                  checked={stage.status === ProjectStatusEnum.COMPLETED}
                                  onChange={(e) => {
                                    const updatedStages = [...stages];
                                    updatedStages[index] = { ...stage, status: e.target.value };
                                    setStages(updatedStages);
                                  }}
                                  className="text-blue-600 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">Completed</span>
                              </label>
                            </div>
                          </div>
                          <div>
                            <button
                              onClick={removeStage(index)}
                              className="flex items-center ml-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-3 border border-red-500 hover:border-transparent rounded"
                            >
                              <Trash2 className="h-4 w-4 " />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                  {/* <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Curent Stage
                    </label>
                    <input
                      type="text"
                      value={editedContent?.stage}
                      onChange={(e) =>
                        setEditedContent({
                          ...editedContent!,
                          stage: e.target.value,
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div> */}

                  <div className="mt-4">
                    <label className="block  text-sm font-medium text-gray-900 dark:text-white">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={getFormattedDate(editedContent?.startdate)}
                      onChange={(e) =>
                        setEditedContent({
                          ...editedContent!,
                          startdate: e.target.value,
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>

                  <div className="mt-4 mb-4">
                    <label className="block  text-sm font-medium text-gray-900 dark:text-white">
                      Estimated Completion
                    </label>
                    <input
                      type="date"
                      value={getFormattedDate(
                        editedContent?.estimatedcompletion
                      )}
                      onChange={(e) =>
                        setEditedContent({
                          ...editedContent!,
                          estimatedcompletion: e.target.value,
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
              </div>
            ) : (
              <div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {project.name}
                      </h3>
                      <p className="text-sm text-primary-500">
                        {project.projectid}, VAT({project.vat})
                      </p>
                      {/* <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {project.stage}
                      </p> */}
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-400">
                          {project.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Start date:{" "}
                        {project?.startdate
                          ? project.startdate.slice(0, 10)
                          : ""}
                      </p>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Estimated completion:{" "}
                        {project?.estimatedcompletion
                          ? project.estimatedcompletion.slice(0, 10)
                          : ""}
                      </p>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleExpand(project.id)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        {expandedIds.includes(project.id) ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                      <button
                        onClick={() => handleEdit(project)}
                        className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {expandedIds.includes(project.id) && (
                  <>
                    <div className="px-4 pb-4">
                      {project.stages && project.stages.length > 0 && (
                        <div className="mt-2 space-y-3 pt-2">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">Stages Tracking</h4>
                          {project.stages.map((stage, idx) => (
                            <div key={idx} className="flex flex-col bg-gray-50 dark:bg-gray-800 p-3 rounded border dark:border-gray-700">
                              <div className="flex justify-between items-center text-sm mb-2">
                                <span className="font-medium text-gray-800 dark:text-gray-200">{stage.name}</span>
                                <span className="text-xs text-gray-500">{stage?.date ? stage.date.slice(0, 10) : ""}</span>
                              </div>
                              <div className="flex space-x-2">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${(!stage.status || stage.status === ProjectStatusEnum.QUEUED) ? 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200' : 'bg-gray-100 text-gray-400 dark:bg-gray-900 dark:text-gray-600'}`}>
                                  QUEUE
                                </span>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${stage.status === ProjectStatusEnum.IN_PROGRESS ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-gray-100 text-gray-400 dark:bg-gray-900 dark:text-gray-600'}`}>
                                  IN PROGRESS
                                </span>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${stage.status === ProjectStatusEnum.COMPLETED ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400' : 'bg-gray-100 text-gray-400 dark:bg-gray-900 dark:text-gray-600'}`}>
                                  COMPLETED
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="px-4 pb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          Progress
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {project.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div
                          className="bg-primary-500 h-2.5 rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800 shadow-lg" role="alert">
          <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
          </svg>
          <span className="sr-only">Success</span>
          <div>{toastMessage}</div>
        </div>
      )}
    </div>
  );
}
