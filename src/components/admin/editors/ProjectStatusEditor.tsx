import { useState } from "react";
import { Edit2, Save, X, Plus, Trash2 } from "lucide-react";
import { useContent } from "../../../context/ContentContext";
import {
  ProjectStatus,
  ProjectStatusEnum,
} from "./../../../utils/contentManager";

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

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];

  const handleEdit = (project: ProjectStatus) => {
    setEditingId(project.id);
    setEditedContent(project);
  };


  const handleSave = () => {
    if (editedContent) {
      updateProjectStatus(editedContent.id, editedContent);
      setEditingId(null);
      setEditedContent(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedContent(null);
  };

  const handleAdd = () => {

    const newProject = {
      name: "New Tracking Project",
      status: ProjectStatusEnum.QUEUED,
      stage: "Review",
      startdate: formattedDate,
      estimatedcompletion: formattedDate,
      progress: 0,
      projectid: "",
      vat: ""
    };
    addProjectStatus(newProject);
  };

  const handleDelete = (id: string) => {
    if (
      window.confirm("Are you sure you want to delete this tracking project?")
    ) {
      deleteProjectStatus(id);
    }
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
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Processing Percentage (%)
                  </label>
                  <input
                    type="number"
                    value={editedContent?.progress}
                    onChange={(e) =>
                      setEditedContent({
                        ...editedContent!,
                        progress: e.target.value
                          ? parseInt(e.target.value, 10)
                          : 0,
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                {/* 
                <div>
                  <label className="inline-flex mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Curent Stage
                    <button onClick={addStage} className="flex items-center ml-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
                    ><Plus className="h-4 w-4 " />
                    </button>
                  </label>
                  {editedContent?.stages && editedContent?.stages.map((stage, index) => (
                    <div className="flex space-x-4 mb-2" key={index}>
                      <div className="w-2/4">
                        <input
                          type="text"
                          value={stage?.name}
                          onChange={(e) => stage.name = e.target.value}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        /></div>

                      <div className="w-2/4 ">
                        <input
                          type="date"
                          value={stage?.date}
                          onChange={(e) => stage.date = e.target.value}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                      </div>
                      <div className="w-1/5 py-2 ">
                        <button onClick={removeStage(index)} className="flex items-center ml-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 px-2 border border-red-500 hover:border-transparent rounded"
                        ><Trash2 className="h-4 w-4 " />
                        </button>
                      </div>
                    </div>
                  ))} */}

                <div>
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
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={
                      editedContent?.startdate
                        ? editedContent.startdate.slice(0, 10)
                        : ""
                    }
                    onChange={(e) =>
                      setEditedContent({
                        ...editedContent!,
                        startdate: e.target.value,
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Estimated Completion
                  </label>
                  <input
                    type="date"
                    value={
                      editedContent?.estimatedcompletion
                        ? editedContent.estimatedcompletion.slice(0, 10)
                        : ""
                    }
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
            ) : (
              <div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {project.name}
                      </h3>
                      <p className="text-sm text-primary-500">
                        {project.projectid}
                      </p>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {project.stage}
                      </p>
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
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
