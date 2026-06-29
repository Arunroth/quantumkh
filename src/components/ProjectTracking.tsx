import { useEffect, useRef, useState } from "react";
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
import { ApiError, buildApiUrl } from "../lib/api/http.ts";
import { lookupPublicProjectTracking } from "../lib/api/publicTracking.ts";
import { PublicProjectTrackingResponse } from "../lib/types/publicTracking.ts";
import {
  formatTrackingIdentifierLine,
  formatTrackingStatusLabel,
  getTrackingStageIconToken,
  normalizeTrackingLookupInput,
} from "./projectTracking.utils";

const TRACKING_STORAGE_KEY = "publicProjectTrackingLookup";

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

interface StoredLookup {
  referenceNo: string;
  vat: string;
}

function loadStoredLookup(): StoredLookup | null {
  const raw = localStorage.getItem(TRACKING_STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<StoredLookup>;
    if (typeof parsed.referenceNo === "string") {
      return { referenceNo: parsed.referenceNo, vat: parsed.vat ?? "" };
    }
  } catch {
    // Legacy plain-string value — ignore and let the user search again.
  }
  return null;
}

function ImageLightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}): React.ReactElement {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Close image"
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] max-w-full rounded-lg object-contain shadow-2xl"
      />
    </div>
  );
}

export default function ProjectTracking() {
  const [trackingInput, setTrackingInput] = useState("");
  const [vat, setVat] = useState("");
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState("");
  const [projectData, setProjectData] =
    useState<PublicProjectTrackingResponse | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const stored = loadStoredLookup();
    if (!stored || !stored.referenceNo) return;

    const initialInput = stored.vat
      ? `${stored.referenceNo}, ${stored.vat}`
      : stored.referenceNo;
    setTrackingInput(initialInput);
    setVat(stored.vat);

    lookupPublicProjectTracking(stored)
      .then(setProjectData)
      .catch((err: unknown) => {
        console.error("Error fetching project tracking:", err);
      });
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const normalized = normalizeTrackingLookupInput({
        trackingCode: trackingInput,
        vat: "",
      });
      if (!normalized.referenceNo) {
        setError("Enter your project reference number to track your project.");
        setProjectData(null);
        setIsLoading(false);
        return;
      }

      const project = await lookupPublicProjectTracking(normalized);
      setProjectData(project);
      
      const formattedInput = normalized.vat
        ? `${normalized.referenceNo}, ${normalized.vat}`
        : normalized.referenceNo;
      setTrackingInput(formattedInput);
      setVat(normalized.vat);
      localStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(normalized));
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        setError("Project not found. Check your project reference number and VAT, then try again.");
      } else {
        setError("Could not load tracking. Please try again.");
      }
      setProjectData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getFormattedDate = (date: string) => {
    return new Date(date).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
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
              By entering "Project Number, VAT Number" (e.g., 250001 , L001-xxxxxxxxx)
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
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value.toUpperCase())}
                placeholder="Project Number, VAT Number (e.g., 250001, L001-xxxxxxxxx)"
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
                    {formatTrackingIdentifierLine(projectData.referenceNo, vat)}
                  </span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    projectData.status === "completed"
                      ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400"
                      : projectData.status === "in-progress"
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
                Progress timeline
              </h3>
              <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                From order confirmation through delivery. Each step updates as your
                project moves forward.
              </p>

              {projectData.stages.length > 0 ? (
                <ul className="space-y-0">
                  {projectData.stages.map((stage, index) => {
                    const StageIcon =
                      TRACKING_STAGE_ICONS[getTrackingStageIconToken(stage.title)] ||
                      TRACKING_STAGE_ICONS.default;
                    const isLast = index === projectData.stages.length - 1;

                    return (
                      <li key={stage.id} className="flex gap-4">
                        <div className="flex w-12 shrink-0 flex-col items-center">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary-500 bg-primary-500 text-white shadow-sm">
                            <StageIcon className="h-5 w-5" />
                          </div>
                          {!isLast && (
                            <div
                              className="mt-1 w-1 flex-1 min-h-[2.5rem] rounded-full bg-primary-500"
                              aria-hidden
                            />
                          )}
                        </div>
                        <div className="min-w-0 flex-1 pb-10 pt-1">
                          <p className="text-base font-semibold text-gray-900 dark:text-white">
                            {stage.title}
                          </p>
                          <p className="mt-1 text-xs text-primary-600 dark:text-primary-400">
                            {getFormattedDate(stage.happenedAt)}
                          </p>
                          {stage.description && (
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                              {stage.description}
                            </p>
                          )}
                          {stage.images.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {stage.images.map((image) => (
                                <button
                                  key={image}
                                  type="button"
                                  onClick={() => {
                                    setLightboxSrc(buildApiUrl(image));
                                    setLightboxAlt(stage.title);
                                  }}
                                  className="rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                >
                                  <img
                                    src={buildApiUrl(image)}
                                    alt={stage.title}
                                    className="h-16 w-16 rounded-md border border-gray-200 object-cover transition-opacity hover:opacity-80 dark:border-gray-700"
                                  />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No progress updates yet. Check back soon — your supplier will post
                  updates here as work begins.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {lightboxSrc !== null && (
        <ImageLightbox
          src={lightboxSrc}
          alt={lightboxAlt}
          onClose={() => setLightboxSrc(null)}
        />
      )}
    </div>
  );
}
