import { supabase } from "../utils/supabase";
import type { ProjectStage, ProjectStatus } from "../utils/contentManager";
import { normalizeTrackingLookupInput } from "../utils/normalizeTrackingLookupInput";
import type { PublicProjectTrackingResponse, PublicTrackingStage } from "./types/publicTracking";

/** Matches legacy admin “pending” placeholder when used; otherwise any real date = done. */
const STAGE_PENDING_DATE = "1984-01-01";

function displayStageLabel(name: string): string {
  return String(name || "").replace(/^\d+\.\s*/, "").trim() || name;
}

function isStageMarkedComplete(stage: ProjectStage): boolean {
  const d = String(stage.date || "").slice(0, 10);
  if (!d || d === STAGE_PENDING_DATE) return false;
  return true;
}

function sortStagesForPublicTimeline(stages: ProjectStage[]): ProjectStage[] {
  const copy = [...stages];
  const hasOrderedPrefix = copy.some((s) => /^\d+\.\s*/.test(String(s.name)));
  if (hasOrderedPrefix) {
    return copy.sort((a, b) => {
      const ma = String(a.name).match(/^(\d+)\./);
      const mb = String(b.name).match(/^(\d+)\./);
      return (
        (ma ? parseInt(ma[1], 10) : 999) - (mb ? parseInt(mb[1], 10) : 999)
      );
    });
  }
  return copy.sort(
    (a, b) =>
      new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime(),
  );
}

function mapDbStatusToUi(status: string): string {
  const s = String(status || "").toLowerCase();
  if (s === "completed") return "COMPLETED";
  if (s === "in-progress") return "IN_PROGRESS";
  return "QUEUED";
}

function mapRowToPublicResponse(
  row: ProjectStatus,
  stages: ProjectStage[],
): PublicProjectTrackingResponse {
  const sorted = sortStagesForPublicTimeline(stages);
  const firstPending = sorted.findIndex((s) => !isStageMarkedComplete(s));

  const publicStages: PublicTrackingStage[] = sorted.map((s, i) => {
    const done = isStageMarkedComplete(s);
    const label = displayStageLabel(s.name);
    return {
      stage: label,
      isCurrent: firstPending >= 0 && i === firstPending,
      updates: done
        ? [
            {
              id: s.id ?? `stage-${i}`,
              stage: label,
              title: "Updated",
              description: "",
              imageUrl: null,
              happenedAt: String(s.date || "").includes("T")
                ? String(s.date)
                : `${String(s.date).slice(0, 10)}T12:00:00.000Z`,
            },
          ]
        : [],
      status: s.status,
      date: s.date,
    };
  });

  return {
    projectId: row.projectid,
    projectName: row.name,
    vat: row.vat,
    status: mapDbStatusToUi(row.status),
    clientTrackingStage: row.stage,
    progressPercent: row.progress,
    estimatedCompletion: row.estimatedcompletion ?? null,
    updates: [],
    stages: publicStages,
  };
}

/**
 * Public tracking lookup: one combined input (e.g. "PRJ-XXX, K123456789")
 * parsed the same way as before, then loaded from Supabase.
 */
export async function fetchProjectTrackingFromSupabase(
  combinedInput: string,
): Promise<PublicProjectTrackingResponse | null> {
  const trimmed = combinedInput.trim();
  const { projectId, vat } = normalizeTrackingLookupInput({
    trackingCode: trimmed,
    vat: "",
  });
  if (!projectId || !vat) {
    return null;
  }

  const { data, error } = await supabase
    .from("project_status")
    .select("*")
    .eq("projectid", projectId)
    .eq("vat", vat)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Supabase tracking lookup:", error);
    return null;
  }
  if (!data) {
    return null;
  }

  const row = data as ProjectStatus;
  const { data: stageRows, error: stagesError } = await supabase
    .from("project_stages")
    .select("*")
    .eq("projectid", row.id);

  if (stagesError) {
    console.error("Supabase project_stages:", stagesError);
    return mapRowToPublicResponse(row, []);
  }

  return mapRowToPublicResponse(row, (stageRows || []) as ProjectStage[]);
}
