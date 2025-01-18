import { useEffect, useState } from "react";
import { Search, Package, Clock, CheckCircle } from "lucide-react";
import { ProjectStatus, contentManager } from "../utils/contentManager";

export default function ProjectTracking() {
  const [projectId, setProjectId] = useState("");
  const [projectData, setProjectData] = useState<ProjectStatus[]>();
  const [error, setError] = useState("");

  // Fetch the projectId from localStorage when the component mounts
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
    if (statuses) {
      setProjectData(statuses);
      localStorage.setItem("projectIds", projectId);
    } else {
      setError(
        "Project not found. Please check the project number and try again."
      );
      setProjectData([]);
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Project Tracking
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Track your project's progress in real-time
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
                placeholder="Enter Project Number (e.g., PRJ001)"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-dark-900 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <button type="submit" className="btn-primary">
              Track Project
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {projectData &&
          projectData.map((project) => (
            <div
              key={project.id}
              className="mt-8 bg-white dark:bg-dark-800 shadow rounded-lg overflow-hidden"
            >
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {project.name}{" "}
                    <span className="text-sm text-gray-400">
                      {project.projectid}
                    </span>
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === "completed"
                        ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400"
                        : project.status === "in-progress"
                        ? "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400"
                        : "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400"
                    }`}
                  >
                    {project.status.charAt(0).toUpperCase() +
                      project.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="px-6 py-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <Package className="h-6 w-6 text-primary-500" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Current Stage
                      </p>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">
                        {project.stage}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="h-6 w-6 text-primary-500" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Estimated Completion
                      </p>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">
                        {project.estimatedcompletion}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
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

                {project.status === "completed" && (
                  <div className="mt-6 flex items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 rounded-md">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                    <span className="text-green-700 dark:text-green-400">
                      Project completed successfully!
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
