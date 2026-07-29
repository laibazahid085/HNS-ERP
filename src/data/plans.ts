export interface PlanFeature {
  id: string;
  text: string;
}

export interface Plan {
  id: string;
  name: string;
  duration: string;
  price: number;
  currency: string;
  isTrial?: boolean;
  trialDays?: number;
  description: string;
  features: PlanFeature[];
  badgeText?: string;
}

// Mock plans data prepared to match future backend API response
export const MOCK_PLANS: Plan[] = [
  {
    id: "plan_trial",
    name: "14 Days Free Trial",
    duration: "14 Days",
    price: 0,
    currency: "PKR",
    isTrial: true,
    trialDays: 14,
    badgeText: "Recommended",
    description: "Full access to enterprise features to test your workflow.",
    features: [
      { id: "f1", text: "1 Warehouse Support" },
      { id: "f2", text: "Up to 100 Orders/mo" },
      { id: "f3", text: "Basic Inventory Tracking" },
      { id: "f4", text: "Standard Support" },
    ],
  },
  {
    id: "plan_monthly",
    name: "Monthly",
    duration: "1 Month",
    price: 5000,
    currency: "PKR",
    description: "Flexible month-to-month billing for growing businesses.",
    features: [
      { id: "f1", text: "3 Warehouses Support" },
      { id: "f2", text: "Unlimited Orders" },
      { id: "f3", text: "Advanced Inventory & Billing" },
      { id: "f4", text: "Priority Email Support" },
    ],
  },
  {
    id: "plan_quarterly",
    name: "3 Months",
    duration: "3 Months",
    price: 13500,
    currency: "PKR",
    description: "Quarterly commitment with a savings bonus.",
    features: [
      { id: "f1", text: "5 Warehouses Support" },
      { id: "f2", text: "Unlimited Orders" },
      { id: "f3", text: "Role-Based Access Control" },
      { id: "f4", text: "Dedicated Support" },
    ],
  },
  {
    id: "plan_half_yearly",
    name: "6 Months",
    duration: "6 Months",
    price: 25000,
    currency: "PKR",
    description: "Semi-annual package for established distributors.",
    features: [
      { id: "f1", text: "10 Warehouses Support" },
      { id: "f2", text: "Unlimited Orders" },
      { id: "f3", text: "Advanced Analytics & Reports" },
      { id: "f4", text: "24/7 Priority Support" },
    ],
  },
  {
    id: "plan_yearly",
    name: "Yearly",
    duration: "12 Months",
    price: 45000,
    currency: "PKR",
    badgeText: "Best Value",
    description: "Maximum savings and full feature access for enterprise operations.",
    features: [
      { id: "f1", text: "Unlimited Warehouses" },
      { id: "f2", text: "Unlimited Orders & Users" },
      { id: "f3", text: "Full ERP & Analytics Suite" },
      { id: "f4", text: "Dedicated Account Manager" },
    ],
  },
];