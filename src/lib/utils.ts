import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { v4 as uuidv4 } from 'uuid';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function generateId() {
  return uuidv4();
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

export const SUBSCRIPTION_TIERS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    description: 'Perfect for individuals or small rental businesses',
    features: [
      'Up to 10 properties',
      'Up to 1 user',
      'Basic AI damage detection',
      'Standard inspection templates',
      'PDF report generation',
      'Email support',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 79,
    description: 'For growing businesses with multiple properties',
    features: [
      'Up to 45 properties',
      'Up to 3 users',
      'Advanced AI damage detection',
      'Custom inspection templates',
      'Branded PDF reports',
      'Priority support',
    ],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    description: 'For large property management companies',
    features: [
      'Unlimited properties',
      'Unlimited users',
      'Enterprise-grade AI detection',
      'Team collaboration tools',
      'API access',
      'White-label reports',
    ],
  },
];

export function getTrialEndDate() {
  const now = new Date();
  const trialEnd = new Date(now);
  trialEnd.setDate(now.getDate() + 14);
  return trialEnd;
}

export function isImageValid(file: File) {
  // Check file size (max 300kb)
  if (file.size > 300 * 1024) {
    return { valid: false, error: 'Image must be less than 300KB' };
  }
  
  // Check file type
  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    return { valid: false, error: 'Only JPG and PNG formats are supported' };
  }
  
  return { valid: true, error: null };
}