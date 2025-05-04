export type User = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'admin' | 'user';
  createdAt: string;
};

export type Company = {
  id: string;
  name: string;
  logo?: string;
  brandColor?: string;
  reportBackground?: string;
  tier: 'starter' | 'professional' | 'enterprise';
  trialEndsAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type Subscription = {
  id: string;
  companyId: string;
  tier: 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'trialing' | 'canceled' | 'past_due';
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
};

export type Property = {
  id: string;
  companyId: string;
  name: string;
  address: string;
  type: 'apartment' | 'townhouse' | 'villa';
  bedrooms: 'studio' | '1' | '2' | '3' | '4' | '5';
  bathrooms: '1' | '2' | '3' | '4' | '5' | '6';
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type Template = {
  id: string;
  companyId: string;
  name: string;
  type: 'bedroom' | 'bathroom' | 'kitchen' | 'living' | 'outdoor' | 'other';
  elements: FormElement[];
  createdAt: string;
  updatedAt: string;
};

export type FormElement = {
  id: string;
  type: 'text' | 'singleChoice' | 'multipleChoice' | 'photo' | 'signature';
  label: string;
  required: boolean;
  options?: string[];
  defaultValue?: string;
};

export type Checklist = {
  id: string;
  companyId: string;
  propertyId: string;
  name: string;
  templates: string[]; // Array of template IDs
  createdAt: string;
  updatedAt: string;
};

export type Inspection = {
  id: string;
  companyId: string;
  propertyId: string;
  checklistId: string;
  inspectorId: string;
  type: 'check-in' | 'check-out';
  guestName?: string;
  signature?: string;
  status: 'in-progress' | 'completed';
  responses: Record<string, any>;
  createdAt: string;
  completedAt?: string;
};

export type Report = {
  id: string;
  inspectionId: string;
  pdfUrl?: string;
  createdAt: string;
};

// Subscription tier limitations
export type TierLimits = {
  properties: number;
  users: number;
  features: string[];
};

export const TIER_LIMITS: Record<string, TierLimits> = {
  starter: {
    properties: 10,
    users: 1,
    features: ['basic-ai', 'standard-templates', 'pdf-reports', 'email-support'],
  },
  professional: {
    properties: 45,
    users: 3,
    features: ['advanced-ai', 'custom-templates', 'branded-reports', 'priority-support'],
  },
  enterprise: {
    properties: Infinity,
    users: Infinity,
    features: [
      'enterprise-ai',
      'team-collaboration',
      'api-access',
      'white-label',
    ],
  },
};

// Navigation types
export type NavItem = {
  title: string;
  href: string;
  icon: string;
};