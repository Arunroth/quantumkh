export interface PublicTrackingStage {
  id: string;
  title: string;
  description: string | null;
  happenedAt: string;
  images: string[];
}

export interface PublicProjectTrackingResponse {
  referenceNo: string;
  projectName: string;
  status: string;
  createdAt: string;
  stages: PublicTrackingStage[];
}

export interface PublicProjectTrackingLookupInput {
  referenceNo: string;
  vat: string;
}
