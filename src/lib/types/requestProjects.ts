export interface RequestProjectFileReference {
  original_filename: string;
  filename: string;
}

export interface PricingOption {
  id: string;
  name: string;
}

export interface RequestProjectFormData {
  name: string;
  isCompany?: string | boolean;
  companyName?: string;
  vat?: string;
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
  reference_no?: string;
  vat?: string | null;
  createdAt: string;
  status: string;
}

export interface TelegramLinkStatus {
  linked: boolean;
}
