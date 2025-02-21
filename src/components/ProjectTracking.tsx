import { useEffect, useState } from "react";
import { Search, Package, Clock, CheckCircle } from "lucide-react";
import { ProjectStatus, contentManager } from "../utils/contentManager";

export default function ProjectTracking() {
  const [projectId, setProjectId] = useState("");
  const [projectData, setProjectData] = useState<ProjectStatus[]>();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClients = async (ids: string) => {
      try {
        setProjectData(await contentManager.getProjectStatusById(ids));
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    const storedProjectId = localStorage.getItem("projectIds");
    if (storedProjectId) {
      setProjectId(storedProjectId);
      fetchClients(storedProjectId);
    }
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const statuses = await contentManager.getProjectStatusById(projectId);
    if (statuses && statuses.length !== 0) {
      setProjectData(statuses);
      localStorage.setItem("projectIds", projectId);
    } else {
      setError("Project not found. Please check the project number and VAT and try again.");
      setProjectData([]);
    }
  };

  const getFormattedDate = (date?: string) => {
    return date ? date.slice(0, 10) : "";
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Project Tracking</h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Track your project's progress in real-time
            <br />
            <span className="text-sm">By entering "Project Number, VAT Number" (e.g., 250001 , L001-xxxxxxxxx)</span>
          </p>
        </div>

        <form onSubmit={handleSearch} className="mt-8">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value.toUpperCase())}
                placeholder="Enter Project Number, VAT Number (e.g., PRJ001, 12386857)"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-dark-900 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <button type="submit" className="btn-primary">Track Project</button>
          </div>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {projectData && projectData.map((project) => (
          <div key={project.id} className="mt-8 bg-white dark:bg-dark-800 shadow rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {project.name}{" "}
                  <span className="text-sm text-gray-400">{project.projectid}</span>
                </h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  project.status === "completed"
                    ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400"
                    : project.status === "in-progress"
                    ? "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400"
                    : "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400"
                }`}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Timeline Progress Section */}
            <div className="px-6 py-5">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Project Timeline</h3>
              <div className="flex flex-col space-y-6">
                {project.stages &&
                  project.stages
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .map((stage, index) => (
                      <div key={index} className="flex items-start space-x-4 relative">
                        <div className="relative flex flex-col items-center">
                          <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                            index === project.stages.length - 1 ? "bg-green-500 text-white" : "bg-primary-500 text-white"
                          }`}>
                            <Package className="h-4 w-4" />
                          </div>
                          {index !== project.stages.length - 1 && (
                            <div className="w-0.5 h-6 bg-gray-400 dark:bg-gray-600 mt-1"></div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{getFormattedDate(stage.date)}</p>
                          <p className="text-lg font-medium text-gray-900 dark:text-white">{stage.name}</p>
                        </div>
                      </div>
                    ))}
              </div>

              {/* Estimated Completion Date - Hide if Project is Completed */}
              {project.status !== "completed" && project.estimatedcompletion && (
                <div className="mt-8 flex items-center justify-center bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md">
                  <Clock className="h-6 w-6 text-yellow-500 mr-2" />
                  <span className="text-yellow-700 dark:text-yellow-400 text-lg font-medium">
                    Estimated Completion: {getFormattedDate(project.estimatedcompletion)}
                  </span>
                </div>
              )}

              {/* Progress Bar - Override to 100% if Completed */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Progress</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {project.status === "completed" ? "100%" : `${project.progress}%`}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-primary-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: project.status === "completed" ? "100%" : `${project.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
