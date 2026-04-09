export interface RequestProjectFileReference {
  originalFilename: string;
  filename: string;
}

export interface RequestProjectFormData {
  name: string;
  companyName?: string;
  email: string;
  phone: string;
  contactMethod: string;
  projectName?: string;
  projectType: string;
  projectDescription: string;
  materialPreferences?: string[];
  toleranceRequirement?: string;
  estimatedQuantity?: string;
  requiredSurfaceFinish?: string;
  fileNames?: RequestProjectFileReference[];
  capacity?: string;
  budgetRange?: string;
  preferredDeliveryTimeline?: string;
  exampleLink?: string;
  shoppingLocation?: string;
  specialRequirements?: string;
}

export interface RequestProjectCreatedResponse {
  id: string;
  rfqId?: string;
  createdAt: string;
  status: string;
}
