import { useEffect, useMemo, useState } from "react";
import {
  CheckCheck,
  CheckCircle2,
  Cog,
  MapPin,
  Package,
  Ruler,
  Search,
  ShieldCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { fetchProjectTrackingFromSupabase } from "../lib/supabasePublicTracking.ts";
import { PublicProjectTrackingResponse } from "../lib/types/publicTracking.ts";
import {
  formatTrackingIdentifierLine,
  getTrackingStageIconToken,
  formatTrackingStageLabel,
  formatTrackingStatusLabel,
  normalizeTrackingLookupInput,
} from "./projectTracking.utils";

const TRACKING_STORAGE_KEY = "publicProjectTrackingLookup";
const LEGACY_TRACKING_STORAGE_KEY = "projectIds";

const TRACKING_STAGE_ICONS: Record<string, LucideIcon> = {
  confirm: CheckCircle2,
  design: Ruler,
  approval: ShieldCheck,
  process: Cog,
  packaging: Package,
  delivery: Truck,
  arrived: MapPin,
  completed: CheckCheck,
  default: Package,
};

export default function ProjectTracking() {
  const [lookupInput, setLookupInput] = useState("");
  const [projectData, setProjectData] =
    useState<PublicProjectTrackingResponse | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProject = async (storedLookup: string) => {
      try {
        setLookupInput(storedLookup.trim());
        const normalized = normalizeTrackingLookupInput({
          trackingCode: storedLookup,
          vat: "",
        });
        if (!normalized.projectId || !normalized.vat) {
          return;
        }
        const data = await fetchProjectTrackingFromSupabase(storedLookup);
        if (data) {
          setProjectData(data);
        }
      } catch (error) {
        console.error("Error fetching project tracking:", error);
      }
    };

    const storedLookup =
      localStorage.getItem(TRACKING_STORAGE_KEY) ||
      localStorage.getItem(LEGACY_TRACKING_STORAGE_KEY);
    if (storedLookup) {
      fetchProject(storedLookup);
    }
  }, []);

  const stageList = useMemo(() => {
    const stages = projectData?.stages ?? [];

    return [...stages].sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;

      return dateA - dateB; // ascending
    });
  }, [projectData]);

  const timelineProgressPercent = useMemo(() => {
    const fromApi = projectData?.progressPercent;
    if (fromApi != null && fromApi > 0) {
      return Math.min(100, Math.round(fromApi));
    }
    if (stageList.length === 0) return 0;
    const completedCount = stageList.filter(
      (s) => s.status === "completed",
    ).length;
    return Math.round((completedCount / stageList.length) * 100);
  }, [projectData, stageList]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const normalized = normalizeTrackingLookupInput({
        trackingCode: lookupInput,
        vat: "",
      });
      if (!normalized.projectId || !normalized.vat) {
        setError(
          "Enter your project ID and VAT in one line, separated by a comma — for example: PRJ-123E4567E89B, K123456789",
        );
        setProjectData(null);
        return;
      }

      const project = await fetchProjectTrackingFromSupabase(lookupInput);
      if (!project) {
        setError("Project not found. Check your code and VAT, then try again.");
        setProjectData(null);
        return;
      }

      setProjectData(project);
      localStorage.setItem(TRACKING_STORAGE_KEY, lookupInput.trim());
    } catch (error) {
      setError("Could not load tracking. Please try again.");
      setProjectData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getFormattedDate = (date?: string) => {
    return date ? date.slice(0, 10) : "";
  };

  return (
    <div className="pb-24 pt-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Project Tracking
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Track your project's progress in real-time
            <br />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {`By entering "Project Number, VAT Number" (e.g., 250001 , L001-xxxxxxxxx)`}
            </span>
          </p>
        </div>

        <form onSubmit={handleSearch} className="mt-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
            <div className="relative min-w-0 flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={lookupInput}
                onChange={(e) => setLookupInput(e.target.value.toUpperCase())}
                placeholder="PRJ-123E4567E89B, K123456789"
                className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-700 dark:bg-dark-900 dark:text-white dark:focus:border-primary-500"
              />
            </div>
            <button type="submit" className="btn-primary shrink-0 px-6">
              {isLoading ? "Tracking..." : "Track project"}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {projectData && (
          <div className="mt-16 overflow-hidden rounded-lg bg-gray-50 shadow-lg dark:bg-dark-800 dark:shadow-black/30">
            <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {projectData.projectName}
                  </h2>
                  <span className="text-sm text-gray-400">
                    {formatTrackingIdentifierLine(
                      projectData.projectId,
                      projectData.vat,
                    )}
                  </span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    projectData.status === "COMPLETED"
                      ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400"
                      : projectData.status === "IN_PROGRESS"
                        ? "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400"
                        : "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400"
                  }`}
                >
                  {formatTrackingStatusLabel(projectData.status)}
                </span>
              </div>
            </div>

            <div className="px-6 py-5">
              <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                Production stages
              </h3>
              <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                From CNC production through delivery. Each step updates as your
                project moves forward.
              </p>

              <div className="mb-8">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Overall progress
                  </span>
                  <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                    {timelineProgressPercent}%
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-400 transition-all duration-700 ease-out"
                    style={{ width: `${timelineProgressPercent}%` }}
                  />
                </div>
              </div>

              {stageList.length > 0 ? (
                <ul className="space-y-0">
                  {stageList.map((stage, index) => {
                    const StageIcon =
                      TRACKING_STAGE_ICONS[
                        getTrackingStageIconToken(stage.stage)
                      ] || TRACKING_STAGE_ICONS.default;

                    const isCompleted = stage.status === "completed";
                    const isInProgress = stage.status === "in-progress";
                    const isQueued = !stage.status || stage.status === "queued";

                    // Use the newly added raw date or fallback
                    const rawDate =
                      stage.date || stage.updates?.[0]?.happenedAt;
                    const formattedDate = rawDate
                      ? getFormattedDate(rawDate)
                      : "";

                    const connectorColor = isCompleted
                      ? "bg-primary-500"
                      : isInProgress
                        ? "bg-green-500"
                        : "bg-gray-200 dark:bg-gray-700";

                    const iconStyle = isCompleted
                      ? "border-primary-500 bg-primary-500 text-white"
                      : isInProgress
                        ? "border-green-500 bg-green-500 text-white"
                        : "border-gray-300 bg-white text-gray-400 dark:border-gray-600 dark:bg-dark-900";

                    return (
                      <li
                        key={`${stage.stage}-${index}`}
                        className="flex gap-4"
                      >
                        <div className="flex w-12 shrink-0 flex-col items-center">
                          <div
                            className={`flex h-11 w-11 items-center justify-center rounded-full border-2 shadow-sm transition-colors ${iconStyle}`}
                          >
                            <StageIcon className="h-5 w-5" />
                          </div>
                          {index < stageList.length - 1 && (
                            <div
                              className={`mt-1 w-1 flex-1 min-h-[2.5rem] rounded-full ${connectorColor}`}
                              aria-hidden
                            />
                          )}
                        </div>
                        <div className="min-w-0 flex-1 pb-10 pt-1">
                          <div className="flex items-center space-x-3">
                            <p
                              className={`text-base font-semibold ${
                                !isQueued
                                  ? "text-gray-900 dark:text-white"
                                  : "text-gray-500 dark:text-gray-400"
                              }`}
                            >
                              {formatTrackingStageLabel(stage.stage)}
                            </p>
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wide ${
                                isCompleted
                                  ? "bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400"
                                  : isInProgress
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                                    : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                              }`}
                            >
                              {stage.status || "queued"}
                            </span>
                          </div>
                          <p
                            className={`mt-1 text-xs ${
                              isCompleted
                                ? "text-primary-600 dark:text-primary-400"
                                : isInProgress
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-gray-400 dark:text-gray-500"
                            }`}
                          >
                            {formattedDate
                              ? isCompleted
                                ? `Completed on ${formattedDate}`
                                : isInProgress
                                  ? `Started on ${formattedDate}`
                                  : `Estimated: ${formattedDate}`
                              : isCompleted
                                ? "Completed"
                                : isInProgress
                                  ? "In Progress"
                                  : "Waiting"}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Stage details will appear here when your project is linked to
                  the production pipeline. If you only see overall status, your
                  supplier may still be setting up milestones.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
