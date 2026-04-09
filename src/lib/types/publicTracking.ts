export interface PublicTrackingUpdate {
  id: string;
  stage: string;
  title: string;
  description: string;
  imageUrl: string | null;
  happenedAt: string;
}

export interface PublicTrackingStage {
  stage: string;
  isCurrent: boolean;
  updates: PublicTrackingUpdate[];
  status?: string;
  date?: string;
}

export interface PublicProjectTrackingResponse {
  projectId: string;
  projectName: string;
  vat?: string | null;
  status: string;
  clientTrackingStage: string;
  progressPercent?: number;
  estimatedCompletion?: string | null;
  updates: PublicTrackingUpdate[];
  stages: PublicTrackingStage[];
}

export interface PublicProjectTrackingLookupInput {
  projectId: string;
  vat: string;
}
